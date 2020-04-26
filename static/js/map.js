function drawMap(geoData) {
    var margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        width = 960 - margin.left - margin.right,
        height = 640 - margin.top - margin.bottom;

    var projection = d3.geoMercator()
        .translate([300, 150])
        .scale(3500)
        .center([83.985593872070313, 28.465876770019531]);

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select('.map')
        .append('svg')
        .attr("viewBox", `0 0 600 300`)
        .append('g')
        .call(d3.zoom().scaleExtent([1, 3]).on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))

    var map = svg.selectAll('.districts')
        .data(geoData)
        .enter()
        .append("path")
        .attr("class", "district")
        .attr("d", path)
        .attr("fill", "#e3e3e3")

}

function getColor(data, option) {
    let range;
    let dataMax = d3.max(data, d => d[option])
    let rangeIndex;
    if (dataMax < 8) {
        rangeIndex = dataMax;
    } else {
        rangeIndex = 9;
    }

    if (option == "Cases") {
        range = colorbrewer.Blues[rangeIndex]
    } else if (option == "Deaths") {
        range = colorbrewer.Reds[rangeIndex]
    } else if (option == "recovered") {
        range = colorbrewer.Greens[rangeIndex]
    } else if (option == "Active") {
        range = colorbrewer.Oranges[rangeIndex]
    }
    return d3.scaleQuantize()
        .range(range)
        .domain([0, d3.max(data, d => d[option]) + 1])
}

function colorMap(dataOfDay, option) {
    // console.log(dataOfDay.filter(d => d.districtId == "71"))
    d3.selectAll('g.legendEntry').remove()

    function colorthat(dataOfDay, did) {
        console.log(dataOfDay[0].districtId)
        // console.log(did)
        let data = dataOfDay.filter(d => (d.districtId == did))
        let data2 = data[0]
        if (data2[option] == 0) {
            return "#ffffff"
        }
        return getColor(dataOfDay, option)(data2[option])
    }

    d3.selectAll('.district')
        .transition()
        .duration(300)
        .ease(d3.easeQuadIn)
        .attr("fill", d => {
            //   console.log(d.properties.districtid)
            return colorthat(dataOfDay, d.properties.districtid)
        })
    var dateEntry = d3.select('svg')
        .data(['0'])
        .append('text')
        .attr("id", "DateOfData")
        .attr("x", 10)
        .attr("y", 290)
        .text(dataOfDay[0].data_date.toLocaleString('default', {
            month: 'long'
        }) + ' ' + dataOfDay[0].date_day)

    var legend = d3.select('svg')
        .selectAll('g.legendEntry')
        .data(getColor(dataOfDay, option).range())
        .enter()
        .append('g')
        .attr("transform", "translate(" + 0 + ", " + 10 + ")")
        .attr('class', 'legendEntry');

    legend
        .append('rect')
        .attr("x", 600 - 95)
        .attr("y", function (d, i) {
            return i * 10;
        })
        .attr("width", 20)
        .attr("height", 10)
        .style("stroke", "black")
        .style("stroke-width", 0.1)
        .style("fill", function (d) {
            return d;
        });
    //the data objects are the fill colors

    legend
        .append('text')
        .attr("x", 600 - 70) //leave 5 pixel space after the <rect>
        .attr("y", function (d, i) {
            return i * 10;
        })
        .attr("dy", "1em") //place text one line *below* the x,y point
        .style("font-family", "Helvetica")
        .style("font-size", 10)
        .text(function (d) {
            var r = getColor(dataOfDay, option).invertExtent(d);
            if (r[1]) {
                return r[0].toFixed(0).padStart(2, "0") + " to " + r[1].toFixed(0).padStart(2, "0") + " Cases"
            }
            return "0.0 to 0.0"
        });
}