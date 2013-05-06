var Kiosk = (function($, window, document, undefined) {
  $(document).ready(function() {
    Kiosk.go();
  });

  // Application variables
  var localContentServer = 'http://historiclewes.localhost:8082/';
  var remoteContentServer = 'http://www.historiclewes.org/';

  // this should be set to production unless working locally (and you have proper local setup).
  var kioskMode = 'development';

  // reference to the content server set above
  var contentServer = (kioskMode === 'development') ? localContentServer : remoteContentServer;

  // define our services endpoints back to the parent application
  var services = {
    history: 'kiosk/views/kiosk_nodes?display_id=block_1'
  }

  var jsonFeeds = {
    tbd: 'tbd'
  };

  // End application variables

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
       Kiosk.getPage('templates/news/index.html');
      }
    },

    util: {
      // nothing yet
    },

    // generic function to call and load local HTML files with optional Handlebars components
    getPage: function(template, callback) {
      var Template = Handlebars.getTemplate(template, callback);

      if (callback && typeof(callback) === 'function') {
        callback(Template);
      }
    },

    ajaxContent: function(feed_id) {
      return Zepto.ajax(
          {
            url: this.contentUrl(feed_id),
            dataType: 'jsonp',
            type: 'GET',
            cache: false,
            success: function (result) {
              Kiosk.processResult(result);
            }
          }
      );
    },

    getHistory: function() {
       var template = Handlebars.getTemplate('history');

       Zepto.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: this.contentUrl('history'),
        success: function (result) {
          var context = {
            title: result[0].node_title,
            body: result[0].node_revisions_body
          }

          Kiosk.updateScreen(template(context));
        }
      });
    },

    // generic function to call and load local HTML files
    getTemplate: function(filepath, callback) {
      // wipe the container
      $("#main-content").html('');

      Zepto.ajax({
        type: "GET",
        dataType: "html",
        cache: false,
        url: filepath,
        success: function (result) {
          $("#main-content").fadeIn('slow').html(result);
        }
      });
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
        cache: false,
        url: jsonFeeds[feed_id] + '?jsonp=?',
        success: function (result) {
          $.each(result.data.children, function(key, val) {
            context.items.push({'title' : val.data.title, 'permalink': {url: val.data.permalink, text: val.data.title}, 'score': val.data.score, 'num_comments': val.data.num_comments});
          });

          $("#drupal-news").fadeIn('slow').html(template(context));
        }
      });
    },

    contentUrl: function(feed_id) {
      return contentServer + services[feed_id] + '&jsonp=';
    },

    updateScreen: function(content) {
      $("#main-content").fadeIn('slow').html(content);
    }
  }
})(typeof Zepto === 'function' ? Zepto : jQuery, this, this.document);

// Register a 'link' function through Handlebars as a formatter helper.
Handlebars.registerHelper('link', function(object) {
  return new Handlebars.SafeString(
      "<a href='" + object.url + "'>" + object.text + "</a>"
  );
});

Handlebars.getTemplate = function(name) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
    $.ajax({
      url : 'templates/handlebars/' + name + '.hbs',
      success : function(data) {
        if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        }
        Handlebars.templates[name] = Handlebars.compile(data);
      },
      async : false
    });
  }
  return Handlebars.templates[name];
};