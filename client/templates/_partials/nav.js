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
