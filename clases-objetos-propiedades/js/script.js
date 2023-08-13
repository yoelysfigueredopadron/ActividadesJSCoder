class Cliente {
    static id = 0; // propiedad estática

    constructor(nombre, direccion) {
        this.id = ++Cliente.id; // asignamos la propiedades estática 'id' a la propiedad pública con el mismo nombre dentro del constructor de la clase cliente

        let email = ''; // propiedad privada

        // propiedades públicas
        this.nombre = nombre;
        this.direccion = direccion;

        // método público para acceder a la propiedad privada
        this.getEmail = function () {
            return email;
        };

        // método público para modificar la propiedad privada
        this.setEmail = function (nuevoEmail) {
            email = nuevoEmail;
        };
    }
}

// instanciamos(creamos) objetos de la clase Cliente
const cliente1 = new Cliente('Miguel', 'Av San Juan 3000');
const cliente2 = new Cliente('Pedro', 'Av San Carlos 150');
const cliente3 = new Cliente('Maria', 'Av Caseros 2255');

// Acceso a las propiedades públicas del objeto cliente1
console.log(cliente1.nombre); // Salida: Miguel
console.log(cliente1.direccion); // Salida: Av San Juan 3000

console.log(cliente1.email); // Salida: undefined (la propiedad privada no es accesible directamente)

console.log(cliente1.getEmail()); // Salida: ''(obtenemos una cadena vacia, utilizando el método público para acceder a la propiedad privada)

cliente1.setEmail('cliente1@gmail.com'); // Llamada al método público para modificar la propiedad privada
console.log(cliente1.getEmail()); // Salida: 'cliente1@gmail.com'

// Agregando propiedades de forma dinámica con el operador de punto o los corchetes
cliente1.telefono = '22334567';
cliente1['Activo'] = true;

// Cada cliente tiene un id unico que fue incrementando su valor con el uso de la propieda estática
console.log(cliente1)
console.log(cliente2);
console.log(cliente3);
