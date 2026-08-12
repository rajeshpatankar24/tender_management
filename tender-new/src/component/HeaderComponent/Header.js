import Auth from '../AuthenticationComponent/Auth';

function Header({ token, role, email, onToggleSidebar }) {
    const isAdmin = token && role === "admin";

    if (!token) {
        return <Auth />;
    }

    return (
        <>
            <Auth />
            <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm z-30 w-full">
                {/* Left Side: Mobile Hamburger & Welcome */}
                <div className="flex items-center gap-4">
                    {/* Hamburger button visible on mobile/tablet */}
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg hover:bg-slate-50 transition-colors"
                        aria-label="Open sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d97706]/10 border border-[#d97706]/20 rounded-full text-xs font-semibold text-[#d97706] tracking-wide uppercase">
                            <i className={`fas ${isAdmin ? 'fa-user-shield' : 'fa-user-circle'}`}></i>
                            {isAdmin ? 'Admin Portal' : 'Vendor Dashboard'}
                        </span>
                    </div>
                </div>

                {/* Right Side: Logged-in user info */}
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex flex-col text-right">
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Logged in as</span>
                        <span className="text-xs font-bold text-slate-700">{email}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d97706] to-[#b45309] flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {email ? email.charAt(0).toUpperCase() : 'U'}
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
