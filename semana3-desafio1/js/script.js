let totalGeneral = 0,
    contadorProductos = 0,
    listadoProductos = '\nListado de productos:';

function solicitarDatosUsuario() {
    let nombre = prompt('Ingrese su nombre:');
    let apellido = prompt('Ingrese su apellido');
    let genero = prompt('Ingrese una "F" para femenino, "M" para masculino o un "X" para otros').toLowerCase();
    let mensaje;

    let nombreCompleto = nombre + ' ' + apellido;

    switch (genero) {
        case 'f':
            mensaje = 'Bienvenida ' + nombreCompleto + '!';
            break;
        case 'm':
            mensaje = 'Bienvenido ' + nombreCompleto + '!';
            break;
        case 'x':
            mensaje = 'Bienvenid@ ' + nombreCompleto + '!';
            break;
        default:
            alert('No ha introducido un genero válido, en la próxima ocasión vuelva a intentarlo');
            break;
    }

    alert(mensaje);
}

function agregarProductos() {
    let confirmacion = confirm('Desea agregar un producto a su carrito de compras?');

    while (confirmacion) {
        introducirDatosProducto();

        confirmacion = confirm('¿Desea agregar un producto a su carrito de compras?');
    }

    if (contadorProductos > 0) {
        mostrarInfo();
    }
}

function introducirDatosProducto() {
    let nombre, precio, cantidad, total;

    nombre = prompt('Ingrese nombre del producto:');
    precio = parseFloat(prompt('Ingrese precio del producto:'));
    cantidad = parseInt(prompt('Ingrese cantidad del producto:'));
    total = calcularTotal(precio, cantidad);
    contadorProductos++;

    console.log({ nombre, precio, cantidad, total });
    listadoProductos += '\nProducto' + contadorProductos + ' | Nombre: ' + nombre + ' | Precio: ' + precio + ' | Cantidad: ' + cantidad + ' | total: $' + total;
}

function calcularTotal(precio, cantidad) {
    let total = precio * cantidad;
    totalGeneral += total;

    return total;
}

function mostrarInfo() {
    listadoProductos += '\n\nEl total a pagar de todos los productos es de $' + totalGeneral;
    alert(listadoProductos);
    console.log(listadoProductos);
}

solicitarDatosUsuario();
agregarProductos();
