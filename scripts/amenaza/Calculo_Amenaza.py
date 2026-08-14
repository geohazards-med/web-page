import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.lines import Line2D
from pathlib import Path
import os
import json
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from datetime import datetime, timedelta
import pandas as pd
import requests

BASE_DIR = Path(__file__).resolve().parent


def data_ideam(codigo_estacion, name):
    # URL de la API
    base_url = "https://www.datos.gov.co/resource/s54a-sgyg.json"

    # Define la estación que quieres filtrar
    # codigo_estacion = "0023097030"  # Cambia esto por el identificador de tu estación
    day_prev = 89

    end_date = datetime.now()
    start_date = (end_date + timedelta(days=-day_prev))

    end_date = end_date.strftime('%Y-%m-%d')
    start_date = start_date.strftime('%Y-%m-%d')

    print(f"Descargando datos de la estación {codigo_estacion} desde {start_date} hasta {end_date}...")
    # Inicializa una lista vacía para almacenar los datos
    all_data = []

    # Define los parámetros para la consulta
    limit = 500000  # Número máximo de filas por consulta
    offset = 0      # Inicio desde la primera fila
    fetch_error = None

    while True:
        # Configura los parámetros de la consulta
        params = {
            "$limit": limit,
            "$offset": offset,
            "$where": f"CodigoEstacion = '{codigo_estacion}' AND fechaobservacion >= '{start_date}' AND fechaobservacion <= '{end_date}'"
        }

        # Realiza la solicitud a la API
        response = requests.get(base_url, params=params)

        # Verifica si la respuesta fue exitosa
        if response.status_code != 200:
            fetch_error = f"La API de IDEAM respondió con error {response.status_code} para la estación {codigo_estacion}."
            print(fetch_error)
            break
        
        # Parsear la respuesta JSON
        data = response.json()
        
        # Salir del bucle si no hay más datos
        if not data:
            break
        
        # Agregar los datos obtenidos a la lista
        all_data.extend(data)
        
        # Incrementar el offset para la próxima consulta
        offset += limit
        print(f"Descargados {len(all_data)} registros hasta ahora...")
        
    # Convertir los datos a un DataFrame de Pandas
    df = pd.DataFrame(all_data)

    if df.empty:
        warning = fetch_error or (
            f"Sin datos de IDEAM para la estación {codigo_estacion} en el rango solicitado."
        )
        print(warning)
        return 0, 0, warning

    df['fechaobservacion'] = pd.to_datetime(df['fechaobservacion'], errors='coerce', format='%Y-%m-%dT%H:%M:%S.%f')

    # # Ordenar por fechaobservacion
    df = df.sort_values(by='fechaobservacion')
    df['valorobservado'] = pd.to_numeric(df['valorobservado'], errors='coerce')
    y = df['valorobservado'].sum()
    x = df['valorobservado'].tail(6).sum()


    # Guardar el DataFrame en un archivo CSV
    output_dir = BASE_DIR / "Data_lluvia" / "IDEAM"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{name}.csv"
    df.to_csv(output_path, index=False)

    print(f"Datos descargados y guardados en: {output_path}")
    print(x, y)

    return x, y, None

def process_rainfall_file(file_path, window_size):
    """Procesa un archivo de datos de lluvia"""
    data = pd.read_csv(file_path)
    data['Fecha'] = pd.to_datetime(data['Fecha'])
    data = data.sort_values(by='Fecha')
    
    # Calcular acumulado y eventos
    period_name = f'{window_size}_day_sum'
    data[period_name] = data['Valor'].rolling(window=window_size, min_periods=1).sum()
    data['is_event'] = data['Valor'] >= 1
    
    return data

