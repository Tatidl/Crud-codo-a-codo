console.log(location.search) // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
data() {
return {
id:0,
nombre:"",
imagen:"",
anio:0,
calificacion:0,
genero:"",
temporadas:0,
url:'http://fraic818.pythonanywhere.com/series/'+id,
}
},
methods: {
fetchData(url) {
fetch(url)
.then(response => response.json())
.then(data => {

console.log(data)
this.id=data.id
this.nombre=data.nombre;
this.imagen=data.imagen
this.anio=data.anio
this.calificacion=data.calificacion
this.genero=data.genero
this.temporadas=data.temporadas
})
.catch(err => {
console.error(err);
this.error=true
})
},
modificar() {
let producto = {
nombre:this.nombre,
anio:this.anio,
calificacion:this.calificacion,
genero:this.genero,
temporadas:this.temporadas,
imagen:this.imagen,
}
var options = {
body: JSON.stringify(producto),
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
redirect: 'follow'
}
fetch(this.url, options)
.then(function () {
alert("Registro modificado")
window.location.href = "/index.html";
})
.catch(err => {
console.error(err);
alert("Error al Modificar")
})
}
},
created() {
this.fetchData(this.url)
},
}).mount('#app')