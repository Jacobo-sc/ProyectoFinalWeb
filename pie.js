//$(function(){
    //get the doughnut chart canvas
    var ctx1 = $("#pie-chartcanvas-1");
  
    //pie chart data
    var data1 = {
      labels: [],
      datasets: [
        {
          label: "TeamA Score",
          data: [],
          backgroundColor: [],            
          borderColor: [],
          borderWidth: [1, 1, 1, 1, 1]
        }
      ]
    };
  
  
    //options
    var options = {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "Total de estados",
        fontSize: 18,
        fontColor: "#111"
      },
      legend: {
        display: false,
        position: "bottom",
        labels: {
          fontColor: "#333",
          fontSize: 30
        }
      }
    };
    
    //create Chart class object
    // var chart1 = new Chart(ctx1, {
    //   type: "pie",
    //   data: data1,
    //   options: options
    // });
    
  
  //});