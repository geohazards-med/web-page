import re

with open('simposio.html', 'r', encoding='utf-8') as f:
    simposio = f.read()

# Update simposio.html navbar
nav_target = """        <ul class="navbar-links">
            <li class="hide-sm"><a href="https://geohazards.com.co/aboutus">Quiénes Somos</a></li>
            <li class="hide-sm"><a href="https://geohazards.com.co/projects">Proyectos</a></li>
            <li><a href="https://geohazards.com.co/simposio.html" class="active">Simposio</a></li>
            <li class="hide-sm"><a href="https://geohazards.com.co/publications">Publicaciones</a></li>"""
nav_replace = """        <ul class="navbar-links">
            <li class="hide-sm"><a href="https://geohazards.com.co/aboutus">Quiénes Somos</a></li>
            <li class="hide-sm"><a href="https://geohazards.com.co/projects">Proyectos</a></li>
            <li><a href="https://geohazards.com.co/simposio.html" class="active">Simposio</a></li>
            <li><a href="https://geohazards.com.co/comunidad.html">Comunidad</a></li>
            <li class="hide-sm"><a href="https://geohazards.com.co/publications">Publicaciones</a></li>"""

simposio = simposio.replace(nav_target, nav_replace)

# Update simposio.html footer
footer_target = """            <div class="footer-col">
                <h4>Navegación</h4>
                <a href="https://geohazards.com.co/">Inicio</a>
                <a href="https://geohazards.com.co/aboutus">Quiénes Somos</a>
                <a href="https://geohazards.com.co/projects">Proyectos</a>
                <a href="https://geohazards.com.co/publications">Publicaciones</a>"""
footer_replace = """            <div class="footer-col">
                <h4>Navegación</h4>
                <a href="https://geohazards.com.co/">Inicio</a>
                <a href="https://geohazards.com.co/aboutus">Quiénes Somos</a>
                <a href="https://geohazards.com.co/projects">Proyectos</a>
                <a href="https://geohazards.com.co/simposio.html">Simposio</a>
                <a href="https://geohazards.com.co/comunidad.html">Comunidad</a>
                <a href="https://geohazards.com.co/publications">Publicaciones</a>"""

simposio = simposio.replace(footer_target, footer_replace)

with open('simposio.html', 'w', encoding='utf-8') as f:
    f.write(simposio)

# Now create comunidad.html based on SIMPOSIO
with open('comunidad.html', 'r', encoding='utf-8') as f:
    comunidad = f.read()

# Fix Title
comunidad = re.sub(r'<title>.*?</title>', '<title>Comunidad Geohazards - Investigación y Participación</title>', comunidad)

# Fix Navbar for comunidad (active tab)
nav_replace_com = """        <ul class="navbar-links">
            <li class="hide-sm"><a href="https://geohazards.com.co/aboutus">Quiénes Somos</a></li>
            <li class="hide-sm"><a href="https://geohazards.com.co/projects">Proyectos</a></li>
            <li><a href="https://geohazards.com.co/simposio.html">Simposio</a></li>
            <li><a href="https://geohazards.com.co/comunidad.html" class="active">Comunidad</a></li>
            <li class="hide-sm"><a href="https://geohazards.com.co/publications">Publicaciones</a></li>"""
comunidad = comunidad.replace(nav_target, nav_replace_com)
comunidad = comunidad.replace(footer_target, footer_replace)

