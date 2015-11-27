 Meteor.publish("grandviewpages", function(){
   return GrandviewPages.find({});
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
