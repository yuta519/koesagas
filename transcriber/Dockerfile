FROM python:3.10-slim

RUN apt update
RUN apt install -y ffmpeg
RUN pip install setuptools-rust
RUN pip install -U openai-whisper


# RUN apt update
# RUN apt install -y locales build-essential python3-distutils python3-distutils-extra locales
# RUN apt install -y libapt-pkg-dev libdb-dev libgdbm-dev libncursesw5-dev
# RUN apt install -y liblzma-dev libreadline-dev zlib1g-dev uuid-dev tk-dev libssl-dev libffi-dev libgeos-dev default-libmysqlclient-dev libxml2-dev
# RUN apt install -y libxslt-dev libjpeg-dev libdbus-1-dev libgirepository1.0-dev libcairo2-dev default-mysql-client libsm6 libxext6 libxrender-dev \
#     pkg-config cmake protobuf-compiler libglib2.0-dev libxmlsec1-dev
# WORKDIR /src
# ADD ./backend/src /src/
# RUN mkdir -p /src/log
# RUN mkdir -p /var/log/uwsgi/
# RUN touch /src/log/app.log
# RUN echo "ja_JP UTF-8" > /etc/locale.gen
# RUN locale-gen
# ENV TZ=Asia/Tokyo
# ENV LANG=ja_JP.UTF-8
# ENV PYTHONIOENCODING=utf-8
# ENV LC_ALL=ja_JP.UTF-8
# RUN pip install --upgrade setuptools
# RUN pip install --upgrade pip
# RUN pip install --upgrade distlib
# RUN pip install --no-cache-dir -r requirements.txt
