// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
//   FaUser, 
//   FaLock, 
//   FaBrain, 
//   FaGoogle, 
//   FaGithub, 
//   FaChartLine, 
//   FaRobot, 
//   FaFileAlt, 
//   FaLightbulb,
//   FaArrowRight,
//   FaDatabase,
//   FaMagic,
//   FaShieldAlt,
//   FaSearch
// } from 'react-icons/fa';

// // Particle Animation Component
// const ParticleAnimation = () => {
//   const canvasRef = useRef(null);
  
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
    
//     const particles = [];
//     const connections = [];
//     const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
//     const connectionDistance = 150;
//     const particleSize = 2;
    
//     class Particle {
//       constructor() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.vx = (Math.random() - 0.5) * 0.3;
//         this.vy = (Math.random() - 0.5) * 0.3;
//         this.size = particleSize;
//       }
      
//       update() {
//         this.x += this.vx;
//         this.y += this.vy;
        
//         if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
//         if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
//       }
      
//       draw() {
//         ctx.fillStyle = 'rgba(80, 130, 230, 0.7)';
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//         ctx.fill();
//       }
//     }
    
//     class Connection {
//       constructor(p1, p2, distance) {
//         this.p1 = p1;
//         this.p2 = p2;
//         this.distance = distance;
//       }
      
//       update() {
//         // Update distance calculation
//         const dx = this.p1.x - this.p2.x;
//         const dy = this.p1.y - this.p2.y;
//         this.distance = Math.sqrt(dx * dx + dy * dy);
//       }
      
//       draw() {
//         if (this.distance < connectionDistance) {
//           const opacity = 1 - (this.distance / connectionDistance);
//           ctx.strokeStyle = `rgba(80, 130, 230, ${opacity * 0.5})`;
//           ctx.lineWidth = 1;
//           ctx.beginPath();
//           ctx.moveTo(this.p1.x, this.p1.y);
//           ctx.lineTo(this.p2.x, this.p2.y);
//           ctx.stroke();
//         }
//       }
//     }
    
//     // Initialize particles
//     for (let i = 0; i < particleCount; i++) {
//       particles.push(new Particle());
//     }
    
//     // Initialize connections
//     for (let i = 0; i < particles.length; i++) {
//       for (let j = i + 1; j < particles.length; j++) {
//         const dx = particles[i].x - particles[j].x;
//         const dy = particles[i].y - particles[j].y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
        
//         connections.push(new Connection(particles[i], particles[j], distance));
//       }
//     }
    
//     // Handle resize
//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
    
//     window.addEventListener('resize', handleResize);
    
//     // Animation loop
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       // Update and draw particles
//       particles.forEach(particle => {
//         particle.update();
//         particle.draw();
//       });
      
//       // Update and draw connections
//       connections.forEach(connection => {
//         connection.update();
//         connection.draw();
//       });
      
//       requestAnimationFrame(animate);
//     };
    
//     animate();
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
  
//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
//     />
//   );
// };

// const LandingPage = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Demo validation - accept any non-empty password
//       if (password.trim() !== '') {
//         navigate('/dashboard');
//       } else {
//         throw new Error('Please enter a password');
//       }
//     } catch (err) {
//       setError(err.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSocialLogin = (provider) => {
//     // In a real app, this would trigger OAuth flow
//     alert(`${provider} authentication would be enabled in production`);
//     navigate('/dashboard'); // Bypass for demo
//   };

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
//       <header className=" bg-opacity-90 shadow-md sticky top-0 z-50 border-b border-gray-800">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             {/* Logo */}
//             <div className="flex items-center">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
//                 <FaBrain className="text-white text-xl" />
//               </div>
//               <span className="text-2xl font-bold text-blue-400">RE-ASSIST</span>
//             </div>
            
