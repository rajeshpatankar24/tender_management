import { Link } from 'react-router-dom';

function Content() {
  const sampleTenders = [
    {
      id: 1,
      title: "Smart City Infrastructure Development",
      category: "Construction",
      deadline: "June 15, 2026",
      status: "Open",
      value: "$1.2M"
    },
    {
      id: 2,
      title: "Enterprise Cloud ERP Integration",
      category: "Information Technology",
      deadline: "June 20, 2026",
      status: "Open",
      value: "$450K"
    },
    {
      id: 3,
      title: "Medical Diagnostic Equipment Supply",
      category: "Healthcare",
      deadline: "June 28, 2026",
      status: "Open",
      value: "$750K"
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-600 font-sans selection:bg-[#d97706] selection:text-white">

      {/* Stats Section */}
      <section className="py-16 bg-[#f1f5f9] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#d97706]/20 transition-all duration-300 text-center space-y-2 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#d97706]/10 flex items-center justify-center text-[#d97706] mx-auto text-lg">
                <i className="fa fa-file-alt"></i>
              </div>
              <h3 className="font-['Outfit'] font-black text-3xl text-slate-900">10,000+</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Tenders</p>
            </div>
            
            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#d97706]/20 transition-all duration-300 text-center space-y-2 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#d97706]/10 flex items-center justify-center text-[#d97706] mx-auto text-lg">
                <i className="fa fa-users"></i>
              </div>
              <h3 className="font-['Outfit'] font-black text-3xl text-slate-900">5,000+</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Registered Vendors</p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#d97706]/20 transition-all duration-300 text-center space-y-2 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#d97706]/10 flex items-center justify-center text-[#d97706] mx-auto text-lg">
                <i className="fa fa-handshake"></i>
              </div>
              <h3 className="font-['Outfit'] font-black text-3xl text-slate-900">8,500+</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Tenders Awarded</p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#d97706]/20 transition-all duration-300 text-center space-y-2 shadow-sm hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-[#d97706]/10 flex items-center justify-center text-[#d97706] mx-auto text-lg">
                <i className="fa fa-chart-line"></i>
              </div>
              <h3 className="font-['Outfit'] font-black text-3xl text-slate-900">98.6%</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900">How It Works</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our 3-step unified workflow makes corporate tender sourcing and bidding efficient and completely transparent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10 py-4">
            {/* Step 1: Post Tender */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 relative overflow-hidden shadow-md shadow-slate-100/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start border border-slate-100/80">
              {/* Massive Watermark Step Number */}
              <span className="absolute top-4 right-8 font-['Outfit'] font-black text-7xl text-[#fae8d4] opacity-80 select-none tracking-tighter">01</span>
              
              {/* Peach Icon Box */}
              <div className="w-14 h-14 bg-[#fdf2e9] rounded-full flex items-center justify-center text-[#d97706] mb-8 shadow-sm">
                <i className="fa fa-file-upload text-xl"></i>
              </div>

              {/* Title */}
              <h3 className="font-['Outfit'] font-extrabold text-[#0f172a] text-lg sm:text-xl mb-4 text-left leading-snug">
                Post Tender
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 font-medium text-left leading-relaxed">
                Companies outline criteria, specify bills of quantities, upload tender forms, and publish requirements securely.
              </p>
            </div>

            {/* Step 2: Receive Bids */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 relative overflow-hidden shadow-md shadow-slate-100/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start border border-slate-100/80">
              {/* Massive Watermark Step Number */}
              <span className="absolute top-4 right-8 font-['Outfit'] font-black text-7xl text-[#fae8d4] opacity-80 select-none tracking-tighter">02</span>
              
              {/* Peach Icon Box */}
              <div className="w-14 h-14 bg-[#fdf2e9] rounded-full flex items-center justify-center text-[#d97706] mb-8 shadow-sm">
                <i className="fa fa-clipboard-list text-xl"></i>
              </div>

              {/* Title */}
              <h3 className="font-['Outfit'] font-extrabold text-[#0f172a] text-lg sm:text-xl mb-4 text-left leading-snug">
                Receive Bids
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 font-medium text-left leading-relaxed">
                Vendors evaluate requirements and submit compliant pricing schedules and technical proposals in real-time.
              </p>
            </div>

            {/* Step 3: Award Contract */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 relative overflow-hidden shadow-md shadow-slate-100/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start border border-slate-100/80">
              {/* Massive Watermark Step Number */}
              <span className="absolute top-4 right-8 font-['Outfit'] font-black text-7xl text-[#fae8d4] opacity-80 select-none tracking-tighter">03</span>
              
              {/* Peach Icon Box */}
              <div className="w-14 h-14 bg-[#fdf2e9] rounded-full flex items-center justify-center text-[#d97706] mb-8 shadow-sm">
                <i className="fa fa-trophy text-xl"></i>
              </div>

              {/* Title */}
              <h3 className="font-['Outfit'] font-extrabold text-[#0f172a] text-lg sm:text-xl mb-4 text-left leading-snug">
                Award Contract
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 font-medium text-left leading-relaxed">
                Evaluate all bidder proposals side-by-side transparently, select the optimum value offer, and award the contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features (Enterprise Solutions) Section */}
      <section className="py-10 bg-[#f8fafc] border-b border-slate-200/60 flex items-center min-h-[800px] max-h-[1000px] overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 w-full flex flex-col justify-center h-full">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-[#d97706] text-[10px] font-bold uppercase tracking-wider bg-[#d97706]/10 px-2.5 py-0.5 rounded-full">
              Enterprise Solutions
            </span>
            <h2 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-slate-900">
              Enterprise Tender Solutions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Explore powerful enterprise modules built on the MERN stack for modern institutional procurement.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Row 1: Admin Dashboard Oversight (Text Left, Image Right) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 py-3.5 border-b border-slate-100 last:border-0">
              {/* Text Column */}
              <div className="w-full sm:w-[55%] space-y-1.5 text-left">
                {/* <span className="text-[#d97706] text-[10px] font-bold uppercase tracking-widest bg-[#d97706]/10 px-2.5 py-0.5 rounded-full w-fit block">
                  Platform Control
                </span> */}
                <h3 className="font-['Outfit'] font-black text-base sm:text-lg lg:text-xl text-[#0f172a] leading-tight">
                  Admin Dashboard Oversight
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 max-w-xl">
                  Manage institutional users, review audit trails, oversee category creation, and monitor global platform metrics. Ensure complete transparency and compliance across all active tender operations from a single unified workspace.
                </p>
              </div>
              {/* Image Column */}
              <div className="w-full sm:w-[35%] h-[100px] flex justify-center items-center">
                <img 
                  src="/assets/img/rbac_illustration.png" 
                  alt="Admin Dashboard Oversight Illustration" 
                  className="h-[90px] sm:h-[100px] w-auto object-contain rounded-2xl shadow-md hover:scale-105 transition-all duration-300 shadow-slate-100/50"
                />
              </div>
            </div>

            {/* Row 2: Company Portal Procurement (Image Left, Text Right) */}
            <div className="flex flex-col sm:flex-row-reverse items-center justify-between gap-6 sm:gap-8 py-3.5 border-b border-slate-100 last:border-0">
              {/* Text Column */}
              <div className="w-full sm:w-[55%] space-y-1.5 text-left">
                {/* <span className="text-[#d97706] text-[10px] font-bold uppercase tracking-widest bg-[#d97706]/10 px-2.5 py-0.5 rounded-full w-fit block">
                  Corporate Sourcing
                </span> */}
                <h3 className="font-['Outfit'] font-black text-base sm:text-lg lg:text-xl text-[#0f172a] leading-tight">
                  Company Portal Procurement
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 max-w-xl">
                  Publish complex requirements, specify technical bills of quantities, and analyze incoming proposals side-by-side. Empower your corporate purchasing departments to acquire premium services with zero operational friction.
                </p>
              </div>
              {/* Image Column */}
              <div className="w-full sm:w-[35%] h-[100px] flex justify-center items-center">
                <img 
                  src="/assets/img/document_vault_illustration.png" 
                  alt="Company Portal Procurement Illustration" 
                  className="h-[90px] sm:h-[100px] w-auto object-contain rounded-2xl shadow-md hover:scale-105 transition-all duration-300 shadow-slate-100/50"
                />
              </div>
            </div>

            {/* Row 3: Vendor Proposal Submissions (Text Left, Image Right) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 py-3.5 border-b border-slate-100 last:border-0">
              {/* Text Column */}
              <div className="w-full sm:w-[55%] space-y-1.5 text-left">
                {/* <span className="text-[#d97706] text-[10px] font-bold uppercase tracking-widest bg-[#d97706]/10 px-2.5 py-0.5 rounded-full w-fit block">
                  Vendor Network
                </span> */}
                <h3 className="font-['Outfit'] font-black text-base sm:text-lg lg:text-xl text-[#0f172a] leading-tight">
                  Vendor Proposal Submissions
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2 max-w-xl">
                  Evaluate active institutional tenders, compile technical sheets, and submit competitive bids securely. Gain access to high-value contract opportunities with real-time bidding updates and automated compliance tracking.
                </p>
              </div>
              {/* Image Column */}
              <div className="w-full sm:w-[35%] h-[100px] flex justify-center items-center">
                <img 
                  src="/assets/img/bid_tracking_illustration.png" 
                  alt="Vendor Proposal Submissions Illustration" 
                  className="h-[90px] sm:h-[100px] w-auto object-contain rounded-2xl shadow-md hover:scale-105 transition-all duration-300 shadow-slate-100/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge/Dark Shape Image Banner Section */}
      <section className="relative w-full h-[350px] sm:h-[40px] lg:h-[450px] overflow-hidden flex items-center justify-center">
        {/* Background Dark Shape Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/img/wave shape.png" 
            alt="Dark Shape Canvas" 
            className="w-full h-full object-cover object-center" 
          />
          {/* Subtle dark overlay to ensure maximum text contrast */}
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[0.5px]"></div>
        </div>

        {/* Minimal Centered Typography Block with slight shadow/glow and plenty of empty space */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-3 sm:space-y-4">
          <h3 className="font-['Outfit'] font-black text-3xl  text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Smart Digital Procurement
          </h3>
          
        </div>
      </section>

      {/* Recent Tenders Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-4 text-left">
              <span className="text-[#d97706] text-xs font-semibold uppercase tracking-wider">Active Procurement</span>
              <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900">Recent Active Tenders</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Examine recently announced corporate and institutional tender requirements now open for vendor bidding.
              </p>
            </div>
            <Link to="/viewcategory" className="inline-flex items-center gap-2 text-xs font-bold text-[#d97706] hover:text-[#b45309] uppercase tracking-wider transition-colors duration-200">
              <span>View All Tenders</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {sampleTenders.map(tender => (
              <div key={tender.id} className="bg-white border border-slate-200/60 rounded-2xl p-6 hover:border-[#d97706]/20 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#d97706]/10 border border-[#d97706]/20 text-[#d97706] rounded-md tracking-wider uppercase">
                      {tender.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {tender.status}
                    </span>
                  </div>

                  <h3 className="font-['Outfit'] font-bold text-lg text-slate-900 leading-snug group-hover:text-[#d97706] transition-colors duration-200">
                    {tender.title}
                  </h3>

                  <div className="pt-2 flex flex-col gap-1.5 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Value Projection:</span>
                      <span className="font-semibold text-slate-800">{tender.value}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deadline Date:</span>
                      <span className="font-semibold text-slate-800">{tender.deadline}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Link to="/viewcategory" className="w-full text-center block bg-slate-50 hover:bg-[#d97706] text-slate-700 hover:text-white border border-slate-200 hover:border-transparent py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm">
                    Bid on Tender
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f1f5f9] border border-slate-200 rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-md">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[#d97706]/5 blur-[120px] rounded-full -z-10"></div>
            
            <div className="space-y-4 text-left max-w-xl">
              <h2 className="font-['Outfit'] font-black text-3xl sm:text-4xl text-slate-900">Ready to Discover Sourcing Success?</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Establish corporate bidding pipelines or tender solicitations on our enterprise MERN portal instantly. Secure your business development future.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link to="/register" className="bg-[#d97706] hover:bg-[#b45309] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#d97706]/10 transition-all duration-200">
                Register Platform Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content;
