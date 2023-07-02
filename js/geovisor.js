// Variable para la gestión del contenido del visor
var map;
// Variable para la gestión de la Barra Lateral
var sidebar;
// Variable para la gestión del Notificaciones
var notification;
// Variable con las opciones del Spin
var spinOpts = {
    lines: 10, // The number of lines to draw
    length: 14, // The length of each line
    width: 9, // The line thickness
    radius: 4, // The radius of the inner circle
    scale: 0.5, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1.3, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-more', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fe5000', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    //top: '50%', // Top position relative to parent
    //left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: 'spinner', // The CSS class to assign to the spinner
    //position: 'absolute', // Element positioning
};

//Función Principal ----->


$(document).ready(function () {
    // Inicializar el mapa
    map = L.map('map', {preferCanvas: true}).setView([5.2, -74.5], 6);
    // Creando niveles en el mapa para el orden en la visualización
    map.createPane("baseMapPane");
    map.createPane("layersPane");
    // Asignando el orden de los niveles
    map.getPane('baseMapPane').style.zIndex = 0;
    map.getPane('layersPane').style.zIndex = 10;
    // Asigna el mapa base por defecto
    mapaBase = L.esri.Vector.vectorBasemapLayer('ArcGIS:Imagery', {
      apiKey : 'AAPK858e9fb220874181a8cee37c6c7c05e0JFjKsdmGsd2C7oV31x1offnFB9ia6ew61D9N_tANtlZny5LFO1hIU6Xj2To6eiUp',
      pane: "baseMapPane",
    });
    mapaBase.addTo(map);
    capaPuntos.addTo(map);
    
    // Inicializar la Escala
    CargarEscala();
    // Inicializar las Notificaciones
    CargarNotificaciones();
    // Inicializar la barra lateral
    CargarSidebar();
    // Agregar los mapa base en la barra lateral
    AgregarContenidoMapasBase();
    // Agregar las capas 
    AgregarCapas();
    // Inicialización de los Popover que muestran la información de las capas por países
    $('[data-toggle="popover"]').popover({
        title: function () {
            const idPopover = this.id.split("_");
            var contentPopover = '<div class="title-popover"><b>'+ paises[idPopover[1]]["arrayCapas"][idPopover[2]]["name"]+'</b></div> <div id="close-'+this.id+'" class="close-popover" ><i class="fa-solid fa-xmark"></i></div>';
            return contentPopover;
        },
        content: function () {
            const idPopover = this.id.split("_");
            var contentPopover = "<p>Texto de descripción de la capa</p>";
            contentPopover += '<b>Autor: </b>'+ paises[idPopover[1]]["arrayCapas"][idPopover[2]]["attribution"]+'<br>';
            contentPopover += '<a target="_blank" href="'+ paises[idPopover[1]]["arrayCapas"][idPopover[2]]["url"] +'"><b>URL del Recurso</b></a>';
            return contentPopover;
        }
    });
    // Función para el funcionamiento del botón cerrar de los Popover de información
    $('[data-toggle="popover"]').on('shown.bs.popover', function () {
        console.log(this.id);
        $("#close-"+this.id).click(function (e) { 
            e.preventDefault();
            const idPopover = this.id.split("close-");
            console.log(idPopover[1]);
            $('#'+idPopover[1]).popover("hide");
        });        
    });
    
});

//<----- Fin Función Principal

//Plugins Visor ----->

// Barra Lateral
function CargarSidebar() {
    sidebar = L.control.sidebar({
        autopan: false,       // whether to maintain the centered map point when opening the sidebar
        closeButton: true,    // whether t add a close button to the panes
        container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
        position: 'left',     // left or right
    }).addTo(map);
}

// Notificaciones
function CargarNotificaciones() {
    notification = L.control.notifications({
        timeout: 4000,
        position: 'topright',
        closable: true,
        dismissable: true,
        className: 'pastel'
    }).addTo(map);
}

