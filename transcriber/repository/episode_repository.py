# from typing import Optional

# from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String
# from sqlalchemy.orm import Mapped
# from sqlalchemy.orm import mapped_column
# from sqlalchemy.orm import relationship
from sqlalchemy.sql import select

from infra.database import Base, Engine


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
