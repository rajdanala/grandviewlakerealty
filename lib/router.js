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
	name: "homeAbout"
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