d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/Parajulibkrm/new-nepal-geojson-and-topojson/master/topojson/Nepaltopo.json")
    .defer(d3.csv, "https://covid-dataset-by-bikram.herokuapp.com/CoronaNepal.csv", (row) => ({
        districtId: row.ID,
        district: row.District,
        data_date: new Date(row.data_Date),
        recovered: +row.Recovered,
        data_date_raw: row.data_Date,
        Cases: +row.Cases,
        Deaths: +row.Deaths,
        Active: +row.Cases - +row.Deaths - +row.Recovered,
        date_month: +(row.data_Date).substr(5, 2),
        date_day: +(row.data_Date).substr(8, 2)
    }))
    .await((error, mapData, coronaData) => {
        if (error) throw error;
        //   console.log(geoData)

        let geoData = topojson.feature(mapData, mapData.objects.codebeautify).features;

        let minDate = d3.min(coronaData, d => new Date(d.data_date))
        let maxDate = d3.max(coronaData, d => new Date(d.data_date))
        var diffSec = maxDate.getTime() - minDate.getTime();
        var diffDays = diffSec / (1000 * 3600 * 24);


        let daySelector = d3.select('#day-select')
            .attr("min", 0)
            .attr("max", diffDays)
        daySelector.attr("value", diffDays)
        let selectedDay = new Date(minDate.getTime() + daySelector.property("value") * 86400000)
        let selectedDistrict = 27;
        let lineGraph = document.getElementById('slct')
        let optionSelect = d3.selectAll("input[name='selector']")
        let option = optionSelect.property("value")


        const dataOfDay = (coronaData, selectedDay) => {
            let dataOftheDay = coronaData.filter(d => +d.data_date == +selectedDay)
            return dataOftheDay;
        }
        const dataOfDistrict = (districtId) => {
            let dataOfTheDistrict = coronaData.filter(d => +d.districtId == districtId)
            return dataOfTheDistrict
        }

        console.log(geoData)
        let latestTotal = d3.sum(dataOfDay(coronaData, maxDate), d => d.Cases)
        let latestActive = d3.sum(dataOfDay(coronaData, maxDate), (d) => d.Active)
        let latestDeath = d3.sum(dataOfDay(coronaData, maxDate), (d) => d.Deaths)
        let latestRecovered = d3.sum(dataOfDay(coronaData, maxDate), (d) => d.recovered)
        let totalNepalPiDomain = [latestActive, latestRecovered, latestDeath]
        var playing = true;

        const setHeaderData = () => {
            document.getElementById("tc").textContent = latestTotal;
            document.getElementById("ta").textContent = latestActive;
            document.getElementById("tr").textContent = latestRecovered;
            document.getElementById("td").textContent = latestDeath;
            // console.log(maxDate.toLocaleString('default', { month: 'long' })+' ' + coronaData.date_day)
            document.getElementById("ld").textContent = maxDate.toLocaleString('default', {
                month: 'long'
            }) + ' ' + maxDate.getDate();
        }
        const setLineGraphRange = () => {
            var sel = document.getElementById('slct');
            for (let index = 7; index < diffDays; index++) {
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(index));
                if (index == 30) opt.selected = "true"
                opt.value = index;
                sel.appendChild(opt);
                // console.log('done') 
            }
        }
        const getProvinceSum = (num) => {
            var totalsum = 0;
            geoData.forEach(district => {
                if (district.properties.Province == num) {
                    let d = dataOfDay(dataOfDistrict(district.properties.districtid), maxDate);
                    totalsum += +d[0].Cases
                }
            });
            return totalsum;
        }
        const fillTable = () => {
            dataOfDay(coronaData, maxDate)
                .sort((a, b) => b.Cases - a.Cases)
                .forEach((d) => {
                    var table = document.getElementById("districtTable");
                    var newRow = table.insertRow(table.length);
                    var cell = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);
                    cell.innerHTML = d.district;
                    console.log(d.Active)
                    cell2.innerHTML = d.Cases;
                    cell3.innerHTML = d.Active;
                })
        }
        fillTable()
        let totalProvincePiDomain = [getProvinceSum(1), getProvinceSum(2), getProvinceSum(3), getProvinceSum(4), getProvinceSum(5), getProvinceSum(6), getProvinceSum(7)]
        drawProvincePi(totalProvincePiDomain);
        console.log(totalNepalPiDomain)
        drawNepalPi(totalNepalPiDomain)
        drawDistrictPie(dataOfDay(dataOfDistrict(selectedDistrict), selectedDay));
        drawMap(geoData);
        colorMap(dataOfDay(coronaData, selectedDay), option);
        setHeaderData();
        setLineGraphRange();
        let lineGraphRange = lineGraph.options[lineGraph.selectedIndex].value;
        console.log(lineGraphRange)
        drawLine(dataOfDistrict(selectedDistrict), lineGraphRange);

        d3.select('#slct')
            .on("change", d => {
                lineGraphRange = document.getElementById("slct").value
                window.myChart.destroy()
                drawLine(dataOfDistrict(selectedDistrict), lineGraphRange);
            })

        daySelector.on("change", d => {
            selectedDay = new Date(minDate.getTime() + d3.event.target.value * 86400000)
            d3.select("#DateOfData").remove();
            colorMap(dataOfDay(coronaData, selectedDay), option);
            window.myDoughnut.destroy()
            drawDistrictPie(dataOfDay(dataOfDistrict(selectedDistrict), selectedDay));
            // window.myDoughnut.update()
        })
        optionSelect.on("change", d => {
            option = d3.event.target.value
            d3.select("#DateOfData").remove();
            colorMap(dataOfDay(coronaData, selectedDay), option);
        })

        d3.select('#playButton')
            .on("click", () => {
                if (playing) document.getElementById('playButton').innerHTML = "◼"
                if (!playing) document.getElementById('playButton').innerHTML = "‎▶"
                playing = !playing;
                if (playing) return;
                window.setInterval(() => {
                    if (+selectedDay == +maxDate) {
                        document.getElementById('playButton').innerHTML = "◼"
                        playing = true;
                        return
                    };
                    if (playing) return;
                    if (selectedDay !== maxDate) {
                        console.log(selectedDay)
                        selectedDay = new Date(selectedDay.getTime() + 86400000);
                        d3.select("#DateOfData").remove();
                        colorMap(dataOfDay(coronaData, selectedDay), option);

                        var diffSecs = selectedDay.getTime() - minDate.getTime();
                        var diffDay = diffSecs / (1000 * 3600 * 24);
                        document.getElementById('day-select').stepUp(1)
                    }
                }, 300);
            })

        d3.selectAll('.district')
            .on("click", (d) => {
                console.log("clicked")
                selectedDistrict = d.properties.districtid
                let filtData = dataOfDistrict(selectedDistrict)
                window.myChart.destroy()
                drawLine(filtData, lineGraphRange);
                window.myDoughnut.destroy()
                drawDistrictPie(dataOfDay(filtData, selectedDay));
            })
    })