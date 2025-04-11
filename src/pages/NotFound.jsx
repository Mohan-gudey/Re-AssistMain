import { Link } from 'react-router-dom';
import { FaBrain } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        <FaBrain className="text-white text-3xl" />
      </div>
      
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
      
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <div className="space-x-4">
        <Link 
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
        >
          Go Home
        </Link>
        
        <Link 
          to="/contact"
          className="bg-gray-800 hover:bg-gray-700 text-blue-400 border border-blue-800 px-6 py-3 rounded-lg font-medium transition-colors inline-block"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default NotFound;