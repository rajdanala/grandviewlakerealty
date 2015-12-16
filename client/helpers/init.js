Meteor.startup(function() {
  Uploader.finished = function(index, file) {
    Uploads.insert(file);
  }

    //return SEO.config({
    //auto: {
    //  twitter: false,
    //  og: false,
    //  set: ['description', 'title']
    //},
    //title: "Grandview Realty - Columbus IN 47201",
    //meta: {
    //'description': "Grandview Realty is known for bringing buyers to the lake and matching them with the right Grandview Lake Property"
    //}
    //});
  

});
