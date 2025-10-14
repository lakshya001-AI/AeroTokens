import React from 'react'

const FooterElement = () => {
    return (
        <footer className="bg-gradient-to-r from-white to-gray-100 text-gray-800 py-4 px-3 md:px-5 border-t border-gray-200">
            <div className="max-w-9xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
                {/* Right Section */}
                <div className="text-center md:text-right text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} AeroToken. All rights reserved.</p>
                </div>
            </div>
        </footer>


    )
}

export default FooterElement;
