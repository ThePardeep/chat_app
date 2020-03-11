import $ from "jquery";

const Width = $(window).width();

const Script = () => {
  const LGHeader = width => {
    if (width < 768) {
      if ($(".LgHeader").css("display") === "block") {
        $(".LgHeader").css({ display: "none" });
      }
    } else {
      $(".LgHeader").css({ display: "inline-block" });
    }
  };

  //Tabs Toggle

  $(".tab-btn-1").bind("click", () => {
    const checkClass = $(".tab-btn-2").hasClass("active-tab");
    if (checkClass) {
      $(".tab-btn-2").removeClass("active-tab");
      $(".tab-btn-1").addClass("active-tab");
    }
  });

  $(".tab-btn-2").bind("click", () => {
    const checkClass = $(".tab-btn-1").hasClass("active-tab");
    if (checkClass) {
      $(".tab-btn-1").removeClass("active-tab");
      $(".tab-btn-2").addClass("active-tab");
    }
  });

  $(window).bind("resize", function() {
    const Width = $(window).width();
    LGHeader(Width);
  });

  //Default Calls

  LGHeader(Width);
};

export default Script;
