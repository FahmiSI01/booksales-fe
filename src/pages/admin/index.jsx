import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../_services/books";
import { getTransactions } from "../../_services/transactions";
import { getGenres } from "../../_services/genres";

export default function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    genres: 0,
    transactions: 0,
    revenue: 0,
    users: 4 // Angka simulasi karena belum ada endpoint Users dari backend
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [booksData, genresData, transactionsData] = await Promise.all([
          getBooks(),
          getGenres(),
          getTransactions()
        ]);

        const totalRevenue = transactionsData?.reduce((sum, t) => sum + Number(t.total_amount || 0), 0) || 0;

        setStats({
          books: booksData?.length || 0,
          genres: genresData?.length || 0,
          transactions: transactionsData?.length || 0,
          revenue: totalRevenue,
          users: 4
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Admin</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Ringkasan performa toko buku Anda hari ini.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Menarik data dari database...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card 1: Revenue */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pendapatan</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">Rp {stats.revenue.toLocaleString('id-ID')}</p>
              </div>
            </div>

            {/* Card 2: Books */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Jumlah Judul Buku</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.books}</p>
              </div>
            </div>

            {/* Card 3: Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Transaksi</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.transactions}</p>
              </div>
            </div>

            {/* Card 4: Users */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pengguna</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b dark:border-gray-700 pb-3">Menu Cepat (Aksi)</h2>
              <div className="space-y-3">
                <Link to="/admin/books/create" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors group border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Tambah Buku Baru</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
                
                <Link to="/admin/transactions" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors group border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Lihat Semua Pesanan</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>

                <Link to="/admin/users" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors group border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Daftar Pengguna</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
              </div>
            </div>
            
            {/* System Status / Notes */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b dark:border-gray-700 pb-3">Status Sistem</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Database API</span>
                    </div>
                    <span className="text-sm text-gray-500">Terhubung</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Server Gambar</span>
                    </div>
                    <span className="text-sm text-gray-500">Online</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                <p className="text-sm text-indigo-800 dark:text-indigo-300">
                  <span className="font-bold">Tips:</span> Pastikan untuk secara rutin memeriksa halaman <strong>"Kelola Pesanan"</strong> dan <strong>"Pesan Pengguna"</strong> agar kepuasan pelanggan tetap terjaga.
                </p>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}