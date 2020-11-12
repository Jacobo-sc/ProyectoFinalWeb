////////////////////////////////LECTURA DE ARCHIVO CSV///////////////////////////////////////////
// $.ajax({
//   headers: {
//     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//   },
//     url: 'us-states.csv',
//     dataType: 'text',
//   }).done(successFunction);

//   function successFunction(data) {
//     var allRows = data.split(/\r?\n|\r/);

//     for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
//       if (singleRow === 0) {
//         table += '<thead>';
//         table += '<tr>';
//       } else {
//         table += '<tr>';
//       }
//       var rowCells = allRows[singleRow].split(',');
//       for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
//         if (singleRow === 0) {
//           table += '<th>';
//           table += rowCells[rowCell];
//           table += '</th>';
//         } else {
//           table += '<td>';
//           table += rowCells[rowCell];
//           table += '</td>';
//         }
//       }
//       if (singleRow === 0) {
//         table += '</tr>';
//         table += '</thead>';
//         table += '<tbody>';
//       } else {
//         table += '</tr>';
//       }
//     } 
//     table += '</tbody>';
//     table += '</table>';
//     //$('body').append(table);
//   }
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
  return d > 1000 ? '#800026' :
         d > 500  ? '#BD0026' :
         d > 200  ? '#E31A1C' :
         d > 100  ? '#FC4E2A' :
         d > 50   ? '#FD8D3C' :
         d > 20   ? '#FEB24C' :
         d > 10   ? '#FED976' :
                    '#FFEDA0';
}
var allRows;
////////////////Configuración de página/////////////////////////
$(document).ready(function(){
  var menu = document.querySelector('.dropdown-menu');
  statesData.features.forEach((data,index)=>{
    
  })
  var rowCells;
  $.ajax({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
      url: 'us-states.csv',
      dataType: 'text',
    }).done(function(data){
       allRows = data.split(/\r?\n|\r/)
       
       allRows.forEach((n,index)=>{
         if(index>0){
          rowCells = n.split(',');
          console.log(rowCells[1])
          let menu_item = document.createElement('button')
          menu_item.innerText=rowCells[1]
          menu_item.className='dropdown-item'
          menu_item.setAttribute("onclick","setState("+index+")");
          menu.appendChild(menu_item)
         }
        
      }
      )
    });
    


});

function setState(id){
  var rowCells = allRows[id].split(',');
  let confirmados = document.getElementById('confirmados')
  confirmados.innerText = rowCells[3];
  let fallecidos = document.getElementById('fallecidos')
  fallecidos.innerText = rowCells[4];
  let negativos = document.getElementById('negativos')
  negativos.innerText = rowCells[5];
  console.log(rowCells[1])
  let estado_actual = document.querySelector('.estado_actual')
  estado_actual.innerText=rowCells[1]
}
///////////////////////////GRAFICA////////////////////////////////////////////////////
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});
//get the doughnut chart canvas
var ctx1 = $("#doughnut-chartcanvas-1");
var ctx2 = $("#doughnut-chartcanvas-2");

//options
var options = {
  responsive: true,
  title: {
    display: true,
    position: "top",
    text: "Doughnut Chart",
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
