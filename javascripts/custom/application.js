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

      var template = Handlebars.getTemplate('newsletter');
      Kiosk.util.updateScreen('#newsletter-signup', template());

      $('#kiosk-search').bind('keyup', function(e) {
        if (e.keyCode == 13) {
          Kiosk.getSearchResults();
        }
      });

      $('#footer-navigation li').not(':first').addClass('inactive');
      $('#footer-navigation li').first().addClass('active');

      $('#footer-navigation li').bind('click', function() {
        $(this).toggleClass('active inactive');
        $('#footer-navigation li').not(this).addClass('inactive').removeClass('active');
      });
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
          { id : "lwsd1", name : "Lewes" },
          { id : "bthd1", name : "Indian River Inlet" },
          { id : "44009", name : "Delaware Bay" },
          { id : "cman4", name : "Cape May" }
        ]
      }

      Kiosk.util.updateScreen('#main-content', template(context));
      Kiosk.getWeatherData(context.buoys[0].id);

      $('#buoy-stations li').not(':first').addClass('inactive');
      $('#buoy-stations li').first().addClass('active');

      $('#buoy-stations div.navigation li').bind('click', function() {
        $(this).toggleClass('active inactive');
        $('#buoy-stations div.navigation li').not(this).addClass('inactive').removeClass('active');
      });
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

      RSSRequest.getFeed(Kiosk.variables.rssFeeds[feed_id], function(response) {
        Kiosk.util.updateScreen('#main-content', template(response));
      });
    },

    getSearchResults: function() {
      var template = Handlebars.getTemplate('search');
      var keywords = $('#kiosk-search').val();

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
      var waveTemplate = Handlebars.getTemplate('waves');
      var tideTemplate = Handlebars.getTemplate('tides');
      var conditionsTemplate = Handlebars.getTemplate('conditions');

      BuoyRequest.getTideData(buoy_id, function(response) {
        Kiosk.util.updateScreen('#tides', tideTemplate(response));
      }),

      BuoyRequest.getData(buoy_id, function(response) {
        Kiosk.util.updateScreen('#current-conditions-block', conditionsTemplate(response));
        Kiosk.util.updateScreen('#wave-data', waveTemplate(response));

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
      var email_address = $('#newsletter-signup input#newsletter-email-address').val();

      DrupalRequest.newsletterSignup(email_address, function(response) {
        $('#newsletter-signup').html('<div class="small-12 columns"><p>Thank you! A confirmation has been sent to ' + email_address + '. Please follow the instructions in that email to complete the signup for our newsletter.</p></div>');

        setTimeout(function() {
          $('#newsletter-signup').foundation('reveal', 'close');

          // restart newsletter modal, render the form
          var template = Handlebars.getTemplate('newsletter');
          Kiosk.util.updateScreen('#newsletter-signup', template());
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
        search: 'kiosk/views/kiosk_nodes?display_id=page_1'
      },

      tideXML: {
        lewes: '/tides/lewes.xml'
      },

      vimeo: {
        'type': 'user',
        'id': 'user18747085'
      }
    }
  }
})(typeof Zepto === 'function' ? Zepto : jQuery, this, this.document);


$(".news-teaser").click(function(){
  window.location=$(this).find("a").attr("href");
  return false;
});



