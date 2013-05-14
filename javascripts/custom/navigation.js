$(document).ready(function () {
  var footer = $('#footer-navigation');  // cache footer to a variable for performance
  footer.delegate('li.inactive', 'click', function () {
    footer.find('.active').toggleClass('active inactive');
    $(this).toggleClass('active inactive');
  });
});
