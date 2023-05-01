import uuid


class Episode(object):
    def __init__(
        self,
        backnumber,
        title,
        description,
        spotifyUrl,
        applePodcastUrl,
        postedAt,
        podcastId,
        id=None
    ):
        self.id = id if id else str(uuid.uuid4())
        self.backnumber = backnumber
        self.title = title
        self.description = description
        self.spotifyUrl = spotifyUrl
        self.applePodcastUrl = applePodcastUrl
        self.postedAt = postedAt
        self.podcastId = podcastId
