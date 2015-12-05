Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/projects/websites/grandviewlakerealty/public/images/uploads"})]
});

ListingImages = new Mongo.Collection('listingimages');
