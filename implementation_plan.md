# Plan de Implementación: Mejoras de la Página Web

A continuación detallo todos los cambios solicitados en el documento `Mejoras de la página web.docx`. He estructurado las acciones por componentes para que sea fácil revisarlas antes de ejecutarlas.

## User Review Required
Por favor, revisa esta lista para confirmar que he interpretado correctamente todos los cambios del documento. Si estás de acuerdo, **aprueba este plan** para que proceda a ejecutar las modificaciones en el código.

---

## Cambios Propuestos

### 1. Correcciones de Texto y Contenido Inicial
#### [MODIFY] `comunidad.html`
*   **Hero Section:** Cambiar "INVESTIGACIÓN PARTICIPATIVA PARA LA SEGURIDAD TERRITORIAL" para que solo tenga mayúscula inicial: *"Investigación participativa para la seguridad territorial."*
*   **Textos descriptivos:** Actualizar las respuestas a las preguntas de la sección de avances:
    *   *¿Qué son estos estudios y para qué sirven?* "Los estudios de riesgo de detalle permiten entender con mayor precisión qué zonas pueden presentar deslizamientos, avenidas torrenciales u otras inestabilidades del terreno, cómo puede verse afectada la población y qué medidas deben tomarse para proteger vidas, viviendas e infraestructura."
    *   *¿En qué fase o actividad vamos hoy?* Agregar: "Estamos en la fase de generación de la geología detallada de cada barrio", "Estamos en los recorridos de vulnerabilidad estructural", "Conformamos el equipo que realizará los escenarios de riesgo". Y los avances: "Finalizamos los recorridos de campo y las perforaciones en los barrios y sectores de comuna 3. Vamos en un 50% de avance en los recorridos en comuna 8. Iniciamos las perforaciones en comuna 8."
    *   *¿Dónde se está haciendo?* Actualizar la lista de barrios (Comuna 1, Comuna 3, Comuna 8, Santa Elena) tal como está en el documento.

### 2. Actualización de "Alcance de los estudios"
#### [MODIFY] `comunidad.html`
*   **Verbos en plural:** En la tarjeta de "Los estudios NO hacen directamente", cambiar los verbos de infinitivo a tercera persona plural (ej: Ejecutar -> *Ejecutan*, Entregar -> *Entregan*, Ordenar -> *Ordenan*, etc.).
*   **Nuevo ítem:** En la tarjeta de "Los estudios SÍ hacen", agregar el ítem: *"Mejoran el conocimiento del territorio"*.

### 3. Reubicación del Tablero de Indicadores
#### [MODIFY] `comunidad.html`
*   Mover la sección `<section class="stats-section">` (Tablero de Indicadores) hacia abajo en la página, ya que se indicó que no es relevante para la primera impresión. Se ubicará después de la sección de "Fases del Proceso" o antes de la participación, según fluya mejor.

### 4. Ajustes de Legibilidad (Preguntas Frecuentes / Info)
#### [MODIFY] `comunidad.html` y/o `v3.css`
*   Cambiar el color del texto de la frase *"¿Qué materiales hay? ¿A qué profundidad cambian? ¿Qué tan firmes son? ¿Hay agua subterránea?"* a color **blanco** o **café oscuro** para solucionar el problema de contraste que la hace ilegible actualmente.

### 5. Histórico de Eventos en el Territorio
#### [MODIFY] `comunidad.html`
*   **Títulos:** Cambiar a *"Histórico de eventos en el territorio"* (solo mayúscula inicial).
*   **Subtítulo:** Cambiar por *"Eventos geológicos y situaciones de riesgo que han marcado el territorio y que hoy permiten comprender la importancia de realizar los estudios de detalle."*
*   **Nuevos Eventos:** Añadir a la línea de tiempo e intercalar cronológicamente (reordenaré toda la lista nuevamente) los siguientes 7 eventos nuevos:
    *   *Media Luna (12 de julio de 1954)* - +60 fallecidos
    *   *Santo Domingo Savio (29 de septiembre de 1974)* - +80 fallecidos
    *   *Villatina (27 de septiembre de 1987)* - +500 personas
    *   *Santo Domingo Savio (14-15 de noviembre de 2021)*
    *   *Llanaditas, sector El Faro (20 de junio de 2022)*
    *   *Villatina, sector La Libertad (22 de mayo de 2025)*
    *   *Granizal (24 de junio de 2025)* - 25 fallecidos

### 6. Glosario Ciudadano
#### [MODIFY] `comunidad.html`
*   Añadir al glosario los nuevos 8 términos con sus definiciones exactas del documento:
    *   Plan de Ordenamiento Territorial - POT
    *   Tratamiento urbanístico
    *   Presión urbanística
    *   Avenida torrencial
    *   Escorrentía superficial
    *   Saturación del suelo
    *   Erosión
    *   Ladera

---

## Verification Plan

### Manual Verification
Una vez realizados los cambios:
1. Abriré la página web localmente para revisar visualmente que el tablero de indicadores haya bajado.
2. Comprobaré el contraste de las letras que no se veían.
3. Revisaré la correcta cronología (desde 1954 hasta 2025) del nuevo histórico de eventos.