def create_rainfall_plot(data, station_name, window_size, xpoint, ypoint, 
                        logo_path=None, logo_zoom=0.15, logo_offset=(0.01, 0.95)):
    """Crea el gráfico de lluvia con zonas de riesgo y logo"""
    period_name = f'{window_size}_day_sum'
    
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Definir parámetros de los umbrales (invertidos)
    y_bajo_medio = [0, 1200]
    x_bajo_medio = [40, 0]
    
    y_medio_alto = [0, 2000]
    x_medio_alto = [60, 0]
    
    # Calcular ecuaciones de las rectas
    m_bajo = (x_bajo_medio[1] - x_bajo_medio[0]) / (y_bajo_medio[1] - y_bajo_medio[0])
    b_bajo = x_bajo_medio[0] - m_bajo * y_bajo_medio[0]
    
    m_alto = (x_medio_alto[1] - x_medio_alto[0]) / (y_medio_alto[1] - y_medio_alto[0])
    b_alto = x_medio_alto[0] - m_alto * y_medio_alto[0]
    
    # Generar puntos para las áreas
    y_max = max(data[period_name].max(), 2100) + 50
    y = np.linspace(0, y_max, 500)
    
    x_umbral_bajo = np.clip(m_bajo * y + b_bajo, 0, None)
    x_umbral_alto = np.clip(m_alto * y + b_alto, 0, None)
    
    # Crear zonas de color
    ax.fill_betweenx(y, 0, x_umbral_bajo, color='green', alpha=0.3)
    ax.fill_betweenx(y, x_umbral_bajo, x_umbral_alto, color='yellow', alpha=0.3)
    ax.fill_betweenx(y, x_umbral_alto, data['Valor'].max()+50, color='red', alpha=0.3)
    
    # Dibujar líneas de umbral
    ax.plot(x_bajo_medio, y_bajo_medio, 'k:', lw=3, label='Umbral bajo-medio')
    ax.plot(x_medio_alto, y_medio_alto, 'k--', lw=2, label='Umbral medio-alto')
    
    # Ajustar límites del gráfico
    ax.set_ylim(0, y_max)
    ax.set_xlim(0, max(data['Valor'].max(), x_medio_alto[0]) + 20)
    
    # Configuración del gráfico
    ax.set_ylabel(f'Lluvia acumulada de {window_size} días (mm)')
    ax.set_xlabel('Lluvia diaria (mm)')
    #ax.set_title(f'Análisis de Precipitación - {station_name} ({window_size} días)')
    ax.grid(True, alpha=0.3)
    
     # Agregar el punto (x, y)
    ax.scatter(xpoint, ypoint, color='blue', s=100, label='Observación actual', zorder=5)
    # ax.text(xpoint, ypoint, f'({xpoint:.1f}, {ypoint:.1f})', color='blue', fontsize=10, ha='left', va='bottom')
 
    
    # Agregar logo si existe la ruta
    if logo_path and os.path.exists(logo_path):
        try:
            img = plt.imread(logo_path)
            imagebox = OffsetImage(img, zoom=logo_zoom)
            ab = AnnotationBbox(imagebox, 
                              (logo_offset[0], logo_offset[1]),
                              xycoords='axes fraction',
                              box_alignment=(0, 1),
                              frameon=False)
            ax.add_artist(ab)
        except Exception as e:
            print(f"Error cargando el logo: {str(e)}")
    
    # Leyenda
    legend_elements = [
        Patch(facecolor='green', alpha=0.3, label='Zona segura'),
        Patch(facecolor='yellow', alpha=0.3, label='Zona de atención'),
        Patch(facecolor='red', alpha=0.3, label='Zona crítica'),
        Line2D([0], [0], color='k', linestyle=':', lw=3, label='Umbral bajo-medio'),
        Line2D([0], [0], color='k', linestyle='--', lw=2, label='Umbral medio-alto')
    ]
    
    ax.legend(handles=legend_elements, loc='upper right')
    
    current_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ax.text(0.99, 0.01, f"Creado el: {current_datetime}",
            transform=ax.transAxes, ha='right', va='bottom', fontsize=10, color='black')
    
    plt.tight_layout()
    return fig

