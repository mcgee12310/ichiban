import { useState, useEffect } from "react";
import { Star, Edit2, X, Check } from "lucide-react";
import { formatDate } from "../../ultis/format";

function ReviewItem({ review, onUpdate, onDelete, onCancel, isLoggedIn = false }) {
  // Kiểm tra xem có phải review mới (đang tạo) hay không
  const isNewReview = review.id === 'new-review';
  const hasMyComment = review.isMyComment && review.content?.trim();

  const [isEditing, setIsEditing] = useState(isNewReview);
  const [editContent, setEditContent] = useState(review.content || "");
  const [editRating, setEditRating] = useState(review.rating || 0);

  // Auto set editing mode nếu là review mới
  useEffect(() => {
    if (isNewReview) {
      setIsEditing(true);
    }
  }, [isNewReview]);

  const handleCancel = () => {
    if (isNewReview && onCancel) {
      // Nếu đang tạo mới và có callback onCancel → gọi để đóng form
      onCancel();
    } else if (isNewReview) {
      // Nếu đang tạo mới nhưng không có callback → reset form
      setEditContent("");
      setEditRating(0);
    } else {
      // Nếu đang edit → khôi phục dữ liệu cũ
      setEditContent(review.content);
      setEditRating(review.rating);
      setIsEditing(false);
    }
  };

  const handleSave = async () => {
    if (editRating === 0 || !editContent.trim()) return;

    // Gọi callback update (backend sẽ tự xử lý create/update)
    onUpdate?.(review.id, {
      content: editContent,
      rating: editRating,
    });

    // Chỉ tắt editing mode nếu không phải review mới
    // Review mới sẽ bị remove khỏi list sau khi create thành công
    if (!isNewReview) {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("このレビューを削除しますか？");
    if (!confirmed) return;

    try {
      await onDelete?.(review.id);
    } catch (error) {
      console.error("Delete comment failed:", error);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 border border-gray-100">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {review.userName?.charAt(0) || "あ"}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">
            {review.userName || "あなた"}
            {isNewReview && (
              <span className="ml-2 text-xs text-blue-600 font-normal">
                （新しいレビュー）
              </span>
            )}
            {hasMyComment && (
              <span className="ml-2 text-xs text-green-600 font-normal">
                （あなたのレビュー）
              </span>
            )}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                onClick={() => isEditing && setEditRating(i + 1)}
                className={`${isEditing ? 'cursor-pointer' : 'cursor-default'} ${i < editRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {!isNewReview && review.createdAt && (
          <span className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </span>
        )}
      </div>

      {/* Content */}
      {!isEditing ? (
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {review.content || "レビューを書いてください"}
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={4}
            placeholder="レビューを書いてください…"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 flex items-center gap-1 hover:bg-gray-100 transition-colors"
            >
              <X size={14} />
              キャンセル
            </button>

            <button
              onClick={handleSave}
              disabled={!editContent.trim() || editRating === 0}
              className="px-4 py-1.5 text-sm rounded-lg bg-blue-600 text-white flex items-center gap-1 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Check size={14} />
              {isNewReview ? "投稿" : "保存"}
            </button>
          </div>
        </div>
      )}

      {/* Edit button – chỉ khi đã có comment và đã login */}
      {hasMyComment && !isEditing && isLoggedIn && !isNewReview && (
        <div className="absolute bottom-4 right-4 flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <Edit2 size={14} />
            編集
          </button>

          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
          >
            <X size={14} />
            削除
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewItem;
