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
		pages: GrandviewPages.find()
		}
	}
});

// Router.route("/admin/page/new",{
// 	layoutTemplate:"adminLayout",
// 	name:"adminPageNew"
// });

Router.route("/admin/page/:_id",{
	layoutTemplate:"adminLayout",
	name:"adminPageEdit",
	data: function() { return GrandviewPages.findOne(this.params._id); }
});

Router.route("/:menu",{
	name: "homePage",
	data: function () {
		console.log("Printing  " + this.params.menu);
	var page  = GrandviewPages.findOne({seourl:this.params.menu});
	if(page === undefined || page === null){
			this.render('notFound');
	}
		return GrandviewPages.findOne({seourl:this.params.menu}); }
});


//Router.route("/admin",function (){
//	this.layout("adminLayout");
//	this.render("adminHome");
//
//}
// );

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
												only:'adminHome'

											});
