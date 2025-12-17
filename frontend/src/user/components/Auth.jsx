import { useState } from 'react';
import { Mail, Lock, User, Calendar } from 'lucide-react';
import { loginAPICall, signupAPICall } from "../../services/AuthService";
import { useNavigate } from 'react-router-dom';

// Logo Component
const Logo = () => (
  <div className="flex justify-center mb-8">
    <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
      <span className="text-white text-2xl font-bold">HW</span>
    </div>
  </div>
);

// Input Field Component
const InputField = ({ type, placeholder, icon, value, onChange, label }) => {
  const IconComponent = icon;

  return (
    <div className="mb-5">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <IconComponent size={20} />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:bg-white text-gray-800 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

// Button Component
const Button = ({ children, onClick, loading = false }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full py-3.5 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-600 disabled:opacity-50"
  >
    {loading ? '処理中...' : children}
  </button>
);

// Link Text Component
const LinkText = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="text-sm text-red-500 hover:text-red-700 font-medium hover:underline"
  >
    {children}
  </button>
);

// Divider Component
const Divider = ({ text }) => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    {text && (
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-gray-500">{text}</span>
      </div>
    )}
  </div>
);

// Social Button Component
const SocialButton = ({ provider, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 shadow-sm"
  >
    <span className="mr-2 text-xl">🔵</span>
    <span className="text-gray-700 font-medium">{provider}でログイン</span>
  </button>
);

// Local welcome page after login (simple test view)
const LocalMessagePage = ({ username, onBackToLogin }) => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
    <p className="text-xl text-gray-800">
      Đăng nhập thành công. Xin chào {username || 'bạn'}!
    </p>
    <button
      onClick={onBackToLogin}
      className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
    >
      Quay lại trang đăng nhập
    </button>
  </div>
);

// Login Form Component
const LoginForm = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // GỌI API ĐĂNG NHẬP
      const data = await loginAPICall(username, password);
      console.log("Login ok:", data);
      navigate('/events/search');
    } catch (err) {
      console.error("Login fail:", err);
      alert("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-8 py-10">
      <Logo />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          おかえりなさい！
        </h1>
        <p className="text-gray-500">
          家族で楽しめるおdかけスポットを探そう
        </p>
      </div>

      <InputField
        type="text"
        placeholder="ユーザー名を入力"
        label="ユーザー名"
        icon={User}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <InputField
        type="password"
        placeholder="パスワードを入力"
        label="パスワード"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex items-center justify-between mb-6 mt-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-red-500 border-gray-300 rounded cursor-pointer"
          />
          <span className="ml-2 text-sm text-gray-600">
            ログイン状態を保持
          </span>
        </label>
        <button className="text-sm text-red-500 hover:text-red-700 font-medium">
          パスワードを忘れた？
        </button>
      </div>

      <Button onClick={handleLogin} loading={loading}>
        ログイン
      </Button>

      <Divider text="または" />

      <SocialButton
        provider="Google"
        onClick={() => console.log('Google login')}
      />

      <div className="text-center mt-8">
        <p className="text-gray-600 text-sm mb-2">
          アカウントをお持ちでないですか？
        </p>
        <LinkText onClick={onSwitchToRegister}>
          新規登録はこちら →
        </LinkText>
      </div>
    </div>
  );
};

// Register Form Component
const RegisterForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = async () => {
    // Validate fullName
    if (!fullName.trim()) {
      alert('氏名を入力してください');
      return;
    }

    // Validate email
    if (!email.trim()) {
      alert('メールアドレスを入力してください');
      return;
    }

    // Validate password
    if (password.length < 8) {
      alert('パスワードは8文字以上で入力してください');
      return;
    }

    if (password !== confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }

    // Validate birthdate
    if (!birthdate) {
      alert('生年月日を入力してください');
      return;
    }

    // Validate gender
    if (!gender) {
      alert('性別を選択してください');
      return;
    }

    if (!agreedToTerms) {
      alert('利用規約に同意してください');
      return;
    }

    setLoading(true);

    try {
      const response = await signupAPICall(email, password, fullName, birthdate, gender);

      if (response.success) {
        alert('アカウント登録が完了しました！');
        // Redirect to login or home page
        onSwitchToLogin();
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message || '登録に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-8 py-10">
      <Logo />

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          アカウント作成
        </h1>
        <p className="text-gray-500">
          家族の思い出作りを今すぐ始めましょう
        </p>
      </div>

      <InputField
        type="text"
        placeholder="山田 太郎"
        label="氏名"
        icon={User}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <InputField
        type="email"
        placeholder="your.email@example.com"
        label="メールアドレス"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        type="password"
        placeholder="8文字以上"
        label="パスワード"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <InputField
        type="password"
        placeholder="もう一度入力してください"
        label="パスワード（確認）"
        icon={Lock}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <InputField
        type="date"
        placeholder=""
        label="生年月日"
        icon={Calendar}
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          性別
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
              className="w-4 h-4 text-red-500 border-gray-300 cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700">男性</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
              className="w-4 h-4 text-red-500 border-gray-300 cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700">女性</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="other"
              checked={gender === 'other'}
              onChange={(e) => setGender(e.target.value)}
              className="w-4 h-4 text-red-500 border-gray-300 cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700">その他</span>
          </label>
        </div>
      </div>

      <div className="mt-6 mb-6">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 mt-1 text-red-500 border-gray-300 rounded cursor-pointer"
          />
          <span className="ml-3 text-sm text-gray-600">
            <a href="#" className="text-red-500 hover:text-red-700 font-medium">利用規約</a>
            と
            <a href="#" className="text-red-500 hover:text-red-700 font-medium">プライバシーポリシー</a>
            に同意します
          </span>
        </label>
      </div>

      <Button onClick={handleRegister} loading={loading}>
        アカウント登録
      </Button>

      <Divider text="または" />

      <SocialButton
        provider="Google"
        onClick={() => console.log('Google register')}
      />

      <div className="text-center mt-8">
        <p className="text-gray-600 text-sm mb-2">
          既にアカウントをお持ちですか？
        </p>
        <LinkText onClick={onSwitchToLogin}>
          ログインはこちら →
        </LinkText>
      </div>
    </div>
  );
};

// Main App Component
export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  if (isLoggedIn) {
    return (
      <LocalMessagePage
        username={loggedInUser}
        onBackToLogin={() => {
          setIsLoggedIn(false);
          setShowLogin(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        {showLogin ? (
          <LoginForm
            onSwitchToRegister={() => setShowLogin(false)}
            onLoginSuccess={(name) => {
              setLoggedInUser(name);
              setIsLoggedIn(true);
            }}
          />
        ) : (
          <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    </div>
  );
}
