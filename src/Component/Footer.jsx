import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-400  py-6 text-center">
        <h2 className="text-xl font-bold mb-2 text-white">Shoppy Globe</h2>
        <nav className="mb-4 space-x-4">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          {/* <Link to="" className="hover:text-white">
            Books
          </Link>
          <Link to="" className="hover:text-white">
            Contact
          </Link> */}
        </nav>
        <p className="text-sm">&copy; 2025 ShoppyGlobe. All rights reserved.</p>
      </footer>
    </>
  );
}
export default Footer;
