import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import { enterNode, updateNode } from './func'
class Node extends React.Component {

    componentDidMount() {
        this.d3Node = d3.select(ReactDOM.findDOMNode(this))
            .datum(this.props.data)
            .call(enterNode)
    }

    componentDidUpdate() {
        this.d3Node.datum(this.props.data)
            .call(updateNode)
    }

    handle(e) {
        console.log(this.props.data.nodeId + ' been clicked')
    }

    render() {
        return (
            <g className='node'>
                <circle ref="dragMe" onClick={this.handle.bind(this)} />
                <text>{this.props.data.name}</text>
            </g>
        );
    }
}

export default  Node;