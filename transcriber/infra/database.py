import os

from sqlalchemy import Column, MetaData, String, Table
from sqlalchemy.sql import select
from sqlalchemy import create_engine

engine = create_engine(
    f'postgresql+psycopg2://root:password@{os.environ["DB_HOST"]}:{os.environ["DB_PORT"]}/app',
    isolation_level="AUTOCOMMIT"
)

metadata = MetaData()

podcasts = Table(
    'Podcast', metadata,
    Column('id', String, primary_key=True),
    Column('name', String),
    Column('indexName', String),
    Column('imageUrl', String),
    Column('createdAt', String)
)

s = select(podcasts)
conn = engine.connect()
result = conn.execute(s)
print(result.fetchall())
