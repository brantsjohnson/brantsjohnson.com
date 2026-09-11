# components/chatbot

The BrantChat widget UI, separate from its backend logic. It sends questions to `/api/chatbot` and never loads private knowledge in the browser. The older app in `/BrantChat` is a separate project we learn from; do not import it here.

Current files:

- `ChatWidget.tsx` the always-visible launcher in the bottom-right corner and the glass chat panel it opens. Handles focus, the Escape key, and one close control.
- `chat-events.ts` a tiny shared helper so any button on the site can ask the chat panel to open, without being wired directly to it.
- `OpenChatButton.tsx` a button (matching the site's Button look) that opens the chat panel when clicked. Used by the home hero and project cards.
