
$(document).ready(function () {
    CargarCarruselImagenes();
});


function CargarCarruselImagenes() {
    var datosCarousel = datos["carrusel"];
    var content_carousel = "";
    var content_indicators = "";
    content_carousel += '<div class="carousel-personalizado">';
    for (let ind = 0; ind < datosCarousel["items"].length; ind++) {
        content_indicators += '<li data-target="#carouselImagesGeohazards" data-slide-to="'+ind+'"'+(ind === 0 ? "class='active'" : "")+'></li>';
        
        item = datosCarousel["items"][ind];
        content_carousel += '<div class="carousel-item '+(ind === 0 ? "active" : "")+'">';
        content_carousel += '<img src="'+item["img"]+'" class="img-slider d-block" alt="'+item["img_alt"]+'">';
        content_carousel += '<div  class="carousel-caption">';
        content_carousel += '<p>';
        content_carousel += '<span class="titulo-slider"><b>'+item["titulo"]+'</b></span>';
        content_carousel += '<br class="vista-grande"><br class="vista-grande"><i>'+item["fecha"]+'</i><br><br class="vista-grande">';
        content_carousel += '<span class="desc-slider">'+item["texto"]+'</span>'; 
        content_carousel += '</p>';
        content_carousel += '<ul class="btns-slider d-flex align-items-center list-unstyled justify-content-around">';
        for (let index = 0; index < item["btn"].length; index++) {
            const element = item["btn"][index];
            if (element["modal"]) {
                content_carousel += '<li><button type="button" data-toggle="modal" data-target="#modalCarousel" data-whatever="'+element["modal_info"]+'" class="btn btn-comun" target="_blank" style="font-size: 16px;">'+element["texto"]+'</i></button></li>';
            }
            else{
                content_carousel += '<li><a href="'+element["link"]+'" target="_blank" class="btn btn-comun"  style="font-size: 16px;">'+element["texto"]+'</a></li>';
            }
        }
        content_carousel += '</ul>';
        content_carousel += '</div></div>';
    }
    content_carousel += '</div>';
    $("#indicators").append(content_indicators);
    $("#carouselContent").append(content_carousel);
}

$('#modalCarousel').on('show.bs.modal', function (e) {
    // Se obtiene el botón que abrió el modal
    const button = $(e.relatedTarget) 
    // Se obtiene el id de la subestación mediante el atributo "data-whatever" del botón
    const id = button.data('whatever');
    var datosModal = datos["carrusel"]["modals"][id];
    $("#tituloModalCarousel").html(datosModal["titulo"]);
    $("#ref_pdf").attr("data", datosModal["url_pdf"]);
    $("#ref_alt").attr("href", datosModal["url_pdf"]);
});


function Traducir() {
    console.log("traduciendo");
    $(".trans").toggleClass("d-none");
}


// Interactividad con las imágenes de los integrantes-->Aparecer la descripcion de cada uno


// Profesor Edier

const boton = document.querySelector(".boton")
const resume = document.querySelector("#tab-1 div.resume")
const quienes_somos= document.querySelector("#tab-1 .quienes-somos")
const boton_cierre = document.querySelector("span.cerrar-perfil")


boton.addEventListener('click', function(){
    resume.classList.toggle("d-block")
    quienes_somos.classList.toggle("d-none")
    

});

boton_cierre.addEventListener('click', function(){
    resume.classList.toggle("d-block")
    quienes_somos.classList.toggle("d-none")
});



// Voltear el menu al presionar en lineas de investigación

const carta= document.querySelector("#barra-lateral div.carta");

const trigger_li = document.querySelector("ul.lista-campos li.trigger-li");
const trigger_proy = document.querySelector("ul.lista-campos li.trigger-proy");

const boton_cerrar_li = document.querySelector("a.cerrar-li");
const boton_cerrar_proy = document.querySelector("a.cerrar-proy");


const mostrar_li = document.querySelector(".cara-posterior div.parte-lineas-inv")
const mostrar_proy = document.querySelector(".cara-posterior div.parte-proyectos")


trigger_li.addEventListener('click', function(){

    carta.classList.toggle('voltear-carta')
    mostrar_li.classList.toggle('d-block')
    
});

