Template.nav.helpers({
menus : function () { return GrandviewPages.find({},
                                   {
                                    sort  : {menuorder: 1}
                                   }
                                  );
                      },

        equals: function(nav) {

        }
});


Template.nav.events({
  'click': function(e) {
    console.log('menu clicked>>>>>>>');
  }
});
