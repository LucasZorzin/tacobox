// Initial Loader Animation

window.onload = () => {
    const contenedor = $("#loader")[0];
    contenedor.style.visibility = 'hidden';
}

$(document).ready(() => {
    $.fx.speeds.xslow = 2300;
    $("#body-animation").fadeIn("xslow");
})

//Section delivery-method on-click
$('#delivery-nav').click(() => {
    $('#delivery')[0].classList.toggle("titles-active");
    setTimeout(()=>{$('#delivery')[0].classList.toggle("titles-inactive");},1200);
    setTimeout(()=>{$('#delivery')[0].classList.toggle("titles-active");},1400); setTimeout(()=>{$('#delivery')[0].classList.toggle("titles-inactive");},1400);
})

$('#take-away-nav').click(() => {
    $('#take-away')[0].classList.toggle("titles-active");
    setTimeout(()=>{$('#take-away')[0].classList.toggle("titles-inactive");},1200);
    setTimeout(()=>{$('#take-away')[0].classList.toggle("titles-active");},1400); setTimeout(()=>{$('#take-away')[0].classList.toggle("titles-inactive");},1400);
})