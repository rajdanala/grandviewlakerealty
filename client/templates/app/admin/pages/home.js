Template.adminHome.events({
   'click .editPage': function(e){
       e.preventDefault();

       console.log("Edit pressed" + this._id);
   }
});
