Template.adminPageEdit.rendered = function() {
    var a =  Template.instance();
    //console.log("Calling REndered" + (this.data === null)?"":this.data.pageContent:"");

    $('#summernoteContent').summernote({
        height: 200,   // set editable area's height
        focus: true    // set focus editable area after Initialize summernote
    });
    if(this.data === null){
        $('#summernoteContent').code("");
    }
    else{
        $('#summernoteContent').code(this.data.pageContent);
    }

}

Template.adminPageEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPageId = this._id;

        var page = {
            menu: $(e.target).find('[name=menu]').val(),
            seourl: $(e.target).find('[name=seourl]').val(),
            menuorder: $(e.target).find('[name=menuorder]').val(),
            pageContent: $(e.target).find('#summernoteContent').code()
        }
        if(currentPageId === undefined) {
          Meteor.call('pageInsert',page,function(error,result){
            if(error){
              return alert(error.reason);
            }

            Router.go('adminHome');
          });
        }
        else{
          Meteor.call('pageUpdate',currentPageId,page,function(error,result){
            if(error){
              return alert(error.reason);
            }

            Router.go('adminPageEdit');
          });

        }
        // GrandviewPages.update(currentPageId, {$set: page}, function(error) {
        //     if (error) {
        //         // display the error to the user
        //         alert(error.reason);
        //     } else {
        //         Router.go("adminHome");
        //     }
        // });
    },
    // 'click .submitclose': function(e) {
    //   e.preventDefault();
    //
    //   var currentPageId = this._id;
    //
    //   var page = {
    //       menu: $(e.target).find('[name=menu]').val(),
    //       pageContent: $(e.target).find('#summernoteContent').code()
    //   }
    //
    //   Meteor.call('pageUpdate',currentPageId,page,function(error,result){
    //     if(error){
    //       return alert(error.reason);
    //     }
    //     Router.go('adminHome');
    //   });
    //
    // },
    'click .cancel': function(e) {
        Router.go('adminHome');
    },
    'click .delete': function(e) {
        e.preventDefault();
        if (confirm("Delete this post?" )) {
            var currentPageId = this._id;
            Meteor.call('pageRemove',currentPageId,function(error,result){
            if(error){
                return alert(error.reason);
            }
            Router.go('adminHome');
            });
        }
    }
});
Template.adminPageEdit.helpers({
    //summernote : function() {
    //    console.log("Calling Helper");
    //
    //    var summernoteDiv = document.createElement('div');
    //    summernoteDiv.id = "summernoteContent";
    //
    //}
    //$('#summernoteContent').code('<h2>I am h2</h2>');
});
