$(document).ready(function () {
  $("li.inactive").click(function () {

    alert("Hello!");

    $(this).addClass("active");
  });
});