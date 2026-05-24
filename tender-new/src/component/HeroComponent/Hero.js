import { Link, useLocation } from 'react-router-dom';

function Hero() {
  const location = useLocation();
  const path = location.pathname;

  // Define paths where the Hero is hidden (dashboard/auth paths)
  const hideHeroPaths = [
    "/login", 
    "/register", 
    "/verify", 
    "/admin", 
    "/manageuser", 
    "/addcategory", 
    "/addsubcategory", 
    "/viewp", 
    "/epadmin", 
    "/cpadmin", 
    "/user", 
    "/viewcategory", 
    "/viewbidp", 
    "/epuser", 
    "/cpuser",
    "/viewproduct",
    "/bidproduct",
    "/viewbid"
  ];
  
  const shouldHide = hideHeroPaths.some((p) => path.startsWith(p));
  
  if (shouldHide) return null;

  // Homepage Hero
  if (path === "/") {
    return (
      <section className="relative py-24 lg:py-32 overflow-hidden border-b border-slate-800 bg-slate-950">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-70"
        >
          <source src="/assets/videos/background-video.webm" type="video/webm" />
          <source src="/assets/videos/background-video.mp4" type="video/mp4" />
          <source src="/assets/videos/video.mp4" type="video/mp4" />
          <source src="/assets/img/video.mp4" type="video/mp4" />
          <source src="/video.mp4" type="video/mp4" />
          {/* High-quality abstract tech stock video fallback */}
          <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e36f128d31544b10b7849c71912&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>

        {/* Cinematic Dark Overlay for Ultimate Contrast and Legibility */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] z-10 pointer-events-none"></div>

        {/* Premium Tech Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-[#d97706]/10 rounded-full blur-[130px] pointer-events-none z-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-[#d97706]/10 rounded-full blur-[130px] pointer-events-none z-20"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 flex flex-col items-center">
          {/* Centered Hero Content Block */}
          <div className="space-y-8 text-center animate-fade-in flex flex-col items-center max-w-4xl">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-500 uppercase tracking-wider animate-pulse">
              <i className="fa fa-award"></i>
              <span>Trusted B2B Platform</span>
            </div> */}
            
            <h1 className="font-['Outfit'] font-black text-4xl  text-white leading-tight tracking-tight">
              From Tender to Contract<br />
              <span className="text-[#d97706]">In One Place</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl">
From publishing tenders to awarding contracts — manage every step in one place. 
Built for companies that need speed, transparency, and control over their procurement process.            </p>
            
            {/* Centered Modern Metrics Row */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-4">
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-[2px] justify-center text-center hover:border-amber-500/30 transition-colors duration-200">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 text-xs flex-shrink-0">
                  <i className="fa fa-check"></i>
                </div>
                <span className="text-sm font-semibold text-slate-200">10,000+ Active Tenders</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-[2px] justify-center text-center hover:border-amber-500/30 transition-colors duration-200">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 text-xs flex-shrink-0">
                  <i className="fa fa-check"></i>
                </div>
                <span className="text-sm font-semibold text-slate-200">Real-Time Alerts</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-[2px] justify-center text-center hover:border-amber-500/30 transition-colors duration-200">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 text-xs flex-shrink-0">
                  <i className="fa fa-check"></i>
                </div>
                <span className="text-sm font-semibold text-slate-200">Secure Document Vault</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-[2px] justify-center text-center hover:border-amber-500/30 transition-colors duration-200">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 text-xs flex-shrink-0">
                  <i className="fa fa-check"></i>
                </div>
                <span className="text-sm font-semibold text-slate-200">Role-Based CTAs</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link to="/register" className="bg-[#f8f3f3] hover:bg-[#b45309] text-white px-4 py-2  rounded-xl font-bold text-sm shadow-lg shadow-[#d97706]/20 transition-all duration-200 transform hover:-translate-y-0.5">
                Post a Tender
              </Link>
              <Link to="/viewcategory" className="border border-slate-700 hover:border-amber-500/50 bg-slate-900/60 hover:bg-amber-500/10 text-slate-200 hover:text-amber-500 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 transform hover:-translate-y-0.5 shadow-sm">
               Browse Tenders
              </Link>
            </div> */}
          </div>
        </div>
      </section>
    );
  }

  // Inner Page Hero Banner (for About, Services, Contact)
  let title = "";
  let subtitle = "";
  let icon = "";

  if (path === "/about") {
    title = "About TechTender";
    subtitle = "Revolutionizing corporate and government procurement since 2010.";
    icon = "fa-info-circle";
  } else if (path === "/services") {
    title = "Our Services";
    subtitle = "End-to-end digital tendering, evaluation, and contract awards.";
    icon = "fa-cogs";
  } else if (path === "/contact") {
    title = "Contact Us";
    subtitle = "Get in touch with our institutional sales and technical support.";
    icon = "fa-phone-alt";
  } else {
    return null;
  }

  return (
    <section className="relative py-12 lg:py-16 bg-[#f1f5f9] border-b border-slate-200/80 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-[#d97706]/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-50%] left-[-10%] w-[300px] h-[300px] bg-[#d97706]/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fade-in">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#d97706]/10 text-[#d97706] mb-2 shadow-sm border border-[#d97706]/10">
          <i className={`fas ${icon} text-base`}></i>
        </div>
        <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default Hero;
