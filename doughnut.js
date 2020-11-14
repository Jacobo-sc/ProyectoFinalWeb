
    var ctx2 = $("#doughnut-chartcanvas-1");
  
    //doughnut chart data
    var data_dona = {
      labels: ['Con covid','Saludables'],
      datasets: [
        {
          label: "TeamA Score",
          data: [],
          backgroundColor: [
            "#f5e51b",
            "#1bc4f5",
          ],
          borderColor: [
            "#CDA776",
            "#989898",
          ],
          borderWidth: [1, 1]
        }
      ]
    };
    //options
    var options_dona = {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "Porcentaje de población afectada",
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
  
    //create Chart class object
    
