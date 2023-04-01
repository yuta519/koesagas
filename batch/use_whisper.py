import whisper
import datetime


# We're using the `base` size model. Check out
# https://github.com/openai/whisper#available-models-and-languages
# for more robust models.
model = whisper.load_model("base")

print("##################################")
print(datetime.datetime.now())

result = model.transcribe(
    "js-party-264.mp3",
    fp16=False,
    language="English",
)

f = open("js-party-264_base.txt", "w")
f.write(result["text"])
f.close()

print(datetime.datetime.now())
print("##################################")
