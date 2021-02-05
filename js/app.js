var catalogo_pelicula = document.getElementById('catalogo-resultado');

function buscador(nombre_serie_pelicula){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if(myArr['Response'] == 'True'){
                comprobarArray(myArr);
            } else {
                anunciador(tipos_anuncios[1], tipos_mensajes[1], false);
            }
        }
    };
    xhttp.open("GET", "http://www.omdbapi.com/?apikey=f497245&plot=full&t=" + nombre_serie_pelicula);
    xhttp.send();
}

function comprobarArray(array) {
    if (array['Plot'] != 'N/A' && array['Poster'] != 'N/A' && array['Title'] != 'N/A' && array['imdbRating'] != 'N/A'){
        if (array['Plot'] != 'undefined' && array['Poster'] != 'undefined' && array['Title'] != 'undefined' && array['imdbRating'] != 'undefined'){
            imprimirTarjeta(array);
            anunciador(tipos_anuncios[0], tipos_mensajes[0], true);
        } else {
            anunciador(tipos_anuncios[1], tipos_mensajes[1], false);
        }
    } else {
        anunciador(tipos_anuncios[1], tipos_mensajes[1], false);
    }

}

function imprimirTarjeta(array){
    if (catalogo_pelicula.getElementsByClassName('col-sm-6').length == 2){
        catalogo_pelicula.removeChild(catalogo_pelicula.getElementsByClassName('col-sm-6')[0]);
    }
    traductor(array);
}


var input_buscar_pelicula = document.getElementById('input-buscar');
var buscar_pelicula = document.getElementById('buscar');

buscar_pelicula.addEventListener('click', hacerBusqueda);

function hacerBusqueda(){
    buscador(input_buscar_pelicula.value);
    input_buscar_pelicula.value = "";
}

/* ESTE BLOQUE DE CODIGO HACE POSIBLE LAS ALERTAS */
var contenedor_alertas = document.getElementById('contenedor-alertas');

function anunciador(tipo_anuncio, mensaje, binario){
    if(binario){
        location.replace('#respuestas');
        var alerta = 'alert-success';
    } else if (binario == false){
        var alerta = 'alert-danger';
    }
    contenedor_alertas.innerHTML = `
    <div class="alert ${alerta} alert-dismissible fade show  animate__animated animate__fadeIn" role="alert">
        <strong>${tipo_anuncio}</strong> ${mensaje}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `;
    setTimeout(function(){
        contenedor_alertas.innerHTML = '';
    }, 5000);
}

var tipos_anuncios = ['¡Búsqueda completada!', 'Ha ocurrido un problema...'];
var tipos_mensajes = ['Hay resultados disponibles sobre la búsqueda que usted acaba de realizar.', 'No hemos podido encontrar lo que ha escrito.'];

/* TRADUCTOR DE CONTENIDO */
function traductor(array){
    const data = null;
    
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            traduccion = JSON.parse(this.responseText);
            catalogo_pelicula.innerHTML += `
            <div class="col-sm-6">
                <div class="card m-1 bg-success animate__animated animate__fadeIn">
                    <img src="${array['Poster']}" class="card-img-top p-2">
                    <div class="card-body bg-dark text-light">
                        <h5 class="card-title">${array['Title']} <span class="badge badge-success">${array['imdbRating']}</span></h5>
                        <p class="card-text text-justify">${traduccion['text'][0]}</p>
                    </div>
                </div>
            </div>
            `;
        }
    });

    xhr.open("GET", "https://just-translated.p.rapidapi.com/?lang=es&text="+array['Plot']);
    xhr.setRequestHeader("x-rapidapi-key", "d5a286e403msh5c67eefe898ee63p19088cjsn0db76ee69472");
    xhr.setRequestHeader("x-rapidapi-host", "just-translated.p.rapidapi.com");
    
    xhr.send(data);
}
