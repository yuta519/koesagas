import os
import uuid

import whisper


# We're using the `base` size model. Check out
# https://github.com/openai/whisper#available-models-and-languages
# for more robust models.
def transcribe(filename, lang='English', model='small'):
    model = whisper.load_model(model)

    result = model.transcribe(filename, fp16=False, language=lang)
    print(result)

    data = []
    with open(f"{os.path.splitext(os.path.basename(filename))[0]}.txt", "w") as f:
        f.write(result["text"])
        for segment in result["segments"]:
            print(segment["start"])
            print(segment["end"])
            print(segment["text"])
            data.append({
                "objectID": str(uuid.uuid4()),
                "start": segment["start"],
                "end": segment["end"],
                "text": segment["text"]
            })

    return data
