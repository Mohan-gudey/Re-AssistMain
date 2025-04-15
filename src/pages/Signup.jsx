// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaUser, FaLock, FaBrain } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';

// const Signup = ({ showSignup, setShowSignup}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('role', 'user');
//       navigate('/dashboard');
//     } catch (err) {
//       if (err.code === 'auth/email-already-in-use') {
//         setError('Email is already in use.');
//       } else {
//         setError(err.message || 'Signup failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!showSignup) return null;
//   const HandleSignUp =() =>{
//     navigate('/signup');
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 relative border border-gray-700"
//       >
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
//           onClick={() => setShowSignup(false)}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         <div className="text-center mb-8">
//           <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
//             <FaBrain className="text-white text-2xl" />
//           </div>
//           <h2 className="text-2xl font-bold text-white">Create an account</h2>
//           <p className="text-gray-300 mt-1">Sign up to get started</p>
//         </div>

//         {error && (
//           <div className="mb-6 bg-red-900 bg-opacity-20 border-l-4 border-red-600 p-4 rounded">
//             <p className="text-red-400">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaUser className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                 placeholder="name@company.com"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-3 px-4 rounded-lg text-white text-center transition-all font-medium ${loading ? 'bg-green-700 opacity-70' : 'bg-green-600 hover:bg-green-700'}`}
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Creating account...
//               </span>
//             ) : (
//               'Sign up'
//             )}
//           </button>
//         </form>

//         <div className="text-sm text-gray-400 text-center mt-6">
//           Already have an account?{' '}
//           <button
//             onClick={HandleSignUp}
//             className="font-medium text-green-400 hover:text-green-300 transition-all"
//           >
//             Sign in
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;


// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaUser, FaLock, FaBrain } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Simulate signup
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('role', 'user');
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Signup failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignIn = () => {
//     navigate('/signin');
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full relative border border-gray-700"
//       >
//         <div className="text-center mb-8">
//           <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
//             <FaBrain className="text-white text-2xl" />
//           </div>
//           <h2 className="text-2xl font-bold text-white">Create an account</h2>
//           <p className="text-gray-300 mt-1">Sign up to get started</p>
//         </div>

//         {error && (
//           <div className="mb-6 bg-red-900 bg-opacity-20 border-l-4 border-red-600 p-4 rounded">
//             <p className="text-red-400">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaUser className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                 placeholder="name@company.com"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
//               loading ? 'bg-green-700 opacity-70' : 'bg-green-600 hover:bg-green-700'
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Creating account...
//               </span>
//             ) : (
//               'Sign up'
//             )}
//           </button>
//         </form>

//         <div className="text-sm text-gray-400 text-center mt-6">
//           Already have an account?{' '}
//           <button
//             onClick={handleSignIn}
//             className="font-medium text-green-400 hover:text-green-300 transition-all"
//           >
//             Sign in
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;


import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaBrain } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase'; // adjust path as needed

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send email verification
      await sendEmailVerification(user);
  
      // Optionally store user info
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', user.email);
  
      alert('Verification email sent! Please check your inbox.');
      navigate('/login');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full relative border border-gray-700"
      >
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FaBrain className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white">Create an account</h2>
          <p className="text-gray-300 mt-1">Sign up to get started</p>
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
                className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
              loading ? 'bg-green-700 opacity-70' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{' '}
          <button
            onClick={handleSignIn}
            className="font-medium text-green-400 hover:text-green-300 transition-all"
          >
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
