Template.nav.helpers({
menus : function () { return GrandviewPages.find({},
                                   {
                                    sort  : {menuorder: 1}
                                   }
                                  );
                      }
});
