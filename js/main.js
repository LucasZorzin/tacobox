let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

mostrarProductos(stockProductos)

function mostrarProductos(array) {
    $('#contenedor-productos').append ='';
    // contenedorProductos.innerHTML = '';
    for (const producto of array) {
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

        // boton.addEventListener('click', ()=>{
        //     agregarAlCarrito(producto.id);
        // })

        $(document).ready(function () {
            $(boton).click(function () {
                agregarAlCarrito(producto.id);
                toastr["success"](" ", `${producto.nombre} añadido al carrito!`);
            });

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


function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(prodR => prodR.id == id);
    if (repetido) {
        repetido.cantidad = repetido.cantidad + 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cantidad: ${repetido.cantidad}</p>`
        actualizarCarrito()
    }
    else {
        let productoAgregar = stockProductos.find(prod => prod.id == id);
        console.log(productoAgregar);
        carritoDeCompras.push(productoAgregar);

        productoAgregar.cantidad = 1;
        actualizarCarrito()
        let div = document.createElement('div')
        div.classList.add('productoEnCarrito' , 'row')
        div.innerHTML = `
                        <div class="col-3 z-index-3">
                        <p>${productoAgregar.nombre}</p>
                        </div>
                        <div class="col-3 z-index-3">
                            <p>Precio: $${productoAgregar.precio}</p>
                        </div>
                        <div class="col-3 z-index-3">
                            <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                        </div>
                        <button id="eliminar${productoAgregar.id}" class="col-3 boton-eliminar"><i class="icon-trash"></i></button>
                        `
        contenedorCarrito.appendChild(div)

        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

        botonEliminar.addEventListener('click', () => {
            botonEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(prodE => prodE.id != productoAgregar.id)
            actualizarCarrito()
            toastr["warning"](" ", "Eliminado correctamente!");
        })
    }

}

function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
    guardarLocalStorage();
}

function guardarLocalStorage(){
    localStorage.setItem("carritoGuardado", JSON.stringify(carritoDeCompras))
}

function obtenerLocalStorage(){
    let carritoActualizado = JSON.parse(localStorage.getItem("carritoGuardado")); 

    if(carritoActualizado){
        carritoActualizado.forEach(el => {
            carritoDeCompras.push(el)
            actualizarCarrito()

            let div = document.createElement("div");
            div.classList.add('productoEnCarrito' , 'row');
            div.innerHTML += `
                                <div class="col-3 z-index-3">
                                <p>${el.nombre}</p>
                                </div>
                                <div class="col-3 z-index-3">
                                    <p>Precio: $${el.precio}</p>
                                </div>
                                <div class="col-3 z-index-3">
                                    <p id="cantidad${el.id}">Cantidad: ${el.cantidad}</p>
                                </div>
                                <button id="eliminar${el.id}" class="col-3 boton-eliminar"><i class="icon-trash"></i></button>
                            `
        
            contenedorCarrito.appendChild(div);
            
            let botonEliminar = document.getElementById (`eliminar${el.id}`);
        
            botonEliminar.addEventListener ("click", () => {
                botonEliminar.parentElement.remove();
                carritoDeCompras = carritoDeCompras.filter(prodEliminado => prodEliminado.id != el.id);
                actualizarCarrito();
                toastr["warning"](" ", "Eliminado correctamente!");
            })
        });
    }
}

obtenerLocalStorage();
