(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bay.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\">\n  <div class=\"large-5 columns text-center\" id=\"bay-map\">\n    <h2 class=\"block-title\">Current<br/> Shipping Traffic</h2>\n\n    <div class=\"map\">\n      <img src=\"http://placehold.it/425x415\"/>\n    </div>\n    <div class=\"large-12 columns\"><span class=\"text-center\">Touch a ship to view more information</span>\n    </div>\n  </div>\n\n\n  <div class=\"large-5 columns\" id=\"current-conditions-block\">\n    <h2 class=\"block-title text-center\">Current Conditions</h2>\n\n    <div class=\"large-12 columns\" id=\"current-conditions\">\n      <div class=\"large-4 columns\" id=\"temperature\">\n        <h4 class=\"text-center\">Temperature</h4>\n        <img src=\"http://placehold.it/125x125\"/>\n\n        <div class=\"row\">\n          <div class=\"large-12 columns\">\n            <h4 class=\"left\">Air:</h4>\n            <span class=\"red-span\">75ºF</span>\n          </div>\n          <div class=\"large-12 columns\">\n            <h4 class=\"left\">Water:</h4>\n            <span class=\"red-span\">65ºF</span>\n          </div>\n        </div>\n      </div>\n      <div class=\"large-4 columns \" id=\"pressure\">\n        <h4 class=\"text-center\">Air Pressure</h4>\n        <img src=\"http://placehold.it/125x125\"/>\n\n        <div class=\"row\">\n\n          <div class=\"large-12 columns\">\n            <span class=\"red-span text-center\">29.56 inches</span>\n          </div>\n          <div class=\"large-12 columns\">\n            <h4 class=\"text-center\">Rising</h4>\n          </div>\n        </div>\n      </div>\n      <div class=\"large-4 columns\" id=\"windspeed\">\n        <h4 class=\"text-center\">Wind Speed</h4>\n        <img src=\"http://placehold.it/125x125\"/>\n\n        <div class=\"row\">\n\n          <div class=\"large-12 columns\">\n            <span class=\"red-span\">10 Knots</span>\n            <h4 class=\"left\">SSW</h4>\n          </div>\n          <div class=\"large-12 columns\">\n            <h4 class=\"left\">Gusts:</h4>\n            <span class=\"red-span\">10 Kt</span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n\n  </div>\n  <div class=\"large-2 columns\" id=\"buoy-stations\">\n    <h2 class=\"block-title text-center\">Buoy Stations</h2>\n\n    <div class=\"navigation\">\n      <li><a class=\"button radius\" href=\"#\">Station SJSN 4</a></li>\n      <li><a class=\"button radius\" href=\"#\">Station SJSN 4</a></li>\n      <li><a class=\"button radius\" href=\"#\">Station SJSN 4</a></li>\n      <li><a class=\"button radius\" href=\"#\">Station SJSN 4</a></li>\n    </div>\n  </div>\n  <div class=\"large-6 columns\" id=\"waves-tides\">\n    <div class=\"row waves-tides-header\">\n      <div class=\"waves-tides-header\"></div>\n      <div class=\"large-7 columns  block-radius\">\n        <h2 class=\"block-title text-center\">Waves</h2>\n\n        <div class=\"row\">\n\n          <div class=\"large-6 columns\">\n            <h4 class=\"left\">Height:</h4>\n            <span class=\"red-span\">2 feet</span>\n          </div>\n\n          <div class=\"large-6 columns\">\n            <h4 class=\"left\">Length:</h4>\n            <span class=\"red-span\">100 m</span>\n          </div>\n\n          <div class=\"large-6 columns\">\n            <h4 class=\"left\">Period:</h4>\n            <span class=\"red-span\">3.2 sec</span>\n          </div>\n\n          <div class=\"large-6 columns\">\n            <h4 class=\"left\">Direction:</h4>\n            <span class=\"red-span\">NW</span>\n          </div>\n\n        </div>\n      </div>\n\n      <div class=\"large-4 columns block-radius\">\n        <h2 class=\"block-title text-center\">Tides</h2>\n\n        <div class=\"row\">\n\n          <div class=\"large-12 columns\">\n            <h4 class=\"left\">Low:</h4>\n            <span class=\"red-span\">1:34 AM</span>\n          </div>\n\n          <div class=\"large-12 columns\">\n            <h4 class=\"left\">High:</h4>\n            <span class=\"red-span\">12:53 PM</span>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n";
  });
templates['buoys.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\">\n  <h2>Buoys</h2>\n</div>";
  });
