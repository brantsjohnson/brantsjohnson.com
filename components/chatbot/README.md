# components/chatbot

Public chat widget UI only: a glass launcher pill and a preview panel.

Backend retrieval and model calls live under `lib/ai` and `app/api/chatbot`. This pass is a shell mapped toward a later BrantChat integration. It does not call the model and it never loads private knowledge on the client.

BrantChat source in `/BrantChat` is the reference implementation to integrate later. Do not import it from here yet.
