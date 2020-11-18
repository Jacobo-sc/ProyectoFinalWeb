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
      let estado = ''
      allRows.forEach((n,index)=>{
          rowCells = n.split(',');
          let menu_item = document.createElement('button')
          menu_item.innerText=rowCells[1]
          menu_item.className='dropdown-item'
          menu_item.setAttribute("onclick","setState("+index+")");
          menu.appendChild(menu_item)
          
          
          //////////////////////// Pie chart //////////////////////////
          data1.labels.push(rowCells[1])
          data1.datasets[0].data.push(parseInt(rowCells[3]))
          color_aleatorio = getRandomColor();
          data1.datasets[0].backgroundColor.push(color_aleatorio);
          data1.datasets[0].borderColor.push(color_aleatorio);
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
          
          statesData.features.find((element)=>{
            if(element.properties.name === rowCells[1]){
              element.properties.density = parseInt(rowCells[3])
              element.properties.deaths = parseInt(rowCells[4])
            }
          }
            
          )
         
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
          let  m = {x:index, y: parseInt(rowUSsCells[1])}
          //console.log(m)
          data3.datasets[0].data.push(m)
          
         

        })
        //console.log(data3)
        //////////////////////// Scatter chart //////////////////////////
        var myChart = new Chart(ctx3, {
          type : 'scatter',
          data : data3,
          options: {
              scales: {
                  xAxes: [{
                      type: 'linear',
                      position: 'bottom',
                      scaleLabel: {
                        display: true,
                        labelString: 'Días transcurridos desde el incio del covid-apocalipsis'
                      }
                  }],
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Número de casos acumulados'
                    }
                }]
              }
          }
        });
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
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

var geojson;
// ... our listeners
geojson = L.geoJson(statesData);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}

geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(mymap);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Población de EU con COVID-19</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' personas infectadas</sup><br />' + props.deaths + ' personas fallecidas</sup>'
        : 'Hover over a state');
};

info.addTo(mymap);