templates['cannonballhouse.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n  <div class=\"large-10 columns large-offset-1\">\n    <h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n\n    ";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;
  });
templates['collection.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row artifact\">\n  <div class=\"large-4  columns artifact-image\">\n    <img src=\"http://placehold.it/1000x1000\"/>\n  </div>\n  <div class=\"large-8 columns\">\n    <h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n\n    <div class=\"large-12 artifact-info\">\n      ";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n    <div class=\"artifact-divider\"></div>\n\n    <div class=\"row\">\n      <div class=\"large-4 columns description block-radius\">\n        <div class=\"large-12\">\n          <h6 class=\"meddon text-center\">Description</h6>\n          <h5>Early Date:</h5>\n          <span class=\"red-span\">1960</span>\n        </div>\n        <div class=\"large-12\">\n          <h5>Late Date:</h5>\n          <span class=\"red-span\">1999</span>\n        </div>\n        <div class=\"large-12\">\n          <h5>Condition:</h5>\n          <span class=\"red-span\">Good</span>\n        </div>\n      </div>\n      <div class=\"large-5 columns  categorical-info block-radius\">\n        <div class=\"large-12\">\n          <h6 class=\"meddon text-center\">Categorical Information</h6>\n          <h5>Collection:</h5>\n          <span class=\"red-span\">Objects</span>\n        </div>\n        <div class=\"large-12\">\n          <h5>Object ID:</h5>\n          <span class=\"red-span\">2001.15.20</span>\n        </div>\n        <div class=\"large-12\">\n          <h5>Object Name:</h5>\n          <span class=\"red-span\">Cup & Saucer</span>\n        </div>\n        <div class=\"large-12\">\n          <h5>Sterms:</h5>\n          <span class=\"red-span\">Cup & Saucer</span>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  });
templates['collections.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <a href=\"#\" onclick=\"Kiosk.getNode('collection', '";
  if (stack1 = helpers.nid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "'); return false;\">\n            <div class=\"large-12 columns artifact-teaser\">\n              <div class=\"large-3 columns\">\n                <img src=\"http://placehold.it/425x415\"/>\n              </div>\n              <div class=\"large-9 columns\">\n                <h4>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n\n                ";
  if (stack1 = helpers.teaser) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.teaser; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                <p class=\"right collections meddon pointer-left\">Learn More</p>\n              </div>\n            </div>\n          </a>\n        ";
  return buffer;
  }

  buffer += "<div class=\"row\" id=\"collection\">\n  <div class=\"large-5 columns slideshow\">\n    <div class=\"large-12 collection-slideshow\">\n      <img src=\"http://placehold.it/419x268\"/>\n    </div>\n    <div class=\"large-12 block-radius collections-cta\">\n      <h5 class=\"meddon\">Learn About Artifacts</h5>\n\n      <p>Scroll through our many artifacts on the right. Click on any you wish to view more information on!</p>\n    </div>\n  </div>\n\n  <div class=\"large-6 columns\" id=\"collection-teaser\">\n    <div class=\"collection-teaser-top\"></div>\n    <div class=\"content large-12 columns\">\n      ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.items),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n    <div class=\"collection-teaser-bottom\"></div>\n  </div>\n</div>";
  return buffer;
  });
templates['footer.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\">\n  <div class=\"large-10 columns\">\n    <nav id=\"footer-navigation\">\n      <ul class=\"inline-list\">\n        <li class=\"home\"><a id=\"home\" href=\"#\" onclick=\"Kiosk.getPage('home'); return false;\">Home</a></li>\n        <li class=\"the-bay\"><a id=\"the-bay\" href=\"#\" onclick=\"Kiosk.getPage('bay'); return false;\">The Bay</a></li>\n        <li class=\"history\"><a href=\"#\" onclick=\"Kiosk.getNode('node', 323); return false;\">History</a></li>\n        <li class=\"collection\"><a href=\"#\" onclick=\"Kiosk.getCollections(); return false;\">Collection</a></li>\n        <li class=\"videos\"><a href=\"#\" onclick=\"Kiosk.getPage('videos'); return false;\">Videos</a></li>\n        <li class=\"cannonball-house\"><a href=\"#\" onclick=\"Kiosk.getNode('node', 368); return false;\">Cannonball House</a></li>\n      </ul>\n    </nav>\n  </div>\n  <div class=\"large-2 columns text-center\" id=\"newsletter\">\n        <span>\n          Stay up to date with LHS Newsletter!\n        </span><br/><br/>\n    <a href=\"#\" data-reveal-id=\"myModal\">\n      Join today\n    </a>\n  </div>\n</div>";
  });