// Escala
function CargarEscala() {
    L.control.scale({
      metric: true,
      imperial: false,
      position: 'bottomleft'
    }).addTo(map);
}


//<----- Fin Plugins Visor


//Mapas Base ----->

// Variables para gestión de mapa base
var mapaBase;
var mapaBaseLabels;
var auxMapaBaseLabels = false;
// Crear la clase MapaBase
function MapaBase(link,name,icon,credits,type) {
    this.link = link;
    this.name = name;
    this.icon = icon;
    this.credits = credits;
    this.type = type;
}
// Extrae los datos de los mapa base
var dataMapasBase = datos["dataMapasBase"];
// Crear el Array con los mapas base
var mapasBase = [];
// Añade el contenido a la pestaña de mapas base
function AgregarContenidoMapasBase() {
    for(mapa in dataMapasBase){
        if (dataMapasBase[mapa]["active"]) {
            mapasBase.push(new MapaBase(dataMapasBase[mapa]["link"],dataMapasBase[mapa]["name"], dataMapasBase[mapa]["icon"], dataMapasBase[mapa]["credits"], dataMapasBase[mapa]["type"]))
        }
    }
    var baseMapContainer = '<div class="container-fluid h-100">'  
    baseMapContainer += '<div class="row h-100 w-100">'   
    for (let i = 0; i < mapasBase.length; i++) {
        baseMapContainer += 
        '<div class="col-6 col-basemap" id="baseMap_'+ i +'" onclick="CargarMapaBase(id)">'+
            '<div class="item-basemap '+ (i===0?"active":"") +'">'+
                '<div class="img-basemap">'+
                    '<img class="img-fluid" src="images/Basemap/'+ mapasBase[i].icon +'">'+
                '</div>'+
                '<div class="text-center text-basemap">'+
                    '<h6><b>'+ mapasBase[i].name +'</b></h6>'+
                '</div>'+
            '</div>'+
        '</div>'
    }
    baseMapContainer += '<div/><div/>'
    $("#basemapContent").append(baseMapContainer);
}
// Función que cambia los mapa base
function CargarMapaBase(id) {
    var ids = id.split("_")[1];
    if (mapasBase[ids].type === 'esriVector') {
        map.removeLayer(mapaBase);
        if (auxMapaBaseLabels) {
            map.removeLayer(mapaBaseLabels);
            auxMapaBaseLabels = false;
        }
        mapaBase = L.esri.Vector.vectorBasemapLayer(mapasBase[ids].link, {
            apiKey : 'AAPK858e9fb220874181a8cee37c6c7c05e0JFjKsdmGsd2C7oV31x1offnFB9ia6ew61D9N_tANtlZny5LFO1hIU6Xj2To6eiUp',
            pane: "baseMapPane",
        });
        mapaBase.addTo(map);
    }
    if (mapasBase[ids].type === 'tileLayer') {
        map.removeLayer(mapaBase);
        if (auxMapaBaseLabels) {
            map.removeLayer(mapaBaseLabels);
            auxMapaBaseLabels = false;
        }
        mapaBase = L.tileLayer(mapasBase[ids].link, {
            attribution: mapasBase[ids].credits,
            maxZoom: 21,
            pane: "baseMapPane",
        });
        if (mapasBase[ids].name === 'Google Map Satelite') {
            mapaBaseLabels = L.esri.basemapLayer('ImageryLabels');
            mapaBaseLabels.addTo(map);
            auxMapaBaseLabels = true;
        }
        mapaBase.addTo(map);
    }
    $("#basemapContent .item-basemap").removeClass("active");
    $("#baseMap_"+ids+" .item-basemap").addClass("active");
}

//<----- Fin Mapas Base


//Capas----->


var capaPuntos = L.layerGroup();

