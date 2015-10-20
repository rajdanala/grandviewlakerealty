GrandviewPages = new Mongo.Collection("grandviewpages");
GrandviewListings = new Mongo.Collection("grandviewlistings");

//GrandviewPages
Meteor.methods({
  //Insert new Page
  pageInsert: function(pageAttributes) {
    check(Meteor.userId(),String);
    //check pageAttributes
    var user = Meteor.user();
    var page = _.extend(pageAttributes,{
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var pageId = GrandviewPages.insert(page);
    return {
      _id: pageId
    };
  },
  //Update Page
  pageUpdate: function(pageId,pageAttributes) {
    check(Meteor.userId(),String);
    var user = Meteor.user();
    var page = _.extend(pageAttributes,{
      userId: user._id,
      author: user.username,
      lastUpdated: new Date()
    });
    var pageId = GrandviewPages.update(pageId,page);
    return {
      _id: pageId
    };
  }
  //End of Update
});
