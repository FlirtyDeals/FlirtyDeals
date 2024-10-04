$(document).ready(function() {
  $(".clickable-row").on("click", function() {
    var link = $(this).data("link");
    window.location.href = link;
    return false;
  });
});