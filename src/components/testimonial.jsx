export default function Testimonial() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
      <div className="max-w-screen-xl px-4 mx-auto text-center lg:px-6">
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Apa Kata Pelanggan Kami?</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          
          <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <svg className="w-10 h-10 mb-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
            </svg>
            <p className="mb-6 text-lg font-medium text-gray-700 dark:text-gray-300 italic">
              "Koleksi bukunya sangat lengkap! Saya mencari buku referensi kuliah yang susah didapat, tapi di Bookstore'Mi harganya justru lebih murah dari toko lain."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                A
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Andi Saputra</div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">Mahasiswa</div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-indigo-600 rounded-2xl shadow-md transform lg:-translate-y-4">
            <svg className="w-10 h-10 mb-4 text-indigo-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
            </svg>
            <p className="mb-6 text-lg font-medium text-white italic">
              "Sistem pembelanjaannya sangat mudah dan respons admin ketika saya menanyakan ketersediaan buku lewat halaman kontak juga sangat cepat."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-700 font-bold">
                B
              </div>
              <div>
                <div className="font-semibold text-white">Budi Gunawan</div>
                <div className="text-sm font-light text-indigo-200">Kolektor Buku</div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <svg className="w-10 h-10 mb-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
            </svg>
            <p className="mb-6 text-lg font-medium text-gray-700 dark:text-gray-300 italic">
              "Pengiriman super cepat dan packing buku sangat rapi. Kualitas buku orisinal. Gak pernah ragu belanja novel kesukaan di Bookstore'Mi."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                C
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Citra Dewi</div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">Pegawai Swasta</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
