import os
from flask import jsonify, request
import pandas as pd
from app.routes import graficos_bp

@graficos_bp.route('/valores_nulos', methods=["GET"])
def valores_nulos():
    df = pd.read_csv(os.path.join(os.getcwd(),'weatherAUS.csv'))
    data = []
    columnas = []
    valores = []
    for feature in df.columns:
        # print('Total de valores nulos de', feature, '=', df[feature].isna().sum())
        columnas.append(feature)
        valores.append(df[feature].isna().sum().item())
        
        data.append({
            "column":feature,
            "value":df[feature].isna().sum().item()
            })
       
    
    prueba = {
        "columnas":columnas,
        "valores":valores
    }
    return jsonify({
        "success":True,
        "data":prueba
    })
    
@graficos_bp.route('/temperatura_anio', methods=["POST"])
def temp_anios():
    df = pd.read_csv(os.path.join(os.getcwd(),'weatherAUS.csv'))
    datos = request.json
    data = {}
    
    anio1 = datos['anio1']
    anio2 = datos['anio2']
    anio3 = datos['anio3']
    anio4 = datos['anio4']
    ciudad = datos['ciudad']
    
    df['avg_temp'] = (df['MinTemp'] + df['MaxTemp']) / 2 # Se crea la variable de temperatura promedio

    y1 = df[df['Date'].str.contains(str(anio1))]
    y2 = df[df['Date'].str.contains(str(anio2))] # Se guardan los años de muestra
    y3 = df[df['Date'].str.contains(str(anio3))]
    y4 = df[df['Date'].str.contains(str(anio4))]

    sydney1 = y1[y1['Location'] == ciudad]
    sydney2 = y2[y2['Location'] == ciudad] # Se filtra los datos de una cuidad por año
    sydney3 = y3[y3['Location'] == ciudad]
    sydney4 = y4[y4['Location'] == ciudad]

    sydney1['month'] = pd.to_datetime(sydney1['Date']).dt.month
    sydney2['month'] = pd.to_datetime(sydney2['Date']).dt.month
    sydney3['month'] = pd.to_datetime(sydney3['Date']).dt.month
    sydney4['month'] = pd.to_datetime(sydney4['Date']).dt.month
    
    sydney1['month'] = pd.to_numeric(sydney1['month'])
    sydney1.drop('Date', axis=1, inplace=True)
    sydney1.drop('Location', axis=1, inplace=True)
    sydney1 = sydney1.loc[:,['avg_temp','month']]
    sydney2 = sydney2.loc[:,['avg_temp','month']]
    sydney3 = sydney3.loc[:,['avg_temp','month']]
    sydney4 = sydney4.loc[:,['avg_temp','month']]

    print("=====================")
    print(ciudad)
    print(request.json)
    print("=====================")
    temp_by_month1 = sydney1.groupby('month').mean()['avg_temp']
    temp_by_month2 = sydney2.groupby('month').mean()['avg_temp']
    temp_by_month3 = sydney3.groupby('month').mean()['avg_temp'] # Se agrupa temperatura por mes
    temp_by_month4 = sydney4.groupby('month').mean()['avg_temp']
    
    data = {
        "anio1":temp_by_month1.to_dict(),
        "anio2":temp_by_month2.to_dict(),
        "anio3":temp_by_month3.to_dict(),
        "anio4":temp_by_month4.to_dict(),
    }
    
    return jsonify({
        "success":True,
        "data":data
    })
    
@graficos_bp.route('/velocidad_viento', methods=["POST"])
def velocidad_viento():
    datos = request.json
    
    df = pd.read_csv(os.path.join(os.getcwd(),'weatherAUS.csv'))
    df['avg_temp'] = (df['MinTemp'] + df['MaxTemp']) / 2 # temperatura promedio
    year_data = df[df['Date'].str.contains(str(datos['anio']))] # se extrae el dato del año a trabajar

    ciudad = year_data[year_data['Location'] == datos['ciudad']]
    
    ciudad['month'] = pd.to_datetime(ciudad['Date']).dt.month
    
    ciudad.drop('Date', axis=1, inplace=True)
    ciudad.drop('Location', axis=1, inplace=True)
    ciudad = ciudad.loc[:,['month','WindGustSpeed']]
    
    wind_city = ciudad.groupby('month').mean()['WindGustSpeed'].reset_index(name='viento')

    data = wind_city.to_dict()
    

    return jsonify({
        "success":True,
        "data":data
    })
    
@graficos_bp.route('/comparacion',methods=["POST"])
def compararDatos():
    datos = request.json
    anio = datos['anio']
    ciudad = datos['ciudad']
    
    variable1 = datos['variable1'].lower()
    variable2 = datos['variable2'].lower()
    
    df = pd.read_csv(os.path.join(os.getcwd(),'weatherAUS.csv'))
    df['avg_temp'] = (df['MinTemp'] + df['MaxTemp']) / 2
    df = df[df['Date'].str.contains(str(anio))]
    
    df_filtered = df[df['Location'] == ciudad]
    df_filtered['month'] = pd.to_datetime(df_filtered['Date']).dt.month
    
    df_filtered.drop('Date',axis=1,inplace=True)
    df_filtered.drop('Location',axis=1,inplace=True)
    df_filtered.drop('WindDir3pm',axis=1,inplace=True)
    df_filtered.drop('WindDir9am',axis=1,inplace=True)
    
    df_nueva = df_filtered.loc[:,['month','avg_temp','Humidity3pm', 'WindGustSpeed']]
    
    df_viento = df_nueva.groupby('month').mean()['WindGustSpeed'].reset_index(name='viento')
    df_temp = df_nueva.groupby('month').mean()['avg_temp'].reset_index(name='temperatura')
    df_humedad = df_nueva.groupby('month').mean()['Humidity3pm'].reset_index(name='humedad')
    
    
    df_nuevaFinal = pd.merge(df_viento,df_temp)
    
    df_nuevaFinal = pd.merge(df_nuevaFinal, df_humedad)
    
    data = df_nuevaFinal.loc[:,[variable1,variable2]]
    
    return jsonify({"success":True,"data":data.to_dict()})