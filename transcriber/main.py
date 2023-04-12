import datetime
import os
import algolia

import use_whisper
from usecase.transcript.create_usecase import create_transcript


def main():
    create_transcript()
    print("##################################")
    print(datetime.datetime.now())
    data = use_whisper.transcribe('js-party-264.mp3')
    print(datetime.datetime.now())
    print("##################################")
    algolia.save(
        os.environ['ALGOLIA_APP_ID'],
        os.environ['ALGOLIA_API_KEY'],
        "test_index",
        data,
    )


if __name__ == '__main__':
    main()
