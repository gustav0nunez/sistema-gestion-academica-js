// Funciones para el ingreso de usuario y autenticación.
let usuarioAutenticado = null;
let idDelDocenteLogueado = null;

function login() {
  let nUsu = document.getElementById("txtNomUsu").value;
  let pass = document.getElementById("txtCont").value;
  let usuario = buscarUsuario(nUsu, pass);
  if (usuario != null) {
    usuarioAutenticado = usuario;
    document.getElementById("login").classList.remove("mostrar");
    document.getElementById("datosUsuario").innerHTML =
      "Usuario ingresado: " +
      usuarioAutenticado.usuario +
      ' <button onclick="cerrarSesion()">Cerrar Sesión</button>';
    if (usuario.rol === "docente") {
      idDelDocenteLogueado = usuario.idDocente;
      configurarParaRolDocente();
    } else if (usuario.rol === "admin") {
      configurarParaRolAdmin();
    }
  } else {
    document.getElementById("mensaje").innerText = "Nombre o clave incorrecta";
  }
}

function configurarParaRolAdmin() {
  ocultarSecciones(); 
  document.getElementById("seccion-admin").classList.add("mostrar");
}

function buscarUsuario(nombreUsuario, clave) {
  for (let i = 0; i < arrUsuarios.length; i++) {
    if (
      arrUsuarios[i].usuario === nombreUsuario &&
      arrUsuarios[i].contraseña === clave
    ) {
      return arrUsuarios[i];
    }
  }
  return null;
}

function inicializar() {
  // Listeners generales
  document.getElementById("btnLogin").addEventListener("click", login);

  // Listeners de admin
  document.getElementById("btnAltaDictado").addEventListener("click", mostrarAltaDictado);
  document.getElementById("btnListarDictados").addEventListener("click", mostrarListaDictados);
  document.getElementById("btnAsignarAlumno").addEventListener("click", mostrarAsignarAlumno);
  document.getElementById("frmModificarDictado").addEventListener("submit", function(e) {
    e.preventDefault();
    guardarModificacionDictado();
  });

  // Listeners de docente
  document.getElementById("btnRegistrarClase").addEventListener("click", mostrarRegistrarClase);
  document.getElementById("btnListarClases").addEventListener("click", mostrarClasesListadas)
  document.getElementById("selDictadoDocente").addEventListener("change", cargarAlumnosEnTabla)
}

function ocultarBarraMenu() {
  const menuAdmin = document.getElementById("seccion-admin");
  const menuDocente = document.getElementById("seccion-docente");
  if (menuAdmin) menuAdmin.classList.remove("mostrar");
  if (menuDocente) menuDocente.classList.remove("mostrar");
}

function ocultarSecciones() {
  const todasLasSecciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < todasLasSecciones.length; i++) {
    todasLasSecciones[i].classList.remove("mostrar");
  }
}

function cerrarSesion() {
  ocultarSecciones();
  ocultarBarraMenu();
  document.getElementById("login").classList.add("mostrar");
  document.getElementById("datosUsuario").innerHTML = "";
  document.getElementById("txtNomUsu").value = "";
  document.getElementById("txtCont").value = "";
}

// Funciones para la seccion de administrador

function ocultarSeccionesAdmin() {
  let secciones = document.querySelectorAll("#seccion-admin .seccion.mostrar");
  for (let elemento of secciones) {
    elemento.classList.remove("mostrar");
  }
}

function mostrarAltaDictado() {
  ocultarSeccionesAdmin();
  document.getElementById("alta-dictado").classList.add("mostrar");
  cargarCursosAltaDictado();
  cargarDocentesAltaDictado();
}

function mostrarListaDictados() {
  ocultarSeccionesAdmin();
  document.getElementById("listar-dictados").classList.add("mostrar");
}

function mostrarAsignarAlumno() {
  ocultarSeccionesAdmin();
  document.getElementById("asignar-alumno").classList.add("mostrar");
  cargarDictadosAsignar();
  cargarAlumnosAsignar();
}

