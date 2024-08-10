// Create a simple JavaScript object to hold environment variables
const sharedEnv = {
  apiKey: null,
  // Add other environment variables as needed
};

// Function to initialize the environment
export const initEnvironment = (config) => {
  sharedEnv.apiKey = config.apiKey;
  // Initialize other environment variables
};

// Export the shared environment object
export default sharedEnv;
