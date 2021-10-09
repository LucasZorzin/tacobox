const contenedorModal = $('.modal-contenedor')[0];
// const body= document.getElementById('page-top');

let check=''; //para consulta

$('#boton-carrito').click ( ()=> {
    contenedorModal.classList.toggle('modal-active');
    // body.classList.toggle('modal-open');
    check='true'; //para consulta
    classCheck ();
})

$('#carritoCerrar').click ( ()=> {
    contenedorModal.classList.toggle('modal-active');
    // body.classList.remove('modal-open');
    check='false'; //para consulta
    classCheck ();
})

$('.modal-carrito').click ( (e)=>{
    e.stopPropagation();
})

$('.modal-contenedor').click ( ()=>{
    $('#carritoCerrar').trigger("click");
})


//consulta
const htmlScroll= document.getElementsByTagName('html');
function classCheck (){
    if (check==='true') {
        //// Desactiva scroll:
        // htmlScroll.style.overflow = "hidden";
        console.log("propiedad 'overflow: hidden' en la etiqueta <html> ACTIVADA");
    }
    else if (check==='false'){
        //// Activa scroll:
        // htmlScroll.style.overflow = "auto";
        console.log("propiedad 'overflow: hidden' en la etiqueta <html> DESACTIVADA");
    }
}
