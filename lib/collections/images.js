
//console.log(">>>On images raj Server>>>>>>>>"+listingsPath);

Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: ""})]
});

Uploads = new Mongo.Collection('uploads');
Items = new Mongo.Collection('items');

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
