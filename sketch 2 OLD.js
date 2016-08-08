// "use strict";
var points = [];
var ellipseSize = 15;
var counter = 0;

var showLines = false;

var outsideLines = [];
var connectingLines = [];
var bezierLines = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(200);
	frameRate(60);

}


function draw() {

	counter+=0.02;
	if(!showLines){
		background(200);
	}

if (points.length > 1){
		for (var i = 0; i < points.length-1; i++){
			line(points[i][0],points[i][1],points[i+1][0],points[i+1][1]);
			stroke(15);
		}


		recFun((Math.cos(counter)+1)/2, points);

	}	

	for (var i = 0; i < points.length; i++){
		ellipse(points[i][0],points[i][1],15);
	}

	// for (var i = 0; i < connectingLines.length-1;i++){
	// 	stroke(0,0,0,50);
	// 	line(connectingLines[i][0],connectingLines[i][1],connectingLines[i][2],connectingLines[i][3])
	// 	stroke(0,0,0,100);
	// }
	


}

function mouseReleased(){
		fill(255);

		points.push([mouseX, mouseY]);

}

function keyReleased(){
	if (keyCode == 32){
		showLines = !showLines;
	}
}

function eqMaker(t, ax, ay, bx, by){


	var x = t * ax + (1-t) * bx;
	var y = t * ay + (1-t) * by;

	return [x,y];
}


function recFun(t, arr){

	var size = arr.length;


	if (size < 3){
		console.log('size less than 3');
		var ax = arr[0][0];
		var ay = arr[0][1];

		var bx = arr[1][0];
		var by = arr[1][1];

		return eqMaker(t, ax, ay, bx, by);
	}else{



		console.log(arr.slice(0,2));
		console.log(arr.slice(1,3));

		var aCoord = recFun(t, arr.slice(0, arr.length-1));
		var ax = aCoord[0];
		var ay = aCoord[1];

		var bCoord = recFun(t, arr.slice(1,arr.length));
		var bx = bCoord[0];
		var by = bCoord[1];

		var newCoo = eqMaker(t, ax, ay, bx, by);
		var x = newCoo[0];
		var y = newCoo[1];

		// console.log(ax, ay, bx, by);

		for (var time = 0; time < 1; time+=0.01){

			// var tempSt = eqMaker(time, ax, ay, bx, by);
			// var tempEd = eqMaker(time+0.01, ax, ay, bx, by);
			// // console.log(tempSt, tempEd);
			// stroke(0,0,0,50);
			// line(tempSt[0],tempSt[1],tempEd[0],tempEd[1]);
			// stroke(0,0,0,50);
		}
		
		stroke(0,0,0,20);
		line(ax, ay, bx, by);

		ellipse(ax, ay, ellipseSize);
		ellipse(bx, by, ellipseSize);
		ellipse(x, y, ellipseSize);
		stroke(0);


		return [x,y];

	}
}