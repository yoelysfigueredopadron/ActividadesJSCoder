const file = '../data/productos-cosmocurio.json';
const contenedorProductos = document.getElementById('container-products');
const modal = document.getElementById('ventana-modal');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total');
const btnCerrar = document.getElementsByClassName('close')[0];
const contenedorCarrito = document.querySelector('.modal-body');
const iconMenu = document.getElementById('icon-menu');
const contenedorProductosCarrito = document.querySelector('.contenedor-carrito');
const cantidadProductos = document.querySelector('.count-products');
const finalizarCompra = document.querySelector('#finalizar-compra');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const inputFiltrar = document.querySelector('#input-filtro');
const btnFiltro = document.querySelector('#filtro');
let carritoCompras = [];

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    width: 300,
    color: 'whitesmoke',
    timer: 1000,
    timerProgressBar: true,
});

class Producto {
    constructor(imagen, nombre, precio, id) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
        this.cantidad = 1;
        this.subtotal = 0;
    }

    obtenerTotal() {
        this.subtotal = this.precio * this.cantidad;
    }
}

cargarEventos();

function cargarEventos() {
    iconMenu.addEventListener('click', showMenu);

    document.addEventListener('DOMContentLoaded', () => {
        renderizarProductos();
        cargarCarritoLocalStorage();
        mostrarProductosCarrito();
    });

    contenedorProductos.addEventListener('click', agregarProducto);
    contenedorCarrito.addEventListener('click', eliminarProducto);
    finalizarCompra.addEventListener('click', compraFinalizada);
    vaciarCarrito.addEventListener('click', limpiarCarrito);
    btnFiltro.addEventListener('click', filtrarProductos);

    carrito.onclick = function () {
        modal.style.display = 'block';
    };

    btnCerrar.onclick = function () {
        ocultarModal();
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            ocultarModal();
        }
    };
}

function ocultarModal() {
    modal.style.display = 'none';
}

function cargarCarritoLocalStorage() {
    carritoCompras = JSON.parse(localStorage.getItem('productosLS')) || [];
}

function eliminarProducto(e) {
    if (e.target.classList.contains('eliminar-producto')) {
        const productoId = parseInt(e.target.getAttribute('id'));
        carritoCompras = carritoCompras.filter((producto) => producto.id !== productoId);
        guardarProductosLocalStorage();
        console.log(carritoCompras);
        mostrarProductosCarrito();
    }
}

function agregarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const productoAgregado = e.target.parentElement;
        leerDatosProducto(productoAgregado);
    }
}

function leerDatosProducto(producto) {
    let imagen, nombre, precio, id;

    imagen = producto.querySelector('img').src;
    nombre = producto.querySelector('h4').textContent;
    precio = Number(producto.querySelector('p').textContent.replace('$', ''));
    id = parseInt(producto.querySelector('a').getAttribute('id'));

    // creamos el objeto utilizando la clase Producto
    const datosProducto = new Producto(imagen, nombre, precio, id);
    datosProducto.obtenerTotal();

    agregarAlCarrito(datosProducto);
}

function agregarAlCarrito(productoAgregar) {
    const existeEnCarrito = carritoCompras.some((producto) => producto.id === productoAgregar.id);

    if (existeEnCarrito) {
        // Creamos un nuevo array con los productos del carrito actualizados
        const productos = carritoCompras.map((producto) => {
            if (producto.id === productoAgregar.id) {
                producto.cantidad++;
                producto.subtotal = producto.precio * producto.cantidad;

                // retornamos el objeto producto(cantidad y subtotal actualizados)
                return producto;
            } else {
                // retornamos el producto que estaba en el carrito sin actualizar ya que no coincide con el nuevo producto agregado
                return producto;
            }
        });

        carritoCompras = productos; // reasignamos con el array productos devuelto por el metodo map()
    } else {
        carritoCompras.push(productoAgregar); // agregamos el nuevo producto ya que no se encontraba dentro de carritoCompras
    }

    guardarProductosLocalStorage();
    console.log(carritoCompras);
    mostrarProductosCarrito();
}

function mostrarProductosCarrito() {
    limpiarHTML();

    carritoCompras.forEach((producto) => {
        const { imagen, nombre, precio, cantidad, subtotal, id } = producto;

        const div = document.createElement('div');
        div.classList.add('contenedor-producto');
        div.innerHTML = `
			<img src="${imagen}" width="100">
			<P>${nombre}</P>
			<P>$${precio}</P>
			<P>${cantidad}</P>
			<P>$${subtotal}</P>
			<a href="#" class="eliminar-producto" id="${id}"> X </a>
		`;

        contenedorCarrito.appendChild(div);
    });

    mostrarCantidadProductos();
    calcularTotal();
}

