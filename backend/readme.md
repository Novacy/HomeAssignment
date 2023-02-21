<!-- Run these command from backend directory -->
python3 -m venv fastapienv
source fastapienv/bin/activate
pip install -r requirement.txt

<!-- Changes to be made in file -->
database.py -> Change SQLALCHEMY_DATABASE_URL according to your db setup
alembic.ini -> Change sqlalchemy.url according to your db setup