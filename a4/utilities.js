/**
 * Assorted functions
 * 
 */


//=====================================================
// Color

// Hex to HSLA conversion adapted from
// https://css-tricks.com/converting-color-spaces-in-javascript/
// But now it returns an array

function hexToHSL(H) {
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0;
	if (H.length == 4) {
		r = "0x" + H[1] + H[1];
		g = "0x" + H[2] + H[2];
		b = "0x" + H[3] + H[3];
	} else if (H.length == 7) {
		r = "0x" + H[1] + H[2];
		g = "0x" + H[3] + H[4];
		b = "0x" + H[5] + H[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r,g,b),
	cmax = Math.max(r,g,b),
	delta = cmax - cmin,
	h = 0,
	s = 0,
	l = 0;

	if (delta == 0)
		h = 0;
	else if (cmax == r)
		h = ((g - b) / delta) % 6;
	else if (cmax == g)
		h = (b - r) / delta + 2;
	else
		h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0)
		h += 360;

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
	return [h, s, l]
}

function HSLToHex(h,s,l) {

	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
	x = c * (1 - Math.abs((h / 60) % 2 - 1)),
	m = l - c/2,
	r = 0,
	g = 0, 
	b = 0; 

	if (0 <= h && h < 60) {
		r = c; g = x; b = 0;
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
		r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
		r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
		r = c; g = 0; b = x;
	}
	// Having obtained RGB, convert channels to hex
	r = Math.round((r + m) * 255).toString(16);
	g = Math.round((g + m) * 255).toString(16);
	b = Math.round((b + m) * 255).toString(16);

	// Prepend 0s, if necessary
	if (r.length == 1)
		r = "0" + r;
	if (g.length == 1)
		g = "0" + g;
	if (b.length == 1)
		b = "0" + b;

	return "#" + r + g + b;
}


//=====================================================
// UI

function addToDropdown({elID, keys, startValue, onChange}) {
	let ls_name = "dropdown_" + elID
	el = document.getElementById(elID)

	// Make options for each key
	keys.forEach((key) => {
		option = document.createElement("option")
		option.innerText = key
		el.append(option)
	})

	// Set the initial value
	el.value = localStorage.getItem(ls_name) || startValue || keys[0]
	onChange(el.value)

	el.addEventListener('change',function(){
	   // When this is changed, store the value in local storage
	   onChange(this.value)
	   localStorage.setItem(ls_name, this.value)
	});
}

//=====================================================
// Sliders that are stored in local storage

// Load any sliders from localStorage
// That way when you reload the screen, it'll persist!




function addSlider(holder, key, val, onChange) {
	let ls_name = "slider_" + key
	// Get the previous value of this slider, if any
	let savedValue = .01*parseFloat(localStorage.getItem(ls_name))
	val = savedValue!=undefined?savedValue:val
	
	if (isNaN(val))
		val = .5

	// <input type="range" min="5" max="100" value="10" class="slider" onchange="tool.size = this.value*.1">
	let sliderHolder = document.createElement('div');
	sliderHolder.className="slider"
	let sliderLabel = document.createElement('div');
	sliderLabel.innerText = key
	sliderLabel.className = "slider-label"
	let sliderEl = document.createElement('input');

	sliderEl.value = val*100

	sliderEl.setAttribute("min", 0)
	sliderEl.setAttribute("max", 100)
	sliderEl.oninput = function() {
		let val = this.value	
		onChange(val*.01)
		localStorage.setItem(ls_name, val)
		console.log(key, val)
	
	}
	// sliderEl.setAttribute("oninput", `changeSlider('${key}', this.value*.01)`)
	sliderEl.setAttribute("type", "range")
	holder.append(sliderHolder)
	sliderHolder.append(sliderLabel)
	sliderHolder.append(sliderEl)

	onChange(val)
	
}