$(document).ready(function () {
  let turnstileEl = $('.turnstile');
  turnstileEl.on('click', animateClickTurnstile);

  let collapseBtn = $('.collapseBtn');
  collapseBtn.on('click', animateClickCollapse);

  let headerSwitch = $('#header-switch');
  let footerSwitch = $('#footer-switch');

  headerSwitch.on('click', toggleAll);
  footerSwitch.on('click', toggleAll);

  let stickyDiv = $('#sticky-note');
  
  stickyDiv.resizable({
    containment: "parent",
    minWidth: 220,
    minHeight: 160
  });

  stickyDiv.draggable({
    containment: "parent",
  });
  
  stickyDiv.on("drag", function(event,ui){
    let position = $('#sticky-note').position();
    localStorage.setItem("sticky-position", JSON.stringify(position));
  });
  stickyDiv.on("resize", function(event, ui){
    let width = $('#sticky-note').width();
    let height = $('#sticky-note').height();
    let stickySize = [width, height];
    localStorage.setItem("sticky-size", JSON.stringify(stickySize));
  });

  let saveStickyBtn = $('#save-sticky');
  let savedSticky = localStorage.getItem("sticky") || "";
  $('#sticky').text(savedSticky);

  let savedStickySize = JSON.parse(localStorage.getItem("sticky-size"));
  if(savedStickySize !== null ){
    stickyDiv.width(savedStickySize[0]);
    stickyDiv.height(savedStickySize[1]);
  };

  let savedStickyPosition = JSON.parse(localStorage.getItem("sticky-position"));
  if(savedStickyPosition !== null){
    stickyDiv.css("top", savedStickyPosition.top);
    stickyDiv.css("left", savedStickyPosition.left);
  }

  saveStickyBtn.on('click', saveSticky);
});

const saveSticky = () => {
  let text = $('#sticky').val();
  localStorage.setItem("sticky", text);
  $('.sticky-label').text("Sticky - Saved to Local Storage");
  setTimeout(() => {
    $('.sticky-label').text("Sticky");
  }, 1000);
};


let toggle = false;
const toggleAll = function () {
  if (!toggle) {
    $('.turnstile').each(function () {
          $(this).parent().css("animation", "collapse 0.35s ease-out both");
          $(this).parent().width(32);
          $(this).css("animation", "turn-down 0.3s ease-out both");
          $(this).siblings('.collapseBtn').css("visibility", "hidden");
          $(this).next().css("visibility", "hidden");
          $(this).parent().css("overflow", "hidden");
          $(this).parent().css("box-shadow", "2px 0px 5px 0px rgba(78, 78, 78, 0.75");
    });
    toggle = true;
  } else {
    $('.turnstile').each(function () {
        $(this).parent().css("animation", "expand 0.35s ease-out both");
        $(this).parent().width(300);
        $(this).css("animation", "turn-up 0.3s ease-out both");
        $(this).next().css("visibility", "visible");
        $(this).parent().css("overflow", "scroll");
        $(this).siblings('.collapseBtn').css("visibility", "visible");
        $(this).parent().css("box-shadow", "none")
   });
   toggle = false;
  }
};

function animateClickCollapse() {
  let parentWidth = $(this).parent().width();
  if (parentWidth > 100) {
    $(this).parent().css("animation", "collapse 0.35s ease-out both");
    $(this).parent().width(32);
    $(this).siblings('.turnstile').css("animation", "turn-down 0.3s ease-out both");
    $(this).css("visibility", "hidden");
    $(this).prev().css("visibility", "hidden");
    $(this).parent().css("overflow", "hidden");
    $(this).parent().css("box-shadow", "2px 0px 5px 0px rgba(78, 78, 78, 0.75");
  }
}

function animateClickTurnstile() {
  let parentWidth = $(this).parent().width();
  if (parentWidth > 100) {
    $(this).parent().css("animation", "collapse 0.35s ease-out both");
    $(this).parent().width(32);
    $(this).css("animation", "turn-down 0.3s ease-out both");
    $(this).siblings('.collapseBtn').css("visibility", "hidden");
    $(this).next().css("visibility", "hidden");
    $(this).parent().css("overflow", "hidden");
    $(this).parent().css("box-shadow", "2px 0px 5px 0px rgba(78, 78, 78, 0.75");
  } else
  if (parentWidth <= 100) {
    $(this).parent().css("animation", "expand 0.35s ease-out both");
    $(this).parent().width(300);
    $(this).css("animation", "turn-up 0.3s ease-out both");
    $(this).next().css("visibility", "visible");
    $(this).parent().css("overflow", "scroll");
    $(this).siblings('.collapseBtn').css("visibility", "visible");
    $(this).parent().css("box-shadow", "none")
  }
}