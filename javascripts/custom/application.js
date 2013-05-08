// Define Kiosk
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
    node: 'kiosk/views/kiosk_nodes?display_id=block_1',
    collections: 'kiosk/views/kiosk_nodes?display_id=block_2',
    search: 'kiosk/views/kiosk_nodes?display_id=block_4'
  }

  var jsonFeeds = {
    tbd: 'tbd'
  };

  var vimeo = {
    'type': 'user',
    'id': 'user1949213'
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
      getHeader: function() {
        var template = Handlebars.getTemplate('header');
        $("#header").html(template());
      },

      pageContent: function() {
        var template = Handlebars.getTemplate('home');
        Kiosk.util.updateScreen(template());
      },

      getFooter: function() {
        var template = Handlebars.getTemplate('footer');
        $("#footer").html(template());
      }
    },

    // generic function to call and load local HTML files with optional Handlebars components
    getPage: function(template) {
      var Template = Handlebars.getTemplate(template);
      Kiosk.util.updateScreen(Template());
    },

    // fetch a node
    getNode: function(template, node_id) {
      var template = Handlebars.getTemplate(template);

      DrupalRequest.fetchNode(node_id, function(response) {
        var context = {
          title: response[0].title,
          body: response[0].body
        }

        Kiosk.util.updateScreen(template(context));
      });
    },

    // fetch Collections
    getCollections: function() {
      var template = Handlebars.getTemplate('collections');

      DrupalRequest.fetchView('collections', function(response) {
        var context = { items: [] }

        $.each(response, function(key, value) {
          context.items.push({ 'title' : value.title, 'teaser': value.teaser, 'nid': value.nid });
        });

        Kiosk.util.updateScreen(template(context));
      });
    },

    // fetch Videos
    getVideos: function() {
      var template = Handlebars.getTemplate('videos');
      var context = { items: [] }

      VimeoRequest.getData(vimeo.type, vimeo.id, function(response) {
        $.each(response, function(key, value) {
          context.items.push({ 'title' : value.title, 'vimeo_id': value.id, 'thumbnail_small': value.thumbnail_small, 'thumbnail_medium': value.thumbnail_medium, 'thumbnail_large': value.thumbnail_large});
        });

        Kiosk.util.updateScreen(template(context));
      });
    },

    getSearchResults: function() {
      var template = Handlebars.getTemplate('search');
      var keywords = $('#kiosk-search').attr('value');
      var context = { items: [], keywords: keywords }

      DrupalRequest.doSearch('search', keywords, function(response) {
        $.each(response, function(key, value) {
          context.items.push({ 'title' : value.title, 'nid': value.nid, 'teaser': value.teaser });
        });

        Kiosk.util.updateScreen(template(context));
      });
    },

    util: {
      contentUrl: function(feed_id) {
        return contentServer + services[feed_id] + '&jsonp=';
      },

      updateScreen: function(content) {
        $("#main-content").fadeIn('slow').html(content);
      }
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
      type: 'GET',
      url : 'templates/handlebars/' + name + '.hbs',
      cache: false,
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
