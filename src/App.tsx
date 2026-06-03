import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, GraduationCap, School, ChevronRight, Sparkles, User, Lock, ArrowLeft 
} from "lucide-react";

import StudentDashboard from "./components/StudentDashboard";
import ParentDashboard from "./components/ParentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import PrincipalDashboard from "./components/PrincipalDashboard";

const Star = ({ top, left, size, duration }: { top: string; left: string; size: string; duration: string }) => (
  <div 
    className="star animate-pulse" 
    style={{ 
      top, 
      left, 
      width: size, 
      height: size, 
      backgroundColor: 'white',
      borderRadius: '50%',
      position: 'absolute',
      opacity: 0.3,
      animationDuration: duration 
    } as any} 
  />
);

const RoleCard = ({ 
  title, 
  gradient, 
  icon: Icon, 
  delay,
  description,
  onClick
}: { 
  title: string; 
  gradient: string; 
  icon: any; 
  delay: number;
  description?: string;
  onClick: () => void;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full h-44 rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl relative overflow-hidden group ${gradient} cursor-pointer`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
    <div className="flex flex-col items-start text-left z-10">
      <h2 className="text-3xl font-black tracking-tight text-white mb-1 leading-none">{title}</h2>
      {description && <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">{description}</p>}
      <div className="mt-4 bg-white/20 backdrop-blur-md rounded-full p-2 group-hover:bg-white/30 transition-colors">
        <ChevronRight className="w-5 h-5 text-white" />
      </div>
    </div>
    <div className="relative z-10">
      <div className="bg-white/20 backdrop-blur-xl p-6 rounded-3xl shadow-inner border border-white/30 group-hover:rotate-6 transition-transform duration-500">
        <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
      </div>
    </div>
  </motion.button>
);

const LoginScreen = ({ role, onBack, onLogin }: { role: string; onBack: () => void; onLogin: (subRole?: string) => void }) => {
  const [subRole, setSubRole] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getRoleColor = () => {
    if (role === "Student") return "from-rose-450 to-pink-600";
    if (role === "Parent") return "from-teal-400 to-cyan-600";
    return "from-amber-400 to-orange-600";
  };

  const isTeacherPrincipal = role === "Teacher & Principal";

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex-1 flex flex-col p-8 pt-16 relative"
    >
      <button 
        onClick={subRole ? () => setSubRole(null) : onBack}
        className="absolute top-12 left-8 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50 cursor-pointer"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <div className="mt-12 mb-10">
        <div className={`w-14 h-14 bg-gradient-to-tr ${getRoleColor()} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20 text-white`}>
          {role === "Student" && <GraduationCap className="w-8 h-8" />}
          {role === "Parent" && <Users className="w-8 h-8" />}
          {isTeacherPrincipal && <School className="w-8 h-8" />}
        </div>
        <h1 className="text-4xl font-serif font-bold text-white mb-2 leading-tight">
          {isTeacherPrincipal && !subRole ? "Select Role" : "Welcome back,"}
        </h1>
        <p className="text-white/50 text-lg">
          {isTeacherPrincipal && !subRole ? "Choose your position" : `Sign in as ${subRole || role}`}
        </p>
      </div>

      {isTeacherPrincipal && !subRole ? (
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setSubRole("Teacher")}
            className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                <User className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">Teacher</span>
            </div>
            <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" />
          </button>
          <button 
            onClick={() => setSubRole("Principal")}
            className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
                <School className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">Principal</span>
            </div>
            <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
              <User className="h-5 w-5" />
            </div>
            <input 
              type="text" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
              <Lock className="h-5 w-5" />
            </div>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button className="text-white/40 text-sm hover:text-white/60 transition-colors cursor-pointer">Forgot Password?</button>
          </div>

          <button 
            onClick={() => onLogin(subRole || undefined)}
            className={`w-full py-4 rounded-2xl bg-gradient-to-r ${getRoleColor()} text-white font-bold text-lg shadow-xl shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 cursor-pointer`}
          >
            Log In
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0A0A0A] px-2 text-white/20">or</span>
            </div>
          </div>

          <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all cursor-pointer">
            Create Account
          </button>
        </div>
      )}

      <p className="mt-auto text-center text-white/20 text-xs tracking-widest uppercase pb-4 font-mono">
        EDUVERSE SECURITY PROTOCOL v2.4
      </p>
    </motion.div>
  );
};

export default function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogin = (subRole?: string) => {
    if (selectedRole === "Teacher & Principal" && subRole) {
      setUserRole(subRole);
    } else {
      setUserRole(selectedRole);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <div className="min-h-screen universe-bg flex items-center justify-center p-4 font-sans selection:bg-rose-500/30 overflow-y-auto">
      {/* Background Stars */}
      <Star top="10%" left="15%" size="2px" duration="3s" />
      <Star top="25%" left="80%" size="3px" duration="5s" />
      <Star top="60%" left="10%" size="2px" duration="4s" />
      <Star top="85%" left="75%" size="4px" duration="6s" />
      <Star top="40%" left="90%" size="2px" duration="3.5s" />
      <Star top="70%" left="40%" size="3px" duration="4.5s" />

      {/* Smartphone Frame */}
      <div className="relative w-full max-w-[420px] h-[880px] bg-[#0A0A0A] rounded-[3.5rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] border-[8px] border-[#1A1A1A] overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1A1A1A] rounded-b-2xl z-50" />
        
        <AnimatePresence mode="wait">
          {isLoggedIn ? (
            userRole === "Student" ? (
              <StudentDashboard onLogout={handleLogout} />
            ) : userRole === "Parent" ? (
              <ParentDashboard onLogout={handleLogout} />
            ) : userRole === "Teacher" ? (
              <TeacherDashboard onLogout={handleLogout} />
            ) : (
              <PrincipalDashboard onLogout={handleLogout} />
            )
          ) : !selectedRole ? (
            <motion.div 
              key="role-selection"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex-1 flex flex-col p-8 pt-16 overflow-y-auto scrollbar-hide relative text-white"
            >
              {/* Header */}
              <header className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-rose-500 rounded-lg flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400 font-mono">
                    EDUVERSE
                  </span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-serif text-5xl leading-[1.1] text-white tracking-tight"
                >
                  Which best <br />
                  <span className="italic text-rose-400">describes</span> you?
                </motion.h1>
              </header>

              {/* Role Cards Stack */}
              <div className="flex flex-col gap-6">
                <RoleCard 
                  title="Student"
                  description="Learning & Growing"
                  gradient="bg-gradient-to-br from-rose-400 to-pink-600"
                  icon={GraduationCap}
                  delay={0.4}
                  onClick={() => setSelectedRole("Student")}
                />
                
                <RoleCard 
                  title="Parent"
                  description="Support & Guidance"
                  gradient="bg-gradient-to-br from-teal-400 to-cyan-600"
                  icon={Users}
                  delay={0.5}
                  onClick={() => setSelectedRole("Parent")}
                />
                
                <RoleCard 
                  title="Teacher & Principal"
                  description="Educate & Lead"
                  gradient="bg-gradient-to-br from-amber-400 to-orange-600"
                  icon={School}
                  delay={0.6}
                  onClick={() => setSelectedRole("Teacher & Principal")}
                />
              </div>

              {/* Footer Decoration */}
              <div className="mt-auto pt-12 text-center pointer-events-none">
                <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
                  Explore the universe of knowledge
                </p>
              </div>
            </motion.div>
          ) : (
            <LoginScreen 
              role={selectedRole as string} 
              onBack={() => setSelectedRole(null)} 
              onLogin={handleLogin}
            />
          )}
        </AnimatePresence>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}
