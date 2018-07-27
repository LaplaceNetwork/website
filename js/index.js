$(function () {
  var isMobile = window.innerWidth < 773;
  $(".header .nav").on("click", "li", function () {
    var block = $(this).data("block");
    if (block == "cn" || block == "en") {
      switchLanguage(block);
    } else {
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
    $(window).scrollTop($("." + block).offset().top - 65);
  }
  $(".mnav-layer .nav").on("click", "li", function () {
    $("#hamburger-1").trigger("click");
    handleNav.call(this);
  });

  $(".qa").on("click", ".qa-row", function () {
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

  function getBlockConfig() {
    var config = {};
    $(".block").each(function () {
      config[$(this).data('block')] = {
        top: $(this).offset().top,
        height: $(this).outerHeight()
      }
    });
    return config;
  }
  var wh = $(window).height();

  function findInViewport(sh) {
    var dh, dah, store = [],
      hideStore = [];
    var config = getBlockConfig();
    for (var block in config) {
      if (config.hasOwnProperty(block)) {
        dh = config[block].top + config[block].height / 2;
        dah = config[block].top + config[block].height;
        if ((dah - sh > 200) && dh < (sh + wh)) {
          //在市口
          store.push(block)
        } else {
          hideStore.push(block)
        }
      }
    }

    return {
      store: store,
      hideStore: hideStore
    }
  }

  function activeTab(key) {
    var tab = $(".header .nav li[data-block=" + key + "]");
    tab.addClass("textColor");
    tab.siblings("li").removeClass("textColor");
    if (key === "alloc") {
      renewCircle();
    } else if (key == "main") {

    }
  }
  $(window)
    .scroll(function () {
      var sh = $(window).scrollTop();
      var blocks = findInViewport(sh);
      blocks.store.forEach(function (bk) {
        var $bk = $("." + bk);
        if (!$bk.hasClass("active")) {
          $bk.addClass("active");
          activeTab(bk);
        }
      });
      blocks.hideStore.forEach(function (bk) {
        var $bk = $("." + bk);
        if ($bk.hasClass("active")) {
          $bk.removeClass("active")
        }
      })
    })
    .trigger("scroll");

  $("#hamburger-1").click(function () {
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
    $(".timeline .t-node-cont").each(function () {
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
