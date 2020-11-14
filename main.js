////////////////Configuración de página/////////////////////////

//import data1 from './pie'
var allRows;
var allUSRows;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
$(document).ready(function(){
  var menu = document.querySelector('.dropdown-menu');
  var rowCells;
  var rowUSsCells;
  $.ajax({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
      url: 'us-states.csv',
      dataType: 'text',
    }).done(function(data){
       allRows = data.split(/\r?\n|\r/)
       allRows.sort(function (a, b) {
        let row1 = a.split(',')
        let row2 = b.split(',')
        if (parseInt(row1[3]) < parseInt(row2[3])) {
          return 1;
        }
        if (parseInt(row1[3]) > parseInt(row2[3])) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });  
      allRows.forEach((n,index)=>{
          rowCells = n.split(',');
          let menu_item = document.createElement('button')
          menu_item.innerText=rowCells[1]
          menu_item.className='dropdown-item'
          menu_item.setAttribute("onclick","setState("+index+")");
          menu.appendChild(menu_item)
          let estado =  statesData.features.find((element)=>
            element.properties.name === rowCells[1]
          )
          //////////////////////// Pie chart //////////////////////////
          data1.labels.push(rowCells[1])
          data1.datasets[0].data.push(parseInt(rowCells[3]))
          color_aleatorio = getRandomColor();
          data1.datasets[0].backgroundColor.push(color_aleatorio);
          data1.datasets[0].borderColor.push(color_aleatorio);
          //estado.properties.density = rowCells[3]
          
          /////////////////////// Cuadro 3 ////////////////////////////
          let lista = document.querySelector('.list-group');
          let div1 = document.createElement('div')
          div1.innerText= rowCells[1]
          div1.className = 'card-Title';

          let div2 = document.createElement('div')
          div2.innerHTML = '<p style="color:yellow">'+ rowCells[3]+'</p>' + ' <p>Confirmados</p>  ' + '<p style="color:red">'+ rowCells[4] +'</p>'+ ' <p>Fallecidos</p>';
          div2.className = 'card-body';

          let li = document.createElement('li');
          li.className = 'list-group-item'
          li.appendChild(div1)
          li.appendChild(div2)
          lista.appendChild(li)          
          
          //iniciarmapa()
        
        
      })
      console.log(data1)
      var chart1 = new Chart(ctx1, {
        type: "pie",
        data: data1,
        options: options
      });
    })
    
    ////////////AQui//////////////
    var rowUSsCells;
    $.ajax({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
        url: 'history.csv',
        dataType: 'text',
      }).done(function(data){
        allUSRows = data.split(/\r?\n|\r/)
        allUSRows.sort(function (a, b) {
          let row1 = a.split(',')
          let row2 = b.split(',')
          if (parseInt(row1[3]) < parseInt(row2[3])) {
            return 1;
          }
          if (parseInt(row1[3]) > parseInt(row2[3])) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });  
        allUSRows.forEach((n,index)=>{
          rowUSsCells = n.split(',');
          
          //////////////////////// Scatter chart //////////////////////////
         

        })
  })
})
function setState(id){
  var rowCells = allRows[id].split(',');
  let confirmados = document.getElementById('confirmados')
  confirmados.innerText = rowCells[3];
  let fallecidos = document.getElementById('fallecidos')
  fallecidos.innerText = rowCells[4];
  let estado_actual = document.querySelector('.estado_actual')
  estado_actual.innerText=rowCells[1];
  let personassincovid = parseInt(rowCells[5]) - parseInt(rowCells[3]);
  data_dona.datasets[0].data[0] = parseInt(rowCells[3]);
  data_dona.datasets[0].data[1] = (personassincovid);
  var chart_dona = new Chart(ctx2, {
    type: "doughnut",
    data: data_dona,
    options: options_dona
  });


}
/////////////////////////////////MAPA////////////////////////////////////////////////

var mymap = L.map('mapid').setView([37.8, -96], 3);
  var mapboxAccessToken = 'pk.eyJ1IjoiamFjOTcxMiIsImEiOiJja2dyYW54bGQxNDh5MnltdG5kdnZxZ3F2In0.dPwb8eDcPItWxKGLdDShRg';
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
      id: 'mapbox/light-v9',
      attribution: 'Map',
      tileSize: 512,
      zoomOffset: -1
  }).addTo(mymap);
  
/////////////////////////////////MAPA////////////////////////////////////////////////
//function iniciarmapa(){

  
  L.geoJson(statesData).addTo(mymap);
  //console.log(statesData)
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  L.geoJson(statesData, {style: style}).addTo(mymap);
  function getColor(d) {
    return d > 500000 ? '#ff0000' :
          d > 300000  ? '#ff9100' :
          d > 100000  ? '#ffd900' :
                      '#00ff00';
  }
//}
///////////////////////////GRAFICA////////////////////////////////////////////////////
var ctx = document.getElementById("outputCanvas").getContext("2d");

axios
  .get(
    "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  )
  .then(function (response) {
    console.log(response);
    var colouring = [];
    var data = [];
    var dopingData = [];
    var notDopingData = [];

    /*var description = document.getElementById("description");
  description.innerText = response.data.description;*/

    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i]["Doping"] === "") {
        notDopingData.push({
          x: parseFloat(response.data[i]["Time"].replace(":", ".")),
          y: response.data[i]["Place"],
          id: i
        });
      } else {
        dopingData.push({
          x: parseFloat(response.data[i]["Time"].replace(":", ".")),
          y: response.data[i]["Place"],
          id: i
        });
      }
    }
    var myChart = new Chart(ctx, {
      type: "scatter",
      data: {
        label: "Scatter Dataset",
        datasets: [
          {
            data: notDopingData,
            label: "No Doping",
            backgroundColor: "rgba(255, 0, 0, 1)"
          },
          {
            data: dopingData,
            label: "Doping",
            backgroundColor: "rgba(0, 0, 255, 1)"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "35 Fastest times up Alpe d'Huez"
        },
        legend: {
          display: true
        },

        showLines: false,
        scales: {
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Rank",
                fontSize: 16
              },
              ticks: {
                beginAtZero: true,
                fontSize: 14
              }
            }
          ],
          xAxes: [
            {
              type: "linear",
              position: "bottom",
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time (Minutes)",
                fontSize: 16
              },
              gridLines: {
                display: true
              },
              ticks: {
                beginAtZero: false,
                fontSize: 14
              }
            }
          ]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            title: function (tooltipItems, data) {
              var index = tooltipItems[0].index;
              var datasetIndex = tooltipItems[0].datasetIndex;
              var dataset = data.datasets[datasetIndex];
              var datasetItem = dataset.data[index];

              var person = response.data[datasetItem.id];
              return person.Name + " - " + person.Nationality;
            },
            label: function (tooltipItems, data) {
              var output = "";

              var index = tooltipItems.index;
              var datasetIndex = tooltipItems.datasetIndex;
              var dataset = data.datasets[datasetIndex];
              var datasetItem = dataset.data[index];

              var person = response.data[datasetItem.id];

              output += "TIme: " + person.Time + "\n | \n";
              output += "Place: " + person.Place + "\n | \n";
              output += "Year: " + person.Year + "\n | \n";
              if (person.Doping === "") {
                output += "Doping: None";
              } else {
                output += "Doping: " + person.Doping;
              }
              return output;
            }
          }
        }
      }
    });
  })
  .catch(function (error) {
    console.log(error);
  });

