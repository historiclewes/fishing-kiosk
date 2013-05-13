// Define Kiosk
var Kiosk = (function($, window, document, undefined) {
  $(document).ready(function() {
    Kiosk.go();
  });

  // Application variables
  var contentServer = 'http://www.historiclewes.org/';

  // define our services endpoints back to the parent application
  var services = {
    node: 'kiosk/views/kiosk_nodes?display_id=block_1',
    collections: 'kiosk/views/kiosk_nodes?display_id=block_2',
    search: 'kiosk/views/kiosk_nodes?display_id=block_4'
  }

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
        Kiosk.util.updateScreen('#main-content', template());
      },

      getFooter: function() {
        var template = Handlebars.getTemplate('footer');
        $("#footer").html(template());
      }
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
        var context = {
          title: response[0].title,
          body: response[0].body
        }

        // if a kiosk description exists, use that instead of the existing node body
        if (response[0].kiosk_body && response[0].kiosk_body.length) {
          context.body = response[0].kiosk_body;
        }

        Kiosk.util.updateScreen('#main-content', template(context));
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

        Kiosk.util.updateScreen('#main-content', template(context));
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

        Kiosk.util.updateScreen('#main-content', template(context));
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

        Kiosk.util.updateScreen('#main-content', template(context));
      });
    },

    // fetch the weather data for a given buoy
    getWeatherData: function(buoy_id) {
      var buoyTemplate = Handlebars.getTemplate('buoy');
      var conditionsTemplate = Handlebars.getTemplate('conditions');

      BuoyRequest.getData(buoy_id, function(response) {
        var context = {
          wave_height: response[0].WVHT,
          wave_length: response[0].wavelength,
          wave_period: response[0].DPD,
          wave_direction: response[0].MWD,
          air_pressure: response[0].PRES,
          air_pressure_change: response[0].PTDY,
          air_temperature: response[0].ATMP,
          water_temperature: response[0].WTMP,
          wind_speed: response[0].WSPD,
          wind_direction: response[0].WDIR,
          wind_gusts: response[0].GST,
        };

        Kiosk.util.updateScreen('#current-conditions-block', conditionsTemplate(context));
        Kiosk.util.updateScreen('#waves-tides', buoyTemplate(context));
      });
    },

    newsletterSignup: function() {
      var email_address = $('#newsletter-signup input#newsletter-email-address').attr('value');

      DrupalRequest.newsletterSignup(email_address, function(response) {
        $('#newsletter-signup').foundation('reveal', 'close');
      });
    },

    util: {
      actionUrl: function(feed_id) {
        return contentServer + services[feed_id];
      },

      updateScreen: function(selector, content) {
        $(selector).fadeIn('slow').html(content);
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

Handlebars.registerHelper('list', function(items, options) {
  var output = '';

  for(var i=0, l=items.length; i<l; i++) {
    output = output + "<li>" + options.fn(items[i]) + "</li>";
  }

  return output;
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
