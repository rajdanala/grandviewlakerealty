 Meteor.publish("grandviewpages", function(){
   return GrandviewPages.find();
 });

 Meteor.publish("grandviewlistings", function(){
   return GrandviewListings.find();
 });
 // Meteor.publish("findGrandviewPageBySeourl", function(menu){
 //   return GrandviewPages.findOne({seourl:menu});
 // });
