 Meteor.publish("grandviewpages", function(){
   return GrandviewPages.find();
 });
 // Meteor.publish("findGrandviewPageBySeourl", function(menu){
 //   return GrandviewPages.findOne({seourl:menu});
 // });
