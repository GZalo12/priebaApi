let contenedor = document.getElementById('contenedor');
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', ()=>{
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
    console.log(pagina);
  }
});

btnAnterior.addEventListener('click', ()=>{
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
    console.log(pagina);
  }
});
const cargarPeliculas =  async ()=>{
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=94a02cdf9f6116da0e1b6ec4a98a859c&language=es-MX&page=${pagina}`);
    
    console.log(respuesta);
    let peliculas = '';


    // si la respesuat a la peticion es correcta se ejecuta la peticion 
    // el status es la respuesta que da la api a sus opciones de errores que tiene, para cuando la key este mal, o no exista en el catalogo ninguna pelicula 
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      datos.results.forEach(pelicula => {
        // console.log(pelicula.title);
        peliculas += `
        <div class="pelicula">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">

          <h1 class="titulo">${pelicula.title}</h1>
        </div>
        `;
      });
      contenedor.innerHTML = peliculas;

      console.log(datos.total_results);
    }else if(respuesta.status === 401){
      console.error('La llave esta mal!!');
    }else if(respuesta.status === 404){
      console.log('La pelicula que buscas no existe!!');
    }else{
      console.log('Eror inexplicable revice las claves!!');
    }
    
  } catch (error) {
    console.log(error);
  }
}
cargarPeliculas();