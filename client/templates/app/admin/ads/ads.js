Template.adminAdsListings.onCreated(function() {
  //this.subscribe("listingimages");
  this.subscribe("uploads");
  this.subscribe("monthlyads");
});
Template.adminAdsListings.helpers({
    ads: function () {
        return MonthlyAds.find(); // Where Images is an FS.Collection instance
    },
    myFormData: function() {
      return { directoryName: 'monthlyads', prefix: this._id, _id: this._id, filetype: "monthlyad" }
    },
    'checked': function(){
        var isDefaultAd = this.defaultAd;
        if(isDefaultAd){
            return "checked";
        } else {
            return "";
        }
    },
    insertMonhtlyAd: function(){
      return {
        finished: function(index,fileInfo,templateContext) {
          if (fileInfo != null) {
            var monthlyad = {
              url: fileInfo.url,
              name: fileInfo.name
            }
            Meteor.call('insertMonthlyAd',monthlyad,function(error,result){
              if(error){
                return alert(error.reason);
              }
            });
            console.log("inserting MonthlyAds inside finished "+ fileInfo.url);
          }
        }
      }
    }
});


// Template.settings.rendered = function () {
//   $(":checkbox").each(function(){
//     console.log(this.id);
//     if (Session.get(this.id, true)) {
//       $(this).prop("checked", true);
//     }
//    });
// };

Template.adminAdsListings.events({
    'change .myFileInput': function(event, template) {

    },
    'click input': function(event, template) {

      console.log(">>>>>>"+$(event.target).is(":checked"));
      this.checked = $(event.target).is(":checked");

    },
    "click .toggle-checked": function () {
     // Set the checked property to the opposite of its current value
     Ads.update(this._id, {
        $set: {defaultAd: ! this.defaultAd}
      });
   }
});
