GrandviewListings = new Mongo.Collection("grandviewlistings");

//GrandviewListings
Meteor.methods({
  //Insert new MLS listing
  listingInsert: function(listingsAttributes) {
    check(Meteor.userId(),String);
    //check pageAttributes
    var user = Meteor.user();
    var listing = _.extend(pageAttributes,{
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