# Replace Body Sections
com_body = """    <!-- ══ HERO COMUNIDAD ══════════════════════════════════ -->
    <section class="hero">
        <div class="hero-bg" style="background-image: url('bg/bg1.jpg'); filter: brightness(0.4);"></div>
        <div class="hero-content">
            <div class="hero-badge">&#127968; Universidad Nacional de Colombia · Medellín</div>
            <h1 style="color: white; font-size: 3rem; margin-bottom: 20px; font-weight: bold; font-family: 'Playfair Display', serif;">Comunidad Geohazards</h1>
            <p class="hero-sub" style="max-width: 700px; margin: 0 auto 2rem;">
                Únete a nuestra red de investigadores, estudiantes y profesionales apasionados por las geociencias y la gestión del riesgo de desastres.
            </p>
            <div class="hero-meta">
                <div class="hero-meta-item">
                    <i class="fa-solid fa-users"></i>
                    Red Colaborativa
                </div>
                <div class="hero-meta-item">
                    <i class="fa-solid fa-graduation-cap"></i>
                    Investigación Continua
                </div>
            </div>
            <a href="mailto:geohazards_med@unal.edu.co" class="hero-cta">
                <i class="fa-solid fa-envelope"></i> Contáctanos y Participa
            </a>
        </div>
    </section>

    <!-- ══ SOBRE LA COMUNIDAD ════════════════════════════════ -->
    <section class="section" id="sobre">
        <div class="container">
            <div class="about-grid">
                <div class="about-text">
                    <p class="section-badge">Nuestra Experiencia</p>
                    <h2 class="section-title">¿Qué es la Comunidad Geohazards?</h2>
                    <div class="divider"></div>
                    <p>
                        La <strong>Comunidad Geohazards</strong> es un espacio de integración y colaboración promovido por el Semillero de Investigación de la Universidad Nacional de Colombia – Sede Medellín.
                    </p>
                    <p>
                        Buscamos congregar a personas interesadas en el estudio de amenazas naturales de origen geológico e hidrometeorológico. A través del intercambio de conocimientos y experiencias, nuestro objetivo es formar a la próxima generación de expertos y fomentar la investigación aplicada para el beneficio de la sociedad y la adecuada toma de decisiones en el territorio.
                    </p>
                </div>
                <div class="about-img">
                    <img src="bg/bg6.jpg" alt="Comunidad Geohazards" style="border-radius: var(--radius); box-shadow: var(--shadow); width: 100%;" />
                </div>
            </div>
        </div>
    </section>

    <!-- ══ ACTIVIDADES ═══════════════════════════════════════ -->
    <section class="section section-alt" id="actividades">
        <div class="container">
            <p class="section-badge">Involúcrate</p>
            <h2 class="section-title">Actividades de la Comunidad</h2>
            <div class="divider"></div>
            <div class="topics-grid">
                <div class="topic-card">
                    <div class="topic-icon">📚</div>
                    <div class="topic-title">Grupos de Estudio</div>
                    <div class="topic-desc">Reuniones semanales para discutir artículos científicos, avances metodológicos y fortalecer bases teóricas.</div>
                </div>
                <div class="topic-card">
                    <div class="topic-icon">🥾</div>
                    <div class="topic-title">Salidas de Campo</div>
                    <div class="topic-desc">Recorridos técnicos por zonas de interés geológico para el rconocimiento y entendimiento in-situ de fenómenos.</div>
                </div>
                <div class="topic-card">
                    <div class="topic-icon">💻</div>
                    <div class="topic-title">Talleres y Capacitaciones</div>
                    <div class="topic-desc">Sesiones prácticas de software (SIG, modelos numéricos, Python) orientadas a la investigación aplicada.</div>
                </div>
                <div class="topic-card">
                    <div class="topic-icon">🤝</div>
                    <div class="topic-title">Proyectos Colaborativos</div>
                    <div class="topic-desc">Participación en iniciativas e investigaciones interinstitucionales que buscan resolver problemas reales.</div>
                </div>
            </div>
        </div>
    </section>

"""

# Regex to replace everything from <!-- ══ HERO ════════════════════════════════════════════ --> 
# to <!-- ══ FOOTER ══════════════════════════════════════════ -->
pattern = re.compile(
    r'<!-- ══ HERO ════════════════════════════════════════════ -->.*?<!-- ══ FOOTER ══════════════════════════════════════════ -->', 
    re.DOTALL
)

comunidad = pattern.sub(com_body + '    <!-- ══ FOOTER ══════════════════════════════════════════ -->', comunidad)

# Remove the countdown JS script at the end of the file since it's only for Simposio
count_down_pattern = re.compile(
    r'<!-- ══ COUNTDOWN SCRIPT ════════════════════════════════ -->.*?</script>',
    re.DOTALL
)
comunidad = count_down_pattern.sub('', comunidad)

with open('comunidad.html', 'w', encoding='utf-8') as f:
    f.write(comunidad)
