import whisper

from entity.transcript import Transcript


# We're using the `base` size model. Check out
# https://github.com/openai/whisper#available-models-and-languages
# for more robust models.
def transcribe_by_voice_file(
    filepath: str, episode_id: int, lang: str = 'English', model_type: str = 'small'
) -> list[Transcript]:
    model = whisper.load_model(model_type)
    result = model.transcribe(filepath, fp16=False, language=lang)
    transcripts = [
        Transcript(
            start_at=segment["start"],
            end_at=segment["end"],
            text=segment["text"],
            episode_id=episode_id
        ) for segment in result["segments"]
    ]

    return transcripts
