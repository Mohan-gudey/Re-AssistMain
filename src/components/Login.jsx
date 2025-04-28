// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaUser, FaLock, FaBrain, FaGoogle, FaGithub } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { 
//   signInWithPopup, 
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   sendEmailVerification 
// } from "firebase/auth";
// import { auth, googleProvider } from '../firebase'; // adjust path as needed

// const AuthComponent = ({ initialForm = 'signin', onClose }) => {
//   // Common state
//   const [activeForm, setActiveForm] = useState(initialForm); // 'signin' or 'signup'
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   // Sign-up specific state
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   const navigate = useNavigate();

//   // Update active form when initialForm prop changes
//   useEffect(() => {
//     setActiveForm(initialForm);
//   }, [initialForm]);

//   // Form transition variants
//   const formVariants = {
//     hidden: { opacity: 0, x: activeForm === 'signin' ? -100 : 100 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//     exit: { opacity: 0, x: activeForm === 'signin' ? 100 : -100, transition: { duration: 0.5 } }
//   };

//   // Toggle between sign-in and sign-up forms
//   const toggleForm = () => {
//     setError('');
//     setEmail('');
//     setPassword('');
//     setConfirmPassword('');
//     setActiveForm(activeForm === 'signin' ? 'signup' : 'signin');
//   };

//   // Handle sign-in submission
//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('role', 'user');
//       localStorage.setItem('userEmail', user.email);

//       if (onClose) {
//         onClose(); // Close the modal first
//       }
//       navigate('/dashboard');
//     } catch (err) {
//       if (err.code === 'auth/user-not-found') {
//         setError('No user found with this email.');
//       } else if (err.code === 'auth/wrong-password') {
//         setError('Incorrect password.');
//       } else {
//         setError(err.message || 'Login failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle sign-up submission
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setError('');
  
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
  
//       // Send email verification
//       await sendEmailVerification(user);
  
//       // Optionally store user info
//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('userEmail', user.email);
  
//       alert('Verification email sent! Please check your inbox.');
//       setActiveForm('signin');
//     } catch (err) {
//       switch (err.code) {
//         case 'auth/email-already-in-use':
//           setError('This email is already registered.');
//           break;
//         case 'auth/invalid-email':
//           setError('Invalid email address.');
//           break;
//         case 'auth/weak-password':
//           setError('Password should be at least 6 characters.');
//           break;
//         default:
//           setError('Something went wrong. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle social login (Google)
//   const handleSocialLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('role', 'google');
//       localStorage.setItem('userEmail', user.email);

//       if (onClose) {
//         onClose(); // Close the modal first
//       }
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.message || 'Google sign-in failed.');
//     }
//   };

//   return (
//     <div className="w-full max-w-md">
//       <AnimatePresence mode="wait">
//         {activeForm === 'signin' ? (
//           <motion.div
//             key="signin"
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={formVariants}
//             className=" rounded-xl shadow-2xl p-8 w-full relative border border-gray-700"
//           >
//             <div className="text-center mb-8">
//               <div className="flex items-center justify-center mb-4">
//                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center">
//                   <FaBrain className="text-white text-2xl" />
//                 </div>
//                 <span className="text-xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">RE-ASSIST</span>
//               </div>
//               <h2 className="text-2xl font-bold text-white">Welcome back</h2>
//               <p className="text-gray-300 mt-1">Sign in to your account</p>
//             </div>

//             {error && (
//               <div className="mb-6 bg-red-900 bg-opacity-20 border-l-4 border-red-600 p-4 rounded">
//                 <p className="text-red-400">{error}</p>
//               </div>
//             )}

