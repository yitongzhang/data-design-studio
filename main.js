// Dummy data
var dummyData =[{"x":"Jan 1","y":"1100"},{"x":"Jan 2","y":"846"},{"x":"Jan 3","y":"877"},{"x":"Jan 4","y":"871"},{"x":"Jan 5","y":"1157"},{"x":"Jan 6","y":"1050"},{"x":"Jan 7","y":"893"},{"x":"Jan 8","y":"763"},{"x":"Jan 9","y":"788"},{"x":"Jan 10","y":"1179"},{"x":"Jan 11","y":"999"},{"x":"Jan 12","y":"598"},{"x":"Jan 13","y":"616"},{"x":"Jan 14","y":"1005"},{"x":"Jan 15","y":"527"},{"x":"Jan 16","y":"768"},{"x":"Jan 17","y":"756"},{"x":"Jan 18","y":"1130"},{"x":"Jan 19","y":"608"},{"x":"Jan 20","y":"909"},{"x":"Jan 21","y":"940"},{"x":"Jan 22","y":"841"},{"x":"Jan 23","y":"1160"}]

// Declare some vars
var svgWidth = window.innerWidth*0.9;
var svgHeight = 400;
var draw = SVG('drawing').size(svgWidth,svgHeight);
var fillPathString = "M0 500";
var linePathString = "M0 500";
var dataProps ={
	"totalPoints":"0",
	"maxY":"0",
	"minY":"0",
	"xUnit":"0",
	"yUnit":"0"
};
var intermediateObj=[];

// Get properties of data set
let index = 0;
for (point of dummyData) {
  dataProps.totalPoints++;
  if (parseInt(point.y) > dataProps.maxY){
  	dataProps.maxY = parseInt(point.y);
  } 
  if(index == 0){dataProps.minY = parseInt(point.y);}
  else if(parseInt(point.y) < dataProps.minY){
  	dataProps.minY = parseInt(point.y);
  }
  index++;
}
dataProps.xUnit = svgWidth/dataProps.totalPoints;
dataProps.yUnit = svgHeight/dataProps.maxY;

// Create intermediate obj
index = 0;
for (point of dummyData) {
	var key =(index*dataProps.xUnit).toFixed(2).toString()
	var value = point.y*dataProps.yUnit
	intermediateObj[key]=value
	index++;
}
// console.log(intermediateObj)

// draw path!
index = dataProps.totalPoints;
for (key in intermediateObj){
	let x = parseInt(key)
	let y = 500-intermediateObj[key]
	if(index == dataProps.totalPoints){
		linePathString = "M0 "+y
	}
	fillPathString = fillPathString + " L" + x + " "+y;
	linePathString = linePathString + " L" + x + " "+y;
	index--;
	if (index == 0) {
		fillPathString = fillPathString + " L" + x + " 500"
	}

}

var fillPath = draw.path(fillPathString);
fillPath.fill('rgba(0,0,0,0.1)').move(1, -1);

var linePath = draw.path(linePathString);
linePath.stroke({ color: '#222', width: 2, linecap: 'round', linejoin: 'round' });
linePath.fill('none').move(1, -1);


// save svg button
$("#btn-save").click( function() {
  var content = (draw.svg());
  var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "data-design-export.svg");
});