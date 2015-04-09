// Doc ready
$(function(e) {

	// plant invitation cookie to let folks know they can plant the paper
	if (!$.cookie('plant_your_invites')) {
	    $( "#plant-invites" ).show();
	    $(".close").click(function() {
	        $( "#plant-invites" ).slideUp( "slow" );
	        // set the cookie until you remove cookie
	        $.cookie('plant_your_invites', true, { expires: 90 });
	    });
	}
	

	var header = $('header').outerHeight() + 20;

	$("nav ul a, #thanks a").click(function(e) {
	    e.preventDefault();
	    var id = $(this).attr('href').substring(1);
	    $('html,body').animate({scrollTop: $('#'+id).offset().top - header}, 'fast');
	    window.history.pushState("", "", '/' + id);
	});

	//console.log((window.location.pathname.match(/^\//i)));

	// scroll to rsvp section when url is input into address bar
	if (document.location.pathname.indexOf("/rsvp") == 0) {
    	$('html,body').animate({
    		scrollTop: $('#rsvp').offset().top - header}, 'fast'
    	);
	}

});