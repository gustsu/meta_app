$(function(){
	var element = document.documentElement;
	var medi_time = 300;
	if(element.scrollHeight > element.clientHeight) {
	  // Overflow detected; force scroll bar
	  element.style.overflow = 'scrollbar';
	} else {
	  // No overflow detected; prevent scroll bar
	  element.style.overflow = 'hidden';
	}

	$('#options-button').on('click', function(){
		$('#options-screen').addClass('slide-left');
	});

	$('#back-to-medi-screen').on('click', function(){
		$('#options-screen').removeClass('slide-left');
	});

	$('.option').on('click', function(){
		$(this).find('small').slideToggle();
		$(this).find('.full').slideToggle();
	});

	$('.meditate-button').on('click', function(){
		$('#main-screen').hide();
		$('#select-time').fadeIn(500);
	});

	$('#select-time .five').on('click', function(){
		$('#select-time').hide();
		medi_time = 300; //in seconds
		meditate(medi_time);
	});

	$('#select-time .ten').on('click', function(){
		$('#select-time').hide();
		medi_time = 600; //in seconds
		meditate(medi_time);
	});

	$('#select-time .fifteen').on('click', function(){
		$('#select-time').hide();
		medi_time = 900; //in seconds
		meditate(medi_time);
	});

	$('#done-button').on('click', function(){
		$('#done-screen').hide();
		$('#main-screen').fadeIn(500);
	});

	function meditate() {
		$('#prep span:nth-child(1)').fadeIn(500);
		$('#prep span:nth-child(1)').delay(500).fadeOut(500);
		$('#prep span:nth-child(2)').delay(1000).fadeIn(500);
		$('#prep span:nth-child(2)').delay(500).fadeOut(500);
		$('#prep span:nth-child(3)').delay(2000).fadeIn(500);
		$('#prep span:nth-child(3)').delay(500).fadeOut(500);
		setTimeout(function(){
			$('#meditate-screen').show();
			var display = document.querySelector('#time');
		    var timer = new CountDownTimer(medi_time);
		    var timeObj = CountDownTimer.parse(medi_time);
		    timer.start();
		    format(timeObj.minutes, timeObj.seconds);
		    timer.onTick(format);
			timer.onTick(function(){
				if (timer.running === false) {
					setTimeout(1000);
					console.log('done with this screen please!');
					$('#meditate-screen').hide();
					$('#done-screen').fadeIn(500);
				}
			});
			function format(minutes, seconds) {
			    minutes = minutes < 10 ? "0" + minutes : minutes;
			    seconds = seconds < 10 ? "0" + seconds : seconds;
			    display.textContent = minutes + ':' + seconds;
			}
		}, 3500);
	}

});





function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};