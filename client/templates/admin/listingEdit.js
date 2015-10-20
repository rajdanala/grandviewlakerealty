Template.adminListingEdit.rendered = function() {
    var a =  Template.instance();
    //console.log("Calling REndered" + (this.data === null)?"":this.data.pageContent:"");

    $('#summernoteDescription').summernote({
        height: 200,   // set editable area's height
        focus: true    // set focus editable area after Initialize summernote
    });
    if(this.data === null || this.data === undefined){
        $('#summernoteDescription').code("");
    }
    else{
        $('#summernoteDescription').code(this.data.description);
    }

}
