import os

from infra.algolia import Algolia


def save_transcripts(index_name, transcripts) -> None:
    algolia_client = Algolia(
        os.getenv("ALGOLIA_APP_ID"), os.getenv("ALGOLIA_API_KEY")
    )
    algolia_client.save_transcripts(index_name, transcripts)
