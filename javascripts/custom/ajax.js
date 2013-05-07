// Define DrupalAjaxRequest
var DrupalAjaxRequest = (function () {
  var fetchNode = function(node_id, callback) {
    Zepto.ajax(
      {
        url: Kiosk.util.contentUrl('node'),
        dataType: 'jsonp',
        data: {nid: node_id},
        type: 'GET',
        cache: false,
        success: function (result) {
          callback(result);
        }
      }
    );
  }

  var fetchCollections = function(callback) {
    Zepto.ajax(
      {
        url: Kiosk.util.contentUrl('collections'),
        dataType: 'jsonp',
        type: 'GET',
        cache: false,
        success: function (result) {
          callback(result);
        }
      }
    );
  }

  return {
    fetchNode : fetchNode,
    fetchCollections: fetchCollections
  }
})();