function mostrarCantidadProductos() {
    let contarProductos;

    if (carritoCompras.length > 0) {
        contenedorProductosCarrito.style.display = 'flex';
        contenedorProductosCarrito.style.alignItems = 'center';
        cantidadProductos.style.display = 'flex';
        contarProductos = carritoCompras.reduce((cantidad, producto) => cantidad + producto.cantidad, 0);
        cantidadProductos.innerText = `${contarProductos}`;
    } else {
        contenedorProductosCarrito.style.display = 'block';
        cantidadProductos.style.display = 'none';
    }
}

function calcularTotal() {
    let total = carritoCompras.reduce((sumaTotal, producto) => sumaTotal + producto.subtotal, 0);
    totalCarrito.innerHTML = `Total a Pagar: $ ${total}`;
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function guardarProductosLocalStorage() {
    localStorage.setItem('productosLS', JSON.stringify(carritoCompras));
}

async function renderizarProductos() {
    const productos = await realizarPeticion(file);
    recorrerArray(productos);
}

function showMenu() {
    let navbar = document.getElementById('barra-navegacion');

    if (navbar.className === 'barra-navegacion') {
        navbar.className += ' responsive';
    } else {
        navbar.className = 'barra-navegacion';
    }
}

async function realizarPeticion(datos) {
    try {
        const response = await fetch(datos);

        // Comprobar si la respuesta es exitosa (código de estado HTTP en el rango 200-299)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        // Si la respuesta es exitosa, obtener los datos en formato JSON
        const data = await response.json();

        // Devolver los datos obtenido
        return data;
    } catch (error) {
        // Capturar cualquier error ocurrido durante la petición o el procesamiento de los datos
        console.error(error);
    }
}

function compraFinalizada() {
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: '¡Su compra se realizo con exito!',
        timerProgressBar: true,
        timer: 5000,
    });

    eliminarCarritoLS();
    cargarCarritoLocalStorage();
    mostrarProductosCarrito();
    ocultarModal();
}

function eliminarCarritoLS() {
    localStorage.removeItem('productosLS');
}

function limpiarCarrito() {
    console.log('vaciando carrito');

    Swal.fire({
        title: 'Limpiar carrito',
        text: '¿Confirma que desea vaciar el carrito de compras?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then((btnResponse) => {
        if (btnResponse.isConfirmed) {
            Swal.fire({
                title: 'Vaciando Carrito',
                icon: 'success',
                text: 'Su carrito de compras fue vaciado con exito.',
                timerProgressBar: true,
                timer: 5000,
            });
            eliminarCarritoLS();
            cargarCarritoLocalStorage();
            mostrarProductosCarrito();
            ocultarModal();
        } else {
            Swal.fire({
                title: 'Operación cancelada',
                icon: 'info',
                text: 'La operación de vaciar el carrito de compras fue cancelada',
                timerProgressBar: true,
                timer: 5000,
            });
        }
    });
}

async function filtrarProductos() {
    const productos = await realizarPeticion(file);
    let productosFiltrados, filtro;

    filtro = inputFiltrar.value.toLowerCase();

    productosFiltrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(filtro));
    console.log(productosFiltrados);

    if (productosFiltrados.length > 0) {
        limpiarContenedorProductos();
        recorrerArray(productosFiltrados);
    } else {
        console.log('No se encontraron productos');
        Swal.fire({
            icon: 'error',
            title: 'Filtrando productos',
            text: '¡No se encontraron productos con el filtro especificado!',
            timerProgressBar: true,
            timer: 10000,
        });
        limpiarContenedorProductos();
        recorrerArray(productos);
    }
}

function limpiarContenedorProductos() {
    while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }
}

function recorrerArray(arregloProductos) {
    arregloProductos.forEach((producto) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML += `
			<img src="./img/${producto.img}" alt="${producto.nombre}" />
			<h4>${producto.nombre}</h4>
			<p>$${producto.precio}</p>
			<a id=${producto.id} class="boton agregar-carrito" href="#">Agregar</a>
        `;

        contenedorProductos.appendChild(divCard);
    });
}
