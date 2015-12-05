Template.adminAdsListings.helpers({
    ads: function () {
        return Ads.find(); // Where Images is an FS.Collection instance
    },
    'checked': function(){
        var isDefaultAd = this.defaultAd;
        if(isDefaultAd){
            return "checked";
        } else {
            return "";
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
        FS.Utility.eachFile(event, function(file) {

            Ads.insert(file, function (err, fileObj) {
                if (err){
                    alert('Error Uploading' + err);
                } else {
                    // handle success depending what you need to do
                    alert('Success Uploading');

            }
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });
        });
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
