import React, { Component } from 'react';
import { Tree, Button, Icon } from 'antd'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Force from './Force'
import TwoWayTree from './TwoWayTree'

class Graph extends Component {
    constructor() {
        super()

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/graph/force" component={Force} />
                    <Route exact path="/graph/twoWayTree" component={TwoWayTree} />

                </Switch>
            </Router>
        )
    }
}

export default Graph