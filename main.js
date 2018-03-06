var draw = SVG('drawing').size(300, 300)
var rect = draw.rect(100, 100).attr({ fill: '#f06' })

$("#btn-save").click( function() {
  var content = (draw.svg());
  var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "data-design-export.svg");
});
