import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('email');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUser(null);
    setMobileMenuOpen(false);
    navigate('/auth');
  };

  const handleLogin = () => {
    setMobileMenuOpen(false);
    navigate('/auth');
  };

  const handleSignup = () => {
    setMobileMenuOpen(false);
    navigate('/auth');
  };

  const handleHome = () => {
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleLocations = () => {
    setMobileMenuOpen(false);
    navigate('/locations');
  };

  const handleAbout = () => {
    setMobileMenuOpen(false);
    navigate('/about');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  };

  return (
    <header className="w-full bg-white/60 backdrop-blur-md border-b border-pink-200/25 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div 
            onClick={handleHome}
            className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-xl text-lg font-bold flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
          >
            LOGO
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={handleHome}
              className="text-sm text-rose-900 font-medium hover:text-rose-700 transition-colors duration-250"
            >
              Trang chủ
            </button>
            <button
              onClick={handleLocations}
              className="text-sm text-rose-900 font-medium hover:text-rose-700 transition-colors duration-250"
            >
              Địa điểm
            </button>
            <button
              onClick={handleAbout}
              className="text-sm text-rose-900 font-medium hover:text-rose-700 transition-colors duration-250"
            >
              Giới thiệu
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow-md shadow-rose-500/25 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 transition-all duration-250"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={handleSignup}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow-md shadow-rose-500/25 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg hover:shadow-rose-500/35 hover:-translate-y-0.5 transition-all duration-250"
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
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
                <span className="text-sm text-rose-900 font-semibold max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.fullName}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-white text-rose-500 border border-rose-500 rounded-lg font-medium hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-500/25 transition-all duration-250"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-rose-900 hover:bg-rose-50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-pink-200/25 pt-4">
            <button
              onClick={handleHome}
              className="text-left px-4 py-2 text-sm text-rose-900 font-medium hover:bg-rose-50 rounded-lg transition-colors"
            >
              Trang chủ
            </button>
            <button
              onClick={handleLocations}
              className="text-left px-4 py-2 text-sm text-rose-900 font-medium hover:bg-rose-50 rounded-lg transition-colors"
            >
              Địa điểm
            </button>
            <button
              onClick={handleAbout}
              className="text-left px-4 py-2 text-sm text-rose-900 font-medium hover:bg-rose-50 rounded-lg transition-colors"
            >
              Giới thiệu
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow-md shadow-rose-500/25 font-medium"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={handleSignup}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow-md shadow-rose-500/25 font-medium"
                >
                  Đăng ký
                </button>
              </>
            ) : (
              <>
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
                  <span className="text-sm text-rose-900 font-semibold">
                    {user?.fullName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm bg-white text-rose-500 border border-rose-500 rounded-lg font-medium"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
