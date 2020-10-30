var ref = firebase.database().ref("usuario");
var refGuitarras = firebase.database().ref("guitarras");

var usuario = {};

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");
var imgRef = firebase.storage().ref();

imgRef.child("invie-classic.png").getDownloadURL().then(function(url){
  console.log(url)
})

firebase.auth().onAuthStateChanged(function(user){
  console.log(user)
  if (user) {
    console.log("tenemos usuario");
    mostrarLogout()
  }else{
    console.log("no tenemos usuario");
    mostrarLogin()
  }
});


btnLogin.addEventListener("click", function(){
  event.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  
  firebase.auth().signInWithPopup(provider).then(function(datosUsuario){
    console.log(datosUsuario);
    usuario = {
      nombre: datosUsuario.user.displayName,  
      email: datosUsuario.user.email,
      uid: datosUsuario.user.uid
    }
    agregarUsuario(usuario, usuario.uid);
  }).catch(function(err){
    console.log(err);
  })
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

function agregarUsuario(usuario, uid){
  ref.child(uid).update(usuario);
}
 //
 // inicia script leer


function leerGuitarras () {
  refGuitarras.child('vip').on('child_added', (datos) => {
    console.log('vip', datos.val())
    const guitar = datos.val()
    const nombreGui = datos.val().nombre
    const contenedorElementos = document.getElementById('guitarrasContent')
    console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
        contenedorElementos.firsChild
      )
  } )
}

function leerguitarrasVip () {
  refGuitarras.child('normal').on('child_added', (datos) => {
    console.log('normales', datos.val())
    const guitar = datos.val()
    const nombreGui = datos.val().nombre
    const contenedorElementos = document.getElementById('guitarrasContentVip')
    console.log(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.metadata)
    contenedorElementos.insertBefore(
      crearElementoGuitarra(datos.key, guitar.nombre, guitar.precio, guitar.descripcion, guitar.img),
        contenedorElementos.firstChild
      )
  } )
}

function crearElementoGuitarra(key, nombre, precio, descripcion, img) {
  const uid = firebase.auth().currentUser.uid

  const html = 
      '<article class="guitarra contenedor">' +
        '<img class="derecha" src="" alt="Guitarra Invie Acustica" width="150"/>' +
        '<div class="contenedor-guitarra-a">' +
          '<h3 class="title-b"></h3>' +
          '<ol>' +
            '<li class="precio-b"></li>' +
            '<li class="descripcion-b"></li>' +
          '</ol>' +
        '</div>' +
        '<button type="button" onclick="comprar('+'`'+key+'`'+')">Comprar</button>'+
      '</article>'

  // Create the DOM element from the HTML
  const div = document.getElementById('div')
  div.innerHTML = html

  const guitarElement = div.firstChild
  var imgURL = ""
  imgRef.child(img).getDownloadURL().then((url) => {
    imgURL = url
  }).then(() => {
    guitarElement.getElementsByClassName('title-b')[0].innerText = nombre
    guitarElement.getElementsByClassName('precio-b')[0].innerText = precio
    guitarElement.getElementsByClassName('descripcion-b')[0].innerText = descripcion
    guitarElement.getElementsByClassName('derecha')[0].src = imgURL
  })
  return guitarElement
}

leerGuitarras()
leerguitarrasVip()