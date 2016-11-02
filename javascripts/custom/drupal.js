// Define DrupalRequest
var DrupalRequest = (function ($) {
  var fetchNode = function(node_id, callback) {
    $.ajax(
      {
        url: Kiosk.util.actionUrl('node') + node_id,
        dataType: 'json',
        // data: {args: [node_id]},
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = {
            title: response[0].title,
            body: response[0].body.replace('src="//www.historiclewes.org/', 'src="https://www.historiclewes.org/'),
            teaser: '',
            paragraph: '',
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
          if (response[0].field_kiosk_description && response[0].field_kiosk_description.length) {
            context.body = response[0].field_kiosk_description.replace('src="//www.historiclewes.org/', 'src="https://www.historiclewes.org/');
          }

          // if Body is empty, but there's a Summary:
          if (response[0].body.length < 1 && response[0].body_1.length && response[0].field_paragraphs.length < 1) {
            context.teaser = response[0].body_1.replace('src="//www.historiclewes.org/', 'src="https://www.historiclewes.org/');
          }

          // if an image exists, populate the image src
          if (response[0].field_paragraphs && response[0].field_paragraphs.length) {
            context.paragraph = response[0].field_paragraphs.replace('src="//www.historiclewes.org/', 'src="https://www.historiclewes.org/');
          }

          // if an artifact image exists, populate the image src
          if (response[0].field_pp_image_url && response[0].field_pp_image_url.length) {
            var str = '<img src="' + response[0].field_pp_image_url + '"/>';
            context.image_src = str;

            if (str.includes("themes/historiclewes/images") && !str.includes("http")) {
              context.image_src = '<img src="' + Kiosk.variables.contentServer + "/" + response[0].field_pp_image_url + '"/>';
            }
            else {
              if (str.includes("s3.amazonaws.com/lhs-pastperfect")) {
                $.ajax({
                  url: response[0].field_pp_image_url,
                  async: false,
                  type: 'GET',
                  cache: false,
                  error: function (response) {
                    context.image_src = '<img src="https://www.historiclewes.org/sites/default/files/default_images/generic-placeholder_0.png"/>';
                  }
                });
              }
            }
          }

          // if a kiosk image exists, populate the image src
          if (response[0].field_kiosk_image && response[0].field_kiosk_image.length) {
            var str = response[0].field_kiosk_image;
            if (!str.includes("http") && str.includes("//www.historiclewes.org/")) {
              context.image_src = str.replace("//www.historiclewes.org/", "https://www.historiclewes.org/");
            }
            else {
              context.image_src = response[0].field_kiosk_image;
            }
          }

          // if an image exists, populate the image src
          if (response[0].field_image && response[0].field_image.length) {
            var str = response[0].field_image;
            if (!str.includes("http") && str.includes("//www.historiclewes.org/")) {
              context.image_src = str.replace("//www.historiclewes.org/", "https://www.historiclewes.org/");
            }
            else if (!str.includes("http") && str.includes("/sites/default/files/")) {
              context.image_src = str.replace("/sites/default/files/", "https://www.historiclewes.org/sites/default/files/");
            }
            else {
              context.image_src = response[0].field_image;
            }
          }

          if (response[0].field_pp_early_date_num && response[0].field_pp_early_date_num.length) {
            context.early_date = response[0].field_pp_early_date_num;
          }

          if (response[0].field_pp_late_date_num && response[0].field_pp_late_date_num.length) {
            context.late_date = response[0].field_pp_late_date_num;
          }

          if (response[0].field_pp_condition && response[0].field_pp_condition.length) {
            context.condition = response[0].field_pp_condition;
          }

          if (response[0].field_artifact_type && response[0].field_artifact_type.length) {
            context.collection = response[0].field_artifact_type;
          }

          if (response[0].field_pp_object_id && response[0].field_pp_object_id.length) {
            context.object_id = response[0].field_pp_object_id;
          }

          // if (response[0].object_name && response[0].object_name.length) {
          //   context.object_name = response[0].object_name;
          // }

          if (response[0].field_sterms && response[0].field_sterms.length) {
            context.sterms = response[0].field_sterms;
          }

          callback(context);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr);
          console.log(thrownError);
        }
      }
    );
  }

  var fetchCollectionsView = function(feed_id, callback) {
    $.ajax(
        {
          url: Kiosk.util.actionUrl(feed_id) + Kiosk.variables.kiosk_id,
          dataType: 'json',
          type: 'GET',
          cache: false,
          success: function (response) {
            var context = { items: [] }

            $.each(response, function(key, value) {
              var image_src;

              // if an artifact image exists, populate the image src
              if (value.field_pp_image_url && value.field_pp_image_url.length) {
                if (value.field_pp_image_url.includes("themes/historiclewes/images") && !value.field_pp_image_url.includes("http")) {
                  image_src = Kiosk.variables.contentServer + "/" + value.field_pp_image_url;
                }
                else {
                  image_src = value.field_pp_image_url;
                }
              }
              context.items.push({ 'title' : value.title, 'teaser': value.body_1, 'nid': value.nid, 'image_src': image_src });
            });

            callback(context);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            console.log(thrownError);
          }
        }
    );
  }

  var fetchSlideshowView = function(feed_id, callback) {
    $.ajax(
        {
          url: Kiosk.util.actionUrl(feed_id) + Kiosk.variables.kiosk_id,
          dataType: 'json',
          // data: {args: [Kiosk.variables.kiosk_id]},
          type: 'GET',
          cache: false,
          success: function (response) {
            var context = { items: [] };

            $.each(response, function(key, value) {
              context.items.push({ 'src' : value.field_pp_image_url });
            });

            callback(context);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            console.log(thrownError);
          }
        }
    );
  }

  var doSearch = function(feed_id, keywords, callback) {
    $.ajax(
      {
        url: Kiosk.util.actionUrl(feed_id) + Kiosk.variables.kiosk_id + '?title=' + keywords,
        dataType: 'json',
        // data: {filters: { title: keywords }, args: [Kiosk.variables.kiosk_id] },
        type: 'GET',
        cache: false,
        success: function (response) {
          var context = { items: [], keywords: keywords, empty: false }

          $.each(response, function(key, value) {
            context.items.push({ 'title' : value.title, 'nid': value.nid, 'teaser': value.body });
          });

          if (context.items.length == 0) {
            context.empty = true;
          }

          callback(context);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr);
          console.log(thrownError);
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
})(typeof Zepto === 'function' ? Zepto : jQuery);