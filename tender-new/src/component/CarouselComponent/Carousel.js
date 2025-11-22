import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import './Carousel.css'


const Carousel = () => {

  const [BannerContent, setBannerContent] = useState();


  useEffect(() => {


    var token = localStorage.getItem("token");
    if (token !== null) {
      setBannerContent(
        <>

        </>
      )
    }
    else {
      setBannerContent(
        <>
          <div className="container-fluid p-0 mb-5">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        navigation
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        speed={1200}
      >
        {/* First Slide - Discover Tenders */}
        <SwiperSlide>
          <div className="position-relative">
            <img
              className="img-fluid"
              src="/assets/img/slide-1.jpg"
              alt="Discover Tenders"
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "linear-gradient(135deg, rgba(37, 99, 235, 0.8) 0%, rgba(16, 185, 129, 0.7) 100%)" }}
            >
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h5 className="text-white text-uppercase mb-3 fw-bold">
                      <i className="fa fa-search me-2"></i>Discover Opportunities
                    </h5>
                    <h1 className="display-3 text-white mb-4 fw-bold">
                      Access 15,000+ Active Tenders Worldwide
                    </h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2">
                      Connect with government and private sector contracts across multiple industries. Our platform brings all tender opportunities to your fingertips.
                    </p>
                    <a
                      href="/register"
                      className="btn btn-light btn-lg py-md-3 px-md-5 me-3"
                    >
                      <i className="fa fa-user-plus me-2"></i>Start Free Trial
                    </a>
                    <a
                      href="/viewcategory"
                      className="btn btn-outline-light btn-lg py-md-3 px-md-5"
                    >
                      <i className="fa fa-eye me-2"></i>Browse Tenders
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Second Slide - Smart Bidding */}
        <SwiperSlide>
          <div className="position-relative">
            <img
              className="img-fluid"
              src="/assets/img/slide-1.jpg"
              alt="Smart Bidding"
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(245, 158, 11, 0.7) 100%)" }}
            >
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h5 className="text-white text-uppercase mb-3 fw-bold">
                      <i className="fa fa-chart-line me-2"></i>Smart Bidding
                    </h5>
                    <h1 className="display-3 text-white mb-4 fw-bold">
                      Win More Contracts with Data-Driven Insights
                    </h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2">
                      Leverage our advanced analytics and AI-powered recommendations to improve your bid success rate by up to 40%.
                    </p>
                    <a
                      href="/services"
                      className="btn btn-light btn-lg py-md-3 px-md-5 me-3"
                    >
                      <i className="fa fa-info-circle me-2"></i>Learn More
                    </a>
                    <a
                      href="/contact"
                      className="btn btn-outline-light btn-lg py-md-3 px-md-5"
                    >
                      <i className="fa fa-phone me-2"></i>Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Third Slide - Secure Platform */}
        <SwiperSlide>
          <div className="position-relative">
            <img
              className="img-fluid"
              src="/assets/img/slide-1.jpg"
              alt="Secure Platform"
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.7) 100%)" }}
            >
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-10 col-lg-8">
                    <h5 className="text-white text-uppercase mb-3 fw-bold">
                      <i className="fa fa-shield-alt me-2"></i>Secure & Compliant
                    </h5>
                    <h1 className="display-3 text-white mb-4 fw-bold">
                      Bank-Level Security for Your Peace of Mind
                    </h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2">
                      Your data is protected with SSL encryption, secure document storage, and compliance with international standards.
                    </p>
                    <a
                      href="/register"
                      className="btn btn-light btn-lg py-md-3 px-md-5 me-3"
                    >
                      <i className="fa fa-rocket me-2"></i>Get Started
                    </a>
                    <a
                      href="/about"
                      className="btn btn-outline-light btn-lg py-md-3 px-md-5"
                    >
                      <i className="fa fa-info me-2"></i>About Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        
      </Swiper>
    </div>
        </>
      )
    }


  }, [])

  return (
    <>
      {BannerContent}
    </>
  );
};

export default Carousel;
