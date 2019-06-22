import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Foot from 'components/Layout/Foot'
import Head from 'components/Layout/Head'
import Graph from 'pages/Graph';
import Force from 'pages/Graph/Force'
import NotFound from 'pages/NotFound'

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Head />
                    <Layout>
                        <Sider width={200} style={{ background: '#fff', marginTop: 64 }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}>
                                <SubMenu
                                    key="sub1"
                                    title={<span><Icon type="user" />d3.js </span>} >
                                    <Menu.Item key="1"><Link to='/graph/force'>力导向图</Link> </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content style={{ padding: '0 50px', marginTop: 64 }}>
                                <div style={{ background: '#fff', padding: 24, minHeight: 1580 }}>
                                    <Switch>
                                        <Route exact path="/" component={Graph} />
                                        <Route path="/graph" component={Graph} />
                                        <Route path="/graph/force" component={Force} />
                                        <Route component={NotFound} />
                                    </Switch>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                    <Foot />
                </Layout>
            </Router>
        )
    }
}

export default App;
