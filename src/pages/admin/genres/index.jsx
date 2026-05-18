import { useEffect, useState } from "react";
import { getGenres, deleteGenre } from "../../../_services/genres";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data kategori ini akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    });

    if (result.isConfirmed) {
      try {
        await deleteGenre(id);
        setGenres(genres.filter((genre) => genre.id !== id));
        Swal.fire(
          'Terhapus!',
          'Data kategori berhasil dihapus.',
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

  const toggleDropdown = (id) => {
    setOpenDropdownID(openDropdownID === id ? null : id);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Kategori</h2>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Link
              to="/admin/genres/create"
              className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
            >
              Tambah Kategori
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <tr key={genre.id} className="border-b dark:border-gray-700">
                    <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                      {genre.name}
                    </th>
                    <td className="px-4 py-3">{genre.description || "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/genres/edit/${genre.id}`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(genre.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500 dark:text-gray-400">
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
