 Meteor.publish("grandviewpages", function(){
   return GrandviewPages.find({});
 });

 Meteor.publish("grandviewlistings", function(){
   return GrandviewListings.find();
 });
 Meteor.publish("grandviewlistingsWithOptions", function(options){
   return GrandviewListings.find({},options);
 });
 // Meteor.publish("findGrandviewPageBySeourl", function(menu){
 //   return GrandviewPages.findOne({seourl:menu});
 // });
