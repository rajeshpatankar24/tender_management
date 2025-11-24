import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './component/HeaderComponent/Header';
import Topbar from './component/TopbarComponent/Topbar';
import Nav from './component/NavComponent/Nav';
import Content from './component/ContentComponent/Content';
import Footer from './component/FooterComponent/Footer';
import About from './component/AboutComponent/About';
import Contact from './component/ContactComponent/Contact';
import Services from './component/ServicesComponent/Services';
import Register from './component/RegisterComponent/Register';
import Login from './component/LoginComponent/Login';
import Carousel from './component/CarouselComponent/Carousel';
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
import HeroContent from './component/HeroComponent/HeroContent';

function App() {
  const location = useLocation();

  // Hide carousel only on specific paths
  const hideCarouselPaths = ["/login", "/register", "/verify"];
  const hideCarousel = hideCarouselPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {/* Always visible */}
      <Header />
      <Topbar />
      <Nav />

      {/* Carousel visible only when not on login/register/verify */}
      {!hideCarousel && <Carousel />}

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

      {/* Always visible */}
      <Footer />
    </>
  );
}

export default App;
