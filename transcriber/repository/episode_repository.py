from sqlalchemy.sql import insert, select
from sqlalchemy.exc import InvalidRequestError

from entity.episode import Episode as EpisodeEntity
from infra.database import Engine, Episode


def fetch_all():
    query = select(Episode)
    conn = Engine.connect()
    result = conn.execute(query)
    return result.fetchall()


def create(episode: EpisodeEntity):
    try:
        query = insert(Episode).values(
            id=episode.id,
            backnumber=episode.backnumber,
            title=episode.title ,
            description=episode.description,
            spotifyUrl=episode.spotifyUrl,
            applePodcastUrl=episode.applePodcastUrl,
            postedAt=episode.postedAt,
            podcastId=episode.podcastId
        )
        Engine.connect().execute(query)
    except InvalidRequestError as err:
        print(f"InvalidRequestError: {err}")