trigger_proy.addEventListener('click', function(){

    carta.classList.toggle('voltear-carta')

    mostrar_proy.classList.toggle('d-block')

});

boton_cerrar_li.addEventListener('click', function(){

    carta.classList.toggle('voltear-carta')
    mostrar_li.classList.toggle('d-block')
});

boton_cerrar_proy.addEventListener('click', function(){

    carta.classList.toggle('voltear-carta')
    mostrar_proy.classList.toggle('d-block')
});



const mostrar_info_integrante = function(clase_detonante, clase_seccion_investigadores, clase_perfil, clase_btn_cerrar){

    const foto_integrante = document.querySelector(`#tab-3 div.investigador>a.${clase_detonante}`) 
    const seccion_a_ocultar = document.querySelector(`#tab-3 div.${clase_seccion_investigadores}`) 
    const perfil = document.querySelector(`#tab-3 div.${clase_perfil}`)
    const btn_cerrar = document.querySelector(`#tab-3 span.${clase_btn_cerrar}`)

    foto_integrante.addEventListener('click', ()=>{

        seccion_a_ocultar.classList.toggle("d-none")
        perfil.classList.toggle("d-block")
    });

    btn_cerrar.addEventListener('click', ()=>{

        seccion_a_ocultar.classList.toggle("d-none")
        perfil.classList.toggle("d-block")
    })

}
const profesor_edier = mostrar_info_integrante("integrante-1","investigadores","resume","cerrar-perfil")
const mi_arango = mostrar_info_integrante("integrante-2","investigadores","resume-2","cerrar-perfil-2")
const federico_gu = mostrar_info_integrante("integrante-3","investigadores","resume-3","cerrar-perfil-3")
const karolina_naran = mostrar_info_integrante("integrante-4","investigadores","resume-4","cerrar-perfil-4")
const ricardo_jaram = mostrar_info_integrante("integrante-5","investigadores","resume-5","cerrar-perfil-5")
const jhonatan_palac = mostrar_info_integrante("integrante-6","investigadores","resume-6","cerrar-perfil-6")
const daissy_herr = mostrar_info_integrante("integrante-7","investigadores","resume-7","cerrar-perfil-7")
const david_pala = mostrar_info_integrante("integrante-8","investigadores","resume-8","cerrar-perfil-8")
const mariana_vasq = mostrar_info_integrante("integrante-9","investigadores","resume-9","cerrar-perfil-9")


 //Items del menú activos al darle click


// Hacer que el elemento del menu se sombree al darle click para el sidebar principal

const activar_menu_con_click= function(menu, id_elemento_padre){
    Array.prototype.slice.apply(menu).forEach(elemento => {

        elemento.addEventListener('click', function(){
        
        padre = document.getElementById(`${id_elemento_padre}`)
        seleccionado= padre.getElementsByClassName("activar-menu")

        if(seleccionado.length>0){
            seleccionado[0].className = seleccionado[0].className.replace("activar-menu", "") 
        }
        this.className = "activar-menu"

    })});}

const elementos_barside_principal = document.querySelectorAll("ul.lista-campos>li.nav-item>a");
activar_menu_con_click(elementos_barside_principal, "menu-principal");


// Hacer que el elemento del menu se sombree al darle click para lineas de investigacion y 
// proyectos



 const activar_menu_con_click_internos = function(menu, id_elemento_padre, primer_elem_lista){
    Array.prototype.slice.apply(menu).forEach(elemento => {

        elemento.addEventListener('click', function(){
        
        padre = document.getElementById(`${id_elemento_padre}`)
        seleccionado= padre.getElementsByClassName("activar-menu")
        primer_elem_lista.className = primer_elem_lista.className.replace("menu-on", "activar-menu")

        if(seleccionado.length>0){
            seleccionado[0].className = seleccionado[0].className.replace("activar-menu", "") 
        }

        this.className = "activar-menu"

       
    })});}

 
const elementos_lineas_investigacion = document.querySelectorAll("ul.lineas-investigacion>li.nav-item>a")
const elementos_proyectos = document.querySelectorAll("ul.proyectos>li.nav-item>a");


