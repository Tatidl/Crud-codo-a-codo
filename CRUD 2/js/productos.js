const { createApp } = Vue
createApp({
data() {
return {
productos:[],
url:'http://fraic818.pythonanywhere.com/series', 
error:false,
cargando:true,
/*atributos para el guardar los valores del formulario */
id:0,
nombre:"",
imagen:"",
anio:0,
calificacion:0,
genero:"",
temporadas:0,
}
},
methods: {
fetchData(url) {
fetch(url)
.then(response => response.json())
.then(data => {
this.productos = data;
this.cargando=false
})
.catch(err => {
console.error(err);
this.error=true
})
},
eliminar(producto) {
const url = this.url+'/' + producto;
var options = {
method: 'DELETE',
}
fetch(url, options)
.then(res => res.text()) // or res.json()
.then(res => {
location.reload();
})
},
grabar(){
let producto = {
nombre:this.nombre,
anio:this.anio,
calificacion:this.calificacion,
genero:this.genero,
temporadas:this.temporadas,
imagen:this.imagen,
}
var options = {
body:JSON.stringify(producto),
method: 'POST',
headers: { 'Content-Type': 'application/json' },
redirect: 'follow'
}
fetch(this.url, options)
.then(function () {
alert("Registro grabado")
window.location.href = "/templates/productos.html";
})
.catch(err => {
console.error(err);
alert("Error al Grabarr")
})
}
},
created() {
this.fetchData(this.url)
},
}).mount('#app')