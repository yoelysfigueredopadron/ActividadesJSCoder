class Producto {
    static id = 0;

    constructor(nombre, precio, cantidad) {
        this.id = ++Producto.id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal = 0;
    }

    subtotalPorProducto() {
        this.subtotal = this.cantidad * this.precio;
    }
}

function ingresarDatos() {
    let nombre, precio, cantidad;

    nombre = prompt('Ingrese nombre del producto');
    precio = Number(prompt('Ingrese precio del producto'));
    cantidad = Number(prompt('Ingrese cantidad del producto'));

    const producto = new Producto(nombre, precio, cantidad);
    producto.subtotalPorProducto();

    console.log(producto);
}

ingresarDatos();
