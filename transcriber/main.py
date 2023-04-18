import datetime

from infra.whisper import transcribe_by_voice_file
from usecase.transcript.create_usecase import create_transcript
from repository.transcript_repository import save_transcripts


def main():
    create_transcript()
    print("##################################")
    print(datetime.datetime.now())
    transcripts = transcribe_by_voice_file(
        filepath='123.mp3',
        episode_id=123,
        lang='Japanese',
        model_type='medium'
    )
    print(datetime.datetime.now())
    print("##################################")
    save_transcripts("vancouver-engineers", transcripts)


if __name__ == '__main__':
    main()
