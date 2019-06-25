import React, { Component } from 'react';
import { Tree, Button, Icon } from 'antd'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Force from './Force'

class Graph extends Component {
    constructor() {
        super()

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/graph/force" component={Force} />
                </Switch>
            </Router>
        )
    }
}

export default Graph