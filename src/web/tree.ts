import * as d3 from "d3"
import "./tree.css"

const makeTree = () => {

  const treeData = {
    name: "Top Level",
    parent: "null",
    children: [
      {
        name: "Level 2: A",
        parent: "Top Level",
        children: [
          {
            name: "Son of A",
            parent: "Level 2: A"
          },
          {
            name: "Daughter of A",
            parent: "Level 2: A"
          }
        ]
      },
      {
        name: "Level 2: B",
        parent: "Top Level"
      }
    ]
  }

  const root = d3.hierarchy(treeData)

  const margin = {top: 20, right: 0, bottom: 30, left: 90},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = d3.select("body").append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  svg.append("g")
      .attr("transform", "translate("
            + margin.left + "," + margin.top + ")")
  let i = 0,
      duration = 750

  // declares a tree layout and assigns the size
  // Assigns parent, children, height, depth
  // root.x0 = height / 2;
  // root.y0 = 0;

  update(root)

  // Collapse the node and all it's children
  function collapse(d: any) {
    if (d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  }

  function update(source: any) {

    const tree = d3.tree().size([height, width])
    // Assigns the x and y position for the nodes
    const treeData: any = tree(root)

    // Compute the new tree layout.
    const nodes = treeData.descendants(),
        links = treeData.descendants().slice(1)

    // Normalize for fixed-depth.
    nodes.forEach(function(d: any) { d.y = d.depth * 180})

    // ****************** Nodes section ***************************

    // Update the nodes...
    const node = svg.selectAll("g.node")
        .data(nodes, function(d: any) {return d.id || (d.id = ++i) })

    // Enter any new modes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d: any) {
          return "translate(" + source.y0 + "," + source.x0 + ")"
      })
      .on("click", click)

    // Add Circle for the nodes
    nodeEnter.append("circle")
        .attr("class", "node")
        .attr("r", 1e-6)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff"
        })

    // Add labels for the nodes
    nodeEnter.append("text")
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start"
        })
        .text(function(d) { return d.data.name })

    // UPDATE
    const nodeUpdate = nodeEnter.merge(node)

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")"
      })

    // Update the node attributes and style
    nodeUpdate.select("circle.node")
      .attr("r", 10)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff"
      })
      .attr("cursor", "pointer")

    // Remove any exiting nodes
    const nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")"
        })
        .remove()

    // On exit reduce the node circles size to 0
    nodeExit.select("circle")
      .attr("r", 1e-6)

    // On exit reduce the opacity of text labels
    nodeExit.select("text")
      .style("fill-opacity", 1e-6)

    // ****************** links section ***************************

    // Update the links...
    const link = svg.selectAll("path.link")
        .data(links, function(d: any) { return d.id })

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          const o = {x: source.x0, y: source.y0}
          return diagonal(o, o)
        })

    // UPDATE
    const linkUpdate = linkEnter.merge(link)

    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr("d", function(d) { return diagonal(d, d.parent) })

    // Remove any exiting links
    const linkExit = link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          const o = {x: source.x, y: source.y}
          return diagonal(o, o)
        })
        .remove()

    // Store the old positions for transition.
    nodes.forEach(function(d: any) {
      d.x0 = d.x
      d.y0 = d.y
    })

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s: any, d: any) {
      return `M ${s.y} ${s.x}
      C ${(s.y + d.y) / 2} ${s.x},
        ${(s.y + d.y) / 2} ${d.x},
        ${d.y} ${d.x}`
    }

    // Toggle children on click.
    function click(d: any) {
      if (d.children) {
          d._children = d.children
          d.children = null
        } else {
          d.children = d._children
          d._children = null
        }
      update(d)
    }
  }
}
export default makeTree
