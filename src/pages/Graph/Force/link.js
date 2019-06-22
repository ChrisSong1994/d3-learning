import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import { enterLink, updateLink } from './func'

class Link extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.d3Link = d3.select(ReactDOM.findDOMNode(this))
            .datum(this.props.data)
            .call(enterLink);
    }

    componentDidUpdate() {
        this.d3Link.datum(this.props.data)
            .call(updateLink);
    }

    render() {
        return (
            <path className='link' />
        );
    }
}

export default Link