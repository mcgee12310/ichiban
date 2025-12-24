import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Star, Plus, LogIn } from "lucide-react";
import ReviewItem from "./ReviewItem";
import {
  createEventComment,
  updateEventComment,
  deleteEventComment
} from "../../services/EventService";

function ReviewSection({ reviews, setReviews, isLoggedIn }) {
  const { eventId } = useParams();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Kiểm tra xem user đã có review chưa
  const myReview = reviews.find(review => review.isMyComment === true);
  const hasMyReview = !!myReview;

  // Tính toán stats (không tính review mới đang tạo)
  const actualReviews = reviews.filter(r => r.id !== 'new-review');
  const totalReviews = actualReviews.length;
  const averageRating = totalReviews > 0
    ? (actualReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  // Sắp xếp reviews: review của mình lên đầu
  const sortedReviews = useMemo(() => {
    return [...actualReviews].sort((a, b) => {
      if (a.isMyComment) return -1;
      if (b.isMyComment) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [actualReviews]);

  // Danh sách hiển thị (bao gồm form tạo mới nếu cần)
  const displayReviews = useMemo(() => {
    if (showCreateForm && isLoggedIn && !hasMyReview) {
      return [
        {
          id: 'new-review',
          userName: 'あなた',
          content: '',
          rating: 0,
          isMyComment: false, // false = chế độ tạo mới
          createdAt: null,
        },
        ...sortedReviews
      ];
    }
    return sortedReviews;
  }, [sortedReviews, showCreateForm, isLoggedIn, hasMyReview]);

  // Handle update/create
  const handleReviewUpdate = async (id, data) => {
    const { content, rating } = data;

    if (id === 'new-review') {
      // ===== CREATE =====
      try {
        const response = await createEventComment(
          eventId,
          content,
          rating
        );

        setReviews(prev => [
          {
            ...response,
            isMyComment: true
          },
          ...prev
        ]);

        setShowCreateForm(false);
      } catch (error) {
        console.error("Create comment failed:", error);
      }
    } else {
      // ===== UPDATE =====
      try {
        const response = await updateEventComment(
          id,
          content,
          rating
        );

        setReviews(prev =>
          prev.map(r =>
            r.id === id
              ? { ...response, isMyComment: true }
              : r
          )
        );
      } catch (error) {
        console.error("Update comment failed:", error);
      }
    }
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const handleDeleteReview = async (commentId) => {
  try {
    await deleteEventComment(commentId);
    setReviews(prev => prev.filter(r => r.id !== commentId));
  } catch (error) {
    console.error("Delete comment failed:", error);
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          レビュー
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            <span className="font-semibold text-gray-900">
              {averageRating}
            </span>
          </div>
          <span>({totalReviews} 件)</span>
        </div>
      </div>

      {/* Button tạo review mới */}
      {!hasMyReview && !showCreateForm && (
        <div className="mb-4">
          {isLoggedIn ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              レビューを書く
            </button>
          ) : (
            <div className="w-full py-4 px-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300 text-center">
              <LogIn className="mx-auto mb-2 text-blue-600" size={24} />
              <p className="text-gray-700 font-medium mb-1">
                レビューを投稿するにはログインが必要です
              </p>
              <p className="text-sm text-gray-500">
                ログインしてあなたの意見を共有しましょう
              </p>
            </div>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {displayReviews.length > 0 ? (
          displayReviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onUpdate={handleReviewUpdate}
              onDelete={handleDeleteReview}
              onCancel={review.id === 'new-review' ? handleCancelCreate : undefined}
              isLoggedIn={isLoggedIn}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>まだレビューがありません</p>
            <p className="text-sm mt-1">最初のレビューを投稿しましょう！</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewSection;