const primer_elemento_li = document.querySelector("#primer-elem-li")
const primer_elemento_proy = document.querySelector("#primer-elem-proy")



activar_menu_con_click_internos(elementos_lineas_investigacion, "menu-lineas", primer_elemento_li);
activar_menu_con_click_internos(elementos_proyectos, "menu-proyectos", primer_elemento_proy);


// Hacer que al darle click al botón de cerrar se elimine la marcación previa en la linea de investigacion
// o proyecto



const corregir_sombreado= function(menu, id_elemento_padre, boton_cerrar_targeta, primer_el){
    Array.prototype.slice.apply(menu).forEach(elemento => {

        boton_cerrar_targeta.addEventListener('click', function(){

            padre = document.getElementById(`${id_elemento_padre}`)
            seleccionado= padre.getElementsByClassName("activar-menu")
            if(seleccionado.length>0){
                seleccionado[0].className = seleccionado[0].className.replace("activar-menu", "")
            }
            primer_el.classList.add("menu-on")

        })})};

const targeta_cerrar_li = document.querySelector(".cerrar-li")
const targeta_cerrar_proy = document.querySelector(".cerrar-proy")


corregir_sombreado(elementos_lineas_investigacion, "menu-lineas", targeta_cerrar_li, primer_elemento_li);
corregir_sombreado(elementos_proyectos, "menu-proyectos", targeta_cerrar_proy, primer_elemento_proy);




// Establecer tiempo de intervalo del slider
$('.carousel').carousel({
    interval: 5000
  })

  $('#carousel-imgs-evento').carousel({
    interval: 1000
  })



// Sidebar toggle

var boton_toggle_barside = document.querySelector(".btn-toggle")
var barside = document.querySelector("#barra-lateral")
var mostrar_contenido = document.querySelector("#mostrar-contenido")


boton_toggle_barside.addEventListener('click', function(){
    barside.classList.toggle("esconder")
    mostrar_contenido.classList.toggle("col-12")
    boton_toggle_barside.classList.toggle("voltear-boton")
})

console.log(barside.classList)

window.addEventListener('resize', function(){
    if(barside.classList.contains("esconder")){
        console.log("Contiene a esconder <---")
    }else{
        console.log("No lo tiene....")
    }
})



window.addEventListener('resize', function(){
    let anchoPagina = window.innerWidth;
    if(anchoPagina>= 576 && boton_toggle_barside.classList.contains("voltear-boton")){
        boton_toggle_barside.classList.remove("voltear-boton")
      }
      
})

window.addEventListener('resize', function(){
    let anchoPagina = window.innerWidth;
    if(anchoPagina>= 576 && barside.classList.contains("esconder")){
        barside.classList.remove("esconder")
        mostrar_contenido.classList.remove("col-12")
        console.log(anchoPagina)
      }
      
})


// Corregir scroll al acceder a una imagen de investigador
const investigadores_global = document.querySelector("div.tab-pane#tab-3")
let boton_cerrar_mi = document.querySelector("#m-i")
let boton_cerrar_kn = document.querySelector("#k-n")
let boton_cerrar_fg = document.querySelector("#f-g")
let boton_cerrar_rj = document.querySelector("#r-j")

let boton_cerrar_jp = document.querySelector("#j-p")
let boton_cerrar_dh = document.querySelector("#d-h")
let boton_cerrar_dp = document.querySelector("#d-p")
let boton_cerrar_mv = document.querySelector("#m-v")
let boton_cerrar_nn = document.querySelector("#n-n")





let scrollt = document.querySelector(".scroll-into")


boton_cerrar_mi.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,160)
})

boton_cerrar_kn.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,160)
})

boton_cerrar_fg.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,160)
})

boton_cerrar_rj.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,160)
})



boton_cerrar_jp.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,600)
})

boton_cerrar_mv.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,600)
})

boton_cerrar_nn.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,600)
})

boton_cerrar_dp.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,600)
})

boton_cerrar_dh.addEventListener('click', () =>{
    investigadores_global.scrollTo(0,600)
})











