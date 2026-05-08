import { Link, useNavigate } from "react-router-dom";
import { logout } from "../_services/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const handleLogout = async () => {
    if (token) {
      await logout({ token, userInfo });
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
    }
    navigate("/login");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          {/* LOGO */}
            <Link to={"#"} className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </Link>

          {/* AUTH BUTTON */}
          <div className="flex items-center lg:order-2">
            {token && userInfo ? (
              <>
                <span className="text-gray-800 dark:text-white mr-3">
                  {userInfo.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 mr-3">
                  Masuk
                </Link>
                <Link to="/register" className="text-white bg-indigo-700 px-4 py-2 rounded-lg">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* MENU */}
          <div className="hidden lg:flex lg:order-1">
            <ul className="flex space-x-8 font-medium">

              <li>
                <Link to="/" className="text-gray-700">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/books" className="text-gray-700">
                  Buku
                </Link>
              </li>

              <li>
                <Link to="/blog" className="text-gray-700">
                  Blog
                </Link>
              </li>

              <li>
                <Link to="/services" className="text-gray-700">
                  Layanan
                </Link>
              </li>

              {/* 🔥 RIWAYAT TRANSAKSI (KHUSUS CUSTOMER) */}
              {token && userInfo?.role === "customer" && (
                <li>
                  <Link to="/transactions" className="text-gray-700">
                    Riwayat Transaksi
                  </Link>
                </li>
              )}

            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}