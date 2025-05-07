// import { motion } from 'framer-motion';
// import { FaArrowRight, FaFileAlt } from 'react-icons/fa';

// const ResourcesSection = () => {
//   const resources = [
//     {
//       title: "Getting Started Guide",
//       description: "A comprehensive guide to help you set up and start using our AI assistant.",
//       type: "Guide",
//     },
//     {
//       title: "Best Practices for AI Prompts",
//       description: "Learn how to craft effective prompts to get the best results from our AI.",
//       type: "Tutorial",
//     },
//     {
//       title: "Advanced Data Analysis Techniques",
//       description: "Take your data analysis to the next level with these advanced techniques.",
//       type: "Webinar",
//     },
//   ];

//   return (
//     <section className="py-16 ">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Resources</h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Learn how to get the most out of our AI assistant with these helpful resources
//           </p>
//         </div>
        
//         <div className="grid md:grid-cols-3 gap-8">
//           {resources.map((resource, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               className=" rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:border-blue-700 transition-all"
//             >
//               <div className="h-40 bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center">
//                 <FaFileAlt className="text-blue-300 text-5xl" />
//               </div>
//               <div className="p-6">
//                 <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300 mb-4">
//                   {resource.type}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
//                 <p className="text-gray-600 mb-4">{resource.description}</p>
//                 <button className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
//                   Read more
//                   <FaArrowRight className="ml-2 text-sm" />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
        
//         <div className="text-center mt-10">
//           <button className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
//             View all resources
//             <FaArrowRight className="ml-2 text-sm" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ResourcesSection;




import { motion } from 'framer-motion';
import { FaArrowRight, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ResourcesSection = () => {

  const navigate = useNavigate();
  const HandleNav = () =>{
    navigate('/resources');
  }

  const resources = [
    {
      title: "Getting Started Guide",
      description: "A comprehensive guide to help you set up and start using our AI assistant.",
      type: "Guide",
    },
    {
      title: "Best Practices for AI Prompts",
      description: "Learn how to craft effective prompts to get the best results from our AI.",
      type: "Tutorial",
    },
    {
      title: "Advanced Data Analysis Techniques",
      description: "Take your data analysis to the next level with these advanced techniques.",
      type: "Webinar",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to get the most out of our AI assistant with these helpful resources
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl shadow-lg border border-gray-300 overflow-hidden hover:border-blue-500 transition-all"
            >
              <div className="h-40 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                <FaFileAlt className="text-blue-500 text-5xl" />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300 mb-4">
                  {resource.type}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <button className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
                  Read more
                  <FaArrowRight className="ml-2 text-sm" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button onClick={HandleNav} className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
            View all resources
            <FaArrowRight className="ml-2 text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
