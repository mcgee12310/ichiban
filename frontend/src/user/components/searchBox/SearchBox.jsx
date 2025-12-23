import { useState, useEffect } from "react";
import styles from "./SearchBox.module.css";

function SearchBox({ filters, setFilters, onSearch }) {
  const [keyword, setKeyword] = useState(filters.keyword || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 0);
  const [sortOption, setSortOption] = useState(filters.sortOption || "none");
  const [rangeOption, setRangeOption] = useState(filters.rangeOption || "all");

  useEffect(() => {
    setKeyword(filters.keyword || "");
    setSortOption(filters.sortOption || "none");
    setRangeOption(filters.rangeOption || "all");
    setMaxPrice(filters.maxPrice || 500000);
  }, [filters]);

  const apply = () => {
    setFilters({ keyword, sortOption, rangeOption, maxPrice });
    onSearch();
  };

  const reset = () => {
    const resetData = {
      keyword: "",
      sortOption: "none",
      rangeOption: "all",
      maxPrice: 500000,
    };
    setKeyword("");
    setSortOption("none");
    setRangeOption("all");
    setMaxPrice(500000);
    setFilters(resetData);
  };

  return (
    <div className={styles.box}>
      {/* 翻訳: Tìm kiếm sự kiện -> イベントを検索 */}
      <h2 className={styles.header}>イベントを検索</h2> 

      {/* Hàng 1 */}
      <div className={styles.row}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
          // 翻訳: Nhập từ khóa... -> キーワードを入力...
          placeholder="キーワードを入力..." 
          className={styles.input}
        />

        <button onClick={apply} className={styles.buttonPrimary}>
          {/* 翻訳: Tìm -> 検索 */}
          検索
        </button>

        <button onClick={reset} className={styles.buttonSecondary}>
          {/* 翻訳: Reset -> リセット */}
          リセット
        </button>
      </div>

      {/* Row 2 */}
      <div className={styles.grid}>
        {/* Range */}
        <div className={styles.field}>
          {/* 翻訳: Khoảng cách -> 範囲 */}
          <label>範囲</label>
          <select
            value={rangeOption}
            onChange={(e) => setRangeOption(e.target.value)}
            className={styles.input}
          >
            {/* 翻訳: Cùng quận -> 同じ区内 */}
            <option value="district">同じ区内</option>
            {/* 翻訳: Cùng thành phố -> 同じ市内 */}
            <option value="city">同じ市内</option>
            {/* 翻訳: Không lọc -> フィルターなし */}
            <option value="all">フィルターなし</option>
          </select>
        </div>

        {/* Sort */}
        <div className={styles.field}>
          {/* 翻訳: Sắp xếp -> 並び替え */}
          <label>並び替え</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.input}
          >
            {/* 翻訳: Không sắp xếp -> 並び替えなし */}
            <option value="none">並び替えなし</option>
            {/* 翻訳: Rating thấp → cao -> 評価 低い順 */}
            <option value="ratingAsc">評価 低い順</option>
            {/* 翻訳: Rating cao → thấp -> 評価 高い順 */}
            <option value="ratingDesc">評価 高い順</option>
            {/* 翻訳: Giá thấp → cao -> 価格 低い順 */}
            <option value="priceAsc">価格 低い順</option>
            {/* 翻訳: Giá cao → thấp -> 価格 高い順 */}
            <option value="priceDesc">価格 高い順</option>
            {/* 翻訳: Miễn phí trước -> 無料を優先 */}
            <option value="priceFreeFirst">無料を優先</option>
          </select>
        </div>

        {/* Max Price */}
        <div className={styles.field}>
          {/* 翻訳: Giá tối đa -> 最大価格 */}
          <label>最大価格</label>
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className={styles.input}
            // 翻訳: Giá tối đa -> 最大価格
            placeholder="最大価格"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
