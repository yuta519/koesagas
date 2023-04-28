import datetime

from const.whisper import Model
from infra.whisper import transcribe_by_voice_file
from repository import podcast_repository
from repository.transcript_repository import save_transcripts


def create_transcript(filepath: str, episode_id: int, lang: str, index_name: str):
    podcast = podcast_repository.find_by_index_name(index_name)
    print(podcast)
    print("##################################")
    print(datetime.datetime.now())
    transcripts = transcribe_by_voice_file(
        filepath=filepath,
        episode_id=episode_id,
        lang=lang,
        model_type=Model.MEDIUM
    )
    for transcript in transcripts:
        print(transcript.text)
    print(datetime.datetime.now())
    print("##################################")
    save_transcripts(index_name, transcripts)
