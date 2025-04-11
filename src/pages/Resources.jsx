import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFileAlt, FaVideo, FaBook, FaCode, FaArrowRight } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample resource data
  const resourcesData = [
    {
      id: 1,
      title: 'Getting Started Guide',
      description: 'A comprehensive guide to help you set up and start using our AI assistant.',
      type: 'guide',
      category: 'beginner',
      date: 'Mar 15, 2025',
      icon: <FaFileAlt className="text-blue-400 text-2xl" />
    },
    {
      id: 2,
      title: 'Best Practices for AI Prompts',
      description: 'Learn how to craft effective prompts to get the best results from our AI.',
      type: 'guide',
      category: 'intermediate',
      date: 'Mar 8, 2025',
      icon: <FaFileAlt className="text-blue-400 text-2xl" />
    },
    {
      id: 3,
      title: 'Advanced Data Analysis Tutorial',
      description: 'Deep dive into using RE-ASSIST for complex data analysis tasks.',
      type: 'tutorial',
      category: 'advanced',
      date: 'Feb 22, 2025',
      icon: <FaCode className="text-green-400 text-2xl" />
    },
    {
      id: 4,
      title: 'Introduction to RE-ASSIST',
      description: 'A 10-minute video showing the basics of using the platform.',
      type: 'video',
      category: 'beginner',
      date: 'Feb 10, 2025',
      icon: <FaVideo className="text-red-400 text-2xl" />
    },
    {
      id: 5,
      title: 'Integration with External APIs',
      description: 'Learn how to connect RE-ASSIST with other tools and services.',
      type: 'documentation',
      category: 'advanced',
      date: 'Jan 30, 2025',
      icon: <FaBook className="text-purple-400 text-2xl" />
    },
    {
      id: 6,
      title: 'Content Generation Masterclass',
      description: 'Techniques for generating high-quality content with AI assistance.',
      type: 'tutorial',
      category: 'intermediate',
      date: 'Jan 18, 2025',
      icon: <FaCode className="text-green-400 text-2xl" />
    }
  ];
  
  // Filter and search logic
  const filteredResources = resourcesData.filter(resource => {
    const matchesFilter = activeFilter === 'all' || resource.type === activeFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  // Helper function to get category badge color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'beginner':
        return 'bg-green-900 text-green-400';
      case 'intermediate':
        return 'bg-blue-900 text-blue-400';
      case 'advanced':
        return 'bg-purple-900 text-purple-400';
      default:
        return 'bg-gray-900 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Learn how to get the most out of RE-ASSIST with our comprehensive resources
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              All Resources
            </button>
            <button
              onClick={() => setActiveFilter('guide')}
              className={`px-4 py-2 rounded-lg ${activeFilter === 'guide' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Guides
            </button>
            <button
              onClick={() => setActiveFilter('tutorial')}
              className={`px-4 py-2 rounded-lg ${activeFilter === 'tutorial' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Tutorials
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`px-4 py-2 rounded-lg ${activeFilter === 'video' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveFilter('documentation')}
              className={`px-4 py-2 rounded-lg ${activeFilter === 'documentation' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Documentation
            </button>
          </div>
          
          {/* Resources Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-600 transition-colors">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                        {resource.icon}
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                          {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                        </span>
                        <p className="text-gray-400 text-xs mt-1">{resource.date}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-400 mb-4">{resource.description}</p>
                    
                    <Link to="#" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
                      View Resource
                      <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl text-gray-400 mb-4">No resources found matching your criteria</h3>
              <button 
                onClick={() => {setActiveFilter('all'); setSearchTerm('');}}
                className="text-blue-400 hover:text-blue-300"
              >
                Clear filters
              </button>
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-400">Previous</button>
              <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">1</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">2</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">3</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-gray-700">Next</button>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-gray-800 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated with New Resources</h2>
              <p className="text-gray-400 mb-6">
                Subscribe to our newsletter to receive updates when we publish new guides, tutorials, and videos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;