// Definición de usuarios registrados en formato JSON
 const jsonRegistrados = `[{
     "nombre": "juan",
     "apellidos": "garcía",
     "edad": 23,
     "sexo": "Masculino",
     "email": "juan.garcia@gmail.com",
     "contraseña": "abcde"},  
 {
     "nombre": "lucia",
     "apellidos": "martinez",
     "edad": 25,
     "sexo": "Femenino",
     "email": "lucia.martinez@gmail.com",
     "contraseña":"1234"
}]`

// // Parseo de la cadena JSON a un array de objetos de usuarios
const registrados = JSON.parse(jsonRegistrados);

// // Definición de la clase Registrado para representar a un usuario
 class Registrado {
     constructor(nombre, apellidos, edad, sexo, email, contraseña){
         this.nombre = nombre;
         this.apellidos = apellidos;
         this.edad = edad;
         this.sexo = sexo;
         this.email = email;
         this.contraseña = contraseña;
     }

}
// Creación de una colección de objetos 'Registrado' a partir del array de usuarios registrados
const collecion_registrados = registrados.map(usuario => 
    new Registrado (usuario.nombre, usuario.apellidos, usuario.edad, usuario.sexo, usuario.email, usuario.contraseña)); 


// // Función para filtrar usuarios de la colección según los valores del formulario
const filter_user_from_collection = function(){ 
    
    const nombre = document.querySelector('#nombre');
    const apellidos = document.querySelector('#apellidos');
    const edad = document.querySelector('#edad');
    const sexo = document.querySelector('#sexo');
    const email = document.querySelector('#email');
    const contraseña = document.querySelector('#contraseña');

    // collecion_registrados.forEach((user) => {
    //     console.log("nombre", nombre.value == user.nombre)
    //     console.log("apellidos", apellidos.value == user.apellidos)
    //     console.log("edad", edad.value == user.edad)
    //     console.log("sexo", sexo.value == user.sexo)
    //     console.log("email", email.value == user.email)
    //     console.log("contraseña", contraseña.value == user.contraseña)
    // })
    const resultado_filtrado = collecion_registrados.filter((user) => 
        
        nombre.value == user.nombre &&
        apellidos.value == user.apellidos && 
        edad.value == user.edad && 
        sexo.value == user.sexo && 
        email.value == user.email && 
        contraseña.value == user.contraseña
        
    );
    
    return resultado_filtrado; 
}


// Inicialización de la imagen y sus estilos
const initialize_img = function(){
    const form = document.forms[0];
    const span = form.querySelector('span.icon');
    const imagen = span.querySelector('img');
       
    imagen.src = 'imgs/error.png';
    imagen.alt = 'check-icon';
    imagen.id = 'img';

    imagen.style.width = '20px';
    imagen.style.height = '20px';
    imagen.style.display = 'none';

    span.appendChild(imagen);
}


// Función para comprobar si los campos del formulario están rellenos
const comprobarCamposRellenos = function(){
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const edad = document.getElementById('edad');
    const sexo = document.getElementById('sexo');
    const email = document.getElementById('email');
    const contraseña = document.getElementById('contraseña');

    let todosRellenos = true;

    if(contraseña.value == ''){
        mostrarErrorYEnfocarCampo(contraseña, 'La contraseña no esta introducida');
        todosRellenos = false;
    }
    if(email.value == ''){
        mostrarErrorYEnfocarCampo(email, 'El email no esta rellenado');
        todosRellenos = false;
    }
    if(sexo.value == ''){
        mostrarErrorYEnfocarCampo(sexo, 'El sexo no esta seleccionado.');
        todosRellenos = false;
    }
    if(edad.value == ''){
        mostrarErrorYEnfocarCampo(edad, 'La edad no esta rellenada.');
        todosRellenos = false;
    }
    if(apellidos.value == ''){
        mostrarErrorYEnfocarCampo(apellidos, 'El apellido no esta relleno.');
        todosRellenos = false;
    }
    if(nombre.value == ''){
        mostrarErrorYEnfocarCampo(nombre, 'El nombre no esta rellenado.');
        todosRellenos = false;
    }

    return todosRellenos;

}

const mostrarErrorYEnfocarCampo = function (campo, mensaje) {
    const error = document.getElementById('errorcase');
        error.textContent = mensaje;

        campo.focus();
 }

 // Función para borrar los campos del formulario 
const borrarCampos = function(){
    // Obtener referencias a los campos del formulario
    const clase = document.getElementsByClassName('controls');

    for(let i = 0; 1< clase.length; i++){
        clase[i].value = '';
    }

}

// Inicialización de la imagen
// Crear un elemento de imagen
// Llamar a la función para inicializar la imagen

