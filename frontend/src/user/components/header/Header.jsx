import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 必要なアイコンをインポート
import { Menu, X, Home, Search, Heart, Calendar } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 認証状態のチェック (Header 1 の機能)
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Header 1 では 'email' をユーザーデータとして使用
    const userData = localStorage.getItem('email'); 
    
    if (token && userData) {
      setIsLoggedIn(true);
      // user state にはユーザーデータ全体ではなく、一時的に 'email' を格納
      setUser({ fullName: userData, avatarUrl: null }); // 仮のオブジェクトとして保存
    }
  }, []);

  // ログアウト処理 (Header 1 の機能)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUser(null);
    setMobileMenuOpen(false);
    navigate('/auth');
  };

  // ログイン/サインアップ処理 (Header 1 の機能)
  const handleLogin = () => {
    setMobileMenuOpen(false);
    navigate('/auth');
  };

  const handleSignup = () => {
    setMobileMenuOpen(false);
    navigate('/auth');
  };

  // ページナビゲーション関数 (Header 1 の機能)
  const handleHome = () => {
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleLocations = () => {
    setMobileMenuOpen(false);
    navigate('/events/search');
  };

  const handleFavorites = () => {
    setMobileMenuOpen(false);
    navigate('/favorites');
  };


  const handleAbout = () => {
    setMobileMenuOpen(false);
    navigate('');
  };
  
  // ユーザー名のイニシャルを取得 (Header 1 の機能)
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  };

  // 統合されたヘッダーのレンダリング
  return (
    // Header 2 のスタイリングを使用 (shadow-md, sticky top-0 z-50)
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/サイト名 (Header 2 のスタイリング + Header 1 のナビゲーション機能) */}
          <div 
            onClick={handleHome}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              {/* ロゴテキストは元の "HW" を保持 */}
              <span className="text-white font-bold text-sm">HW</span>
            </div>
            {/* サイト名も Header 2 のものを保持 */}
            <span className="text-xl font-bold text-gray-900">ハッピーウィークエンド</span>
            {/* キャッチフレーズも Header 2 のものを保持 */}
            <span className="text-sm text-gray-500 hidden sm:block">週末の冒険</span>
          </div>

          {/* Desktop Navigation (Header 2 のスタイリング + Header 1 の機能/テキスト) */}
          <nav className="hidden md:flex items-center gap-6">
            
            {/* 翻訳: Trang chủ -> ホーム */}
            <button 
              onClick={handleHome} 
              className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Home size={20} />
              <span>ホーム</span>
            </button>
            
            {/* 翻訳: Địa điểm -> スポット */}
            <button 
              onClick={handleLocations} 
              className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Search size={20} /> {/* Searchアイコンを流用 */}
              <span>スポット</span>
            </button>

            <button 
              onClick={handleFavorites} 
              className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Heart size={20} /> {/* Heartアイコンを流用 */}
              <span>お気に入り</span>
            </button>
            
            {/* 翻訳: Giới thiệu -> 概要 */}
            <button 
              onClick={handleAbout} 
              className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Calendar size={20} /> {/* Calendarアイコンを流用 */}
              <span>概要</span>
            </button>
            
            {/* 認証状態による表示切り替え (Header 1 の機能と一部スタイリング) */}
            {!isLoggedIn ? (
              <>
                {/* 翻訳: Đăng nhập -> ログイン */}
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow-md shadow-rose-500/25 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 transition-all duration-250"
                >
                  ログイン
                </button>
                {/* 翻訳: Đăng ký -> 会員登録 */}
                <button
                  onClick={handleSignup}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow-md shadow-rose-500/25 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 transition-all duration-250"
                >
                  会員登録
                </button>
              </>
            ) : (
              // ユーザー名表示を削除
              <div className="flex items-center gap-3">
                {/* ユーザーアバター/イニシャル */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center overflow-hidden border-2 border-white shadow-md shadow-rose-500/20">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-base font-semibold uppercase">
                      {getInitials(user?.fullName)}
                    </span>
                  )}
                </div>
                {/* 翻訳: Đăng xuất -> ログアウト */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-white text-rose-500 border border-rose-500 rounded-lg font-medium hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-500/25 transition-all duration-250"
                >
                  ログアウト
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button (Header 2 のスタイリング + Header 1 の機能) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation (Header 1 の機能とスタイリング) */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
            
            {/* 翻訳: Trang chủ -> ホーム */}
            <button
              onClick={handleHome}
              className="text-left px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              ホーム
            </button>
            {/* 翻訳: Địa điểm -> スポット */}
            <button
              onClick={handleLocations}
              className="text-left px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              スポット
            </button>
            {/* 翻訳: Giới thiệu -> 概要 */}
            <button
              onClick={handleAbout}
              className="text-left px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              概要
            </button>

            {!isLoggedIn ? (
              <>
                {/* 翻訳: Đăng nhập -> ログイン */}
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow-md shadow-rose-500/25 font-medium"
                >
                  ログイン
                </button>
                {/* 翻訳: Đăng ký -> 会員登録 */}
                <button
                  onClick={handleSignup}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow-md shadow-rose-500/25 font-medium"
                >
                  会員登録
                </button>
              </>
            ) : (
              <>
                {/* ユーザー情報 (モバイル) */}
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                    {user?.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-base font-semibold uppercase">
                        {getInitials(user?.fullName)}
                      </span>
                    )}
                  </div>
                  {/* ユーザー名 (モバイル) の表示を削除 */}
                </div>
                {/* 翻訳: Đăng xuất -> ログアウト */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-white text-rose-500 border border-rose-500 rounded-lg font-medium"
                >
                  ログアウト
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
