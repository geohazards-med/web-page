import json, os, re
from faster_whisper import WhisperModel

model = WhisperModel('base', device='cpu', compute_type='int8')

AUDIOS = [
    ('m1-intro',     'curso/audios/Intro_Módulo_1.mp3'),
    ('m2-intro',     'curso/audios/Intro_Modulo_2.mp3'),
    ('m2-burnor',    'curso/audios/M2_BURNOR.mp3'),
    ('m2-eep',       'curso/audios/M2_EEP.mp3'),
    ('m2-riesgo',    'curso/audios/M2_Riesgo y territorio.mp3'),
    ('m2-tensiones', 'curso/audios/M2_Tensiones.mp3'),
    ('m3-intro',     'curso/audios/Intro_Modulo_3.mp3'),
    ('m3-clima',     'curso/audios/M3_CambioClimatico.mp3'),
    ('m4-intro',     'curso/audios/Intro_Módulo 4.mp3'),
]

BASE = r'E:\Trabajo\1-OpenCode\web-page'
CHUNK = 4  # merge every N whisper segments into one display segment

for lid, relpath in AUDIOS:
    fpath = os.path.join(BASE, relpath)
    print(f'\n=== {lid} === {relpath}')
    segments, info = model.transcribe(fpath, language='es')
    raw = [(seg.start, seg.end, seg.text.strip()) for seg in segments]
    print(f'  raw segments: {len(raw)}')

    # merge into larger chunks
    merged = []
    for i in range(0, len(raw), CHUNK):
        chunk = raw[i:i+CHUNK]
        start = chunk[0][0]
        end = chunk[-1][1]
        text = ' '.join(s[2] for s in chunk)
        merged.append((start, end, text))

    total_dur = merged[-1][1] if merged else 1
    print(f'  merged: {len(merged)}, duration: {total_dur:.0f}s')

    out = []
    for start, end, text in merged:
        pct = (end - start) / total_dur
        text_clean = re.sub(r'\s+', ' ', text).strip()
        out.append({'pct': round(pct, 4), 'text': text_clean})

    # Normalize to sum = 1.0
    total = sum(o['pct'] for o in out)
    if total > 0:
        out[-1]['pct'] = round(out[-1]['pct'] + (1.0 - total), 4)

    print(f'  output entries: {len(out)}')
    for o in out:
        print(f'    {o["pct"]:.2f}  {o["text"][:80]}...')
