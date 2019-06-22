import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import './style.scss';

class Head extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedKey: 'graph'
        }
    }

    componentDidMount() {
        const path = this.props.match.path
        this.mathPath(path)
    }

    mathPath(path) {
        let selectedKey
        if (path.includes('graph') || (path === '/')) { selectedKey = 'graph' }
        this.setState({ selectedKey })
    }


    render() {
        const { selectedKey } = this.state
        return (
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    style={{ lineHeight: '64px' }}
                    onSelect={(item) => {
                        this.mathPath(item.key)
                    }}>
                    <Menu.Item key="graph"><Link to="/graph">图表示例</Link></Menu.Item>
                </Menu>
            </Header>
        )
    }
}

export default withRouter(Head) 
