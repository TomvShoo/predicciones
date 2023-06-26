from flask import Flask
from flask_cors import CORS
def create_app():
    app = Flask(__name__)
    
    # Configuracion si es que hay
    
    # Importar rutas
    from app.routes.graficos_routes import graficos_bp
    from app.routes.predicciones_routes import predicciones_bp
    from app.routes.general_routes import general_bp
    
    # Registrar rutas
    app.register_blueprint(predicciones_bp)
    app.register_blueprint(graficos_bp)
    app.register_blueprint(general_bp)
    
    CORS(app)
    
    @app.route('/')
    def index():
        return 'Principal sss'
    
    return app