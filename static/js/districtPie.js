function drawDistrictPie(districtData) {
    console.log(districtData[0])
    let distName = districtData[0].district
    let date = districtData[0].data_date
    let domain = [districtData[0].Active,districtData[0].recovered,districtData[0].Deaths]
    var ctx = document.getElementById("totalDistrict");
    window.myDoughnut = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Active', 'Recovered', 'Dead'],
        datasets: [{
        label: 'Total Cases in Nepal',
        data: domain,
        backgroundColor: [
            'rgba(98, 54, 255, 0.9)',
            'rgba(29, 177, 67, 0.9)',
            'rgba(224, 31, 32, 0.9)'
        ],
        borderColor: [
            'rgba(98, 54, 255, 1)',
            'rgba(29, 177, 67, 1)',
            'rgba(224, 31, 32, 1)'
        ],
        borderWidth: 1
        }]
    },
    options: {
        cutoutPercentage: 60,
        responsive: false,
        legend: {
            position: 'right',
            labels: {
                boxWidth: 25,
            }
        },
        title: {
            display: true,
            text:['Total Cases in '+ distName, date.toDateString()],
            fontSize: '18'
        }

    }
});
}