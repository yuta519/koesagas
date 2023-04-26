import datetime

from infra.whisper import transcribe_by_voice_file
from usecase.transcript.create_usecase import create_transcript
from repository.transcript_repository import save_transcripts


def main():
    create_transcript()
    print("##################################")
    print(datetime.datetime.now())
    transcripts = transcribe_by_voice_file(
        filepath='127- 怠惰なエンジニア必聴！成長したいならまずは環境を変えたほうがいい【エンジニアからスタートアップ創業6】.mp3',
        episode_id=127,
        # lang='English',
        lang='Japanese',
        model_type='medium'
    )
    print(datetime.datetime.now())
    print("##################################")
    # save_transcripts("js-party", transcripts)
    save_transcripts("vancouver-engineers", transcripts)


if __name__ == '__main__':
    main()
