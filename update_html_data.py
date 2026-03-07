import re

with open('comunidad.html', 'r', encoding='utf-8') as f:
    comunidad = f.read()

# Replace Body Sections
com_body = """    <!-- ══ HERO COMUNIDAD ══════════════════════════════════ -->
    <section class="hero">
        <div class="hero-bg" style="background-image: url('bg/bg1.jpg'); filter: brightness(0.4);"></div>
        <div class="hero-content">
            <div class="hero-badge">&#127968; Universidad Nacional de Colombia · Medellín</div>
            <h1 style="color: white; font-size: 3.5rem; margin-bottom: 20px; font-weight: bold; font-family: 'Playfair Display', serif;">Comunidad Geohazards</h1>
            <p class="hero-sub" style="max-width: 800px; margin: 0 auto 2rem;">
                Garantizar la comprensión, apropiación y uso social e institucional de los resultados del estudio de riesgo de detalle, mediante procesos participativos de socialización, comunicación del riesgo y fortalecimiento de capacidades locales.
            </p>
            <div class="hero-meta">
                <div class="hero-meta-item">
                    <i class="fa-solid fa-users"></i>
                    Apropiación Social
                </div>
                <div class="hero-meta-item">
                    <i class="fa-solid fa-house-crack"></i>
                    Estudios de Riesgo de Detalle
                </div>
            </div>
        </div>
    </section>

    <!-- ══ FASES DEL TRABAJO TÉCNICO ════════════════════════════════ -->
    <section class="section" id="fases">
        <div class="container">
            <p class="section-badge">Trabajo de Campo y Gabinete</p>
            <h2 class="section-title">Fases del Trabajo Técnico</h2>
            <div class="divider"></div>
            
            <div class="topics-grid">
                <div class="topic-card">
                    <div class="topic-icon">🥾</div>
                    <div class="topic-title">Recorridos Técnicos</div>
                    <div class="topic-desc">Reconocer preliminarmente las condiciones del terreno y la geología local. Identificamos señales visibles como tipos de suelo, pendientes y evidencias de inestabilidad.</div>
                </div>
                <div class="topic-card">
                    <div class="topic-icon">🕳️</div>
                    <div class="topic-title">Perforaciones Geotécnicas</div>
                    <div class="topic-desc">Conocer qué materiales hay, a qué profundidad cambian, su firmeza y si hay agua subterránea. Se perfora, se toman muestras y se sella de forma segura.</div>
                </div>
                <div class="topic-card">
                    <div class="topic-icon">💻</div>
                    <div class="topic-title">Modelación</div>
                    <div class="topic-desc">Construcción de modelo geológico-geotécnico, hidrológico, microzonificación, escenarios de riesgo y modelos de estabilidad de laderas.</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ══ TABLERO DE INDICADORES ════════════════════════════════ -->
    <section class="section section-alt" id="datos">
        <div class="container">
            <p class="section-badge">Transmisión de Datos</p>
            <h2 class="section-title">Tablero de Indicadores</h2>
            <div class="divider"></div>
            <p class="section-desc">Características territoriales y base de datos simplificada para la población y vivienda.</p>
            
            <div style="overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); padding: 1rem;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 600px;">
                    <thead>
                        <tr style="background-color: var(--green-light); color: var(--green-dark);">
                            <th style="padding: 12px; border-bottom: 2px solid var(--green);">ID Vivienda</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--green);">Comuna</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--green);">Barrio</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--green);">Tratamiento</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--green);">Población</th>
                            <th style="padding: 12px; border-bottom: 2px solid var(--green);">Riesgo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px;">VIV-0001</td>
                            <td style="padding: 12px;">1</td>
                            <td style="padding: 12px;">Santo Domingo Savio</td>
                            <td style="padding: 12px;">Consolidación</td>
                            <td style="padding: 12px;">5</td>
                            <td style="padding: 12px;"><span style="color: #d97706; font-weight: bold;">Medio</span></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee; background-color: #fcfcfc;">
                            <td style="padding: 12px;">VIV-0002</td>
                            <td style="padding: 12px;">1</td>
                            <td style="padding: 12px;">Popular</td>
                            <td style="padding: 12px;">Mejoramiento Integral</td>
                            <td style="padding: 12px;">3</td>
                            <td style="padding: 12px;"><span style="color: #dc2626; font-weight: bold;">Alto</span></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px;">VIV-0003</td>
                            <td style="padding: 12px;">3</td>
                            <td style="padding: 12px;">Manrique</td>
                            <td style="padding: 12px;">Consolidación</td>
                            <td style="padding: 12px;">4</td>
                            <td style="padding: 12px;"><span style="color: #16a34a; font-weight: bold;">Bajo</span></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee; background-color: #fcfcfc;">
                            <td style="padding: 12px;">VIV-0004</td>
                            <td style="padding: 12px;">8</td>
                            <td style="padding: 12px;">Villa Hermosa</td>
                            <td style="padding: 12px;">Mejoramiento Integral</td>
                            <td style="padding: 12px;">6</td>
                            <td style="padding: 12px;"><span style="color: #dc2626; font-weight: bold;">Alto</span></td>
                        </tr>
                        <tr>
                            <td style="padding: 12px;">VIV-0005</td>
                            <td style="padding: 12px;">13</td>
                            <td style="padding: 12px;">San Javier</td>
                            <td style="padding: 12px;">Consolidación</td>
                            <td style="padding: 12px;">2</td>
                            <td style="padding: 12px;"><span style="color: #d97706; font-weight: bold;">Medio</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="margin-top: 2rem; text-align: center;">
                <a href="#" class="btn-register" style="display: inline-flex; align-items: center; gap: 0.5rem; background: var(--green); color: white; padding: 0.8rem 1.5rem; border-radius: 5px; text-decoration: none; font-weight: bold;">
                    <i class="fa-solid fa-download"></i> Descargar Base de Datos
                </a>
            </div>
        </div>
    </section>

    <!-- ══ PREGUNTAS FRECUENTES (FAQ) ════════════════════════════════ -->
    <section class="section" id="faq">
        <div class="container">
            <p class="section-badge">Dudas Comunes</p>
            <h2 class="section-title">Preguntas Frecuentes (FAQ)</h2>
            <div class="divider"></div>
            
            <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;">
                <!-- FAQ 1 -->
                <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
                    <h3 style="color: var(--green-dark); font-size: 1.1rem; margin-bottom: 0.5rem;">¿Las perforaciones afectan viviendas?</h3>
                    <p style="color: var(--text-mid); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                        Son actividades técnicas para conocer el suelo y evaluar el riesgo. En condiciones normales y con buenas prácticas, <strong>no deberían dañar las viviendas</strong>, pero sí pueden generar ruido o vibración temporal.
                    </p>
                </div>
                <!-- FAQ 2 -->
                <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
                    <h3 style="color: var(--green-dark); font-size: 1.1rem; margin-bottom: 0.5rem;">¿Qué ocurre si se identifica alto riesgo?</h3>
                    <p style="color: var(--text-mid); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                        Se define a partir de amenaza + vulnerabilidad. Para las zonas en riesgo alto, la norma exige definir si ese riesgo es <strong>mitigable</strong> (se formulan obras y acciones para reducir el riesgo) o <strong>no mitigable</strong> (se identifica para reasentamiento/reubicación de viviendas).
                    </p>
                </div>
                <!-- FAQ 3 -->
                <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
                    <h3 style="color: var(--green-dark); font-size: 1.1rem; margin-bottom: 0.5rem;">¿Quién decide y qué puede ordenar?</h3>
                    <p style="color: var(--text-mid); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                        En el Sistema Nacional de Gestión del Riesgo, el <strong>alcalde</strong> es el responsable directo. Si hay riesgo inminente, puede adoptar medidas urgentes de protección como la evacuación preventiva.
                    </p>
                </div>
                <!-- FAQ 4 -->
                <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem;">
                    <h3 style="color: var(--green-dark); font-size: 1.1rem; margin-bottom: 0.5rem;">¿Cómo participar?</h3>
                    <p style="color: var(--text-mid); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                        Asiste a las socializaciones, acompáñanos en los recorridos de intercambio de conocimientos, accede a nuestra página web y descarga nuestros informes y boletines.
                    </p>
                </div>
            </div>
        </div>
    </section>

"""

pattern = re.compile(
    r'<!-- ══ HERO COMUNIDAD ══════════════════════════════════ -->.*?<!-- ══ FOOTER ══════════════════════════════════════════ -->', 
    re.DOTALL
)

comunidad = pattern.sub(com_body + '    <!-- ══ FOOTER ══════════════════════════════════════════ -->', comunidad)

with open('comunidad.html', 'w', encoding='utf-8') as f:
    f.write(comunidad)
