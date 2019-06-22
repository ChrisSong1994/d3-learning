import * as d3 from 'd3'

export const width = 1080;
export const height = 500;


export const enterNode = (selection) => {
  selection.select('circle')
    .attr("r", 30)


  selection.select('text')
    .attr("dy", ".35em")
    .style("transform", "translateX(-50%,-50%")
};

export const updateNode = (selection) => {
  selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

};

export const enterLink = (selection) => {
  selection.attr("stroke-width", 2)
    .attr("marker-end", function (d) { return "url(#suit)"; });
};

export const updateLink = (selection) => {
  selection.attr('d', (d) => {
    var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  })

};

export const updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode)
  selection.selectAll('.link')
    .call(updateLink);
};
