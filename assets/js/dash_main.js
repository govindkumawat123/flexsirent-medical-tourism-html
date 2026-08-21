$(document).ready(function () {

  // ── Sidebar Toggles ──
  $(".ct_menu_bar").click(function () {
    $("main").addClass("ct_show");
  });

  $(".ct_close_sidebar").click(function () {
    $("main").removeClass("ct_show");
  });

});