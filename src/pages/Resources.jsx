import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaFileAlt, 
  FaVideo, 
  FaBook, 
  FaCode, 
  FaArrowRight, 
  FaClock, 
  FaStar, 
  FaBrain, 
  FaTimes 
} from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const resourcesPerPage = 6;
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm, categoryFilter, sortBy]);
  
  // Sample resource data
  const resourcesData = [
    {
      id: 1,
      title: 'Getting Started Guide',
      description: 'A comprehensive guide to help you set up and start using our AI assistant.',
      type: 'guide',
      category: 'beginner',
      date: 'Mar 15, 2025',
      featured: true,
      views: 1250,
      timeToRead: '10 min',
      icon: <FaFileAlt className="text-blue-400 text-2xl" />
    },
    {
      id: 2,
      title: 'Best Practices for AI Prompts',
      description: 'Learn how to craft effective prompts to get the best results from our AI.',
      type: 'guide',
      category: 'intermediate',
      date: 'Mar 8, 2025',
      featured: false,
      views: 980,
      timeToRead: '15 min',
      icon: <FaFileAlt className="text-blue-400 text-2xl" />
    },
    {
      id: 3,
      title: 'Advanced Data Analysis Tutorial',
      description: 'Deep dive into using RE-ASSIST for complex data analysis tasks.',
      type: 'tutorial',
      category: 'advanced',
      date: 'Feb 22, 2025',
      featured: true,
      views: 650,
      timeToRead: '25 min',
      icon: <FaCode className="text-green-400 text-2xl" />
    },
    {
      id: 4,
      title: 'Introduction to RE-ASSIST',
      description: 'A 10-minute video showing the basics of using the platform.',
      type: 'video',
      category: 'beginner',
      date: 'Feb 10, 2025',
      featured: true,
      views: 3200,
      timeToRead: '10 min',
      icon: <FaVideo className="text-red-400 text-2xl" />
    },
    {
      id: 5,
      title: 'Integration with External APIs',
      description: 'Learn how to connect RE-ASSIST with other tools and services.',
      type: 'documentation',
      category: 'advanced',
      date: 'Jan 30, 2025',
      featured: false,
      views: 520,
      timeToRead: '20 min',
      icon: <FaBook className="text-purple-400 text-2xl" />
    },
    {
      id: 6,
      title: 'Content Generation Masterclass',
      description: 'Techniques for generating high-quality content with AI assistance.',
      type: 'tutorial',
      category: 'intermediate',
      date: 'Jan 18, 2025',
      featured: false,
      views: 1100,
      timeToRead: '30 min',
      icon: <FaCode className="text-green-400 text-2xl" />
    },
    {
      id: 7,
      title: 'Prompt Engineering for Researchers',
      description: 'Specialized techniques for academic and scientific AI prompting.',
      type: 'guide',
      category: 'advanced',
      date: 'Apr 5, 2025',
      featured: true,
      views: 450,
      timeToRead: '18 min',
      icon: <FaFileAlt className="text-blue-400 text-2xl" />
    },
    {
      id: 8,
      title: 'RE-ASSIST for Literature Reviews',
      description: 'How to use AI to enhance your academic literature review process.',
      type: 'tutorial',
      category: 'intermediate',
      date: 'Apr 1, 2025',
      featured: false,
      views: 320,
      timeToRead: '22 min',
      icon: <FaCode className="text-green-400 text-2xl" />
    },
    {
      id: 9,
      title: 'Collaborative Research with AI',
      description: 'Best practices for team collaboration using RE-ASSIST.',
      type: 'documentation',
      category: 'beginner',
      date: 'Mar 25, 2025',
      featured: false,
      views: 780,
      timeToRead: '12 min',
      icon: <FaBook className="text-purple-400 text-2xl" />
    }
  ];
  
  // Sort function
  const sortResources = (resources) => {
    switch(sortBy) {
      case 'newest':
        return [...resources].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return [...resources].sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'popular':
        return [...resources].sort((a, b) => b.views - a.views);
      case 'featured':
        return [...resources].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
      default:
        return resources;
    }
  };
  
  // Filter and search logic
  const getFilteredResources = () => {
    let filtered = resourcesData.filter(resource => {
      const matchesTypeFilter = activeFilter === 'all' || resource.type === activeFilter;
      const matchesCategoryFilter = categoryFilter === 'all' || resource.category === categoryFilter;
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTypeFilter && matchesCategoryFilter && matchesSearch;
    });
    
    return sortResources(filtered);
  };
  
  const filteredResources = getFilteredResources();
  
  // Pagination logic
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
  const currentResources = filteredResources.slice(
    (currentPage - 1) * resourcesPerPage,
    currentPage * resourcesPerPage
  );
  
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
  
  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const handleSubscribe = () => {
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    
    // Simulate subscription success
    setIsSubscribed(true);
    setEmailError('');
    // In a real app, you would make an API call here
  };
  
  const clearFilters = () => {
    setActiveFilter('all');
    setCategoryFilter('all');
    setSearchTerm('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Logo */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                <FaBrain className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">RE-ASSIST Resources</h1>
            </div>
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
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            {/* Type Filters */}
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
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
            
            {/* Secondary Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              
              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="mb-6 flex justify-between items-center">
            <div className="text-gray-400">
              Showing {currentResources.length} of {filteredResources.length} resources
            </div>
            {(activeFilter !== 'all' || categoryFilter !== 'all' || searchTerm || sortBy !== 'newest') && (
              <button 
                onClick={clearFilters}
                className="text-blue-400 hover:text-blue-300 flex items-center"
              >
                <FaTimes className="mr-1" /> Clear filters
              </button>
            )}
          </div>
          
          {/* Resources Grid */}
          {currentResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentResources.map(resource => (
                <div 
                  key={resource.id} 
                  className={`bg-gray-800 rounded-xl border ${resource.featured ? 'border-blue-500' : 'border-gray-700'} overflow-hidden hover:border-blue-600 transition-colors transform hover:-translate-y-1 hover:shadow-xl duration-300`}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${resource.featured ? 'bg-blue-700' : 'bg-gray-700'} rounded-full flex items-center justify-center mr-4`}>
                        {resource.icon}
                      </div>
                      <div>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                          </span>
                          {resource.featured && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{resource.date}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-400 mb-4">{resource.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <FaClock className="mr-1" /> {resource.timeToRead}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <FaStar className="mr-1 text-yellow-500" /> {resource.views} views
                      </div>
                    </div>
                    
                    <Link to={`/resources/${resource.id}`} className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
                      View Resource
                      <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-800 rounded-xl border border-gray-700">
              <FaSearch className="mx-auto text-5xl text-gray-600 mb-4" />
              <h3 className="text-2xl text-gray-300 mb-2">No resources found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters to find what you're looking for</p>
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg flex items-center ${currentPage === 1 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                  <FaArrowRight className="transform rotate-180 mr-1" /> Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg flex items-center ${currentPage === totalPages ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                  Next <FaArrowRight className="ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Newsletter */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {!isSubscribed ? (
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="bg-blue-500 rounded-full p-3">
                      <FaBrain className="text-white text-3xl" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Stay Updated with New Resources</h2>
                  <p className="text-gray-400 mb-6">
                    Subscribe to our newsletter to receive updates when we publish new guides, tutorials, and videos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                    <div className="flex-1">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                        }}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${emailError ? 'border-red-500' : 'border-gray-600'} text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {emailError && <p className="text-red-500 text-sm mt-1 text-left pl-2">{emailError}</p>}
                    </div>
                    <button 
                      onClick={handleSubscribe}
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium text-white transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center bg-gray-800 p-8 rounded-xl border border-gray-700">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900">
                    <FaCheck className="text-green-400 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Thank You for Subscribing!</h3>
                  <p className="text-gray-400">
                    You've been added to our newsletter. We'll keep you updated with the latest resources.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;