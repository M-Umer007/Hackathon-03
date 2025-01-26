import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-6 sm:px-12 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
        <div className="flex">
          <Image
            src={"/Logo Icon.png"}
            alt="Logo"
            width={30}
            height={30}
            />
             <h3 className="text-2xl font-bold text-gray-800">Comforty</h3>
        </div>
          <p className="text-gray-500 mt-2">
            Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum. Cras egestas purus.
          </p>
          <div className="flex space-x-4 mt-4">
  <span className="text-gray-500 hover:text-blue-500">
    <a href="https://facebook.com" target="_blank" className="social-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2h-4a4 4 0 0 0-4 4v4h-4v4h4v12h4v-12h4l1-4h-5v-4a1 1 0 0 1 1-1h3z"></path>
      </svg>
    </a>
  </span>
  <span className="text-gray-500 hover:text-blue-500">
    <a href="https://twitter.com" target="_blank" className="social-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.29 10.29 0 0 1-3.5 1.5A4.93 4.93 0 0 0 22.5 2a10.18 10.18 0 0 1-3.19 1.21A4.88 4.88 0 0 0 16.16 2c-2.8 0-5.08 2.28-5.08 5.08 0 .4.04.79.12 1.17C7.13 8.98 4.15 7.24 2.29 4.55A5.04 5.04 0 0 0 2 7.57c0 1.84 1.3 3.39 3.04 3.75-.31.09-.63.14-.96.14a3.86 3.86 0 0 1-.92-.12c.64 1.97 2.48 3.42 4.66 3.46a9.8 9.8 0 0 1-7.32 2.05c2.17 1.38 4.75 2.19 7.5 2.19a9.91 9.91 0 0 0 9.98-10c-.01-.15-.01-.29-.02-.44A7.12 7.12 0 0 0 23 3z"></path>
      </svg>
    </a>
  </span>
  <span className="text-gray-500 hover:text-blue-500">
    <a href="https://instagram.com" target="_blank" className="social-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.2c3.2 0 3.58.01 4.8.07 1.1.05 1.77.22 2.19.37.53.18.98.42 1.39.83.4.41.64.86.83 1.39.15.42.32 1.09.37 2.19.06 1.22.07 1.6.07 4.8s-.01 3.58-.07 4.8c-.05 1.1-.22 1.77-.37 2.19-.18.53-.42.98-.83 1.39-.41.4-.86.64-1.39.83-.42.15-1.09.32-2.19.37-1.22.06-1.6.07-4.8.07s-3.58-.01-4.8-.07c-1.1-.05-1.77-.22-2.19-.37-.53-.18-.98-.42-1.39-.83-.4-.41-.64-.86-.83-1.39-.15-.42-.32-1.09-.37-2.19-.06-1.22-.07-1.6-.07-4.8s.01-3.58.07-4.8c.05-1.1.22-1.77.37-2.19.18-.53.42-.98.83-1.39.41-.4.86-.64 1.39-.83.42-.15 1.09-.32 2.19-.37 1.22-.06 1.6-.07 4.8-.07zM12 0C8.74 0 8.29.01 7.04.07 5.89.12 4.94.33 4.12.6 3.29.88 2.58 1.19 1.88 1.88 1.19 2.58.88 3.29.6 4.12.33 4.94.12 5.89.07 7.04.01 8.29 0 8.74 0 12s.01 3.58.07 4.8c.05 1.1.22 1.77.37 2.19.18.53.42.98.83 1.39.4.41.86.64 1.39.83.42.15 1.09.32 2.19.37 1.22.06 1.6.07 4.8.07s3.58-.01 4.8-.07c1.1-.05 1.77-.22 2.19-.37.53-.18.98-.42 1.39-.83.41-.4.64-.86.83-1.39.15-.42.32-1.09.37-2.19.06-1.22.07-1.6.07-4.8s-.01-3.58-.07-4.8c-.05-1.1-.22-1.77-.37-2.19-.18-.53-.42-.98-.83-1.39-.4-.41-.86-.64-1.39-.83-.42-.15-1.09-.32-2.19-.37-1.22-.06-1.6-.07-4.8-.07zM12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 10.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zM15.4 3.8a.7.7 0 1 0-.7-.7.7.7 0 0 0 .7.7z"></path>
      </svg>
    </a>
  </span>
  <span className="text-gray-500 hover:text-blue-500">
    <a href="https://pinterest.com" target="_blank" className="social-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.36 3.65 9.91 8.5 11.42-.12-1.75-.23-4.15.04-6.1 1.1 2.14 3.28 2.5 5.37 1.38 1.26-.86 2.06-2.5 1.84-4.23-1.17-.63-2.75-.2-3.45.89-1.29 1.65.02 4.27 1.99 4.7-.03-.45-.09-.91-.2-1.36-1.46-.49-3.24-.39-4.64-.14 1.67-2.15-.45-4.79-2.63-5.04-2.13-.24-4.35 1.58-4.61 3.63-.27 1.35-.09 2.87.78 3.99-.42 2.61.43 5.65 2.8 6.57 4.33 2.28 8.8-2.11 8.8-6.52 0-3.92-3.58-7.3-7.91-7.39z"></path>
      </svg>
    </a>
  </span>
</div>

        </div>

        {/* Category */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">CATEGORY</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Sofa</li>
            <li>Armchair</li>
            <li>Wing Chair</li>
            <li className="text-teal-500">Desk Chair</li>
            <li>Wooden Chair</li>
            <li>Park Bench</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">SUPPORT</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Help & Support</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Help</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">NEWSLETTER</h4>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="w-full border rounded-lg px-4 py-2 mb-4 text-gray-600"
            />
            <button className="w-full bg-teal-500 text-white py-2 rounded-lg">
              Subscribe
            </button>
          </form>
          <p className="text-gray-500 mt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.
          </p>
        </div>
      </div>

      <div className="border-t mt-12 pt-6 text-center text-sm text-gray-500">
        <p>@ 2021 - Blogy - Designed & Developed by Zakirsoft</p>
      </div>
    </footer>
  );
};

export default Footer;
