var catalogo_pelicula = document.getElementById('catalogo-resultado');

function buscador(parametro){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            if(myArr['Response'] == 'True'){
                comprobarArray(myArr);
            } 
        }
    };
    xhttp.open("GET", "http://www.omdbapi.com/?apikey=f497245&plot=full&t=" + parametro, true);
    xhttp.send();
}

function imprimirTarjeta(array){
    if (catalogo_pelicula.getElementsByClassName('col-sm-6').length == 2){
        var arrayPelicula = catalogo_pelicula.getElementsByClassName('col-sm-6');
        arrayPelicula['0'] = '';
        console.log(arrayPelicula['0']);
    }
    catalogo_pelicula.innerHTML += `
    <div class="col-sm-6">
        <div class="card m-1">
            <img src="${array['Poster']}" class="card-img-top p-2">
            <div class="card-body bg-dark text-light">
                <h5 class="card-title">${array['Title']} <span class="badge badge-success">${array['imdbRating']}</span></h5>
                <p class="card-text text-justify">${array['Plot']}</p>
            </div>
        </div>
    </div>
    `;
}

function comprobarArray(array) {
    if (array['Plot'] != 'N/A' && array['Poster'] != 'N/A' && array['Title'] != 'N/A' && array['imdbRating'] != 'N/A'){
        if (array['Plot'] != 'undefined' && array['Poster'] != 'undefined' && array['Title'] != 'undefined' && array['imdbRating'] != 'undefined'){
            imprimirTarjeta(array);
        } else {
            console.log('No está en el sistema');
        }
    } else {
        console.log('No está en el sistema');
    }

}

var input_buscar_pelicula = document.getElementById('input-buscar');
var buscar_pelicula = document.getElementById('buscar');

buscar_pelicula.addEventListener('click', hacerBusqueda);

function hacerBusqueda(){
    buscador(input_buscar_pelicula.value);
    input_buscar_pelicula.value = "";
}