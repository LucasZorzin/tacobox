const contenedorModal = $('.modal-contenedor')[0];
let check='';

$('#boton-carrito').click ( ()=> {
    contenedorModal.classList.toggle('modal-active');
    check='true';
    scrollCheck ();
})

$('#carritoCerrar').click ( ()=> {
    contenedorModal.classList.toggle('modal-active');
    check='false';
    scrollCheck ();
})

$('.modal-carrito').click ( (e)=>{
    e.stopPropagation();
})

$('.modal-contenedor').click ( ()=>{
    $('#carritoCerrar').trigger("click");
})


function scrollCheck (){
    if (check==='true') {
        //// Desactiva scroll:
        $('html, body').css({"overflow":"hidden"});
        // console.log("propiedad 'overflow: hidden' en la etiqueta <html> ACTIVADA");
    }
    else if (check==='false'){
        //// Activa scroll:
        $('html, body').css({"overflow":"auto"});
        // console.log("propiedad 'overflow: hidden' en la etiqueta <html> DESACTIVADA");
    }
}
