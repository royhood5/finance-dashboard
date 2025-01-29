from sqlalchemy import create_engine, MetaData

DATABASE_URL = "sqlite:///./finance.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
metadata = MetaData()

metadata.create_all(bind=engine)