// Función para agregar el contenido de las capas a la barra lateral
function AgregarCapas() {
    $("#capasContent").append(
        '<div class="col-12">'+
            '<label for="selectCapa" class="bold label-capas">Escoja la capa:</label>'+
            '<select class="form-control" id="selectCapa">'+
                '<option value="Colombia">Colombia</option>'+
                '<option value="Antioquia">Antioquia</option>'+
            '</select>'+
        '</div>'+
        '<div class="row" id="filters"></div>'
    );
    $("#selectCapa").change(function() {
        AgregarFiltros();
    });
    AgregarFiltros();
}


function AgregarFiltros(){
    var capa = $("#selectCapa").val();
    const getUnique = (arr) => [...new Set(arr)];
    
    if(capa === "Colombia"){
        var textAppend = "";
        var departamentos = ["Todos"];
        var ciudades = ["Todas"];
        var tipos = ["Todos"];
        var trigger = ["Todos"];
        for (let i = 0; i < Colombia.length; i++) {
            const element = Colombia[i];
            departamentos.push(element["LOCATION"]["Department"])
            ciudades.push(element["LOCATION"]["City"])
            tipos.push(element["TYPE"])
            trigger.push(element["TRIGGERING"])
        }
        var departamentosUnique = getUnique(departamentos);
        var ciudadesUnique = getUnique(ciudades);
        var tiposUnique = getUnique(tipos);
        var triggerUnique = getUnique(trigger);
        textAppend += '<div class="col-12">'+
                        '<label for="selectDepartamento" class="bold label-capas">Departamento:</label>'+
                        '<select class="form-control" id="selectDepartamento">';
        for (let i = 0; i < departamentosUnique.length; i++) {
            const element = departamentosUnique[i];
            textAppend += '<option value="'+element+'">'+element+'</option>';
        }
        textAppend += '</select></div>';
        textAppend += '<div class="col-12">'+
                        '<label for="selectCiudad" class="bold label-capas">Ciudad:</label>'+
                        '<select class="form-control" id="selectCiudad">';
        for (let i = 0; i < ciudadesUnique.length; i++) {
            const element = ciudadesUnique[i];
            textAppend += '<option value="'+element+'">'+element+'</option>';
        }
        textAppend += '</select></div>';
        textAppend += '<div class="col-12">'+
                        '<label for="selectTipo" class="bold label-capas">Tipo:</label>'+
                        '<select class="form-control" id="selectTipo">';
        for (let i = 0; i < tiposUnique.length; i++) {
            const element = tiposUnique[i];
            textAppend += '<option value="'+element+'">'+element+'</option>';
        }
        textAppend += '</select></div>';
        textAppend += '<div class="col-12">'+
                        '<label for="selectDetonante" class="bold label-capas">Detonante:</label>'+
                        '<select class="form-control" id="selectDetonante">';
        for (let i = 0; i < triggerUnique.length; i++) {
            const element = triggerUnique[i];
            textAppend += '<option value="'+element+'">'+element+'</option>';
        }
        textAppend += '</select></div>';
        textAppend += '<div class="col-12">'+
                        '<label for="selectMuertes" class="bold label-capas">Mínimo de Fallecidos:</label>'+
                        '<input type="number" class="form-control" id="selectMuertes" value="0"></div>';
        textAppend += '<button class="btn btn-success" id="btn_Colombia" onclick="graficarCapa(id)">Buscar</button>';
    }
    else if(capa === "Antioquia"){

    }
    
    
    $("#filters").empty();
    $("#filters").append(textAppend);
}

