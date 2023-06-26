from flask import Blueprint

predicciones_bp = Blueprint('preddiciones',__name__,url_prefix="/predicciones")
graficos_bp = Blueprint('graficos',__name__,url_prefix="/graficos")
general_bp = Blueprint('general',__name__, url_prefix='/')

from app.routes.predicciones_routes import *
from app.routes.graficos_routes import *
from app.routes.general_routes import *