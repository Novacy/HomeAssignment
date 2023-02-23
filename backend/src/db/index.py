# Import all the models, so that Base has them before being
# imported by Alembic

from src.db.config import Base
from src.db.models.deal import Deal
from src.db.models.user import User
