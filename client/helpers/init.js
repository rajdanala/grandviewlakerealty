Meteor.startup(function() {
  if(Meteor.isClient){
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
  }
  Uploader.finished = function(index, file) {
    Uploads.insert(file);
  }
});