function agregarDictado() {
  let idCurso = document.getElementById("cursoAltDic").value;
  let idDocente = Number(document.getElementById("selDocAltDic").value);
  let fechaInicio = document.getElementById("imFechaIniAltaDic").value;
  let fechaFin = document.getElementById("imFechaFinAltaDic").value;
  let fechaFinReal = document.getElementById("imFechaFinRealAltaDic").value;

  if (idCurso && idDocente && fechaInicio && fechaFin) {
    let nuevoDictado = {
      id: proximoIdDictado,
      idCurso: idCurso,
      idDocente: idDocente,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      fechaFinReal: fechaFinReal,
    };
    proximoIdDictado++;
    arrDictados.push(nuevoDictado);
    alert("Dictado agregado exitosamente.");

    document.getElementById("cursoAltDic").value = "";
    document.getElementById("selDocAltDic").value = "";
    document.getElementById("imFechaIniAltaDic").value = "";
    document.getElementById("imFechaFinAltaDic").value = "";
    document.getElementById("imFechaFinRealAltaDic").value = "";
  } else {
    alert("Por favor, complete todos los campos.");
  }
}

function cargarCursosAltaDictado() {
  let select = document.getElementById("cursoAltDic");
  select.innerHTML = "<option value=''>Seleccione un curso</option>";
  for (let curso of arrCursos) {
    select.innerHTML += `<option value="${curso.id}">${curso.nombre}</option>`;
  }
}

function cargarDocentesAltaDictado() {
  let select = document.getElementById("selDocAltDic");
  select.innerHTML = "<option value=''>Seleccione un docente</option>";
  for (let docente of arrDocentes) {
    select.innerHTML += `<option value="${docente.id}">${docente.nombre} ${docente.apellido}</option>`;
  }
}

function listarDictados() {
  let tabla =
    "<table border='1'><tr><th>ID</th><th>Curso</th><th>Docente</th><th>Fecha Inicio</th><th>Fecha Fin Prevista</th><th>Fecha Fin Real</th></tr>";

  for (let i = 0; i < arrDictados.length; i++) {
    let dictado = arrDictados[i];
    let fila = `<tr>
    <td>${dictado.id}</td>
    <td>${
      arrCursos.find((c) => c.id == dictado.idCurso)?.nombre || "Desconocido"
    }</td>
    <td>${(() => {
      let docente = arrDocentes.find((d) => d.id == dictado.idDocente);
      return docente ? docente.nombre + " " + docente.apellido : "Desconocido";
    })()}</td>
    <td>${dictado.fechaInicio}</td>
    <td>${dictado.fechaFin}</td>
    <td>${dictado.fechaFinReal}</td>
    <td>
                            <button onclick="modificarDictado('${
                              dictado.id
                            }')">EDITAR</button> 
                            <button onclick="eliminarDictado('${
                              dictado.id
                            }')">ELIMINAR</button>
                        </td>
</tr>`;
    tabla += fila;
  }
  tabla += "</table>";
  document.getElementById("tabla-listado-dictados").innerHTML = tabla;
}

function mostrarListaDictados() {
  ocultarSeccionesAdmin();
  document.getElementById("listar-dictados").classList.add("mostrar");
  listarDictados();
}

function modificarDictado(id) {
  mostrarModificarDictado();
  let dictado = buscarDictadoPorId(Number(id));
  if (dictado) {
    document.getElementById("selModDic").value = dictado.id;
    document.getElementById("SelcursoModDic").value = dictado.idCurso;
    document.getElementById("selDocModDic").value = dictado.idDocente;
    document.getElementById("inFechaIniModDic").value = dictado.fechaInicio;
    document.getElementById("inFechaFinModDic").value = dictado.fechaFin;
    document.getElementById("inFechaFinRealModDic").value = dictado.fechaFinReal;
  } else {
    document.getElementById("SelcursoModDic").value = "";
    document.getElementById("selDocModDic").value = "";
    document.getElementById("inFechaIniModDic").value = "";
    document.getElementById("inFechaFinModDic").value = "";
    document.getElementById("inFechaFinRealModDic").value = "";
  }
}

