let clientes = [];
let creditos = [];

let listaContactos = [
    {nombre: "Addonys", numero: "0987575872"},
    {nombre: "Maria", numero: "0986565123"},
    {nombre: "Ana", numero: "0998787965"}
];

let tasaInteres = 15;
let montoMaximo = 10000;

let clienteSeleccionado = null;

let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;

let creditoAprobado = false;


// ==========================
// PARTE 1: NAVEGACIÓN
// ==========================

function ocultarSecciones(){

    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("credito").classList.remove("activa");
    document.getElementById("listaCreditos").classList.remove("activa");
    document.getElementById("contacto").classList.remove("activa");
    document.getElementById("acercaDe").classList.remove("activa");

}

function mostrarSeccion(id){

    ocultarSecciones();

    let seccion = document.getElementById(id);

    seccion.classList.add("activa");

    if(id === "contacto"){
        pintarContactos(listaContactos);
    }

}


// ==========================
// PARTE 2: CONFIGURAR TASA
// ==========================

function guardarTasa(){

    let cmpTasa = recuperarInt("tasaInteres");

    let cmpMontoMaximo = recuperarFloat("montoMaximo");

    if(cmpTasa >= 10 && cmpTasa <= 20){

        tasaInteres = cmpTasa;

        if(cmpMontoMaximo > 0){
            montoMaximo = cmpMontoMaximo;
        }

        mostrarTexto(
            "mensajeTasa",
            "Parámetros configurados correctamente"
        );

    }else{

        mostrarTexto(
            "mensajeTasa",
            "La tasa debe estar entre 10% y 20%"
        );

    }

}


// ==========================
// PARTE 3: CLIENTES
// ==========================

function guardarCliente(){

    let ced = recuperaraTexto("cedula");

    let nom = recuperaraTexto("nombre");

    let ape = recuperaraTexto("apellido");

    let telefono = recuperaraTexto("telefono");

    let email = recuperaraTexto("email");

    let ing = recuperarFloat("ingresos");

    let egr = recuperarFloat("egresos");


    let clienteExistente = buscarCliente(ced);


    if(clienteExistente == null){

        let nuevoCliente = {

            cedula: ced,
            nombre: nom,
            apellido: ape,
            telefono: telefono,
            email: email,
            ingresos: ing,
            egresos: egr

        };

        clientes.push(nuevoCliente);

    }else{

        clienteExistente.nombre = nom;
        clienteExistente.apellido = ape;
        clienteExistente.telefono = telefono;
        clienteExistente.email = email;
        clienteExistente.ingresos = ing;
        clienteExistente.egresos = egr;

    }

    pintarClientes();

    limpiar();

}


function pintarClientes(){

    let tabla = document.getElementById("tablaClientes");

    let contenidoHTML = "";

    for(let i = 0; i < clientes.length; i++){

        let c = clientes[i];

        contenidoHTML +=
        "<tr>" +

        "<td>" + c.cedula + "</td>" +
        "<td>" + c.nombre + "</td>" +
        "<td>" + c.apellido + "</td>" +
        "<td>" + c.telefono + "</td>" +
        "<td>" + c.email + "</td>" +
        "<td>" + c.ingresos + "</td>" +
        "<td>" + c.egresos + "</td>" +

        "<td>" +

        "<button onclick=\"seleccionarCliente('" + c.cedula + "')\">Actualizar</button>" +

        "<button onclick=\"eliminarCliente('" + c.cedula + "')\">Eliminar</button>" +

        "</td>" +

        "</tr>";

    }

    tabla.innerHTML = contenidoHTML;

}


function buscarCliente(cedula){

    for(let i = 0; i < clientes.length; i++){

        if(clientes[i].cedula === cedula){

            return clientes[i];

        }

    }

    return null;

}


function seleccionarCliente(cedula){

    let cliente = buscarCliente(cedula);

    if(cliente != null){

        clienteSeleccionado = cliente;

        mostrarTextoEnCaja("cedula", cliente.cedula);

        mostrarTextoEnCaja("nombre", cliente.nombre);

        mostrarTextoEnCaja("apellido", cliente.apellido);

        mostrarTextoEnCaja("telefono", cliente.telefono);

        mostrarTextoEnCaja("email", cliente.email);

        mostrarTextoEnCaja("ingresos", cliente.ingresos);

        mostrarTextoEnCaja("egresos", cliente.egresos);

    }

}


function limpiar(){

    mostrarTextoEnCaja("cedula", "");

    mostrarTextoEnCaja("nombre", "");

    mostrarTextoEnCaja("apellido", "");

    mostrarTextoEnCaja("telefono", "");

    mostrarTextoEnCaja("email", "");

    mostrarTextoEnCaja("ingresos", "");

    mostrarTextoEnCaja("egresos", "");

    clienteSeleccionado = null;

}


function eliminarCliente(cedula){

    for(let i = 0; i < clientes.length; i++){

        if(clientes[i].cedula === cedula){

            clientes.splice(i, 1);

            break;

        }

    }

    pintarClientes();

}


// ==========================
// PARTE 4: CRÉDITOS
// ==========================

function buscarClienteCredito(){

    let cedula = recuperaraTexto("buscarCedulaCredito");

    let cliente = buscarCliente(cedula);

    if(cliente != null){

        clienteSeleccionado = cliente;

        let texto =
        "Cédula: " + cliente.cedula + "<br>" +
        "Nombre: " + cliente.nombre + "<br>" +
        "Apellido: " + cliente.apellido + "<br>" +
        "Teléfono: " + cliente.telefono + "<br>" +
        "Ingresos: " + cliente.ingresos + "<br>" +
        "Egresos: " + cliente.egresos + "<br>" +
        "Email: " + cliente.email;

        document.getElementById(
            "datosClienteCredito"
        ).innerHTML = texto;

    }else{

        document.getElementById(
            "datosClienteCredito"
        ).innerHTML = "Cliente no encontrado";

    }

}


