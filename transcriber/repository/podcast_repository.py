from sqlalchemy.sql import select

from infra.database import Engine, Podcast


def fetch_all():
    query = select(Podcast)
    conn = Engine.connect()
    result = conn.execute(query)
    return result.fetchall()


def find_by_id(id: str):
    query = select(Podcast).where(Podcast.id == id)
    conn = Engine.connect()
    return conn.execute(query).fetchone()


def find_by_index_name(index_name: str):
    query = select(Podcast).where(Podcast.indexName == index_name)
    conn = Engine.connect()
    return conn.execute(query).fetchone()
