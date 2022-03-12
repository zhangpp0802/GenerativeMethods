
// Cyberpunk DJ mask.  Could make the ears vibrate with music

masks.blank = function( p) {
	let t = p.millis()*.004
		
	p.background(bgcolor[0],bgcolor[1],bgcolor[2])


	// Make an outline but also make it weird
	let outlineCount = 4
	for (var i = 0; i < outlineCount; i++) {
		let pct = (i/outlineCount + t*.3)%3
		let opacity = Math.sin(pct*Math.PI)
		let faceOutline = joinSides(face.sides[0].faceRings[0],face.sides[1].faceRings[0]).map(((pt,index) => {
			let pt2 = new Vector()
			pt2.setToLerp(face.center, pt, .004 +pct + pct*noise(t + index*.4 + pct))
			pt2[0] *= 6
			return pt2
		}))
		p.stroke(60, 20, 100, opacity)
		drawContour(p, faceOutline.slice(1), true)
	}
	

	face.sideOrder.forEach((side) => {

        // side.faceRings.forEach((ring,index) =>{
		// 	p.fill(160,70,50)
		// 	drawContour(p.ring)
		// })

		face.sideOrder.forEach((side) => {
			let eyebrow = side.eyeRings[0].slice(2, 6).map(pt => {
				let pt2 = new Vector(0,0)
				pt2.setToLerp(side.eye, pt, .1 + 3 * SLIDER.eyebrow)
				return pt2
			})
			p.stroke(300,100,0)
			p.fill(earcolor[0],earcolor[1],earcolor[2])
			drawContour(p, eyebrow)
		})

		side.ear[1].draw(p, 20*face.scale)
		side.ear[1].draw(p, 10*face.scale)

		let eyebrow = side.eyeRings[0].slice(2, 7).map(pt => {
			let pt2 = new Vector(0,0)

			pt2.setToLerp(side.eye, pt, .1 + 1.5 * SLIDER.eyebrow)
			return pt2
		})


		// Draw the face background by filling in between the face side and the centerline
		// side.index is either 1 or -1, so we can use that to change color between sides
		p.fill(facecolor[0], facecolor[1], facecolor[2] + side.index*10)
		drawStrip(p, side.faceRings[0], face.centerLine)
		
		p.noStroke()

		// // Draw multiple strips around the face
		for (var i = 0; i < 2; i++) {
			
			p.fill((i*30 + 50 + 40*t)%360, 100, 50)

			// Draw the triangle mesh
			drawStrip(p, side.faceRings[i + 1], side.faceRings[i])
		}
		drawContour(p,side.eyeRings[1],false)
		p.fill(301,100,50,0.8)
	    side.eyeRings[0].forEach(pt=> p.circle(...pt,5))
		p.fill(237,100,50,0.7)
		side.eyeRings[1].forEach(pt=> p.circle(...pt,5))
		p.fill(200,100,50,0.7)
		side.eyeRings[3].forEach(pt=> p.circle(...pt,3))
		
     

		hand.forEach(h => {
			h.fingers.forEach(finger => {
				let blue = SLIDER.fingercolor*60
				
				drawNeonContour(p, finger, fingercolor, 7, false)
         
				finger.forEach(f => {
					p.circle(...f,5)
				})
				let tip = finger[3]
				p.push()

				p.noStroke()
				p.translate(...tip)
				p.fill(358, 100, 50)
				p.pop()


			})
		})
	})


	// Draw lines between each of the face points on either side
	// for (var i = 0; i < 18; i++) {
	// 	p.strokeWeight(3)
	// 	p.stroke(i*20, 100, 50)
	// 	let p0 = face.sideOrder[0].faceRings[2][i]
	// 	let p1 = face.sideOrder[1].faceRings[2][i]
	// 	Vector.drawLineBetween({p:p, v0: p0, v1: p1})
	// }

	// Draw the eye on either side
	// face.sideOrder.forEach((side) => {
	// 	// Draw the eye lines
	// 	side.eyeRings.forEach((eyeRing,eyeIndex) => {
	// 		if (eyeIndex === 4) {
	// 			p.fill(0)
	// 			p.noStroke()
	// 			drawContour(p, eyeRing, true)
	// 		}

	// 		let h = (40 + 70*eyeIndex + t*80)%360
			
	// 		drawNeonContour(p, eyeRing, [h, 100, 50], 5, true)
	// 	})


	// })

	// Draw the center face line
	// p.noFill()
	drawNeonContour(p, face.centerLine.slice(0,14), [250, 100, 50], 10, false)
	// drawNeonContour(p, face.centerLine.slice(20), [150, 100, 50], 10, false)

	p.noFill()
	// Draw the mouth lines
	face.mouth.forEach((mouthLine,mouthIndex) => {
		if (mouthIndex > 2) {
			if (mouthIndex === 4) {
				p.fill(0)
				p.noStroke()
				
				drawContour(p, mouthLine, true)
			}

			let h = (10 + 20*mouthIndex + 100*t)%360
			
			// Neon style
			drawNeonContour(p, mouthLine, [h, 20, 150], 5, true)
		
		}
	})
}
