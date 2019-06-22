
import * as d3 from 'd3'

class Simulation {
  nodeIdKey = 'nodeId'
  sourceKey = 'source';
  targetKey = 'target';
  nodes = [];
  links = [];
  nodesMap = {};
  translate = [0, 0];
  scale = 1;
  width = 800;
  height = 500;

  constructor(props) {
      this.simulation = d3.forceSimulation();
  }


  setNodesLinks(nodes, links) {
      const { width, height } = this
      this.initNodes(nodes);
      this.initLinks(links);
      this.simulation.nodes(this.nodes)
          .force("charge", d3.forceManyBody().strength(-200))
          .force("link", d3.forceLink(this.links).distance(150))
          .force('yt', d3.forceY().strength(() => 0.025))
          .force('yb', d3.forceY(height).strength(() => 0.025))
          .force("collide", d3.forceCollide().radius(d => 4))
          .force("center", d3.forceCenter().x(width / 2).y(height / 2))

      // 手动调用 tick 使布局达到稳定状态
      for (let i = 0, n = Math.ceil(Math.log(this.simulation.alphaMin()) / Math.log(1 - this.simulation.alphaDecay())); i < n; ++i) {
          this.simulation.tick();
      }

  }


  initNodes(nodes) {
      const { nodeIdKey, width, height } = this;
      const nodesMap = {};
      const originNodes = [];
      nodes.forEach(node => {
          node.x = node.x || width / 2;
          node.y = node.y || height / 2;
          nodesMap[node[nodeIdKey]] = node;
          originNodes.push(node);
      })
      this.nodesMap = nodesMap;
      this.nodes = originNodes;
  }

  initLinks(links) {
      const { nodeIdKey, sourceKey, targetKey } = this;
      const newLinks = [];
      links.forEach(link => {
          let source = link[sourceKey], target = link[targetKey];
          if (typeof source === 'object') {
              source = source[nodeIdKey];
          }
          if (typeof target === 'object') {
              target = target[nodeIdKey];
          }
          const sourcePush = this.nodesMap[source];
          const targetPush = this.nodesMap[target];
          if (sourcePush && targetPush) {
              link.source = sourcePush;
              link.target = targetPush;
              newLinks.push(link);
          }
      })
      this.links = newLinks;
  }


}

export default Simulation;