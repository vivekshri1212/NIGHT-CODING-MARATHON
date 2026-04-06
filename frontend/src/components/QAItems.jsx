import { useState } from "react";
import ReactMarkdown from "react-markdown";

const QAItem = ({ item, onPin }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[1.6rem] border border-white/70 bg-white/85 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <h3
          className="cursor-pointer text-base font-semibold leading-7 text-slate-900"
          onClick={() => setOpen(!open)}
        >
          {item.question}
        </h3>

        <button
          type="button"
          onClick={() => onPin?.(item._id)}
          className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
        >
          {item.isPinned ? "Unpin" : "Pin"}
        </button>
      </div>

      {open && (
        <div className="prose prose-slate mt-5 max-w-none rounded-2xl bg-slate-50/90 p-4 text-sm text-slate-700">
          <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default QAItem;
