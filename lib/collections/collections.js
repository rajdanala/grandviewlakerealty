GrandviewPages = new Mongo.Collection("grandviewpages");
GrandviewListings = new Mongo.Collection("grandviewlistings");
GrandviewListingsWithImage = new Mongo.Collection("listingsAndImage");
Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: ""})]
});

Uploads = new Mongo.Collection('uploads');
Items = new Mongo.Collection('items');

Ads = new FS.Collection("ads", {
    stores: [new FS.Store.FileSystem("ads", {path: "~/uploads"})]
});
