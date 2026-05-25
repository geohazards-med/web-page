import re

with open('e:/Trabajo/Antigravity/PaginaWEB_Geohazards/web-page-gh-pages/comunidad.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = re.compile(r'<h2 class="section-title-gsap">Histórico de Eventos en el Territorio</h2>.*?<div class="evento-item">\s*<div class="evento-fecha">Dic 2017 – Ene 2018</div>\s*<div class="evento-content">\s*<h4>Deslizamiento y caída de rocas — Versalles No\. 2</h4>\s*<div class="evento-lugar">C3, Manrique</div>\s*<div class="evento-consecuencia">13 casas afectadas</div>\s*</div>\s*</div>', re.DOTALL)

replacement = """<h2 class="section-title-gsap">Histórico de eventos en el territorio</h2>
      <p class="section-subtitle-gsap">Eventos geológicos y situaciones de riesgo que han marcado el territorio y que hoy permiten comprender la importancia de realizar los estudios de detalle.</p>

      <div class="evento-item riesgo-alto">
        <div class="evento-fecha">Jul 1954</div>
        <div class="evento-content">
          <h4>Movimiento en masa — Media Luna</h4>
          <div class="evento-lugar">Media Luna</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● +60 fallecidos</span>
            Movimiento en masa de grandes proporciones que sepultó un par de viviendas y dejó 5 personas sepultadas; en el proceso de rescate perecieron más de 60 personas.
          </div>
        </div>
      </div>

      <div class="evento-item riesgo-alto">
        <div class="evento-fecha">Sep 1974</div>
        <div class="evento-content">
          <h4>Movimiento en masa — Santo Domingo Savio</h4>
          <div class="evento-lugar">C1, Santo Domingo Savio</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● >80 fallecidos</span>
            Detonado por lluvias y la falta de un sistema de alcantarillado.
          </div>
        </div>
      </div>

      <div class="evento-item riesgo-alto">
        <div class="evento-fecha">Sep 1987</div>
        <div class="evento-content">
          <h4>Deslizamiento — Villatina</h4>
          <div class="evento-lugar">C8, Villatina</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● +500 fallecidos</span>
            Catalogado como uno de los desastres urbanos más grandes del siglo 20. Se destruyeron cerca de 100 viviendas y hubo unos 2.400 damnificados.
          </div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">Sep 1992</div>
        <div class="evento-content">
          <h4>Deslizamiento — Versalles No. 2</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">3 familias evacuadas · Detonante: error antrópico por extracción de material</div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">Sep–Oct 1994</div>
        <div class="evento-content">
          <h4>Deslizamiento — La Cruz, La Capilla</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● 1 fallecido</span>
            Afectación de 6 viviendas · Detonante: lluvias y saturación
          </div>
        </div>
      </div>

      <div class="evento-item riesgo-alto">
        <div class="evento-fecha">Abr 1996</div>
        <div class="evento-content">
          <h4>Avenida torrencial — Versalles No. 2</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● Crítico</span>
            52 casas afectadas · 260 damnificados · Detonante: lluvias + obstrucción del cauce
          </div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">Sep 1999</div>
        <div class="evento-content">
          <h4>Deslizamiento — Bello Oriente</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● 1 fallecido</span>
            Detonante: lluvias intensas
          </div>
        </div>
      </div>

      <div class="evento-item riesgo-alto">
        <div class="evento-fecha">May 2004</div>
        <div class="evento-content">
          <h4>Deslizamiento — La Cruz, Altos de la Cruz</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● 8 fallecidos</span>
            Inestabilidad recurrente · Detonante: acumulación de agua + drenaje (tubo madre EPM)
          </div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">May 2006</div>
        <div class="evento-content">
          <h4>Flujo de lodos y detritos — La Cruz, La Capilla</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● 1 fallecido</span>
            Detonante: lluvia intensa + aporte de material de calle en afirmado
          </div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">2009</div>
        <div class="evento-content">
          <h4>Colapso de viviendas — La Cruz</h4>
          <div class="evento-lugar">C3, cerca a I.E. La Cruz</div>
          <div class="evento-consecuencia">5 viviendas afectadas · Detonante: saturación + fallas de cimentación</div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">Dic 2014</div>
        <div class="evento-content">
          <h4>Deslizamiento — Bello Oriente</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">Evacuación preventiva de 11 familias · Detonante: exceso de lluvias</div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">Jun 2017</div>
        <div class="evento-content">
          <h4>Deslizamiento — Bello Oriente</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">6 viviendas afectadas · Detonante: lluvias e inestabilidad</div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">Dic 2017 – Ene 2018</div>
        <div class="evento-content">
          <h4>Deslizamiento y caída de rocas — Versalles No. 2</h4>
          <div class="evento-lugar">C3, Manrique</div>
          <div class="evento-consecuencia">13 casas afectadas</div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">Nov 2021</div>
        <div class="evento-content">
          <h4>Inundaciones — Santo Domingo Savio</h4>
          <div class="evento-lugar">C1, Santo Domingo Savio</div>
          <div class="evento-consecuencia">
            Más de 50 estructuras afectadas. Detonante: carga de aguas lluvias y represamiento por escombros en Cañada Seca y Cañada Negra.
          </div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">Jun 2022</div>
        <div class="evento-content">
          <h4>Movimiento en masa — Llanaditas, El Faro</h4>
          <div class="evento-lugar">C8, Llanaditas</div>
          <div class="evento-consecuencia">
            Afectó 9 viviendas (5 de ellas en pérdida total).
          </div>
        </div>
      </div>

      <div class="evento-item">
        <div class="evento-fecha">May 2025</div>
        <div class="evento-content">
          <h4>Movimiento en masa — Villatina, La Libertad</h4>
          <div class="evento-lugar">C8, Villatina</div>
          <div class="evento-consecuencia">
            Afectó 53 viviendas (3 colapsadas) y cerca de 50 familias evacuadas.
          </div>
        </div>
      </div>

      <div class="evento-item riesgo-alto">
        <div class="evento-fecha">Jun 2025</div>
        <div class="evento-content">
          <h4>Movimiento en masa — Granizal</h4>
          <div class="evento-lugar">Límites Medellín-Bello, Granizal</div>
          <div class="evento-consecuencia">
            <span class="fallecidos-badge">● 25 fallecidos</span>
            Arrastró ~70.000 m³ de tierra. Afectó a 1.984 personas (487 familias), decenas de viviendas destruidas y más de 15 heridos.
          </div>
        </div>
      </div>"""

new_html, count = pattern.subn(replacement, html)
if count == 0:
    print("Failed to match pattern")
else:
    with open('e:/Trabajo/Antigravity/PaginaWEB_Geohazards/web-page-gh-pages/comunidad.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Replaced successfully")
