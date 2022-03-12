	
let simCount = 0

// let noise = (new p5()).noise



	// <simulation type="DustSimulation" mode="gol" :dimensions="[40,30]" :tileSize="10" speed="100"/>

	// What if much bigger?
	// <simulation type="DustSimulation" mode="gol" :dimensions="[50,70]" :tileSize="10" speed="50"/>

	// <simulation type="DustSimulation" mode="gol" :dimensions="[40,30]" :tileSize="10" speed="100"/>
	// type information here
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el : "#app",
		template: `<div id="app">
			This is virus spreading stimulation with low and high density for comparison.
			<simulation type="VirusDensity" mode="golfull" :dimensions="[60,60]" :tileSize="10"/>
			<simulation type="VirusDensity" mode="golhalf" :dimensions="[60,60]" :tileSize="10"/>
			<simulation type="VirusDensity" mode="gol" :dimensions="[60,60]" :tileSize="10"/>
			
		</div>`,
		
	}) 
})



//==================================
// Grid utilities

// Create a grid of columns
function createGrid(w, h) {
	const grid = Array.from(new Array(w),()=>Array.from(new Array(h),()=>"-"));
	return grid
}

// Set a grid equal to a function
function setGrid(grid, fxn) {
	if (grid === undefined)
		console.warn("no grid!")
	if (fxn === undefined)
		console.warn("no function for setting the grid!")
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			grid[i][j] = fxn(i,j)
		}
	}
}

// Copy a grid
function copyGrid(dest, src) {
	for (var i = 0; i < src.length; i++) {
		for (var j = 0; j < src[i].length; j++) {
			dest[i][j] = src[i][j]
		}
	}
}
