import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-300 p-4 m-0 text-center">
            <p>© {new Date().getFullYear()} Book Catalog App. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
