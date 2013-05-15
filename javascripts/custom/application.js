// Define Kiosk
var Kiosk = (function($, window, document, undefined) {
  return {
    init: function() {
      var template = Handlebars.getTemplate('header');
      $("#header").html(template());

      var template = Handlebars.getTemplate('home');
      Kiosk.util.updateScreen('#main-content', template());

      var template = Handlebars.getTemplate('footer');
      $("#footer").html(template());
    },

    // generic function to call and load local HTML files with optional Handlebars components
    getPage: function(template) {
      var Template = Handlebars.getTemplate(template);
      Kiosk.util.updateScreen('#main-content', Template());
    },

    // render the bay page and load the weather data for the first buoy
    getBay: function() {
      var template = Handlebars.getTemplate('bay');
      var context = {
        buoys: [
          { id : "lwsd1", name : "Station LWSD1" },
          { id : "bthd1", name : "Station BTHD1" },
          { id : "44009", name : "Station 44009" },
          { id : "cman4", name : "Station CMAN4" }
        ]
      }

      Kiosk.util.updateScreen('#main-content', template(context));
      Kiosk.getWeatherData(context.buoys[0].id);
    },

    // fetch a node
    getNode: function(template, node_id) {
      var template = Handlebars.getTemplate(template);

      DrupalRequest.fetchNode(node_id, function(response) {
        Kiosk.util.updateScreen('#main-content', template(response));
      });
    },

    // fetch Collections
    getCollections: function() {
      var template = Handlebars.getTemplate('collections');

      DrupalRequest.fetchCollectionsView('collections', function(response) {
        Kiosk.util.updateScreen('#main-content', template(response));
      });
    },

    // generic function to call and load local HTML files with optional Handlebars components
    getSlideshow: function(template, feed_id) {
      var template = Handlebars.getTemplate(template);

      DrupalRequest.fetchSlideshowView(feed_id, function(response) {
        Kiosk.util.updateScreen('#slideshow', template(response));
        Foundation.libs.orbit.init();
      });
    },

    // fetch Videos
    getVideos: function() {
      var template = Handlebars.getTemplate('videos');

      VimeoRequest.getData(Kiosk.variables.vimeo.type, Kiosk.variables.vimeo.id, function(response) {
        Kiosk.util.updateScreen('#main-content', template(response));
      });
    },

    // fetch News
    getNews: function(feed_id) {
      var template = Handlebars.getTemplate('rss');

      RSSRequest.getFeed(rssFeeds[feed_id], function(response) {
        Kiosk.util.updateScreen('#main-content', template(response));
      });
    },

    getSearchResults: function() {
      var template = Handlebars.getTemplate('search');
      var keywords = $('#kiosk-search').attr('value');

      DrupalRequest.doSearch('search', keywords, function(response) {
        Kiosk.util.updateScreen('#main-content', template(response));
      });
    },

    drawGauge: function(value, container_id, options) {
      var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['', parseFloat(value)],
      ]);

      var chart = new google.visualization.Gauge(document.getElementById(container_id));
      chart.draw(data, options);
    },

    // fetch the weather data for a given buoy
    getWeatherData: function(buoy_id) {
      var buoyTemplate = Handlebars.getTemplate('buoy');
      var conditionsTemplate = Handlebars.getTemplate('conditions');

      BuoyRequest.getData(buoy_id, function(response) {
        Kiosk.util.updateScreen('#current-conditions-block', conditionsTemplate(response));
        Kiosk.util.updateScreen('#waves-tides', buoyTemplate(response));

        var options = {
          min: 0,
          max: 120,
          width: 400,
          height: 120,
          redFrom: 90,
          redTo: 120,
          yellowFrom: 80,
          yellowTo: 90,
          minorTicks: 5,
          animation: {
            duration: 900,
            easing: 'inAndOut'
          }
        }

        Kiosk.drawGauge(response.air_temperature, 'air_temperature_gauge', options);

        var options = {
          min: 10,
          max: 33,
          width: 400,
          height: 120,
          yellowFrom: 30,
          yellowTo: 33,
          minorTicks: 5,
          animation: {
            duration: 900,
            easing: 'inAndOut'
          }
        }

        Kiosk.drawGauge(response.air_pressure, 'air_pressure_gauge', options);

        var options = {
          min: 0,
          max: 100,
          width: 400,
          height: 120,
          redFrom: 45,
          redTo: 100,
          yellowFrom: 30,
          yellowTo: 45,
          minorTicks: 5,
          animation: {
            duration: 900,
            easing: 'inAndOut'
          }
        }

        Kiosk.drawGauge(response.wind_speed, 'wind_speed_gauge', options);
      });
    },

    newsletterSignup: function() {
      var email_address = $('#newsletter-signup input#newsletter-email-address').attr('value');

      DrupalRequest.newsletterSignup(email_address, function(response) {
        $('#newsletter-signup').html('<div class="small-12 columns"><p>Thank you! A confirmation has been sent to ' + email_address + '. Please follow the instructions in that email to complete the signup for our newsletter.</p></div>');

        setTimeout(function() {
          $('#newsletter-signup').foundation('reveal', 'close');
        }, 5000);
      });
    },

    util: {
      actionUrl: function(feed_id) {
        return Kiosk.variables.contentServer + Kiosk.variables.services[feed_id];
      },

      updateScreen: function(selector, content) {
        $(selector).fadeIn('slow').html(content);
      }
    },

    // Application variables
    variables: {
      kiosk_id: 436,
      contentServer: 'http://www.historiclewes.org/',

      services: {
        node: 'kiosk/views/kiosk_nodes?display_id=block_1',
        collections: 'kiosk/views/kiosk_nodes?display_id=block_2',
        homepage_slideshow: 'kiosk/views/kiosk_nodes?display_id=block_3',
        collections_slideshow: 'kiosk/views/kiosk_nodes?display_id=block_5',
        search: 'kiosk/views/kiosk_nodes?display_id=block_4'
      },

      rssFeeds: {
        cnn_us: 'http://rss.cnn.com/rss/cnn_us.rss'
      },

      vimeo: {
        'type': 'user',
        'id': 'user1949213'
      }
    }
  }
})(typeof Zepto === 'function' ? Zepto : jQuery, this, this.document);