from algoliasearch.search_client import SearchClient


# class Algoria(object):

#     def __init__(self):
#         self.
def save(app_id, api_key, index_name, data) -> None:
    client = SearchClient.create(app_id, api_key)
    index = client.init_index(index_name)

    index.save_objects(data)