//             <form onSubmit={handleSignIn} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <div className="flex justify-between mb-1">
//                   <label className="block text-sm font-medium text-gray-300">Password</label>
//                   <button
//                     type="button"
//                     className="text-sm font-medium text-blue-400 hover:text-blue-300"
//                     onClick={() => alert('Password reset link would be sent to your email')}
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
//                   Keep me signed in
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 rounded-lg text-white text-center transition-all font-medium ${loading ? 'bg-blue-700 opacity-70' : 'bg-blue-600 hover:bg-blue-700'}`}
//               >
//                 {loading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : (
//                   'Sign in'
//                 )}
//               </button>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-700"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2  text-gray-400">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={handleSocialLogin}
//                   className="flex justify-center items-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 hover:bg-gray-600 transition-all"
//                 >
//                   <FaGoogle className="h-5 w-5 text-red-400" />
//                   <span className="ml-2 text-gray-200">Google</span>
//                 </button>

//                 <button
//                   type="button"
//                   className="flex justify-center items-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 hover:bg-gray-600 transition-all"
//                   onClick={() => alert('GitHub login not implemented')}
//                 >
//                   <FaGithub className="h-5 w-5 text-gray-200" />
//                   <span className="ml-2 text-gray-200">GitHub</span>
//                 </button>
//               </div>
//             </div>

//             <div className="text-sm text-gray-400 text-center mt-6">
//               Don't have an account yet?{' '}
//               <button
//                 onClick={toggleForm}
//                 className="font-medium text-blue-400 hover:text-blue-300 transition-all"
//               >
//                 Sign up
//               </button>
//             </div>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="signup"
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={formVariants}
//             className=" rounded-xl shadow-2xl p-8 w-full relative border border-gray-700"
//           >
//             <div className="text-center mb-8">
//               <div className="flex items-center justify-center mb-4">
//                 <div className="bg-gradient-to-r from-green-600 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
//                   <FaBrain className="text-white text-2xl" />
//                 </div>
//                 <span className="text-xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">RE-ASSIST</span>
//               </div>
//               <h2 className="text-2xl font-bold text-white">Create an account</h2>
//               <p className="text-gray-300 mt-1">Sign up to get started</p>
//             </div>

//             {error && (
//               <div className="mb-6 bg-red-900 bg-opacity-20 border-l-4 border-red-600 p-4 rounded">
//                 <p className="text-red-400">{error}</p>
//               </div>
//             )}

//             <form onSubmit={handleSignUp} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                     placeholder="name@company.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="pl-10 w-full bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all py-3"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
//                   loading ? 'bg-green-700 opacity-70' : 'bg-green-600 hover:bg-green-700'
//                 }`}
//               >
//                 {loading ? 'Creating account...' : 'Sign up'}
//               </button>
//             </form>

//             <div className="text-sm text-gray-400 text-center mt-6">
//               Already have an account?{' '}
//               <button
//                 onClick={toggleForm}
//                 className="font-medium text-green-400 hover:text-green-300 transition-all"
//               >
//                 Sign in
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AuthComponent;




import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaBrain, FaGoogle, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification 
} from "firebase/auth";
import { auth, googleProvider } from '../firebase'; // adjust path as needed

