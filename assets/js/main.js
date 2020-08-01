$(document).ready(function() {
    const turnstileEl = $('.turnstile');
    turnstileEl.on('click', animateClickTurnstile);

    const projectEl = $('.project');
    projectEl.on('click', animateClickProject);

});

const animateClickProject = function(event) {
    // console.log($(this));
    const project = $(this).attr('data-product');
    // console.log(project);
    $(this).parents('.wrapper').css("animation", "collapse 0.35s ease-out both");
    $(this).parents('.wrapper').width(32);
    $(this).parents('.content').siblings('.turnstile').css("animation", "turn-down 0.3s ease-out both");
    $(this).parents('.content').siblings('.turnstile').css("cursor", "pointer");
    $(this).parents('.content').css("display", "none");
    // $(this).parents('.wrapper').css("overflow", "hidden");
    $(this).parents('.wrapper').css("border-left", "1px solid #b6b6b6");
    $(this).parents('.wrapper').css("border-right", "1px solid #b6b6b6");

    displayProject(project);
}

const clearProjects = function() {
    $('.product-card').css("display", "none");
}

const displayProject = function(id) {
    let project = $(`#${id}`);
    // console.log(project);
    setTimeout(function(){
        project.css("display", "flex");
    }, 300);
}


const animateClickTurnstile = function() {
    const $this = $(this);
    $(this).parent().css("animation", "expand 0.35s ease-out both");
    $(this).parent().width(300);
    $(this).css("animation", "turn-up 0.3s ease-out both");
    $(this).css("cursor", "default");
    // $(this).parent().css("overflow", "auto");
    $(this).parent().css("border", "none");
    setTimeout(function() {
        $this.next().css("display", "block");
    }, 200);
    clearProjects();

}
