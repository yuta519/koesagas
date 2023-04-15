from algoliasearch.search_client import SearchClient

from entity.transcript import Transcript


class Algolia(object):
    def __init__(self, app_id, api_key):
        self.client = SearchClient.create(app_id, api_key)

    def save_transcripts(self, index_name, transcripts: list[Transcript]) -> None:
        index = self.client.init_index(index_name)
        index.save_objects(
            [{
                "objectID": transcript.id,
                "text": transcript.text,
                "startAt": transcript.start_at,
                "endAt": transcript.end_at
            } for transcript in transcripts]
        )