const AuthComponent = ({ initialForm = 'signin', onClose }) => {
  // Common state
  const [activeForm, setActiveForm] = useState(initialForm); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Sign-up specific state
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  // Update active form when initialForm prop changes
  useEffect(() => {
    setActiveForm(initialForm);
  }, [initialForm]);

  // Form transition variants
  const formVariants = {
    hidden: { opacity: 0, x: activeForm === 'signin' ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: activeForm === 'signin' ? 100 : -100, transition: { duration: 0.5 } }
  };

  // Toggle between sign-in and sign-up forms
  const toggleForm = () => {
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setActiveForm(activeForm === 'signin' ? 'signup' : 'signin');
  };

  // Handle sign-in submission
  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;

  //     localStorage.setItem('isAuthenticated', 'true');
  //     localStorage.setItem('role', 'user');
  //     localStorage.setItem('userEmail', user.email);

  //     if (onClose) {
  //       onClose(); // Close the modal first
  //     }
  //     navigate('/dashboard');
  //   } catch (err) {
  //     if (err.code === 'auth/user-not-found') {
  //       setError('No user found with this email.');
  //     } else if (err.code === 'auth/wrong-password') {
  //       setError('Incorrect password.');
  //     } else {
  //       setError(err.message || 'Login failed. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Handle sign-up submission
  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   setError('');
  
  //   if (password !== confirmPassword) {
  //     setError('Passwords do not match');
  //     return;
  //   }
  
  //   setLoading(true);
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  
  //     // Send email verification
  //     await sendEmailVerification(user);
  
  //     // Optionally store user info
  //     localStorage.setItem('isAuthenticated', 'true');
  //     localStorage.setItem('userEmail', user.email);
  
  //     alert('Verification email sent! Please check your inbox.');
  //     setActiveForm('signin');
  //   } catch (err) {
  //     switch (err.code) {
  //       case 'auth/email-already-in-use':
  //         setError('This email is already registered.');
  //         break;
  //       case 'auth/invalid-email':
  //         setError('Invalid email address.');
  //         break;
  //       case 'auth/weak-password':
  //         setError('Password should be at least 6 characters.');
  //         break;
  //       default:
  //         setError('Something went wrong. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // Handle sign-in submission
const handleSignIn = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send Firebase user data to backend
    const response = await fetch('https://re-assist-backend.onrender.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firebaseId: user.uid,
        email: user.email,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      setError('Failed to sync user data with backend.');
    }
  } catch (err) {
    setError(err.message || 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Handle sign-up submission
const handleSignUp = async (e) => {
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

    // Send Firebase user data to backend
    const response = await fetch('https://re-assist-backend.onrender.com/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firebaseId: user.uid,
        name: 'New User', // Replace with actual name input
        email: user.email,
      }),
    });

    if (response.ok) {
      alert('Verification email sent! Please check your inbox.');
      setActiveForm('signin');
    } else {
      setError('Failed to sync user data with backend.');
    }
  } catch (err) {
    setError(err.message || 'Sign-up failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  // Handle social login (Google)
  const handleSocialLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', 'google');
      localStorage.setItem('userEmail', user.email);

      if (onClose) {
        onClose(); // Close the modal first
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {activeForm === 'signin' ? (
          <motion.div
            key="signin"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="rounded-xl shadow-2xl p-8 w-full relative border border-gray-300 bg-white"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <FaBrain className="text-white text-2xl" />
                </div>
                <span className="text-xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">RE-ASSIST</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
              <p className="text-gray-600 mt-1">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
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
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
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
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2  text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleSocialLogin}
                  className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-200 transition-all"
                >
                  <FaGoogle className="h-5 w-5 text-red-400" />
                  <span className="ml-2 text-gray-800">Google</span>
                </button>

                <button
                  type="button"
                  className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-200 transition-all"
                >
                  <FaGithub className="h-5 w-5 text-gray-800" />
                  <span className="ml-2 text-gray-800">Github</span>
                </button>
              </div>

              <p className="text-center text-gray-700 mt-4 text-sm">
                Don't have an account? 
                <button 
                  className="text-blue-600 font-medium hover:text-blue-400" 
                  onClick={toggleForm}
                >
                  Create one
                </button>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="rounded-xl shadow-2xl p-8 w-full relative border border-gray-300 bg-white"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <FaBrain className="text-white text-2xl" />
                </div>
                <span className="text-xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">RE-ASSIST</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
              <p className="text-gray-600 mt-1">Sign up to start your journey</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all py-3"
                    placeholder="••••••••"
                    required
                  />
                </div>
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
                    Signing up...
                  </span>
                ) : (
                  'Sign up'
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleSocialLogin}
                  className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-200 transition-all"
                >
                  <FaGoogle className="h-5 w-5 text-red-400" />
                  <span className="ml-2 text-gray-800">Google</span>
                </button>

                <button
                  type="button"
                  className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-200 transition-all"
                >
                  <FaGithub className="h-5 w-5 text-gray-800" />
                  <span className="ml-2 text-gray-800">Github</span>
                </button>
              </div>

              <p className="text-center text-gray-700 mt-4 text-sm">
                Already have an account? 
                <button
                  className="text-blue-600 font-medium hover:text-blue-400"
                  onClick={toggleForm}
                >
                  Sign in
                </button>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthComponent;
