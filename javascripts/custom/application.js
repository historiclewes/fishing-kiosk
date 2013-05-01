var Kiosk = (function($, window, document, undefined) {
  $(document).ready(function() {
    Kiosk.go();

//    $('nav#footer-navigation a').bind(click, function(){
//
//      var id = $(this).attr('id');
//      $(this).addClass('active');
//      console.log("Hello");
//    });


  });



  var jsonFeeds = {
    proggit: 'http://www.reddit.com/r/programming/.json',
    tech: 'http://www.reddit.com/r/technology/.json',
    webdev: 'http://www.reddit.com/r/webdev/.json',
    drupal: 'http://www.reddit.com/r/drupal/.json'
  };

  return {
    go: function() {
      var i, j = this.init;

      for (i in j) {
        j.hasOwnProperty(i) && j[i]();
      }
    },

    init: {
      pageTitle: function() {
        var source = $("#set-title").html();
        var template = Handlebars.compile(source);
        var context = {
          title: 'Pilots on the Bay & River Delaware'
        };

        $("div#page-title").append(template(context));
        document.title = context.title;
      },

      pageContent: function() {
       Kiosk.page('templates/collection/index.html');

//        $("div#main-content").append(template(context));
      }

//      generateBuoys: function() {
//        Zepto.ajax({
//          url: './templates/buoys/index.html',
//          type: 'GET',
//          cache: true,
//          success: function (data) {
//            template = Handlebars.compile(data);
//            var context = {
//              title: 'Weather Buoys',
//              buoys: [
//                { href : "#", id : "BUOY1", name : "Buoy #1", feed_id: 'proggit' },
//                { href : "#", id : "BUOY2", name : "Buoy #2", feed_id: 'tech' },
//                { href : "#", id : "BUOY3", name : "Buoy #3", feed_id: 'webdev' },
//                { href : "#", id : "BUOY4", name : "Buoy #4", feed_id: 'drupal' }
//              ]
//            };
//
//            $("div#weather").append(template(context));
//          }
//        });
//      },

//      generateNavigation: function() {
//        Zepto.ajax({
//          url: './templates/navigation/main.html',
//          type: 'GET',
//          cache: true,
//          success: function (data) {
//            template = Handlebars.compile(data);
//            var context = {
//              navigation: [
//                { href : "/front", id : "history", name : "History" },
//                { href : "/front", id : "collections", name : "Collections" },
//                { href : "/front", id : "videos", name : "Videos" },
//                { href : "/front", id : "news", name : "News" }
//              ]
//            };
//
//            $("#footer-navigation").append(template(context));
//          }
//        });
//      }
    },

    util: {
      // nothing yet
    },

    articles: function(id, feed_id) {
      // wipe the container
      $("#drupal-news").html('');

      var source = $("#set-articles").html();
      var template = Handlebars.compile(source);
      var context = {
        items: [],
        id: feed_id
      };

      Zepto.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: true,
        url: jsonFeeds[feed_id] + '?jsonp=?',
        success: function (result) {
          $.each(result.data.children, function(key, val) {
            context.items.push({'title' : val.data.title, 'permalink': {url: val.data.permalink, text: val.data.title}, 'score': val.data.score, 'num_comments': val.data.num_comments});
          });

          $("#drupal-news").fadeIn('slow').html(template(context));
        }
      });
    },

      page: function(url) {
        // wipe the container
        $("#main-content").html('');

        Zepto.ajax({
          type: "GET",
          dataType: "html",
          cache: false,
          url: url,
          success: function (result) {
            $("#main-content").fadeIn('slow').html(result);
          }
        });
      }
    }
  
})(typeof Zepto === 'function' ? Zepto : jQuery, this, this.document);

Handlebars.registerHelper('link', function(object) {
  return new Handlebars.SafeString(
      "<a href='" + object.url + "'>" + object.text + "</a>"
  );
});
