// "use strict";
var points = [];
var ellipseSize = 15;

var counter = 0;
var cosCounter = 0;
var endOfLine = false;

var showLines = false;

var outsideLines = [];
var connectingLines = [];
var bezierLines = [];

var justSwitched = false;

var beziers = {};

var curves = [];

var speed = 50;
function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(200);
	frameRate(60);

}


function draw() {

	cosCounter = Math.cos(counter/speed)

	if (justSwitched){
		background(200);
		justSwitched = false;
	}
	counter+=1;
	if(!showLines){
		background(200);
	}

if (points.length > 1){
		for (var i = 0; i < points.length-1; i++){
			stroke(255);
			if (!showLines){
				stroke(0);
				line(points[i][0],points[i][1],points[i+1][0],points[i+1][1]);}
			stroke(15);
		}

		if (counter > Math.PI * speed*2){
			counter = 0;
			endOfLine = true;
		}

		recFun((Math.cos(counter/speed)+1)/2, points, 0);

	}	

	if(!showLines){
		for (var i = 0; i < points.length; i++){
			ellipse(points[i][0],points[i][1],15);
		}}

	// for (var i = 0; i < connectingLines.length-1;i++){
	// 	stroke(0,0,0,50);
	// 	line(connectingLines[i][0],connectingLines[i][1],connectingLines[i][2],connectingLines[i][3])
	// 	stroke(0,0,0,100);
	// }
	

	beziers = {};
}

function mouseReleased(){
		fill(255);

		points.push([mouseX, mouseY]);

		if (showLines){
		background(200);}
		curves = [];
		counter = 0;

}

function keyReleased(){
	if (keyCode == 32){
		showLines = !showLines;
		justSwitched = true;
	}
}

function eqMaker(t, ax, ay, bx, by){


	var x = t * ax + (1-t) * bx;
	var y = t * ay + (1-t) * by;

	return [x,y];
}



function recFun(t, arr, lv){

	var size = arr.length;



	if (size < 3){
		// console.log('size less than 3');
		var ax = arr[0][0];
		var ay = arr[0][1];


		var bx = arr[1][0];
		var by = arr[1][1];

		return eqMaker(t, ax, ay, bx, by);

	}else{

		if (!(arr.toString() in beziers)){


			var aCoord = recFun(t, arr.slice(0, arr.length-1), lv+1);
			var ax = aCoord[0];
			var ay = aCoord[1];

			var bCoord = recFun(t, arr.slice(1,arr.length), lv+1);
			var bx = bCoord[0];
			var by = bCoord[1];

			var newCoo = eqMaker(t, ax, ay, bx, by);
			var x = newCoo[0];
			var y = newCoo[1];

			var newKey = arr.toString();
			beziers[newKey] = [x,y];

			if (lv === 0 && (curves[counter] === undefined) && endOfLine !== true){
				curves[counter] = [x,y];
			}


		}else{

			var targCoord = beziers[arr.toString()];
			var x = targCoord[0];
			var y = targCoord[1];

		}
		
			stroke(0);

		for (var i = 0; i < curves.length-1; i++){

			var curr = curves[i];
			var next = curves[i+5];

			if ((curr !== undefined) && (next !== undefined)){
				line(curr[0], curr[1], next[0], next[1]);
			}

			// if ()

			// ellipse(30,30,100,200);
			// console.log(counter);
		}

		stroke(0,0,0,10);

		// createCurve(arr);


		if(!showLines){
					stroke(0);
					line(ax, ay, bx, by);	
					ellipse(ax, ay, ellipseSize);
					ellipse(bx, by, ellipseSize);
					ellipse(x, y, ellipseSize);
				}else{
					stroke(0,0,0,5);
					line(ax, ay, bx, by);

		}

		
		stroke(0);


		return [x,y];

	}
}