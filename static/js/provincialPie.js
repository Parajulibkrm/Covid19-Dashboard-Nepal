function drawProvincePi(provincialData) {
    console.log(provincialData)

    var ctx = document.getElementById("totalProvince");
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Province 1', 'Province 2', 'Province 3', 'Gandaki Province', 'Province 5', 'Karnali','Sudur Paschim'],
        datasets: [{
        label: 'Number of cases by Province',
        data: provincialData,
        backgroundColor: [
            'rgba(98, 54, 255, 1)',
            'rgba(249, 52, 95, 1)',
            'rgba(250, 101, 1, 1)',
            'rgba(27, 16, 84, 1)',
            'rgba(129, 124, 156, 1)',
            'rgba(29, 177, 67, 1)',
            'rgba(224, 31, 32, 1)'



        ],
        borderColor: [
            'rgba(98, 54, 255, 1)',
            'rgba(249, 52, 95, 1)',
            'rgba(250, 101, 1, 1)',
            'rgba(27, 16, 84, 1)',
            'rgba(129, 124, 156,1)',
            'rgba(29, 177, 67, 1)',
            'rgba(224, 31, 32,1 )'

        ],
        borderWidth: 1
        }]
    },
    options: {
        cutoutPercentage: 60,
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
        responsive: false,
        legend: {
            position: 'right',
            labels: {
                boxWidth: 25,
            }
        },
        title: {
            display: true,
            text:'Total Cases per Province',
            fontSize: '18'
        }

    }
});
}