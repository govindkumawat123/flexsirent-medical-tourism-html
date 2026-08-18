$(document).ready(function () {

    $(".ct_menu_bar").click(function () {
        $(".ct_navbar").addClass("ct_show");
    });

    $(".ct_close_menu").click(function () {
        $(".ct_navbar").removeClass("ct_show");
    });

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 22) {
            $(".ct_header").addClass("ct_sticky_menu");
        } else {
            $(".ct_header").removeClass("ct_sticky_menu");
        }
    });

     $(".ct_testimonial_slider").owlCarousel({
      loop: true,
      margin: 12,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 600,

      navText: [
        '<i class="fa-solid fa-angle-left"></i>',
        '<i class="fa-solid fa-angle-right"></i>'
      ],

      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        992: {
          items: 3
        }
      }
    });

});
  const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".ct_price-input input"),
    range = document.querySelector(".ct_range_slider1 .ct_range_progress");
  let priceGap = 1000;
  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });
  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }
    });
  });

  $(".ct_custom_price_select_dropdown").click(function (e) {
    e.stopPropagation(); // Prevent event from bubbling to document

    // Close all dropdowns except the clicked one
    $(".ct_custom_price_select_dropdown").not(this).removeClass("active");
    $(".ct_custom_drop_mega")
      .not($(this).next(".ct_custom_drop_mega"))
      .removeClass("active");

    // Toggle the clicked dropdown
    $(this).toggleClass("active");
    $(this).next(".ct_custom_drop_mega").toggleClass("active");
  });

$(window).on("load", function () {
  $(".ct_loader_main").fadeOut();
});

$(document).ready(function () {
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;

  setProgressBar(current);

$(".ct_multistep_form_next").click(function () {

    current_fs = $(this).closest("fieldset");
    next_fs = current_fs.next("fieldset");

    $("#ct_form_progressbar li")
        .eq($("fieldset").index(next_fs))
        .addClass("active");

    next_fs.show();

    current_fs.animate(
        { opacity: 0 },
        {
            step: function (now) {
                opacity = 1 - now;

                current_fs.css({
                    display: "none",
                    position: "relative"
                });

                next_fs.css({
                    opacity: opacity
                });
            },
            duration: 500
        }
    );

    setProgressBar(++current);
});

$(".previous").click(function () {

    current_fs = $(this).closest("fieldset");
    previous_fs = current_fs.prev("fieldset");

    $("#ct_form_progressbar li")
        .eq($("fieldset").index(current_fs))
        .removeClass("active");

    previous_fs.show();

    current_fs.animate(
        { opacity: 0 },
        {
            step: function (now) {
                opacity = 1 - now;

                current_fs.css({
                    display: "none",
                    position: "relative"
                });

                previous_fs.css({
                    opacity: opacity
                });
            },
            duration: 500
        }
    );

    setProgressBar(--current);
});

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  $(".submit").click(function () {
    return false;
  });

  $(".ct_apply_filter_btn").click(function () {
    $(".ct_mobile_filter_category_content").addClass("active");
  });
  $(".ct_category_close_btn").click(function () {
    $(".ct_mobile_filter_category_content").removeClass("active");
  });
});



// page multistep form 


$(document).ready(function () {

    var current = 1;
    var steps = $("#msform2 fieldset").length;

    // Hide all fieldsets except first
    $("#msform2 fieldset:not(:first)").hide();

    setProgressBar(current);


    // NEXT BUTTON
    $(".ct_multistep_form_next").click(function () {

        var current_fs = $(this).closest("fieldset");
        var next_fs = current_fs.next("fieldset");

        if (!next_fs.length) {
            return;
        }

        // Progress
        $("#ct_form_progressbar2 li")
            .eq($("#msform2 fieldset").index(next_fs))
            .addClass("active");

        // Hide current
        current_fs.fadeOut(300, function () {

            // Show next
            next_fs.fadeIn(300);

        });

        current++;

        setProgressBar(current);
    });


    // PREVIOUS BUTTON
    $(".previous").click(function () {

        var current_fs = $(this).closest("fieldset");
        var previous_fs = current_fs.prev("fieldset");

        if (!previous_fs.length) {
            return;
        }

        // Remove active progress
        $("#ct_form_progressbar2 li")
            .eq($("#msform2 fieldset").index(current_fs))
            .removeClass("active");

        // Hide current
        current_fs.fadeOut(300, function () {

            // Show previous
            previous_fs.fadeIn(300);

        });

        current--;

        setProgressBar(current);
    });


    // PROGRESS BAR
    function setProgressBar(curStep) {

        var percent = (100 / steps) * curStep;

        $(".progress-bar").css(
            "width",
            percent + "%"
        );
    }


    $(".submit").click(function () {
        return false;
    });


    $(".ct_apply_filter_btn").click(function () {
        $(".ct_mobile_filter_category_content").addClass("active");
    });

    $(".ct_category_close_btn").click(function () {
        $(".ct_mobile_filter_category_content").removeClass("active");
    });

});
 



