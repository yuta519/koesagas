import os

from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import DeclarativeBase


Engine = create_engine(
    (
        f'postgresql+psycopg2://root:password@'
        f'{os.environ["DB_HOST"]}:{os.environ["DB_PORT"]}/app'
    ),
    isolation_level="AUTOCOMMIT"
)


class Base(DeclarativeBase):
    ...


class Podcast(Base):
    __tablename__ = "Podcast"

    id = Column(String, primary_key=True)
    name = Column(String(100))
    indexName = Column(String(30))
    imageUrl = Column(String(1000), nullable=True)
    createdAt = Column(String(100))

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, title={self.name!r})"


class Episode(Base):
    __tablename__ = "Episode"

    id = Column(String, primary_key=True)
    backnumber = Column(Integer)
    title = Column(String(100))
    description = Column(String(1000))
    spotifyUrl = Column(String(1000), nullable=True)
    applePodcastUrl = Column(String(1000), nullable=True)
    postedAt = Column(String(100))
    podcastId = Column(String, nullable=False)

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, title={self.title!r})"
