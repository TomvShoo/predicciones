import os
from flask import jsonify, request
import pandas as pd
from app.routes import predicciones_bp

# import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

@predicciones_bp.route('/', methods=["POST"])
def predicciones():
    ciudad = request.json['ciudad']
    evaporacion = float(request.json['evaporacion'])
    sunshine = float(request.json['sunshine'])
    temp3pm = float(request.json['temp3pm'])
    
    df = pd.read_csv(os.path.join(os.getcwd(), 'weatherAUS.csv'))
    df = df[df['Location'] == ciudad]
    
    df['Date'] = pd.to_datetime(df['Date'])
    tablanueva = df[(df['Date'].dt.year >= 2022) & (df['Date'].dt.year <= 2022)]
    
    tabla_sin_nulos = tablanueva.dropna()
    
    datosFiltrados = tabla_sin_nulos.filter(items=['Evaporation', 'Sunshine', 'Temp3pm', 'MaxTemp'])
    datosFiltrados = datosFiltrados.apply(pd.to_numeric, errors='coerce')  # Convertir a valores numéricos
    
    # Eliminar filas con valores no numéricos
    datosFiltrados = datosFiltrados.dropna()
    
    X = datosFiltrados[['Evaporation', 'Sunshine', 'Temp3pm']]
    y = datosFiltrados['MaxTemp']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    regression_model = LinearRegression()
    
    regression_model.fit(X_train, y_train)
    
    new_data = [[evaporacion, sunshine, temp3pm]]
    tempMax = regression_model.predict(new_data)

    y_pred = regression_model.predict(X_test)
    r2 = r2_score(y_test, y_pred)    
    
    response_data = {
        "predicted_temp": tempMax.tolist(),
        "r2_score": r2
    }
    
    return jsonify({
        "success": True,
        "data": response_data
    })