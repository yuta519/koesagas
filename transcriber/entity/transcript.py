import uuid


class Transcript(object):
    def __init__(self, start_at, end_at, text, id=None):
        self.id = id if id else str(uuid.uuid4())
        self.start_at = start_at
        self.end_at = end_at
        self.text = text
