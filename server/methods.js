// Media
Meteor.methods({
  'deleteFile': function(_id) {
    check(_id, String);

    var upload = Uploads.findOne(_id);
    if (upload == null) {
      throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
    }

    UploadServer.delete(upload.path);
    Uploads.remove(_id);
  }
})


Meteor.methods({
  insertMonthlyAd: function(newAd) {
    check(newAd.name, String);
    check(newAd.url, String);
    MonthlyAds.insert(newAd);
  },
  updateMonhtlyAd: function(adid,ad){
    check(name, String);
    check(checked, String);
    MonthlyAds.update(adid,ad);

  }
})

// Listings
var INSERT_FIELDS = {
  mlsId: String,
  streetaddress: String,
  city: String,
  state: String,
  zipcode: String,
  imageUrl:String,
  description: String
}

//GrandviewListings
Meteor.methods({
  //Insert new MLS listing
  listingInsert: function(listingsAttributes) {
    check(Meteor.userId(),String);
    check(listingsAttributes,INSERT_FIELDS);
    //check pageAttributes
    var user = Meteor.user();
    var listing = _.extend(listingsAttributes,{
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var listingId = GrandviewListings.insert(listing);
    return {
      _id: listingId
    };
  },
  //Update MLS Listing
  listingUpdate: function(listingId,listingsAttributes) {
    check(Meteor.userId(),String);
    var user = Meteor.user();
    var listing = _.extend(listingsAttributes,{
      userId: user._id,
      author: user.username,
      lastUpdated: new Date()
    });
    var listingId = GrandviewListings.update(listingId,listing);
    return {
      _id: listingId
    };
  }
  //End of Update
});

var INSERT_FIELDS = {
  menu: String,
  seourl: String,
  menuorder: Number,
  pageContent: String
};

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
  },
  //End of Update
  pageRemove: function(pageId){
    check(Meteor.userId(),String);
    var user = Meteor.user();
   GrandviewPages.remove(pageId);
  }
});
