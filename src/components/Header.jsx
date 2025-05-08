// import { FaBrain } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Header = ({ handleNav }) => {
//   const navigate = useNavigate();

//   const navigateToHero = () => {
//     // Option 1: Navigate to root/home page
//     navigate('/');
    
//     // Option 2: Scroll to top/hero section
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//   };

//   return (
//     <header className=" bg-opacity-90 shadow-md sticky top-0 z-50 border-b border-gray-800">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo with click handler */}
//           <div 
//             className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
//             onClick={navigateToHero}
//           >
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
//               <FaBrain className="text-white text-xl" />
//             </div>
//             <span className="text-2xl font-bold text-blue-400">RE-ASSIST</span>
//           </div>
          
//           {/* Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             <button 
//               onClick={() => handleNav('resources')}
//               className="text-gray-800 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
//             >
//               Resources
//             </button>
//             <button 
//               onClick={() => handleNav('contact')}
//               className="text-gray-800 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
//             >
//               Contact
//             </button>
//             <button 
//               onClick={() => handleNav('login')}
//               className="text-gray-800 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
//             >
//               Login
//             </button>
//             <button 
//               onClick={() => handleNav('signup')}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//             >
//               Join Now
//             </button>
//           </nav>
          
//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button 
//               onClick={() => handleNav('menu')}
//               className=" p-2 rounded-md text-gray-300 hover:text-white"
//             >
//               <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { FaBrain } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleNav }) => {
  const navigate = useNavigate();

  const navigateToHero = () => {
    // Option 1: Navigate to root/home page
    navigate('/');
    
    // Option 2: Scroll to top/hero section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="bg-white bg-opacity-90 shadow-md sticky top-0 z-50 border-b border-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo with click handler */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={navigateToHero}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
              <FaBrain className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold text-blue-600">RE-ASSIST</span>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNav('resources')}
              className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Resources
            </button>
            <button 
              onClick={() => handleNav('login')}
              className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => handleNav('signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Join Now
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => handleNav('menu')}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
