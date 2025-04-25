// import { motion } from 'framer-motion';
// import { FaDatabase, FaFileAlt, FaSearch, FaMagic, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

// const FeaturesSection = () => {
//   const features = [
//     {
//       icon: <FaDatabase className="text-blue-400 text-3xl" />,
//       title: "Advanced Data Analysis",
//       description: "Process complex datasets and extract valuable insights automatically.",
//     },
//     {
//       icon: <FaFileAlt className="text-blue-400 text-3xl" />,
//       title: "Content Generation",
//       description: "Create high-quality documents, reports and summaries with AI assistance.",
//     },
//     {
//       icon: <FaSearch className="text-blue-400 text-3xl" />,
//       title: "Intelligent Search",
//       description: "Find exactly what you need across all your documents in seconds.",
//     },
//     {
//       icon: <FaMagic className="text-blue-400 text-3xl" />,
//       title: "Workflow Automation",
//       description: "Automate repetitive tasks and streamline your processes.",
//     },
//     {
//       icon: <FaLightbulb className="text-blue-400 text-3xl" />,
//       title: "Smart Recommendations",
//       description: "Get personalized suggestions based on your usage patterns.",
//     },
//     {
//       icon: <FaShieldAlt className="text-blue-400 text-3xl" />,
//       title: "Enterprise Security",
//       description: "Your data remains private and secure with enterprise-grade protection.",
//     }
//   ];

//   return (
//     <section className="py-16 ">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Our AI assistant is designed to enhance your productivity with powerful features
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className=" rounded-xl shadow-lg border border-gray-700 p-6 hover:border-blue-700 transition-all"
//             >
//               <div className="w-14 h-14 rounded-full bg-blue-900 bg-opacity-50 flex items-center justify-center mb-4">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;



import { motion } from 'framer-motion';
import { FaDatabase, FaFileAlt, FaSearch, FaMagic, FaLightbulb, FaShieldAlt } from 'react-icons/fa';
import ParticleAnimation from '../ParticleAnimation'; // Assuming ParticleAnimation is in the same path

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaDatabase className="text-blue-500 text-3xl" />,
      title: "Advanced Data Analysis",
      description: "Process complex datasets and extract valuable insights automatically.",
    },
    {
      icon: <FaFileAlt className="text-blue-500 text-3xl" />,
      title: "Content Generation",
      description: "Create high-quality documents, reports, and summaries with AI assistance.",
    },
    {
      icon: <FaSearch className="text-blue-500 text-3xl" />,
      title: "Intelligent Search",
      description: "Find exactly what you need across all your documents in seconds.",
    },
    {
      icon: <FaMagic className="text-blue-500 text-3xl" />,
      title: "Workflow Automation",
      description: "Automate repetitive tasks and streamline your processes.",
    },
    {
      icon: <FaLightbulb className="text-blue-500 text-3xl" />,
      title: "Smart Recommendations",
      description: "Get personalized suggestions based on your usage patterns.",
    },
    {
      icon: <FaShieldAlt className="text-blue-500 text-3xl" />,
      title: "Enterprise Security",
      description: "Your data remains private and secure with enterprise-grade protection.",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-200 to-indigo-200 text-gray-800 relative">
      {/* Particle Animation in the Background (does not affect cards) */}
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleAnimation />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto">
            Our AI assistant is designed to enhance your productivity with powerful features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white shadow-lg border border-gray-300 p-6 hover:border-blue-600 transition-all relative z-10"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-blue-800">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
