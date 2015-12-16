PageSubs = new SubsManager();

Template.nav.onCreated(function(){
    var self = this;
    self.ready = new ReactiveVar();
    self.autorun(function(){
        var handle = PageSubs.subscribe('grandviewpages');
        self.ready.set(handle.ready());
    });
});

Template.nav.helpers({

    menus: function() {
        var menus = GrandviewPages.find({});
        return menus;
    },
    menuReady: function() {
        return Template.instance().ready.get();
    },
    seoPath: function() {
        var menu = this;
        var params = {
            pageUrl: menu.seourl
        }
        var path = FlowRouter.path("home",params);
        return path;
    }

});

//Template.nav.helpers({
//menus : function () { return GrandviewPages.find({},
//                                   {
//                                    sort  : {menuorder: 1}
//                                   }
//                                  );
//                      },
//
//        equals: function(nav) {
//
//        }
//
//});
