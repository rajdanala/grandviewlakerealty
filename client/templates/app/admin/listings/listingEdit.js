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
        $("#myModal").modal('toggle');
        console.log($(e.target));
    }
});

Template.adminListingEdit.helpers({

    test : function () {
        console.log(this.listraj);
        return "test";
    }
});

