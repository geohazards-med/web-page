import pandas as pd
from docx import Document
import sys

# Read excel
print("=== EXCEL DATA ===")
try:
    df = pd.read_excel('data/documentos/Data_Web_v2.xlsx', sheet_name='Comunidades', engine='openpyxl')
    print(df.to_dict('records'))
except Exception as e:
    print("Could not read Excel:", e)

# Read word
print("=== WORD DATA ===")
try:
    doc = Document('data/documentos/Contenidos.docx')
    for para in doc.paragraphs:
        print(para.text)
except Exception as e:
    print("Could not read Word:", e)
