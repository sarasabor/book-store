import AllBooks from "./components/AllBooks";
import BooksContextProvider from "./context/BooksContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Favorites from "./components/Favorites";
import Checkout from "./components/Checkout";

//* Importing the routes
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import BooksByGenre from "./components/BooksByGenre";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import NotFound from "./components/NotFound";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import GetBookById from "./components/GetBookById";
// import Contact from "./components/Contact";

function App() {

  return (
      <Router>
        <AuthContextProvider>
          <BooksContextProvider>
            <FavoritesProvider>
              <CartProvider>
                <Navbar />
                  <AppContent />
                <Footer /> 
              </CartProvider>
            </FavoritesProvider>
          </BooksContextProvider>
        </AuthContextProvider>
      </Router>
  );
}

function AppContent() {
  const {user} = useContext(AuthContext);

  return (
    <>
      <Routes>
      {/* HERO SECTION */}
      <Route path="/" element={<Hero />} />
      <Route path="/books/genre/:genre" element={<BooksByGenre />} />
      {/* ENDING HERO SECTION */}

      <Route path="/books" element={<AllBooks />} />
      <Route path="/books/:id" element={<GetBookById />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/sign-up" element={!user ? <SignupForm /> : <Navigate to='/' />} />
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to='/' /> } />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
