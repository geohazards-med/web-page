import json, os, re, math
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
CHUNK = 3  # merge every N raw segments

results = {}

for lid, relpath in AUDIOS:
    fpath = os.path.join(BASE, relpath)
    print(f'Transcribing {lid}...', flush=True)
    segments, info = model.transcribe(fpath, language='es')
    raw = [(seg.start, seg.end, seg.text.strip()) for seg in segments]

    # merge
    merged = []
    for i in range(0, len(raw), CHUNK):
        chunk = raw[i:i+CHUNK]
        start = chunk[0][0]
        end = chunk[-1][1]
        text = re.sub(r'\s+', ' ', ' '.join(s[2] for s in chunk)).strip()
        merged.append((start, end, text))

    total_dur = merged[-1][1]
    # group into roughly equal display segments (target ~10-15s each)
    target_len = max(10, total_dur / 25)
    groups = []
    cur_group = []
    cur_end = 0
    for start, end, text in merged:
        cur_group.append((start, end, text))
        if end - cur_group[0][0] >= target_len:
            groups.append(cur_group)
            cur_group = []
    if cur_group:
        groups.append(cur_group)

    out = []
    for grp in groups:
        pct = (grp[-1][1] - grp[0][0]) / total_dur
        text = ' '.join(s[2] for s in grp)
        text = re.sub(r'\s+', ' ', text).strip()
        out.append({'pct': round(pct, 4), 'text': text})

    # normalize to sum 1.0
    total = sum(o['pct'] for o in out)
    if abs(total - 1.0) > 0.001:
        out[-1]['pct'] = round(out[-1]['pct'] + (1.0 - total), 4)

    results[lid] = out
    print(f'  {len(out)} segments, {total_dur:.0f}s', flush=True)

# Generate JS code
print('\n\n=== GENERATED JS ===\n')
for lid, segs in results.items():
    print(f'// {lid}')
    print('transcript: [')
    for s in segs:
        txt = s['text'].replace("'", "\\'")
        print(f"  {{ pct: {s['pct']:.4f}, text: '{txt}' }},")
    print('],')
    print()
