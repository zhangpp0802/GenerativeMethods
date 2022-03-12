
console.dir(document)


function stupid() {
	console.log("He/She admitted.")
	document.getElementById('Charlie').style.visibility="visible";
}

function start() {
	console.log("Take a try")
	var q = "If 1+3 = 16, 3+7 = 10, 7+8 = 4, 8+9 = 11, 9+1 = 15, what is 3+9?"
	var a;
	window.prompt("Please enter your name","P");
	let person = prompt(q, "0");
	// let text;
	if (person == 17) {
	  document.getElementById('Charlie').style.visibility="visible";
	}

}


// // Run this function after the page is loaded
window.addEventListener("load", function(){
	console.log("All dom loaded!")

	let aholder2 = document.getElementById("assignments2")
	let aholder3 = document.getElementById("assignments2")
	let aholder4 = document.getElementById("assignments2")
	let aholder5 = document.getElementById("assignments2")
	let aholder6 = document.getElementById("assignments2")
	let aholder7 = document.getElementById("assignments2")
	let aholder9 = document.getElementById("assignments2")
	// for (var i = 2; i < 10; i++) {
		let assignmentEl2 = document.createElement("div");
		let assignmentEl3 = document.createElement("div");
		let assignmentEl4 = document.createElement("div");
		let assignmentEl5 = document.createElement("div");
		let assignmentEl6 = document.createElement("div");
		let assignmentEl7 = document.createElement("div");
		let assignmentEl9 = document.createElement("div");
		aholder2.append(assignmentEl2)
		aholder3.append(assignmentEl3)
		aholder4.append(assignmentEl4)
		aholder5.append(assignmentEl5)
		aholder6.append(assignmentEl6)
		aholder7.append(assignmentEl7)
		aholder9.append(assignmentEl9)
		// console.log("currently other assignments are not availble.")
		// if (i == 2){
			assignmentEl2.innerHTML = `Assignment ${2} <a href="file:///Users/pp/Desktop/NU/21W/generativeMethod/classweb/students/YiranZhang/a2/index.html">Looping Animation</a>`
		// }
		// else if (i = 3){
			assignmentEl3.innerHTML = `Assignment ${3} <a href="file:///Users/pp/Desktop/NU/21W/generativeMethod/classweb/students/YiranZhang/a3/index.html">Drawing Canvas</a>`
		// }
		// else if (i = 4){
			assignmentEl4.innerHTML = `Assignment ${4} <a href="file:///Users/pp/Desktop/NU/21W/generativeMethod/classweb/students/YiranZhang/a4/index.html">Particles Art</a>`
		// }
		// else if (i = 5){
			assignmentEl5.innerHTML = `Assignment ${5} <a href="file:///Users/pp/Desktop/NU/21W/generativeMethod/classweb/students/YiranZhang/a5/index.html">Chatbot</a>`
		// }
		// else if (i = 6){
			assignmentEl6.innerHTML = `Assignment ${6} <a href="file:///Users/pp/Desktop/NU/21W/generativeMethod/classweb/students/YiranZhang/a6/index.html">Tile Representing Virus</a>`
		// }
		// else if (i = 7){
			assignmentEl7.innerHTML = `Assignment ${7} <a href="file:///Users/pp/Desktop/NU/21W/generativeMethod/classweb/students/YiranZhang/a7/index.html">Playful Bots</a>`
		// }
		// else if (i = 9){
			assignmentEl9.innerHTML = `Assignment ${9} <a href="file:///Users/pp/Desktop/NU/21W/generativeMethod/classweb/students/YiranZhang/a9/index.html">Vibe Face</a>`
	// 	}
	// }
	console.log("All assignments loaded!")

})	
