    var ref = firebase.database().ref("usuario");
    var refGuitarras = firebase.database().ref("guitarras");

    var nombre = document.getElementById("nombre");
    var precio = document.getElementById("precio");
    var descripcion = document.getElementById("descripcion");
    var tipo = document.getElementById("tipo");
    var imagen = document.getElementById("img");
    var descripcion = document.getElementById("descripcion");


    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log(user)
        }else{
             window.location.href = "index.html";   
        }
    })

    function nuevaGuitarra(){
        event.preventDefault();        
        var obj={
            nombre: nombre.value,
            descripcion: descripcion.value,
            tipo: tipo.value,
            precio: precio.value                                                                                                       ,
            img: imagen.value
        }   
        console.log(obj)

        if (obj.tipo == "normal"){
            console.log("normal")    
            subirGuitarra(obj, "normal")        
        }else if (obj.tipo == "vip"){
            console.log("vip")
            subirGuitarra(obj,"vip")
        }else {
            alert("el tipo debe ser normal o vip")
        }
        
    }

    function subirGuitarra(guitarra, tipo){
        refGuitarras.child(tipo).push(guitarra)
    }