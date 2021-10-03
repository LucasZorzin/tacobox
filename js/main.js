let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const enJson="";

mostrarProductos(stockProductos)

function mostrarProductos(array) {
    contenedorProductos.innerHTML = '';
    for (const producto of array) {
        let div = document.createElement('div');
        div.classList.add('col-lg-4', 'contenedor', 'pt-3');
        div.innerHTML += `  <figure>
                                    <img class="img-fluid w-90 overlayinn" src="${producto.img}" alt="${producto.nombre} - Tacobox" />
                                    <div class="texto-encima">${producto.nombre} - $${producto.precio}</div>
                                    <div class="capa">
                                        <h2 class="text-white center-text pt-4 text-uppercase">${producto.nombre}</h2>
                                        <p class="pt-2"> ${producto.desc}</p>
                                        <a id="id-${producto.id}"">
                                            <button class="btn btn-primary--style">AÑADIR AL CARRITO</button>
                                        </a>
                                    </div>
                            </figure>
                        `
        contenedorProductos.appendChild(div);

        let boton = document.getElementById(`id-${producto.id}`)

        // boton.addEventListener('click', ()=>{
        //     agregarAlCarrito(producto.id);
        // })

        $(document).ready(function () {
            $(boton).click(function () {
                agregarAlCarrito(producto.id);
                toastr["success"](" ", "Producto añadido al carrito!");
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
                "timeOut": "5000",
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
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">cantidad: ${repetido.cantidad}</p>`
        actualizarCarrito()
    }
    else {
        let productoAgregar = stockProductos.find(prod => prod.id == id);
        console.log(productoAgregar);
        carritoDeCompras.push(productoAgregar);

        productoAgregar.cantidad = 1;
        actualizarCarrito()
        let div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `<p>${productoAgregar.nombre}</p>
                        <p>Precio: ${productoAgregar.precio}</p>
                        <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                        <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="icon-trash"></i></button>`
        contenedorCarrito.appendChild(div)

        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

        botonEliminar.addEventListener('click', () => {
            botonEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(prodE => prodE.id != productoAgregar.id)
            actualizarCarrito()
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

//Función para obtener del Local Storage el array formado en el carrito.
function obtenerLocalStorage(){
    let carritoActualizado = JSON.parse(localStorage.getItem("carritoGuardado")); 

    if(carritoActualizado){
        carritoActualizado.forEach(el => {
            carritoDeCompras.push(el)
            actualizarCarrito()

            let div = document.createElement("div");
            div.classList.add('productoEnCarrito');
            div.innerHTML += `<p>${el.nombre}</p>
            <p>Precio: ${el.precio}</p>
            <p id="cantidad${el.id}">Cantidad: ${el.cantidad}</p>
            <button id="eliminar${el.id}" class="boton-eliminar"><i class="icon-trash"></i></button>`
        
            contenedorCarrito.appendChild(div);
            
            let botonEliminar = document.getElementById (`eliminar${el.id}`);
        
            botonEliminar.addEventListener ("click", () => {
                botonEliminar.parentElement.remove();
                carritoDeCompras = carritoDeCompras.filter(prodEliminado => prodEliminado.id != el.id);
                actualizarCarrito();
                Toastify({
                    text: "Producto Eliminado",
                    backgroundColor: "red",
                    className: "info",
                  }).showToast();
            })
        });
    }
}

obtenerLocalStorage();
