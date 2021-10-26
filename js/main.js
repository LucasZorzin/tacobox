//// CARRITO
let carritoDeCompras = [];

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const URLJSON = "./src/data/stock.json";

mostrarProductos();
obtenerLocalStorage();

function mostrarProductos() {
    $('#contenedor-productos').append = '';
    // contenedorProductos.innerHTML = '';

    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let misProductos = respuesta;
            for (const producto of misProductos) {
                let div = document.createElement('div');
                div.classList.add('col-lg-4', 'contenedor', 'pt-3');
                div.innerHTML += `  <figure>
                                    <img class="img-fluid w-90 overlayinn" src="${producto.img}" alt="${producto.nombre} - Tacobox" />
                                    <div class="texto-encima">${producto.nombre} - $${producto.precio}</div>
                                    <div class="capa">
                                        <h2 class="text-white center-text pt-4 text-uppercase">${producto.nombre}</h2>
                                        <p class="pt-2"> ${producto.desc}</p>
                                        <a id="id-${producto.id}">
                                            <button class="btn btn-primary--style">AÑADIR AL CARRITO</button>
                                        </a>
                                    </div>
                            </figure>
                        `
                // contenedorProductos.appendChild(div);
                $('#contenedor-productos').append(div);

                let boton = document.getElementById(`id-${producto.id}`)

                $(document).ready(function () {
                    $(boton).click(function () {
                        agregarAlCarrito(producto.id);
                        toastr["success"](" ", `${producto.nombre} añadido al carrito!`);
                    })

                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "1500",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                })
            }
        }
    })
}

function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(prodR => prodR.id == id);
    if (repetido) {
        repetido.cantidad = repetido.cantidad + 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cantidad: ${repetido.cantidad}</p>`
        actualizarCarrito()
    }
    else {
        $.getJSON(URLJSON, function (respuesta, estado) {
            if (estado === "success") {
                let misProductos = respuesta;
                let productoAgregar = misProductos.find(prod => prod.id == id)
                console.log(productoAgregar);
                carritoDeCompras.push(productoAgregar);
                productoAgregar.cantidad = 1;

                actualizarCarrito()

                let div = document.createElement('div')
                div.classList.add('productoEnCarrito', 'row')
                div.innerHTML = `
                        <div class="col-3 z-index-3">
                        <p>${productoAgregar.nombre}</p>
                        </div>
                        <div class="col-3 z-index-3">
                            <p>Precio U: $${productoAgregar.precio}</p>
                        </div>
                        <div class="col-3 z-index-3">
                            <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                        </div>
                        <button id="botonAdd${productoAgregar.id}" class="col-1 boton-eliminar">+</button>
                        <button id="botonSubtract${productoAgregar.id}" class="col-1 boton-eliminar">-</button>
                        <button id="eliminar${productoAgregar.id}" class="col-1 boton-eliminar"><i class="icon-trash"></i></button>
                        `
                contenedorCarrito.appendChild(div)

                //Borrar
                let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
                botonEliminar.addEventListener('click', () => {
                    botonEliminar.parentElement.remove()
                    carritoDeCompras = carritoDeCompras.filter(prodE => prodE.id != productoAgregar.id)
                    actualizarCarrito()
                    toastr["warning"](" ", "Eliminado correctamente!");
                })

                //+
                let botonAdd = document.getElementById(`botonAdd${productoAgregar.id}`)
                $(botonAdd).click(() => {
                    agregarAlCarrito(productoAgregar.id);
                    console.log(productoAgregar);
                    toastr["success"](" ", `${productoAgregar.nombre} añadido al carrito!`);
                })

                //-
                let botonSubtract = document.getElementById(`botonSubtract${productoAgregar.id}`)

                $(botonSubtract).click(() => {
                    restarDelCarrito(productoAgregar.id)
                })


            }
        });
    }
}

function restarDelCarrito(id) {
    let repetido = carritoDeCompras.find(prodR => prodR.id == id);

    if (repetido.cantidad > 1) {
        repetido.cantidad = repetido.cantidad - 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cantidad: ${repetido.cantidad}</p>`;
        actualizarCarrito();
    }
    else {
        repetido.cantidad = 0;
        $.getJSON(URLJSON, function (respuesta, estado) {
            if (estado === "success") {
                let misProductos = respuesta;
                let productoAgregar = misProductos.find(prod => prod.id == id)
                let botonSubtract = document.getElementById(`botonSubtract${productoAgregar.id}`)
                botonSubtract.parentElement.remove()
                carritoDeCompras = carritoDeCompras.filter(prodE => prodE.id != productoAgregar.id)
                actualizarCarrito();
                toastr["warning"](" ", "Eliminado correctamente!");
            }
        })
    }
}

