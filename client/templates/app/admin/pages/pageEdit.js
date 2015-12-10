Template.adminPageEdit.rendered = function() {
    var a =  Template.instance();
    //console.log("Calling REndered" + (this.data === null)?"":this.data.pageContent:"");

    $('#summernoteContent').summernote({
        height: 400,   // set editable area's height
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
    "click input[type=submit]": function(e) {
        e.preventDefault();
        var buttonPressed = $(e.target).prop("id");
        var currentPageId = this._id;
        alert( $("input[name=seourl]").val() );
        var page = {
            menu: $('input[name=menu]').val(),
            seourl: $('input[name=seourl]').val(),
            menuorder: Number($('input[name=menuorder]').val()),
            pageContent: $('#summernoteContent').code(),
            sideImage: '/images/listings/20801480.jpg'
        }
        if(currentPageId === undefined) {
          Meteor.call('pageInsert',page,function(error,result){
            if(error){
              return alert(error.reason);
            }
            if( buttonPressed === 'saveclose'){
              Router.go('adminHome');
            }
            else{
                Router.go('adminPageEdit');
            }
          });
        }
        else{
          Meteor.call('pageUpdate',currentPageId,page,function(error,result){
            if(error){
              return alert(error.reason);
            }


               // You can get its name like this
               if( buttonPressed === 'saveclose'){
                    Router.go('adminHome');
               }
               else{
                  Router.go('adminPageEdit');
                }

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
     //'click .submitclose': function(e) {
      // e.preventDefault();
      //
      // var currentPageId = this._id;
      // alert($(e.target).form);
      // var page = {
      //     menu: $(e.target).find('[name=menu]').val(),
      //     pageContent: $(e.target).find('#summernoteContent').code()
      // }
      // Router.go('adminHome');
      // Meteor.call('pageUpdate',currentPageId,page,function(error,result){
      //   if(error){
      //     return alert(error.reason);
      //   }
      //   Router.go('adminHome');
      // });

    //},
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
