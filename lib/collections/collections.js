GrandviewPages = new Mongo.Collection("grandviewpages");
GrandviewListings = new Mongo.Collection("grandviewlistings");
GrandviewListingsWithImage = new Mongo.Collection("listingsAndImage");
Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: ""})]
});

Uploads = new Mongo.Collection('uploads',{
  transform: function(document){
    var absUrl = Meteor.absoluteUrl();
    document.url = document.url.replace("http://localhost",absUrl.substring(0,absUrl.length - 1));
    return document;
  }
}
);
Items = new Mongo.Collection('items');
MonthlyAds = new Mongo.Collection('monthlyads');

var prefix = "/bundle/bundle";
// if (process.env.NODE_ENV === 'development') {
//   prefix = process.env.PWD ;
// } else {
//   prefix = '/bundle/bundle';
// }
