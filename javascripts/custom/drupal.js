// Define DrupalRequest
var DrupalRequest = (function () {
  var fetchNode = function(node_id, callback) {
    $.ajax(
      {
        url: Kiosk.util.actionUrl('node'),
        dataType: 'jsonp',
        data: {args: [node_id]},
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = {
            title: response[0].title,
            body: response[0].body,
            image_src: '',
            early_date: '',
            late_date: '',
            condition: '',
            collection: '',
            object_id: '',
            object_name: '',
            sterms: ''
          }

          // if a kiosk description exists, use that instead of the existing node body
          if (response[0].kiosk_body && response[0].kiosk_body.length) {
            context.body = response[0].kiosk_body;
          }

          // if an artifact image exists, populate the image src
          if (response[0].artifact_image && response[0].artifact_image.length) {
            context.image_src = response[0].artifact_image;
          }

          // if a kiosk image exists, populate the image src
          if (response[0].kiosk_image && response[0].kiosk_image.length) {
            context.image_src = response[0].kiosk_image;
          }

          // if an artifact image exists, populate the image src
          if (response[0].early_date && response[0].early_date.length) {
            context.early_date = response[0].early_date;
          }

          if (response[0].late_date && response[0].late_date.length) {
            context.late_date = response[0].late_date;
          }

          if (response[0].condition && response[0].condition.length) {
            context.condition = response[0].condition;
          }

          if (response[0].collection && response[0].collection.length) {
            context.collection = response[0].collection;
          }

          if (response[0].object_id && response[0].object_id.length) {
            context.object_id = response[0].object_id;
          }

          if (response[0].object_name && response[0].object_name.length) {
            context.object_name = response[0].object_name;
          }

          if (response[0].sterms && response[0].sterms.length) {
            context.sterms = response[0].sterms;
          }

          callback(context);
        }
      }
    );
  }

  var fetchCollectionsView = function(feed_id, callback) {
    $.ajax(
      {
        url: Kiosk.util.actionUrl(feed_id),
        dataType: 'jsonp',
        data: {args: [Kiosk.variables.kiosk_id]},
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = { items: [] }

          $.each(response, function(key, value) {
            var image_src;

            // if an artifact image exists, populate the image src
            if (value.picture && value.picture.length) {
              image_src = value.picture;
            }

            context.items.push({ 'title' : value.title, 'teaser': value.teaser, 'nid': value.nid, 'image_src': image_src });
          });

          callback(context);
        }
      }
    );
  }

  var fetchSlideshowView = function(feed_id, callback) {
    $.ajax(
      {
        url: Kiosk.util.actionUrl(feed_id),
        dataType: 'jsonp',
        data: {args: [Kiosk.variables.kiosk_id]},
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = { items: [] };

          $.each(response, function(key, value) {
            context.items.push({ 'src' : value.picture });
          });

          callback(context);
        }
      }
    );
  }

  var doSearch = function(feed_id, keywords, callback) {
    $.ajax(
      {
        url: Kiosk.util.actionUrl(feed_id),
        dataType: 'jsonp',
        data: {filters: { title: keywords }, args: [Kiosk.variables.kiosk_id] },
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = { items: [], keywords: keywords, empty: false }

          $.each(response, function(key, value) {
            context.items.push({ 'title' : value.title, 'nid': value.nid, 'teaser': value.teaser });
          });

          if (context.items.length == 0) {
            context.empty = true;
          }

          callback(context);
        }
      }
    );
  }

  var newsletterSignup = function(email_address, callback) {
    $.ajax(
      {
        url: 'http://oi.vresp.com?fid=873b7bef06' + '&email_address=' + email_address,
        type: 'POST',
        cache: false,
        success: function (result) {
          callback(result);
        },
        error: function (result) {
          callback(result);
        }
      }
    );
  }

  return {
    fetchNode: fetchNode,
    fetchCollectionsView: fetchCollectionsView,
    fetchSlideshowView: fetchSlideshowView,
    doSearch: doSearch,
    newsletterSignup: newsletterSignup
  }
})();