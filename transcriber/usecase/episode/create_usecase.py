import datetime

from entity.episode import Episode
from repository import podcast_repository
from repository import episode_repository


def create_episode(title: str, episode_id: int, index_name: str):
    podcast = podcast_repository.find_by_index_name(index_name)
    episode = Episode(
        backnumber=episode_id,
        title=title,
        description="",
        spotifyUrl="",
        applePodcastUrl="",
        postedAt=datetime.datetime.now(),
        podcastId=podcast.id,
    )

    episode_repository.create(episode)
