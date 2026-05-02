import { useEffect, useState } from "react";
import { getAuthors } from "../../../_services/authors";
import { Link } from "react-router-dom";
import { deleteAuthor } from "../../../_services/authors";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [openDropdownID, setOpenDropdownID] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAuthors();
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this author?");
    if (confirmDelete) {
      await deleteAuthor(id);
      setAuthors(authors.filter((author) => author.id !== id));
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Authors</h2>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <Link
              to="/admin/authors/create"
              className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
            >
              Add author
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Bio</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author) => (
                  <tr key={author.id} className="border-b dark:border-gray-700">
                    <th className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
                      {author.name}
                    </th>
                    <td className="px-4 py-3">{author.photo}</td>
                    <td className="px-4 py-3">{author.bio || "-"}</td>
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <Link
                        to={`/admin/authors/edit/${author.id}`}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(author.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
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
