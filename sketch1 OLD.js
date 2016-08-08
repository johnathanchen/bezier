// "use strict";
var points = [];
var ellipseSize = 15;
var counter = 0;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(200);
	frameRate(60);

}


function draw() {

	counter+=0.05;
	background(200);

	for (var i = 0; i < points.length; i++){
		ellipse(points[i][0],points[i][1],15);
	}

	console.log(points);
	if (points.length > 1){
		for (var i = 0; i < points.length-1; i++){
			console.log('before line draw');
			line(points[i][0],points[i][1],points[i+1][0],points[i+1][1]);
			console.log('after line draw');
			stroke(15);
		}


		recFun((Math.cos(counter)+1)/2, points);

	}	


}

function mouseReleased(){
		fill(255);

		points.push([mouseX, mouseY]);

}

function recFun(t, arr){

	var size = arr.length;

	// if (size == 2){
	for (var i = 0; i < size - 1; i++){
		var ax = points[i][0];
		var ay = points[i][1];

		var bx = points[i+1][0];
		var by = points[i+1][1];

		var x = t * ax + (1-t) * bx;
		var y = t * ay + (1-t) * by;

		ellipse(x, y, ellipseSize);
	}
	// }else{
	// }



	// return [x,y];
}