import Auth from '../AuthenticationComponent/Auth';

function Header({ token, role, email }) {
    const isAdmin = token && role === "admin";
    const isUser = token && role === "user";

    return (
        <>
            <Auth />
            {isAdmin && (
                <div className="custom-topbar bg-[#f8fafc] border-b border-slate-200 text-slate-600 text-xs flex items-center justify-between px-4 lg:px-8 hidden lg:flex animate-fade-in">
                    <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d97706]/10 border border-[#d97706]/30 rounded-full text-xs font-semibold text-[#d97706] tracking-wide uppercase">
                            <i className="fa fa-user-shield"></i>
                            Admin Portal
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <i className="far fa-envelope text-[#d97706] text-sm"></i>
                        <span className="font-medium text-slate-800">{email}</span>
                    </div>
                </div>
            )}
            {isUser && (
                <div className="custom-topbar bg-[#f8fafc] border-b border-slate-200 text-slate-600 text-xs flex items-center justify-between px-4 lg:px-8 hidden lg:flex animate-fade-in">
                    <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d97706]/10 border border-[#d97706]/30 rounded-full text-xs font-semibold text-[#d97706] tracking-wide uppercase">
                            <i className="fa fa-user-circle"></i>
                            Vendor Dashboard
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <i className="far fa-envelope text-[#d97706] text-sm"></i>
                        <span className="font-medium text-slate-800">{email}</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