function graficarCapa(id) {
    const idCapa = id.split("_")[1];
    map.removeLayer(capaPuntos);
    capaPuntos = L.layerGroup();
    const depart = $("#selectDepartamento").val();
    const city = $("#selectCiudad").val();
    const type = $("#selectTipo").val();
    const detonante = $("#selectDetonante").val();
    const muertes = $("#selectMuertes").val();
    if(idCapa == "Colombia") {
        for (let i = 0; i < Colombia.length; i++) {
            const element = Colombia[i];
            if (typeof element['COORDINATES']['coordinates'][0] === 'number') {
                console.log('');
                
                if ((element["LOCATION"]["Department"] === depart || depart === "Todos" ) && (element["LOCATION"]["City"] === city || city === "Todas") && (element["TYPE"] === type || type === "Todos") && (element["TRIGGERING"] === detonante || detonante === "Todos") && element["LOSSES"]["Fatalities"] >= muertes) {
                    var point = L.marker([element['COORDINATES']['coordinates'][1], element['COORDINATES']['coordinates'][0]]).toGeoJSON();                
                    L.extend(point.properties, {
                        id: i,
                        Tipo: element['TYPE'],
                        Detonante: element['TRIGGERING'],
                        Fuente: element['SOURCE'],
                        Depuracion: element['DEPURACION'],
                        Region: element['LOCATION']['Region'],
                        Departamento: element['LOCATION']['Department'],
                        Ciudad: element['LOCATION']['City'],
                        Sitio: element['LOCATION']['Site'],
                        Incertidumbre: element['LOCATION']['Uncertainty'],
                        Norte: element['COORDINATES']['coordinates'][1],
                        Este: element['COORDINATES']['coordinates'][0],
                        Fallecidos: element['LOSSES']['Fatalities'],
                        Economicas: element['LOSSES']['Economic'],
                        OtrasPerdidas: element['LOSSES']['Other'],
                        Notas: element['NOTE'],
                        
                      });
                    L.geoJson(point,{
                        onEachFeature: function(feature, layer) {
                          if (feature.properties) {
                            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                            return k + ": " + feature.properties[k];
                            }).join("<br />"), {
                            maxHeight: 200
                            });
                          }
                        }
                    }).addTo(capaPuntos);
                }
            }
        }
        capaPuntos.addTo(map);
    }
}

// Función que muestra/oculta las capas en el mapa
function toggleDatosCapas(id){
    var auxPais = id.split('_')[1];
    var num = parseInt(id.split('_')[2]);
    if ($('#'+id).prop('checked')){
        paises[auxPais]["arrayCapas"][num]["capa"].addTo(map);
        if (paises[auxPais]["arrayCapas"][num]["clase"] === "feature") {
            var namePais = '';
            switch (auxPais) {
                case 'colombia':
                namePais = 'Colombia';
                break;
                case 'peru':
                namePais = 'Perú';
                break;
                case 'chile':
                namePais = 'Chile';
                break;
                default:
                break;
            }
            $("#legendpane").append('<div class="content-leyendpane" id="legend_'+auxPais+'_'+num+'">'+ '<h5><b>'+paises[auxPais]["arrayCapas"][num]["name"]+' ('+namePais+')</b></h5>' + paises[auxPais]["arrayCapas"][num]["leyenda"] + '<div class="b-border"></div>' +'</div>');
            $("#content-legend_"+auxPais+'_'+num).append('<div class="legend_capa">' + paises[auxPais]["arrayCapas"][num]["leyenda"] + '</div>');
        }
        else {
            paises[auxPais]["arrayCapas"][num]["leyenda"].addTo(map);
            map.removeControl(paises[auxPais]["arrayCapas"][num]["leyenda"]);
        }
    } else{
        map.removeLayer(paises[auxPais]["arrayCapas"][num]["capa"]);
        $("#legend_"+auxPais+'_'+num).remove();
        $('#content-legend_'+auxPais+'_'+num).empty();
    }
}
function CerrarPopoverCapas(id){
    console.log(id);
}


//<----- Capas por País


//Cargar Capas ----->

