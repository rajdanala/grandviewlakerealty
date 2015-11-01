Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('grandviewpages');}
})

Router.route("/",{
	name: "homeIndex",
	data: function () {
		return  GrandviewPages.findOne({'menu':'Home'});
	},
	waitOn: function() {
	return Meteor.subscribe('grandviewpages')

	}
});

Router.route("/listings",{
	name: "homeListings",
	data: function () {return {listings: GrandviewListings.find() }},
	waitOn: function () {
			return Meteor.subscribe('grandviewlistings')
	}
});
Router.route("/listingdetails/:mlsId",{
	name:"homeListingDetails",
	data: function() {return {pageContent: GrandviewListings.findOne({'mlsId':this.params.mlsId}).description}},
	waitOn: function () {
			return Meteor.subscribe('grandviewlistings')
	}
});
//GrandviewListings.findOne({mlsId:'21501546'}).description
// Router.route("/about",{
// 	name: "homeAbout",
// 	data: function () {
// 		return {
// 		//	var aboutPage = GrandviewPages.findOne({menu:"About"});
//       aboutPageContent: GrandviewPages.findOne({menu:"About"}).pageContent
// 		}
// 	}
// });
//
// Router.route("/contact",{
// 	name: "homeContact"
// });
//
// Router.route("/mls",{
// 	name: "homeMlsListings"
// });
//
// Router.route("/list",{
// 	name: "homeListsheet"
// });
//
// Router.route("/tiny",{
// 	name: "homeTiny",
// });

Router.route("/admin",{
	layoutTemplate:"adminLayout",
	name:"adminHome",
	data: function () {
	return {
		pages: GrandviewPages.find({},{sort :{menuorder: 1}})
		}
	}
});

Router.route("/admin/page/:_id",{
	layoutTemplate:"adminLayout",
	name:"adminPageEdit",
	data: function() { return GrandviewPages.findOne(this.params._id); }
});

Router.route("/admin/listings",{
	layoutTemplate:"adminLayout",
	name:"adminListings",
	data: function () {
	return {
		listings: GrandviewListings.find()
		}
	},
	waitOn: function () {
			return Meteor.subscribe('grandviewlistings')
	}

});
Router.route("/admin/listing/:_id",{
	layoutTemplate:"adminLayout",
	name:"adminListingEdit",
	data: function() { return GrandviewListings.findOne(this.params._id); },
	waitOn: function () {
			return Meteor.subscribe('grandviewlistings')
	}
});
Router.route("/admin/media",{
	layoutTemplate:"adminLayout",
	name:"adminMediaListings",
	waitOn: function () {
		return Meteor.subscribe('images')
	}

});

Router.route("/:menu",{
	name: "homePage",
	data: function () {
		console.log("Printing  " + this.params.menu);
		if(this.params.menu === 'listings'){
			this.render('homeListings');
		}
	var path = path = this.params.menu;

	var	page  = GrandviewPages.findOne({seourl: path});
	if(page === undefined || page === null){
			this.render('notFound');
	}
		//console.log("what is page 2 : "+GrandviewPages.findOne({seourl: this.params.menu}));
		return GrandviewPages.findOne({seourl:path});
	 }
});


var requireLogin = function () {
	if(! Meteor.user()) {
		if(Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction(requireLogin,
											{
												only:['adminHome','adminPageEdit',
															'adminListings','adminListingEdit'
														]
											});
