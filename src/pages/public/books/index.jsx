import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";
import { getBooks } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksData, genresData] = await Promise.all([
          getBooks(),
          getGenres()
        ]);
        setBooks(booksData || []);
        setGenres(genresData || []);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    fetchData()
  }, [])

  const filteredBooks = books.filter(book => {
    const matchSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGenre = selectedGenre ? String(book.genre_id) === String(selectedGenre) : true;
    return matchSearch && matchGenre;
  });

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 flex flex-col md:flex-row gap-8">
          
          {/* LEFT SIDEBAR - GENRES */}
          <div className="w-full md:w-1/4 lg:w-1/5 shrink-0">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 sticky top-24">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Kategori Buku</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setSelectedGenre("")} 
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedGenre === "" ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-semibold' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                  >
                    Semua Kategori
                  </button>
                </li>
                {genres.map(genre => (
                  <li key={genre.id}>
                    <button 
                      onClick={() => setSelectedGenre(genre.id)} 
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${String(selectedGenre) === String(genre.id) ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-semibold' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'}`}
                    >
                      {genre.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT CONTENT - SEARCH AND BOOKS */}
          <div className="w-full md:w-3/4 lg:w-4/5 flex-1">
            
            {/* SEARCH INPUT */}
            <div className="mb-6 w-full relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                type="text" 
                className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-xl bg-white focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 shadow-sm transition-all" 
                placeholder="Cari judul buku yang Anda inginkan..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* BOOKS GRID */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div key={book.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="h-56 w-full">
                      <Link to={`/books/show/${book.id}`}>
                        <img
                          className="mx-auto h-full"
                          src={
                            book.cover_photo.startsWith('http') 
                            ? book.cover_photo 
                            : `${bookImageStorage}/${book.cover_photo}`
                          }
                          alt={book.title}
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/400x600?text=No+Image";
                          }}
                        />
                      </Link>
                    </div>
                    <div className="pt-6">
                      <Link to={`/books/show/${book.id}`}
                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                      >
                        {book.title}
                      </Link>

                      <ul className="mt-2 flex items-center gap-4">
                        <li className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                          </svg>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                          </svg>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                        </li>
                      </ul>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                          Rp{book.price}
                        </p>
                        <Link
                          to={`/books/show/${book.id}`}
                          className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                          View Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg">Buku tidak ditemukan</p>
                </div>
              )}
            </div>

            <div className="w-full text-center">
              <button
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 transition-colors"
              >
                Tampilkan Lebih Banyak
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}