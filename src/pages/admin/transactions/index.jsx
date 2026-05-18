import { useEffect, useState } from "react";
import { getTransactions, deleteTransactions, deleteAllTransactions } from "../../../_services/transactions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [openDropdownID, setOpenDropdownID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownID(openDropdownID === id ? null : id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data transaksi ini akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    });

    if (result.isConfirmed) {
      try {
        await deleteTransactions(id);
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
        Swal.fire(
          'Terhapus!',
          'Data transaksi berhasil dihapus.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Gagal!',
          'Terjadi kesalahan saat menghapus data.',
          'error'
        );
      }
    }
  };

  const handleDeleteAll = async () => {
    const result = await Swal.fire({
      title: 'Hapus SEMUA Transaksi?',
      text: "Seluruh riwayat transaksi akan dihapus permanen dan tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, bersihkan semua!'
    });

    if (result.isConfirmed) {
      try {
        await deleteAllTransactions();
        setTransactions([]);
        Swal.fire(
          'Terhapus!',
          'Semua data transaksi berhasil dibersihkan.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Gagal!',
          'Terjadi kesalahan saat membersihkan data.',
          'error'
        );
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">

        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>

              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              onClick={handleDeleteAll}
              type="button"
              className="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Reset Semua Data
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Book</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {transaction.order_number}
                    </td>

                    <td className="px-4 py-3">
                      {transaction.user ? transaction.user.name : `ID: ${transaction.customer_id}`}
                    </td>

                    <td className="px-4 py-3">
                      {transaction.book ? transaction.book.title : `ID: ${transaction.book_id}`}
                    </td>

                    <td className="px-4 py-3">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transaction.total_amount)}
                    </td>

                    <td className="px-4 py-3 uppercase text-xs font-semibold text-gray-500">
                      {transaction.payment_method || '-'}
                    </td>

                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full font-semibold ${transaction.status === 'success' || transaction.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {transaction.status || 'Pending'}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {new Date(transaction.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>

                    <td className="px-4 py-3 flex items-center justify-end relative">
                      <button
                        onClick={() => toggleDropdown(transaction.id)}
                        className="inline-flex items-center p-0.5 text-sm font-medium text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>

                      {openDropdownID === transaction.id && (
                        <div
                          className="absolute right-0 top-full mt-2 z-50 w-44 bg-white rounded-lg shadow divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                              <Link
                                to={`/admin/transactions/edit/${transaction.id}`}
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Edit
                              </Link>
                            </li>
                          </ul>

                          <div className="py-1">
                            <button
                              onClick={() => handleDelete(transaction.id)}
                              className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                  >
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}