


class BraitenbergSystem {
	/**
	* A class to create a system of braitenberg-style particles
	* Braitenbergs need a MAP to read from, and write to
	* The map in this case is another P5 canvas!
	* this stores information about where they have been or where resources or threats are
	* This map technique is used in many games (https://www.youtube.com/watch?v=tKOgo7EFl_w)
	* and simulations 
	* 
	*/

	// Sliders for this class
	
	constructor(p) {
		let lampCount = 6
		let vehicleCount = 5

		// This is the map that the braitenberg vehicles can read from
		// (or write to!)
		this.map = new MapBuffer({p, mapEraseRate: 0.03,  mapScale: 4, blur: true})
	
		// Get some random lights and random vehicles

		this.vehicles = []
		this.lamps = []
		for (var i = 0; i < lampCount; i++) {
			this.lamps[i] = Vector.random([0,0], [p.width,p.height])
		}

		for (var i = 0; i < lampCount; i++) {
			let vehicleCenter = Vector.random([0,0], [p.width,p.height])
			this.vehicles[i] = new BraitenbergVehicle(vehicleCenter, this.map)
		}
	}


	getClosest(pt, range) {
		return Vector.getClosest(pt, this.vehicles, range)
	}

	getLampStrength(index, t) {
		return 120 + 120*(.5 + .5*Math.sin(index + .3*t)) + 120*Math.sin(index)
	}
	
	update(p, time) {
		// Update the map 
		// (ie, redraw its background or blur or whatever)
		this.map.update(p, time)

		// Draw all of the lamps into the map buffer
		// so that the vehicles can detect them
		this.map.drawIntoBuffer((mapBuffer) => {
			// Each lamp draws at a different size
			this.lamps.forEach((lamp,lampIndex) => lamp.drawBlurryCircle({
				p: mapBuffer,
				layers: 9,
				radius: this.getLampStrength(lampIndex, time.t),
				opacity: .7 + .04*Math.sin(lampIndex + 2*time.t),
				opacityDieoff: 2,
				color: [1,166/255,81/255],
			}))
		})
		

		this.vehicles.forEach(v => v.update(p, time))

	}

	draw(p, time) {
		
		// Draw the lamps
		p.noStroke()
		this.lamps.forEach((lamp, lampIndex) => {
			p.fill(100)
			lamp.draw(p, 14)
			p.fill(255, 0, 0, .08)
			lamp.draw(p, .7*this.getLampStrength(lampIndex, time.t))
		
		})

		// Draw the vehicles
		this.vehicles.forEach(v => v.draw(p))

		// draw circles
		let mouse = new Vector(p.mouseX, p.mouseY)
		
		
		// Draw the map to the current layer
		//  Can use any P5 blend mode 
		// https://p5js.org/reference/#/p5/blend
		// let blendMode = p.MULTIPLY p.ADD p.DARKEST 
		let blendMode = p.SOFT_LIGHT
		this.map.draw(p, blendMode)


		// Reading the map at a point
		// This code reads the maps RED channel, 
		// at the current mouse location
		// and uses that to change the size of a circle
		let val = this.map.getValueAt(mouse)
		p.noFill()
		p.stroke(100)
		p.circle(...mouse, 2*val[0] + 10)

	}

}


//===============================================

let braitenbergCount = 0

// Look! Its still a vector, 
// just a FANCY vector 
// with its own methods and extra data
class BraitenbergVehicle extends Vector {
	constructor(pt, map) {
		super(pt)

		
		this.channel = 0 // This bot reads the red channel
		this.map = map

		// Give each vehicle a unique id in 
		// case we want individual behaviors
		this.idNumber = braitenbergCount++

		this.type = this.idNumber%4


		this.bodySize = 10

		// Which way is forward?
		this.forwardAngle = Math.random()*Math.PI*2

		// Track the velocity and force of this particle
		this.velocity = Vector.polar(30, this.forwardAngle)
		this.force = new Vector(0,0)

		
		this.eyes = [0,0]
		this.eyeRadius = this.bodySize*.7
		this.eyeAngle = 1.1

		// Each wheel has a speed that it's turning 
		this.wheels = [0,0]
	}

	update(p, time) {

		// Helper function to get the eye values
		let getEyeValue = (eyeSide) => {
			let pt = Vector.polarOffset(this, this.eyeRadius, this.eyeAngle*eyeSide + this.forwardAngle)
			
			let val = this.map.getValueAt(pt)
			// Read the right channel
			return val[this.channel]
		}

		// Get the value at the eyes
		this.eyes = [getEyeValue(-1), getEyeValue(1)]



		switch(this.type) {
			case 0: 
				this.wheels[1] = 1 - this.eyes[1]
				this.wheels[0] = 1 - this.eyes[0]
				break
			case 1: 
				this.wheels[1] = this.eyes[0]
				this.wheels[0] = this.eyes[1]
				break
			case 2: 

				this.wheels[1] = 1 - this.eyes[0]
				this.wheels[0] = 1 - this.eyes[1]
				break

			case 3: 
				this.wheels[0] = this.eyes[0]
				this.wheels[1] = this.eyes[1]
				break
		}
		
		
		// How much to spin given the wheel's speeds
		// Its a very bad differential drivetrain!
		let spinRate = .02 + .2*sliders.InsectTurn
		this.forwardAngle += (this.wheels[0] - this.wheels[1])*spinRate

		// How much to accelerate given the wheel's speeds
		let driveForce = (500)*(.2 + 2*sliders.InsectSpeed)*(this.wheels[0] + this.wheels[1])

		// Reset the force
		this.force.mult(0)
		
		// Increase my velocity by the force of my wheels
		this.force.addPolar(driveForce, this.forwardAngle)

		// Get the value for each of my eyespots

		// Apply lots of drag
		this.velocity.mult(1 - sliders.InsectDrag*1)
		// this.velocity.clampMagnitude(0, 2)


		this.velocity.addMultiples(this.force, time.dt)
		this.addMultiples(this.velocity, time.dt)
		
		
		let center = new Vector(p.width/2, p.height/2)

		let border = 10
		this.wrap(-border, p.width + border, -border, p.height + border)


	}

	draw(p) {
		p.push()
		// Move to where the bug is, and rotate accordingly
		p.translate(...this)
		p.rotate(this.forwardAngle)
	
		p.translate(this.bodySize*.3, 0)

		p.fill(49,31,88,0.5)
		p.stroke(49,31,88)
		
		this.wheels.forEach((w,wIndex) => {
				p.rotate(315);
				p.ellipse(-this.bodySize*.5, 0, this.bodySize*2, this.bodySize*1.2)
				p.circle(this.bodySize*.1+this.bodySize, 0, this.bodySize)

		})

		p.pop()
	}

	drawDebug(p) {
		
		p.push()
		p.translate(...this)
		p.rotate(this.forwardAngle)

		let arrowMult = 4*this.bodySize
		
		let forward = new Vector(1,0)

		forward.drawArrow({
			p: p,
			multiple: arrowMult,
			color: [150, 100, 50]
		})


		// Draw the wheel speeds
		this.wheels.forEach((w,wIndex) => {
			forward.drawArrow({
				p: p,
				center: [0,2*(wIndex-.5)*this.bodySize],
				multiple: w*arrowMult,
				color: [250, 100, 80]
			})

		})

		p.pop()
	}	
}
