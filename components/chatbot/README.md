# components/chatbot

Public chat widget UI only. Keep private knowledge off the client (the knowledge base and prompt live under `lib/ai` and are server-only).

- `ChatWidget.tsx` is the chat screen (message list, input, starter chips). It streams answers from `app/api/chatbot` using the AI SDK. It can take an optional `company` and `role` to tailor answers.
- `ChatLauncher.tsx` is the floating round chat button on the marketing pages. It opens a panel with `ChatWidget` inside.
- `MessageContent.tsx` safely renders the AI's answer text (light markdown) without running any raw HTML.
- `chat-events.ts` lets any button open the panel without wiring directly to it.
- `OpenChatButton.tsx` is a site Button that dispatches the open event (home hero, project cards).

The grounded facts and system prompt live under `lib/ai`; the model call lives in `app/api/chatbot/route.ts`.
