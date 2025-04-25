// import { FaBrain } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className=" text-gray-400 py-12 border-t border-gray-800">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center mb-4">
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
//                 <FaBrain className="text-white text-xl" />
//               </div>
//               <span className="text-2xl font-bold text-blue-400">RE-ASSIST</span>
//             </div>
//             <p className="text-gray-400 mb-4">
//               Empowering professionals with AI-powered solutions for the modern workplace.
//             </p>
//             <div className="flex space-x-4">
//               <SocialIcon path="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.42 14.49V11h-2v5.49h2zm-1-6.29c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zm7.88 6.29h-2v-2.37c0-.97-.43-1.63-1.33-1.63-.73 0-1.17.49-1.36.95-.07.17-.09.4-.09.63v2.42h-2V11h2v.86c.4-.62 1.03-1.04 2.31-1.04 1.68 0 2.47 1.1 2.47 3.46v3.21z" />
//               <SocialIcon path="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.957 14.307c-.181.087-.378.143-.575.143a1.171 1.171 0 01-.56-.136c-1.453-.698-3.242-1.076-5.106-1.076-1.06 0-2.122.142-3.158.425a1.167 1.167 0 01-.45-.088 1.177 1.177 0 01-.728-1.502c.084-.312.29-.576.575-.729 1.21-.357 2.445-.538 3.76-.538 2.196 0 4.307.436 6.073 1.236.302.12.544.361.664.664a1.168 1.168 0 01-.495 1.6zm1.303-3.173c-.224.109-.474.168-.72.168a1.45 1.45 0 01-.697-.178c-1.673-.83-3.766-1.329-6.02-1.329-1.271 0-2.515.175-3.712.52-.151.043-.312.065-.475.065a1.451 1.451 0 01-1.376-1.924c.124-.425.415-.776.804-.97 1.464-.426 2.991-.641 4.759-.641 2.643 0 5.176.609 7.308 1.759.385.209.654.571.728 1.001a1.457 1.457 0 01-.599 1.529zm1.504-3.467c-.261.124-.55.191-.843.191-.342 0-.677-.09-.972-.259-1.958-1.058-4.713-1.646-7.142-1.646-1.397 0-2.903.182-4.425.54a1.722 1.722 0 01-.51.082c-.93 0-1.736-.67-1.895-1.584-.169-.941.45-1.846 1.375-2.072 1.841-.454 3.582-.688 5.334-.688 2.706 0 5.789.653 8.298 1.966.48.263.818.724.918 1.249.101.524-.089 1.06-.47 1.438-.259.258-.596.435-.968.512z" />
//               <SocialIcon path="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
//               <SocialIcon path="M23.954 4.569c-.885.388-1.83.65-2.825.772 1.014-.611 1.794-1.574 2.166-2.724-.951.555-2.005.96-3.127 1.185-.896-.957-2.184-1.555-3.594-1.555-2.72 0-4.92 2.21-4.92 4.918 0 .386.044.762.127 1.122-4.09-.205-7.71-2.16-10.142-5.137-.424.731-.667 1.582-.667 2.479 0 1.704.877 3.214 2.204 4.108-.784-.025-1.52-.24-2.165-.599v.06c0 2.39 1.697 4.377 3.95 4.827-.402.116-.83.172-1.268.172-.31 0-.613-.03-.905-.086.624 1.953 2.444 3.38 4.6 3.419-1.68 1.318-3.802 2.107-6.106 2.107-.398 0-.79-.023-1.175-.07 2.18 1.403 4.768 2.212 7.55 2.212 9.06 0 14.01-7.5 14.01-14.02 0-.21-.005-.42-.014-.63.962-.69 1.797-1.56 2.457-2.55z" />
//             </div>
//           </div>

//           <div>
//             <h3 className="text-black font-semibold text-lg mb-4">Product</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Use Cases</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-black font-semibold text-lg mb-4">Resources</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Guides</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Webinars</a></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-black font-semibold text-lg mb-4">Company</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
//           <p>&copy; {new Date().getFullYear()} RE-ASSIST Technology, Inc. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// // Social icon component
// const SocialIcon = ({ path }) => (
//   <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
//     <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
//       <path d={path} />
//     </svg>
//   </a>
// );

// export default Footer;




import { FaBrain } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-gray-700 py-12 border-t border-gray-300 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-400 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <FaBrain className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-blue-500">RE-ASSIST</span>
            </div>
            <p className="text-gray-600 mb-4">
              Empowering professionals with AI-powered solutions for the modern workplace.
            </p>
            <div className="flex space-x-4">
              <SocialIcon path="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.42 14.49V11h-2v5.49h2zm-1-6.29c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zm7.88 6.29h-2v-2.37c0-.97-.43-1.63-1.33-1.63-.73 0-1.17.49-1.36.95-.07.17-.09.4-.09.63v2.42h-2V11h2v.86c.4-.62 1.03-1.04 2.31-1.04 1.68 0 2.47 1.1 2.47 3.46v3.21z" />
              <SocialIcon path="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.957 14.307c-.181.087-.378.143-.575.143a1.171 1.171 0 01-.56-.136c-1.453-.698-3.242-1.076-5.106-1.076-1.06 0-2.122.142-3.158.425a1.167 1.167 0 01-.45-.088 1.177 1.177 0 01-.728-1.502c.084-.312.29-.576.575-.729 1.21-.357 2.445-.538 3.76-.538 2.196 0 4.307.436 6.073 1.236.302.12.544.361.664.664a1.168 1.168 0 01-.495 1.6zm1.303-3.173c-.224.109-.474.168-.72.168a1.45 1.45 0 01-.697-.178c-1.673-.83-3.766-1.329-6.02-1.329-1.271 0-2.515.175-3.712.52-.151.043-.312.065-.475.065a1.451 1.451 0 01-1.376-1.924c.124-.425.415-.776.804-.97 1.464-.426 2.991-.641 4.759-.641 2.643 0 5.176.609 7.308 1.759.385.209.654.571.728 1.001a1.457 1.457 0 01-.599 1.529zm1.504-3.467c-.261.124-.55.191-.843.191-.342 0-.677-.09-.972-.259-1.958-1.058-4.713-1.646-7.142-1.646-1.397 0-2.903.182-4.425.54a1.722 1.722 0 01-.51.082c-.93 0-1.736-.67-1.895-1.584-.169-.941.45-1.846 1.375-2.072 1.841-.454 3.582-.688 5.334-.688 2.706 0 5.789.653 8.298 1.966.48.263.818.724.918 1.249.101.524-.089 1.06-.47 1.438-.259.258-.596.435-.968.512z" />
              <SocialIcon path="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </div>
          </div>

          <div>
            <h3 className="text-black font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Use Cases</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-black font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Guides</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Webinars</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-black font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-12 pt-8 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} RE-ASSIST Technology, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Social icon component
const SocialIcon = ({ path }) => (
  <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </a>
);

export default Footer;
