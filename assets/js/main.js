// Doc ready
$(function(e) {

	// plant invitation cookie to let folks know they can plant the paper
	if (!$.cookie('plant_your_invites')) {
		//$('body').css({'padding' : '285px 0 0 0'});
	    $('#plant-invites').show();
	    $('.close').click(function() {
	        $('#plant-invites').slideUp( 'slow' );
	        // set the cookie until you remove cookie
	        $.cookie('plant_your_invites', true, { expires: 90 });
	        if ($('#plant-invites').hasClass('active')) {
	        	$('#plant-invites').removeClass('active');
	        }
	        //$('body').css({'padding' : '215px 0 0 0'});
	    });
	} else {
		//$('body').css({'padding' : '215px 0 0 0'});
	}

	// Create a clone of the menu, right next to original.
	$('.nav-container').addClass('original').clone().insertAfter('.nav-container').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

	scrollIntervalID = setInterval(stickIt, 10);


	function stickIt() {

	  var orgElementPos = $('.original').offset();
	  orgElementTop = orgElementPos.top;               

	  if ($(window).scrollTop() >= (orgElementTop)) {
	    // scrolled past the original position; now only show the cloned, sticky element.

	    // Cloned element should always have same left position and width as original element.     
	    orgElement = $('.original');
	    coordsOrgElement = orgElement.offset();
	    leftOrgElement = coordsOrgElement.left;  
	    widthOrgElement = orgElement.css('width');
	    $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
	    $('.original').css('visibility','hidden');
	  } else {
	    // not scrolled past the menu; only show the original menu.
	    $('.cloned').hide();
	    $('.original').css('visibility','visible');
	  }
	}
	

	var header = $('.nav-container').outerHeight() + 15;

	$('nav ul a.single-page, #thanks a').click(function(e) {
	    e.preventDefault();
	    var id = $(this).attr('href').substring(1);
	    $('html,body').animate({scrollTop: $('#'+id).offset().top - header}, 'fast');
	    window.history.pushState("", "", '/' + id);
	});

	//console.log((window.location.pathname.match(/^\//i)));

	// scroll to rsvp section when url is input into address bar
	/*if (document.location.pathname.indexOf('/rsvp') == 0) {
    	$('html,body').animate({
    		scrollTop: $('#rsvp').offset().top - header}, 'fast'
    	);
	}*/

});