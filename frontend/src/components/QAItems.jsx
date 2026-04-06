import { useState } from "react";
import ReactMarkdown from "react-markdown";

const QAItem = ({ item, onPin }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded shadow mb-4 p-4 transition hover:shadow-md">
      <div className="flex justify-between items-center gap-4">
        <h3
          className="font-medium cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {item.question}
        </h3>

        <button
          type="button"
          onClick={() => onPin?.(item._id)}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          {item.isPinned ? "Unpin" : "Pin"}
        </button>
      </div>

      {open && (
        <div className="mt-3 text-gray-700">
          <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default QAItem;
