# components/chatbot

Public chat widget UI only. Keep private knowledge off the client.

- `ChatWidget.tsx` is the chat screen (message list, input, starter chips). It streams answers from `app/api/chatbot` using the AI SDK. It can take an optional `company` and `role` to tailor answers.
- `MessageContent.tsx` safely renders the AI's answer text (light markdown: bold, bullets, headings) without running any raw HTML.

The grounded facts and system prompt live under `lib/ai`; the model call lives in `app/api/chatbot/route.ts`.
