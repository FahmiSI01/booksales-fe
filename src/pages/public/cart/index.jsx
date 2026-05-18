import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeCartItem } from "../../../_services/carts";
import Swal from "sweetalert2";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      loadCart();
    }
  }, [token]);

  const loadCart = async () => {
    try {
      const cartData = await getCart();
      // the backend returns a Cart object with 'items'
      if (cartData && cartData.items) {
        setCart(cartData.items);
        // By default, select all items
        setSelectedItemIds(cartData.items.map(item => item.id));
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await removeCartItem(itemId);
      setCart(cart.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Failed to remove item", error);
      Swal.fire('Gagal!', 'Gagal menghapus barang dari keranjang', 'error');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedItemIds(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItemIds.length === cart.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cart.map(item => item.id));
    }
  };

  const handleCheckout = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (selectedItemIds.length === 0) {
      Swal.fire('Pilih Barang', 'Silakan pilih minimal satu barang untuk dicheckout.', 'warning');
      return;
    }

    const itemsToCheckout = cart.filter(item => selectedItemIds.includes(item.id));
    navigate("/payment", { state: { items: itemsToCheckout, source: "cart" } });
  };

  const total = cart
    .filter(item => selectedItemIds.includes(item.id))
    .reduce((sum, item) => {
      const price = item.book ? item.book.price : 0;
      return sum + (price * item.quantity);
    }, 0);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Keranjang Belanja</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cart.length > 0 && (
              <div className="mb-4 flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <input
                  id="select-all"
                  type="checkbox"
                  checked={selectedItemIds.length === cart.length && cart.length > 0}
                  onChange={handleSelectAll}
                  className="w-5 h-5 text-indigo-600 bg-white border-2 border-indigo-400 rounded focus:ring-indigo-500 cursor-pointer transition-colors hover:bg-indigo-50"
                />
                <label htmlFor="select-all" className="ml-3 text-sm font-medium text-gray-900 dark:text-white cursor-pointer">
                  Pilih Semua ({cart.length} barang)
                </label>
              </div>
            )}
            
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Keranjang Anda kosong.</p>
              ) : (
                cart.map((item) => {
                  const book = item.book || {};
                  const price = book.price || 0;
                  // Handle absolute or relative paths just in case
                  const imageUrl = book.cover_photo?.startsWith("http") 
                    ? book.cover_photo 
                    : `http://127.0.0.1:8000/storage/${book.cover_photo}`;

                  return (
                    <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedItemIds.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                          className="w-5 h-5 text-indigo-600 bg-white border-2 border-indigo-400 rounded focus:ring-indigo-500 cursor-pointer flex-shrink-0 transition-colors hover:bg-indigo-50"
                        />
                        {book.cover_photo && (
                          <img className="h-20 w-16 object-cover rounded cursor-pointer" src={imageUrl} alt={book.title} onClick={() => handleCheckboxChange(item.id)} />
                        )}
                        <div>
                          <h3 className="text-base font-bold text-gray-900 dark:text-white">{book.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Rp. {price} x {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-base font-bold text-gray-900 dark:text-white">Rp. {price * item.quantity}</p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Ringkasan</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total Harga</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. {total}</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">Rp. {total}</dd>
                </dl>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedItemIds.length === 0}
                className="flex w-full items-center justify-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Checkout Sekarang ({selectedItemIds.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
