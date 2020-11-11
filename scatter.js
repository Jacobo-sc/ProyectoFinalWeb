$(function(){
    var ctx = $("#scatter-chartcanvas-1");
    
    // Define the data 
    var data = [{
                    x: 5,
                    y: 4
                }, {
                    x: 2,
                    y: 14
                },
                {
                    x: 4,
                    y: 12
                },
                {
                    x: 2,
                    y: 10
                },
                {
                    x: 3,
                    y: 4
                },
                {
                    x: 3,
                    y: 5
                },
                {
                    x: 3,
                    y: 8
                },
                {
                    x: 6,
                    y: 12
        
            }]; // Add data values to array
    //options
    var options = {
        responsive: true,
        title: {
          display: true,
          position: "top",
          text: "Scatter Chart",
          fontSize: 18,
          fontColor: "#111"
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#333",
            fontSize: 16
          }
        }
      };

    // End Defining data
    var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                    label: 'Population', // Name the series
                    data: data, // Specify the data values array
                    borderColor: '#2196f3', // Add custom color border            
                    backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                }]
        },
        options: options
    });
});