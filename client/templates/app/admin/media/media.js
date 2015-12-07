Template.adminMediaListings.helpers({
    images: function () {
        return Uploads.find(); // Where Images is an FS.Collection instance
    },
    uploadCallback: function() {
      return {
        finished: function(fileInfo, formData) {
          if (formData && formData._id != null) {
            Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
          }
        }
      }
    }
});
Template.adminMediaListings.onCreated(function() {
  //this.subscribe("listingimages");
  this.subscribe("uploads");
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
    },
    'click .deleteUpload':function() {
    if (confirm('Are you sure?')) {
      Meteor.call('deleteFile', this._id);
    }
  }
});
