# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Líderes y lideresas comunitarias, funcionarios públicos y ciudadanía del Borde Urbano Rural Nororiental de Medellín (comunas 1, 3, 8 y corregimiento de Santa Elena), sin formación técnica previa en gestión del riesgo u ordenamiento territorial. Acceden mayoritariamente desde el celular, en tiempos cortos y fragmentados, para entender por qué se hacen estudios de riesgo en su barrio y cómo pueden participar.

## Product Purpose

"Conocimientos del Territorio" es un curso corto y autoguiado (4 módulos: POT, Territorio y Riesgo, Construcción del Riesgo, Comunidad y Herramientas) que traduce conceptos técnicos de riesgo y planificación territorial a un lenguaje accesible para la comunidad. Éxito = que una persona sin formación técnica termine el curso entendiendo amenaza/exposición/vulnerabilidad/riesgo, el POT y su modelo de ocupación, y cómo participar en las decisiones que afectan su territorio.

## Positioning

Es la puerta de entrada educativa del proyecto GeoHazards (Universidad Nacional de Colombia, con Alcaldía de Medellín y Minciencias), que adelanta estudios de detalle de amenaza/vulnerabilidad/riesgo reales en estos barrios (ver `comunidad.html`: perforaciones, recorridos de campo, hitos por comuna). A diferencia de un MOOC genérico, el curso está anclado al territorio real y a una investigación participativa activa, no a contenido abstracto.

## Operating Context

- Página estática de una sola pieza (`curso/index.html`), sin backend ni login; el progreso se guarda en `localStorage` (`curso_progress`).
- Lecciones de tres tipos: texto, audio (con transcripción sincronizada por porcentaje de duración) y video (con versión subtitulada opcional).
- Material descargable en PDF y galería de imágenes de apoyo por módulo.
- Enlazada desde la navbar de `comunidad.html`, que ya usa una identidad visual pulida (hero animado, badges, GSAP) con la paleta "Arcilla" (`assets/css/v3.css`).
- Uso previsto mobile-first, sesiones cortas, conexión potencialmente limitada.

## Capabilities and Constraints

- HTML/CSS/JS plano sin build ni framework; debe seguir funcionando como archivo estático servido por GitHub Pages (ver `CNAME`).
- Assets reales ya existentes: audios (`audios/`), videos con subtítulos (`videos/`), PDFs (`pdfs/`), imágenes por módulo (`curso/img/`), logo (`logo/LogoGeoHazards.svg`) y mascota "geoloro" (`curso/img/geoloro.png`) usada como tip/guía.
- Contenido educativo (textos de lecciones, transcripciones, videos, audios, PDFs) es intocable en su significado; la estructura visual y de interacción es libre de rediseñar.
- El resultado para el usuario prima sobre la coherencia estricta de marca: se puede explorar una dirección visual distinta a `comunidad.html`, siempre que conserve un hilo mínimo de identidad (p. ej. color de acento, logo y/o mascota geoloro).

## Brand Commitments

- Nombre del proyecto: GeoHazards. Logo: `logo/LogoGeoHazards.svg`.
- Mascota "geoloro" (`curso/img/geoloro.png`), usada como personaje guía/tip dentro de las lecciones.
- Paleta "Arcilla/tierra" ya establecida en el resto del sitio (`--color-primary: #8A4F2A`, ocre `#D99A2B`, verde musgo, rojo tierra, azul pizarra) — mantener al menos como hilo de identidad (acento), no como restricción absoluta de toda la paleta.

## Evidence on Hand

- Imágenes reales por módulo: `M3_AVECR.png`, `M3_CapacidadesR.png`, `M3_Vulnerabilidad.png`, `M4_Comunidad.png`, `M4_Storymaps.png`.
- Audios de introducción y contenido por módulo con transcripción real ya escrita en el HTML.
- Videos reales (con y sin subtítulos) por módulo 1 y 3.
- PDFs reales descargables (ABECE del POT, Modelo de Ocupación, Geoportal, Monitoreo de señales).
- Imágenes de banco libre (Unsplash/Pexels) y assets del propio repo pueden complementarse donde falte apoyo visual; no se generarán imágenes con IA para este trabajo.

## Product Principles

1. Priorizar el resultado de aprendizaje y la usabilidad mobile-first por encima de la coherencia estricta de marca.
2. Hacer tangible el territorio real (fotos/imágenes concretas de laderas, quebradas, barrios) en vez de ilustraciones corporativas abstractas.
3. El progreso y la sensación de avance importan: esto es una tarea que se completa, no solo contenido que se lee.
4. Mantener un hilo mínimo de identidad GeoHazards (acento de color, logo y/o geoloro) aunque el lenguaje visual general se renueve.
5. Lenguaje visual simple y accesible: la audiencia no tiene formación técnica ni tiempo largo de sesión.

## Accessibility & Inclusion

Contenido en español para público general no técnico. Mantener soporte de `prefers-reduced-motion` ya presente en el código actual. Mantener subtítulos de video y transcripción de audio como mecanismos de accesibilidad, no como añadidos opcionales a remover.
