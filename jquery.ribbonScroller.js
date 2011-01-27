/*
	jquery.ribbonScroller.js
	Created 1/27/11 by Gavin Koehler -- gkoehler@gmail.com

*/

(function( $ ){
  $.fn.ribbonScroller = function(options) {
  
	// set the options
	options = options || {};
	options.height = options.height || 90;
	options.width = options.width || 120;
	options.padding = options.padding || 5;
	options.minImageCount = options.minImageCount || 20;
	
	var container = this;
	
	// set the height of the container to the height passed in
	container.height(options.height);
	
	// change it from a flowing grid of images to a ribbon
	container.css({
		overflow:'hidden',
		position:'relative'
		});
	
	// remove and re-add all the <a> tags to the ribbon
	var ar = [];
	$('.cRibbon a', container).each(function(){
		ar.push($(this).css({paddingRight:'5px'}).remove());
	});
	
	$(ar).each(function(){
		$('.cRibbon', container).append(this);
	});
	
	// we need at least minImageCount elements in there to fit all screen sizes
	// (devices can rotate, so we can't rely on them for their screen width)
	if (ar.length < options.minImageCount) {
		for (var i=0; i < (options.minImageCount - ar.length); i++) {
			$('.cRibbon', container).append($('.cRibbon a', container).eq(i).clone());
		};
	}
	
	// change the positioning of the anchor tags
	var fcnPosition = function(offset) {
		
		if (offset == (0 - (options.width + options.padding))) {
			// if it has completely disappeared, put the picture from the beginning at the end
			$('.cRibbon', container).append($('.cRibbon a:first', container).remove());
			// reset the ribbon to be left-aligned again
			offset = 0;
		};
		
		// set the width and positioning of cRibbon
		$('.cRibbon', container).css({
			position:'absolute',
			width: $(container).width() + (2 * (options.width + options.padding)),
			left:offset
		});
		
		return offset;
	};
	
	// set up the animation
	var totalOffset = 0;
	intervalObj = null;
	var fcnStartAnimation = function(){
		intervalObj = setInterval(function() {
			totalOffset = fcnPosition(totalOffset) - 1;
		}, 30);
	};
	
	var fcnPauseAnimation = function(){
		clearInterval(intervalObj);
	};
	
	// get the whole thing going
	fcnStartAnimation();
	
	// pause the animation when the mouse hovers over it
	container.hover(fcnPauseAnimation,fcnStartAnimation);
  };
})(jQuery);