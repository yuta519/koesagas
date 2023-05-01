import sys
sys.path.append('..')

from const.algolia import IndexName
from const.whisper import Language
from usecase.episode.create_usecase import create_episode
from usecase.transcript.create_usecase import create_transcript


def main():
    create_episode(
        title="126- 元Gooogleエンジニアがスタートアップで働く理由とは【エンジニアからスタートアップ創業5】",
        episode_id=126,
        index_name=IndexName.VANCOUVER_ENGINEERS
    )
    create_transcript(
        filepath="../126- 元Gooogleエンジニアがスタートアップで働く理由とは【エンジニアからスタートアップ創業5】.mp3",
        episode_id=126,
        lang=Language.JAPAENSE,
        index_name=IndexName.VANCOUVER_ENGINEERS,
    )


if __name__ == '__main__':
    main()
