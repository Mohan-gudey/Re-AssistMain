// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Import components - making all paths consistent
// import ParticleAnimation from '../components/ParticleAnimation';
// import Header from '../components/Header';
// import HeroSection from '../components/sections/HeroSection';
// import FeaturesSection from '../components/sections/FeaturesSection'; // Fixed path
// import UseCasesSection from '../components/sections/UseCasesSection';
// import ResourcesSection from '../components/sections/ResourcesSection';
// import CTASection from '../components/sections/CTASection';
// import Footer from '../components/Footer';
// import LoginModal from '../components/Login';

// const LandingPage = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const navigate = useNavigate();

//   const handleNav = (path) => {
//     if (path === 'login') {
//       setShowLogin(true);
//     } else {
//       navigate(`/${path}`);
//     }
//   };

//   return (
//     <div className="min-h-screen  text-gray-100 relative overflow-hidden">
//       {/* Particle Animation Background */}
//       <ParticleAnimation />
      
//       {/* Header */}
//       <Header handleNav={handleNav} />

//       {/* Main Content */}
//       <main className="relative z-10">
//         {/* Hero Section */}
//         <HeroSection handleNav={handleNav} />

//         {/* Features Section */}
//         <FeaturesSection />

//         {/* Use Cases */}
//         <UseCasesSection />

//         {/* Resources Section */}
//         <ResourcesSection />

//         {/* CTA Section */}
//         <CTASection handleNav={handleNav} />
//       </main>

//       {/* Footer */}
//       <Footer />

//       {/* Login Modal */}
//       <LoginModal 
//         showLogin={showLogin} 
//         setShowLogin={setShowLogin} 
//         handleNav={handleNav} 
//       />
//     </div>
//   );
// };

// export default LandingPage;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Import components
// import ParticleAnimation from '../components/ParticleAnimation';
// import Header from '../components/Header';
// import HeroSection from '../components/sections/HeroSection';
// import FeaturesSection from '../components/sections/FeaturesSection';
// import UseCasesSection from '../components/sections/UseCasesSection';
// import ResourcesSection from '../components/sections/ResourcesSection';
// import CTASection from '../components/sections/CTASection';
// import Footer from '../components/Footer';
// import LoginModal from '../components/Login';

// const LandingPage = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const navigate = useNavigate();

//   const handleNav = (path) => {
//     if (path === 'login') {
//       setShowLogin(true); // Show login modal only when Sign In is clicked
//     } else {
//       navigate(`/${path}`);
//     }
//   };

//   return (
//     <div className="min-h-screen  text-gray-100 relative overflow-hidden">
//       {/* Particle Background */}
//       <ParticleAnimation />

//       {/* Header */}
//       <Header handleNav={handleNav} />

//       {/* Page Content */}
//       <main className="relative z-10">
//         <HeroSection handleNav={handleNav} />
//         <FeaturesSection />
//         <UseCasesSection />
//         <ResourcesSection />
//         <CTASection handleNav={handleNav} />
//       </main>

//       {/* Footer */}
//       <Footer />

//       {/* Login Modal - shown only when showLogin is true */}
//       {showLogin && (
//         <LoginModal
//           showLogin={showLogin}
//           setShowLogin={setShowLogin}
//           handleNav={handleNav}
//         />
//       )}
//     </div>
//   );
// };

// export default LandingPage;




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import ParticleAnimation from '../components/ParticleAnimation';
import Header from '../components/Header';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import UseCasesSection from '../components/sections/UseCasesSection';
import ResourcesSection from '../components/sections/ResourcesSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/Footer';
import AuthComponent from '../components/Login'; // Use our combined auth component

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const navigate = useNavigate();

  const handleNav = (path) => {
    if (path === 'login') {
      setAuthMode('signin');
      setShowAuth(true);
    } else if (path === 'signup') {
      setAuthMode('signup');
      setShowAuth(true);
    } else {
      navigate(`/${path}`);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleAnimation />

      {/* Header */}
      <Header handleNav={handleNav} />

      {/* Page Content */}
      <main className="relative z-10">
        <HeroSection handleNav={handleNav} />
        <FeaturesSection />
        <UseCasesSection />
        <ResourcesSection />
        <CTASection handleNav={handleNav} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal - shown only when showAuth is true */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">
            {/* Close button */}
            <button 
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Auth Component */}
            <AuthComponent initialForm={authMode} onClose={() => setShowAuth(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;