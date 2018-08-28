$.urlParam = function(name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  return results ? results[1] : "";
};

$(function() {
  var lang = $.urlParam("lang") || "cn";
  var isMobile = window.innerWidth < 773;

  $(".header .nav").on("click", "li", function() {
    var $this = $(this);
    var block = $this.data("block");
    if (block == "cn" || block == "en") {
      i18n.lang = block;
      if (block == "en") {
        $this.data("block", "cn");
        $this.text("中文");
      } else {
        $this.data("block", "en");
        $this.text("ENGLISH");
      }
      switchLanguage(block);
      switchWhitePaper(block);
    } else {
      handleNav.call(this);
    }
  });
  function switchWhitePaper(block) {
    $("#download").attr(
      "href",
      {
        en: "./laplace_whitepaper_en_v5.3.pdf",
        cn: "./laplace_whitepaper_cn_v5.3.pdf"
      }[block]
    );
  }
  function switchLanguage(block) {
    $("[data-local]").each(function() {
      var $this = $(this);
      var lan = $this.data("local");
      $this.text(i18n[block][lan]);
    });
    var routeMapNodes = $(".t-node");
    var bConts = $(".b-cont h3");
    if (block === "en") {
      routeMapNodes.addClass("en-fix");
      bConts.addClass("en-fix");
    } else {
      routeMapNodes.removeClass("en-fix");
      bConts.removeClass("en-fix");
    }
    renderContentByi18n(block);
    renewCircle(i18n.lang);
  }

  function handleNav() {
    var block = $(this).data("block");
    $(window).scrollTop($("." + block).offset().top - 65);
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

  function getBlockConfig() {
    var config = {};
    $(".block").each(function() {
      config[$(this).data("block")] = {
        top: $(this).offset().top,
        height: $(this).outerHeight()
      };
    });
    return config;
  }
  var wh = $(window).height();

  function findInViewport(sh) {
    var dh,
      dah,
      store = [],
      hideStore = [];
    var config = getBlockConfig();
    for (var block in config) {
      if (config.hasOwnProperty(block)) {
        dh = config[block].top + config[block].height / 2;
        dah = config[block].top + config[block].height;
        if (dah - sh > 200 && dh < sh + wh) {
          //在市口
          store.push(block);
        } else {
          hideStore.push(block);
        }
      }
    }

    return {
      store: store,
      hideStore: hideStore
    };
  }

  function activeTab(key) {
    var tab = $(".header .nav li[data-block=" + key + "]");
    tab.addClass("textColor");
    tab.siblings("li").removeClass("textColor");
    if (key === "alloc") {
      renewCircle(i18n.lang);
    } else if (key == "main") {
    }
  }
  $(window)
    .scroll(function() {
      var sh = $(window).scrollTop();
      var blocks = findInViewport(sh);
      blocks.store.forEach(function(bk) {
        var $bk = $("." + bk);
        if (!$bk.hasClass("active")) {
          $bk.addClass("active");
          activeTab(bk);
        }
      });
      blocks.hideStore.forEach(function(bk) {
        var $bk = $("." + bk);
        if ($bk.hasClass("active")) {
          $bk.removeClass("active");
        }
      });
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
  renderContentByi18n(lang);
});
function renderContentByi18n(lang) {
  var langData = i18n[lang || "cn"];
  renderMembers(langData.members);
  renderQAs(langData["questions&answers"]);
}
function renderMembers(members) {
  if (!members || members.length === 0) {
    return;
  }
  function cell(data) {
    return [
      "<li>",
      '<div class="lpter-avatar">',
      '<img src="./img/' + data.avatar + '" alt="">',
      "</div>",
      '<div class="ava-name lh">',
      " <p>" + data.name + "</p>",
      data.ename ? "<span>" + data.ename + "</span>" : "",
      "</div>",
      '<div data-local="jrstit" class="ava-title">',
      data.title,
      "</div>",
      '<p data-local="jrsdesc" class="ava-desc">',
      data.desc.join("<br/>"),
      "</p>",
      "</li>"
    ].join("");
  }
  var i = 0;
  var len = members.length;
  var colNumber = 4;
  var res = [];
  var row = "";
  while (i < len) {
    row += cell(members[i]);
    if ((i + 1) % colNumber === 0) {
      res.push("<ul>" + row + "</ul>");
      row = "";
    }
    i++;
  }
  res.push("<ul>" + row + "</ul>");
  $(".lpt-info").html(res.join(""));
}
function renderQAs(qas) {
  if (!qas || qas.length === 0) {
    return;
  }
  var template = function(data) {
    return [
      '<div class="qa-row">',
      '<h4 data-local="qq1">' + data.q + "</h4>",
      '<p data-local="qa1">' + data.a.join("<br/>") + "</p>",
      "</div>"
    ].join("");
  };
  var res = [];
  for (var i = 0, len = qas.length; i < len; i++) {
    res.push(template(qas[i]));
  }
  $(".qa-cont").html(res.join(""));
}
