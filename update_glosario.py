import re

html_content = """        <div class="glosario-card">
          <div class="glosario-letter">A</div>
          <div class="glosario-title">Amenaza</div>
          <div class="glosario-desc">Es un fenómeno que puede causar daño, como un deslizamiento, una inundación o una avenida torrencial. Peligro latente.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">A</div>
          <div class="glosario-title">Apique</div>
          <div class="glosario-desc">Excavación manual pequeña y cuadrada para observar el suelo.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">A</div>
          <div class="glosario-title">Avenida torrencial</div>
          <div class="glosario-desc">Crecida súbita y violenta de una quebrada o cauce que arrastra agua, lodo, piedras y árboles.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">B</div>
          <div class="glosario-title">Borde Urbano Rural</div>
          <div class="glosario-desc">Es el lugar o franja de transición donde la ciudad se encuentra con el campo. Este tipo de zonas se deben planificar pensando en barrios más seguros, con mejores espacios públicos y veredas productivas acorde con la vida rural, sin ir en contravía de la protección de ecosistemas y las áreas donde puede haber riesgo.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">E</div>
          <div class="glosario-title">Erosión</div>
          <div class="glosario-desc">Desgaste del suelo por acción del agua, viento o actividades humanas. La falta de coberturas vegetales hace que la erosión sea mayor porque expone el suelo a estos elementos.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">E</div>
          <div class="glosario-title">Escorrentía superficial</div>
          <div class="glosario-desc">Agua lluvia que corre por la superficie del terreno cuando no logra infiltrarse.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">L</div>
          <div class="glosario-title">Ladera</div>
          <div class="glosario-desc">Terreno inclinado o pendiente de una montaña o cerro. Medellín se encuentra entre la ladera oriental y ladera occidental que hace parte de la formación natural del Valle del Aburrá.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">M</div>
          <div class="glosario-title">Modelos geotécnicos por UMI</div>
          <div class="glosario-desc">Son análisis del terreno que ayudan a conocer cómo está compuesto el suelo, qué tan estable es y cómo puede reaccionar en cada zona del estudio.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">P</div>
          <div class="glosario-title">Perforación geotécnica</div>
          <div class="glosario-desc">Exploración del terreno con equipos especializados que permite tomar muestras y analizar distintas capas de suelo presentes en el lugar de la perforación.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">P</div>
          <div class="glosario-title">Plan de Ordenamiento Territorial - POT</div>
          <div class="glosario-desc">Instrumento que orienta cómo debe crecer y organizarse la ciudad. Este instrumento junto al Plan de Desarrollo y los instrumentos de gestión del riesgo y adaptación al cambio climático se consideran la triada del desarrollo sostenible de una ciudad.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">P</div>
          <div class="glosario-title">Presión urbanística</div>
          <div class="glosario-desc">Expansión o crecimiento urbano acelerado sobre zonas rurales o áreas protegidas.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">R</div>
          <div class="glosario-title">Riesgo</div>
          <div class="glosario-desc">Es la posibilidad de que una persona, una vivienda o una comunidad resulte afectada por un peligro como un deslizamiento, una inundación o una avenida torrencial. El riesgo no depende solo de que exista una amenaza, sino también de qué tan expuestas y vulnerables estén las personas y sus bienes.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">R</div>
          <div class="glosario-title">Riesgo mitigable</div>
          <div class="glosario-desc">Riesgo que puede reducirse con medidas y obras de intervención técnica.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">R</div>
          <div class="glosario-title">Riesgo no mitigable</div>
          <div class="glosario-desc">Riesgo que no puede reducirse a un nivel aceptable con obras o intervenciones razonables.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">S</div>
          <div class="glosario-title">Saturación del suelo</div>
          <div class="glosario-desc">Acumulación excesiva de agua dentro del terreno, reduciendo su estabilidad.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">S</div>
          <div class="glosario-title">Storytelling</div>
          <div class="glosario-desc">Es una manera de narrar lo que ocurre en el territorio, sus experiencias y sus cambios, usando relatos que ayuden a comprender mejor la información técnica.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">T</div>
          <div class="glosario-title">Tratamiento urbanístico</div>
          <div class="glosario-desc">Tipo de manejo que se define para una zona: consolidación, mejoramiento, protección, renovación, entre otros.</div>
        </div>
        <div class="glosario-card">
          <div class="glosario-letter">V</div>
          <div class="glosario-title">Vulnerabilidad</div>
          <div class="glosario-desc">Es qué tan expuestas o qué tan frágiles pueden ser las personas, las viviendas o las infraestructuras vitales frente a una amenaza.</div>
        </div>"""

with open('e:/Trabajo/Antigravity/PaginaWEB_Geohazards/web-page-gh-pages/comunidad.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = re.compile(r'<div class="glosario-card">\s*<div class="glosario-letter">A</div>\s*<div class="glosario-title">Apique</div>.*?<div class="glosario-card">\s*<div class="glosario-letter">V</div>\s*<div class="glosario-title">Vulnerabilidad</div>\s*<div class="glosario-desc">Es qué tan expuestas o qué tan frágiles pueden ser las personas, las viviendas o las infraestructuras vitales frente a una amenaza\.</div>\s*</div>', re.DOTALL)

new_html, count = pattern.subn(html_content, html)
if count == 0:
    print("Failed to replace glossary")
else:
    with open('e:/Trabajo/Antigravity/PaginaWEB_Geohazards/web-page-gh-pages/comunidad.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Glossary replaced successfully")
