
var graphWidth = 300;
var graphHeight = 300;

// see 15 color palette
// http://mkweb.bcgsc.ca/biovis2012/
var color02 = "rgb(0,73,73)";
var color06 = "rgb(73,0,146)";
var color08 = "rgb(182,109,255)";
var color10 = "rgb(182,219,255)";
var color12 = "rgb(146,73,0)";

function createPieChart(id, data, options) {
    options = options || {};
    var width = options.width || graphWidth;
    var height = options.height || graphHeight;
    var pieRadius = options.pieRadius || "90%";

    return new d3pie(id, {
        "header": {
            "title": {
                "fontSize": 24,
                "font": "open sans"
            },
            "subtitle": {
                "color": "#999999",
                "fontSize": 12,
                "font": "open sans"
            },
            "titleSubtitlePadding": 9
        },
        "footer": {
            "color": "#999999",
            "fontSize": 10,
            "font": "open sans",
            "location": "bottom-left"
        },
        "size": {
            "canvasHeight": height,
            "canvasWidth": width,
            "pieOuterRadius": pieRadius
        },
        "data": {
            "sortOrder": "value-desc",
            "content": data
        },
        "labels": {
            "outer": {
                "pieDistance": 10
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "fontSize": 10
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 10
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "effects": {
            "load": {
                "effect": "none"
            },
            "pullOutSegmentOnClick": {
                "speed": 400,
                "size": 8
            },
            "highlightSegmentOnMouseover": false,
            "highlightLuminosity": -0.5
        },
        "misc": {
            "gradient": {
                "enabled": false,
                "percentage": 100
            }
        }
    })
}

function createBarChart(id, data) {
    var svg = d3.select("#" + id)
        .append('svg')
        .attr("width", graphWidth)
        .attr("height", graphHeight);
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.label; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    g.append("g")
        .call(d3.axisBottom(x))
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")");

    g.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis axis--y")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.label); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .style('fill', function (d) { return d.color });
}

function createSidewaysBarChart(id, data) {
    var svg = d3.select("#" + id)
        .append('svg')
        .attr("width", graphWidth)
        .attr("height", graphHeight);
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleLinear()
        .range([0, width]);
    x.domain([0, d3.max(data, function(d) { return d.value; })]);

    const barHeight = height / data.length;

    var bar = svg.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + ((i * barHeight) + margin.top) + ")"; });

    bar.append("rect")
        .attr("x", margin.left)
        .attr("width", function(d) { return x(d.value); })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.label; });

    svg.append("g")
        .call(d3.axisBottom(x))
        .attr("class", "axis axis--x")
        .attr("transform", "translate(" + margin.left +"," + (height + margin.top) + ")");
}

createPieChart("graph_student_vs_mentor", [
    {
        "label": "Student",
        "value": 28,
        "color": color02
    },
    {
        "label": "Mentor",
        "value": 7,
        "color": color12
    }
]);

createBarChart("graph_subject_preferences", [
    {
        label: "Mobile",
        value: 22,
        color: color02
    },
    {
        label: "Website",
        value: 20,
        color: color12
    },
    {
        label: "Electronics",
        value: 11,
        color: color02
    },
    {
        label: "Internet",
        value: 12,
        color: color02
    },
    {
        label: "Computers",
        value: 17,
        color: color02
    }
]);

createPieChart("graph_course_format", [
    {
        "label": "Set course",
        "value": 15,
        "color": color02
    },
    {
        "label": "Small courses",
        "value": 12,
        "color": color12
    },
    {
        "label": "Standalone",
        "value": 6,
        "color": color08
    },
    {
        "label": "No fixed agenda",
        "value": 1,
        "color": color06
    }
], {
    pieRadius: "66%",
    height: 250
});

createPieChart("graph_session_format", [
    {
        "label": "Lecture",
        "value": 1,
        "color": color02
    },
    {
        "label": "Workshops",
        "value": 31,
        "color": color12
    },
    {
        "label": "No structure",
        "value": 2,
        "color": color08
    }
], {
    pieRadius: "90%"
});
