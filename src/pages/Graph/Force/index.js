import React, { Component } from "react";
import ReactDOM from 'react-dom'
import * as d3 from "d3"
import Simulation from './simulation'
import Link from './link'
import Node from './node'
import { updateGraph, width, height } from './func'
import './index.css';

class Force extends Component {
    constructor(props) {
        super();
        this.state = {
            data: {
                "links": [
                    { "source": "59acfc6c2c884ed8a2ff9d8882cb229c", "target": "7a1276b36cb04156bd9b5e240f34b873" },
                    { "source": "59acfc6c2c884ed8a2ff9d8882cb229c", "target": "190f1c3e481e4d51910d7f60db196c24" },
                    { "source": "59acfc6c2c884ed8a2ff9d8882cb229c", "target": "190f1c3e481e4d51910d7f60db196c24" },
                    { "source": "59acfc6c2c884ed8a2ff9d8882cb229c", "target": "6ab9976da83e40fdb36dfe8f3f2b9fdc" }],
                "nodes": [
                    { "nodeId": "190f1c3e481e4d51910d7f60db196c24", "name": "聚合分析1705", "type": "MARKET" },
                    { "nodeId": "59acfc6c2c884ed8a2ff9d8882cb229c", "name": "指标模型1420", "type": "MODEL" },
                    { "nodeId": "6ab9976da83e40fdb36dfe8f3f2b9fdc", "name": "每分钟指标聚合", "type": "MARKET" },
                    { "nodeId": "7a1276b36cb04156bd9b5e240f34b873", "name": "112233", "type": "MARKET" },
                    { "nodeId": "bc5c560de7d041e88d9d525d7f7d0a43", "name": "事件模型", "type": "MODEL" }
                ]
            }
        }
    }

    componentDidMount() {
        const { data } = this.state
        this.d3Graph = d3.select(ReactDOM.findDOMNode(this));
        this.initMarkers()
        this.force = new Simulation()
        this.force.setNodesLinks(data.nodes, data.links);
        this.force.simulation.on('tick', () => {
            this.d3Graph.call(updateGraph)
        });

    
    }

    // 初始化标记
    initMarkers() {
        this.d3Graph.append("defs").selectAll("marker")
            .data(["suit", "licensing", "resolved"])
            .enter().append("marker")
            .attr("id", function (d) { return d; })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 30)
            .attr("refY", -2)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");
    }


    render() {
        const { data } = this.state
        return (
            <svg className="graph" width={800} height={500}>
                <g>
                    {data.links.map((link, index) => {
                        return <Link data={link} key={index} />
                    })}
                </g>
                <g>
                    {data.nodes.map((node,index) => {
                        return <Node data={node} name={node.name} key={index} />
                    })}
                </g>
            </svg>
        )
    }
}

export default Force;
