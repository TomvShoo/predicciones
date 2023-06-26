import os
from flask import jsonify
import pandas as pd

from app.routes import general_bp


@general_bp.route('/anios')
def getAnios():
    df = pd.read_csv(os.path.join(os.getcwd(),'weatherAUS.csv'))
    df['Year'] = pd.to_datetime(df['Date'], format='%Y-%m-%d').dt.year
    
    unique_year = df['Year'].unique().tolist()
    return jsonify({"success":True,"data":unique_year})

@general_bp.route('/ciudades')
def getCiudades():
    df = pd.read_csv(os.path.join(os.getcwd(),'weatherAUS.csv'))
    unique_Location = df['Location'].unique().tolist()
    return jsonify({"success":True,"data":unique_Location})

@general_bp.route('/variables')
def getVariables():
    df = pd.read_csv(os.path.join(os.getcwd(),'weatherAUS.csv'))
    df['avg_temp'] = (df['MinTemp'] + df['MaxTemp']) / 2
    
    hum_Sydney = df.groupby('month').mean()['Humidity3pm'].reset_index(name='') # Se extrae los datos de humedad
    
    # df = df[df['Date'].srt.contains(str())]
    df = df.loc[:,['avg_temp','WindGustSpeed']]
    
    atributos = df.columns.tolist()
    
    return jsonify({"success":True,"data":atributos})
