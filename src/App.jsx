import AllBooks from "./components/AllBooks";
import BooksContextProvider from "./context/BooksContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//* Importing the routes
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import BooksByGenre from "./components/BooksByGenre";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import NotFound from "./components/NotFound";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import GetBookById from "./components/GetBookById";
import Contact from "./components/Contact";

function App() {

  return (
      <Router>
        <AuthContextProvider>
          <BooksContextProvider>
            <Navbar />
              <AppContent />
            <Footer /> 
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
      <Route path="/books/genre/:genre" element={user ? <BooksByGenre /> : <Navigate to='/login' />} />
      {/* ENDING HERO SECTION */}

      <Route path="/books" element={user ? <AllBooks /> : <Navigate to="/login" />} />
      <Route path="/books/:id" element={user ? <GetBookById /> : <Navigate to="/login"/>} />
      <Route path="/sign-up" element={!user ? <SignupForm /> : <Navigate to='/' />} />
      <Route path="/login" element={!user ? <LoginForm /> : <Navigate to='/' /> } />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
