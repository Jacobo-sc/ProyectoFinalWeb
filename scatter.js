$(function () {
    //get the doughnut chart canvas
    var ctx = $("#scatter-chartcanvas-1");
    var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: [{
                    x: 0,
                    y: 1
                }, {
                    x: 1,
                    y: 2
                }, {
                    x: 2,
                    y: 3
                }, {
                    x: 3,
                    y: 4
                }, {
                    x: 5.4,
                    y: 6.9
                }, {
                    x: 5.6,
                    y: 7.2
                }, {
                    x: 5.8,
                    y: 7.5
                }, {
                    x: 6.1,
                    y: 8
                }],
                borderColor: "green",
                backgroundColor: "red"
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
});
