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
        var source = $("#set-content").html();
        var template = Handlebars.compile(source);
        var context = {
          content: 'Page content is being displayed dynamically from javascript templates.'
        };

        $("div#main-content").append(template(context));
      },

      generateBuoys: function() {
        Zepto.ajax({
          url: './templates/buoys/index.html',
          type: 'GET',
          cache: true,
          success: function (data) {
            template = Handlebars.compile(data);
            var context = {
              title: 'Weather Buoys',
              buoys: [
                { href : "#", id : "BUOY1", name : "Buoy #1", display_id: 'services_1' },
                { href : "#", id : "BUOY2", name : "Buoy #2", display_id: 'services_2' },
                { href : "#", id : "BUOY3", name : "Buoy #3", display_id: 'services_1' },
                { href : "#", id : "BUOY4", name : "Buoy #4", display_id: 'services_2' }
              ]
            };

            $("div#weather").append(template(context));
          }
        });
      },

      generateNavigation: function() {
        Zepto.ajax({
          url: './templates/navigation/main.html',
          type: 'GET',
          cache: true,
          success: function (data) {
            template = Handlebars.compile(data);
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
        });
      }
    },

    util: {
      // nothing yet
    },

    articles: function(id, display_id) {
      // wipe the container
      $("#drupal-news").html('');

      var source = $("#set-articles").html();
      var template = Handlebars.compile(source);
      var context = {
        items: [{}],
        id: id
      };

      Zepto.ajax({
        type: "GET",
        dataType: "jsonp",
        url: 'http://d7sandbox.com:8082/test/views/services_test?display_id=' + display_id,
        success: function (data) {
          $.each(data, function(key, val) {
            context.items.push({'content' : val.body.und[0].value, 'title' : val.title});
          });

          $("#drupal-news").fadeIn('slow').html(template(context));
        }
      });
    }
  }
})(typeof Zepto === 'function' ? Zepto : jQuery, this, this.document);
