$(document).ready(function () {
  // $('.wrapper').resizable({
  //   handles: 'e',
  //   minWidth: 32
  // });

  // let wrapper = $('.wrapper');
  // wrapper.on('resize', animateResizeCollapse);

  let turnstileEl = $('.turnstile');
  turnstileEl.on('click', animateClickTurnstile);

  let collapseBtn = $('.collapseBtn');
  collapseBtn.on('click', animateClickCollapse);

  let headerSwitch = $('#header-switch');
  let footerSwitch = $('#footer-switch');

  headerSwitch.on('click', toggleAll);
  footerSwitch.on('click', toggleAll);

  // let scrollContainer = $('.collapse-container');
  // scrollContainer.on('scroll', () => {
  //   let xScroll = scrollContainer.scrollLeft();
  //   // console.log(xScroll);
  //   animateScrollCollapse(xScroll);
  // })
});

var toggleAll = function () {
  // console.log('toggle')
  $('.turnstile').each(function () {
    let parentWidth = $(this).parent().width();
    if (parentWidth > 100) {
      $(this).parent().css("animation", "collapse 0.35s ease-out both");
      $(this).parent().width(32);
      $(this).css("animation", "turn-down 0.3s ease-out both");
      $(this).siblings('.collapseBtn').css("visibility", "hidden");
      $(this).next().css("visibility", "hidden");
      $(this).parent().css("overflow", "hidden");
      $(this).parent().css("box-shadow", "2px 0px 5px 0px rgba(78, 78, 78, 0.75");
    } else if (parentWidth <= 100) {
      $(this).parent().css("animation", "expand 0.35s ease-out both");
      $(this).parent().width(300);
      $(this).css("animation", "turn-up 0.3s ease-out both");
      $(this).next().css("visibility", "visible");
      $(this).parent().css("overflow", "scroll");
      $(this).siblings('.collapseBtn').css("visibility", "visible");
      $(this).parent().css("box-shadow", "none")
    }
  })
}


// function animateResizeCollapse() {
//   let divWidth = $(this).width();
//   if (divWidth <= 100) {
//     $(this).children('.turnstile').css("animation", "turn-down 0.3s ease-out both");
//     $(this).children('.content').css("visibility", "hidden");
//     $(this).css("overflow", "hidden");
//   };
//   if (divWidth > 100) {
//     $(this).children('.turnstile').css("animation-name", "turn-up");
//     $(this).children('.content').css("visibility", "visible");
//     $(this).css("overflow", "scroll");
//   };
// }





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
  } else if (parentWidth <= 100) {
    $(this).parent().css("animation", "expand 0.35s ease-out both");
    $(this).parent().width(300);
    $(this).css("animation", "turn-up 0.3s ease-out both");
    $(this).next().css("visibility", "visible");
    $(this).parent().css("overflow", "scroll");
    $(this).siblings('.collapseBtn').css("visibility", "visible");
    $(this).parent().css("box-shadow", "none")
  }
}

// function animateScrollCollapse(x) {
//   const first = $('.list-container .wrapper:nth-child(1)');
//   const second = $('.list-container .wrapper:nth-child(2)');
//   if (x > 0) {
//     first.css("animation", "collapse 0.35s ease-out both");
//     first.width(32);
//     first.children('.turnstile').css("animation", "turn-down 0.3s ease-out both");
//     first.children('.content').css("visibility", "hidden");
//     first.css("overflow", "hidden");
//     second.css("animation", "collapse 0.35s ease-out both");
//     second.width(32);
//     second.children('.turnstile').css("animation", "turn-down 0.3s ease-out both");
//     second.children('.content').css("visibility", "hidden");
//     second.css("overflow", "hidden");
//   }
// if (x > 32) {
//   second.css("animation", "collapse 0.35s ease-out both");
//   second.width(32);
//   second.children('.turnstile').css("animation", "turn-down 0.3s ease-out both");
//   second.children('.content').css("visibility", "hidden");
//   second.css("overflow", "hidden");
// }
// }