//             {/* Navigation */}
//             <nav className="hidden md:flex space-x-8">
//               <button 
//                 onClick={() => handleNav('resources')}
//                 className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 Resources
//               </button>
//               <button 
//                 onClick={() => handleNav('contact')}
//                 className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 Contact
//               </button>
//               <button 
//                 onClick={() => handleNav('login')}
//                 className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
//               >
//                 Login
//               </button>
//               <button 
//                 onClick={() => handleNav('login')}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//               >
//                 Join Now
//               </button>
//             </nav>
            
//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button className=" p-2 rounded-md text-gray-300 hover:text-white">
//                 <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10">
//         {/* Hero Section */}
//         <section className="py-16 sm:py-24  relative">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex flex-col lg:flex-row items-center gap-10">
//               <div className="lg:w-1/2 relative z-10">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
//                     The AI Assistant That <span className="text-blue-400">Revolutionizes</span> Your Work
//                   </h1>
//                   <p className="text-xl text-gray-300 mb-8">
//                     XYZ helps you automate tasks, analyze data, and generate insights faster than ever before.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <button 
//                       onClick={() => handleNav('join')}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center justify-center"
//                     >
//                       Get Started
//                       <FaArrowRight className="ml-2" />
//                     </button>
//                     <button 
//                       onClick={() => handleNav('demo')}
//                       className=" hover:bg-gray-700 text-blue-400 border border-blue-800 px-6 py-3 rounded-lg font-medium text-lg transition-colors"
//                     >
//                       Watch Demo
//                     </button>
//                   </div>
//                 </motion.div>
//               </div>
//               <div className="lg:w-1/2">
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   className=" rounded-2xl shadow-xl p-4 sm:p-6 relative overflow-hidden"
//                 >
//                   <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-blue-900 rounded-full blur-xl opacity-30"></div>
//                   <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-indigo-900 rounded-full blur-xl opacity-30"></div>
                  
//                   <div className="relative z-10  p-4 rounded-xl border border-gray-700">
//                     <div className="flex items-center mb-4">
//                       <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
//                         <FaRobot className="text-blue-400" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-200">Re-Assistant</h3>
//                         <p className="text-xs text-gray-400">Online • Prompt response</p>
//                       </div>
//                     </div>
                    
//                     <div className="border-t border-gray-700 pt-4">
//                       <div className="bg-gray-700 p-3 rounded-lg rounded-tl-none inline-block mb-3">
//                         <p className="text-sm text-gray-200">How can I analyze this dataset to find key trends?</p>
//                       </div>
                      
//                       <div className="bg-blue-900 p-3 rounded-lg rounded-tr-none inline-block ml-auto mb-3">
//                         <p className="text-sm text-gray-200">I'll help you analyze that. First, let's identify the main variables and their relationships. Then we can visualize the key trends using time series analysis.</p>
//                       </div>
                      
//                       <div className="bg-blue-900 p-3 rounded-lg rounded-tr-none inline-block ml-auto">
//                         <p className="text-sm text-gray-200">Here's a summary of the top 3 trends I've identified:</p>
//                         <ul className="text-sm text-gray-200 mt-2 list-disc list-inside">
//                           <li>Seasonal pattern with peaks in Q3</li>
//                           <li>15% year-over-year growth</li>
//                           <li>Strong correlation with market index</li>
//                         </ul>
//                       </div>
//                     </div>
                    
