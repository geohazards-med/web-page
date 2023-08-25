$(document).ready(function () {
  CargarCarruselImagenes();
  CargarAboutUs();
  CargarLineas();
  CargarProyectos();
  CargarPublicaciones();
  CargarCongresos();
  CargarRecursos();
  CargarContacto();
  
  $('#modal_carousel').on('show.bs.modal', function (e) {
    // Se obtiene el botón que abrió el modal
    const button = $(e.relatedTarget) 
    // Se obtiene el id de la subestación mediante el atributo "data-whatever" del botón
    const id = button.data('whatever');
    var datosModal = datos["carrusel"]["modals"][id];
    console.log(datosModal);
    $("#tituloModalCarousel").html(datosModal["titulo"]);
    $("#ref_pdf").attr("data", datosModal["url_pdf"]);
    $("#ref_alt").attr("href", datosModal["url_pdf"]);
  });

  $(".menu li a").click(function (e) { 
    e.preventDefault();
    $(".menu li a").removeClass("active_menu");
    $("#"+e.target.id).addClass("active_menu");
  });

  // Selecciona los elementos que deseas observar
  const $slides = $('.kenBurns');

  // Crear un objeto para realizar seguimiento de los estados de los slides
  const slideStates = {};

  // Inicializar los estados de los slides
  $slides.each(function() {
      const slideId = $(this).attr('id');
      slideStates[slideId] = $(this).hasClass('active');
  });

  // Crea una instancia de MutationObserver utilizando jQuery
  const observer = new MutationObserver(function(mutationsList, observer) {
      for (let mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              const $target = $(mutation.target);
              const slideId = $target.attr('data-name');
              const currentState = $target.hasClass('active');
              if (currentState !== slideStates[slideId]) {
                  slideStates[slideId] = currentState;
                  if (currentState) {
                      // Ejecuta tu función aquí pasando slideId
                      $(".menu li a").removeClass("active_menu");
                      $("#menu_"+slideId).addClass("active_menu");
                  }
              }
          }
      }
  });

  // Configura el observador para observar cambios en atributos
  $slides.each(function() {
      observer.observe(this, { attributes: true });
  });


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
      content_carousel += '<p class="m-0">';
      content_carousel += '<span class="titulo-slider m-0"><b>'+item["titulo"]+'</b></span>';
      content_carousel += '<h5 class="mb-4">'+item["fecha"]+'</h5>';
      content_carousel += '<span class="desc-slider">'+item["texto"]+'</span>'; 
      content_carousel += '</p>';
      content_carousel += '<ul class="btns-slider d-flex align-items-center list-unstyled justify-content-around">';
      for (let index = 0; index < item["btn"].length; index++) {
          const element = item["btn"][index];
          if (element["modal"]) {
              content_carousel += '<li><button type="button" data-toggle="modal" data-target="#modal_carousel" data-whatever="'+element["modal_info"]+'" class="btn btn-comun" target="_blank" style="font-size: 16px;">'+element["texto"]+'</i></button></li>';
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

function CargarAboutUs() {
  const about = datos["aboutus"];
  var content = "";
  var content1 = "";
  content += '<h1 class="ae-2 fromLeft trans">'+about["title"]+'</h1>';
  content += '<h1 class="ae-2 fromLeft trans d-none">'+about["title_eng"]+'</h1>';
  content += '<p class="ae-3 fromLeft trans">'+about["text"]+'</p>';
  content += '<p class="ae-3 fromLeft trans d-none">'+about["text_eng"]+'</p>';

  content1 += '<div class="row w-100"><div class="col-12 col-md-3 col-lg-4 d-inline-block text-center"><img src="'+about["img_ed"]+'" class="foto_profe"/>';
  content1 += '<p class="title_profe m-0"><b>Edier V. Aristizábal G.</b> <br> Director</p></div>';
  content1 += '<div class="col-12 col-md-9 col-lg-8 d-inline-block redes_profe">';
  content1 += '<p class="datos_profe m-0">'+about["datos_profe"]+'</p>';
  content1 += '<a class="icon-redes" href="mailto:'+about["mail"]+'"><i class="fa-solid fa-envelope"></i></a>';
  content1 += '<a class="icon-redes" target="_blank" href="'+about["web"]+'"><i class="fa-solid fa-globe"></i></a>';
  content1 += '<a class="icon-redes" target="_blank" href="'+about["cvlac"]+'">CvLAC</i></a>';
  content1 += '<a class="icon-redes" target="_blank" href="'+about["linkedin"]+'"><i class="fa-brands fa-linkedin"></i></a>';
  content1 += '<a class="icon-redes" target="_blank" href="'+about["scholar"]+'"><i class="fa-solid fa-graduation-cap"></i></a>';
  content1 += '<a class="icon-redes" target="_blank" href="'+about["research"]+'"><i class="fa-brands fa-researchgate"></i></a>';
  content1 += '<a class="icon-redes" target="_blank" href="'+about["github"]+'"><i class="fa-brands fa-github"></i></a>';
//   content1 += '<br><br>';
  content1 += '</div></div>';

  $("#aboutus_content").append(content);
  $("#aboutus_img").append(content1);
}

function CargarLineas() {
    const datosLineas = datos["lineas"];
    var content = "";
    var content1 = "";

    for (let index = 0; index < datosLineas.length; index++) {
        content += '<li class="nav-item"><a class="trans nav-link '+(index == 0 ? "active" : "")+'" data-toggle="tab" href="#tabLineas-'+index+'">'+datosLineas[index]["name"]+'</a><a class="trans d-none nav-link '+(index == 0 ? "active" : "")+'" data-toggle="tab" href="#tabLineas-'+index+'">'+datosLineas[index]["name_eng"]+'</a></li>';
        content1+= '<div class="tab-pane '+(index == 0 ? "active" : "")+' show" id="tabLineas-'+index+'">'+
                        '<div class="container">'+
                            '<div class="row row-lineas control-desbor mx-auto">'+
                                '<div class="col-lg-4 col-md-12 col-sm-12 col-12 d-flex flex-column justify-content-center align-items-center">'+
                                    '<div class="ilustracion">'+
                                        '<img src="'+datosLineas[index]["img"]+'" width="254px" height="247px" alt="">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-lg-8 col-md-12 col-sm-12 col-12 d-flex flex-column justify-content-center align-items-center">'+
                                    '<div class="descripcion-linea">'+
                                        '<h6 class="trans titulo-campo-der">'+datosLineas[index]["name"]+'</h6><h6 class="trans d-none titulo-campo-der">'+datosLineas[index]["name_eng"]+'</h6>'+
                                        '<p class="trans text-justify">'+datosLineas[index]["text"]+'</p><p class="trans d-none text-justify">'+datosLineas[index]["text_eng"]+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    }


    $("#menu-lineas").append(content);
    $("#content-lineas").append(content1);

}

function CargarProyectos() {
    const datosProy = datos["proyectos"];
    var content = "";
    var content1 = "";

    for (let index = 0; index < datosProy.length; index++) {
        content += '<li class="nav-item"><a class="trans nav-link '+(index == 0 ? "active" : "")+'" data-toggle="tab" href="#tabProy-'+index+'">'+datosProy[index]["name"]+'</a>'+
        // '<a class="trans d-none nav-link '+(index == 0 ? "active" : "")+'" data-toggle="tab" href="#tabProy-'+index+'">'+datosProy[index]["name_eng"]+'</a>'+
        '</li>';
        content1+= '<div class="tab-pane '+(index == 0 ? "active" : "")+' show" id="tabProy-'+index+'">'+
                        '<div class="container">'+
                            '<div class="row row-lineas control-desbor mx-auto">'+
                                '<div class="col-lg-4 col-md-12 col-sm-12 col-12 d-flex flex-column justify-content-center align-items-center">'+
                                    '<div class="ilustracion">'+
                                        '<img src="'+datosProy[index]["img"]+'" width="254px" height="247px" alt="">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-lg-8 col-md-12 col-sm-12 col-12 d-flex flex-column justify-content-center align-items-center">'+
                                    '<div class="descripcion-linea">'+
                                        '<h6 class="trans titulo-campo-der">'+datosProy[index]["name"]+'</h6>'+
                                        // '<h6 class="trans d-none titulo-campo-der">'+datosProy[index]["name_eng"]+'</h6>'+
                                        '<p class="trans text-justify">'+datosProy[index]["text"]+'</p>'+
                                        // '<p class="trans d-none text-justify">'+datosProy[index]["text_eng"]+'</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
    }


    $("#menu-proyectos").append(content);
    $("#content-proyectos").append(content1);

}

function CargarPublicaciones() {
    const datosPubli = datos["publicaciones"];
    var content = "";
    var content1 = ""; 

    for (let index = 0; index < datosPubli["anos"].length; index++) {
        content += '<li class="nav-item"><a class="trans nav-link '+(index == 0 ? "active" : "")+'" data-toggle="tab" href="#tabPubli-'+index+'">'+datosPubli["anos"][index]+'</a>'+
        // '<a class="trans d-none nav-link '+(index == 0 ? "active" : "")+'" data-toggle="tab" href="#tabPubli-'+index+'">'+datosPubli["anos"][index]+'</a>'+
        '</li>';
        content1 += '<div class="tab-pane '+(index == 0 ? "active" : "")+' show" id="tabPubli-'+index+'" style="width: 99%;">'+
                        '<div class="container">'
                            

        for (let ind = 0; ind < datosPubli[datosPubli["anos"][index]].length; ind++) {
            const element = datosPubli[datosPubli["anos"][index]][ind];
            content1 += '<div class="row publicacion mx-auto d-flex align-content-center">'+
                            '<div class="revista col-md-2 col-lg-2 d-flex justify-content-center align-items-center">'+
                                '<div class="img-revista d-flex align-items-center">'+
                                    '<img class="img-fluid d-none d-md-block" src="'+element["img"]+'" width="140" height="auto" alt="">'+
                                '</div>'+
                            '</div>'+
                            '<div class="bibliografia col-lg-7 col-md-7 col-sm-12 col-12  d-flex flex-column justify-content-center">'+
                                '<p>'+element["text"]+'</p>'+
                            '</div>'+
                            '<div class="col-lg-3 col-md-3 col-sm-12 col-12 d-flex flex-column justify-content-center align-content-start">'+
                                '<ul class="botones d-flex flex-row flex-md-column justify-content-around">';
                                if (element["link"] != "") {
                                    content1 += '<li class="pdf"><a class=" btn btn-publi" href="'+element["link"]+'" target="_blank">'+element["name_link"]+'</a></li>'
                                }
                                if (element["pdf"] != "") {
                                    content1 += '<li class="pdf"><a class="btn btn-publi" href="'+element["pdf"]+'" target="_blank"><i class="fa-solid fa-file-arrow-down mr-4"></i>PDF</a></li>'
                                }
            content1 +=         '</ul>'+
                            '</div>'+
                        '</div>'
        }

        content1 += '</div></div>';
    }

    $("#menu-publicaciones").append(content);
    $("#content-publicaciones").append(content1);
}

function CargarCongresos() {
    const datosCongre = datos["congresos"];
    var content = "";
    var content1 = ""; 

    for (let index = 0; index < datosCongre["anos"].length; index++) {
        content += '<li class="nav-item"><a class="trans nav-link '+(index == 0 ? "active" : "")+'" data-toggle="tab" href="#tabCongre-'+index+'">'+datosCongre["anos"][index]+'</a>'+
        // '<a class="trans d-none nav-link '+(index == 0 ? "active" : "")+'" data-toggle="tab" href="#tabCongre-'+index+'">'+datosCongre["anos"][index]+'</a>'+
        '</li>';
        content1 += '<div class="tab-pane '+(index == 0 ? "active" : "")+' show" id="tabCongre-'+index+'" style="width: 99%;">'+
                        '<div class="container">'
                            
        for (let ind = 0; ind < datosCongre[datosCongre["anos"][index]].length; ind++) {
            const element = datosCongre[datosCongre["anos"][index]][ind];
            content1 += '<div class="row publicacion mx-auto d-flex align-content-center">'+
                            '<div class="bibliografia col-lg-9 col-md-9 col-sm-12 col-12  d-flex flex-column justify-content-center">'+
                                '<p>'+element["name"]+'</p>'+
                            '</div>'+
                            '<div class="col-lg-3 col-md-3 col-sm-12 col-12 d-flex flex-column justify-content-center align-content-start">'+
                                '<ul class="botones d-flex flex-row flex-md-column justify-content-around">';
                                if (element["link"] != "") {
                                    content1 += '<li class="pdf"><a class=" btn btn-publi" href="'+element["link"]+'" target="_blank">Abstract</a></li>'
                                }
            content1 +=         '</ul>'+
                            '</div>'+
                        '</div>'
        }

        content1 += '</div></div>';
    }

    $("#menu-congresos").append(content);
    $("#content-congresos").append(content1);
}

function CargarRecursos() {
    const datosRecursos = datos["recursos"];
    var content1 = ""; 
    content1 += '<div class="tab-pane active show" id="" style="width: 99%;">'; 

    for (let index = 0; index < datosRecursos.length; index++) {
        console.log('====================================');
        console.log(datosRecursos[index]);
        console.log('====================================');
        const element = datosRecursos[index];
        content1 +='<div class="container">'+
                        '<div class="row publicacion mx-auto d-flex align-content-center">'+
                            '<div class="bibliografia col-lg-9 col-md-9 col-sm-12 col-12  d-flex flex-column justify-content-center">'+
                                '<p>'+element["name"]+'</p>'+
                            '</div>'+
                            '<div class="col-lg-3 col-md-3 col-sm-12 col-12 d-flex flex-column justify-content-center align-content-start">'+
                                '<ul class="botones d-flex flex-row flex-md-column justify-content-around">'+
                                   '<li class="pdf"><a class=" btn btn-publi" href="'+element["link"]+'" target="_blank">Acceder</a></li>'+
                                '</ul>'+
                            '</div></div>'+
                    '</div>';
    }
    content1 += '</div>'; 
    $("#content-recursos").append(content1);
}

function CargarContacto() {
    const about = datos["contacto"];
    var content = "";
    var content1 = "";
    content += '<br><br><br><h1 class="ae-2 fromLeft">'+about["name"]+'</h1>';
    content += '<h3 class="ae-3 fromLeft">'+about["name_sub"]+'</h3>';
    content += '<h3 class="ae-3 fromLeft"> <i class="fa-solid fa-envelope"></i> '+about["mail"]+'</h3>';
    // content += '<p class="ae-3 fromLeft">'+about["callto"]+'</p>';
    // content += '<div><button class="button gradient btn-visor ae-3 fromLeft">Suscribete</button>';
    content += '<p class="ae-3 fromLeft">¡Sígenos! <a href="https://www.facebook.com/GeohazardsUnal/">          <i class="fa-brands fa-facebook"></i></a>         <a href="https://www.instagram.com/geohazards_unalmed/">         <i class="fa-brands fa-instagram"></i></a></p></div>';
    
    
    content1 += '<img class="ae-3 fromLeft" src="'+about["img"]+'" style="height: 200px;">';
    content1 += '<h3 class="ae-3 fromLeft">'+about["depa"]+'</h3>';
    content1 += '<h3 class="ae-3 fromLeft"><i class="fa-solid fa-location-dot"></i> '+about["dir"]+'</h3>';
    content1 += '<h3 class="ae-3 fromLeft"><i class="fa-solid fa-phone"></i> '+about["tel"]+'</p>';
  //   content1 += '<br><br>';
    content1 += '</div></div>';
  
    $("#contacto_content").append(content);
    $("#contacto_img").append(content1);
  }


