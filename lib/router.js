Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('grandviewpages');}
})

Router.route("/",{
	name: "homeIndex",
	data: function () {
		return {
			message: "Welecome to Grandview Realty"
		}
	}
});

Router.route("/listings",{
	name: "homeListings",
	data: function () {
		return {
		listings: GrandviewListings.find({},{sort :{menuorder: 1}})
		}
	}
});
Router.route("/listingdetails/:mlsId",{
	name:"homeListingDetails",
	data: function() { return GrandviewListings.findOne({mlsId:this.params.mlsId}); },
	waitOn: function () {
			return Meteor.subscribe('grandviewlistings')
	}
});

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


Router.route("/:menu",{
	name: "homePage",
	data: function () {
		console.log("Printing  " + this.params.menu);
	var page  = GrandviewPages.findOne({seourl: this.params.menu});
	if(page === undefined || page === null){
			this.render('notFound');
	}
		return GrandviewPages.findOne({seourl:this.params.menu});
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
