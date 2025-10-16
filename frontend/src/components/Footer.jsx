import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">Smart Vision</h2>
          <p className="text-sm">
            Empowering Security Through Intelligent Face Detection
          </p>
          <p className="text-sm mt-1">
            © 2025{" "}
            <span className="font-semibold text-white">
              Flikt Technology Web Solution
            </span>{" "}
            | Developed by{" "}
            <span className="font-semibold text-white">
              MD KAMRAN SHAMIM
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <p className="text-sm font-semibold text-white mb-2">
            Connect with Us
          </p>
          <div className="flex justify-center md:justify-end space-x-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/flikt-technology-web-solutions/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 
                5v14c0 2.76 2.24 5 5 5h14c2.76 0 
                5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 
                19h-3v-10h3v10zm-1.5-11.27c-.97 
                0-1.75-.79-1.75-1.76s.78-1.76 
                1.75-1.76 1.75.79 1.75 1.76-.78 
                1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 
                0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 
                1.37-1.56 2.82-1.56 3.02 0 3.58 1.99 
                3.58 4.57v5.63z" />
              </svg>
            </a>

            {/* Email */}
            <a
                href="mailto:flikttechnologywebsolution44@gmail.com"
                 className="hover:text-red-400 transition"
              >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 13.065l-11.99-7.065h23.98l-11.99 
                  7.065zm0 2.935l-12-7.065v10.065h24v-10.065l-12 
                  7.065z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