templates['header.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\">\n  <div class=\"large-12 columns\">\n    <div class=\"large-6 large-offset-3 columns\" id=\"page-title\"><h2>Pilots on the Bay & River Delaware</h2></div>\n\n    <div id=\"search\" class=\"large-3 columns\">\n      <div class=\"search-wrapper\">\n        <input type=\"text\" class=\"your-label-class large-1 columns\" placeholder=\"Search\">\n        <button type=\"submit\" value=\"\" class=\"telescope-button\" onclick=\"Kiosk.getPage('search'); return false;\"></button>\n      </div>\n    </div>\n  </div>\n</div>";
  });
templates['history.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n  <div class=\"large-10 columns large-offset-1\">\n    <h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n\n    ";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;
  });
templates['home.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\" id=\"homepage\">\n  <div class=\"large-7 columns slideshow\">\n    <a href=\"#\" class=\"collections rokkitt\" onclick=\"Kiosk.getPage('templates/collection/index.html'); return false;\">View\n      the Collection</a>\n\n    <div class=\"slideshow-frame\">\n      <!-- REPLACE THE PLACEHOLDIT IMAGE WITH SLIDESHOW FIELDS -->\n      <img src=\"http://placehold.it/587x375\"/>\n      <!-- REPLACE THE PLACEHOLDIT IMAGE WITH SLIDESHOW FIELDS -->\n\n    </div>\n  </div>\n  <div class=\"large-5 columns\">\n    <div class=\"large-6 columns\" id=\"videos-cta\">\n      <div class=\"large-6 right\"><h2 class=\"red-header\">Videos</h2>\n\n        <p>This gentleman was surely not equipped to watch videos but you certainly are.</p>\n      </div>\n      <a class=\"meddon\" href=\"#\"\n         onclick=\"Kiosk.getPage('templates/videos/index.html'); return false;\">Watch</a></div>\n    <div class=\"large-6 columns\" id=\"history-cta\">\n      <h2 class=\"red-header\">History</h2>\n\n      <p>Explore the ebb and flow of a fishing industry once central to our local economy.</p>\n      <a class=\"meddon\" href=\"#\"\n         onclick=\"Kiosk.getNode('node', 323); return false;\">Learn</a>\n    </div>\n    <div class=\"large-12 columns\" id=\"whale-divider\">\n    </div>\n    <div class=\"large-9 columns block-radius\" id=\"homepage-cta\">\n      <h2 class=\"text-center red-header\">The Bay</h2>\n      <h4>Live Bay Reporting</h4>\n\n      <p>View our interactive map which shows not only the buoys currently in the Delaware Bay, but displays useful\n        inforamtion about the weather and tides!</p>\n      <a href=\"#\" class=\"right collections meddon pointer-left\"\n         onclick=\"Kiosk.getPage('templates/the-bay/index.html'); return false;\">View\n        The Bay</a>\n    </div>\n  </div>\n</div>";
  });
templates['navigation.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li><a href=\"";
  if (stack1 = helpers.href) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.href; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n    ";
  return buffer;
  }

  buffer += "<section class=\"top-bar-section\">\n  <ul class=\"left\">\n    ";
  stack1 = helpers.each.call(depth0, depth0.navigation, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n</section>";
  return buffer;
  });
templates['news.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers.each.call(depth0, depth0.items, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <a href=\"#\" onclick=\"Kiosk.getNewsArticle('";
  if (stack1 = helpers.nid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.nid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "'); return false;\">\n          <div class=\"large-5 columns news-teaser\">\n            <h4>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n\n            ";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            <p class=\"right collections meddon pointer-left\">Learn More</p>\n          </div>\n        </a>\n      ";
  return buffer;
  }

  buffer += "<div class=\"row\">\n  <div class=\"large-9 large-offset-1\">\n    <h2>News</h2>\n\n    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = depth0.items),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </div>\n</div>\n";
  return buffer;
  });
templates['node.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"row\">\n  <div class=\"large-10 columns large-offset-1\">\n    <h2>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n\n    ";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.body; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>";
  return buffer;
  });
