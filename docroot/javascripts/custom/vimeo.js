// Define VimeoRequest
var VimeoRequest = (function () {
  var getData = function(type, id, callback) {
    $.ajax(
        {
          url: vimeoAPIRequestURL(type, id),
          dataType: 'jsonp',
          type: 'GET',
          cache: true,
          success: function (response) {
            var context = { items: [] }

            $.each(response, function(key, value) {
              context.items.push({ 'title' : value.title, 'vimeo_id': value.id, 'thumbnail_small': value.thumbnail_small, 'thumbnail_medium': value.thumbnail_medium, 'thumbnail_large': value.thumbnail_large});
            });

            callback(context);
          }
        }
    );
  }

  var vimeoAPIRequestURL = function(type, id) {
    switch (type) {
      case 'user':
        return 'http://vimeo.com/api/v2/' + id + '/videos.json';
        break;
      case 'album':
        return 'http://vimeo.com/api/v2/album/' + id + '/videos.json';
        break;
      default:
        break;
    }
  }

  return {
    getData : getData
  }
})();