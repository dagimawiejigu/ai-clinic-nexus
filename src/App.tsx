import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Settings, 
  LogOut, 
  PlusCircle,
  Search,
  Bell,
  Activity
} from 'lucide-react';
import { Toaster } from 'sonner';
import { Dashboard } from './components/dashboard/Dashboard';
import { PatientList } from './components/patients/PatientList';
import { PatientRegistration } from './components/patients/PatientRegistration';
import { ConsultationRoom } from './components/consultation/ConsultationRoom';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedPatientId, setSelectedPatientId] = React.useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onStartConsultation={() => setActiveTab('consultation')} />;
      case 'patients':
        return <PatientList onSelectPatient={(id) => { setSelectedPatientId(id); setActiveTab('consultation'); }} />;
      case 'register':
        return <PatientRegistration onSuccess={() => setActiveTab('patients')} />;
      case 'consultation':
        return <ConsultationRoom initialPatientId={selectedPatientId} />;
      default:
        return <Dashboard onStartConsultation={() => setActiveTab('consultation')} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3 text-teal-600">
            <div className="bg-teal-100 p-2 rounded-xl">
              <Stethoscope size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">CareSync AI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Patients" 
            active={activeTab === 'patients'} 
            onClick={() => setActiveTab('patients')} 
          />
          <SidebarItem 
            icon={<PlusCircle size={20} />} 
            label="Register Patient" 
            active={activeTab === 'register'} 
            onClick={() => setActiveTab('register')} 
          />
          <SidebarItem 
            icon={<Activity size={20} />} 
            label="Consultation" 
            active={activeTab === 'consultation'} 
            onClick={() => setActiveTab('consultation')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
          <SidebarItem icon={<LogOut size={20} />} label="Logout" className="text-red-500 hover:bg-red-50 hover:text-red-600" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search patients, records..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">Dr. Sarah Miller</p>
                <p className="text-xs text-slate-500">Chief Resident</p>
              </div>
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/01ee8359-f44c-439f-9e87-5c319eb285dc/doctor-avatar-ccef9546-1772249887341.webp" 
                alt="Doctor Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-teal-100"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, className }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active 
          ? 'bg-teal-50 text-teal-700' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      } ${className}`}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-teal-600 rounded-full"></div>}
    </button>
  );
}