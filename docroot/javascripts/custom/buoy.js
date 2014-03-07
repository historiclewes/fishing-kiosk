// Define BuoyRequest
var BuoyRequest = (function () {
  var getData = function(buoy_id, callback) {
    $.ajax(
        {
          url: dataFeedUrl(buoy_id),
          type: 'GET',
          dataType: 'json',
          cache: false,
          success: function (response) {
            var context = {
              wave_height: response[0].WVHT,
              wave_length: (response[0].wavelength && response[0].wavelength.length) ? response[0].wavelength : 'n/a',
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

            callback(context);
          }
        }
    );
  }

  var getTideData = function(buoy_id, callback) {
    $.ajax(
        {
          url: tideXMLUrl(buoy_id),
          type: 'GET',
          dataType: 'xml',
          cache: false,
          success: function (response) {
            var context = { tides: [], items: [] }
            var today = new Date();
            var formattedDate = today.getFullYear() + '/' + ('0' + (today.getMonth() + 1)).slice(-2) + '/' + ('0' + (today.getDate())).slice(-2);

            //var nodes = response.
            var json = xmlToJson(response);
            var i = 0;

            $.each(json.datainfo.data.item, function(key, value) {
              if (value.date['#text'] == formattedDate) {
                context.tides.push({ time: value.time['#text'], highlow: value.highlow['#text'] });
              }
            });

            // slice out AM/PM tide data depending on time of day.
            if (today.getHours() >= 12) {
              delete(context.tides[0]);
              delete(context.tides[1]);
            } else {
              delete(context.tides[2]);
              delete(context.tides[3]);
            }

            $.each(context.tides, function(key, value) {
              if (context.tides[key] !== undefined) {
                context.items.push({ time: value.time, highlow: value.highlow });
              }
            });

            callback(context);
          }
        }
    );
  }

  // Changes XML to JSON
  var xmlToJson = function(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };

  var dataFeedUrl = function(buoy_id) {
    return 'json/' + buoy_id + '.json';
  }

  var tideXMLUrl = function(buoy_id) {
    return 'tides/' + buoy_id + '.xml';
  }

  return {
    getData : getData,
    getTideData : getTideData,
    xmlToJson: xmlToJson
  }
})();