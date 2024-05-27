// Define your data
let timelineData = [
    {date: "2022-01-01", phase: "Project Start", color: "#69b3a2"},
    {date: "2022-02-01", phase: "Phase 1 Complete", color: "#404080"},
    {date: "2022-03-01", phase: "Phase 2 Complete", color: "#ff7f0e"},
    {date: "2022-04-01", phase: "Project End", color: "#d62728"}
];

// Parse the date / time
let parseTime = d3.timeParse("%Y-%m-%d");

// Set the dimensions and margins of the diagram
let margin = {top: 20, right: 200, bottom: 30, left: 200}, // Increase right margin
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Set the ranges
let x = d3.scaleTime().range([0, width]);
let y = d3.scalePoint().range([height, 0]).padding(0.5);

// Append the svg object to the body of the page
let svg = d3.select("#svg-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Format the data
timelineData.forEach(function(d) {
    d.date = parseTime(d.date);
});

// Scale the range of the data
x.domain(d3.extent(timelineData, function(d) { return d.date; }));
y.domain(timelineData.map(function(d) { return d.phase; }));

// Add the circles
let circles = svg.selectAll(".circle")
    .data(timelineData)
    .enter().append("circle")
    .attr("class", "circle")
    .attr("cy", function(d) { return y(d.phase); })
    .attr("cx", function(d) { return x(d.date); })
    .attr("r", function(d) { return d.phase.length * 2; }) // Use length of phase string to determine radius
    .style("fill", function(d) { return d.color; }) // Use color from data
    .on("mouseover", function() { // Add hover effect
        d3.select(this).transition()
            .duration(500)
            .attr("r", function(d) { return d.phase.length * 2 + 5; }); // Increase radius on hover
    })
    .on("mouseout", function() {
        d3.select(this).transition()
            .duration(500)
            .attr("r", function(d) { return d.phase.length * 2; }); // Reset radius
    });

// Add the phase text
svg.selectAll(".text")
    .data(timelineData)
    .enter().append("text")
    .attr("class", "text")
    .attr("y", function(d) { return y(d.phase); })
    .attr("x", function(d) { return x(d.date); })
    .attr("dy", ".35em") // Vertically center text
    .attr("text-anchor", "middle") // Horizontally center text
    .text(function(d) { return d.phase; });

// Add the X Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// Add the Y Axis
svg.append("g")
    .call(d3.axisLeft(y));
// Add tooltips
let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

svg.selectAll(".bar")
    .on("mouseover", function(d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html("Task: " + d.task + "<br/>Start: " + d.start + "<br/>End: " + d.end)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
// FAQ section interactivity
document.addEventListener("DOMContentLoaded", function() {
    var faqs = document.querySelectorAll('.faq-item h3');
    faqs.forEach(function(faq) {
        faq.addEventListener('click', function() {
            var content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});