import React from 'react';

const Works = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Our Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project 1 */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Project One</h3>
            <p className="text-gray-300">
              A brief description of this project and the technologies used.
            </p>
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Project Two</h3>
            <p className="text-gray-300">
              A brief description of this project and the technologies used.
            </p>
          </div>
        </div>

        {/* Project 3 */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Project Three</h3>
            <p className="text-gray-300">
              A brief description of this project and the technologies used.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;