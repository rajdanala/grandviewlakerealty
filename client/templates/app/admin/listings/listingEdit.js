
Template.adminListingEdit.rendered = function() {
    $('#summernoteDescription').summernote({
        height: 600,   // set editable area's height
        focus: true,   // set focus editable area after Initialize summernote
        onImageUpload: function(files) {
            console.log('image upload:', files);
            // upload image to server and create imgNode...
            //$summernote.summernote('insertNode', imgNode);
        }
    });
    if(this.data === null || this.data === undefined){
        $('#summernoteDescription').code("");
    }
    else{
        $('#summernoteDescription').code(this.data.description);
    }

}

Template.adminListingEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var listingId = this._id;

        var listing = {
            mlsId: $(e.target).find('[name=mlsId]').val(),
            streetaddress: $(e.target).find('[name=streetaddress]').val(),
            city: $(e.target).find('[name=city]').val(),
            state: $(e.target).find('[name=state]').val(),
            zipcode: $(e.target).find('[name=zipcode]').val(),
            imageUrl:$(e.target).find('[name=imageUrl]').val(),
            description: $(e.target).find('#summernoteDescription').code()
        }
        if(listingId === undefined || listingId === null) {
          Meteor.call('listingInsert',listing,function(error,result){
            if(error){
              return alert(error.reason);
            }

            Router.go('adminListings');
          });
        }
        else{
          Meteor.call('listingUpdate',listingId,listing,function(error,result){
            if(error){
              return alert(error.reason);
            }

            Router.go('adminListingEdit', {_id: listingId});
          });

        }
    },

    'click .cancel': function(e) {
        Router.go('adminListings');
    },
    'click .delete': function(e) {
        e.preventDefault();
    },
    'click .selectedImage':function(e){
        e.preventDefault();
        console.log($(e.target).attr("id"));
        //$(e.target).find('[name=imageUrl]').val($(e.target).attr("id"));
        $("#imageUrl").val($(e.target).attr("id"));
        $("#thumbImageUrl").attr("src",$(e.target).attr("id"));
        $("#myModal").modal('toggle');
        console.log($(e.target));
    }
});

Template.adminListingEdit.onCreated(function() {
  this.subscribe("grandviewlistings");
  this.subscribe("images");
  this.subscribe("listingimages");
  this.subscribe("uploads");
  var thumbImageUrl = "";
  var imageId = "";

});

Template.adminListingEdit.helpers({
    listing : function() {
      var listing = GrandviewListings.findOne({"_id":Router.current().params._id});
      imageId = listing.imageUrl;
      console.log("Image Id"+imageId);

      // var meteorRoot =   FS.realpathSync( process.cwd() + '/../' );
      //   console.log("Meteor Root "+meteorRoot);
      // var publicPath = meteorRoot + '/web.browser/app/';
      //   console.log("public path "+publicPath);
      // var listingsPath = publicPath + '/listings/';
      //   console.log("listings"+listingsPath);

       return listing;
    },
    thumbImageUrl: function() {
      console.log("2nd Image Id"+imageId);
      return imageId;
    },
    images: function() {
      return Uploads.find();
    }

});
