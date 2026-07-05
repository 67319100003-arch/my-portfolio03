import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import NewsListPage from "./components/NewsListPage";
import StaffPage from "./components/StaffPage";
import DepartmentsPage from "./components/DepartmentsPage";
import Footer from "./components/Footer";
export default function () {
  return (
    <main>
      <Navbar />
      <HomePage />
      <AboutPage />
      <NewsListPage />
      <StaffPage />
      <DepartmentsPage />
      <Footer />
    </main>
  );
}

