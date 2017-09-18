blackhole(document.getElementById('blackhole'));

function blackhole(element) {
	var h = element.offsetHeight,
        w = element.offsetWidth
	    cw = w,
	    ch = h,
	    maxorbit = 255, // distance from center
	    centery = ch/2,
	    centerx = cw/2;

	var startTime = new Date().getTime();
	var currentTime = 0;
    
	var stars = [],
	    collapse = false, // if hovered
	    expanse = false; // if clicked

    var canvas = document.getElementById('canvas')
    canvas.width = cw;
    canvas.height = ch;
    canvas.style.width = cw + 'px';
    canvas.style.height = ch + 'px';
    
    context = canvas.getContext("2d");

	context.globalCompositeOperation = "multiply";

	function setDPI(canvas, dpi) {
		if (!canvas.style.width)
			canvas.style.width = canvas.width + 'px';
		if (!canvas.style.height)
			canvas.style.height = canvas.height + 'px';
		canvas.width = Math.ceil(canvas.width * dpi);
        canvas.height = Math.ceil(canvas.height * dpi);
        
		var ctx = canvas.getContext('2d');
        ctx.scale(dpi, dpi);
	}

	function rotate(cx, cy, x, y, angle) {
		var radians = angle,
		    cos = Math.cos(radians),
		    sin = Math.sin(radians),
		    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
		    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
		return [nx, ny];
	}

	setDPI(canvas, window.devicePixelRatio || 2);

	var star = function(){
		var rands = [];
		rands.push(Math.random() * (maxorbit/2) + 1);
		rands.push(Math.random() * (maxorbit/2) + maxorbit);

		this.orbital = (rands.reduce(function(p, c) {
			return p + c;
		}, 0) / rands.length);

		this.x = centerx; 
		this.y = centery + this.orbital;

		this.yOrigin = centery + this.orbital;

		this.speed = (Math.floor(Math.random() * 2.5) + 1.5)*Math.PI/180;
		this.rotation = 0;
		this.startRotation = (Math.floor(Math.random() * 360) + 1)*Math.PI/180;

		this.id = stars.length;

		this.collapseBonus = this.orbital - (maxorbit * 0.7); 
		if(this.collapseBonus < 0){ 
			this.collapseBonus = 0; 
		}

        stars.push(this);
        
		this.color = 'rgba(255,255,255,'+ (1 - ((this.orbital) / 255)) +')';
		this.hoverPos = centery + (maxorbit/2) + this.collapseBonus; 
		this.expansePos = centery + (this.id%100)*-10 + (Math.floor(Math.random() * 20) + 1);
		this.prevR = this.startRotation;
		this.prevX = this.x;
		this.prevY = this.y;
    }
    
	star.prototype.draw = function(){
		if(!expanse){
			this.rotation = this.startRotation + (currentTime * this.speed);
			if(!collapse){ 
				if(this.y > this.yOrigin){
					this.y-= 2.5;
				}
				if(this.y < this.yOrigin-4){
					this.y+= (this.yOrigin - this.y) / 10;
				}
			} else {
				this.trail = 1;
				if(this.y > this.hoverPos){
					this.y-= (this.hoverPos - this.y) / -5;
				}
				if(this.y < this.hoverPos-4){
					this.y+= 2.5;
				}
			}
		} else {
			this.rotation = this.startRotation + (currentTime * (this.speed / 2));
			if(this.y > this.expansePos){
				this.y-= Math.floor(this.expansePos - this.y) / -140;
			}
		}

		context.save();
		context.fillStyle = this.color;
		context.strokeStyle = this.color;
		context.beginPath();
		var oldPos = rotate(centerx,centery,this.prevX,this.prevY,-this.prevR);
		context.moveTo(oldPos[0],oldPos[1]);
		context.translate(centerx, centery);
		context.rotate(this.rotation);
		context.translate(-centerx, -centery);
		context.lineTo(this.x,this.y);
		context.stroke();
		context.restore();

		this.prevR = this.rotation;
		this.prevX = this.x;
		this.prevY = this.y;
	}

    var bhHover = document.getElementsByClassName('blackhole-hover')[0]
    bhHover.onclick = function () {
        collapse = false;
        expanse = true;
        bhHover.setAttribute('class', 'open')
        document.getElementsByClassName('container')[0].style.display = 'block';
    }

    bhHover.onmouseover = function () {
        if(expanse == false){
			collapse = true;
		}
    }

    bhHover.onmouseout = function () {
        if(expanse == false){
			collapse = false;
		}   
    }

	window.requestFrame = (function(){
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	function loop(){
		var now = new Date().getTime();
		currentTime = (now - startTime) / 50;

		context.fillStyle = 'rgba(25,25,25,0.2)';
		context.fillRect(0, 0, cw, ch);

		for(var i = 0; i < stars.length; i++){
			if(stars[i] != stars){
				stars[i].draw();
			}
		}
		requestFrame(loop);
	}

	function init(time){
		context.fillStyle = 'rgba(25,25,25,1)';
		context.fillRect(0, 0, cw, ch);
		for(var i = 0; i < 2500; i++){
			new star();
		}
		loop();
	}
	init();
}


