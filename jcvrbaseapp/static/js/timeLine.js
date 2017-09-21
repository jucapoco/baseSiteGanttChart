// DOM element where the Timeline will be attached
var container = document.getElementById('visualization');
var txtData = document.getElementById('data');
var btnLoad = document.getElementById('load');
var btnUpdate = document.getElementById('update');
var txtDataUpdate = document.getElementById('dataUpdate');
var txtFromDateTime = document.getElementById('txtFromDateTime');
var txtToDateTime = document.getElementById('txtToDateTime');

// Create a DataSet (allows two way data-binding)
var items = new vis.DataSet([
  {id: 1, content: 'vuelo 1', start: '2017-09-14T16:30:00' , end: '2017-09-14T17:00:00', className: 'red', title: '<table border="1"><tr><td>Vuelo</td><td>0001</td></tr><tr><td>Gate</td><td>30</td></tr><tr><td>Proveedor</td><td>Texaco</td></tr></table>'},
  {id: 2, content: 'vuelo 2', start: '2017-09-14T16:45:00' , end: '2017-09-14T17:15:00', className: 'green', title: '<table border="1"><tr><td>Vuelo</td><td>0002</td></tr><tr><td>Gate</td><td>20</td></tr><tr><td>Proveedor</td><td>Terpel</td></tr></table>'},
  {id: 3, content: 'vuelo 3', start: '2017-09-14T16:45:00' , end: '2017-09-14T17:15:00', className: 'yellow', title: '<table border="1"><tr><td>Vuelo</td><td>0003</td></tr><tr><td>Gate</td><td>48</td></tr><tr><td>Proveedor</td><td>Texaco</td></tr></table>'}
  ]);

// Configuration for the Timeline
var options = {
  "align": "auto",
  "direction": "horizontal",
  "end": null,
  "height": null,
  "locale": "es",
  "max": null,
  "maxHeight": null,
  "min": null,
  "minHeight": null,
  "moveable": true,
  "orientation": {
    "axis": "top"
  },
  "showCurrentTime": true,
  "start": null,
  "type": null,
  "zoomable": false,
  "width": "100%",
  "timeAxis": {scale: 'minute', step: 5},
  "orientation": {
    "item": "top",
    "axis": "top",
  },
  "tooltip": {
    "followMouse": true
  },
  /*"configure": true*/
};

// Create a Timeline
var timeline = new vis.Timeline(container, items, options);
/**
 * Move the timeline a given percentage to left or right
 * @param {Number} percentage   For example 0.1 (left) or -0.1 (right)
 */
 function move (percentage) {
  var range = timeline.getWindow();
  var interval = range.end - range.start;

  timeline.setWindow({
    start: range.start.valueOf() - interval * percentage,
    end:   range.end.valueOf()   - interval * percentage
  });
}

// attach events to the navigation buttons
document.getElementById('zoomIn').onclick    = function () { timeline.zoomIn( 0.2); };
document.getElementById('zoomOut').onclick   = function () { timeline.zoomOut( 0.2); };
document.getElementById('moveLeft').onclick  = function () { move( 0.2); };
document.getElementById('moveRight').onclick = function () { move(-0.2); };

function updateData () {
// get and deserialize the data
var data = JSON.parse(txtDataUpdate.value);
var itemsUpdate = new vis.DataSet();
// update the data in the DataSet
//
// Note: when retrieving updated data from a server instead of a complete
// new set of data, one can simply update the existing data like:
//
//   items.update(data);
//
// Existing items will then be updated, and new items will be added.
var itemUpdate;
var currItem
itemsUpdate.add(data);
var content;
var title;
for(i=0; i < data.length; i++)
{
  title = '<table border="1"><tr><td><b>Vuelo</b></td><td>';
  title += data[i].vuelo + '</td></tr><tr><td><b>Gate</b></td><td>';
  title += data[i].gate + '</td></tr><tr><td><b>Proveedor</b></td><td>';
  title += data[i].proveedor + '</td></tr>';
  title += '<tr><td><b>Refuler</b></td><td>' + data[i].refuler + '</td></tr>'
  title += '<tr><td><b>Operador</b></td><td>' + data[i].operador + '</td></tr></table>'
  content = data[i].content + ' <a href="http://visjs.org" target="_blank">Asignar</a>';
  currItem = items.get(data[i].id);
  currItem.start = data[i].start;
  currItem.end = data[i].end;
  currItem.content = content;
  currItem.className = data[i].className;
  currItem.title = title;
  items.update(currItem);
}

// adjust the timeline window such that we see the loaded data
timeline.fit();
}

btnUpdate.onclick = updateData;

document.getElementById('window2').onclick = function() {
    timeline.setWindow(txtFromDateTime.value, txtToDateTime.value, {animation: false});
  };

function loadData () {
// get and deserialize the data
var data = JSON.parse(txtData.value);

// update the data in the DataSet
//
// Note: when retrieving updated data from a server instead of a complete
// new set of data, one can simply update the existing data like:
//
//   items.update(data);
//
// Existing items will then be updated, and new items will be added.
items.clear();
items.add(data);

// adjust the timeline window such that we see the loaded data
timeline.fit();
}

function loadData2 () {
// get and deserialize the data
var data = JSON.parse(txtData.value);

items.clear();
items.add(data);
var itemsUpdate = new vis.DataSet();
// update the data in the DataSet
//
// Note: when retrieving updated data from a server instead of a complete
// new set of data, one can simply update the existing data like:
//
//   items.update(data);
//
// Existing items will then be updated, and new items will be added.
var currItem
var content;
var title;
for(i=0; i < data.length; i++)
{
  title = '<table border="1"><tr><td><b>Vuelo</b></td><td>';
  title += data[i].vuelo + '</td></tr><tr><td><b>Gate</b></td><td>';
  title += data[i].gate + '</td></tr><tr><td><b>Proveedor</b></td><td>';
  title += data[i].proveedor + '</td></tr>';
  title += '<tr><td><b>Refuler</b></td><td>' + data[i].refuler + '</td></tr>'
  title += '<tr><td><b>Operador</b></td><td>' + data[i].operador + '</td></tr></table>'
  content = data[i].content + ' <a href="http://visjs.org" target="_blank">Asignar</a>';
  currItem = items.get(data[i].id);
  currItem.content = content;
  currItem.title = title;
  items.update(currItem);
}

// adjust the timeline window such that we see the loaded data
timeline.fit();
}
btnLoad.onclick = loadData2;

loadData2();