templates['search.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\">\n  <div class=\"large-9 large-offset-1\"><h2>Search Results</h2>\n    <a href=\"#\" onclick=\"Kiosk.getPage('templates/artifacts/index.html'); return false;\">\n      <div class=\"large-5 columns news-teaser\">\n        <h4>Search Result Title</h4>\n\n        <p>n ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper\n          pharetra.</p>\n\n        <p href=\"#\" class=\"right collections meddon pointer-left\">Learn More</p>\n      </div>\n    </a>   <a href=\"#\" onclick=\"Kiosk.getPage('templates/artifacts/index.html'); return false;\">\n      <div class=\"large-5 columns news-teaser\">\n        <h4>Search Result Title</h4>\n\n        <p>n ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper\n          pharetra.</p>\n\n        <p href=\"#\" class=\"right collections meddon pointer-left\">Learn More</p>\n      </div>\n    </a>   <a href=\"#\" onclick=\"Kiosk.getPage('templates/artifacts/index.html'); return false;\">\n      <div class=\"large-5 columns news-teaser\">\n        <h4>Search Result Title</h4>\n\n        <p>n ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper\n          pharetra.</p>\n\n        <p href=\"#\" class=\"right collections meddon pointer-left\">Learn More</p>\n      </div>\n    </a>   <a href=\"#\" onclick=\"Kiosk.getPage('templates/artifacts/index.html'); return false;\">\n      <div class=\"large-5 columns news-teaser\">\n        <h4>Search Result Title</h4>\n\n        <p>n ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper\n          pharetra.</p>\n\n        <p href=\"#\" class=\"right collections meddon pointer-left\">Learn More</p>\n      </div>\n    </a>   <a href=\"#\" onclick=\"Kiosk.getPage('templates/artifacts/index.html'); return false;\">\n      <div class=\"large-5 columns news-teaser\">\n        <h4>Search Result Title</h4>\n\n        <p>n ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper\n          pharetra.</p>\n\n        <p href=\"#\" class=\"right collections meddon pointer-left\">Learn More</p>\n      </div>\n    </a>   <a href=\"#\" onclick=\"Kiosk.getPage('templates/artifacts/index.html'); return false;\">\n      <div class=\"large-5 columns news-teaser\">\n        <h4>Search Result Title</h4>\n\n        <p>n ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper\n          pharetra.</p>\n\n        <p href=\"#\" class=\"right collections meddon pointer-left\">Learn More</p>\n      </div>\n    </a>   <a href=\"#\" onclick=\"Kiosk.getPage('templates/artifacts/index.html'); return false;\">\n      <div class=\"large-5 columns news-teaser\">\n        <h4>Search Result Title</h4>\n\n        <p>n ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper\n          pharetra.</p>\n\n        <p href=\"#\" class=\"right collections meddon pointer-left\">Learn More</p>\n      </div>\n    </a>   <a href=\"#\" onclick=\"Kiosk.getPage('templates/artifacts/index.html'); return false;\">\n      <div class=\"large-5 columns news-teaser\">\n        <h4>Search Result Title</h4>\n\n        <p>n ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper\n          pharetra.</p>\n\n        <p href=\"#\" class=\"right collections meddon pointer-left\">Learn More</p>\n      </div>\n    </a>\n  </div>\n</div>\n";
  });
templates['videos.hbs'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"row\" id=\"videos\">\n  <div class=\"large-8 large-offset-2\">\n    <ul class=\"large-block-grid-3\">\n      <li>\n        <a href=\"#\" data-reveal-id=\"videoModal1\">\n          <h4 class=\"\">Video Title Here</h4>\n          <img class=\"block-radius\" src=\"http://placehold.it/280x195\"/>\n        </a>\n      </li>\n      <li>\n        <a href=\"#\" data-reveal-id=\"videoModal2\">\n          <h4 class=\"\">Video Title Here</h4>\n          <img class=\"block-radius\" src=\"http://placehold.it/280x195\"/>\n        </a>\n      </li>\n      <li>\n        <a href=\"#\" data-reveal-id=\"videoModal3\">\n          <h4 class=\"\">Video Title Here</h4>\n          <img class=\"block-radius\" src=\"http://placehold.it/280x195\"/>\n        </a>\n      </li>\n      <li>\n        <a href=\"#\" data-reveal-id=\"videoModal4\">\n          <h4 class=\"\">Video Title Here</h4>\n          <img class=\"block-radius\" src=\"http://placehold.it/280x195\"/>\n        </a>\n      </li>\n      <li>\n        <a href=\"#\" data-reveal-id=\"videoModal5\">\n          <h4 class=\"\">Video Title Here</h4>\n          <img class=\"block-radius\" src=\"http://placehold.it/280x195\"/>\n        </a>\n      </li>\n      <li>\n        <a href=\"#\" data-reveal-id=\"videoModal6\">\n          <h4 class=\"\">Video Title Here</h4>\n          <img class=\"block-radius\" src=\"http://placehold.it/280x195\"/>\n        </a>\n      </li>\n    </ul>\n  </div>\n</div>";
  });
})();