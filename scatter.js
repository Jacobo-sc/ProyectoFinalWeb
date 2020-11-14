
    //get the doughnut chart canvas
    var ctx3 = $("#scatter-chartcanvas-1");
  
    var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: [],
                borderColor: '#af90ca',
                backgroundColor: '#af90ca',
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