def process_subregion(subregion_name, input_folder, output_folder, x, y, logo_path=None):
    """Procesa una subregión específica. Devuelve una lista de errores (vacía si todo salió bien)."""
    input_path = Path(input_folder) / f"{subregion_name}.csv"

    if not input_path.exists():
        error = f"Archivo no encontrado para la subregión: {subregion_name}"
        print(error)
        return [error]

    output_path = Path(output_folder)
    output_path.mkdir(parents=True, exist_ok=True)

    window_sizes = [90]
    errors = []

    for window in window_sizes:
        try:
            data = process_rainfall_file(input_path, window)
            fig = create_rainfall_plot(data, subregion_name, window, x, y, logo_path)
            fig.savefig(output_path / f"{subregion_name}_{window}d.png",
                       bbox_inches='tight', dpi=300)
            plt.close(fig)
            print(f"Gráfico generado: {subregion_name} {window}d")
        except Exception as e:
            error = f"Error procesando {subregion_name} ({window}d): {str(e)}"
            print(error)
            errors.append(error)

    return errors

def list_available_subregions(input_folder):
    """Lista las subregiones disponibles"""
    csv_files = list(Path(input_folder).glob("*.csv"))
    return [f.stem for f in csv_files]


if __name__ == "__main__":
    # Configuración personalizable
    INPUT_FOLDER = BASE_DIR / "SUBREGIONES"

    # DONDE SE GUARDAN LAS FIGURAS.
    # Por defecto se guardan en scripts/amenaza/Images (para pruebas locales).
    # En el workflow del repo "web-page" se debe fijar la variable de entorno
    # AMENAZA_OUTPUT_DIR apuntando a la carpeta que ese repo sirve como "graphs"
    # (la misma ruta que hoy ocupa public/graphs en el build de este repo).
    OUTPUT_FOLDER = Path(os.environ.get("AMENAZA_OUTPUT_DIR", BASE_DIR / "Images"))

    # Listar subregiones disponibles
    available_subregions = list_available_subregions(INPUT_FOLDER)
    print("Subregiones disponibles:", available_subregions)

    SELECTED_SUBREGIONS = ['Occidente', 'Norte', 'Sureste', 'Nordeste', 'Bajo cauca', 'Oriente']  
    SELECTED_NAME_SUBREGIONS = ['DABEIBA', 'PARAMO BELMIRA', 'PUENTE IGLESIAS', 'MACEO', 'MARGENTO', 'PUERTO BERRIO']  
    SELECTED_COD_SUBREGIONS = ['0011117050', '0027015280', '0026207030', '0023105070', '0025027050', '0023097030']  


    # Procesar las seleccionadas
    run_log = {
        "fecha_ejecucion": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "resultados": [],
    }

    for index, subregion in enumerate(SELECTED_SUBREGIONS):
        estacion_nombre = SELECTED_NAME_SUBREGIONS[index]
        estacion_codigo = SELECTED_COD_SUBREGIONS[index]
        entry = {
            "subregion": subregion,
            "estacion_nombre": estacion_nombre,
            "estacion_codigo": estacion_codigo,
            "status": "ok",
            "error": None,
        }

        if subregion not in available_subregions:
            entry["status"] = "error"
            entry["error"] = f"No se encontró el archivo CSV de la subregión en {INPUT_FOLDER}"
            print(f"\nAdvertencia: Subregión no encontrada - {subregion}")
            run_log["resultados"].append(entry)
            continue

        print(f"\nProcesando: {subregion}")
        print(f"\nindex: {index}")
        try:
            x, y, warning = data_ideam(estacion_codigo, estacion_nombre)
            plot_errors = process_subregion(
                subregion,
                INPUT_FOLDER,
                OUTPUT_FOLDER,
                x,
                y,
                BASE_DIR / "SUBREGIONES" / f"{subregion}.png",
            )

            if plot_errors:
                entry["status"] = "error"
                entry["error"] = "; ".join(plot_errors)
            elif warning:
                entry["status"] = "sin_datos"
                entry["error"] = warning
        except Exception as e:
            error = f"Error procesando la subregión {subregion}: {str(e)}"
            print(error)
            entry["status"] = "error"
            entry["error"] = error

        run_log["resultados"].append(entry)

    OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)
    log_path = OUTPUT_FOLDER / "ultima_corrida.json"
    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(run_log, f, ensure_ascii=False, indent=2)
    print(f"\nLog de la corrida guardado en: {log_path}")