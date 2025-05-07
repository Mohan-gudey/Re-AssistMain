import { useState, useEffect,useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaBrain, FaBookReader, FaUniversity } from 'react-icons/fa';

const UserDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode] = useState(location.pathname.includes('/edit-profile'));
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    institution: '',
    position: '',
    researchInterests: [],
    bio: ''
  });
  
  // Available research interest options
  const researchOptions = [
    'Artificial Intelligence',
    'Machine Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Robotics',
    'Neuroscience',
    'Quantum Computing',
    'Data Science',
    'Bioinformatics',
    'Cognitive Science'
  ];

  // Populate form with existing data if in edit mode (you can replace this with your own logic)
  useEffect(() => {
    if (isEditMode) {
      // Assuming you have some function to fetch user profile data
      const fetchUserProfile = async () => {
        try {
          const response = await fetch('/api/user-profile'); // Your API call
          const data = await response.json();
          setFormData({
            fullName: data?.fullName || '',
            institution: data?.institution || '',
            position: data?.position || '',
            researchInterests: Array.isArray(data?.researchInterests) ? data.researchInterests : [],
            bio: data?.bio || ''
          });
          
        } catch (error) {
          console.error('Failed to fetch profile data', error);
        }
      };
      
      fetchUserProfile();
    }
  }, [isEditMode]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle research interest selection
  const handleInterestToggle = useCallback((interest) => {
    setFormData(prev => {
      const currentInterests = [...prev.researchInterests];
      return {
        ...prev,
        researchInterests: currentInterests.includes(interest)
          ? currentInterests.filter(item => item !== interest)
          : [...currentInterests, interest]
      };
    });
  }, []);
  

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  console.log('handle submit');
  console.log(localStorage.getItem('email'));

  try {
    const token = localStorage.getItem('token'); // 🔐 Get the token from localStorage
    const firebaseId = localStorage.getItem('firebaseId');

    if (!token || !firebaseId) {
      throw new Error('Authentication token or Firebase ID not found.');
    }

    const response = await fetch('https://re-assist-backend.onrender.com/api/profiles/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // ✅ Add the JWT token here
      },
      body: JSON.stringify({
        ...formData,
        firebaseId, // ✅ Send firebaseId from localStorage
        email: localStorage.getItem('email'),
        researchInterests: JSON.stringify(formData.researchInterests), // No need to stringify here
        publications: JSON.stringify(formData.publications),           // Backend will handle stringification
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update profile');
    }

    const result = await response.json();
    console.log('Profile updated successfully:', result);

    if (isEditMode) {
      navigate('/dashboard/research-profile');
    } else {
      navigate('/');
    }
  } catch (err) {
    setError(err.message || 'Failed to update profile. Please try again.');
    console.error('Error updating profile:', err);
  } finally {
    setLoading(false);
  }
};
  
  const handleCancel = () => {
    if (isEditMode) {
      navigate('/dashboard/research-profile');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center">
            <FaBrain className="text-white text-2xl" />
          </div>
          <span className="text-xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">RE-ASSIST</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isEditMode ? 'Edit Your Profile' : 'Complete Your Profile'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isEditMode 
            ? 'Update your profile information and research interests' 
            : 'Tell us about yourself and your research interests'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  className="pl-10 block w-full bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Institution */}
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUniversity className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="institution"
                  id="institution"
                  className="pl-10 block w-full bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2"
                  placeholder="University or Organization"
                  value={formData.institution}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBookReader className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="pl-10 block w-full bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2"
                  placeholder="Researcher, Professor, Student, etc."
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Research Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Interests
              </label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {researchOptions.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        formData.researchInterests.includes(interest)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="block w-full bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2"
                  placeholder="Tell us a bit about yourself and your research"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 rounded-lg text-blue-600 border border-blue-600 text-center transition-all font-medium hover:bg-blue-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex justify-center py-3 px-4 rounded-lg text-white text-center transition-all font-medium ${
                  loading ? 'bg-blue-700 opacity-70' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? 'Updating...' : 'Submitting...'}
                  </span>
                ) : (
                  isEditMode ? 'Update Profile' : 'Complete Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsForm;