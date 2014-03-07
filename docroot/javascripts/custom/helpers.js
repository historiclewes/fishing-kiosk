// Register a 'link' function through Handlebars as a formatter helper.
Handlebars.registerHelper('link', function(object) {
  return new Handlebars.SafeString(
      "<a href='" + object.url + "'>" + object.text + "</a>"
  );
});

// register a basic list helper to render items back wrapped in list tag
Handlebars.registerHelper('list', function(items, options) {
  var output = '';

  for(var i=0, l=items.length; i<l; i++) {
    output = output + "<li>" + options.fn(items[i]) + "</li>";
  }

  return output;
});

// getTemplate handles compiled templates via templates.js
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