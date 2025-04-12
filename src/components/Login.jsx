import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaBrain, FaGoogle, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = ({ showLogin, setShowLogin, handleNav }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for dummy user credentials
      if (email === 'user@gmail.com' && password === '123') {
        // Set authentication data in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', 'user');
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else if (password.trim() !== '') {
        // If password is not empty but credentials don't match our dummy user
        // Still authenticate for demo purposes
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', 'guest');
        
        nai
      } else {
        throw new Error('Please enter a password');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // In a real app, this would trigger OAuth flow
    alert(`${provider} authentication would be enabled in production`);
    
    // Set authentication data in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', 'social');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  if (!showLogin) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 relative border border-gray-700"
      >
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          onClick={() => setShowLogin(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FaBrain className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-gray-300 mt-1">Sign in to your account</p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-900 bg-opacity-20 border-l-4 border-red-600 p-4 rounded">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <button
                type="button"
                className="text-sm font-medium text-blue-400 hover:text-blue-300"
                onClick={() => alert('Password reset link would be sent to your email')}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="remember-me-modal"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
            />
            <label htmlFor="remember-me-modal" className="ml-2 block text-sm text-gray-300">
              Keep me signed in
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 rounded-lg text-white text-center transition-all font-medium ${loading ? 'bg-blue-700 opacity-70' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex justify-center items-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 hover:bg-gray-600 transition-all"
            >
              <FaGoogle className="h-5 w-5 text-red-400" />
              <span className="ml-2 text-gray-200">Google</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleSocialLogin('GitHub')}
              className="flex justify-center items-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 hover:bg-gray-600 transition-all"
            >
              <FaGithub className="h-5 w-5 text-gray-200" />
              <span className="ml-2 text-gray-200">GitHub</span>
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => {
                setShowLogin(false);
                handleNav('join');
              }}
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign up for free
            </button>
          </p>
        </div>
        
        
      </motion.div>
    </div>
  );
};

export default Login;