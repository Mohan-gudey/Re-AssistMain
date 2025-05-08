// import ParticleAnimation from '../ParticleAnimation';

// const CTASection = ({ handleNav }) => {
//   return (
//     <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative">
//       <div className="absolute inset-0 z-0 opacity-30">
//         <ParticleAnimation />
//       </div>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to transform your workflow?</h2>
//           <p className="text-xl text-blue-200 mb-8">
//             Join thousands of professionals who are already using RE-ASSIST to accelerate their work.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button 
//               onClick={() => handleNav('join')}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
//             >
//               Start Free Trial
//             </button>
//             <button className=" hover:bg-gray-700 text-blue-300 border border-blue-700 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
//               Schedule Demo
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTASection;




import ParticleAnimation from '../ParticleAnimation';

const CTASection = ({ handleNav }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-200 to-indigo-200 text-gray-800 relative">
      <div className="absolute inset-0 z-0 opacity-30">
        <ParticleAnimation />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">Ready to transform your workflow?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of professionals who are already using RE-ASSIST to accelerate their work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNav('signup')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
            >
              Start Free Trial
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-500 border border-blue-500 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