//                     <div className="mt-4 relative">
//                       <input 
//                         type="text" 
//                         placeholder="Ask me anything..."
//                         className="w-full p-3 pr-10 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
//                       />
//                       <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-16 ">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
//               <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//                 Our AI assistant is designed to enhance your productivity with powerful features
//               </p>
//             </div>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 {
//                   icon: <FaDatabase className="text-blue-400 text-3xl" />,
//                   title: "Advanced Data Analysis",
//                   description: "Process complex datasets and extract valuable insights automatically.",
//                 },
//                 {
//                   icon: <FaFileAlt className="text-blue-400 text-3xl" />,
//                   title: "Content Generation",
//                   description: "Create high-quality documents, reports and summaries with AI assistance.",
//                 },
//                 {
//                   icon: <FaSearch className="text-blue-400 text-3xl" />,
//                   title: "Intelligent Search",
//                   description: "Find exactly what you need across all your documents in seconds.",
//                 },
//                 {
//                   icon: <FaMagic className="text-blue-400 text-3xl" />,
//                   title: "Workflow Automation",
//                   description: "Automate repetitive tasks and streamline your processes.",
//                 },
//                 {
//                   icon: <FaLightbulb className="text-blue-400 text-3xl" />,
//                   title: "Smart Recommendations",
//                   description: "Get personalized suggestions based on your usage patterns.",
//                 },
//                 {
//                   icon: <FaShieldAlt className="text-blue-400 text-3xl" />,
//                   title: "Enterprise Security",
//                   description: "Your data remains private and secure with enterprise-grade protection.",
//                 }
//               ].map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className=" rounded-xl shadow-lg border border-gray-700 p-6 hover:border-blue-700 transition-all"
//                 >
//                   <div className="w-14 h-14 rounded-full bg-blue-900 bg-opacity-50 flex items-center justify-center mb-4">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
//                   <p className="text-gray-300">{feature.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Use Cases */}
//         <section className="py-16 ">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl font-bold text-white mb-4">Use Cases</h2>
//               <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//                 Discover how different industries are leveraging our AI assistant
//               </p>
//             </div>
            
//             <div className="grid md:grid-cols-2 gap-8">
//               {[
//                 {
//                   title: "Research & Academia",
//                   description: "Accelerate literature reviews, analyze research data, and generate paper summaries.",
//                   image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
//                 },
//                 {
//                   title: "Financial Services",
//                   description: "Analyze market trends, generate reports, and automate compliance documentation.",
//                   image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
//                 },
//                 {
//                   title: "Healthcare",
//                   description: "Summarize patient records, assist with research, and streamline documentation.",
//                   image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
//                 },
//                 {
//                   title: "Legal",
//                   description: "Review contracts, conduct legal research, and draft standard documents.",
//                   image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
//                 },
//               ].map((useCase, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className=" rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-700"
//                 >
//                   <div className="md:w-2/5">
//                     <div className="h-full bg-blue-900">
//                       <div 
//                         className="h-48 md:h-full bg-cover bg-center opacity-80" 
//                         style={{ backgroundImage: `url('/api/placeholder/600/400')` }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="md:w-3/5 p-6">
//                     <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
//                     <p className="text-gray-300 mb-4">{useCase.description}</p>
//                     <button className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
//                       Learn more
//                       <FaArrowRight className="ml-2 text-sm" />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Resources Section */}
//         <section className="py-16 ">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl font-bold text-white mb-4">Resources</h2>
//               <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//                 Learn how to get the most out of our AI assistant with these helpful resources
//               </p>
//             </div>
            
//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   title: "Getting Started Guide",
//                   description: "A comprehensive guide to help you set up and start using our AI assistant.",
//                   type: "Guide",
//                 },
//                 {
//                   title: "Best Practices for AI Prompts",
//                   description: "Learn how to craft effective prompts to get the best results from our AI.",
//                   type: "Tutorial",
//                 },
//                 {
//                   title: "Advanced Data Analysis Techniques",
//                   description: "Take your data analysis to the next level with these advanced techniques.",
//                   type: "Webinar",
//                 },
//               ].map((resource, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className=" rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:border-blue-700 transition-all"
//                 >
//                   <div className="h-40 bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center">
//                     <FaFileAlt className="text-blue-300 text-5xl" />
//                   </div>
//                   <div className="p-6">
//                     <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300 mb-4">
//                       {resource.type}
//                     </div>
//                     <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
//                     <p className="text-gray-300 mb-4">{resource.description}</p>
//                     <button className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
//                       Read more
//                       <FaArrowRight className="ml-2 text-sm" />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
            
