Template.adminPageEdit.rendered = function() {
    var a =  Template.instance();
    console.log("Calling REndered" + Template.instance().data.pageContent);

    $('#summernoteContent').summernote({
        height: 200,   // set editable area's height
        focus: true    // set focus editable area after Initialize summernote
    });
    $('#summernoteContent').code(Template.instance().data.pageContent);
}

Template.adminPageEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPageId = this._id;

        var postProperties = {
            menu: $(e.target).find('[name=menu]').val(),
            pageContent: $(e.target).find('#summernoteContent').code()
        }


        GrandviewPages.update(currentPageId, {$set: postProperties}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go("adminHome");
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        //if (confirm("Delete this post?")) {
        //    var currentPostId = this._id;
        //    Posts.remove(currentPostId);
        //    Router.go('postsList');
        //}
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