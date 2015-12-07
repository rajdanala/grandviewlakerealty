
Meteor.startup(function () {
  // init items collection
    if (Items.find().count() == 0) {
      Items.insert({name: 'My Item', uploads: []});
    }

    UploadServer.init({
      tmpDir: process.env.PWD + '/.uploads/tmp',
      uploadDir: process.env.PWD + '/.uploads/',
      checkCreateDirectories: true,
      getDirectory: function(fileInfo, formData) {
        if (formData && formData.directoryName != null) {
          return formData.directoryName;
        }
        return "";
      },
      getFileName: function(fileInfo, formData) {
        if (formData && formData.prefix != null) {
          return formData.prefix + '_' + fileInfo.name;
        }
        return fileInfo.name;
      },
      finished: function(fileInfo, formData) {
        if (formData && formData._id != null) {
          Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
        }
      }
    });
  //GrandviewPages.remove({});
  if(GrandviewPages.find().count() == 0){
    var grandviewPages = [
      {
        menu: "Home",
        pageContent: "<h1> I am about page from mongo Collection</h2>",
        path: "pathFor 'homeIndex'",
        seourl:"/"
      },
      {
        menu: "About",
        pageContent: "<p>After 30 + years in the real estate community involving both residential and commercial business throughout the Midwest, Harry Meshberger established Grandview Realty, Inc. in 2003. His comprehensive background allows him to serve the needs of the people of Grandview Lake and surrounding lake developments. Harry Meshberger, Broker/Owner, has been a property owner on Grandview since 1974 and homeowner since 1984. He and his family have thoroughly enjoyed living on the lake and have watched the development grow and flourish over the years. Many friendships have been established and countless memories recorded while spending time near the water. </p><br/>	<p>A real estate &#x201c;Broker&#x201d; since 1993, Harry has put his diverse background and skills to work providing a unique real estate experience for anyone interested in lake living. After the first year of the company&#x2019;s inception, Grandview Realty captured nearly half of all the real estate business on the lake. Harry also served 6 years on the Board of Directors of the Grandview Lot Owners Association, a voluntary group dedicated to the preservation of the lake amenities and operation of The Town of Grandview Lake. </p><br/><br/><p>Once you become a part of &#x201c;The Lake&#x201d;, you too will share our passion for its tranquil atmosphere, serene beauty, friendly neighbors and therapeutic effect you receive from being on the water.</p>",
        path: "pathFor 'homeAbout'",
        seourl:"about"

      },
      {
        menu: "Listings",
        pageContent: "<p> I am about page from mongo Collection para</p>",
        path: "{{pathFor 'homeListsheet'}}",
        seourl:"listings"
      },
      {
        menu: "Other Area Listings",
        pageContent: "<h1> I am about page from mongo Collection</h2>",
        path: "pathFor 'homeMlsListings'",
        seourl:"mls"
      },
      {
        menu: "Contact",
        pageContent: "<h1> I am about page from mongo Collection</h2>",
        path: "pathFor 'homeContact'",
        seourl:"contact"
      },
      {
        menu: "Summernote",
        pageContent: "<h1> I am about page from mongo Collection</h2>",
        path: "pathFor 'homeTiny'",
        seourl:"summernote"
      }
    ];
    // loop over each sample poll and insert into database
    _.each(grandviewPages, function(page) {
      //GrandviewPages.insert(page);
    });
}

//GrandviewListings.remove({});
if(GrandviewListings.find().count() == 0){
  var grandviewListings = [
    {
      mlsId: "21501546",
      streetaddress: "11440 W Maple Drive",
      city:"Columbus",
      state: "IN",
      zipcode: "47201",
      description: "This a greate lake house",
      imageUrl: "/images/listings/21501546.jpg",
    }
  ];
  // loop over each sample poll and insert into database
  _.each(grandviewListings, function(listing) {
    GrandviewListings.insert(listing);
  });
}

ApplicationController = RouteController.extend({
    layoutTemplate: 'ApplicationLayout',

    onBeforeAction: function () {
      console.log('app before hook!');
      this.next();
    },

    action: function () {
      console.log('this should be overridden!');
    }
  });
});

// Disabling User Registration
Accounts.config({
  forbidClientAccountCreation : true
});

if(Meteor.isServer){

Uploads.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true
  }
});
  // Images.allow({
  //   'insert': function () {return true;},
  //   'download': function () {return true;}
  // });

  Ads.allow({
    'insert': function () {return true;},
    'update': function () {return true;},
    'download': function () {return true;}
  });
};