function actualizarCarrito() {
    var contador = contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
    if (contador != 0) {
        $(".cart-btn").css({ "display": "initial" });
    }
    else {
        $(".cart-btn").css({ "display": "none" });
    }
    guardarLocalStorage();
}

function guardarLocalStorage() {
    localStorage.setItem("Carrito", JSON.stringify(carritoDeCompras))
}

function obtenerLocalStorage() {
    let carritoActualizado = JSON.parse(localStorage.getItem("Carrito"));

    if (carritoActualizado) {
        carritoActualizado.forEach(el => {
            carritoDeCompras.push(el)
            actualizarCarrito()

            let div = document.createElement("div");
            div.classList.add('productoEnCarrito', 'row');
            div.innerHTML += `
                                <div class="col-3 z-index-3">
                                <p>${el.nombre}</p>
                                </div>
                                <div class="col-3 z-index-3">
                                    <p>Precio U: $${el.precio}</p>
                                </div>
                                <div class="col-3 z-index-3">
                                    <p id="cantidad${el.id}">Cantidad: ${el.cantidad}</p>
                                </div>
                                <button id="botonAdd${el.id}" class="col-1 boton-eliminar">+</button>
                                <button id="botonSubtract${el.id}" class="col-1 boton-eliminar">-</button>
                                <button id="eliminar${el.id}" class="col-1 boton-eliminar"><i class="icon-trash"></i></button>
                            `

            contenedorCarrito.appendChild(div);

            // Borrar
            let botonEliminar = document.getElementById(`eliminar${el.id}`);
            botonEliminar.addEventListener("click", () => {
                botonEliminar.parentElement.remove();
                carritoDeCompras = carritoDeCompras.filter(prodEliminado => prodEliminado.id != el.id);
                actualizarCarrito();
                toastr["warning"](" ", "Eliminado correctamente!");
            })

            //+
            let botonAdd = document.getElementById(`botonAdd${el.id}`)
            $(botonAdd).click(() => {
                agregarAlCarrito(el.id);
                console.log(el);
                toastr["success"](" ", `${el.nombre} añadido al carrito!`);
            })

            //-
            let botonSubtract = document.getElementById(`botonSubtract${el.id}`)

            $(botonSubtract).click(() => {
                restarDelCarrito(el.id)
            })

        });
    }
}


//// MODAL CARRITO
const contenedorModal = $('.modal-contenedor')[0];
let check = '';

$('#boton-carrito').click(() => {
    contenedorModal.classList.toggle('modal-active');
    check = 'true';
    scrollCheck();
})

$('#carritoCerrar').click(() => {
    contenedorModal.classList.toggle('modal-active');
    check = 'false';
    scrollCheck();
});

$('.modal-carrito').click((e) => {
    e.stopPropagation();
})

$('.modal-contenedor').click(() => {
    $('#carritoCerrar').trigger("click");
})


function scrollCheck() {
    if (check === 'true') {
        //// Desactiva scroll:
        $('html, body').css({ "overflow": "hidden" });
    }
    else if (check === 'false') {
        //// Activa scroll:
        $('html, body').css({ "overflow": "auto" });
    }
}

// Botón Vaciar Carrito
$('#empty-cart-btn').click(() => {
    $('.productoEnCarrito').remove();
    carritoDeCompras = [];
    actualizarCarrito();
    toastr["success"](" ", "Carrito Vacio!");
})


//// MODAL CHECKOUT
const contenedorModal2 = $('.modal-contenedor2')[0];

$('#checkout-btn').click(() => {
    contenedorModal.classList.toggle('modal-active'); //Cierra el modal anterior
    contenedorModal2.classList.toggle('modal-active2');
    check = 'true';
    scrollCheck();
})

$('#carritoCerrar2').click(() => {
    contenedorModal2.classList.toggle('modal-active2');
    check = 'false';
    scrollCheck();
});

$('.modal-carrito2').click((e) => {
    e.stopPropagation();
})

$('.modal-contenedor2').click(() => {
    $('#carritoCerrar2').trigger("click");
})

function finalizarCompra() {
    window.addEventListener('load', function () {

        var forms = document.getElementsByClassName('needs-validation');

        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log(carritoDeCompras);
                    $('.productoEnCarrito').remove();
                    carritoDeCompras = [];
                    actualizarCarrito();
                    contenedorModal2.classList.toggle('modal-active2');
                    toastr["success"](" Muchas gracias! ", "Compra realizada con éxito!");
                    setTimeout(() => { location.reload() }, 2000);
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
}

finalizarCompra();