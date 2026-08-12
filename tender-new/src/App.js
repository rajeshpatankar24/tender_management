import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './component/HeaderComponent/Header';
import Topbar from './component/TopbarComponent/Topbar';
import Nav from './component/NavComponent/Nav';
import Hero from './component/HeroComponent/Hero';
import Content from './component/ContentComponent/Content';
import Footer from './component/FooterComponent/Footer';
import About from './component/AboutComponent/About';
import Contact from './component/ContactComponent/Contact';
import Services from './component/ServicesComponent/Services';
import Register from './component/RegisterComponent/Register';
import Login from './component/LoginComponent/Login';
import Admin from './component/AdminComponent/Admin';
import User from './component/UserComponent/User';
import Logout from './component/LogoutComponent/Logout';
import Category from './component/AddCategoryComponent/category';
import Addsubcategory from './component/AddSubCategoryComponent/subcategory';
import ManageUser from './component/ManageUserComponent/ManageUser';
import CPAdmin from './component/CPAdminComponent/CPAdmin';
import EPAdmin from './component/EPAdminComponent/EPAdmin';
import CPUser from './component/CPUserComponent/CPUser';
import EPUser from './component/EPUserComponent/EPUser';
import ViewCategory from './component/ViewCategoryComponent/ViewCategory';
import ViewSubCategory from './component/ViewSubCategoryComponent/ViewSubCategory';
import AddTender from './component/AddTenderComponent/AddTender';
import ViewProduct from './component/ViewProductComponent/ViewProduct';
import AddBid from './component/BidProductComponent/AddBid';
import ViewBidProduct from './component/ViewBidProductComponent/ViewBidProduct';
import ViewBid from './component/ViewBidComponent/ViewBid';
import Verify from './component/VerifyComponent/verify';

function App() {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  
  // Mobile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const currentToken = localStorage.getItem("token");
      const currentRole = localStorage.getItem("role");
      const currentEmail = localStorage.getItem("email");
      if (currentToken !== token || currentRole !== role || currentEmail !== email) {
        setToken(currentToken);
        setRole(currentRole);
        setEmail(currentEmail);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 100);
    window.addEventListener('storage', checkAuth);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkAuth);
    };
  }, [token, role, email, location.pathname]);

  // If user is authenticated, render the premium Left Sidebar dashboard layout
  if (token) {
    return (
      <div className="min-h-screen flex bg-[#f8fafc]">
        {/* Left Sidebar Navigation Menu */}
        <Nav 
          token={token} 
          role={role} 
          sidebarOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* Right Dashboard Workspace Container */}
        <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
          <Header 
            token={token} 
            role={role} 
            email={email} 
            onToggleSidebar={() => setSidebarOpen(true)} 
          />
          
          <main className="flex-grow p-4 md:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/addcategory" element={<Category />} />
              <Route path="/addsubcategory" element={<Addsubcategory />} />
              <Route path="/manageuser" element={<ManageUser />} />
              <Route path="/cpadmin" element={<CPAdmin />} />
              <Route path="/epadmin" element={<EPAdmin />} />
              <Route path="/user" element={<User />} />
              <Route path="/viewcategory" element={<ViewCategory />} />
              <Route path="/viewscategory/:Cname" element={<ViewSubCategory />} />
              <Route path="/viewp" element={<AddTender />} />
              <Route path="/viewproduct/:subcatnm" element={<ViewProduct />} />
              <Route path="/bidproduct/:_id" element={<AddBid />} />
              <Route path="/viewbidp" element={<ViewBidProduct />} />
              <Route path="/viewbid/:_id" element={<ViewBid />} />
              <Route path="/cpuser" element={<CPUser />} />
              <Route path="/epuser" element={<EPUser />} />
              <Route path="/verify/:email" element={<Verify />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    );
  }

  // Logged-out layout (horizontal header menu bar)
  return (
    <>
      <Header token={token} role={role} email={email} />
      <Topbar token={token} />
      <Nav token={token} role={role} />
      <Hero />

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addcategory" element={<Category />} />
        <Route path="/addsubcategory" element={<Addsubcategory />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/cpadmin" element={<CPAdmin />} />
        <Route path="/epadmin" element={<EPAdmin />} />
        <Route path="/user" element={<User />} />
        <Route path="/viewcategory" element={<ViewCategory />} />
        <Route path="/viewscategory/:Cname" element={<ViewSubCategory />} />
        <Route path="/viewp" element={<AddTender />} />
        <Route path="/viewproduct/:subcatnm" element={<ViewProduct />} />
        <Route path="/bidproduct/:_id" element={<AddBid />} />
        <Route path="/viewbidp" element={<ViewBidProduct />} />
        <Route path="/viewbid/:_id" element={<ViewBid />} />
        <Route path="/cpuser" element={<CPUser />} />
        <Route path="/epuser" element={<EPUser />} />
        <Route path="/verify/:email" element={<Verify />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
