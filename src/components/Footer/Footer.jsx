// src/components/Footer/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          Created by{" "}
          <a 
            href="https://sohamkoli.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Soham Koli
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;