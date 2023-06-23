"use client";

import { SessionProvider } from "next-auth/react";




const Providers = ({ children }) => {
  return (
    
        <SessionProvider>
        
            <div className="dark:text-gray-100 dark:bg-gray-950 text-gray-700  transition-colors duration-300 min-h-screen select-none z-10 bg-white !important">
              {children}
            </div>
       
        </SessionProvider>
 
  );
};

export default Providers;