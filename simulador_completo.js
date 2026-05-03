
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
// PARTE 1: NAVEGACIÓN 

function ocultarSecciones() {
    // Quitamos la clase "activa" a las secciones identificadas en el HTML
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("parametros").classList.remove("activa");
}

function mostrarSeccion(id) {
    ocultarSecciones();
    // Agregamos la clase "activa" solo a la sección indicada
    let seccion = document.getElementById(id);
    seccion.classList.add("activa");
}

// PARTE 2: CONFIGURAR TASA 

function guardarTasa() {
    let cmpTasa = recuperarInt("tasaInteres"); // Uso de utilitario
    
    // Validación entre 10 y 20 
    if (cmpTasa >= 10 && cmpTasa <= 20) {
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + cmpTasa + "%");
        tasaInteres = cmpTasa;
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
    }
}

// PARTE 3: ADMINISTRACIÓN DE CLIENTES 

function guardarCliente() {
    // 1. Obtener datos usando de utilitarios
    let ced = recuperaraTexto("cedula");
    let nom = recuperaraTexto("nombre");
    let ape = recuperaraTexto("apellido");
    let ing = recuperarFloat("ingresos");
    let egr = recuperarFloat("egresos");

    // 2. Verificar si el cliente ya existe para decidir si Crear o Actualizar
    let clienteExistente = buscarCliente(ced);

    if (clienteExistente == null) {
        // Crear nuevo objeto cliente y agregarlo al arreglo
        let nuevoCliente = {
            cedula: ced,
            nombre: nom,
            apellido: ape,
            ingresos: ing,
            egresos: egr
        };
        clientes.push(nuevoCliente);
    } else {
        // Actualizar datos del cliente 
        clienteExistente.nombre = nom;
        clienteExistente.apellido = ape;
        clienteExistente.ingresos = ing;
        clienteExistente.egresos = egr;
    }

    // 3. Refrescar la tabla y limpiar campos
    pintarClientes();
    limpiar();
}

function pintarClientes() {
    let tabla = document.getElementById("tablaClientes");
    let contenidoHTML = ""; // Variable para acumular las filas <tr>

    for (let i = 0; i < clientes.length; i++) {
        let c = clientes[i];
        // Generación dinámica de filas con botones de acción
        contenidoHTML += "<tr>" +
            "<td>" + c.cedula + "</td>" +
            "<td>" + c.nombre + "</td>" +
            "<td>" + c.apellido + "</td>" +
            "<td>" + c.ingresos + "</td>" +
            "<td>" + c.egresos + "</td>" +
            "<td>" +
                
                "<button onclick=\"seleccionarCliente('" + c.cedula + "')\">Actualizar</button>" +
                "<button onclick=\"eliminarCliente('" + c.cedula + "')\">Eliminar</button>"
            "</td>" +
        "</tr>";
    }
    tabla.innerHTML = contenidoHTML;
}

function buscarCliente(cedula) {

    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cedula == cedula) {
            return clientes[i]; // Retorna el objeto si lo encuentra
        }
    }
    return null; // Retorna null si no existe
}

function seleccionarCliente(cedula) {
    let cliente = buscarCliente(cedula);
    if (cliente != null) {
        clienteSeleccionado = cliente;
        // Cargar los datos en los inputs para editar usando utilitarios
        mostrarTextoEnCaja("cedula", cliente.cedula);
        mostrarTextoEnCaja("nombre", cliente.nombre);
        mostrarTextoEnCaja("apellido", cliente.apellido);
        mostrarTextoEnCaja("ingresos", cliente.ingresos);
        mostrarTextoEnCaja("egresos", cliente.egresos);
    }
}

function limpiar() {
    // Vaciar todos los inputs 
    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellido", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");
    clienteSeleccionado = null;
}

function eliminarCliente(cedula) {

    for (let i = 0; i < clientes.length; i++) {

        if (clientes[i].cedula == cedula) {
            clientes.splice(i, 1); // elimina del arreglo
            break;
        }
    }

    pintarClientes(); // refresca tabla
}