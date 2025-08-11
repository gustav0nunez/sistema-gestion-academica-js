const arrUsuarios = [
  { id:1, usuario: "admin", contraseña:"Admin123!", rol: "admin", idDocente: null },
  { id:2, usuario: "docente1", contraseña:"Docente123!", rol: "docente", idDocente: 1 },
  { id:3, usuario: "docente2", contraseña:"Docente123!", rol: "docente", idDocente: 2 },
  { id:4, usuario: "docente3", contraseña:"Docente123!", rol: "docente", idDocente: 3 }
    ]

const arrDocentes = [
  { id: 1, nombre: "Fernando", apellido: "Almada", email: "jorgealmada1@gmail.com", telefono: "09187526894", documento:"548752869"},
  { id: 2, nombre: "Ana", apellido: "Pérez", email: "anaperez@gmail.com", telefono: "0912345678", documento:"123456789"},
  { id: 3, nombre: "Luis", apellido: "Gómez", email: "luisgomez@gmail.com", telefono: "0919876543", documento:"987654321"}
];  

const arrCursos = [
  { id: 1, nombre: "Programacion 1"},
  { id: 2, nombre: "Pensamiento Computacional"},
  { id: 3, nombre: "Ingles"}
];

const arrEstudiantes = [
  { id: 1, nombre: "Carlos", apellido: "Gómez", email: "carlos.gomez@gmail.com",telefono: "0912345678", documento:"123456789"},
  { id: 2, nombre: "María", apellido: "Pérez", email: "maria.perez@gmail.com"  ,telefono: "0916545468", documento:"123456789"},
  { id: 3, nombre: "Pedro", apellido: "López", email: "pedro.lopez@gmail.com"  ,telefono: "0916215678", documento:"123456789"},
  { id: 4, nombre: "Ana", apellido: "Martínez", email: "ana.martinez@gmail.com"  ,telefono: "09123443678", documento:"123456789"},
  { id: 5, nombre: "Lucía", apellido: "Fernández", email: "lucia.fernandez@gmail.com"  ,telefono: "0912875678", documento:"123456789"},
  { id: 6, nombre: "Miguel", apellido: "Sánchez", email: "miguel.sanchez@gmail.com"  ,telefono: "0956345678", documento:"123456789"},
  { id: 7, nombre: "Laura", apellido: "García", email: "laura.garcia@gmail.com"  ,telefono: "0912545678", documento:"123456789"},
  { id: 8, nombre: "David", apellido: "Ramírez", email: "david.ramirez@gmail.com"  ,telefono: "0912345678", documento:"123456789"},
  { id: 9, nombre: "Sofía", apellido: "Torres", email: "sofia.torres@gmail.com"  ,telefono: "0912301678", documento:"123456789"},
  { id: 10, nombre: "Andrés", apellido: "Hernández", email: "andres.hernandez@gmail.com"  ,telefono: "0912745678", documento:"123456789"},
  { id: 11, nombre: "Valentina", apellido: "Morales", email: "valentina.morales@gmail.com"  ,telefono: "0912349878", documento:"123456789"},    
  { id: 12, nombre: "Diego", apellido: "Castro", email: "diego.castro@gmail.com"  ,telefono: "0912345678", documento:"123456789"},
  { id: 13, nombre: "Camila", apellido: "Rojas", email: "camila.rojas@gmail.com"  ,telefono: "0912363678", documento:"123456789"},
  { id: 14, nombre: "Gabriel", apellido: "Vargas", email: "gabriel.vargas@gmail.com"  ,telefono: "0912328678", documento:"123456789"},
  { id: 15, nombre: "Isabella", apellido: "Cordero", email: "isabella.cordero@gmail.com"  ,telefono: "0912492678", documento:"123456789"}
];


const arrDictados = [
  {id: 1, idCurso: 1, idDocente: 1, fechaInicio: "2025-03-01", fechaFin: "2025-06-30", fechaFinReal: "2025-06-19", 
    alumnos: [
  { id: 1, fecha: "2024-06-02" },
  { id: 3, fecha: "2024-06-02" }
]}
];
let proximoIdDictado = 2;


const arrClases=[];
let proximoIdClase = 1; 



