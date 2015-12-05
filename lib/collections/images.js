
//console.log(">>>On images raj Server>>>>>>>>"+listingsPath);

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: listingsPath})]
});

ListingImages = new Mongo.Collection('listingimages');

var fs = Npm.require("fs");
var meteorRoot = fs.realpathSync( process.cwd() + '/../' );
var publicPath = meteorRoot + '/web.browser/app/';
var listingsPath =   publicPath + 'images/listings/';
console.log(">>>On raj listingsPath Server>>>>>>>>"+listingsPath);
