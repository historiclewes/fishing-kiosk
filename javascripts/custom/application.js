var Kiosk = (function($, window, document, undefined) {
  $(document).ready(function() {
    Kiosk.go();
  });

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
          title: 'Historic Lewes Kiosk'
        };

        $("div#page-title").append(template(context));
        document.title = context.title;
      },

      pageContent: function() {
        var source = $("#page-content").html();
        var template = Handlebars.compile(source);
        var context = {
          content: 'Page content is being displayed dynamically from javascript templates.'
        };

        $("div#main-content").append(template(context));
      },

      generateBuoys: function() {
        var source = $("#weather-link").html();
        var template = Handlebars.compile(source);
        var context = {
          title: 'Weather Buoys',
          buoys: [
            { href : "/front", id : "buoy-1", name : "Buoy #1" },
            { href : "/front", id : "buoy-2", name : "Buoy #2" },
            { href : "/front", id : "buoy-3", name : "Buoy #3" },
            { href : "/front", id : "buoy-4", name : "Buoy #4" }
          ]
        };

        $("div#weather").append(template(context));
      },

      generateNavigation: function() {
        var source = $("#navigation").html();
        var template = Handlebars.compile(source);
        var context = {
          navigation: [
            { href : "/front", id : "history", name : "History" },
            { href : "/front", id : "collections", name : "Collections" },
            { href : "/front", id : "videos", name : "Videos" },
            { href : "/front", id : "news", name : "News" }
          ]
        };

        $("#footer-navigation").append(template(context));
      }
    },

    util: {
      // nothing yet
    }
  }

})(typeof Zepto === 'function' ? Zepto : jQuery, this, this.document);