//             <div className="text-center mt-10">
//               <button className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
//                 View all resources
//                 <FaArrowRight className="ml-2 text-sm" />
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative">
//           <div className="absolute inset-0 z-0 opacity-30">
//             <ParticleAnimation />
//           </div>
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//             <div className="max-w-4xl mx-auto text-center">
//               <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to transform your workflow?</h2>
//               <p className="text-xl text-blue-200 mb-8">
//                 Join thousands of professionals who are already using RE-ASSIST to accelerate their work.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button 
//                   onClick={() => handleNav('join')}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
//                 >
//                   Start Free Trial
//                 </button>
//                 <button className=" hover:bg-gray-700 text-blue-300 border border-blue-700 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
//                   Schedule Demo
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className=" text-gray-400 py-12 border-t border-gray-800">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center mb-4">
//                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
//                   <FaBrain className="text-white text-xl" />
//                 </div>
//                 <span className="text-2xl font-bold text-blue-400">RE-ASSIST</span>
//               </div>
//               <p className="text-gray-400 mb-4">
//                 Empowering professionals with AI-powered solutions for the modern workplace.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
//                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.42 14.49V11h-2v5.49h2zm-1-6.29c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zm7.88 6.29h-2v-2.37c0-.97-.43-1.63-1.33-1.63-.73 0-1.17.49-1.36.95-.07.17-.09.4-.09.63v2.42h-2V11h2v.86c.4-.62 1.03-1.04 2.31-1.04 1.68 0 2.47 1.1 2.47 3.46v3.21z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
//                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.957 14.307c-.181.087-.378.143-.575.143a1.171 1.171 0 01-.56-.136c-1.453-.698-3.242-1.076-5.106-1.076-1.06 0-2.122.142-3.158.425a1.167 1.167 0 01-.45-.088 1.177 1.177 0 01-.728-1.502c.084-.312.29-.576.575-.729 1.21-.357 2.445-.538 3.76-.538 2.196 0 4.307.436 6.073 1.236.302.12.544.361.664.664a1.168 1.168 0 01-.495 1.6zm1.303-3.173c-.224.109-.474.168-.72.168a1.45 1.45 0 01-.697-.178c-1.673-.83-3.766-1.329-6.02-1.329-1.271 0-2.515.175-3.712.52-.151.043-.312.065-.475.065a1.451 1.451 0 01-1.376-1.924c.124-.425.415-.776.804-.97 1.464-.426 2.991-.641 4.759-.641 2.643 0 5.176.609 7.308 1.759.385.209.654.571.728 1.001a1.457 1.457 0 01-.599 1.529zm1.504-3.467c-.261.124-.55.191-.843.191-.342 0-.677-.09-.972-.259-1.958-1.058-4.713-1.646-7.142-1.646-1.397 0-2.903.182-4.425.54a1.722 1.722 0 01-.51.082c-.93 0-1.736-.67-1.895-1.584-.169-.941.45-1.846 1.375-2.072 1.841-.454 3.582-.688 5.334-.688 2.706 0 5.789.653 8.298 1.966.48.263.818.724.918 1.249.101.524-.089 1.06-.47 1.438-.259.258-.596.435-.968.512z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
//                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
//                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M23.954 4.569c-.885.388-1.83.65-2.825.772 1.014-.611 1.794-1.574 2.166-2.724-.951.555-2.005.96-3.127 1.185-.896-.957-2.184-1.555-3.594-1.555-2.72 0-4.92 2.21-4.92 4.918 0 .386.044.762.127 1.122-4.09-.205-7.71-2.16-10.142-5.137-.424.731-.667 1.582-.667 2.479 0 1.704.877 3.214 2.204 4.108-.784-.025-1.52-.24-2.165-.599v.06c0 2.39 1.697 4.377 3.95 4.827-.402.116-.83.172-1.268.172-.31 0-.613-.03-.905-.086.624 1.953 2.444 3.38 4.6 3.419-1.68 1.318-3.802 2.107-6.106 2.107-.398 0-.79-.023-1.175-.07 2.18 1.403 4.768 2.212 7.55 2.212 9.06 0 14.01-7.5 14.01-14.02 0-.21-.005-.42-.014-.63.962-.69 1.797-1.56 2.457-2.55z" />
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Use Cases</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Guides</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Webinars</a></li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
//             <p>&copy; {new Date().getFullYear()} RE-ASSIST Technology, Inc. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       {/* Login Modal */}
//       {showLogin && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className=" rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 relative border border-gray-700"
//           >
//             <button 
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
//               onClick={() => setShowLogin(false)}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
            
