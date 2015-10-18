Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
})

Router.route("/",{
	name: "homeIndex",
	data: function () {
		return {
			message: "Welecome to Grandview Realty"
		}
	}
});

Router.route("/about",{
	name: "homeAbout",
	data: function () {
		return {
		//	var aboutPage = GrandviewPages.findOne({menu:"About"});
      aboutPageContent: GrandviewPages.findOne({menu:"About"}).pageContent
		}
	}
});

Router.route("/contact",{
	name: "homeContact"
});

Router.route("/mls",{
	name: "homeMlsListings"
});

Router.route("/list",{
	name: "homeListsheet"
});

Router.route("/tiny",{
	name: "homeTiny",
});
Router.route("/admin",{
	layoutTemplate:"adminLayout",
	name:"adminHome",
	data: function () {
	return {
		pages: GrandviewPages.find()
		}
	}
});

Router.route("/admin/page/:_id",{
	layoutTemplate:"adminLayout",
	name:"adminPageEdit",
	data: function() { return GrandviewPages.findOne(this.params._id); }
});
//Router.route("/admin",function (){
//	this.layout("adminLayout");
//	this.render("adminHome");
//
//}
// );