// Función principal de validación
const validar = function() {
    
    if (comprobarCamposRellenos()) {
        const usuariosFiltrados = filter_user_from_collection();
        // window.alert(usuariosFiltrados.nombre);
        if(usuariosFiltrados.length === 0){
            mostrarImagen('./imgs/error.png');
            mostrarMensajeError('Usuario no registrado');

            setTimeout(function() {
                borrarCampos();
                ocultarImagen();
            },2000);
            
        }else{
            //window.alert("jgvhcgfghdufgdfgfgfdghdfgdfghdfghdfgdf")
            mostrarImagen('./imgs/success.png');
            mostrarMensajeExito('Usuario registrado correctamente');

            setTimeout(function() {
                window.location.href ='./src/dashboard.html';
            },3000);
        }
    };
}

const mostrarImagen = function(rutaImagen){
    const imagen = document.createElement('img');
    imagen.src = rutaImagen;
    imagen.style.width = '20px';
    imagen.style.height = '20px';

    const spanIcon = document.forms[0].querySelector('span.icon');

    spanIcon.innerHTML = '';

    spanIcon.appendChild(imagen);
}
const mostrarMensajeError = function(mensaje){
    const errorcase = document.getElementById('errorcase');
    errorcase.textContent = mensaje;
}
const mostrarMensajeExito = function(mensaje){
    const formulario = document.forms[0];
    const mensajeExito = document.createElement('p');
    mensajeExito.textContent = mensaje;

    formulario.appendChild(mensajeExito);
};
const ocultarImagen = function() {
    const spanIcon = document.forms[0].querySelector('span.icon');
    spanIcon.innerHTML = ''
}
// Cambio de color del botón al pasar el ratón por encima
const boton = document.querySelector('button');

boton.onmouseover = function(){
    boton.style.backgroundColor = '#056d28';
}

boton.onmouseout = function(){
    boton.style.backgroundColor= '#083eb2';
};

boton.addEventListener('click', validar);

// // Agregar un evento de ratón para el cambio de color al pasar por encima
// boton.addEventListener('mouseover', function() {
//   // Cambiar el color de fondo al pasar el ratón por encima
//   boton.style.backgroundColor = '#056d28'; // Puedes cambiar 'red' por el color que desees
// });

// // Agregar un evento de ratón para restaurar el color original al salir del botón
// boton.addEventListener('mouseout', function() {
//   // Restaurar el color de fondo al salir del ratón
//   boton.style.backgroundColor = '#083eb2'; // Deja esto en blanco para restaurar el color original
// });

// Devuelvo el color original al botón al quitar el ratón
// ...

// Validación al pulsar Enter y flechas arriba y abajo para cambiar de campo
document.querySelector('.form-register').addEventListener('keydown', function(event){
    if (event.code === "Enter"){
        validar();
        }
})
 const moverse = function(tecla){
    const inputsTexto = document.querySelectorAll('input[type="text"]');
    const inputActual = document.activeElement;
    const indiceActual = Array.from(inputsTexto).indexOf(inputActual);

    if(!inputActual){
        inputsTexto[0].focus();
        return;
    }

    let indiceSiguiente;
    if (tecla == 'ArrowDown') {
        indiceSiguiente = (indiceActual + 1) % inputsTexto.length;
    } else if(tecla == 'ArrowUp'){
        indiceSiguiente = (indiceActual - 1 + inputsTexto.length) % inputsTexto.length;
    }

    inputsTexto[indiceSiguiente].focus();
 };


// Cambio de color del borde de los campos del nombre y placeholder
// Cambio de color del borde de los campos de los apellidos y placeholder
// Cambio de color del borde de los campos de la edad y placeholder
// Cambio de color del borde de los campos del sexo y placeholder
// Cambio de color del borde de los campos del email y placeholder
// Cambio de color del borde de los campos de la contraseña y placeholder
function enfocarInput(input) {
    input.style.borderColor = '#083eb2'; // Cambiar el color del borde al enfocar
    input.placeholder = ''; // Ocultar el placeholder al enfocar
  }

  // Función para desenfocar la entrada de texto
  function desenfocarInput(input) {
    input.style.borderColor = '#1f53c5'; // Cambiar el color del borde al desenfocar
    input.placeholder = obtenerPlaceholder(input.id); // Restaurar el placeholder al desenfocar
  }

  // Función para obtener el placeholder correspondiente al ID del campo
  function obtenerPlaceholder(id) {
    switch (id) {
      case 'nombre':
        return 'Ingrese su Nombre';
      case 'apellidos':
        return 'Ingrese sus Apellidos';
      case 'edad':
        return 'Ingrese su Edad';
      case 'sexo':
        return '--Seleccione su Genero--';
      case 'email':
        return 'Ingrese su Email';
      case 'contraseña':
        return 'Introduce su Contraseña';
      default:
        return '';
    }
  }
