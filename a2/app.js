// Utility functions
// Given a processing object, a loop length, a radius, and an offset (optional)
function getLoopingNoise({
    p,
    loopLength,
    radius,
    offset = 0
  }) {
    let t = p.millis()
  
  
  
    // This number should go from 0 to 1 every loopLength seconds
    // And PI*2 radians every loopLength seconds
    let noiseScale = 1
    let loopPct = (t * .001 / loopLength) % 1
  
    let theta = 2 * Math.PI * loopPct
  
    // Place to sample the noise from
    let x = radius * Math.cos(theta)
    let y = radius * Math.sin(theta)
  
    let noiseVal = p.noise(x * noiseScale, y * noiseScale, offset)
    return noiseVal
  }
  
  
  function getP5Element(index) {
    let element = document.getElementById("drawing" + index).getElementsByClassName("drawing-p5holder")[0]
    return element
  }
  
  
  //===========================================================
  
  const WIDTH = 500
  const HEIGHT = 500
  
  // Run this function after the page is loaded
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Hello, animation!")
  
    // Rename your drawing here if you want
    let drawingTitles = ["Portrait",
      "Balls movement",
      "Random Circles",
    ]
    let mainElement = document.getElementById("main")
  
    // Ignore this section if you want
    // This is me adding a label and a canvas-holder to each swatch
    // For each drawing
    for (var i = 0; i < 3; i++) {
      let el = document.createElement("div")
      el.className = "drawing"
      el.id = "drawing" + i
      mainElement.append(el)
  
  
      // Add a label
      let label = document.createElement("div")
      label.className = "drawing-label"
      label.innerHTML = "Drawing #" + i + ":" + drawingTitles[i]
      el.append(label)
  
      // Add a div to hold the canvas (so we can resize it independently of the outer frame)
      let canvasHolder = document.createElement("div")
      canvasHolder.className = "drawing-p5holder"
      canvasHolder.style = `width:${WIDTH};height:${HEIGHT}`
      el.append(canvasHolder)
    }
  
    // Comment out these lines to not draw each
    setupDrawing0()
    setupDrawing1()
    setupDrawing2()
    // setupDrawing3()
    // setupDrawing4()
    // setupDrawing5()
    // setupDrawing6()
    // setupDrawing7()
    // setupDrawing8()
  
  });
  
  
  function setupDrawing0() {
  
    // Do things *once, before* P5 starts drawing
    function setup(p) {
      // Create the canvas in the right dimension
      p.createCanvas(WIDTH, HEIGHT);
  
      // Set the color mode
      // P5 has lots of ways to express colors
      // I like to use HSL mode, because it's also in CSS,
      // and because I find it easy to do colors:
      // p.fill(180,100,10)	// Very dark blue
      // p.fill(180,100,50)	// Medium blue
      p.fill(180,100,90)	// Very pale blue
      // p.fill(180,50,50)	// Desaturated blue
      // p.fill(170,50,50)	// greener-blue
      // p.fill(190,50,50)	// purpler-blue
      p.colorMode(p.HSL);
  
      // Set the background to black
      // p.background(37, 56, 119, 0);
    }
  
    // Draw (or do) things *each frame*
    function draw(p) {
      // Paint the previous canvas black to erase it.
      // What happens if you comment this out?
      p.background(0);
      p.fill(180,100,90);
  
      // How many seconds has it been since we started?
      // To make an animation, what you draw will change over *time*
      // P is the processing object.
      // It has lots of methods for tracking time
      // and methods for drawing to the canvas (p.background, p.fill, p.circle...etc)
      let t = p.millis() * .001
  
      // 1
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
  
      var gear = new Gear(WIDTH / 2+50, 10, 2, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,255);
  
      // 2
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
  
      var gear = new Gear(WIDTH / 2+30, 30, 1.8, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,170);
  
      // 3
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+12, 55, 1.6, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,85);
  
      // 4
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+3, 80, 1.4, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,220);
  
      // 5
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+5, 110, 1.3, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,255);
  
      // 6
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+10, 130, 1.2, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,160);
  
      // 7
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+20, 150, 1.1, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,210);
  
      // 8
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+30, 170, 1.1, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,210);
  
      // 9
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+28, 190, 1.0, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,210);
  
      // 10
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+20, 210, 1.0, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,210);
  
      // 11
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2+10, 230, 0.9, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,210);
  
      // 12
      var x = [-1,1];
      var changex = x[Math.floor(Math.random() * 2)];
      var changey = x[Math.floor(Math.random() * 2)];
      
      var gear = new Gear(WIDTH / 2, 250, 0.8, 12, "white", "rgba(229, 156, 156, 1)");
      gear.render(p,t,changex,changey,210);
  
       // 13
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2-5, 270, 0.7, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 14
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+10, 280, 0.7, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 15
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+30, 285, 0.7, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 16
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+50, 290, 0.6, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 16
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+48, 310, 0.6, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 17
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+44, 330, 0.5, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 18
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+42, 345, 0.5, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 19
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+55, 355, 0.5, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 19
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+60, 365, 0.4, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 20
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+55, 375, 0.4, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 21
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+60, 385, 0.4, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 23
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+60, 397, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 24
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+55, 405, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 25
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+53, 415, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 26
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+60, 425, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 27
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+70, 430, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 28
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+80, 433, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 29
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+90, 435, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 30
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+105, 438, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 31
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+115, 441, 0.3, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 32
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+120, 450, 0.25, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 32
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+123, 460, 0.2, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 33
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+126, 470, 0.2, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 34
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+129, 480, 0.1, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
  
       // 35
       var x = [-1,1];
       var changex = x[Math.floor(Math.random() * 2)];
       var changey = x[Math.floor(Math.random() * 2)];
       
       var gear = new Gear(WIDTH / 2+131, 490, 0.1, 12, "white", "rgba(229, 156, 156, 1)");
       gear.render(p,t,changex,changey,210);
    }
  
    // Setup a P5 instance with these draw and setup functions
    // Yes, this code is very weird.  You can ignore it
    let element = getP5Element(0) // My function to get the element for this index
    let myP5 = new p5(function(p) {
      p.setup = () => setup(p)
      p.draw = () => draw(p)
    }, element);
  }
  
  
  function setupDrawing1() {
  
    function setup(p) {
      p.createCanvas(WIDTH, HEIGHT);
      p.colorMode(p.HSL);
      p.background(0);
    }
  
    function draw(p) {
      if (p.frameCount % 5 === 0)
        p.background(37, 56, 119, .05);
  
      let t = p.millis() * .001
      let hue = (t * 100) % 360 
  
      let count = 10
      for (var i = 0; i < count; i++) {
  
        let pct = i / count
        p.fill(hue, 100, 90)
  
        p.strokeWeight(10)
        p.stroke(hue, 100, pct * 100 - 20)
  
        var x = pct * p.width
        var y = (.5 + .5 * Math.sin(t * 1 + i * 1)) * p.height
        p.ellipse(x, y, 40, 40)
        var y = pct * p.width
        var x = (.5 + .5 * Math.cos(t * 1 + i * 1)) * p.width
        p.ellipse(x, y, 40, 40)
      }
    }
  
  
    let element = getP5Element(1) // <- Make sure to change this to the right index
    let myP5 = new p5(function(p) {
      p.setup = () => setup(p)
      p.draw = () => draw(p)
    }, element);
  }
  
  
  function setupDrawing2() {
    function setup(p) {
      p.createCanvas(WIDTH, HEIGHT);
      p.colorMode(p.HSL);
      p.background(0);
    }
  
    function draw(p) {
      if (p.frameCount % 5 === 0)
        p.background(37, 56, 119, .05);
  
      let t = p.millis() * .001
      let hue = (t * 100) % 360 
  
      let count = 10
      var timeinterval = 200
      for (var i = 0; i < count; i++) {
  
        if(i*timeinterval < t){
        let pct = i / count
        var currentx = Math.random()*500;
        var currenty = Math.random()*500
        p.fill(hue, 100, pct * 100 - 20)
        var x = currentx
        var y = currenty
        p.ellipse(x, y, 200, 200)
        }
      }
    }
  
  
    let element = getP5Element(2) // <- Make sure to change this to the right index
    let myP5 = new p5(function(p) {
      p.setup = () => setup(p)
      p.draw = () => draw(p)
    }, element);
  }
  
  
  var Gear = function(x, y, connectionRadius, teeth, fillStyle, strokeStyle) {
    // Gear parameters
    this.x = x;
    this.y = y;
    this.connectionRadius = connectionRadius;
    this.teeth = teeth;
  
    // Render parameters
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
  
    // Calculated properties
    this.diameter = teeth * 4 * connectionRadius; // Each tooth is built
                                                  // from two circles of connectionRadius
    this.radius = this.diameter / (2 * Math.PI); // D = 2 PI r
  
    // Animation properties
    this.phi0 = 0; // Starting angle
    this.angularSpeed = 0; // Speed of rotation in degrees per second
    this.createdAt = new Date(); // Timestamp
  }
  
  Gear.prototype.render = function (p,t,changex,changey,color) {
    // Update rotation angle
    var ellapsed = new Date() - this.createdAt;
    var phiDegrees = this.angularSpeed * (ellapsed / 20000);
    var phi = this.phi0 + (phiDegrees); // Current angle
  
    // Set-up rendering properties
    p.fillStyle = this.fillStyle;
    p.strokeStyle = this.strokeStyle;
    p.lineCap = 'round';
    p.lineWidth = 1;
  
    // Draw gear body
    // p.beginPath();
    // p.beginShape();
    for (var i = 0; i < this.teeth * 2; i++) {
        var alpha = 2 * Math.PI * (i / (this.teeth * 2)) + phi;
        // Calculate individual touth position
        var nowx = this.x+changex;
        var nowy = this.y+changey;
        var x = nowx + Math.cos(alpha) * this.radius;
        var y = nowy + Math.sin(alpha) * this.radius;
        p.line(nowx,nowy,x,y);
        p.stroke(color);
          // color = (Math.max(0,color[0]-100*t),Math.max(0,color[1]-100*t),Math.max(0,color[2]-100*t));
          // p.stroke(Math.max(0,color));
    }
  
    // p.beginShape();
    p.arc(this.x, this.y, this.connectionRadius, 0, 2 * Math.PI, true);
  
    var rad = this.radius;
    // color = (Math.max(0,color[0]-10*t),Math.max(0,color[1]-10*t),Math.max(0,color[2]-10*t));
  }
  
  function wait(p,time)
  {
    var start = p.millis()
    var current;
    do
    {
      var current = p.millis();
    }
    while(current < start + time)
  }