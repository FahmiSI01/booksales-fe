import { Link, useNavigate } from "react-router-dom";
import { logout } from "../_services/auth";
import { useEffect, useState } from "react";
import { getCart } from "../_services/carts";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [unreadReplies, setUnreadReplies] = useState(0);

  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    const updateCounts = async () => {
      // Cart count
      if (token && userInfo?.role === "customer") {
        try {
          const cartData = await getCart();
          if (cartData && cartData.items) {
            setCartCount(cartData.items.reduce((total, item) => total + item.quantity, 0));
          }
        } catch (error) {
          // Ignore
        }
      }

      // Unread replies from admin
      if (userInfo?.id) {
        const messages = JSON.parse(localStorage.getItem("messages") || "[]");
        const unread = messages.filter(
          (m) => m.userId === userInfo.id && m.reply && !m.readByUser
        ).length;
        setUnreadReplies(unread);
      }
    };

    updateCounts();
    // Check periodically for updates (5 seconds for API)
    const interval = setInterval(updateCounts, 5000);
    return () => clearInterval(interval);
  }, [userInfo?.id, token]);

  const handleLogout = async () => {
    if (token) {
      try {
        await logout({ token, userInfo });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("accessToken");
      }
    }
    navigate("/login");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* LOGO */}
          <Link to={"/"} className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.046A.972.972 0 0 0 3 5.957v13.179a.97.97 0 0 0 .971.972c3.218-.031 5.378.146 8.029 1.046m0-15.124c2.819-.831 4.715-1.076 8.029-1.046A.972.972 0 0 1 21 5.957v13.179a.97.97 0 0 1-.971.972c-3.218-.031-5.378.146-8.029 1.046"/>
              </svg>
            </div>
            <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white text-indigo-900 tracking-tight">
              Bookstore'Mi
            </span>
          </Link>

          {/* AUTH BUTTON */}
          <div className="flex items-center lg:order-2 gap-4">
            {token && userInfo ? (
              <>
                {userInfo.role === "customer" && (
                  <Link to="/cart" className="relative text-gray-800 dark:text-white hover:text-indigo-600 transition-colors">
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}
                <span className="text-gray-800 dark:text-white font-medium">
                  {userInfo.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-indigo-600 font-medium mr-3 transition-colors">
                  Masuk
                </Link>
                <Link to="/register" className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium px-4 py-2 rounded-lg transition-colors">
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* MENU */}
          <div className="hidden lg:flex lg:order-1 w-auto">
            <ul className="flex space-x-8 font-medium items-center">
              <li>
                <Link to="/" className="text-gray-700 hover:text-indigo-600 dark:text-white transition-colors">
                  Beranda
                </Link>
              </li>

              <li>
                <Link to="/books" className="text-gray-700 hover:text-indigo-600 dark:text-white">
                  Buku
                </Link>
              </li>

              <li>
                <Link to="/tentang" className="text-gray-700 hover:text-indigo-600 dark:text-white">
                  Tentang Kami
                </Link>
              </li>

              <li>
                <Link to="/kontak" className="text-gray-700 hover:text-indigo-600 dark:text-white flex items-center gap-1">
                  Kontak
                  {unreadReplies > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadReplies}
                    </span>
                  )}
                </Link>
              </li>

              {/* KHUSUS CUSTOMER */}
              {token && userInfo?.role === "customer" && (
                <>
                  <li>
                    <Link to="/transactions" className="text-gray-700">
                      Riwayat
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}