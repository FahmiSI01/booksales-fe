import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-[#F9F9FA] dark:bg-gray-900 overflow-hidden">
      {/* Decorative clean background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-50 dark:bg-indigo-900/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-50 dark:bg-blue-900/10 blur-3xl"></div>

      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-semibold text-indigo-700 bg-indigo-100/50 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200/50">
              <span className="flex w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              Koleksi Terbaik 2026
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white mb-6 leading-tight">
              Buka Halaman Baru,<br />
              <span className="text-indigo-600 dark:text-indigo-400">Jelajahi Dunia Baru.</span>
            </h1>
            
            <p className="max-w-xl mx-auto lg:mx-0 text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Bookstore'Mi menyediakan ribuan pilihan buku mulai dari fiksi bestseller, buku akademis, hingga buku pengembangan diri. Dapatkan inspirasi tanpa batas bersama kami.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/books"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Mulai Belanja
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
              
              <Link
                to="/tentang"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm"
              >
                Tentang Kami
              </Link>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex flex-col items-center lg:items-start">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">10K+</p>
                <p className="text-sm font-medium text-gray-500">Judul Buku</p>
              </div>
              <div className="w-px h-10 bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex flex-col items-center lg:items-start">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">99%</p>
                <p className="text-sm font-medium text-gray-500">Pelanggan Puas</p>
              </div>
            </div>
          </div>

          {/* Image Content (Clean layout without massive purple blocks) */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              {/* Aesthetic Book Image */}
              <img 
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Buku Estetik" 
                className="w-full h-[500px] object-cover rounded-[2rem] shadow-2xl"
              />
              
              {/* Floating Element over Image */}
              <div className="absolute -left-8 top-12 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Buku Original</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}