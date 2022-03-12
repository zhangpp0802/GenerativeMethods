
// TODO: add sliders for your systems
// 0 to 1
let sliders = {
	// Shared with all particle systems
	simSpeed: .5,

	SquGravity: .02,
	SquAttraction: .02,
	SquDrag: .2,

	// Boids
	avoidance: .5,
	cohesion: .5,
	alignment: .5,

	// Braitenberg vehicles
	InsectSpeed: .5,
	InsectTurn: .2,
	InsectDrag: .2,

	// // Springs
	// springStrength: .5,
	// springEase: 0.01,
}
hair = false;
let systemClasses = [
	BasicParticleSystem,
	BoidsFlock,
	WindParticleSystem,
	BraitenbergSystem,
	// SpringParticleSystem,
	SelfPortrait,
]

//  TODO: Change this to your own prefered background
let eraseRate = 1 // 0 for no erase, 1 for complete overdraw
function drawBackground(p, time) {
	if (eraseRate == 1)
		p.background(98, 17, 36, eraseRate)
	else {
		// Only do the erase *sometimes*
		if (p.frameCount % 3 == 0)
			p.background(98, 17, 36, eraseRate)
	}
}
	

//-------------------------------------------------
// Assorted globals
let selectedSystem = undefined


let noise
const CANVAS_SIZE = [500, 400]

// Track the last mouse

let mouse = new Vector(0,0)
let held = undefined
let closest = undefined


// Keep track of the total number of particles 
// so each one can have its own idNumber
let particleCount = 0

// Run this function after the page is loaded
window.addEventListener("load", function() {

	// Set up all the sliders
	holder =document.getElementById("sliders")
	Object.keys(sliders).forEach(key => addSlider(holder, key, sliders[key], (val) => {
		sliders[key] = val
		console.log("now", key, sliders[key])
	}))
	
	// Hold all the systems
	let systems = {}

	let mainP5 = new p5(p => {
		// Copy noise into global scope
		noise = p.noise

		
		// A time object to keep track 
		// of elapsed and total time
		let time = {
			paused: false,
			t: 0,
			dt: .01,
		}

		let pts = []
		// Setup processing
		p.setup = () => {

			// Set the size of the canvas that P5 thinks its using
			p.createCanvas(...CANVAS_SIZE);

			// For each particle system, 
			systemClasses.forEach(sysClass => {
				// Create the system
				systems[sysClass.name] = new sysClass(p)
			})
			

			// Add all the systems to the dropdown selector
			addToDropdown({
				elID:"active-system", 
				keys:["none"].concat(Object.keys(systems)), 
				startValue:selectedSystem, 
				onChange:(val) => selectedSystem = val
			})

			// Use HSL mode (WAAAYYY better than RGB!)
			p.colorMode(p.HSL);
			p.ellipseMode(p.ELLIPSE_RADIUS);

			p.background(0)

			for (var i = 0; i < 100; i++) {
				pts[i] = Vector.randomPolar(100)
			}

		}	
		
		// Draw with processing
		p.draw = () => {
			
			// Do time tracking
			// This allows us to speed up and slow down time
			// and pause 
			// (and never update more than a fraction of a second at a time)
			time.dt = Math.min(.3, .001*p.deltaTime*(8*sliders.simSpeed**3))
			time.t += time.dt
			
			//==========================================
			// Perform updates

			if (!time.paused)
				Object.values(systems).forEach(sys => sys.update?.(p, time))

			//==========================================
			// Draw
			
			drawBackground(p, time)

			// Each particle system can have (all are optional)
			// * update(p, time) 			update all particle positions/forces, etc
			// * draw(p, time) 				draw the system
			// * drawBackground(p, time)	draw under other systems
			// * drawOverlay(p, time) 		draw over other systems
			// * drawDebug(t, time)			draw debug information
			
			// "fxn?.()   <- "Optional chaining", call this function if it exists
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
			
			// Draw any backgrounds
			Object.values(systems).forEach(sys => sys.drawBackground?.(p, time))

			// Draw all the current particles
			Object.values(systems).forEach(sys => sys.draw?.(p, time))

			// Draw any overlays
			Object.values(systems).forEach(sys => sys.drawOverlay?.(p, time))

			// Draw the selected system's debug information
			systems[selectedSystem]?.drawDebug?.(p, time)
			
			// Draw a reticle on the held object, and closest object
			if (held) {
				p.noFill()
				p.stroke(0, 100, 100)
				p.circle(...held, 60)
				
			}

			if (closest) {
				p.noFill()
				p.stroke(0, 100, 100, .4)
				p.circle(...closest, 60)
			}

			// Draw a border if paused
			if (time.paused) {
				p.noFill()
				p.stroke(0, 100, 50, .3)
				p.strokeWeight(9 + 2*Math.sin(p.millis()*.004))
				p.rect(0, 0, p.width, p.height)
				p.noStroke()
			}
		}

		//------------------------------------------
		// Mouse interaction

		// Track any object we are dragging
		

		p.keyPressed = (key) => {
			// Do something when the mouse is pressed 
			
			// Pick something up?
			console.log("Key up!", key)
			if (key.code == "Space") {
				time.paused = !time.paused
				console.log("Paused:", time.paused)
			}
			// h to see portrit-particles
			if (key.code == "KeyH") {
				if(hair){hair = false}
				else{hair = true}
				console.log("hair = "+hair);
			}
		}
		
		p.mousePressed = () => {
			// Do something when the mouse is pressed 
			
			// Pick something up?


			// Get the closest particles from each system (if implemented)
			held = getClosestParticle(mouse)
			
		}

		// Use the mouse position to draw things
		p.mouseDragged = () => {
		
			// Update mouse position
			mouse.setTo(p.mouseX, p.mouseY)
			held?.setTo(p.mouseX, p.mouseY)
			
		}

		p.mouseMoved = () => {
		
			// Update mouse position
			mouse.setTo(p.mouseX, p.mouseY)
			closest = getClosestParticle(mouse)
			
		}

		p.mouseReleased = () => {
			held = undefined
		}

		// Given all of the systems, get the closest particle
		function getClosestParticle(pt) {
			let closest = Object.values(systems).map(sys => sys?.getClosest?.(pt, 100)).filter(s=>s)
			closest.sort((a, b) => a[1] - b[1])

			return closest[0]?.[0]
		}
	
	}, document.getElementById("p5-holder"))
})
