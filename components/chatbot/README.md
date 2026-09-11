# components/chatbot

Public chat widget UI only. Keep private knowledge off the client (the knowledge base and prompt live under `lib/ai` and are server-only).

- `ChatWidget.tsx` is the chat screen (message list, input, starter chips). It streams answers from `app/api/chatbot` using the AI SDK. It can take an optional `company` and `role` to tailor answers.
- `ChatLauncher.tsx` is the floating round chat button on the marketing pages (including the home page). It opens a panel with `ChatWidget` inside, so chat is available in-site without leaving the page.
- `MessageContent.tsx` safely renders the AI's answer text (light markdown: bold, bullets, headings) without running any raw HTML.

The grounded facts and system prompt (the shared "brain", same as the standalone BrantChat app) live under `lib/ai`; the model call lives in `app/api/chatbot/route.ts`.
