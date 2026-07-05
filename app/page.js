import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import NewsListPage from "./components/NewsListPage";
import StaffPage from "./components/StaffPage";
import DepartmentsPage from "./components/DepartmentsPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HomePage />
        <AboutPage />
        <NewsListPage />
        <StaffPage />
        <DepartmentsPage />
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
}
