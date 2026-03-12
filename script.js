let docentes = JSON.parse(localStorage.getItem("docentes")) || [];

mostrarDocentes();

function guardarDocente(){

let tipoDoc = document.getElementById("tipoDoc").value;
let nombre = document.getElementById("nombre").value.trim();
let apellido = document.getElementById("apellido").value.trim();
let fecha = document.getElementById("fecha").value;
let nivel = document.getElementById("nivel").value;
let area = document.getElementById("area").value;
let grado = document.getElementById("grado").value;
let eps = document.getElementById("eps").value.trim();
let salario = document.getElementById("salario").value;

let editIndex = document.getElementById("editIndex").value;

if(!tipoDoc || !nombre || !apellido || !fecha || !nivel || !area || !grado || !eps || !salario){

alert("Todos los campos son obligatorios");

return;

}

let docente = {

tipoDoc,
nombre,
apellido,
fecha:formatearFecha(fecha),
nivel,
area,
grado,
eps,
salario

};

if(editIndex===""){

docentes.push(docente);

}else{

docentes[editIndex]=docente;

document.getElementById("editIndex").value="";

}

guardarLocalStorage();

limpiarFormulario();

mostrarDocentes();

}

function mostrarDocentes(lista=docentes){

let tabla=document.getElementById("tablaDocentes");

tabla.innerHTML="";

lista.forEach((docente,index)=>{

tabla.innerHTML+=`

<tr>

<td><span class="badge ${docente.tipoDoc.replace('.','').toLowerCase()}">${docente.tipoDoc}</span></td>

<td>${docente.nombre}</td>

<td>${docente.apellido}</td>

<td>${docente.fecha}</td>

<td>${docente.nivel}</td>

<td><span class="badge ${docente.area.toLowerCase()}">${docente.area}</span></td>

<td><span class="badge ${obtenerClaseSemestre(docente.grado)}">${docente.grado}</span></td>

<td>${docente.eps}</td>

<td class="salario">$ ${docente.salario}</td>
<td>

<button class="editar" onclick="editarDocente(${index})">Editar</button>

<button class="eliminar" onclick="eliminarDocente(${index})">Eliminar</button>

</td>

</tr>

`;

});

}

function editarDocente(index){

let docente=docentes[index];

document.getElementById("tipoDoc").value=docente.tipoDoc;
document.getElementById("nombre").value=docente.nombre;
document.getElementById("apellido").value=docente.apellido;
document.getElementById("nivel").value=docente.nivel;
document.getElementById("area").value=docente.area;
document.getElementById("grado").value=docente.grado;
document.getElementById("eps").value=docente.eps;
document.getElementById("salario").value=docente.salario;

document.getElementById("editIndex").value=index;

}

function eliminarDocente(index){

if(confirm("¿Eliminar este docente?")){

docentes.splice(index,1);

guardarLocalStorage();

mostrarDocentes();

}

}

function cancelarEdicion(){

document.getElementById("editIndex").value="";

limpiarFormulario();

}

function limpiarFormulario(){

document.getElementById("tipoDoc").value="";
document.getElementById("nombre").value="";
document.getElementById("apellido").value="";
document.getElementById("fecha").value="";
document.getElementById("nivel").value="";
document.getElementById("area").value="";
document.getElementById("grado").value="";
document.getElementById("eps").value="";
document.getElementById("salario").value="";

}

function guardarLocalStorage(){

localStorage.setItem("docentes",JSON.stringify(docentes));

}

function formatearFecha(fecha){

let partes=fecha.split("-");

return `${partes[2]}/${partes[1]}/${partes[0]}`;

}
function obtenerClaseSemestre(grado){

if(grado==="Primer Semestre") return "sem1";
if(grado==="Segundo Semestre") return "sem2";
if(grado==="Tercer Semestre") return "sem3";
if(grado==="Cuarto Semestre") return "sem4";

}

function filtrarDocentes(){

let texto=document.getElementById("busqueda").value.toLowerCase();

let filtrados=docentes.filter(docente=>

docente.nombre.toLowerCase().includes(texto) ||

docente.apellido.toLowerCase().includes(texto)

);

mostrarDocentes(filtrados);

}