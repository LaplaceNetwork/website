$(function() {
  var isMobile = window.innerWidth < 866;
  $(".header .nav").on("click", "li", function() {
    var block = $(this).data("block");
    if(block == "cn" || block == "en") {
      switchLanguage(block);
    }
    else {
      handleNav.call(this);
    }
  });
  function switchLanguage(block) {
    $("[data-local]").each(function () {
      var lan = $(this).data('local');
      $(this).text(i18n[block][lan]);
    })
  }
  function handleNav() {
    var block = $(this).data("block");
    $(this)
      .siblings("li")
      .removeClass("textColor");
    $(this).addClass("textColor");
    $(".block").removeClass("active");
    $("." + block).addClass("active");
    $(window).scrollTop($("." + block).offset().top - 65);
    if (block === "alloc") {
      renewCircle();
    }
    if (block != "main") {
      isMobile ? $(".mlogo").fadeIn() : $(".logo").fadeIn();
      $(".hamburger").addClass("changeColor");
    } else {
      $(".logo,.mlogo").hide();
      $(".hamburger").removeClass("changeColor");
    }
  }
  $(".mnav-layer .nav").on("click", "li", function() {
    $("#hamburger-1").trigger("click");
    handleNav.call(this);
  });

  $(".qa").on("click", ".qa-row", function() {
    if ($(this).hasClass("active")) {
      $(this)
        .removeClass("active")
        .find("p")
        .slideUp();
    } else {
      $(this)
        .addClass("active")
        .find("p")
        .slideDown();
    }
  });

  function closeLayer() {
    $(".mnav-layer").slideUp();
    $("body").removeClass("noscroll");
  }
  function getBlock(sh) {
    if (sh < 500) {
      return "main";
    } else if (sh >= 800 && sh < 1500) {
      return "base";
    } else if (sh >= 1500 && sh < 2399) {
      return "alloc";
    } else if (sh >= 2399 && sh < 3399) {
      return "route";
    } else if (sh >= 3399 && sh < 3599) {
      return "news";
    } else if (sh >= 3599) {
      return "qa";
    }
    return "main";
  }
  $(window)
    .scroll(function() {
      var sh = $(window).scrollTop();
      var key = getBlock(sh);
      if (!$("." + key).hasClass("active")) {
        $(".block").removeClass("active");
        if (key != "main") {
          isMobile ? $(".mlogo").fadeIn() : $(".logo").fadeIn();
          $(".hamburger").addClass("changeColor");
        }

        $("." + key).addClass("active");
        var tab = $(".header .nav li[data-block=" + key + "]");
        tab.addClass("textColor");
        tab.siblings("li").removeClass("textColor");
        if (key === "alloc") {
          renewCircle();
        } else if (key == "main") {
          $(".logo,.mlogo").hide();
          $(".hamburger").removeClass("changeColor");
        }
      }
    })
    .trigger("scroll");

  $("#hamburger-1").click(function() {
    if ($(this).hasClass("is-active")) {
      $(this).removeClass("is-active");
      closeLayer();
    } else {
      $(this).addClass("is-active");
      $(".mnav-layer").slideDown();
      $("body").addClass("noscroll");
    }
  });
  var ww = window.innerWidth;
  if (ww < 866) {
    $(".timeline .t-node-cont").css({
      width: ww - 120 + "px",
      left: "50px",
      "border-right": "none",
      "border-left": "4px solid rgba(35, 188, 102, 1)"
    });
    $(".timeline .t-node-cont").each(function() {
      $(this)
        .parent()
        .css({
          margin: $(this).height() / 2 + 80 + "px" + " 0"
        });
    });
  }

  if (isMobile) {
    var swiper = new Swiper("#basecontainer", {
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
});
