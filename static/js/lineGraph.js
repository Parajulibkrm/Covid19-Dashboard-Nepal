function drawLine(data,days) {
    let dataActive = []
    let dataRecovered = []
    let dataDead = []
    let dataLabel = []

    data.forEach(d => {
        dataActive.push(d.Active)
        dataRecovered.push(d.recovered)
        dataDead.push(d.Deaths)
        dataLabel.push(d.data_date.toLocaleString('default', { month: 'long' })+' ' + d.date_day)
    });
    let distName = data[0].district
    console.log(dataLabel)
    var ctx = document.getElementById("lineChart").getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataLabel.slice(-days),
            datasets: [{
                label: 'Active', // Name the series
                data: dataActive.slice(-days), // Specify the data values array
                fill: false,
                borderColor: 'rgb(255, 99, 132)', // Add custom color border (Line)
                backgroundColor: 'rgb(255, 99, 132)', // Add custom color background (Points and Fill)
                borderWidth: 3,
                pointRadius: 1.5 // Specify bar border width
            },
            {
                label: 'Recovered', // Name the series
                data: dataRecovered.slice(-days), // Specify the data values array
                fill: false,
                borderColor: '#2196f3', // Add custom color border (Line)
                backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                borderWidth: 3,
                pointRadius: 1.5// Specify bar border width
            },
            {
                label: 'Deaths', // Name the series
                data: dataDead.slice(-30), // Specify the data values array
                fill: false,
                borderColor: 'rgb(153, 102, 255)', // Add custom color border (Line)
                backgroundColor: 'rgb(153, 102, 255)', // Add custom color background (Points and Fill)
                borderWidth: 3,
                pointRadius: 1.5 // Specify bar border width
            }]},
        options: {
        responsive: true,
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
        scales: {
            yAxes: [{
                ticks: {
                    max: d3.max([d3.max(dataActive),d3.max(dataRecovered),d3.max(dataDead)])+1,
                    min: 0,
                    precision: 0,
                    range: (d3.max([d3.max(dataActive),d3.max(dataRecovered),d3.max(dataDead)])+1)/3
                }
            }]
        },
        title: {
            display: true,
            text:['Trend in '+ distName],
            fontSize: '18'
        }
    }
    });
}
