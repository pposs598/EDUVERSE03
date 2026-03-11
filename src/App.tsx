import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, GraduationCap, School, ChevronRight, Sparkles, User, Lock, ArrowLeft, 
  Bell, Calendar, BookOpen, MessageSquare, Brain, Library, Star as StarIcon, 
  Clock, MapPin, FileText, Monitor, Box, Target, Zap, Search, Book, Microscope,
  Coins, ShieldCheck, Globe, Cpu, BarChart3, Dna, Stethoscope, HeartPulse, 
  Link as LinkIcon, Share2, Award, Filter, ListFilter, Activity, CreditCard,
  CalendarCheck, Timer, Play, Pause, RotateCcw, UserPlus, Newspaper, ClipboardCheck, 
  MessageCircle, Navigation, Bot, Network, Headset, MapPinned, Thermometer, 
  Smile, BrainCircuit, GraduationCap as GradIcon, LayoutDashboard, Settings,
  RefreshCw, Download, Video
} from "lucide-react";

const Star = ({ top, left, size, duration }: { top: string; left: string; size: string; duration: string }) => (
  <div 
    className="star" 
    style={{ 
      top, 
      left, 
      width: size, 
      height: size, 
      "--duration": duration 
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
    className={`w-full h-44 rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl relative overflow-hidden group ${gradient}`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
    <div className="flex flex-col items-start text-left z-10">
      <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
        {title.split('\n').map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h2>
      {description && <p className="text-white/80 text-sm font-medium">{description}</p>}
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

const FeatureItem = ({ icon: Icon, label, color, onClick }: { icon: any, label: string, color: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 group"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <span className="text-[10px] font-medium text-white/60 text-center leading-tight uppercase tracking-wider">{label}</span>
  </button>
);

const StudentDashboard = ({ onLogout }: { onLogout: () => void; key?: string }) => {
  const [isClassroomOpen, setIsClassroomOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isClinicOpen, setIsClinicOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isGradesOpen, setIsGradesOpen] = useState(false);
  const [isLeaveRequestOpen, setIsLeaveRequestOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isOffsiteOpen, setIsOffsiteOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isConductOpen, setIsConductOpen] = useState(false);
  const [isBlockchainOpen, setIsBlockchainOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  
  const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutes in seconds
  const [isFocusActive, setIsFocusActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isFocusActive && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime((prev) => prev - 1);
      }, 1000);
    } else if (focusTime === 0) {
      setIsFocusActive(false);
      alert("Focus session complete!");
    }
    return () => clearInterval(interval);
  }, [isFocusActive, focusTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col relative overflow-hidden"
    >
      {/* Header */}
      <div className="p-8 pt-12 flex flex-col gap-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-rose-500 p-0.5">
              <img 
                src="https://picsum.photos/seed/student/100/100" 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Alex Universe</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest">Grade 12-A • #42</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1.5 rounded-full border border-amber-500/30">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">1,240 L2E</span>
            </div>
            <button onClick={onLogout} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-24">
        
        {/* Quick Status Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-400" /> My Status
            </h3>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Live Updates</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Arrival</span>
              </div>
              <div className="text-xl font-bold text-white">07:42 AM</div>
              <div className="text-[10px] text-rose-400 font-bold uppercase mt-1">On Time</div>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Next Class</span>
              </div>
              <div className="text-xl font-bold text-white">Physics</div>
              <div className="text-[10px] text-amber-400 font-bold uppercase mt-1">In 15 Mins</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-emerald-400">142</span>
              <span className="text-[8px] font-bold text-white/40 uppercase tracking-wider">Attended</span>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20 flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-amber-400">3</span>
              <span className="text-[8px] font-bold text-white/40 uppercase tracking-wider">Leave</span>
            </div>
            <div className="bg-rose-500/10 p-3 rounded-2xl border border-rose-500/20 flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-rose-400">1</span>
              <span className="text-[8px] font-bold text-white/40 uppercase tracking-wider">Absent</span>
            </div>
          </div>
        </div>

        {/* App Icon Grid */}
        <div className="grid grid-cols-3 gap-y-8 gap-x-4">
          
          {/* Attendance & Tracking */}
          <FeatureItem icon={Clock} label="Attendance" color="bg-rose-500" onClick={() => setIsAttendanceOpen(true)} />
          <FeatureItem icon={MapPin} label="Off-site" color="bg-orange-500" onClick={() => setIsOffsiteOpen(true)} />
          <FeatureItem icon={Calendar} label="Homework" color="bg-amber-500" onClick={() => setIsCalendarOpen(true)} />
          
          {/* Academic & Behavior */}
          <FeatureItem icon={GradIcon} label="Grades" color="bg-indigo-500" onClick={() => setIsGradesOpen(true)} />
          <FeatureItem icon={MessageSquare} label="Chat" color="bg-blue-500" onClick={() => setIsChatOpen(true)} />
          <FeatureItem icon={HeartPulse} label="Volunteer" color="bg-purple-500" onClick={() => setIsAssessmentOpen(true)} />
          
          {/* Library & Conduct */}
          <FeatureItem icon={Library} label="Library" color="bg-emerald-500" onClick={() => setIsLibraryOpen(true)} />
          <FeatureItem icon={ShieldCheck} label="Conduct" color="bg-teal-500" onClick={() => setIsConductOpen(true)} />
          <FeatureItem icon={CalendarCheck} label="Leave" color="bg-rose-600" onClick={() => setIsLeaveRequestOpen(true)} />
          
          {/* Learning Hub */}
          <FeatureItem icon={Book} label="Classroom" color="bg-emerald-600" onClick={() => setIsClassroomOpen(true)} />
          <FeatureItem icon={Timer} label="Focus" color="bg-indigo-600" onClick={() => setIsFocusModeOpen(true)} />
          <FeatureItem icon={Cpu} label="AI Core" color="bg-purple-600" onClick={() => setIsAIOpen(true)} />
          
          {/* Advanced Tech */}
          <FeatureItem icon={Award} label="Blockchain" color="bg-amber-600" onClick={() => setIsBlockchainOpen(true)} />
          
          {/* Research & Clinic */}
          <FeatureItem icon={Search} label="Research" color="bg-slate-600" onClick={() => setIsResearchOpen(true)} />
          <FeatureItem icon={Stethoscope} label="Clinic" color="bg-rose-700" onClick={() => setIsClinicOpen(true)} />
          <FeatureItem icon={CreditCard} label="Pay" color="bg-blue-700" onClick={() => setIsPayOpen(true)} />

        </div>

        {/* Featured Card: Dynamic Curriculum */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Activity className="w-12 h-12 text-indigo-500" />
          </div>
          <div className="space-y-4 relative z-10">
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">AI Recommendation</div>
              <div className="text-white font-medium">Next: Quantum Mechanics Lab</div>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
          </div>
        </div>

        {/* 11. Grades Modal */}
        <AnimatePresence>
          {isGradesOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><GradIcon className="w-6 h-6 text-indigo-400" /> Academic Results</h3>
                <button onClick={() => setIsGradesOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                <div className="bg-indigo-500/10 p-6 rounded-3xl border border-indigo-500/20 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Current GPA</div>
                    <div className="text-4xl font-bold text-white">3.85</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Rank</div>
                    <div className="text-xl font-bold text-white">#5 / 120</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Subject Grades</h4>
                  {[
                    { subject: 'Physics', grade: 'A', score: '92' },
                    { subject: 'Advanced Math', grade: 'A', score: '95' },
                    { subject: 'English', grade: 'B+', score: '88' },
                    { subject: 'Computer Science', grade: 'A', score: '98' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div className="text-white font-bold">{item.subject}</div>
                      <div className="flex items-center gap-4">
                        <div className="text-xs text-white/40">Score: {item.score}</div>
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold">{item.grade}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download Report Card
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 12. Leave Request Modal */}
        <AnimatePresence>
          {isLeaveRequestOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CalendarCheck className="w-6 h-6 text-rose-400" /> Leave Request</h3>
                <button onClick={() => setIsLeaveRequestOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest">Leave Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Sick Leave', 'Personal Leave'].map(t => (
                        <button key={t} className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] text-white font-bold hover:bg-rose-500 transition-all">{t}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 uppercase tracking-widest">Start Date</label>
                      <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 uppercase tracking-widest">End Date</label>
                      <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest">Reason</label>
                    <textarea placeholder="Please provide a reason..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs h-24 focus:outline-none resize-none" />
                  </div>
                  <button className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold uppercase tracking-widest">Submit Request</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 13. Focus Mode Modal */}
        <AnimatePresence>
          {isFocusModeOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col items-center justify-center">
              <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Timer className="w-6 h-6 text-indigo-400" /> Focus Mode</h3>
                <button onClick={() => setIsFocusModeOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              
              <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                  <motion.circle 
                    cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    className="text-indigo-500"
                    strokeDasharray="754"
                    animate={{ strokeDashoffset: 754 * (1 - focusTime / (25 * 60)) }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-white tabular-nums">
                    {Math.floor(focusTime / 60)}:{String(focusTime % 60).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mt-2">Pomodoro</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsFocusActive(!isFocusActive)}
                  className={`w-40 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all ${isFocusActive ? 'bg-rose-500/20 border border-rose-500/30 text-rose-400' : 'bg-indigo-500 text-white'}`}
                >
                  {isFocusActive ? 'Pause' : 'Start Focus'}
                </button>
                <button 
                  onClick={() => { setFocusTime(25 * 60); setIsFocusActive(false); }}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-xs">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl font-bold text-white">4</div>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest">Sessions Today</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl font-bold text-white">100m</div>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest">Total Focused</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 14. Classroom Modal */}
        <AnimatePresence>
          {isClassroomOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Book className="w-6 h-6 text-emerald-400" /> Classroom Hub</h3>
                <button onClick={() => setIsClassroomOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                <div className="bg-emerald-500/10 p-6 rounded-3xl border border-emerald-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-bold">Live Now</h4>
                    <span className="bg-rose-500 text-white text-[8px] font-bold px-2 py-1 rounded uppercase animate-pulse">Live</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Play className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Advanced Physics</div>
                      <div className="text-xs text-white/60">Dr. Sarah • 08:30 - 10:00</div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Join Session</button>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Recorded Lessons</h4>
                  {[
                    { title: 'Quantum Mechanics Intro', date: 'Mar 5', duration: '45m' },
                    { title: 'Thermodynamics Part 2', date: 'Mar 3', duration: '52m' }
                  ].map((lesson, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                          <Video className="w-5 h-5 text-white/40" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">{lesson.title}</div>
                          <div className="text-[10px] text-white/40 uppercase">{lesson.date} • {lesson.duration}</div>
                        </div>
                      </div>
                      <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 15. Education Clinic Modal */}
        <AnimatePresence>
          {isClinicOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Stethoscope className="w-6 h-6 text-rose-400" /> Education Clinic</h3>
                <button onClick={() => setIsClinicOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                <div className="bg-rose-500/10 p-6 rounded-3xl border border-rose-500/20">
                  <h4 className="text-white font-bold mb-2">Diagnostic Tools</h4>
                  <p className="text-xs text-white/60 mb-4">Identify learning gaps with our AI-powered diagnostic assessments.</p>
                  <button className="w-full py-3 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase">Start Diagnosis</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
                    <HeartPulse className="w-6 h-6 text-rose-400" />
                    <span className="text-[10px] font-bold text-white/60 uppercase">Mental Health</span>
                  </button>
                  <button className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
                    <UserPlus className="w-6 h-6 text-blue-400" />
                    <span className="text-[10px] font-bold text-white/60 uppercase">Book Mentor</span>
                  </button>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <h4 className="text-white font-bold mb-4">Personalized Plan</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      Focus on: Vector Calculus
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      Next session: Tomorrow 4 PM
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 16. Student Pay Modal */}
        <AnimatePresence>
          {isPayOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CreditCard className="w-6 h-6 text-blue-400" /> Student Pay</h3>
                <button onClick={() => setIsPayOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[2rem] shadow-2xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-20">
                  <CreditCard className="w-24 h-24 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Available Balance</div>
                  <div className="text-4xl font-bold text-white mb-8">฿ 1,240.00</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[8px] text-white/40 uppercase tracking-widest">Student ID</div>
                      <div className="text-sm font-mono text-white">STU-2026-0892</div>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-md">Active</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 overflow-y-auto scrollbar-hide">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Recent Transactions</h4>
                {[
                  { title: 'School Cafeteria', amount: '-฿ 45.00', date: 'Today, 12:30 PM' },
                  { title: 'Library Print', amount: '-฿ 5.00', date: 'Today, 10:15 AM' },
                  { title: 'Top Up (Parent)', amount: '+฿ 500.00', date: 'Yesterday' }
                ].map((tx, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold text-sm">{tx.title}</div>
                      <div className="text-[10px] text-white/40">{tx.date}</div>
                    </div>
                    <div className={`font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>{tx.amount}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals for each App Icon */}
        
        {/* 2. AI Intelligence Modal */}
        <AnimatePresence>
          {isAIOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-purple-400" /> Cognitive AI Core
                </h3>
                <button onClick={() => setIsAIOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pb-12">
                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-bold">Dynamic Curriculum</h4>
                    <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Adaptive Learning</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Current Adjustment</div>
                      <div className="text-white text-sm">Physics: Content switched to "Visual Simulation" based on your 95% engagement in 3D labs.</div>
                    </div>
                    <div className="bg-rose-500/10 rounded-xl p-4 border border-rose-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart3 className="w-3 h-3 text-rose-400" />
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Predictive Analytics</span>
                      </div>
                      <p className="text-xs text-white/60">Potential friction detected in "Quantum Entanglement". Suggested: 5m Interactive Diagram.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest opacity-40">Personalized Recommendations</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
                      <Play className="w-6 h-6 text-indigo-400" />
                      <span className="text-[10px] font-bold text-white/60 uppercase">Video Lesson</span>
                    </button>
                    <button className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
                      <Box className="w-6 h-6 text-amber-400" />
                      <span className="text-[10px] font-bold text-white/60 uppercase">3D Model</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Achievements Modal */}
        <AnimatePresence>
          {isAchievementsOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Award className="w-6 h-6 text-amber-400" /> Achievements
                </h3>
                <button onClick={() => setIsAchievementsOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pb-12">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest opacity-40">Blockchain Credentials</h4>
                    <button className="text-emerald-400 text-[10px] font-bold uppercase">Skill Passport</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Python Expert', icon: Award, color: 'from-emerald-500 to-teal-600' },
                      { label: 'Critical Thinker', icon: Brain, color: 'from-blue-500 to-indigo-600' },
                      { label: 'Research Lead', icon: Microscope, color: 'from-amber-500 to-orange-600' }
                    ].map((badge, i) => (
                      <div key={i} className={`p-4 rounded-2xl bg-gradient-to-br ${badge.color} flex flex-col items-center gap-2 shadow-lg`}>
                        <badge.icon className="w-8 h-8 text-white" />
                        <span className="text-[9px] font-bold text-white text-center uppercase tracking-wider">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                  <h4 className="text-white font-bold mb-2">Skill Passport</h4>
                  <p className="text-xs text-white/60 leading-relaxed mb-4">Your verified skills are secured on the blockchain, ready to be shared with universities and employers.</p>
                  <button className="w-full py-3 bg-white/10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                    <Share2 className="w-4 h-4" /> Generate AI Portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Classroom Modal */}
        <AnimatePresence>
          {isClassroomOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Book className="w-6 h-6 text-emerald-400" /> Classroom Hub
                </h3>
                <button onClick={() => setIsClassroomOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pb-12">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Featured Assessment</div>
                    <div className="text-lg font-bold text-white">PISA Real-world Skills</div>
                    <div className="text-xs text-white/60">Measure problem-solving abilities</div>
                  </div>
                  <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase">Start Test</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsFocusModeOpen(true)}
                    className="bg-indigo-500/20 border border-indigo-500/30 p-6 rounded-3xl flex flex-col gap-3 hover:bg-indigo-500/30 transition-all text-left col-span-2"
                  >
                    <Timer className="w-8 h-8 text-indigo-400" />
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm font-bold text-white">Focus Mode</div>
                        <div className="text-[10px] text-white/40 uppercase tracking-widest">โหมดสมาธิ (Pomodoro)</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/20" />
                    </div>
                  </button>
                  <button className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-3 hover:bg-white/10 transition-all text-left">
                    <Library className="w-8 h-8 text-blue-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Past Exams</div>
                      <div className="text-[10px] text-white/40">คลังข้อสอบเก่า</div>
                    </div>
                  </button>
                  <button className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-3 hover:bg-white/10 transition-all text-left">
                    <BookOpen className="w-8 h-8 text-emerald-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Digital Books</div>
                      <div className="text-[10px] text-white/40">หนังสือเรียน</div>
                    </div>
                  </button>
                  <button className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-3 hover:bg-white/10 transition-all text-left col-span-2">
                    <Monitor className="w-8 h-8 text-purple-400" />
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm font-bold text-white">Recorded Lessons</div>
                        <div className="text-[10px] text-white/40">การเรียนการสอนย้อนหลัง</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/20" />
                    </div>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Clinic Modal */}
        <AnimatePresence>
          {isClinicOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-rose-400" /> Education Clinic
                </h3>
                <button onClick={() => setIsClinicOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide pb-12">
                <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-3xl">
                  <div className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Clinic Status</div>
                  <div className="text-lg font-bold text-white">Open Now</div>
                  <div className="text-xs text-white/60">Professional support available 24/7</div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center">
                        <Target className="w-7 h-7 text-rose-400" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">Personal IEP Plan</div>
                        <div className="text-xs text-white/40">Diagnostic & Personalized Learning</div>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/20" />
                  </button>

                  <button className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                        <HeartPulse className="w-7 h-7 text-indigo-400" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">Mental Health Support</div>
                        <div className="text-xs text-white/40">Holistic & Anonymous Counseling</div>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/20" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* 7. Student Pay Modal */}
        <AnimatePresence>
          {isPayOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-blue-400" /> Student Pay
                </h3>
                <button onClick={() => setIsPayOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pb-12">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20">
                    <CreditCard className="w-16 h-16 text-white" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Available Balance</div>
                    <div className="text-3xl font-bold text-white mb-6">฿ 2,450.00</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Student ID</div>
                        <div className="text-white font-mono">42-ALEX-UNIV</div>
                      </div>
                      <div className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">Active</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
                    <Zap className="w-6 h-6 text-amber-400" />
                    <span className="text-[10px] font-bold text-white/60 uppercase">Top Up</span>
                  </button>
                  <button className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2">
                    <Search className="w-6 h-6 text-blue-400" />
                    <span className="text-[10px] font-bold text-white/60 uppercase">History</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest opacity-40">Recent Transactions</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'School Cafeteria', amount: '- ฿ 45.00', date: 'Today, 12:30' },
                      { title: 'Library Fee', amount: '- ฿ 20.00', date: 'Yesterday' },
                      { title: 'Top Up (Mobile)', amount: '+ ฿ 500.00', date: '2 days ago' }
                    ].map((tx, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center">
                        <div>
                          <div className="text-white font-bold text-sm">{tx.title}</div>
                          <div className="text-[10px] text-white/40">{tx.date}</div>
                        </div>
                        <div className={`font-bold text-sm ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>{tx.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 8. Academic Grades Modal */}
        <AnimatePresence>
          {isGradesOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-indigo-400" /> Academic Grades
                </h3>
                <button onClick={() => setIsGradesOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pb-12">
                <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-3xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Cumulative GPA</div>
                    <div className="text-3xl font-bold text-white">3.85</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Rank</div>
                    <div className="text-xl font-bold text-white">#12 / 450</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { grade: 'Grade 12', term: 'Term 1', gpa: '3.92', subjects: [
                      { name: 'Physics', grade: 'A', score: '92' },
                      { name: 'Advanced Math', grade: 'A', score: '95' },
                      { name: 'English', grade: 'B+', score: '88' }
                    ]},
                    { grade: 'Grade 11', term: 'Term 2', gpa: '3.78', subjects: [
                      { name: 'Chemistry', grade: 'A', score: '90' },
                      { name: 'Biology', grade: 'A-', score: '86' }
                    ]}
                  ].map((level, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest opacity-40">{level.grade} • {level.term}</h4>
                        <span className="text-indigo-400 font-bold text-sm">GPA {level.gpa}</span>
                      </div>
                      <div className="space-y-2">
                        {level.subjects.map((s, j) => (
                          <div key={j} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center">
                            <div className="text-white font-medium text-sm">{s.name}</div>
                            <div className="flex items-center gap-4">
                              <span className="text-white/40 text-[10px] font-bold">{s.score}/100</span>
                              <span className="text-indigo-400 font-bold text-sm">{s.grade}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* 9. Leave Request Modal */}
        <AnimatePresence>
          {isLeaveRequestOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <CalendarCheck className="w-6 h-6 text-amber-400" /> Leave Request
                </h3>
                <button onClick={() => setIsLeaveRequestOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pb-12">
                <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl">
                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">Information</div>
                  <div className="text-sm text-white/60">Please submit your leave request at least 24 hours in advance if possible.</div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 uppercase tracking-widest">Leave Type</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50">
                        <option className="bg-[#0A0A0A]">Sick Leave (ลาป่วย)</option>
                        <option className="bg-[#0A0A0A]">Personal Leave (ลากิจ)</option>
                        <option className="bg-[#0A0A0A]">Other (อื่นๆ)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">Start Date</label>
                        <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">Start Time</label>
                        <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">End Date</label>
                        <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest">End Time</label>
                        <input type="time" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 uppercase tracking-widest">Reason for Leave</label>
                      <textarea 
                        placeholder="Please provide a detailed reason..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm h-32 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={() => {
                          alert("Leave request submitted successfully!");
                          setIsLeaveRequestOpen(false);
                        }}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
                      >
                        Submit Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* 10. Focus Mode Modal */}
        <AnimatePresence>
          {isFocusModeOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[60] bg-[#0A0A0A] p-8 flex flex-col items-center justify-center text-center"
            >
              <button 
                onClick={() => setIsFocusModeOpen(false)}
                className="absolute top-8 right-8 p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>

              <div className="space-y-12 w-full max-w-xs">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Timer className={`w-10 h-10 text-indigo-400 ${isFocusActive ? 'animate-pulse' : ''}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Focus Session</h3>
                  <p className="text-white/40 text-sm">Stay concentrated and avoid distractions.</p>
                </div>

                <div className="relative">
                  <div className="text-7xl font-bold text-white font-mono tracking-tighter">
                    {formatTime(focusTime)}
                  </div>
                  <div className="absolute -inset-8 bg-indigo-500/10 blur-3xl rounded-full -z-10" />
                </div>

                <div className="flex items-center justify-center gap-6">
                  <button 
                    onClick={() => {
                      setFocusTime(25 * 60);
                      setIsFocusActive(false);
                    }}
                    className="p-4 bg-white/5 rounded-2xl text-white/60 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setIsFocusActive(!isFocusActive)}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${isFocusActive ? 'bg-rose-500 shadow-rose-500/20' : 'bg-indigo-500 shadow-indigo-500/20'}`}
                  >
                    {isFocusActive ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                  </button>
                  <div className="w-14" /> {/* Spacer for symmetry */}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[15, 25, 45].map((mins) => (
                    <button 
                      key={mins}
                      onClick={() => {
                        setFocusTime(mins * 60);
                        setIsFocusActive(false);
                      }}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all ${focusTime === mins * 60 ? 'bg-indigo-500 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-white/40'}`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Bottom Nav */}
      <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center justify-around px-4 shadow-2xl">
        <button className="p-2 text-rose-400"><Monitor className="w-6 h-6" /></button>
        <button className="p-2 text-white/40"><Search className="w-6 h-6" /></button>
        <div className="w-12 h-12 bg-gradient-to-tr from-rose-500 to-indigo-500 rounded-full flex items-center justify-center -translate-y-6 shadow-xl border-4 border-[#0A0A0A]">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <button 
          onClick={() => setIsCalendarOpen(true)}
          className="p-2 text-white/40 hover:text-white transition-colors"
        >
          <Calendar className="w-6 h-6" />
        </button>
        <button className="p-2 text-white/40"><User className="w-6 h-6" /></button>
      </div>

      <AnimatePresence>
        {isCalendarOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0A] p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Calendar className="w-6 h-6 text-amber-400" /> School Calendar
              </h3>
              <button 
                onClick={() => setIsCalendarOpen(false)}
                className="p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-bold text-white">March 2026</span>
                  <div className="flex gap-2">
                    <button className="p-1 text-white/40 hover:text-white"><ChevronRight className="w-5 h-5 rotate-180" /></button>
                    <button className="p-1 text-white/40 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-white/20">{d}</div>
                  ))}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square flex items-center justify-center text-xs rounded-lg ${i + 1 === 7 ? 'bg-amber-500 text-white font-bold' : 'text-white/60 hover:bg-white/5'}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest opacity-40">Upcoming Events</h4>
                {[
                  { date: 'Mar 12', title: 'Science Fair 2026', type: 'Event', color: 'bg-blue-500' },
                  { date: 'Mar 15', title: 'Midterm Break', type: 'Holiday', color: 'bg-rose-500' },
                  { date: 'Mar 20', title: 'AI Workshop', type: 'Academic', color: 'bg-emerald-500' }
                ].map((event, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                    <div className={`w-12 h-12 ${event.color}/20 rounded-xl flex flex-col items-center justify-center border border-${event.color}/30`}>
                      <span className="text-[10px] font-bold text-white/60 uppercase">{event.date.split(' ')[0]}</span>
                      <span className="text-sm font-bold text-white">{event.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{event.title}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest">{event.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ParentDashboard = ({ onLogout }: { onLogout: () => void; key?: string }) => {
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isHomeworkOpen, setIsHomeworkOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isConductOpen, setIsConductOpen] = useState(false);
  const [isGradesOpen, setIsGradesOpen] = useState(false);
  const [isHealthOpen, setIsHealthOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isSDQOpen, setIsSDQOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isGuardiansOpen, setIsGuardiansOpen] = useState(false);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isCollaborativeOpen, setIsCollaborativeOpen] = useState(false);
  const [isClinicOpen, setIsClinicOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col relative overflow-hidden"
    >
      {/* Header */}
      <div className="p-8 pt-12 flex flex-col gap-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-teal-500 p-0.5">
              <img 
                src="https://picsum.photos/seed/parent/100/100" 
                alt="Parent Avatar" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Sarah Universe</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest">Parent of Alex • Grade 12-A</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-24">
        
        {/* Quick Status Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-400" /> Student Status
            </h3>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Live Updates</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-teal-500/10 p-4 rounded-2xl border border-teal-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Arrival</span>
              </div>
              <div className="text-xl font-bold text-white">07:45 AM</div>
              <div className="text-[10px] text-teal-400 font-bold uppercase mt-1">On Time</div>
            </div>
            <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Homework</span>
              </div>
              <div className="text-xl font-bold text-white">2 Pending</div>
              <div className="text-[10px] text-amber-400 font-bold uppercase mt-1">Due Tomorrow</div>
            </div>
          </div>
        </div>

        {/* Icon Grid - Similar to Student but with Parent features */}
        <div className="grid grid-cols-3 gap-y-8 gap-x-4">
          
          {/* Notifications & Tracking */}
          <FeatureItem icon={Clock} label="Attendance" color="bg-teal-500" onClick={() => setIsAttendanceOpen(true)} />
          <FeatureItem icon={BookOpen} label="Homework" color="bg-amber-500" onClick={() => setIsHomeworkOpen(true)} />
          <FeatureItem icon={Bell} label="School News" color="bg-blue-500" onClick={() => setIsNewsOpen(true)} />
          
          {/* Academic & Behavior */}
          <FeatureItem icon={ShieldCheck} label="Conduct" color="bg-emerald-500" onClick={() => setIsConductOpen(true)} />
          <FeatureItem icon={GradIcon} label="Grades" color="bg-indigo-500" onClick={() => setIsGradesOpen(true)} />
          <FeatureItem icon={HeartPulse} label="Health" color="bg-rose-500" onClick={() => setIsHealthOpen(true)} />
          
          {/* Support & Communication */}
          <FeatureItem icon={MessageCircle} label="Leave Notif" color="bg-orange-500" onClick={() => setIsLeaveOpen(true)} />
          <FeatureItem icon={ClipboardCheck} label="SDQ Assess" color="bg-purple-500" onClick={() => setIsSDQOpen(true)} />
          <FeatureItem icon={User} label="Advisor" color="bg-cyan-500" onClick={() => setIsAdvisorOpen(true)} />
          
          {/* Advanced Features */}
          <FeatureItem icon={Navigation} label="Home Loc" color="bg-sky-500" onClick={() => setIsLocationOpen(true)} />
          <FeatureItem icon={UserPlus} label="Guardians" color="bg-pink-500" onClick={() => setIsGuardiansOpen(true)} />
          <FeatureItem icon={Newspaper} label="Articles" color="bg-slate-500" onClick={() => setIsArticlesOpen(true)} />
          
          {/* Financial & Learning */}
          <FeatureItem icon={CreditCard} label="Student Pay" color="bg-blue-600" onClick={() => setIsPayOpen(true)} />
          <FeatureItem icon={Network} label="DAO/AI Net" color="bg-violet-600" onClick={() => setIsCollaborativeOpen(true)} />
          <FeatureItem icon={Microscope} label="Edu Clinic" color="bg-rose-600" onClick={() => setIsClinicOpen(true)} />

        </div>

        {/* Featured Card: AI Mentor for Parents */}
        <div className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Bot className="w-12 h-12 text-teal-500" />
          </div>
          <div className="space-y-4 relative z-10">
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">AI Parenting Assistant</div>
              <div className="text-white font-medium">Alex is excelling in Physics but needs support in Calculus.</div>
            </div>
            <button className="text-teal-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              View AI Insights <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modals for Parent Dashboard */}
        
        {/* 1. Attendance Modal */}
        <AnimatePresence>
          {isAttendanceOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Clock className="w-6 h-6 text-teal-400" /> Attendance</h3>
                <button onClick={() => setIsAttendanceOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-4 overflow-y-auto scrollbar-hide">
                {[
                  { date: 'Today', status: 'In: 07:45 AM', out: 'Out: --:--', color: 'text-teal-400' },
                  { date: 'Yesterday', status: 'In: 07:50 AM', out: 'Out: 04:30 PM', color: 'text-teal-400' },
                  { date: 'Mar 6', status: 'In: 08:10 AM', out: 'Out: 04:35 PM', color: 'text-amber-400' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold">{item.date}</div>
                      <div className="text-xs text-white/40">{item.status}</div>
                    </div>
                    <div className={`text-xs font-bold uppercase ${item.color}`}>{item.out}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Homework Modal */}
        <AnimatePresence>
          {isHomeworkOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><BookOpen className="w-6 h-6 text-amber-400" /> Homework</h3>
                <button onClick={() => setIsHomeworkOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-4 overflow-y-auto scrollbar-hide">
                {[
                  { subject: 'Advanced Math', task: 'Calculus Problem Set 4', due: 'Tomorrow', status: 'Pending' },
                  { subject: 'Physics', task: 'Lab Report: Wave Motion', due: 'Mar 12', status: 'In Progress' }
                ].map((hw, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-white font-bold">{hw.subject}</div>
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full font-bold uppercase">{hw.status}</span>
                    </div>
                    <div className="text-sm text-white/60 mb-2">{hw.task}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-widest">Due: {hw.due}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. School News Modal */}
        <AnimatePresence>
          {isNewsOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Bell className="w-6 h-6 text-blue-400" /> School News</h3>
                <button onClick={() => setIsNewsOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-4 overflow-y-auto scrollbar-hide">
                {[
                  { title: 'Annual Science Fair 2026', date: 'Mar 12', desc: 'Join us for the biggest science event of the year.' },
                  { title: 'Parent-Teacher Meeting', date: 'Mar 25', desc: 'Discuss your student\'s progress for Term 1.' }
                ].map((news, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1">{news.date}</div>
                    <div className="text-white font-bold mb-2">{news.title}</div>
                    <p className="text-xs text-white/60">{news.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Conduct Modal */}
        <AnimatePresence>
          {isConductOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><ShieldCheck className="w-6 h-6 text-emerald-400" /> Conduct Score</h3>
                <button onClick={() => setIsConductOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="bg-emerald-500/10 p-8 rounded-3xl border border-emerald-500/20 text-center mb-8">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-2">Current Score</div>
                <div className="text-6xl font-bold text-white">98</div>
                <div className="text-xs text-white/40 mt-2">Excellent Behavior</div>
              </div>
              <div className="space-y-4 overflow-y-auto scrollbar-hide">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Recent Logs</h4>
                {[
                  { action: 'Helping in Library', score: '+5', date: 'Mar 5' },
                  { action: 'Late Arrival', score: '-2', date: 'Mar 6' }
                ].map((log, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-white font-bold text-sm">{log.action}</div>
                      <div className="text-[10px] text-white/40">{log.date}</div>
                    </div>
                    <div className={`font-bold ${log.score.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{log.score}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Grades Modal */}
        <AnimatePresence>
          {isGradesOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><GradIcon className="w-6 h-6 text-indigo-400" /> Academic Results</h3>
                <button onClick={() => setIsGradesOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                <div className="bg-indigo-500/10 p-6 rounded-3xl border border-indigo-500/20 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">GPA (Term 1)</div>
                    <div className="text-3xl font-bold text-white">3.85</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Class Rank</div>
                    <div className="text-xl font-bold text-white">#12 / 45</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {['Physics: A', 'Math: A', 'English: B+', 'Chemistry: A-'].map((g, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center text-white font-bold">
                      <span>{g.split(':')[0]}</span>
                      <span className="text-indigo-400">{g.split(':')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Health Modal */}
        <AnimatePresence>
          {isHealthOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><HeartPulse className="w-6 h-6 text-rose-400" /> Health Info</h3>
                <button onClick={() => setIsHealthOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-4 h-4 text-rose-400" />
                      <span className="text-[10px] text-white/40 font-bold uppercase">Temp</span>
                    </div>
                    <div className="text-xl font-bold text-white">36.5°C</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] text-white/40 font-bold uppercase">Weight</span>
                    </div>
                    <div className="text-xl font-bold text-white">65 kg</div>
                  </div>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                  <h4 className="text-white font-bold mb-4">Medical Records</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs"><span className="text-white/40">Blood Type</span><span className="text-white font-bold">O Positive</span></div>
                    <div className="flex justify-between text-xs"><span className="text-white/40">Allergies</span><span className="text-rose-400 font-bold">Peanuts</span></div>
                    <div className="flex justify-between text-xs"><span className="text-white/40">Last Checkup</span><span className="text-white font-bold">Jan 15, 2026</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. Leave Notification Modal */}
        <AnimatePresence>
          {isLeaveOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><MessageCircle className="w-6 h-6 text-orange-400" /> Notify Leave</h3>
                <button onClick={() => setIsLeaveOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest">Leave Type</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none">
                      <option className="bg-[#0A0A0A]">Sick Leave</option>
                      <option className="bg-[#0A0A0A]">Personal Leave</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/40 uppercase tracking-widest">Reason</label>
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white h-32 focus:outline-none resize-none" placeholder="Enter reason for leave..."></textarea>
                  </div>
                  <button onClick={() => { alert("Leave notified to advisor!"); setIsLeaveOpen(false); }} className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-orange-500/20">Send to Advisor</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 8. SDQ Assessment Modal */}
        <AnimatePresence>
          {isSDQOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><ClipboardCheck className="w-6 h-6 text-purple-400" /> SDQ Assessment</h3>
                <button onClick={() => setIsSDQOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                <div className="bg-purple-500/10 p-6 rounded-3xl border border-purple-500/20">
                  <h4 className="text-white font-bold mb-2">Strengths and Difficulties Questionnaire</h4>
                  <p className="text-xs text-white/60 leading-relaxed">Please complete the assessment to help us understand Alex's emotional and behavioral well-being.</p>
                </div>
                <div className="space-y-4">
                  {[
                    "Considerate of other people's feelings",
                    "Restless, overactive, cannot stay still",
                    "Often complains of headaches, stomach-aches"
                  ].map((q, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                      <p className="text-sm text-white font-medium">{q}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {['Not True', 'Somewhat', 'Certainly'].map(opt => (
                          <button key={opt} className="py-2 bg-white/5 rounded-lg text-[10px] text-white/40 hover:bg-purple-500 hover:text-white transition-all">{opt}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 bg-purple-500 text-white rounded-2xl font-bold uppercase tracking-widest">Submit Assessment</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 9. Advisor Info Modal */}
        <AnimatePresence>
          {isAdvisorOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><User className="w-6 h-6 text-cyan-400" /> Advisor Info</h3>
                <button onClick={() => setIsAdvisorOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 rounded-3xl border-4 border-cyan-500/30 p-1">
                  <img src="https://picsum.photos/seed/teacher/200/200" alt="Advisor" className="w-full h-full rounded-2xl object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">Dr. Sarah Thompson</h4>
                  <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest">Class Advisor • Grade 12-A</p>
                </div>
                <div className="w-full space-y-3">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                    <Bell className="w-5 h-5 text-white/40" />
                    <div className="text-left">
                      <div className="text-[10px] text-white/40 uppercase font-bold">Email</div>
                      <div className="text-sm text-white">sarah.t@eduverse.ac.th</div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                    <MessageSquare className="w-5 h-5 text-white/40" />
                    <div className="text-left">
                      <div className="text-[10px] text-white/40 uppercase font-bold">Office Hours</div>
                      <div className="text-sm text-white">Mon - Fri, 04:00 PM - 05:30 PM</div>
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 bg-cyan-500 text-white rounded-2xl font-bold uppercase tracking-widest">Contact Advisor</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 10. Home Location Modal */}
        <AnimatePresence>
          {isLocationOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Navigation className="w-6 h-6 text-sky-400" /> Home Location</h3>
                <button onClick={() => setIsLocationOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="flex-1 bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPinned className="w-12 h-12 text-sky-400 animate-bounce" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-[#0A0A0A]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Current Shared Address</div>
                  <div className="text-sm text-white font-bold">123 Universe Ave, Star City</div>
                </div>
              </div>
              <button onClick={() => alert("Location shared with school!")} className="w-full py-4 bg-sky-500 text-white rounded-2xl font-bold uppercase tracking-widest">Update & Share Location</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 11. Guardians Modal */}
        <AnimatePresence>
          {isGuardiansOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><UserPlus className="w-6 h-6 text-pink-400" /> Guardians</h3>
                <button onClick={() => setIsGuardiansOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-4 overflow-y-auto scrollbar-hide">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">SU</div>
                  <div>
                    <div className="text-white font-bold">Sarah Universe (You)</div>
                    <div className="text-[10px] text-white/40 uppercase">Primary Guardian</div>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">JU</div>
                  <div>
                    <div className="text-white font-bold">John Universe</div>
                    <div className="text-[10px] text-white/40 uppercase">Secondary Guardian</div>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/40 font-bold hover:bg-white/5 transition-all">
                  <UserPlus className="w-5 h-5" /> Add New Guardian
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 12. Articles Modal */}
        <AnimatePresence>
          {isArticlesOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Newspaper className="w-6 h-6 text-slate-400" /> Parenting Hub</h3>
                <button onClick={() => setIsArticlesOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                {[
                  { title: 'Supporting Alex in STEM', category: 'Education', time: '5 min read' },
                  { title: 'Digital Well-being for Teens', category: 'Health', time: '8 min read' },
                  { title: 'Preparing for University', category: 'Guidance', time: '12 min read' }
                ].map((art, i) => (
                  <div key={i} className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                    <div className="h-32 bg-slate-800 flex items-center justify-center">
                      <Book className="w-12 h-12 text-white/10" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                        <span className="text-slate-400">{art.category}</span>
                        <span className="text-white/20">{art.time}</span>
                      </div>
                      <h4 className="text-white font-bold mb-4">{art.title}</h4>
                      <button className="text-slate-400 text-xs font-bold uppercase">Read More</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 13. Student Pay Modal (Parent View) */}
        <AnimatePresence>
          {isPayOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CreditCard className="w-6 h-6 text-blue-400" /> Student Pay</h3>
                <button onClick={() => setIsPayOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-6 rounded-[2rem] shadow-xl mb-8">
                <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Alex's Balance</div>
                <div className="text-4xl font-bold text-white mb-6">฿ 2,450.00</div>
                <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl text-white font-bold uppercase tracking-widest text-xs">Top Up Now</button>
              </div>
              <div className="space-y-4">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Spending Limits</h4>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                  <span className="text-white text-sm">Daily Limit</span>
                  <span className="text-blue-400 font-bold">฿ 200.00</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 14. Collaborative Network Modal */}
        <AnimatePresence>
          {isCollaborativeOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Network className="w-6 h-6 text-violet-400" /> Collaborative Network</h3>
                <button onClick={() => setIsCollaborativeOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide">
                <div className="bg-violet-500/10 p-6 rounded-3xl border border-violet-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-violet-400" />
                    <h4 className="text-white font-bold">DAO for Education</h4>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed mb-4">Decentralized Autonomous Organization managing curriculum with experts and learners to keep content modern.</p>
                  <button className="w-full py-3 bg-violet-500 text-white rounded-xl text-xs font-bold uppercase">Participate in DAO</button>
                </div>
                <div className="bg-indigo-500/10 p-6 rounded-3xl border border-indigo-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-white font-bold">AI Mentors</h4>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed mb-4">Personal AI advisors that interact with voice and emotion, providing 24/7 guidance for Alex.</p>
                  <button className="w-full py-3 bg-indigo-500 text-white rounded-xl text-xs font-bold uppercase">Configure AI Mentor</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 15. Education Clinic Modal */}
        <AnimatePresence>
          {isClinicOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Microscope className="w-6 h-6 text-rose-400" /> Education Clinic</h3>
                <button onClick={() => setIsClinicOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
                {/* Diagnostic & Personalized Learning */}
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-rose-400" />
                    <h4 className="text-white font-bold">Diagnostic & IEP</h4>
                  </div>
                  <p className="text-xs text-white/60">Virtual skill assessment and Individualized Education Plan (IEP) designed for Alex.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 bg-white/10 rounded-xl text-[10px] text-white font-bold uppercase">Skill Analysis</button>
                    <button className="py-2 bg-white/10 rounded-xl text-[10px] text-white font-bold uppercase">View IEP</button>
                  </div>
                </div>

                {/* Real-time Mentoring */}
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Headset className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-bold">Real-time Mentoring</h4>
                  </div>
                  <p className="text-xs text-white/60">After-hours online clinic for problem-solving and academic guidance.</p>
                  <button className="w-full py-3 bg-blue-500 text-white rounded-xl text-xs font-bold uppercase">Join Session</button>
                </div>

                {/* Holistic Support */}
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Smile className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-white font-bold">Holistic Support</h4>
                  </div>
                  <p className="text-xs text-white/60">Mental health counseling and modern skill library (Critical Thinking, Emotional Management).</p>
                  <button className="w-full py-3 bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase">Access Support</button>
                </div>

                {/* Administrative Support */}
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-amber-400" />
                    <h4 className="text-white font-bold">Appointments</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/60">Next: Advisor Meeting</span>
                    <span className="text-xs text-amber-400 font-bold">Mar 25, 04:00 PM</span>
                  </div>
                  <button className="w-full py-3 bg-amber-500 text-white rounded-xl text-xs font-bold uppercase">Book New Appointment</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center justify-around px-4 shadow-2xl">
        <button className="p-2 text-teal-400"><LayoutDashboard className="w-6 h-6" /></button>
        <button className="p-2 text-white/40"><MessageSquare className="w-6 h-6" /></button>
        <div className="w-12 h-12 bg-gradient-to-tr from-teal-500 to-cyan-500 rounded-full flex items-center justify-center -translate-y-6 shadow-xl border-4 border-[#0A0A0A]">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <button className="p-2 text-white/40"><Calendar className="w-6 h-6" /></button>
        <button className="p-2 text-white/40"><Settings className="w-6 h-6" /></button>
      </div>
    </motion.div>
  );
};

const TeacherDashboard = ({ onLogout }: { onLogout: () => void; key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col relative overflow-hidden"
    >
      {/* Header */}
      <div className="p-8 pt-12 flex flex-col gap-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-amber-500 p-0.5">
              <img 
                src="https://picsum.photos/seed/teacher/100/100" 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Prof. Orion</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest">Senior Educator • Science Dept</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-24">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">Active Classes</div>
            <div className="text-2xl font-bold text-white">4</div>
          </div>
          <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Students</div>
            <div className="text-2xl font-bold text-white">128</div>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-3 gap-y-8 gap-x-4">
          <FeatureItem icon={Clock} label="เช็คชื่อรายคาบ" color="bg-amber-500" />
          <FeatureItem icon={Navigation} label="เช็คหน้าเสาธง" color="bg-orange-500" />
          <FeatureItem icon={MapPinned} label="บันทึก เข้า-ออก" color="bg-rose-500" />
          
          <FeatureItem icon={HeartPulse} label="ดูแลช่วยเหลือ" color="bg-rose-600" />
          <FeatureItem icon={BrainCircuit} label="SDQ / EQ" color="bg-purple-500" />
          <FeatureItem icon={MessageCircle} label="สื่อสาร/การบ้าน" color="bg-blue-500" />
          
          <FeatureItem icon={CalendarCheck} label="อนุมัติลา" color="bg-indigo-500" />
          <FeatureItem icon={Sparkles} label="อนุมัติจิตอาสา" color="bg-amber-600" />
          <FeatureItem icon={ClipboardCheck} label="นิเทศการสอน" color="bg-slate-600" />
          
          <FeatureItem icon={Monitor} label="XR & Metaverse" color="bg-cyan-600" />
          <FeatureItem icon={Award} label="Blockchain" color="bg-amber-700" />
          <FeatureItem icon={Network} label="Peer Network" color="bg-violet-600" />
          
          <FeatureItem icon={Stethoscope} label="Edu Clinic" color="bg-emerald-600" />
        </div>

        {/* Featured Card */}
        <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Bot className="w-12 h-12 text-amber-500" />
          </div>
          <div className="space-y-4 relative z-10">
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">AI Teaching Assistant</div>
              <div className="text-white font-medium">3 students are struggling with "Quantum Mechanics". Suggested intervention plan ready.</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PrincipalDashboard = ({ onLogout }: { onLogout: () => void; key?: string }) => {
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col relative overflow-hidden"
    >
      {/* Header */}
      <div className="p-8 pt-12 flex flex-col gap-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-orange-500 p-0.5">
              <img 
                src="https://picsum.photos/seed/principal/100/100" 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Director Nova</h3>
              <p className="text-white/40 text-xs uppercase tracking-widest">School Principal</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-24">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20">
            <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Teacher Attendance</div>
            <div className="text-2xl font-bold text-white">98.5%</div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-2xl border border-cyan-500/20">
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Budget Status</div>
            <div className="text-2xl font-bold text-white">92% Utilized</div>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-3 gap-y-8 gap-x-4">
          <FeatureItem icon={BarChart3} label="Statistics" color="bg-orange-500" />
          <FeatureItem icon={Users} label="Personnel" color="bg-amber-500" />
          <FeatureItem icon={ClipboardCheck} label="นิเทศการสอน" color="bg-slate-600" />
          
          <FeatureItem icon={Cpu} label="AI Analytics" color="bg-indigo-500" />
          <FeatureItem icon={CreditCard} label="Financial" color="bg-blue-600" onClick={() => setIsFinancialOpen(true)} />
          <FeatureItem icon={ShieldCheck} label="Policy Track" color="bg-teal-500" />
          
          <FeatureItem icon={Monitor} label="XR & Metaverse" color="bg-cyan-600" />
          <FeatureItem icon={Award} label="Blockchain" color="bg-amber-700" />
          <FeatureItem icon={Network} label="Peer Network" color="bg-violet-600" />
          
          <FeatureItem icon={Stethoscope} label="Edu Clinic" color="bg-emerald-600" />
        </div>

        {/* Featured Card */}
        <div className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Activity className="w-12 h-12 text-orange-500" />
          </div>
          <div className="space-y-4 relative z-10">
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Director Insights</div>
              <div className="text-white font-medium">Overall school attendance is up 12% compared to last semester.</div>
            </div>
          </div>
        </div>

        {/* Financial Modal */}
        <AnimatePresence>
          {isFinancialOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CreditCard className="w-6 h-6 text-blue-400" /> School Financials</h3>
                <button onClick={() => setIsFinancialOpen(false)} className="p-2 bg-white/5 rounded-full"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
              <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20">
                    <BarChart3 className="w-24 h-24 text-white" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Total Annual Budget</div>
                    <div className="text-4xl font-bold text-white mb-8">฿ 12,450,000</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[8px] text-white/40 uppercase tracking-widest">Fiscal Year</div>
                        <div className="text-sm font-mono text-white">2026-2027</div>
                      </div>
                      <div className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-md">On Track</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Revenue</div>
                    <div className="text-xl font-bold text-emerald-400">฿ 8.2M</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Expenses</div>
                    <div className="text-xl font-bold text-rose-400">฿ 4.1M</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Budget Allocation</h4>
                  {[
                    { title: 'Academic Programs', amount: '฿ 4.5M', percent: '36%' },
                    { title: 'Infrastructure', amount: '฿ 3.2M', percent: '25%' },
                    { title: 'Personnel', amount: '฿ 2.8M', percent: '22%' },
                    { title: 'Technology', amount: '฿ 1.95M', percent: '17%' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-white font-bold text-sm">{item.title}</div>
                        <div className="text-xs text-white/60">{item.amount}</div>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: item.percent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const LoginScreen = ({ role, onBack, onLogin }: { role: string; onBack: () => void; onLogin: (subRole?: string) => void; key?: string }) => {
  const [subRole, setSubRole] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getRoleColor = () => {
    if (role === "Student") return "from-rose-400 to-pink-600";
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
        className="absolute top-12 left-8 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-50"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <div className="mt-12 mb-10">
        <div className={`w-14 h-14 bg-gradient-to-tr ${getRoleColor()} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
          {role === "Student" && <GraduationCap className="w-8 h-8 text-white" />}
          {role === "Parent" && <Users className="w-8 h-8 text-white" />}
          {isTeacherPrincipal && <School className="w-8 h-8 text-white" />}
        </div>
        <h1 className="text-4xl font-serif font-bold text-white mb-2">
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
            className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-xl font-bold text-white">Teacher</span>
            </div>
            <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" />
          </button>
          <button 
            onClick={() => setSubRole("Principal")}
            className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xl font-bold text-white">Principal</span>
            </div>
            <ChevronRight className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white/30 group-focus-within:text-white/60 transition-colors" />
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
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/30 group-focus-within:text-white/60 transition-colors" />
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
            <button className="text-white/40 text-sm hover:text-white/60 transition-colors">Forgot Password?</button>
          </div>

          <button 
            onClick={() => onLogin(subRole || undefined)}
            className={`w-full py-4 rounded-2xl bg-gradient-to-r ${getRoleColor()} text-white font-bold text-lg shadow-xl shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4`}
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

          <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all">
            Create Account
          </button>
        </div>
      )}

      <p className="mt-auto text-center text-white/20 text-xs tracking-widest uppercase pb-4">
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
    <div className="min-h-screen universe-bg flex items-center justify-center p-4 font-sans selection:bg-rose-500/30">
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
              <StudentDashboard key="student-dashboard" onLogout={handleLogout} />
            ) : userRole === "Parent" ? (
              <ParentDashboard key="parent-dashboard" onLogout={handleLogout} />
            ) : userRole === "Teacher" ? (
              <TeacherDashboard key="teacher-dashboard" onLogout={handleLogout} />
            ) : (
              <PrincipalDashboard key="principal-dashboard" onLogout={handleLogout} />
            )
          ) : !selectedRole ? (
            <motion.div 
              key="role-selection"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex-1 flex flex-col p-8 pt-16 overflow-y-auto scrollbar-hide relative"
            >
              {/* Header */}
              <header className="mb-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display font-bold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
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
              <div className="mt-auto pt-12 text-center">
                <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
                  Explore the universe of knowledge
                </p>
              </div>
            </motion.div>
          ) : (
            <LoginScreen 
              key="login-screen"
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
