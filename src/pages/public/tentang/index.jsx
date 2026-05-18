export default function Tentang() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen font-sans">

      {/* 1 & 2. Hero / Latar Belakang & Collage (Combined) */}
      <section className="relative bg-white dark:bg-gray-900 overflow-hidden pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Text Content (Left) */}
            <div className="max-w-xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-6 border border-indigo-100 dark:border-indigo-800/50">
                Tentang Kami
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                Latar Belakang <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Bookstore'Mi</span>
              </h1>
              <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-indigo-500 pl-6 space-y-4">
                <p>
                  Berawal dari keresahan akan sulitnya akses ke buku berkualitas di berbagai daerah, kami mendirikan Bookstore'Mi pada tahun 2026. Nama "Mi" (Milik Kita) mencerminkan visi kami: menjadikan akses ilmu pengetahuan sebagai hak milik semua orang.
                </p>
              </div>
            </div>

            {/* Image Composition (Right) */}
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-100 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl -z-10"></div>

              <div className="grid grid-cols-2 gap-4 md:gap-6 items-center">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Library"
                  className="rounded-3xl object-cover w-full h-48 md:h-64 shadow-xl transform translate-y-6 transition-transform hover:-translate-y-2 duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Reading"
                  className="rounded-3xl object-cover w-full h-56 md:h-80 shadow-2xl transition-transform hover:-translate-y-2 duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="py-12 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center divide-x divide-gray-100 dark:divide-gray-800">
            <div>
              <p className="text-4xl lg:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">1M+</p>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm tracking-wide uppercase">Buku Terjual</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">10K+</p>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm tracking-wide uppercase">Koleksi Judul</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">50+</p>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm tracking-wide uppercase">Penerbit Partner</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">99%</p>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm tracking-wide uppercase">Ulasan Positif</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Mission & Vision (Split Content) */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-3xl transform rotate-3 -z-10 transition-transform hover:rotate-6 duration-500"></div>
              <img
                className="w-full rounded-3xl shadow-xl object-cover h-[350px]"
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Perpustakaan Buku Estetik"
              />

              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-xs animate-bounce" style={{ animationDuration: '4s' }}>
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">Didirikan pada 2026</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dimulai dari garasi kecil, kini kami telah melayani pembaca di seluruh penjuru negeri.</p>
              </div>
            </div>

            <div className="lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">Visi & Misi Kami</h2>

              <div className="mb-10 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-200 dark:bg-indigo-800 rounded-full"></div>
                <div className="pl-6">
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">Visi Kami</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    Menjadikan literatur sebagai jembatan masa depan, dan menciptakan generasi Indonesia yang cinta membaca, kritis, dan berwawasan luas.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-200 dark:bg-purple-800 rounded-full"></div>
                <div className="pl-6">
                  <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">Misi Kami</h3>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-purple-500 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Menyediakan akses mudah ke berbagai kategori buku.
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-purple-500 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Menjamin kualitas original dengan harga yang bersahabat.
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-purple-500 mr-3 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Mendukung penulis lokal agar karya mereka dikenal luas.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Values / Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nilai Inti Bookstore'Mi</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Komitmen kami untuk memberikan pengalaman berbelanja buku yang tak tertandingi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Keaslian Terjamin</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Setiap buku yang keluar dari gudang kami adalah 100% original langsung dari penerbit resmi.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white text-blue-600 dark:text-blue-400 transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Harga Kompetitif</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Akses ke ilmu pengetahuan tidak harus mahal. Kami memberikan penawaran harga terbaik untuk pembaca.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white text-green-600 dark:text-green-400 transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pelayanan Super Cepat</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sistem logistik cerdas kami memastikan buku Anda dikemas dan dikirim pada hari yang sama.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
