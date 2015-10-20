Template.adminHome.events({
   'click .editPage': function(e){
       e.preventDefault();

       console.log("Edit pressed" + this._id);
   }
});
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});
