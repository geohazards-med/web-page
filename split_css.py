html_path = "/home/edier/GoogleDrive/INVESTIGACION/GRUPOS DE INVESTIGACION/GEOHAZARDS/web-page/comunidad.html"
css_path = "/home/edier/GoogleDrive/INVESTIGACION/GRUPOS DE INVESTIGACION/GEOHAZARDS/web-page/assets/css/comunidad.css"

with open(html_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

style_start = -1
style_end = -1
for i, line in enumerate(lines):
    if "<style>" in line and style_start == -1:
        style_start = i
    if "</style>" in line and style_end == -1:
        style_end = i
        break

if style_start != -1 and style_end != -1:
    css_content = lines[style_start+1:style_end]
    import os
    os.makedirs(os.path.dirname(css_path), exist_ok=True)
    with open(css_path, "w", encoding="utf-8") as f:
        f.writelines(css_content)
    
    new_html = lines[:style_start] + ["    <link rel=\"stylesheet\" href=\"assets/css/comunidad.css\">\n"] + lines[style_end+1:]
    with open(html_path, "w", encoding="utf-8") as f:
        f.writelines(new_html)
    print("Done extracting CSS")
else:
    print("Could not find <style> or </style>")
