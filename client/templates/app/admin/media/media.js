Template.adminMediaListings.helpers({
    images: function () {
        return ListingImages.find(); // Where Images is an FS.Collection instance
    }
});
Template.adminListingEdit.onCreated(function() {
  this.subscribe("listingimages");

});
Template.adminMediaListings.events({
    'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            Images.insert(file, function (err, fileObj) {
                if (err){
                    alert('Error Uploading' + err);
                } else {
                    // handle success depending what you need to do
                    alert('Success Uploading');

            }
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            });
        });
    }
});
