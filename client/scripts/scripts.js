/** ********************************************** **
	@Author			Dorin Grigoras
	@Website		www.stepofweb.com
	@Last Update	Friday, August 21, 2015

	NOTE! 	Do not change anything here if you want to
			be able to update in the future! Please use
			your custom script (eg. custom.js).


	TABLE CONTENTS
	-------------------------------


	INLINE SCRIPTS
	-------------------------------
		COUNT TO
			https://github.com/mhuggins/jquery-countTo

		BROWSER DETECT

		Appear
			https://github.com/bas2k/jquery.appear/

		Parallax
			http://www.ianlunn.co.uk/plugins/jquery-parallax/

		jQuery Easing v1.3
			http://gsgd.co.uk/sandbox/jquery/easing/

		WOW - v1.0.3
			http://mynameismatthieu.com/WOW/

		Modernizr 2.7.1
			http://modernizr.com/download/#-csstransforms3d-csstransitions-video-touch-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
*************************************************** **/
Meteor.startup(function() {
	$('body').addClass('smoothscroll enable-animation ');
 Uploader.finished = function(index, file) {
	 Uploads.insert(file);
 }

	 return SEO.config({
	 auto: {
		 twitter: false,
		 og: false,
		 set: ['description', 'title']
	 },
	 title: "Grandview Realty - Columbus IN 47201",
	 meta: {
	 'description': "Grandview Realty is known for bringing buyers to the lake and matching them with the right Grandview Lake Property"
	 }
	 });


});