// Variables para gestión de Carga de Capas
var featureFiles = [];
var featuresCount = 0;
// Función que controla el input donde se suben los archivos
$('#files').change(function(evt) {
    var files = evt.target.files; 
    for (var i = 0, f; f = files[i]; i++) {
        if (f.name.slice(-3) === 'zip') {
            GraficarFileSHP(f);
        }else if (f.name.slice(-3) === 'kml') {
            GraficarFileKML(f);
        }else if (f.name.slice(-3) === 'kmz') {
            GraficarFileKMZ(f);
        }else if (f.name.slice(-4) === 'json') {
            GraficarFileGeoJSON(f);
        }else if (f.name.slice(-3) === 'tif') {
            GraficarFileRaster(f);
        }else{
            notification.alert('Atención', 'Tipo de archivo incorrecto');
        }
    }
});
// Función que asigna el nombre del archivo al texto del input
$("#files").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
// Función que añade el cudro de la capa a la sección de la Barra Lateral para capas tipo KML, KMZ, GeoJSON y SHP
function AgregarContenidoFile(f) {
    map.spin(false, spinOpts);
    $("#content-input-cargarCapa").append(
        '<div class="content-file">'+
            '<div class="locate-cargarCapa" id="locate-cargarCapa_' + featuresCount + '"  onClick="EnfocarCapa(id)"><i class="fa-solid fa-crosshairs"></i></div>'+
            '<div class="save-cargarCapa" id="save-cargarCapa_' + featuresCount + '" onClick="GuardarCapa(id)"><i class="fa-solid fa-floppy-disk"></i></div>'+
            '<label class="switch">'+
                '<input type="checkbox" checked id="file_' + featuresCount + '" onChange="toggleDatosFiles(id)">'+
                '<span class="slider round"></span>'+
            '</label>'+
            '<a>'+ f.name +'</a>'+
            '<div class="d-block"></div>'+
            '<div id="cp_'+ featuresCount +'" class="cp-cargarCapa" data-color="rgb(255, 255, 255)">'+
                '<span class="input-group-text colorpicker-input-addon"><i></i></span>'+
            '</div>'+
            '<div class="slidecontainer">'+
                '<input type="range" min="0" max="100" value="0" class="sliderb" id="transp_file_'+featuresCount+'">'+
                '<p>Transparencia: <span id="valTransp_file_'+featuresCount+'"></span>%</p>'+
            '</div>'+
        '</div>'
    );
    var slider = $("#transp_file_"+featuresCount)[0];
    var output = $("#valTransp_file_"+featuresCount)[0];
    output.innerHTML = slider.value;
    slider.oninput = function () {
      var id = parseInt($(this).attr('id').split('_')[2]);
      var output = $("#valTransp_file_"+id)[0];
      output.innerHTML = this.value;
      var transpa = (100 - parseInt(this.value)) / 100;
      if ($('#file_' + id).prop('checked')) {
        featureFiles[id].setStyle({opacity : transpa});
      }
    }
    $('#cp_'+featuresCount).colorpicker().on('colorpickerChange colorpickerCreate', function (e) {
      var id = parseInt($(this).attr('id').split('_')[1]);
      if ($('#file_' + id).prop('checked')) {
        featureFiles[id].setStyle({
          color: e.value,
          fillColor: e.value
        });
      }
    });
    featuresCount++;
}
// Función que añade el cudro de la capa a la sección de la Barra Lateral para capas tipo Raster
function AgregarContenidoFileRaster(f) {
    $("#content-input-cargarCapa").append(
        '<div class="content-file">'+
            '<div class="locate-cargarCapa" id="locate-cargarCapa_' + featuresCount + '"  onClick="EnfocarCapa(id)"><i class="fa-solid fa-crosshairs"></i></div>'+
            '<label class="switch">'+
                '<input type="checkbox" checked id="file_' + featuresCount + '" onChange="toggleDatosFiles(id)">'+
                '<span class="slider round"></span>'+
            '</label>'+
            '<a>  '+ f.name +'</a>'+
        '</div>'
    );
    featuresCount++;
}
// Función que centra la capa seleccionada en el mapa
function EnfocarCapa(id){
    var num = id.split("_")[1];
    try {
        map.fitBounds(featureFiles[num].getBounds());
    } catch (error) {
        console.log(error);
    }
}
// Función que guarda la capa seleccionada en la base de datos
function GuardarCapa(id){
    var num = id.split("_")[1];
    console.log( featureFiles[num].toGeoJSON());
}
// Función que muestra/oculta las capas en el mapa
function toggleDatosFiles(id){
    var num = id.split("_")[1];
    if ($('#'+id).prop('checked')){
        featureFiles[num].addTo(map);
    } else{
        map.removeLayer(featureFiles[num]);
    }
}
// Funciones para cargar la información al visor
// Cargar KML
function GraficarFileKML(f) {
    map.spin(true, spinOpts);
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        fetch(e.target.result)
          .then(res => res.text())
          .then(kmltext => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmltext, 'text/xml');
            const track = new L.KML(kml,{pane: "layersPane"});
            track.setStyle({opacity : 1});   
            track.addTo(map); 
            try {
                map.fitBounds(track.getBounds());
            } catch (error) {
                console.log(error);
            }
            featureFiles.push(track);
            AgregarContenidoFile(f);
          });
      };
    })(f);
    reader.readAsDataURL(f); 
}
// Cargar KMZ
function GraficarFileKMZ(f) {
    map.spin(true, spinOpts);
    var reader = new FileReader();
    reader.onload = function(event) {
        var result = reader.result;
        var kmz = L.kmzLayer().addTo(map);
        kmz.parse(result, { name: f.name, icons: {} ,pane: "layersPane"});
        featureFiles.push(kmz);        
        try {
            setTimeout(() => { map.fitBounds(kmz.getBounds()); AgregarContenidoFile(f);}, 200);
        } catch (error) {
            console.log(error);
        }
    };
    reader.readAsArrayBuffer(f); 
}
// Cargar GeoJSON
function GraficarFileGeoJSON(f) {
  
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {

        var obj = JSON.parse(e.target.result);
        
        var geoJSON = new L.geoJson(obj, {
          onEachFeature: function(feature, layer) {
            if (feature.properties) {
              layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
              }).join("<br />"), {
                maxHeight: 200
              });
            }
          },
          pane: "layersPane",
        });
        geoJSON.setStyle({opacity : 1});  
        geoJSON.addTo(map);  
        map.fitBounds(geoJSON.getBounds());
        featureFiles.push(geoJSON);
        AgregarContenidoFile(f);
      };
    })(f);
    reader.readAsText(f);
  
}
// Cargar SHP comprimidos en .zip
function GraficarFileSHP(f) {
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
  
        var shpfile = new L.Shapefile(e.target.result, {
          onEachFeature: function(feature, layer) {
            if (feature.properties) {
              layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return k + ": " + feature.properties[k];
              }).join("<br />"), {
                maxHeight: 200
              });
            }
          },
          pane: "layersPane",
        });
        shpfile.setStyle({opacity : 1});  
        shpfile.addTo(map);  
        try {
            setTimeout(() => { map.fitBounds(shpfile.getBounds());}, 200);
        } catch (error) {
            console.log(error);
        }
        featureFiles.push(shpfile);
        AgregarContenidoFile(f);
        shpfile.once("data:loaded", function() {
          console.log("finished loaded shapefile");
          console.log(shpfile.toGeoJSON());
        });   
  
      };
    })(f);
    reader.readAsArrayBuffer(f);
}
// Cargar Raster con extensión .tif
function GraficarFileRaster(f) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(f);
    reader.onloadend = function() {
        var arrayBuffer = reader.result;
        parseGeoraster(arrayBuffer).then(georaster => {
            console.log("georaster:", georaster);
            var layer = new GeoRasterLayer({
                georaster: georaster,
                opacity: 0.7,
                resolution: 256,
                pane: "layersPane",
            });
            console.log("layer:", layer);
            layer.addTo(map);
            map.fitBounds(layer.getBounds());
            featureFiles.push(layer);
            AgregarContenidoFileRaster(f);
        });
    };
}

//<----- Fin Cargar Capas



//Cargar Subestaciones Guardadas ----->

// Crear la clase Subestacion
