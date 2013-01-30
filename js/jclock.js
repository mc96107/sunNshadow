(function($) {
        
  var jClock = window.jClock = function(clock, canvas, options) {
    
    var ctx, img;

    // Canvas isn't supported, abort
    if(!(ctx = canvas.getContext('2d'))) return;
    
    options = $.extend(true, {}, jClock.defaults, options);
    img = new Image();
    img.src = clock;
    
    // Need to wait until after the image is loaded
    img.onload = function() {
      tick();
      setInterval(tick, 200);
    };
    
    // The ticker, draws the clock upon each tick
    function tick() {
      var now = new Date(),
          sec = $("#ar").val(),
          min = ($("#azimuth").val()),
          hour = 360-$("#comphead").val(),
		  inclinn = $("#incl").val();
      
      // do the clock
      drawClock();
      
      // do the second hand
	  if($("#shadow").val()<0){
      drawHandss(sec * Math.PI/180, options.second);}
	  else{drawHandss(sec * Math.PI/180, options.second1);}
      
      // do the minute hand
      drawSun((min-180) * Math.PI/180, options.minute);
      
      // do the hour hand
      drawHand((hour) * Math.PI/180, options.hour);
	  drawHand1((hour) * Math.PI/180, options.hour1);
    }
    
    function drawClock() {
      ctx.clearRect(0, 0, options.height, options.width);
      ctx.drawImage(img, 0, 0, options.width, options.height);
      ctx.save();
    }
    
    function drawHand(radians, opts) {
      radians -= 90 * Math.PI/180; // fix orientation
      
      ctx.save();
      ctx.beginPath();
      ctx.translate(options.height/2, options.width/2);
      
      // Set hand styles
      ctx.strokeStyle = opts.color;
      ctx.lineWidth = opts.width;
      ctx.globalAlpha = opts.alpha;
      ctx.fillStyle=opts.color;
      ctx.rotate(radians);
      ctx.moveTo(0, -2);
	  ctx.lineTo(0, 2);
      ctx.lineTo(opts.end, 0);
	ctx.closePath();
	ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
	
	function drawHand1(radians, opts) {
      radians -= 90 * Math.PI/180; // fix orientation
      
      ctx.save();
      ctx.beginPath();
      ctx.translate(options.height/2, options.width/2);
      
      // Set hand styles
      ctx.strokeStyle = opts.color;
      ctx.lineWidth = opts.width;
      ctx.globalAlpha = opts.alpha;
      ctx.fillStyle=opts.color;
      ctx.rotate(radians);
	ctx.moveTo(0, -2);
	  ctx.lineTo(0, 2);
      ctx.lineTo(opts.start, 0);
	ctx.closePath();
	ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

	function drawSun(radians, opts) {
      radians -= 90 * Math.PI/180; // fix orientation
      
      ctx.save();
      ctx.beginPath();
      ctx.translate(options.height/2, options.width/2);
      
      // Set hand styles
      ctx.strokeStyle = opts.color;
      ctx.lineWidth = opts.width;
      ctx.globalAlpha = opts.alpha;
               
      ctx.rotate(radians);
ctx.fillStyle="#FFFC00";
ctx.arc(opts.end,0,5,0,Math.PI*2,true);
ctx.closePath();
ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
	
	    function drawHandss(radians, opts) {
      radians -= 90 * Math.PI/180; // fix orientation
      
      ctx.save();
      ctx.beginPath();
      ctx.translate(options.height/2, options.width/2);
      
      // Set hand styles
      ctx.strokeStyle = opts.color;
      ctx.lineWidth = opts.width;
      ctx.globalAlpha = opts.alpha;
      if (options.shadow === true) {
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 1;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      }
                
      ctx.rotate(radians);
      ctx.moveTo($("#shadow").val(), 0);
      ctx.lineTo(opts.end, 0);
	  ctx.fillStyle="#0030FF";
	  ctx.fillRect(opts.end,-5,10,10);
      ctx.stroke();
      ctx.restore();
    }

  };
  
  // Default options
  jClock.defaults = {   
    height: 250,
    width: 250,
    secondHand: true,
    shadow: true,
    second: {
      color: '#A74450',
      width: 8,
      start: 0,
      end: 40,
      alpha: 1
    },
    second1: {
      color: '#fff',
      width: 8,
      start: 0,
      end: 40,
      alpha: 1
    },
    minute: {
      color: '#fff',
      width: 0,
      start: 0,
      end: 55,
      alpha: 1
    },
    hour: {
      color: '#ED264B',
      width: 0,
      start: -35,
      end: 35,
      alpha: 1
    },     
    hour1: {
      color: '#D4D4D4',
      width: 0,
      start: -35,
      end: 35,
      alpha: 1
    }  
  };
  
})(jQuery);