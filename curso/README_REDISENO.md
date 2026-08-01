# Rediseño del curso "Conocimientos del Territorio"

Estado a 28 de julio de 2026. Documento de cierre: qué se hizo, qué falta y qué propongo.

---

## 1. Qué se hizo

### Instalación de la skill de diseño
Se instaló **impeccable** (v4.0.3) en el proyecto:

- `.claude/skills/impeccable/` — la skill y sus 127 scripts
- `.claude/agents/impeccable-*.md` — 4 subagentes auxiliares

Se invoca con `/impeccable <comando> <objetivo>` en una sesión de Claude Code abierta sobre `E:\Trabajo\1-OpenCode\web-page`. Comandos útiles para más adelante: `critique`, `audit`, `polish`, `animate`, `typeset`.

> Nota: el instalador oficial (`npx impeccable install`) falla en esta copia del repo por una dependencia ausente (`fflate`). Se instaló copiando los archivos ya compilados, que es equivalente para Claude Code.

### Archivos nuevos creados
| Archivo | Qué es |
|---|---|
| `PRODUCT.md` (raíz del proyecto) | Verdad de producto: usuarios, propósito, restricciones, assets reales. Lo leen todos los comandos de la skill. |
| `curso/img/redesign/*.webp` | 6 imágenes optimizadas (ver abajo) |
| `curso/README_REDISENO.md` | Este documento |

### Imágenes: se aprovechó material real que estaba sin usar
El repositorio ya tenía fotografía real excelente que el curso no estaba usando. Se optimizó a WebP:

| Nuevo archivo | Origen | Antes → Después |
|---|---|---|
| `hero-campo.webp` | `assets/comunidad/img/campo.png` (equipo de campo en la ladera) | 503 KB → 87 KB |
| `mission-1-pot.webp` | `bg/bg1.jpg` (ladera con procesos de remoción) | 205 KB → 189 KB |
| `mission-2-riesgo.webp` | `bg/bg3.jpg` (deslizamiento urbano, vista dron) | 238 KB → 180 KB |
| `mission-3-construccion.webp` | `bg/bg5.jpg` (ladera con niebla y deslizamientos) | 233 KB → 175 KB |
| `mission-4-comunidad.webp` | `bg/bg12.jpg` (recorrido de campo, vía afectada) | 472 KB → 235 KB |
| `geoloro-guide.webp` | `assets/comunidad/img/geoloro2.png` | **6.6 MB → 98 KB** |

El cambio de geoloro es el más relevante: el curso usaba `curso/img/geoloro.png` (1.7 MB) recortado en un círculo de 44 px, lo que desperdiciaba la ilustración completa. Ahora se usa la versión a cuerpo entero, a color, y pesa 17× menos.

**Los archivos originales no se borraron.** `curso/img/geoloro.png` sigue existiendo por si se prefiere el otro estilo.

### Rediseño de `curso/index.html`

Se reemplazó la estructura de "sidebar + panel" (plantilla genérica de LMS) por un recorrido de tres niveles:

```
Inicio (hero fotográfico + progreso + CTA)
   └── 4 tarjetas de "misión", una por módulo, con foto real
          └── Lista de lecciones tipo checklist
                 └── Lección individual (video / audio / galería / PDF / texto)
```

Cambios concretos:

1. **Hero real.** Foto del equipo de campo en la ladera + geoloro a cuerpo entero + barra de progreso + botón que dice *"Comenzar el curso"* / *"Continuar donde quedaste"* / *"Repasar el curso"* según el avance guardado.
2. **Tarjetas de misión** con fotografía de territorio real en vez de filas de texto en un árbol plegable.
3. **Checklist por módulo** en lugar de acordeón anidado.
4. **Barra superior** con logo clicable, migaja de pan y progreso global siempre visible.
5. **Corrección de comportamiento:** antes el curso marcaba una lección como completada con solo abrirla, lo que inflaba el progreso artificialmente. Ahora se completa al **terminar** el audio/video, o manualmente con el botón (que además se puede desmarcar).

**Lo que NO se tocó** (verificado): textos de lecciones, transcripciones, rutas de audios/videos/PDFs, la sincronización de transcripción con el audio, los subtítulos, `prefers-reduced-motion`, y la clave de `localStorage` (`curso_progress`), así que el progreso de quien ya venía usando el curso se conserva.

Los 36 archivos de medios referenciados existen en disco. El JS parsea sin errores de sintaxis y la consola del navegador no reporta errores.

---

## 2. ⚠️ Hallazgo importante: los audios de introducción están acumulados

Esto **no** es del rediseño, ya venía así, pero es el problema más serio del curso y conviene resolverlo antes de publicar.

Los audios de introducción contienen el contenido de los módulos anteriores concatenado:

| Archivo | Duración | Contenido real |
|---|---|---|
| `Intro_Módulo_1.mp3` | 1:51 | Módulo 1 ✅ |
| `Intro_Modulo_2.mp3` | 3:10 | Módulo 2 ✅ |
| `Intro_Modulo_3.mp3` | **6:26** | Módulo 2 **+** Módulo 3 ❌ |
| `Intro_Módulo 4.mp3` | **7:54** | Módulos 2 **+** 3 **+** 4 ❌ |

Se confirma tanto por la duración creciente como por las transcripciones: la del módulo 3 empieza diciendo *"Módulo 2. Entender el territorio donde vivimos"*, y la del módulo 4 también.

**Propuesta:** recortar los MP3 para que cada intro contenga solo su módulo, y recortar las transcripciones correspondientes en el HTML. Puedo hacerlo con ffmpeg si me indicas los tiempos de corte, o identificarlos yo por el texto.

