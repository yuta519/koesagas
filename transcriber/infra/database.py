import os

from sqlalchemy import create_engine
# from sqlalchemy import Column, MetaData, String, Table
from sqlalchemy.orm import DeclarativeBase
# from sqlalchemy.sql import select

Engine = create_engine(
    f'postgresql+psycopg2://root:password@{os.environ["DB_HOST"]}:{os.environ["DB_PORT"]}/app',
    isolation_level="AUTOCOMMIT"
)


class Base(DeclarativeBase):
    ...


# metadata = MetaData()

# podcasts = Table(
#     'Podcast', metadata,
#     Column('id', String, primary_key=True),
#     Column('name', String),
#     Column('indexName', String),
#     Column('imageUrl', String),
#     Column('createdAt', String)
# )

# s = select(podcasts)
# conn = engine.connect()
# result = conn.execute(s)
# print(result.fetchall())

# from typing import Optional

# from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String
# from sqlalchemy.orm import Mapped
# from sqlalchemy.orm import mapped_column
# from sqlalchemy.orm import relationship
from sqlalchemy.sql import select


# class Base(DeclarativeBase):
#     ...


class Episode(Base):
    __tablename__ = "Episode"

    id = Column(String, primary_key=True)
    backnumber = Column(Integer)
    title = Column(String(100))
    description = Column(String(1000))
    spotifyUrl = Column(String(1000), nullable=True)
    applePodcastyUrl = Column(String(1000), nullable=True)
    postedAt = Column(String(100))
    podcastId = Column(String, nullable=False)

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, title={self.title!r})"


s = select(Episode)
conn = Engine.connect()
result = conn.execute(s)
print(result.fetchall())
