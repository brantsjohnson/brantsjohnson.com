// ============================================
// WHAT THIS FILE DOES (plain English):
// The suggested questions on the Ask page. Choosing one puts that
// question in the box. It does not send it. The visitor presses Send
// when they are ready.
// ============================================

type AskSuggestionsProps = {
  questions: readonly string[];
  disabled?: boolean;
  onPick: (question: string) => void;
};

export function AskSuggestions({ questions, disabled = false, onPick }: AskSuggestionsProps) {
  return (
    <div aria-label="Suggested questions">
      <p className="label text-text-secondary">Suggested questions</p>
      <p className="mt-2 max-w-reading text-caption text-text-secondary">
        Choose one to put it in the box. Nothing is sent until you press Send.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {questions.map((question) => (
          <li key={question}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onPick(question)}
              data-track="button:preset_question:ask"
              className="flex min-h-[52px] w-full items-center rounded-[18px] border border-border-subtle bg-bg px-5 py-3 text-left text-body text-ink transition-colors hover:border-accent disabled:opacity-50"
            >
              {question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