function guardarModificacionDictado() {
  let idDictado = document.getElementById("selModDic").value;
  let idCurso = document.getElementById("SelcursoModDic").value;
  let idDocente = document.getElementById("selDocModDic").value;
  let fechaInicio = document.getElementById("inFechaIniModDic").value;
  let fechaFin = document.getElementById("inFechaFinModDic").value;
  let fechaFinReal = document.getElementById("inFechaFinRealModDic").value;

  if (idDictado && idCurso && idDocente && fechaInicio && fechaFin && fechaFinReal) {
    let dictado = buscarDictadoPorId(Number(idDictado));
    if (dictado) {
      dictado.idCurso = idCurso;
      dictado.idDocente = idDocente;
      dictado.fechaInicio = fechaInicio;
      dictado.fechaFin = fechaFin;
      dictado.fechaFinReal = fechaFinReal;
      alert("Dictado modificado exitosamente.");
    }
  } else {
    alert("Por favor complete todos los datos.");
  }
}

function mostrarModificarDictado() {
  ocultarSeccionesAdmin();
  document.getElementById("divModificarDictado").classList.add("mostrar");
  cargarModificarDictado();
  cargarCursosModificarDictado();
  cargarDocentesModificarDictado();
}

function cargarModificarDictado() {
  let selectModDic = document.getElementById("selModDic");
  selectModDic.innerHTML = "<option value=''>Seleccione un dictado</option>";
  for (let dictado of arrDictados) {
    let curso = arrCursos.find((c) => c.id == dictado.idCurso);
    let nombreCurso = curso ? curso.nombre : "Curso desconocido";
    selModDic.innerHTML += `<option value="${dictado.id}">${nombreCurso} (${dictado.fechaInicio} a ${dictado.fechaFin})</option>`;
  }
}

function cargarCursosModificarDictado() {
  let selectCurso = document.getElementById("SelcursoModDic");
  selectCurso.innerHTML = "<option value=''>Seleccione un curso</option>";
  for (let curso of arrCursos) {
    selectCurso.innerHTML += `<option value="${curso.id}">${curso.nombre}</option>`;
  }
}

function cargarDocentesModificarDictado() {
  let selectDoc = document.getElementById("selDocModDic");
  selectDoc.innerHTML = "<option value=''>Seleccione un docente</option>";
  for (let docente of arrDocentes) {
    selectDoc.innerHTML += `<option value="${docente.id}">${docente.nombre} ${docente.apellido}</option>`;
  }
}

function eliminarDictado(id) {
  let resultado = confirm(
    "¿Está seguro de que desea eliminar este dictado " + id + " ?"
  );
  if (resultado) { 
    for (let i = 0; i < arrDictados.length; i++) {
      let dictado = arrDictados[i];
      if (dictado.id == id) { 
        arrDictados.splice(i, 1);
        alert("Dictado eliminado exitosamente.");
        mostrarListaDictados();
        break;
      }
    }
  }
}


function agregarAlumno() {
  let idDictado = document.getElementById("dictadoAsigAlu").value;
  let idAlumno = Number(document.getElementById("selAluAsigAlu").value);
  let fecha = document.getElementById("fechaAsigAlu").value;

  if (idDictado && idAlumno && fecha) {
    let dictado = buscarDictadoPorId(Number(idDictado));
    if (dictado) {
      if (!dictado.alumnos) {
        dictado.alumnos = [];
      }

      if (dictado){
        if (!dictado.alumnos){
          dictado.alumnos = [];
        }
      }


      let yaAsignado = dictado.alumnos.some(a => a.id == idAlumno);
      if (yaAsignado) {
        alert("Ese alumno ya está asignado a este dictado.");
        return;
      }

      dictado.alumnos.push({ id: idAlumno, fecha: fecha });
      alert("Alumno asignado exitosamente.");

      document.getElementById("selAluAsigAlu").value = "";
      document.getElementById("fechaAsigAlu").value = "";
    }
  } else {
    alert("Por favor complete todos los datos.");
  }
}

