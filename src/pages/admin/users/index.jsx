import { useState, useEffect } from "react";
import { getUsers } from "../../../_services/users";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // Mengambil data pengguna dari backend menggunakan service getUsers
        const usersData = await getUsers();
        setUsers(usersData || []);
      } catch (error) {
        console.error("Terjadi kesalahan sistem saat memuat data pengguna:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
      <div className="mx-auto max-w-screen-xl">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Daftar Pengguna</h2>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-10 flex justify-center items-center text-gray-500 dark:text-gray-400">
                <span>Memuat data pengguna...</span>
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">Nama Pengguna</th>
                    <th scope="col" className="px-4 py-3">Email</th>
                    <th scope="col" className="px-4 py-3">Peran</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold uppercase">
                              {user.name ? user.name.charAt(0) : '?'}
                            </div>
                            {user.name}
                          </div>
                        </td>
                        <td className="px-4 py-4">{user.email}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}`}>
                            {user.role || 'CUSTOMER'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                        Tidak ada pengguna yang terdaftar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
