$(document).ready(function () {
  let turnstileEl = $('.turnstile');
  turnstileEl.on('click', animateClickTurnstile);

  let collapseBtn = $('.collapseBtn');
  collapseBtn.on('click', animateClickCollapse);

  let headerSwitch = $('#header-switch');
  let footerSwitch = $('#footer-switch');

  headerSwitch.on('click', toggleAll);
  footerSwitch.on('click', toggleAll);

  getSavedSticky();

  $(window).resize(()=>getSavedSticky());
  
  $('#sticky-note').resizable({
    containment: "parent",
    minWidth: 220,
    minHeight: 160
  });

  $('#sticky-note').draggable({
    containment: "parent",
  });
  
  $('#sticky-note').on("drag", function(event,ui){
    let position = $('#sticky-note').position();
    localStorage.setItem("sticky-position", JSON.stringify(position));
  });
  $('#sticky-note').on("resize", function(event, ui){
    let width = $('#sticky-note').width();
    let height = $('#sticky-note').height();
    let stickySize = [width, height];
    localStorage.setItem("sticky-size", JSON.stringify(stickySize));
  });

  let saveStickyBtn = $('#save-sticky');
  saveStickyBtn.on('click', saveSticky);
});

const getSavedSticky = function(){
  let savedSticky = localStorage.getItem("sticky") || "";
  $('#sticky').text(savedSticky);

  let savedStickySize = JSON.parse(localStorage.getItem("sticky-size")) || [220, 160];
  if(savedStickySize[0]>$('.main-container').innerWidth()){
    $('#sticky-note').width($('.main-container').innerWidth()-42);
    $('#sticky-note').height(savedStickySize[1]);
  } else{
    $('#sticky-note').width(savedStickySize[0]);
    $('#sticky-note').height(savedStickySize[1]);
  };

  let savedStickyPosition = JSON.parse(localStorage.getItem("sticky-position")) || [42, 42];
  if(savedStickyPosition.left < 42 || savedStickyPosition.left > $('.main-container').innerWidth()){
    $('#sticky-note').css("top", savedStickyPosition.top);
    $('#sticky-note').css("left", 42); 
  } else {
    $('#sticky-note').css("top", savedStickyPosition.top);
    $('#sticky-note').css("left", savedStickyPosition.left);
  }
  // console.log($('.main-container').innerWidth());
  // console.log({"width": $('#sticky-note').width(), "height": $('#sticky-note').height(), "top": $('#sticky-note').css("top"), "left": $('#sticky-note').css("left")});
};

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
        $(this).parent().css("overflow", "auto");
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
    $(this).parent().css("overflow", "auto");
    $(this).siblings('.collapseBtn').css("visibility", "visible");
    $(this).parent().css("box-shadow", "none")
  }
}