function cargarDictadosAsignar() {
  let selectDic = document.getElementById("dictadoAsigAlu");
  selectDic.innerHTML = "<option value=''>Seleccione un dictado</option>";
  for (let dictado of arrDictados) {
    let curso = arrCursos.find(c => c.id == dictado.idCurso);
    let nombreCurso = curso ? curso.nombre : "Curso desconocido";
    selectDic.innerHTML += `<option value="${dictado.id}">${nombreCurso} (${dictado.fechaInicio})</option>`;
  }
}


function cargarAlumnosAsignar() {
  let selectAlu = document.getElementById("selAluAsigAlu");
  selectAlu.innerHTML = "<option value=''>Seleccione un alumno</option>";
  for (let estudiante of arrEstudiantes) {
    selectAlu.innerHTML += `<option value="${estudiante.id}">${estudiante.nombre} ${estudiante.apellido}</option>`;
  }
}

// Funciones de busqueda

function buscarDictadoPorId(id) {
  for (let i = 0; i < arrDictados.length; i++) {
    let dictado = arrDictados[i];
    if (dictado.id === id) {
      return dictado;
    }
  }
  return null;
}




///////////////////////////////////////////////////////////////////////////////////////////

// DOCENTE

//////////////////////////////////////////////////////////////////////////////////////////


// Funciones para la seccion de docente

function configurarParaRolDocente() {
    ocultarSecciones();
    document.getElementById("seccion-docente").classList.add("mostrar");
}

function btnRegistrarClase() {
  let idDictado = document.getElementById("selDictadoDocente").value;
  let fecha = document.getElementById("fechaClase").value;
  let detalle = document.getElementById("detalleRegClase").value;

  if (idDictado && fecha && detalle) {
    console.log("Clase registrada:", { idDictado, fecha, detalle });
  } else {
    alert("Por favor complete todos los campos.");
  }     
}

///////////// Funciones para Mostrar o Ocultar /////////////////////////////

function mostrarRegistrarClase() {
  ocultarSeccionesDocente();
  document.getElementById("registrar-clase").classList.add("mostrar");
  cargarDictadosRegClase();
}

function mostrarClasesListadas() {
  ocultarSeccionesDocente();
  document.getElementById("clases-listadas").classList.add("mostrar");
}

function ocultarSeccionesDocente() {
  let secciones = document.querySelectorAll(
    "#seccion-docente .seccion.mostrar");
  for (let elemento of secciones) {
    elemento.classList.remove("mostrar");
  }
} 

///////////////////////////////////// Funciones de carga ///////////////////////////////////////

function cargarDictadosRegClase(){
  let selectSelDic = document.getElementById("selDictadoDocente");
  selectSelDic.innerHTML = "<option value=''>Seleccione un dictado</option>";
  for (let dictado of arrDictados) {
    if (Number(dictado.idDocente) === idDelDocenteLogueado) {
      let curso = arrCursos.find(c => c.id == dictado.idCurso);
      let nombreDeCurso = curso ? curso.nombre : "Curso desconocido";
      selectSelDic.innerHTML += `<option value="${dictado.id}">${nombreDeCurso} (${dictado.fechaInicio})</option>`;
    }
  }
}

function cargarAlumnosEnTabla(){
  let idDictado = Number(document.getElementById("selDictadoDocente").value);
  let dictado = buscarDictadoPorId(idDictado);
  let tabla = document.getElementById("tablaAsistencia");
  tabla.innerHTML = "";

  if (dictado && dictado.alumnos) {
    for (let asignado of dictado.alumnos){
      let estudiante = arrEstudiantes.find (e => e.id == asignado.id);
      if (estudiante){
        let fila = `
  <tr>
    <td>${estudiante.nombre} ${estudiante.apellido}</td>
    <td>
      <select id="asis_${estudiante.id}">
        <option value="Asistió">Asistió</option>
        <option value="No Asistió">No asistió</option>
        <option value="Falta con aviso">Falta con aviso</option>
      </select>
    </td>
  </tr>
        `;
        tabla.innerHTML += fila;
      }
    }

  }
}

//////////////////////////// funciones de la seccion de registro de clases /////////////////////////////////

