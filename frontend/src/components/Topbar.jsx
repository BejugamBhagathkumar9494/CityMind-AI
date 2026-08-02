import { 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  Building2, 
  ChevronDown, 
  ExternalLink,
  ShieldAlert,
  Sparkles,
  CloudRain,
  Sun,
  Menu
} from 'lucide-react';
import { fetchLiveWeather } from '../services/api';

export default function Topbar({ 
  selectedCity, 
  setSelectedCity, 
  onOpenAuth, 
  onShowLanding,
  onStartDemo,
  user,
  onLogout,
  onToggleMobileSidebar
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [weather, setWeather] = useState(null);
  const cityMenuRef = useRef(null);

  useEffect(() => {
    fetchLiveWeather().then(res => setWeather(res)).catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cityMenuRef.current && !cityMenuRef.current.contains(event.target)) {
        setShowCityMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cities = [
    { id: 'bengaluru', name: 'Bengaluru Metro Region', code: 'BLR' },
    { id: 'mumbai', name: 'Mumbai Metropolitan Area', code: 'BOM' },
    { id: 'delhi', name: 'Delhi National Capital Region', code: 'DEL' },
    { id: 'hyderabad', name: 'Hyderabad Urban Area', code: 'HYD' },
    { id: 'chennai', name: 'Greater Chennai Corporation', code: 'MAA' },
    { id: 'kolkata', name: 'Kolkata Metropolitan Area', code: 'CCU' },
    { id: 'ahmedabad', name: 'Ahmedabad Urban Area', code: 'AMD' },
    { id: 'pune', name: 'Pune Metropolitan Region', code: 'PNQ' }
  ];

  const initials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() 
    : 'AO';

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: Mobile Hamburger & City Selector & Search */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 max-w-2xl">
        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* City Selector */}
        <div className="relative" ref={cityMenuRef}>
          <button 
            onClick={() => setShowCityMenu(!showCityMenu)}
            className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{cities.find(c => c.id === selectedCity)?.name || 'Bengaluru Metro Region'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showCityMenu && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Active City Network
              </div>
              {cities.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCity(c.id);
                    setShowCityMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-blue-50 transition-colors ${
                    selectedCity === c.id ? 'text-blue-600 bg-blue-50/70 font-bold' : 'text-slate-700'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search infrastructure IDs, complaints, policy docs (Press '/' to search)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-3">
        
        {/* Live Weather Telemetry Badge */}
        {weather && (
          <div className="hidden lg:flex items-center space-x-1.5 bg-blue-50/80 border border-blue-200/80 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-900 shadow-xs">
            <CloudRain className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span>{weather.city}: {weather.temperature_celsius}°C</span>
            <span className="text-[10px] text-blue-600 font-semibold">({weather.weather_condition})</span>
          </div>
        )}

        {/* Landing Page Link */}
        <button
          onClick={onShowLanding}
          className="text-xs font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <span className="text-xs font-bold text-slate-900">City Alerts</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div className="p-2 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-900">Critical Risk: MG Road Flyover</p>
                    <p className="text-[11px] text-red-700">Failure prob 87% • 482 Complaints</p>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2">
                  <Bell className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-900">Water Leakage Hotspot</p>
                    <p className="text-[11px] text-amber-700">319 complaints in Indiranagar Sector 12</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar / Auth Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
              {initials}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{user?.name || 'Admin Officer'}</p>
              <p className="text-[10px] text-blue-600 font-medium">{user?.role || 'City Admin Officer'}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs">
              <div className="p-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">{user?.name || 'Admin Officer'}</p>
                <p className="text-[11px] text-slate-500">{user?.email || 'admin@citymind.ai'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[10px] font-semibold">
                  {user?.role || 'City Admin Officer'}
                </span>
              </div>
              <button
                onClick={() => { setShowUserMenu(false); onOpenAuth(); }}
                className="w-full text-left px-2 py-1.5 mt-1 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
              >
                Switch Account / Sign In
              </button>
              <button
                onClick={() => { setShowUserMenu(false); onLogout(); }}
                className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-red-50 text-red-600 font-medium"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