function calcularCredito(){

    if(clienteSeleccionado == null){

        mostrarTexto(
            "resultadoCredito",
            "Primero busque un cliente"
        );

        return;

    }

    let monto = recuperarFloat("montoCredito");

    if(monto > montoMaximo){

        mostrarTexto(
            "resultadoCredito",
            "El monto supera el monto máximo permitido"
        );

        mostrarTextoEnCaja("montoCredito", "");

        return;

    }

    let plazo = recuperarInt("plazoCredito");

    montoCalculado = monto;

    plazoCalculado = plazo;


    let capacidadPago =
    clienteSeleccionado.ingresos -
    clienteSeleccionado.egresos;


    let interes =
    monto * (tasaInteres / 100);


    let totalPagar =
    monto + interes;


    let cuota =
    totalPagar / plazo;


    cuotaCalculada = cuota;


    if(cuota <= capacidadPago){

        creditoAprobado = true;

    }else{

        creditoAprobado = false;

    }


    let texto =
    "RESULTADO CRÉDITO<br>" +

    "Capacidad de pago: " +
    capacidadPago + "<br>" +

    "Total a pagar: " +
    totalPagar + "<br>" +

    "Cuota mensual: " +
    cuota + "<br>" +

    "RESULTADO: " +

    (creditoAprobado
        ? "APROBADO"
        : "RECHAZADO");


    let resultado =
    document.getElementById("resultadoCredito");


    resultado.innerHTML = texto;


    if(creditoAprobado){

        resultado.className = "aprobado";

    }else{

        resultado.className = "rechazado";

    }


    document.getElementById(
        "btnAsignarCredito"
    ).disabled = !creditoAprobado;

}


function asignarCredito(){

    if(clienteSeleccionado == null){

        alert("Primero busque un cliente");

        return;

    }

    let credito = {

        cedula: clienteSeleccionado.cedula,

        nombre: clienteSeleccionado.nombre,

        apellido: clienteSeleccionado.apellido,

        telefono: clienteSeleccionado.telefono,

        email: clienteSeleccionado.email,

        monto: montoCalculado,

        tasa: tasaInteres,

        plazo: plazoCalculado,

        cuota: cuotaCalculada

    };

    creditos.push(credito);

    alert("Crédito asignado correctamente");

}


function buscarCreditos(cedula){

    let creditosEncontrados = [];

    for(let i = 0; i < creditos.length; i++){

        if(creditos[i].cedula === cedula){

            creditosEncontrados.push(creditos[i]);

        }

    }

    return creditosEncontrados;

}


function pintarCreditos(creditos){

    let tabla = document.getElementById("tablaCreditos");

    let contenido = "";

    for(let i = 0; i < creditos.length; i++){

        let c = creditos[i];

        contenido +=
        "<tr>" +

        "<td>" + c.cedula + "</td>" +
        "<td>" + c.nombre + "</td>" +
        "<td>" + c.apellido + "</td>" +
        "<td>" + c.telefono + "</td>" +
        "<td>" + c.email + "</td>" +
        "<td>" + c.monto + "</td>" +
        "<td>" + c.tasa + "%</td>" +
        "<td>" + c.plazo + "</td>" +
        "<td>" + c.cuota + "</td>" +

        "<td>" +

        "<button onclick=\"eliminarCreditos('" + c.cedula + "')\">Eliminar</button>" +

        "</td>" +

        "</tr>";

    }

    tabla.innerHTML = contenido;

}


function buscarCreditosCliente(){

    let cedula =
    recuperaraTexto("buscarCedulaListado");

    let creditosCliente =
    buscarCreditos(cedula);

    pintarCreditos(creditosCliente);

}


function eliminarCreditos(cedula){

    for(let i = creditos.length - 1; i >= 0; i--){

        if(creditos[i].cedula === cedula){

            creditos.splice(i, 1);

        }

    }

    pintarCreditos(creditos);

}


// ==========================
// CRÉDITOS VIP
// ==========================

function mostrarCreditosVIP(){

    let creditosVIP = [];

    for(let i = 0; i < creditos.length; i++){

        if(creditos[i].monto > 5000){

            creditosVIP.push(creditos[i]);

        }

    }

    pintarCreditos(creditosVIP);

}


// ==========================
// CONTACTOS
// ==========================

function pintarContactos(contactos){

    let tabla = document.getElementById("tablaContactos");

    let contenido = "";

    for(let i = 0; i < contactos.length; i++){

        let contacto = contactos[i];

        contenido +=
        "<tr>" +

        "<td>" + contacto.nombre + "</td>" +

        "<td>" + contacto.numero + "</td>" +

        "</tr>";

    }

    tabla.innerHTML = contenido;

}


function buscarContactos(filtro){

    let contactosEncontrados = [];

    for(let i = 0; i < listaContactos.length; i++){

        if(
            listaContactos[i].nombre
            .toLowerCase()
            .includes(filtro.toLowerCase())
        ){

            contactosEncontrados.push(
                listaContactos[i]
            );

        }

    }

    return contactosEncontrados;

}


function filtrarContactos(){

    let filtro =
    recuperaraTexto("filtroContactos");

    let contactosEncontrados =
    buscarContactos(filtro);

    pintarContactos(contactosEncontrados);

}