function registrarClase(){
  const idDictado = Number(document.getElementById("selDictadoDocente").value);
  const fecha = document.getElementById("fechaClase").value;
  const detalle = document.getElementById("detalleRegClase").value;

  if (!idDictado || !fecha || detalle.trim() === ""){
    alert("Faltan datos a completar");
    return;
  }
const dictado = buscarDictadoPorId(idDictado);

  if (!dictado || !dictado.alumnos || dictado.alumnos.length === 0) {
    alert("No hay alumnos asignados a este dictado.");
    return;
  }



  let asistencias = [];

for (let estudiante of dictado.alumnos) {
  const select = document.getElementById(`asis_${estudiante.id}`);
  const estado = select.value;
  asistencias.push({ idAlumno: Number(estudiante.id), estado: estado });
}

    const nuevaClase = {
      id: proximoIdClase++,
      idDictado: idDictado,
      fecha: fecha,
      detalle: detalle,
      asistencias: asistencias
    };

    arrClases.push(nuevaClase);
    alert("Se registro la clase correctamente.");

    document.getElementById("selDictadoDocente").value = "";
    document.getElementById("fechaClase").value = "";
    document.getElementById("detalleRegClase").value = "";
    document.getElementById("tablaAsistencia").innerHTML = "";
}

/////////////////////////////// funciones para la seccion de listar clases /////////////////////////////////

function mostrarSeccionListadoClases(){
  ocultarSeccionesDocente();
  document.getElementById("clases-listadas").classList.add("mostrar");
  mostrarListadoClases();
}

function mostrarListadoClases(){
  const contenedor = document.getElementById("tabla-listado-clases");
  contenedor.innerHTML="";

  const clasesDelDocente = arrClases.filter(clase => {
    const dictado = arrDictados.find(d => d.id === clase.idDictado);
    return dictado && dictado.idDocente === idDelDocenteLogueado;
  });

  if (clasesDelDocente.length === 0) {
    contenedor.innerHTML = "<p>No se registraron clases aún.</p>";
    return;
  }

  let tabla = "<h4>Clases Dictadas</h4>";
  tabla += "<table border='1'>";
  tabla += "<tr style='background:#ccc'><th>ID</th><th>FECHA</th><th>ID DICTADO</th><th>CURSO</th><th></th></tr>";

  for (let clase of clasesDelDocente) {
    const dictado = arrDictados.find(d => d.id === clase.idDictado); 
    const curso = arrCursos.find(c => c.id === Number(dictado.idCurso)); 

    tabla += `
      <tr>
        <td>${clase.id}</td>
        <td>${clase.fecha}</td>
        <td>${clase.idDictado}</td>
        <td>${curso ? curso.nombre : "Desconocido"}</td>
        <td><a href="#" onclick="verDetalleClase(${clase.id})">[ver]</a></td>
      </tr>
    `;
  }

  tabla += "</table>";
  contenedor.innerHTML = tabla;
}

function volverAlListado() {
  ocultarSeccionesDocente();
  document.getElementById("clases-listadas").classList.add("mostrar");
}

function verDetalleClase(idClse){
  const clase = arrClases.find (c => c.id === idClse);

  if (!clase) {
    alert ("clase no encontrada");
    return;
  }

document.getElementById("detalleFechaClase").innerText = "Fecha: " + clase.fecha;
document.getElementById("detalleComentarioClase").innerText = "Detalle: " + clase.detalle;


let textoAsistencias = "Asistencias:\n";
  if (clase.asistencias && clase.asistencias.length > 0) {
    for (let asistencia of clase.asistencias) {
      const estudiante = arrEstudiantes.find(e => e.id == asistencia.idAlumno);
      let nombre = estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : "Desconocido";
      textoAsistencias += `• ${nombre} - ${asistencia.estado}\n`;
    }
  } else {
    textoAsistencias = "No se registraron asistencias.";
  }

  document.getElementById("detalleAsistenciaClase").innerText = textoAsistencias;


ocultarSeccionesDocente();
document.getElementById("detalleDeClase").classList.add("mostrar");
}





window.onload = inicializar
