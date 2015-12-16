 Meteor.publish("grandviewpages", function(){
   return GrandviewPages.find({});
 });

 Meteor.publish("grandviewpage", function(pageUrl){
     return GrandviewPages.find({seourl:pageUrl});
 });

 Meteor.publish("grandviewlistings", function(){
   return GrandviewListings.find();
 });
 Meteor.publish("grandviewlistingsWithOptions", function(options){
   return GrandviewListings.find({},options);
 });
 Meteor.publish("images", function(){
     return Images.find();
 });


 Meteor.publish("listingsAndImage", function(listingId){
     var listingCursor = GrandviewListings.find({_id:listingId});
     var imageId = listingCursor.map(function (listing) {
       return listing.imageId;
     });
     var image = Images.find({_id: {$in: imageId}});
     data = listingCursor.fetch().concat(image.fetch());
     if(data){
         return listingCursor;
     }
 });
 // Meteor.publish("findGrandviewPageBySeourl", function(menu){
 //   return GrandviewPages.findOne({seourl:menu});
 // });
//process.cwd() + '/../' + '/web.browser/app/' + 'images/listings/'
 Meteor.publish('listingimages', function() {
  var self = this;
  var fs = Npm.require("fs");
  var meteorRoot = fs.realpathSync( process.cwd() + '/../' );
  //console.log(">>>On Server>>>>>>>>"+meteorRoot);
  var publicPath = meteorRoot + '/web.browser/app/';
    //console.log(">>>On Server>>>>>>>>"+publicPath);
  var listingsPath =   publicPath + 'images/listings/';
  var listingImages = fs.readdirSync(listingsPath);
  //console.log(">>>On Server>>>>>>>>"+listingImages);
  _.each(listingImages, function(listingImage) {
    // if(icon.indexOf('icon-') == 0) {
    //   self.added('icons', icon, { 'url': '/icons/' + icon });
    // }

    if(listingImage.endsWith(".jpg") || listingImage.endsWith(".jpeg") || listingImage.endsWith(".gif")|| listingImage.endsWith(".png") ){
      //console.log(">>>listingImage>>>>>>>>"+listingImage);
        self.added('listingimages', listingImage, { 'url': '/images/listings/' + listingImage });



            Images.insert(file, function (err, fileObj) {
                if (err){
                    alert('Error Uploading' + err);
                } else {
                    // handle success depending what you need to do
                    alert('Success Uploading');

            }
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });

    }
  });
  this.ready();
});

Meteor.publish('items', function() {
  return Items.find();
});
Meteor.publish('monthlyads', function() {
  return MonthlyAds.find();
});

Meteor.publish('uploads', function() {
  return Uploads.find({'subDirectory':'images'});
})
