import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/public";
import Books from "./pages/public/books";
import PublicLayout from "./layouts/Public";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/Admin";
import Dashboard from "./pages/admin/index";
import AdminBooks from "./pages/admin/books/index";
import BookCreate from "./pages/admin/books/create";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import BookEdit from "./pages/admin/books/edit";
import AuthorEdit from "./pages/admin/authors/edit";
import GenreEdit from "./pages/admin/genres/edit";
import ShowBook from "./pages/public/books/show";
import AdminTransactions from "./pages/admin/transactions";
import TransactionEdit from "./pages/admin/transactions/edit";
import { RequireAuth, RequireAdmin } from "./components/ProtectedRoute";
import UserTransactions from "./pages/public/transactions";
import Tentang from "./pages/public/tentang";
import Kontak from "./pages/public/kontak";
import Cart from "./pages/public/cart";
import AdminMessages from "./pages/admin/messages";
import Payment from "./pages/public/payment";
import AdminUsers from "./pages/admin/users";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />

            <Route path="books">
              <Route index element={<Books />} />
              <Route path="show/:id" element={<ShowBook />} />
            </Route>

            <Route path="tentang" element={<Tentang />} />
            <Route path="kontak" element={<Kontak />} />
            
            <Route
              path="cart"
              element={
                <RequireAuth>
                  <Cart />
                </RequireAuth>
              }
            />
            
            <Route
              path="payment"
              element={
                <RequireAuth>
                  <Payment />
                </RequireAuth>
              }
            />

            <Route
              path="transactions"
              element={
                <RequireAuth>
                  <UserTransactions />
                </RequireAuth>
              }
            />
          </Route>

          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin */}
          <Route
            path="admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Books */}
            <Route path="books">
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<BookCreate />} />
              <Route path="edit/:id" element={<BookEdit />} />
            </Route>
            
            {/* Users */}
            <Route path="users" element={<AdminUsers />} />

            {/* Authors */}
            <Route path="authors">
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<AuthorCreate />} />
              <Route path="edit/:id" element={<AuthorEdit />} />
            </Route>

            {/* Genres */}
            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenreCreate />} />
              <Route path="edit/:id" element={<GenreEdit />} />
            </Route>

            {/* Transactions */}
            <Route path="transactions">
              <Route index element={<AdminTransactions />} />
              <Route path="edit/:id" element={<TransactionEdit />} />
            </Route>
            
            {/* Messages */}
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
