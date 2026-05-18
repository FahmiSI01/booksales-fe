import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { showBook } from "../../../_services/books";
import { bookImageStorage } from "../../../_api";
import { createTransactions } from "../../../_services/transactions";
import { getCart, addCartItem } from "../../../_services/carts";
import Swal from "sweetalert2";

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const [bookData] = await Promise.all([showBook(id)]);

      setBook(bookData);
    };

    fetchData();
  }, [id]);

  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!accessToken) {
    navigate("/login");
    return;
  }

  const item = {
    bookId: Number(id),
    title: book.title,
    price: book.price,
    quantity: Number(quantity),
    image: book.cover_photo && book.cover_photo.startsWith("http")
      ? book.cover_photo
      : `${bookImageStorage}/${book.cover_photo}`
  };

  navigate("/payment", { state: { items: [item], source: "direct" } });
};

  return (
    <>
      <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="mx-auto w-full max-w-[350px] h-auto rounded-lg shadow-lg object-cover"
                src={
                  book.cover_photo && book.cover_photo.startsWith("http")
                    ? book.cover_photo
                    : `${bookImageStorage}/${book.cover_photo}`
                }
                alt={book.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/400x600?text=No+Image";
                }}
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {book.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  Rp. {book.price}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    (5.0)
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    345 Reviews
                  </a>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 sm:mt-8 space-y-4 w-full"
                >
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Jumlah
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      min={1}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mt-1 block w-24 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:border-indigo-500 sm:text-sm "
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!accessToken) {
                          Swal.fire({
                            title: 'Belum Login',
                            text: 'Silakan login terlebih dahulu untuk memasukkan ke keranjang.',
                            icon: 'info',
                            confirmButtonColor: '#4f46e5'
                          }).then(() => navigate("/login"));
                          return;
                        }
                        
                        try {
                          const cart = await getCart();
                          
                          // Check if it already exists
                          const existingItem = cart.items ? cart.items.find(i => Number(i.book_id) === Number(id)) : null;
                          
                          if (existingItem) {
                            Swal.fire({
                              title: 'Oops!',
                              text: 'Buku ini sudah ada di keranjang Anda.',
                              icon: 'warning',
                              confirmButtonColor: '#4f46e5'
                            });
                            return;
                          }
                          
                          await addCartItem({
                            cart_id: cart.id,
                            book_id: Number(id),
                            quantity: Number(quantity)
                          });
                          
                          Swal.fire({
                            title: 'Berhasil!',
                            text: 'Buku berhasil dimasukkan ke keranjang.',
                            icon: 'success',
                            confirmButtonColor: '#4f46e5',
                            timer: 2000,
                            showConfirmButton: false
                          });
                        } catch (error) {
                          console.error(error);
                          Swal.fire({
                            title: 'Gagal!',
                            text: 'Gagal memasukkan buku ke keranjang.',
                            icon: 'error',
                            confirmButtonColor: '#4f46e5'
                          });
                        }
                      }}
                      className="text-indigo-700 mt-4 sm:mt-0 bg-white border border-indigo-700 hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-transparent dark:text-indigo-400 dark:border-indigo-500 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center flex-1 sm:flex-none"
                    >
                      Masukkan Keranjang
                    </button>

                    <button
                      type="submit"
                      className="text-white mt-4 sm:mt-0 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center flex-1 sm:flex-none"
                    >
                      Beli Langsung
                    </button>
                  </div>
                </form>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
