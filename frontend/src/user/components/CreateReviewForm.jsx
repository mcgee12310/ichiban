import { useState } from "react";
import { Star, Check } from "lucide-react";

function CreateReviewForm({ onSubmit }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await onSubmit({
      content,
      rating,
    });

    setContent("");
    setRating(5);
  };

  return (
    <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
      <h4 className="font-semibold text-gray-900 mb-2">
        レビューを書く
      </h4>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            onClick={() => setRating(i + 1)}
            className={`cursor-pointer ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        placeholder="コメントを入力してください"
        className="w-full rounded-lg border border-gray-300 p-3 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <div className="flex justify-end mt-3">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-1 hover:bg-blue-700"
        >
          <Check size={16} />
          投稿
        </button>
      </div>
    </div>
  );
}

export default CreateReviewForm;
