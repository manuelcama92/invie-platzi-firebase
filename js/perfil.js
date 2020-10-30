//var refTest = firebase.database().ref("test");
var ref = firebase.database().ref("usuario");

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

var datosPerfil = document.getElementById("datosPerfil");
var formularioPerfil = document.getElementById("formularioPerfil");
var perfilNombre = document.getElementById("perfilNombre");
var perfilEmail = document.getElementById("perfilEmail");
var perfilTelefono = document.getElementById("perfilTelefono");
var perfilDireccion = document.getElementById("perfilDireccion");

var cancelForm = document.getElementById("cancelForm");

var nombreForm = document.getElementById("nombreForm");
var emailForm = document.getElementById("emailForm");
var telefonoForm = document.getElementById("telefonoForm");
var calleForm = document.getElementById("calleForm");
var interirorForm = document.getElementById("interirorForm");
var coloniaForm = document.getElementById("coloniaForm");
var cpForm = document.getElementById("cpForm");


var btnEditar = document.getElementById("perfilEditar");

var usuario = {}


function leerInformacion(uid){
  ref.child(uid).on('value', function(data){
    var dat= data.val();
    llenarInformacion(dat.nombre, dat.email, dat.telefono, dat.direccion);
  })
}


function llenarInformacion(nombre, email, telefono, direccion ){
  console.log(nombre, email); 
  perfilNombre.innerHTML= nombre;
  perfilEmail.innerHTML = email;
  if(telefono){
    perfilTelefono.innerHTML =  telefono; 
  }
  if(direccion){
    perfilDireccion.innerHTML = direccion.calle + " " +direccion.interior +", "
  +direccion.colonia + ", "+ direccion.cp
  }
  
  
   
}


var usuario = {};


firebase.auth().onAuthStateChanged(function(user){
  console.log(user)
  if (user) {
    console.log("tenemos usuario");
    console.log(usuario)
    mostrarLogout()

    leerInformacion(user.uid);
  }else{
   
    console.log("no tenemos usuario");
    mostrarLogin()
    window.location.href = "index.html";
  }
});



btnLogout.addEventListener("click", function(){
  firebase.auth().signOut();
})

function mostrarLogout(){
  console.log("mostrar Logout");
  btnLogout.style.display = "block";
  btnLogin.style.display = "none";
}

function mostrarLogin(){
  console.log("mostrar login");
  btnLogout.style.display = "none";
  btnLogin.style.display = "block";
}

// persistencia del usuario dentro.
function agregarUsuario(usuario, uid){
  ref.child(uid).update(usuario);
}


perfilEditar.addEventListener("click", function(){
  console.log("editar");
  datosPerfil.style.display = "none";
  formularioPerfil.style.display ="block"
})

cancelForm.addEventListener("click",function(){
  datosPerfil.style.display="block";
  formularioPerfil.style.display ="none";
})

function editarDatos(){ 
  event.preventDefault();

  var uid = firebase.auth().currentUser.uid;

  console.log("editarDatos");
  var obj ={
    nombre: nombreForm.value,
    email: emailForm.value,
    telefono: telefonoForm.value,
    direccion:{
      calle: calleForm.value,
      interior:interiorForm.value,
      colonia:coloniaForm.value,
      cp:cpForm.value
    }    
  }
  console.log(obj);
  console.log(usuario.uid);
  ref.child(uid).update(obj).then(function(){
    datosPerfil.style.display="block";
      formularioPerfil.style.display ="none";
  })

}


// var btnPush   = document.getElementById("btnPush");
// var btnSet    = document.getElementById("btnSet");
// var btnUpdate = document.getElementById("btnUpdate");
// var btnRemove = document.getElementById("btnRemove");



// btnRemove.addEventListener("click", function(){
//   console.log("remove");
//   ref.child("GpEnHPdLs7VREkrn15XXgItRiwS2").remove();
// })

// btnSet.addEventListener("click",function(){  
//   var obj={
//    lugarPlatziConf:"ciudad de mex",    
//   }
//   refTest.set(obj).then(function(){
//     alert("set")
//   }).catch(function(err){
//     console.log(err)
//     alert("fallo el set")
//   })
// })

// btnPush.addEventListener("click", function(){
// var objeto={
//   curso:"firebase",
//   profesor:"angel",
//   contenidos:{
//     primero:"autenticación"
//   }
// }
//   refTest.push(objeto).then(function(){
//     alert("se subio correctamente la informacion")
//   }).catch(function(err){
//     console.log(err)
//     alert("hubo un error")
//   })
// })

// btnUpdate.addEventListener("click", function(){
//   var obj={
//    lugar:"platzi"

//     }
  
//   refTest.update(obj);
// })