//             <div className="text-center mb-8">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
//                 <FaBrain className="text-white text-2xl" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">Welcome back</h2>
//               <p className="text-gray-300 mt-1">Sign in to your account</p>
//             </div>
            
//             {error && (
//               <div className="mb-6 bg-red-900 bg-opacity-20 border-l-4 border-red-600 p-4 rounded">
//                 <p className="text-red-400">{error}</p>
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit} className="space-y-6">
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
//                   id="remember-me-modal"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
//                 />
//                 <label htmlFor="remember-me-modal" className="ml-2 block text-sm text-gray-300">
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
//                   onClick={() => handleSocialLogin('Google')}
//                   className="flex justify-center items-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 hover:bg-gray-600 transition-all"
//                 >
//                   <FaGoogle className="h-5 w-5 text-red-400" />
//                   <span className="ml-2 text-gray-200">Google</span>
//                 </button>
                
//                 <button
//                   type="button"
//                   onClick={() => handleSocialLogin('GitHub')}
//                   className="flex justify-center items-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 hover:bg-gray-600 transition-all"
//                 >
//                   <FaGithub className="h-5 w-5 text-gray-200" />
//                   <span className="ml-2 text-gray-200">GitHub</span>
//                 </button>
//               </div>
//             </div>
            
//             <div className="mt-8 text-center">
//               <p className="text-sm text-gray-400">
//                 Don't have an account?{' '}
//                 <button
//                   onClick={() => {
//                     setShowLogin(false);
//                     handleNav('join');
//                   }}
//                   className="font-medium text-blue-400 hover:text-blue-300"
//                 >
//                   Sign up for free
//                 </button>
//               </p>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LandingPage;



// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// // Import all page components
// import LandingPage from './pages/LandingPage';
// import Dashboard from './pages/Dashboard';
// import Resources from './pages/Resources';
// import NotFound from './pages/NotFound';
// import Signup from './pages/Signup';
// import Login from './components/Login';

// const App = () => {
//   // Simulating user authentication state (replace with actual auth logic)
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Here, you would check if the user is authenticated (e.g., check a token or user session)
//     const userAuthStatus = localStorage.getItem('authStatus');
//     if (userAuthStatus === 'authenticated') {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/signin" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/resources" element={<Resources />} />
      
//       {/* Protected route */}
//       <Route 
//         path="/dashboard/*" 
//         element={
        
//             <Dashboard />
  
//         } 
//       />
      
//       {/* 404 route */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import all page components
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './components/Login';
import ResearchProfilePage from './components/ResearchProfilePage'; // Import the new profile page

const App = () => {
  // Simulating user authentication state (replace with actual auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Here, you would check if the user is authenticated (e.g., check a token or user session)
    const userAuthStatus = localStorage.getItem('authStatus');
    if (userAuthStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resources" element={<Resources />} />
      
      {/* Protected routes */}
      <Route path="/dashboard/*" element={<Dashboard />} />
      
      {/* Profile route */}
      <Route path="/profile" element={<ResearchProfilePage />} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;