---

## 3. Errores de transcripción automática

Las transcripciones se generaron con reconocimiento de voz y tienen errores sistemáticos que aparecen muchas veces. Los más frecuentes:

| Dice | Debería decir |
|---|---|
| "formas de **evitar**" | "formas de **habitar**" (aparece ~15 veces) |
| "**híbitat** / **híbitad** / **híbeta**" | "**hábitat**" |
| "el **pote** / el **poto** de Medellín" | "el **POT** de Medellín" |
| "geoportal de **Joe Assards**" | "geoportal de **GeoHazards**" |
| "una puerta ya no **sierra** bien" | "no **cierra** bien" |
| "que una comunidad **sufradaños**" | "**sufra daños**" |
| "**sonas** proteger" | "**zonas** a proteger" |
| "**apendiente**" | "**la pendiente**" |
| "**de forestación**" | "**deforestación**" |
| "**impredesibles**" | "**impredecibles**" |
| "**Repara** un café" | "**Prepara** un café" |

Son visibles para el usuario porque la transcripción se muestra en pantalla mientras suena el audio. **Propuesta:** hacer una pasada de corrección (búsqueda y reemplazo controlada). Es rápido y de alto impacto para la credibilidad del curso.

---

## 4. Verificación pendiente

**Importante y honesto:** no pude tomar capturas de pantalla. La herramienta de captura del navegador agotó el tiempo de espera en todos los intentos, tanto en el sitio publicado como en local. Por lo tanto:

- ✅ Verificado: el HTML carga, el título es correcto, el contenido se renderiza (leí el texto de la página), no hay errores en consola, el JS no tiene errores de sintaxis, todos los archivos de medios existen.
- ❌ **No verificado visualmente por mí:** cómo se ve realmente en pantalla, el comportamiento responsive en móvil, el contraste real de los textos sobre las fotos.

El servidor de previsualización quedó configurado. Para revisarlo:

```
http://localhost:3010/curso/
```

Si no está corriendo, se levanta con el perfil `curso-preview` que agregué a `.claude/launch.json`, o directamente:

```bash
cd E:\Trabajo\1-OpenCode\web-page
npx serve . -p 3010
```

**Revisa especialmente:** legibilidad del texto blanco sobre las fotos (las fotos de dron tienen zonas claras que pueden reducir el contraste), y cómo se ve el hero en un celular.

---

## 5. Hallazgos del detector automático

El detector determinista de la skill (60 reglas, sin modelo de lenguaje) reportó 9 advertencias, ninguna crítica:

| Hallazgo | Mi lectura |
|---|---|
| **Fuente sobreexpuesta (Inter)** ×2 + **una sola familia tipográfica** | Válido en general, pero aquí es deliberado: `comunidad.html` usa Inter y mantener la identidad importaba. Si quieres diferenciar, propongo una tipografía con carácter solo para títulos y dejar Inter en el cuerpo. |
| **Easing tipo rebote** (línea 393) | Real, viene del código original en el botón flotante de audio. Recomiendo cambiarlo a `cubic-bezier(.16,1,.3,1)`. |
| **Animación de propiedad de layout** (`transition: width`) ×3 | En las barras de progreso. Es correcto señalarlo, pero el impacto es nulo aquí (3 barras, no una lista larga). Se puede cambiar a `transform: scaleX()` si quieres pulcritud total. |
| **Imagen rota** (línea 518) | Falso positivo: es el `<img>` del modal, que se llena por JS al hacer clic en una imagen. |
| **Sombra con brillo de color** (línea 195) | Real: el botón principal tiene un halo ámbar. Se puede neutralizar. |

Ninguno bloquea la publicación. Son mejoras de acabado.

---

## 6. Lo que propongo para cerrar

En orden de impacto:

1. **Recortar los audios de intro de los módulos 3 y 4** y sus transcripciones. *(Es el problema real de contenido.)*
2. **Corregir los errores de transcripción** de la tabla de arriba. *(Rápido, muy visible.)*
3. **Que revises visualmente** el resultado y me digas qué ajustar. *(Yo no pude ver la pantalla.)*
4. Opcional: los 3 ajustes de acabado del detector (easing, halo, barras de progreso).
5. Opcional: generar `DESIGN.md` con `/impeccable document` para dejar el sistema de diseño registrado.

---

## 7. Reversión y control de versiones

La carpeta **sí está bajo git**, con remoto en `github.com/geohazards-med/web-page`. La versión anterior de `curso/index.html` está intacta en el último commit (`6f75aae`), así que revertir es seguro:

```bash
cd E:\Trabajo\1-OpenCode\web-page
git diff curso/index.html          # ver exactamente qué cambió
git checkout -- curso/index.html   # descartar el rediseño y volver a la versión anterior
```

Estado actual del árbol de trabajo (nada se ha commiteado ni subido):

- **Modificados:** `curso/index.html` (el rediseño), `comunidad.html` (cambio previo, no mío)
- **Sin seguimiento:** `PRODUCT.md`, `curso/img/redesign/`, `curso/README_REDISENO.md`, `.claude/skills/`, `.claude/agents/`, `.agents/`, `skills-lock.json`, y varios scripts de Python de transcripción

**Antes de commitear:** conviene añadir `.claude/skills/`, `.claude/agents/` y `.agents/` al `.gitignore` — son ~3 MB de herramientas de desarrollo que no pertenecen al sitio publicado.

No he hecho commit ni push de nada; queda a tu criterio.
