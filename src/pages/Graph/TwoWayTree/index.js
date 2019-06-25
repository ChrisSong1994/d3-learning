import React, { Component } from "react";
import ReactDOM from 'react-dom'
import * as d3 from "d3"
import { collapse ,diagonal} from './func'

import './index.css';

const width = 1000
const height = 500
let i = 1
const duration = 750

class TwoWayTree extends Component {
    constructor(props) {
        super();
        this.state = {
            data: {
                "name": "Top Level",
                "children": [
                    {
                        "name": "Level 2: A",
                        "children": [
                            { "name": "Son of A" },
                            { "name": "Daughter of A" }
                        ]
                    },
                    { "name": "Level 2: B" }
                ]
            }
        }
    }

    componentDidMount() {
        const { data } = this.state
        this.svg = d3.select('.tree').append("g").attr("transform", "translate(" + width / 2 + "," + 0 + ")");
        this.treemap = d3.tree().size([height, width / 2]);
        this.root = d3.hierarchy(data, function (d) { return d.children; });
        this.root.x0 = 0;
        this.root.y0 = 0;
        this.root.children.forEach(collapse);
        this.update(this.root)
    }

    update(source) {
        let treeData = this.treemap(this.root);
        let nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        nodes.forEach(function (d) { d.y = d.depth * 180 });
        console.log(nodes, links)

        const node = this.svg.selectAll('g.node')
            .data(nodes, function (d) { return d.id || (d.id = ++i); });
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function (d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) { return d.data.name; });

        // UPDATE
        let nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');

        // Remove any exiting nodes
        let nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // Update the links...
        const link = this.svg.selectAll('path.link')
            .data(links, function (d) { return d.id; });

        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function (d) {
                const o = { x: source.x0, y: source.y0 }
                return diagonal(o, o)
            });

        // UPDATE
        const linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function (d) { return diagonal(d, d.parent) });

        // Remove any exiting links
        const linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function (d) {
                const o = { x: source.x, y: source.y }
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

    }

    click(d){
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.update(d);
    }





    render() {
        const { data } = this.state
        return (
            <svg className="tree" width={width} height={height}>
            </svg>
        )
    }
}

export default TwoWayTree;
