const producto = {},
    productos = [];
let total = 0;

class Producto {
    static id = 0;

    constructor(objProducto) {
        this.id = ++Producto.id;
        this.nombre = objProducto.nombre;
        this.precio = objProducto.precio;
        this.cantidad = objProducto.cantidad;
        this.subtotal = 0;
    }

    subtotalPorProducto() {
        this.subtotal = this.cantidad * this.precio;
    }
}

const modificarCantidad = (masCantidad) => {
    let cantidad;

    if (masCantidad) {
        cantidad = Number(prompt('Ingrese la cantidad de productos que desea comprar'));

        while (cantidad <= 0 || isNaN(cantidad)) {
            alert('Error, debe ingresar un valor válido para cantidad de productos (1 o más) :');
            cantidad = Number(prompt('Ingrese la cantidad de productos que desea comprar'));
        }

        if (cantidad === 1) {
            alert(`Agrego solo ${cantidad} producto.`);
        } else {
            alert(`Agrego ${cantidad} productos.`);
        }
    } else {
        cantidad = 1;
    }

    return cantidad;
};

const validarNombreProducto = (nombre) => {
    nombre = prompt('Ingrese nombre del producto');

    while (nombre === null || nombre.trim() === '') {
        alert('Error, debe ingresar un nombre de producto');
        nombre = prompt('Ingrese nombre del producto');
    }

    return (nombre = nombre.toLowerCase());
};

const validarPrecioProducto = (precio) => {
    precio = Number(prompt('Ingrese precio del producto'));

    while (isNaN(precio) || precio <= 0) {
        alert('Error, debe ingresar un precio válido para el producto');
        precio = Number(prompt('Ingrese precio del producto'));
    }

    return precio;
};

const agregarPropiedades = (nombre, precio, cantidad) => {
    // agregamos las propiedades de forma dinámica
    producto.nombre = nombre;
    producto.precio = precio;
    producto.cantidad = cantidad;
};

const ingresarDatos = () => {
    let nombre, precio, cantidad, masCantidad;

    nombre = validarNombreProducto(nombre);
    console.log({ nombre });

    precio = validarPrecioProducto(precio);
    console.log({ precio });

    masCantidad = confirm('¿Desea agregar más de un producto?');
    console.log({ masCantidad });

    cantidad = modificarCantidad(masCantidad);
    console.log({ cantidad });

    agregarPropiedades(nombre, precio, cantidad);
    console.log(producto);

    productos.push(new Producto(producto));
    console.log(productos);
};

const iniciar = () => {
    let confirmacion = confirm('¿Desea comprar productos?');

    while (confirmacion) {
        ingresarDatos();
        confirmacion = confirm('¿Desea continuar comprando productos?');
    }

    // calculamos el subtotal por cada producto y el total a pagar
    for (const producto of productos) {
        producto.subtotalPorProducto();
        total += producto.subtotal;
    }

    console.log(productos);
    console.log(`El total de los productos a pagar es $${total}`);
    console.log('Muchas gracias por usar nuestra aplicación');
};

iniciar();
