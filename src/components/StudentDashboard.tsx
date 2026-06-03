import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, GraduationCap, Clock, Navigation, MapPinned, 
  MessageSquare, Settings, Sparkles, Book, Newspaper, CreditCard, 
  Network, Microscope, Target, Headset, Smile, CalendarCheck, 
  LayoutDashboard, HeartPulse, BrainCircuit, MessageCircle, 
  ClipboardCheck, Monitor, Award, Stethoscope, Activity, Cpu, 
  ShieldCheck, BarChart3, Plus, Check, Play, Pause, Coins, Flame,
  FileText, Download, Send, RefreshCw, Calendar, Volume2, HelpCircle, User, BookOpen, Share2, Video, ChevronRight
} from 'lucide-react';
import { 
  RESEARCH_PAPERS, LIBRARY_BOOKS, HOMEWORK_LIST, DAO_PROPOSALS,
  ResearchPaper, LibraryBook, Homework 
} from '../data';

// Custom Feature Item sub-component
const FeatureItem = ({ icon: Icon, label, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group active:scale-95"
  >
    <div className={`p-3 rounded-xl ${color} mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-[11px] font-medium text-white/80 text-center tracking-tight leading-tight line-clamp-2">
      {label}
    </span>
  </button>
);

export default function StudentDashboard({ onLogout }: { onLogout: () => void }) {
  // Navigation modals state
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isOffsiteOpen, setIsOffsiteOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGradesOpen, setIsGradesOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isConductOpen, setIsConductOpen] = useState(false);
  const [isLeaveRequestOpen, setIsLeaveRequestOpen] = useState(false);
  const [isClassroomOpen, setIsClassroomOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isBlockchainOpen, setIsBlockchainOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isClinicOpen, setIsClinicOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);

  // New interactive sub-menu states
  const [gradeTermSelect, setGradeTermSelect] = useState("2568-t2");
  const [librarySubjectFilter, setLibrarySubjectFilter] = useState("All");
  const [assessmentTab, setAssessmentTab] = useState<'sdq' | 'eq'>('sdq');
  const [classroomSection, setClassroomSection] = useState<'home' | 'hologram' | 'hands-on' | 'vr-ar' | 'pisa' | 'old-exams' | 'textbooks' | 'replays'>('home');
  const [certificateClaimed, setCertificateClaimed] = useState(false);
  
  // Custom states for blockchain tabs and visual structure explorer
  const [blockchainTab, setBlockchainTab] = useState<'credentials' | 'passport' | 'l2e'>('credentials');
  const [activeStructure, setActiveStructure] = useState<'blockchain' | 'binary-tree' | 'hash-map'>('blockchain');
  const [portfolioTheme, setPortfolioTheme] = useState<'cyber' | 'academic' | 'classic'>('cyber');
  const [generatedPortfolio, setGeneratedPortfolio] = useState<string | null>(null);
  const [isGeneratingPortfolio, setIsGeneratingPortfolio] = useState(false);
  const [txVerifyInput, setTxVerifyInput] = useState("tx_0x9a8f4c2e1b3d57a9");
  const [txVerifyResult, setTxVerifyResult] = useState<string | null>(null);
  const [isVerifyingTx, setIsVerifyingTx] = useState(false);
  
  // Hands On Classroom Simulation factors
  const [simMass, setSimMass] = useState(5);
  const [simForce, setSimForce] = useState(50);
  const [simFriction, setSimFriction] = useState(0.2);
  const [isSimulating, setIsSimulating] = useState(false);

  // VR AR Classroom rendering parameters
  const [arAnchorActive, setArAnchorActive] = useState(true);
  const [arZoom, setArZoom] = useState(1.0);
  const [arRotation, setArRotation] = useState(0);

  // Categorized classroom filters
  const [examSubjectFilter, setExamSubjectFilter] = useState("All");
  const [textbookSubjectFilter, setTextbookSubjectFilter] = useState("All");
  
  // Emotional AI Mentor States
  const [mentorType, setMentorType] = useState<"sarah" | "orion" | "curie">("sarah");
  const [mentorVibe, setMentorVibe] = useState<'caring' | 'cheerful' | 'analytic'>('caring');
  const [mentorResponse, setMentorResponse] = useState("Hi Alex, I am Dr. Sarah. Tell me what is on your mind today, and let me guide you through dynamic wave calculations.");
  const [mentorRecording, setMentorRecording] = useState(false);

  // Clinic consultation booking parameters
  const [clinicTeacher, setClinicTeacher] = useState("Prof. Orion Reynolds");
  const [clinicTime, setClinicTime] = useState("16:30 PM");
  const [clinicTopic, setClinicTopic] = useState("ฟิสิกส์คลื่นและการเคลื่อนที่สั่นพ้อง");
  const [clinicBookings, setClinicBookings] = useState<Array<{ id: string; teacher: string; time: string; topic: string; date: string; status: string }>>([
    { id: "cb-1", teacher: "Prof. Orion Reynolds", time: "16:30 PM", topic: "ทบทวนสูตรสนามแม่เหล็กไฟฟ้า", date: "พฤหัสบดีนี้", status: "Confirm" }
  ]);

  // Automated notification list (รับแจ้งเตือนเวลามาเรียนและสถิติ)
  const [autoNotifications] = useState<Array<{ title: string; desc: string; time: string; icon: string }>>([
    { title: "เวลามาเรียนวันนี้ (Arrival checked)", desc: "แสกน RFID ประตูทางเข้า #2 และวัดอุณหภูมิร่างกาย 36.5°C สำเร็จ", time: "07:44 AM", icon: "Check" },
    { title: "แจ้งเช็คเอาต์วิถีถิ่น (Dismissal check-out)", desc: "เช็คเอ้าต์โรงเรียนสําเร็จ - ลากลับสายรถบัสตึกกากบาทเหล็ก", time: "16:30 PM", icon: "Clock" },
    { title: "รายงานการลาเรียน (Absence recorded)", desc: "ระบบอนุมัติใบลาป่วยเนื่องจากไข้หวัดใหญ่ (May 28, 2026)", time: "08:00 AM", icon: "Calendar" }
  ]);

  // Interactive PISA test centre states
  const [pisaQuizIdx, setPisaQuizIdx] = useState(0);
  const [pisaUserAns, setPisaUserAns] = useState<number | null>(null);
  const [pisaScore, setPisaScore] = useState(0);
  const [pisaStatus, setPisaStatus] = useState<'not-started' | 'active' | 'finished'>('not-started');

  // Gamified elements state
  const [coins, setCoins] = useState(350);
  const [boughtItems, setBoughtItems] = useState<string[]>([]);
  const [questStatus, setQuestStatus] = useState<Record<string, boolean>>({
    focus: false,
    sdq: false
  });

  // Focus Mode State
  const [focusTime, setFocusTime] = useState(1500); // 25 mins
  const [focusActive, setFocusActive] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [binauralSound, setBinauralSound] = useState('Off');

  useEffect(() => {
    let interval: any;
    if (focusActive && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime(prev => prev - 1);
      }, 1000);
    } else if (focusTime === 0 && focusActive) {
      setFocusActive(false);
      setCoins(curr => curr + 50);
      setQuestStatus(curr => ({ ...curr, focus: true }));
      alert("🎉 Congratulation! Focus session complete! You earned +50 Education Coins.");
    }
    return () => clearInterval(interval);
  }, [focusActive, focusTime]);

  const changeFocusDuration = (mins: number) => {
    setFocusDuration(mins);
    setFocusTime(mins * 60);
    setFocusActive(false);
  };

  // Chat Interactive State
  const [chatChannel, setChatChannel] = useState<'advisor' | 'classroom'>('advisor');
  const [chatMessage, setChatMessage] = useState("");
  const [advisorMessages, setAdvisorMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Dr. Sarah', text: 'Hi Alex, I checked your quantum physics report. It was outstanding! 10/10.', time: '09:00 AM' },
    { sender: 'You', text: 'Thank you doctor! Do you have any suggestions on the wave analysis?', time: '09:05 AM' },
    { sender: 'Dr. Sarah', text: 'Yes, check out the library simulation we uploaded inside Classroom. Talk to you soon!', time: '09:06 AM' }
  ]);
  const [classroomMessages, setClassroomMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Taylor Sparks', text: 'Hey guys, did you complete calculus homework due tomorrow?', time: 'Yesterday' },
    { sender: 'Jordan Comet', text: 'Working on it now, limits are so tricky...', time: 'Yesterday' }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (chatChannel === 'advisor') {
      const updated = [...advisorMessages, { sender: 'You', text: chatMessage, time: now }];
      setAdvisorMessages(updated);
      setChatMessage("");
      setTimeout(() => {
        setAdvisorMessages(prev => [
          ...prev, 
          { sender: 'Dr. Sarah', text: 'I am online now! I have registered your inquiry, let us discuss this during tutoring clinic.', time: 'Just now' }
        ]);
      }, 1200);
    } else {
      setClassroomMessages(prev => [...prev, { sender: 'You', text: chatMessage, time: now }]);
      setChatMessage("");
      setTimeout(() => {
        setClassroomMessages(prev => [
          ...prev, 
          { sender: 'Taylor Sparks', text: 'Yeah, Alex! Please share your Git repository later if you finish the simulation!', time: 'Just now' }
        ]);
      }, 1500);
    }
  };

  // Semantic Search Research State
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>(RESEARCH_PAPERS);
  const [searchFeedback, setSearchFeedback] = useState("");

  const handleSemanticSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredPapers(RESEARCH_PAPERS);
      setSearchFeedback("");
      return;
    }
    const q = searchQuery.toLowerCase();
    
    // Fuzzy matching and semantic categorization
    let results = RESEARCH_PAPERS.filter(p => {
      // Direct matches
      const directMatch = p.title.toLowerCase().includes(q) || 
                          p.abstract.toLowerCase().includes(q) || 
                          p.tags.some(t => t.toLowerCase().includes(q));
      
      // Conceptual / semantic synonyms (e.g. searching "global warming" returns "climate change" papers too)
      const climateSynonym = (q.includes("warming") || q.includes("greenhouse") || q.includes("eco")) && 
                            p.tags.some(t => t.includes("Climate Change"));
      const quantumSynonym = (q.includes("silicon") || q.includes("computer") || q.includes("qubit")) && 
                            p.tags.some(t => t.includes("Quantum"));
      
      return directMatch || climateSynonym || quantumSynonym;
    });

    setFilteredPapers(results);
    setSearchFeedback(`Semantic search: matched ${results.length} database entries for "${searchQuery}"`);
  };

  // Adaptive Learning - Cognitive AI State
  const [aiMathDifficulty, setAiMathDifficulty] = useState(3); // 1-5
  const [aiCsPace, setAiCsPace] = useState(4); // 1-5
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([
    "Calculus Integration under High Speed Constraints",
    "PISA Analytical geometry simulations",
    "Self-balanced binary tree implementations"
  ]);

  const handleTweakAIParts = (mathVal: number, csVal: number) => {
    setAiMathDifficulty(mathVal);
    setAiCsPace(csVal);
    let rems: string[] = [];
    if (mathVal > 3) {
      rems.push("Advanced Laplace transforms & boundary value integrals");
    } else {
      rems.push("Basic trigonometric coordinate functions & derivative rules");
    }
    if (csVal > 3) {
      rems.push("High-frequency algorithmic complexity with O(log N) operations");
    } else {
      rems.push("Visual programming layouts and loop parameters");
    }
    rems.push("Personalized SDQ Focus booster strategy");
    setAiRecommendations(rems);
  };

  // SDQ and EQ state
  const [sdqAnswers, setSdqAnswers] = useState<Record<number, number>>({});
  const [eqAnswers, setEqAnswers] = useState<Record<number, number>>({});
  const [sdqResult, setSdqResult] = useState<string | null>(null);

  const handleSdqSubmit = () => {
    setSdqResult("SDQ Result: Peer Interaction (92% Outstanding), Hyperactivity (Normal/Negligible). EQ Index calculated at 116 points (Highly resilient mind).");
    setCoins(c => c + 35);
    setQuestStatus(q => ({ ...q, sdq: true }));
  };

  // Library Download progress states
  const [downloadProgress, setDownloadProgress] = useState<Record<string, string>>({});

  const triggerDownload = (id: string) => {
    setDownloadProgress(prev => ({ ...prev, [id]: '0%' }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setDownloadProgress(prev => ({ ...prev, [id]: progress + '%' }));
      if (progress >= 100) {
        clearInterval(interval);
        setDownloadProgress(prev => ({ ...prev, [id]: 'Offline Saved' }));
      }
    }, 400);
  };

  // Off-site checking interactive states
  const [offsiteStatus, setOffsiteStatus] = useState<string | null>(null);
  const [offsiteType, setOffsiteType] = useState("Field Trip");
  const [offsiteTime, setOffsiteTime] = useState("");

  const submitOffsiteLog = () => {
    setOffsiteStatus(`Logged [${offsiteType}] location at 13.7563° N, 100.5018° E. Signed off to Prof. Orion.`);
  };

  // Student Leave submission states
  const [leaveStatus, setLeaveStatus] = useState<string | null>(null);
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [leaveReason, setLeaveReason] = useState("");

  const submitLeaveRequest = () => {
    setLeaveStatus("Request submitted successfully to Prof. Orion. Status: Pending Approval.");
  };

  // Interactive Canteen purchase
  const [dailyLimit, setDailyLimit] = useState(200);
  const [payStatus, setPayStatus] = useState<string | null>(null);

  const buyCanteenMeal = (item: string, cost: number) => {
    if (coins < cost) {
      setPayStatus("Insufficient Student Pay balance!");
      return;
    }
    setCoins(c => c - cost);
    setPayStatus(`Purchased ${item} for ฿${cost}. Transaction recorded!`);
  };

  // Holographic simulator chemistry item
  const [activeMolecule, setActiveMolecule] = useState("H2O");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col relative overflow-hidden bg-[#0A0A0A]"
    >
      {/* Header */}
      <div className="p-8 pt-12 flex flex-col gap-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-rose-500 p-0.5 relative">
              <img 
                src="https://picsum.photos/seed/alex/100/100" 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 bg-rose-500 w-3.5 h-3.5 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center text-[8px] font-bold text-white">✨</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Alex Universe</h3>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-[9px] uppercase tracking-widest font-mono">Grade 12-A • ID #829</span>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded text-[8px] font-mono flex items-center gap-0.5">
                  <Coins className="w-2.5 h-2.5" /> {coins} EduCoins
                </span>
              </div>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-28">
        {/* Quick Stats Panel */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-rose-500/10 p-4 rounded-3xl border border-rose-500/20 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Today Arrival</div>
              <div className="text-2xl font-bold text-white font-mono">07:44 AM</div>
            </div>
            <span className="text-[9px] text-emerald-400 mt-2 font-mono flex items-center gap-1">On-time (มา)</span>
          </div>

          <div className="bg-cyan-500/10 p-4 rounded-3xl border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Conduct Points</div>
              <div className="text-2xl font-bold text-white font-mono">98/100</div>
            </div>
            <button onClick={() => setIsConductOpen(true)} className="text-[9px] text-cyan-300 font-bold uppercase tracking-widest mt-2 hover:underline text-left">View History</button>
          </div>
        </div>

        {/* Feature Icons Grid - Full 11 buttons required for Student */}
        <div>
          <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Core Educational Hub</h4>
          <div className="grid grid-cols-3 gap-3">
            <FeatureItem icon={Clock} label="เวลาเข้าเรียน" color="bg-rose-500" onClick={() => setIsAttendanceOpen(true)} />
            <FeatureItem icon={MapPinned} label="เรียนนอกสถานที่" color="bg-orange-500" onClick={() => setIsOffsiteOpen(true)} />
            <FeatureItem icon={Calendar} label="ปฏิทินส่งงาน" color="bg-amber-500" onClick={() => setIsCalendarOpen(true)} />
            
            <FeatureItem icon={FileText} label="ผลการเรียน/ใบเกรด" color="bg-pink-500" onClick={() => setIsGradesOpen(true)} />
            <FeatureItem icon={MessageSquare} label="แชทเพื่อน-ที่ปรึกษา" color="bg-indigo-500" onClick={() => setIsChatOpen(true)} />
            <FeatureItem icon={BrainCircuit} label="ประเมิน SDQ/EQ" color="bg-purple-500" onClick={() => setIsAssessmentOpen(true)} />
            
            <FeatureItem icon={Book} label="ห้องสมุดดีจิทัล" color="bg-violet-500" onClick={() => setIsLibraryOpen(true)} />
            <FeatureItem icon={User} label="คะแนนความประพฤติ" color="bg-blue-500" onClick={() => setIsConductOpen(true)} />
            <FeatureItem icon={CalendarCheck} label="ส่งใบลาเรียน" color="bg-teal-500" onClick={() => setIsLeaveRequestOpen(true)} />

            <FeatureItem icon={Video} label="Classroom บันทึก" color="bg-emerald-500" onClick={() => setIsClassroomOpen(true)} />
            <FeatureItem icon={Flame} label="โหมด Focus" color="bg-rose-600" onClick={() => setIsFocusModeOpen(true)} />
            <FeatureItem icon={Cpu} label="AI Core อัจฉริยะ" color="bg-violet-600" onClick={() => setIsAIOpen(true)} />
          </div>
        </div>

        {/* Frontier Tech Grid (Next-gen modules) */}
        <div>
          <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4 font-mono">Frontier Tech & Blockchain Ledger</h4>
          <div className="grid grid-cols-3 gap-3">
            <FeatureItem icon={ShieldCheck} label="ระบบ Blockchain" color="bg-amber-500 font-bold" onClick={() => { setIsBlockchainOpen(true); setBlockchainTab('credentials'); }} />
            <FeatureItem icon={Award} label="พอร์ตโฟลิโอและงาน" color="bg-indigo-600 font-bold" onClick={() => { setIsBlockchainOpen(true); setBlockchainTab('passport'); }} />
            <FeatureItem icon={Coins} label="รางวัลสะสม L2E" color="bg-rose-500 font-bold" onClick={() => { setIsBlockchainOpen(true); setBlockchainTab('l2e'); }} />
            
            <FeatureItem icon={FileText} label="ห้องสมุดวิจัยวิจัย" color="bg-blue-600" onClick={() => setIsResearchOpen(true)} />
            <FeatureItem icon={Stethoscope} label="Edu Clinic" color="bg-emerald-600" onClick={() => setIsClinicOpen(true)} />
            <FeatureItem icon={CreditCard} label="Student Pay" color="bg-orange-600" onClick={() => setIsPayOpen(true)} />
          </div>
        </div>

        {/* Gamified Learn-to-Earn Side widget */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Coins className="w-16 h-16 text-yellow-400" />
          </div>
          <div className="relative z-10 space-y-4">
            <div>
              <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Weekly Gamified Quest</div>
              <h4 className="text-white font-bold text-lg">Learn-To-Earn (L2E) Dashboard</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 decoration-slice">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-rose-400" />
                  <span className="text-xs text-white">Complete a Focus session (25m)</span>
                </div>
                <span className="text-[10px] font-bold text-yellow-400 font-mono">
                  {questStatus.focus ? <Check className="w-4 h-4 text-emerald-400 inline" /> : "+50 Coins"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-white">Submit SDQ/EQ evaluation</span>
                </div>
                <span className="text-[10px] font-bold text-yellow-400 font-mono">
                  {questStatus.sdq ? <Check className="w-4 h-4 text-emerald-400 inline" /> : "+35 Coins"}
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <h5 className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Rewards Shop</h5>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => buyCanteenMeal("Class Formulas Cheat Sheet", 100)}
                  className={`p-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all text-center border cursor-pointer ${
                    boughtItems.includes("Class Formulas Cheat Sheet") ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-white/5 hover:bg-white/10 text-white border-white/10"
                  }`}
                >
                  Physics formula chart (100 coins)
                </button>
                <button 
                  onClick={() => buyCanteenMeal("Advanced PISA Mock Set", 250)}
                  className={`p-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all text-center border cursor-pointer ${
                    boughtItems.includes("Advanced PISA Mock Set") ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-white/5 hover:bg-white/10 text-white border-white/10"
                  }`}
                >
                  PISA math suite (250 coins)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ALL DETAILED MODALS --- */}

      {/* 1. ATTENDANCE & STATS MODAL */}
      <AnimatePresence>
        {isAttendanceOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Clock className="w-6 h-6 text-rose-500" /> Attendance Statistics</h3>
              <button onClick={() => setIsAttendanceOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12 flex-1">
              <div className="bg-gradient-to-br from-rose-950 to-slate-900 border border-rose-500/20 p-6 rounded-3xl text-center">
                <div className="text-[12px] uppercase text-rose-400 tracking-widest mb-2 font-mono">Present Rate (สถิติมาเรียน)</div>
                <div className="text-5xl font-mono text-white font-black">97.2%</div>
                <div className="text-xs text-white/50 mt-1">142 Attended out of 146 classes</div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="text-xl font-bold text-emerald-400">142</div>
                  <div className="text-[9px] text-white/40">มา (Present)</div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="text-xl font-bold text-amber-400">3</div>
                  <div className="text-[9px] text-white/40">ลา (Leave)</div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="text-xl font-bold text-red-400">1</div>
                  <div className="text-[9px] text-white/40">ขาด (Absent)</div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="text-xl font-bold text-orange-400">2</div>
                  <div className="text-[9px] text-white/40">สาย (Late)</div>
                </div>
              </div>

              {/* Auto push reminders logs */}
              <div className="space-y-3">
                <h4 className="text-rose-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-pulse"></span>
                  ระบบแจ้งเตือนกริ่งอิเล็กทรอนิกส์ (Auto Push Alerts)
                </h4>
                <div className="space-y-2">
                  {autoNotifications.map((notif, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/15 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-xs font-bold font-sans flex items-center gap-1.5">
                          🔔 {notif.title}
                        </span>
                        <span className="text-[9px] text-white/40 font-mono">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-normal">{notif.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Recent Attendance Log</h4>
                <div className="space-y-2">
                  {[
                    { date: 'Jun 03, 2026', time: '07:44 AM', status: 'On-time (มา)', detail: 'Gate scan #1' },
                    { date: 'Jun 02, 2026', time: '08:12 AM', status: 'Late (สาย)', detail: 'Over 8:00 cutoff' },
                    { date: 'Jun 01, 2026', time: '07:51 AM', status: 'On-time (มา)', detail: 'Gate scan #2' },
                    { date: 'May 28, 2026', time: '--:--', status: 'Sick Leave (ลาป่วย)', detail: 'Submitted by parent' }
                  ].map((log, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-white text-xs font-bold">{log.date}</div>
                        <div className="text-[9px] text-white/60">{log.detail}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-bold ${log.status.includes('On-time') ? 'text-emerald-400' : log.status.includes('Late') ? 'text-orange-400' : 'text-amber-400'}`}>{log.status}</div>
                        <div className="text-[9px] text-white/40">{log.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. OFFSITE ATTENDANCE LOGGING */}
      <AnimatePresence>
        {isOffsiteOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><MapPinned className="w-6 h-6 text-orange-500" /> Off-site Verification</h3>
              <button onClick={() => setIsOffsiteOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide flex-1">
              <div className="bg-orange-500/10 p-5 rounded-3xl border border-orange-500/20 text-xs text-orange-300 leading-relaxed">
                Authorized location-based logging for off-campus tasks e.g. educational field trips (กิจกรรมทัศนศึกษา) or vocational student internships (กรณีเป็นนักศึกษาฝึกงาน) determined by school guidelines.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-2">Location Designation (โรงเรียนเป็นผู้กำหนด)</label>
                  <select 
                    value={offsiteType} 
                    onChange={(e) => setOffsiteType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none"
                  >
                    <option value="ทัศนศึกษา: พิพิธภัณฑ์วิทยาศาสตร์แห่งชาติ" className="bg-[#0A0A0A]">ทัศนศึกษา: พิพิธภัณฑ์วิทยาศาสตร์แห่งชาติ</option>
                    <option value="ทัศนศึกษา: ศูนย์ประวัติศาสตร์และหอศิลป์" className="bg-[#0A0A0A]">ทัศนศึกษา: ศูนย์ประวัติศาสตร์และหอศิลป์</option>
                    <option value="นักศึกษาฝึกงาน: บริษัท ปตท. สำรวจและผลิตฯ" className="bg-[#0A0A0A]">นักศึกษาฝึกงาน: บริษัท ปตท. สำรวจและผลิตจำกัด</option>
                    <option value="นักศึกษาฝึกงาน: สถาบันนวัตกรรมเทคโนโลยีสารสนเทศ" className="bg-[#0A0A0A]">นักศึกษาฝึกงาน: สถาบันนวัตกรรมเทคโนโลยีสารสนเทศ</option>
                    <option value="กิจกรรมสาธารณะประโยชน์: ชุมชนสัมพันธ์" className="bg-[#0A0A0A]">กิจกรรมสาธารณะประโยชน์: ชุมชนสัมพันธ์</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-2">Description / Note of Activity</label>
                  <input 
                    type="text" 
                    placeholder="e.g. เข้าร่วมแล็บฟิสิกส์นิวเคลียร์จำลอง, บันทึกรหัสดึงฐานข้อมูลสพฐ." 
                    value={offsiteTime}
                    onChange={(e) => setOffsiteTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                  <div className="text-white font-bold text-xs">GPS Verification Latency</div>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span> Global Position Found (± 4 meters)
                  </div>
                </div>

                <button 
                  onClick={submitOffsiteLog}
                  className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 active:scale-95 transition-transform"
                >
                  Verify Off-site Clock-in
                </button>

                {offsiteStatus && (
                  <div className="p-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-2xl text-xs font-mono">
                    {offsiteStatus}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CALENDAR & HOMEWORK DEADLINES */}
      <AnimatePresence>
        {isCalendarOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Calendar className="w-6 h-6 text-amber-500" /> Academic & Homework Tasks</h3>
              <button onClick={() => setIsCalendarOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-amber-500/10 p-5 rounded-3xl border border-amber-500/20 text-xs text-amber-300">
                You have **2 pending assignments** due this week. Mark completed items directly to earn tokens!
              </div>

              <div className="space-y-3">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Homework List</h4>
                <div className="space-y-2">
                  {HOMEWORK_LIST.map((hw) => (
                    <div key={hw.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">{hw.subject}</span>
                          <h4 className="text-white text-sm font-bold mt-1">{hw.title}</h4>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono uppercase ${
                          hw.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>{hw.status}</span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{hw.description}</p>
                      <div className="flex justify-between items-center text-[10px] text-white/30 pt-2 border-t border-white/5 font-mono">
                        <span>Due: {hw.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. REPORT CARD / GRADES */}
      <AnimatePresence>
        {isGradesOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><FileText className="w-6 h-6 text-pink-500" /> Academic Performance</h3>
              <button onClick={() => setIsGradesOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12 flex-1">
              
              {/* Year/Term Selector Dropdown */}
              <div className="bg-white/5 border border-white/10 rounded-2.5xl p-4 space-y-2">
                <label className="text-[10px] text-pink-400 font-bold uppercase tracking-widest pl-1 block">
                  เลือกปีการศึกษา & เทอม (Select Term & Year)
                </label>
                <select 
                  value={gradeTermSelect}
                  onChange={(e) => setGradeTermSelect(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white text-xs font-bold focus:outline-none focus:border-pink-500"
                >
                  <option value="2568-t2">ปีการศึกษา 2568 เทอม 2 (ปัจจุบัน)</option>
                  <option value="2568-t1">ปีการศึกษา 2568 เทอม 1</option>
                  <option value="2567-t2">ปีการศึกษา 2567 เทอม 2</option>
                  <option value="2567-t1">ปีการศึกษา 2567 เทอม 1</option>
                </select>
              </div>

              <div className="bg-gradient-to-br from-pink-950 to-indigo-950 border border-pink-500/20 p-6 rounded-3xl flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-pink-400 uppercase tracking-widest mb-1 font-mono">GPA ของภาคเรียนที่เลือก</div>
                  <div className="text-4xl font-bold text-white">
                    {gradeTermSelect === "2568-t2" ? "3.94" :
                     gradeTermSelect === "2568-t1" ? "3.89" :
                     gradeTermSelect === "2567-t2" ? "3.91" : "3.86"}
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    {gradeTermSelect === "2568-t2" ? "วิทย์-พลังงาน และแคลคูลัสขั้นสูง" :
                     gradeTermSelect === "2568-t1" ? "แม่เหล็กไฟฟ้าและคัดกรองสมรรถภาพ" :
                     gradeTermSelect === "2567-t2" ? "ฟิสิกส์คลาสสิกและพื้นฐานเว็บพัฒนา" : "ชีวฟิสิกส์แรงโน้มถ่วงและประวัติศาสตร์แกนโลก"}
                  </div>
                </div>
                <button 
                  onClick={() => alert(`📩 ดาวน์โหลดใบรายงานผลการเรียนลายนิ้วมือดิจิทัลของเทอม ${gradeTermSelect} สำเร็จ!`)}
                  className="p-4 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer text-white"
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">Grading Breakdown รายวิชา</h4>
                {(gradeTermSelect === "2568-t2" ? [
                  { course: 'Advanced Physics (AP-12)', grade: '4.0', score: '96/100', comments: 'Excellent in relativity coursework' },
                  { course: 'Vector Calculus', grade: '4.0', score: '98/100', comments: 'Flawless limit assessments' },
                  { course: 'Computer Science II', grade: '3.5', score: '88/100', comments: 'Slight dynamic programming delay' },
                  { course: 'Organic Chemistry', grade: '4.0', score: '91/100', comments: 'Synthesizing stellar labs' }
                ] : gradeTermSelect === "2568-t1" ? [
                  { course: 'AP Electrodynamics', grade: '4.0', score: '95/100', comments: 'Stellar work on Maxwell field equations' },
                  { course: 'Integral Calculus II', grade: '3.5', score: '89/100', comments: 'Great integrations, missed partial fractions' },
                  { course: 'Introduction to AI Engines', grade: '4.0', score: '97/100', comments: 'Excellent deep learning presentation' },
                  { course: 'Polymer chemistry', grade: '4.0', score: '93/100', comments: 'Created high grade active materials' }
                ] : gradeTermSelect === "2567-t2" ? [
                  { course: 'AP Classical Mechanics', grade: '4.0', score: '94/100', comments: 'Superb orbital dynamics understanding' },
                  { course: 'Trigonometry Core', grade: '4.0', score: '99/100', comments: 'Practically flawless math indexing' },
                  { course: 'Web Development Foundations', grade: '4.0', score: '95/100', comments: 'Created real-time responsive flex applications' },
                  { course: 'General Chemistry I', grade: '3.5', score: '87/100', comments: 'Good lab report but slower analysis' }
                ] : [
                  { course: 'Introductory Gravity & Orbit', grade: '3.5', score: '85/100', comments: 'Fine calculations; needs force vector precision' },
                  { course: 'Algebra Foundations', grade: '4.0', score: '92/100', comments: 'Strong quadratic systems solving capability' },
                  { course: 'General Science Suite', grade: '4.0', score: '94/100', comments: 'Great performance and scientific curiosity' },
                  { course: 'History of Cosmology', grade: '4.0', score: '98/100', comments: 'In-depth historical space research report' }
                ]).map((item, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-white text-xs font-bold">{item.course}</div>
                      <div className="text-[9px] text-white/40">{item.comments}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-pink-400">Grade {item.grade}</div>
                      <div className="text-[9px] text-white/60">Raw Score: {item.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. ADVISOR & CLASSMATES CHAT */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><MessageSquare className="w-6 h-6 text-indigo-500" /> Edu Chat Network</h3>
              <button onClick={() => setIsChatOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            {/* Channel Toggler */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 mb-6">
              <button 
                onClick={() => setChatChannel('advisor')}
                className={`py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${chatChannel === 'advisor' ? 'bg-indigo-600 text-white' : 'text-white/40'}`}
              >
                Advisor (Dr. Sarah)
              </button>
              <button 
                onClick={() => setChatChannel('classroom')}
                className={`py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${chatChannel === 'classroom' ? 'bg-indigo-600 text-white' : 'text-white/40'}`}
              >
                Grade 12-A General
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide pb-6">
              {(chatChannel === 'advisor' ? advisorMessages : classroomMessages).map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <div className="text-[9px] text-white/40 mb-1 pl-1 pr-1">{msg.sender}</div>
                  <div className={`p-4 rounded-3xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'You' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/10 text-white/90 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="text-[8px] text-white/20 mt-1 pl-1 pr-1 font-mono">{msg.time}</div>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <div className="flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl items-center">
              <input 
                type="text" 
                placeholder="Type lesson inquiry message..." 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-transparent text-xs text-white border-none focus:outline-none placeholder:text-white/20 pl-2"
              />
              <button 
                onClick={handleSendMessage}
                className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. SDQ & EQ ASSESSMENT (แยกประเมินแต่อยู่ในหมวดเดียวกัน) */}
      <AnimatePresence>
        {isAssessmentOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><BrainCircuit className="w-6 h-6 text-purple-500" /> Behavioral & Mind Center</h3>
              <button onClick={() => setIsAssessmentOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            
            {/* Split Questionnaire Tab Selector on the same Grouping category */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 mb-6">
              <button 
                onClick={() => setAssessmentTab('sdq')}
                className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${assessmentTab === 'sdq' ? 'bg-purple-600 text-white' : 'text-white/40'}`}
              >
                ประเมินพฤติกรรม SDQ
              </button>
              <button 
                onClick={() => setAssessmentTab('eq')}
                className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${assessmentTab === 'eq' ? 'bg-indigo-600 text-white' : 'text-white/40'}`}
              >
                ประเมินความฉลาดทางอารมณ์ EQ
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12 flex-1">
              
              {assessmentTab === 'sdq' ? (
                <div className="space-y-6">
                  <div className="bg-purple-500/10 p-5 rounded-3xl border border-purple-500/20 text-xs text-purple-300 leading-relaxed">
                    <strong>แบบประเมินตนเอง SDQ (Strengths and Difficulties Questionnaire)</strong>: ช่วยวิเคราะห์ด้านอารมณ์, สมาธิ, และสัมพันธภาพกับเพื่อนร่วมห้องเรียน
                  </div>

                  {[
                    { id: 1, q: "ฉันพยายามสร้างสัมพันธ์ที่ดีและใส่ใจความรู้สึกของเพื่อนๆ ร่วมรุ่น" },
                    { id: 2, q: "ฉันมักมีอาการกระวนกระวาย สมาธิสั้น หรือไม่สามารถนั่งนิ่งได้นาน" },
                    { id: 3, q: "ฉันมักมีอาการปวดหัว ปวดท้อง หรือคลื่นไส้บ่อยครั้งเวลาเครียดเรียน" },
                    { id: 4, q: "ฉันมักแบ่งปันข้าวของเครื่องใช้ ดิจิทัลโมเดล หรือขนมให้เพื่อนเสมอ" }
                  ].map((item) => (
                    <div key={item.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3">
                      <span className="text-[10px] text-purple-400 font-bold font-mono">SDQ QUESTION {item.id}</span>
                      <p className="text-xs text-white">{item.q}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {["ไม่จริง", "จริงบางครั้ง", "จริงอย่างยิ่ง"].map((label, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setSdqAnswers(prev => ({ ...prev, [item.id]: idx }))}
                            className={`py-2 rounded-xl text-[10px] font-bold uppercase transition-all border cursor-pointer ${
                              sdqAnswers[item.id] === idx ? "bg-purple-600 text-white border-purple-500" : "bg-white/5 text-white/50 border-white/10"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-indigo-500/10 p-5 rounded-3xl border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed">
                    <strong>แบบประเมิน EQ (Emotional Quotient Questionnaire)</strong>: ช่วยประเมินความสามารถในการเข้าใจ/จัดการอารมณ์ของตนเองและการฝ่าฟันอุปสรรคเชิงบวก
                  </div>

                  {[
                    { id: 101, q: "เมื่อพบความล้มเหลวในการสอบ หรือคะแนนลดลง ฉันยังคงพยายามสู้ต่ออย่างใจเย็น" },
                    { id: 102, q: "ฉันเข้าใจความรู้สึกของครูและผู้ปกครองเมื่อเขาให้คำแนะนำด้วยความหวังดี" },
                    { id: 103, q: "ฉันควบคุมอารมณ์โกรธหรือตื่นตระหนกได้เป็นอย่างดี เวลาทำการทดลองห้องปฏิบัติการเสมือนจริง" },
                    { id: 104, q: "ฉันพบแนวทางแก้ปัญหาเชิงสร้างสรรค์ร่วมกับสมาชิกทีมเสมอเวลาคิดแผนโครงงานยักษ์" }
                  ].map((item) => (
                    <div key={item.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3">
                      <span className="text-[10px] text-indigo-400 font-bold font-mono">EQ QUESTION {item.id - 100}</span>
                      <p className="text-xs text-white">{item.q}</p>
                      <div className="grid grid-cols-4 gap-1.5">
                        {["ไม่เลย", "บางครั้ง", "บ่อยครั้ง", "เสมอ"].map((label, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setEqAnswers(prev => ({ ...prev, [item.id]: idx }))}
                            className={`py-2 rounded-xl text-[9px] font-bold uppercase transition-all border cursor-pointer ${
                              eqAnswers[item.id] === idx ? "bg-indigo-600 text-white border-indigo-500" : "bg-white/5 text-white/50 border-white/10"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button 
                onClick={handleSdqSubmit}
                className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-purple-600/20 active:scale-95 transition-transform cursor-pointer"
              >
                บันทึกแบบประเมินพฤติกรรม & อารมณ์
              </button>

              {sdqResult && (
                <div className="p-5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs rounded-2xl leading-relaxed whitespace-pre-line font-mono">
                  {sdqResult}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. DIGITAL LIBRARY & EXAMS */}
      <AnimatePresence>
        {isLibraryOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Book className="w-6 h-6 text-violet-500" /> Digital Library & Mock Exams</h3>
              <button onClick={() => setIsLibraryOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            {/* Subject Filter list for "ห้องสมุดแยกตามรายวิชา" */}
            <div className="flex gap-2 items-center overflow-x-auto pb-4 mb-3 scrollbar-hide">
              {['All', 'Physics', 'Calculus', 'Chemistry', 'PISA Prep'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setLibrarySubjectFilter(sub)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap border cursor-pointer transition-all ${
                    librarySubjectFilter === sub ? 'bg-violet-600 text-white border-violet-500' : 'bg-white/5 text-white/55 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {sub === 'All' ? 'ทั้งหมด (All)' : sub}
                </button>
              ))}
            </div>

            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12 flex-1">
              <div className="bg-violet-500/10 p-5 rounded-3xl border border-violet-500/20 text-xs text-violet-300">
                Download digital syllabi and official high school mock exams for secondary prep entirely free. Available for offline review!
              </div>

              <div className="space-y-3">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-[10px] pl-1">Resource Catalog (ห้องสมุดรายวิชา)</h4>
                <div className="space-y-2">
                  {LIBRARY_BOOKS.filter(book => {
                    if (librarySubjectFilter === 'All') return true;
                    if (librarySubjectFilter === 'PISA Prep') return book.subject.toLowerCase().includes('pisa') || book.title.toLowerCase().includes('pisa');
                    return book.subject.toLowerCase().includes(librarySubjectFilter.toLowerCase());
                  }).map((book) => (
                    <div key={book.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="text-[8px] font-bold text-violet-400 uppercase tracking-widest">{book.subject} • {book.type}</span>
                        <h4 className="text-white text-xs font-bold mt-0.5">{book.title}</h4>
                        <p className="text-[9px] text-white/40">By {book.author}</p>
                      </div>
                      <button 
                        onClick={() => triggerDownload(book.id)}
                        className={`px-3 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-all ${
                          downloadProgress[book.id] === 'Offline Saved' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : downloadProgress[book.id] 
                              ? 'bg-white/10 text-white/60 animate-pulse'
                              : 'bg-violet-600 hover:bg-violet-500 text-white'
                        }`}
                      >
                        {downloadProgress[book.id] || "Download"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. CONDUCT LOGS */}
      <AnimatePresence>
        {isConductOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><User className="w-6 h-6 text-blue-500" /> Behavioral Audit Log</h3>
              <button onClick={() => setIsConductOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-gradient-to-br from-blue-950 to-slate-900 border border-blue-500/20 p-6 rounded-3xl text-center">
                <div className="text-[12px] uppercase text-blue-400 tracking-widest mb-2 font-mono">Conduct Merit Point</div>
                <div className="text-5xl font-mono text-white font-black">98/100</div>
                <div className="text-xs text-white/50 mt-1">Excellent overall conduct profile</div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-[10px]">Points History Audit</h4>
                <div className="space-y-2">
                  {[
                    { reason: 'Tutor peer mentorship for vector physics', points: '+5 pts', color: 'text-emerald-400' },
                    { reason: 'Arrived late past flag ceremony gate check', points: '-2 pts', color: 'text-rose-400' },
                    { reason: 'Exemplary classroom lab safety protocols', points: '+3 pts', color: 'text-emerald-400' },
                    { reason: 'Initial school start defaults score', points: '92 pts', color: 'text-white/60' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                      <span className="text-xs text-white/80 leading-relaxed font-bold">{item.reason}</span>
                      <span className={`text-xs font-bold font-mono ${item.color}`}>{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. STUDENT LEAVE REQUESTS */}
      <AnimatePresence>
        {isLeaveRequestOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CalendarCheck className="w-6 h-6 text-teal-500" /> File Absence Request</h3>
              <button onClick={() => setIsLeaveRequestOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide">
              <div className="bg-teal-500/10 p-5 rounded-3xl border border-teal-500/20 text-xs text-teal-400">
                File a digital leave slip directly. Your parent will also receive visual sync trackers.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-2">Absence Type Designation</label>
                  <select 
                    value={leaveType} 
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-teal-500/40"
                  >
                    <option value="Sick Leave" className="bg-[#0A0A0A]">Sick Leave (ลาป่วย)</option>
                    <option value="Personal Leave" className="bg-[#0A0A0A]">Personal Business (ลากิจ)</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-2">Detailed Clinical Reason</label>
                  <textarea 
                    placeholder="Describe context clearly for advisor review..." 
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-teal-500/40 text-xs h-24"
                  />
                </div>

                <button 
                  onClick={submitLeaveRequest}
                  className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl shadow-xl shadow-teal-550/25 cursor-pointer active:scale-95 transition-transform"
                >
                  Confirm Absence Filing
                </button>

                {leaveStatus && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-2xl font-mono">
                    {leaveStatus}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. CLASSROOM HUB (ONLINE & REPLAY) */}
      <AnimatePresence>
        {isClassroomOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-emerald-500" />
                <div>
                  <h3 className="text-xl font-bold text-white">Smart Classroom</h3>
                  <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest leading-none">
                    {classroomSection === 'home' ? 'Main Functions Menu' : `${classroomSection.toUpperCase()} SECTION`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {classroomSection !== 'home' && (
                  <button 
                    onClick={() => setClassroomSection('home')}
                    className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Menu
                  </button>
                )}
                <button onClick={() => setIsClassroomOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
              </div>
            </div>

            {/* NESTED CLASSROOM VIEWS */}
            {classroomSection === 'home' && (
              <div className="space-y-6 flex-1 pb-12">
                {/* Active Class Alert Banner */}
                <div className="bg-gradient-to-r from-emerald-950 to-indigo-950 p-5 rounded-3xl border border-emerald-500/20 flex justify-between items-center">
                  <div>
                    <span className="text-[8px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Live Stream</span>
                    <h4 className="text-white font-black mt-2 text-xs">Advanced Calculus AP</h4>
                    <p className="text-[10px] text-white/50">Dr. Sarah Thompson • Active Now</p>
                  </div>
                  <button 
                    onClick={() => { setClassroomSection('replays'); alert("Loading real-time classroom interface..."); }}
                    className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-[9px] uppercase font-bold tracking-widest cursor-pointer"
                  >
                    Join Feed
                  </button>
                </div>

                {/* Sub-functions Menu Grid */}
                <div className="space-y-3">
                  <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest font-mono pl-1">เลือกฟังก์ชันของห้องเรียน (Classroom Functions)</h4>
                  <div className="grid grid-cols-1 gap-3">
                    
                    {/* Hologram Classroom Button */}
                    <button 
                      onClick={() => setClassroomSection('hologram')}
                      className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-left flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-555/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs">Hologram Classroom (พิมพ์เขียว 3 มิติ)</h4>
                          <p className="text-[10px] text-white/50">เรียนรู้รูปทรงโมเลกุล เคมีโครงสร้าง และอะตอมแบบโฮโลแกรมหมุนได้</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
                    </button>

                    {/* Hands On Simulation Button */}
                    <button 
                      onClick={() => setClassroomSection('hands-on')}
                      className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-left flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center">
                          <Microscope className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs">Hands-on Simulation (การทดลองจำลอง)</h4>
                          <p className="text-[10px] text-white/50">เปลี่ยนพารามิเตอร์ทดลองฟิสิกส์คลื่นและสมรรถภาพแรงเสียดทานแบบสดๆ</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-cyan-400 transition-colors" />
                    </button>

                    {/* VR AR Simulation Button */}
                    <button 
                      onClick={() => setClassroomSection('vr-ar')}
                      className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-left flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center">
                          <Monitor className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs">VR AR Simulation (จำลองความจริงเสมือน)</h4>
                          <p className="text-[10px] text-white/50">จำลองการสวมแว่นตา AR พล๊อตโครงข่ายฟิสิกส์บนโต๊ะทำงานของคุณ</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-indigo-400 transition-colors" />
                    </button>

                    {/* PISA Button */}
                    <button 
                      onClick={() => setClassroomSection('pisa')}
                      className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-left flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center">
                          <Target className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs">PISA Test Prep (ศูนย์ประเมิน PISA)</h4>
                          <p className="text-[10px] text-white/50">ประเมินและท้าทายตนเองด้วยข้อสอบจำลอง PISA นานาชาติเพื่อสะสมเหรียญ</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-purple-400 transition-colors" />
                    </button>

                    {/* Old Exams Layout */}
                    <button 
                      onClick={() => setClassroomSection('old-exams')}
                      className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-left flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center">
                          <ClipboardCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs">คลังข้อสอบเก่า แยกเป็นรายวิชา (Mock Exams)</h4>
                          <p className="text-[10px] text-white/50">เข้าถึงคลังทดสอบจริง ฟิสิกส์ มอปลาย แคลคูลัส เคมี และแนวคิดสถิติ</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-pink-400 transition-colors" />
                    </button>

                    {/* Textbooks Layout */}
                    <button 
                      onClick={() => setClassroomSection('textbooks')}
                      className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-left flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-555/20 text-blue-400 rounded-2xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs">หนังสือเรียน แยกเป็นรายวิชา (Textbooks Catalogue)</h4>
                          <p className="text-[10px] text-white/50">หนังสือเรียนอิเล็กทรอนิกส์ PDF มีส่วนร่วมสรุปสารสำคัญและตัวอย่างเฉลย</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-blue-400 transition-colors" />
                    </button>

                    {/* Learning Replays */}
                    <button 
                      onClick={() => setClassroomSection('replays')}
                      className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl text-left flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center">
                          <Play className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-xs">ห้องการเรียนการสอนย้อนหลัง (Replays Library)</h4>
                          <p className="text-[10px] text-white/50">ดูย้อนหลังไลฟ์บรรยาย พร้อมปรับความเร็วสปีดและบันทึกโน้ตสำคัญประกอบ</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-amber-400 transition-colors" />
                    </button>

                  </div>
                </div>
              </div>
            )}

            {/* CLASSROOM SUB-SECTION: HOLOGRAM */}
            {classroomSection === 'hologram' && (
              <div className="space-y-6 flex-1 pb-12">
                <div className="bg-emerald-500/10 p-5 rounded-3xl border border-emerald-500/20 space-y-1">
                  <h4 className="text-emerald-400 font-bold text-xs">3D Hologram Molecule Blueprints</h4>
                  <p className="text-[11px] text-white/60">ควบคุมและหมุนภาพโครงภาพจำลองโมเลกุลสามมิติสำหรับวิชาระดับโครงสร้างลึก</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold">เลือกดาวเคราะห์หรือโมเลกุลจำลอง</span>
                    <span className="text-emerald-400 font-mono text-[10px]">3D Laser System: Online</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['H2O (โมเลกุลน้ำ)', 'CO2 (ก๊าซคาร์บอน)', 'C6H12O6 (น้ำตาล)'].map((mol, idx) => {
                      const idKey = idx === 0 ? 'H2O' : idx === 1 ? 'CO2' : 'C6H12O6';
                      return (
                        <button 
                          key={idKey}
                          onClick={() => setActiveMolecule(idKey)}
                          className={`py-3 px-1 rounded-xl text-[10px] font-bold text-center transition-all cursor-pointer ${
                            activeMolecule === idKey ? 'bg-emerald-500 text-white shadow-lg' : 'bg-[#0A0A0A] border border-white/10 text-white/50 hover:text-white'
                          }`}
                        >
                          {mol}
                        </button>
                      );
                    })}
                  </div>

                  {/* SVG Hologram Visual representation */}
                  <div className="w-full h-56 bg-emerald-950/10 border border-emerald-500/15 rounded-2.5xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial from-emerald-500/5 to-transparent animate-pulse pointer-events-none" />
                    {/* Glowing holographic beams */}
                    <div className="absolute bottom-0 w-24 h-48 bg-gradient-to-t from-emerald-400/20 to-transparent blur-xl pointer-events-none" />
                    
                    <svg className="w-36 h-36 relative z-10 animate-spin" style={{ animationDuration: '15s' }} viewBox="0 0 100 100">
                      {activeMolecule === 'H2O' ? (
                        <>
                          <circle cx="50" cy="50" r="16" fill="#10B981" fillOpacity="0.8" className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          <text x="50" y="54" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">O</text>
                          <line x1="50" y1="50" x2="25" y2="25" stroke="#10B981" strokeWidth="3" strokeDasharray="3,1" />
                          <line x1="50" y1="50" x2="75" y2="25" stroke="#10B981" strokeWidth="3" strokeDasharray="3,1" />
                          <circle cx="25" cy="25" r="10" fill="#3B82F6" />
                          <text x="25" y="28" fill="white" fontSize="8" textAnchor="middle">H</text>
                          <circle cx="75" cy="25" r="10" fill="#3B82F6" />
                          <text x="75" y="28" fill="white" fontSize="8" textAnchor="middle">H</text>
                        </>
                      ) : activeMolecule === 'CO2' ? (
                        <>
                          <circle cx="50" cy="50" r="16" fill="#6B7280" fillOpacity="0.8" />
                          <text x="50" y="54" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">C</text>
                          <line x1="15" y1="50" x2="85" y2="50" stroke="#10B981" strokeWidth="4" />
                          <circle cx="15" cy="50" r="12" fill="#EF4444" />
                          <text x="15" y="53" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">O</text>
                          <circle cx="85" cy="50" r="12" fill="#EF4444" />
                          <text x="85" y="53" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">O</text>
                        </>
                      ) : (
                        <>
                          <polygon points="50,15 80,30 80,65 50,80 20,65 20,30" fill="none" stroke="#10B981" strokeWidth="2.5" />
                          <circle cx="50" cy="50" r="14" fill="#8B5CF6" />
                          <text x="50" y="53" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">Glucose</text>
                          {[15, 30, 65, 80].map((coord, i) => (
                            <circle key={i} cx={i % 2 === 0 ? 20 : 80} cy={coord} r="5" fill="#10B981" />
                          ))}
                        </>
                      )}
                    </svg>

                    <div className="absolute bottom-3 text-center z-10">
                      <span className="text-white text-[11px] font-bold tracking-wide font-sans block">{activeMolecule} Formula Structure</span>
                      <span className="text-[8px] text-emerald-400 font-mono">360° Rotational Blueprints Rendered (หมุนอัตโนมัติ)</span>
                    </div>
                  </div>

                  <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-white/5 space-y-2 text-xs">
                    <h5 className="text-white font-bold text-[11px]">องค์ประกอบโมเลกุลจำลอง</h5>
                    <p className="text-[10px] text-white/60 leading-relaxed">
                      {activeMolecule === 'H2O' 
                        ? 'น้ำ (H2O) เกิดจาก ไฮโดรเจน 2 อะตอมและออกซิเจน 1 อะตอม เชื่อมต่อคู่พันธะเดี่ยวในมุมโกร่ง 104.5 องศาเซลสิอุส เพื่อสมดุลแรงฉุดขั้วบวกขั้วลบ'
                        : activeMolecule === 'CO2'
                        ? 'คาร์บอนไดออกไซด์ (CO2) เป็นพันธะสายเชื่อมตรงตามพิกัดแนวราบระเบียบเชิงคู่ประสาน (Linear bonding symmetry) มีอิทธิพลต่อความเสถียรเชิงโครงสร้างพลังงานเคมีสูตร'
                        : 'กลูโคส (C6H12O6) รูปวงแสตมป์เกลซิลีนิก (Hexose Carbon Ring) ข้อมูลความยาวโครงสร้างโมเลกุลแสดงถึงสสารพลังงานสะสมสำคัญและดึงกระบวนการสังเคราะห์แสง'}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => alert(`🔬 เริ่มการสแกน QR อุปกรณ์เพื่อแสดงภาพฉายแสง Hologram สมัครผ่านโปรเจคเตอร์ภายในโมดูลห้อง #303`)} 
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
                  >
                    เปิดฟลักซ์ลำแสงฉาย Hologram
                  </button>
                </div>
              </div>
            )}

            {/* CLASSROOM SUB-SECTION: HANDS-ON */}
            {classroomSection === 'hands-on' && (
              <div className="space-y-6 flex-1 pb-12">
                <div className="bg-cyan-500/10 p-5 rounded-3xl border border-cyan-500/20 space-y-1">
                  <h4 className="text-cyan-400 font-bold text-xs">Interactive Friction & Friction Physics Laboratory</h4>
                  <p className="text-[11px] text-white/60">ปรับแต่งพารามิเตอร์ของมวล แรงกระทำ และค่าความต้านความเสียดทานเพื่อคำนวณผลจำลองเชิงเลขนัยสำคัญจริง</p>
                </div>

                <div className="bg-[#0C1215] border border-cyan-500/20 p-5 rounded-3xl space-y-5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold text-xs">แผงปรับแต่งตัวแปรแล็บ (Parameter Control)</span>
                    <span className="text-[9px] text-cyan-400 font-mono font-bold uppercase tracking-widest bg-cyan-950 px-2 py-0.5 rounded">Active Engine</span>
                  </div>

                  {/* Mass tuning */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-white/70">
                      <span>มวลวัตถุ (Object Mass: m)</span>
                      <span className="font-mono font-bold text-cyan-400">{simMass} kg</span>
                    </div>
                    <input 
                      type="range" min="1" max="20" step="1" value={simMass} 
                      onChange={(e) => setSimMass(parseInt(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  {/* Force Tuning */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-white/70">
                      <span>แรงขับดันไปข้างหน้า (Applied Force: F)</span>
                      <span className="font-mono font-bold text-cyan-400">{simForce} N</span>
                    </div>
                    <input 
                      type="range" min="5" max="100" step="5" value={simForce} 
                      onChange={(e) => setSimForce(parseInt(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  {/* Friction Tuning */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-white/70">
                      <span>ค่าสัมประสิทธิ์ความเสียดทาน (&mu;)</span>
                      <span className="font-mono font-bold text-cyan-400">{simFriction.toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" min="0.01" max="0.80" step="0.05" value={simFriction} 
                      onChange={(e) => setSimFriction(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  {/* Physics mathematical output computation */}
                  {(() => {
                    const gravity = 9.81;
                    const maxFriction = parseFloat((simFriction * simMass * gravity).toFixed(2));
                    const netForce = simForce > maxFriction ? parseFloat((simForce - maxFriction).toFixed(2)) : 0;
                    const acceleration = parseFloat((netForce / simMass).toFixed(2));
                    const progressVal = Math.min(100, (acceleration * 10));

                    return (
                      <div className="space-y-4 pt-3 border-t border-white/5">
                        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                          <div className="bg-[#0A0A0A]/80 p-2 rounded-xl border border-white/5">
                            <div className="text-white/40">Friction Limit (f)</div>
                            <div className="text-sm font-mono font-bold text-rose-400">{maxFriction} N</div>
                          </div>
                          <div className="bg-[#0A0A0A]/80 p-2 rounded-xl border border-white/5">
                            <div className="text-white/40">Net Force (F_net)</div>
                            <div className="text-sm font-mono font-bold text-emerald-400">{netForce} N</div>
                          </div>
                          <div className="bg-[#0A0A0A]/80 p-2 rounded-xl border border-white/5">
                            <div className="text-white/40">Acceleration (a)</div>
                            <div className="text-sm font-mono font-bold text-cyan-400">{acceleration} m/s²</div>
                          </div>
                        </div>

                        {/* Interactive Graph Animation */}
                        <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/10 space-y-2">
                          <div className="flex justify-between items-center text-[9px] text-white/30 font-mono">
                            <span>กราฟจำลองความเร่ง x เวลา (a-t Graph Ratio)</span>
                            <span>Scale: Real-time dynamic</span>
                          </div>
                          
                          {/* Animated SVG trajectory plot representation */}
                          <div className="h-24 w-full flex items-end justify-center relative overflow-hidden bg-black/50 rounded-lg p-1">
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 30">
                              <path 
                                d={`M 0,25 Q 25,${28 - acceleration * 2} 50,${25 - acceleration * 3.5} T 100,${25 - acceleration * 2.5}`} 
                                fill="none" stroke="#22D3EE" strokeWidth="2" className="animate-pulse"
                              />
                              <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeWidth="1" strokeDasharray="2" />
                            </svg>
                            <span className="absolute left-2.5 top-2.5 text-[8px] font-mono text-cyan-300">
                              {acceleration > 0 ? "🏃 วัตถุเริ่มเคลื่อนตัวเร่ง" : "🔴 แรงกระทำการต้านเสียดทานสมบูรณ์"}
                            </span>
                            <div className="h-1.5 w-full bg-cyan-950 rounded-full overflow-hidden absolute bottom-1.5 left-2 right-2 max-w-[90%] mx-auto">
                              <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progressVal}%` }}></div>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setIsSimulating(true);
                            setTimeout(() => setIsSimulating(false), 2000);
                            alert(`🚀 เริ่มต้นบันทึกพัลส์การทดลองจำลองด้วยแรงกระทำ ${simForce}N มวล ${simMass}kg. คะแนนสะสมความเข้าใจส่งถึงผู้สอน ดึงบล็อคข้อมูลพฤติกรรมเรียบร้อย!`);
                          }}
                          className={`w-full py-3 text-xs font-bold uppercase text-black rounded-xl transition-all cursor-pointer ${
                            isSimulating ? 'bg-cyan-300 animate-pulse' : 'bg-cyan-400 hover:bg-cyan-300'
                          }`}
                        >
                          {isSimulating ? "กำลังรันโมเดลทดสอบ..." : "บันทึกและส่งผลกิจกรรมการทดลองเชิงประยุกต์ (+15 Coins)"}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* CLASSROOM SUB-SECTION: VR AR */}
            {classroomSection === 'vr-ar' && (
              <div className="space-y-6 flex-1 pb-12">
                <div className="bg-indigo-500/10 p-5 rounded-3xl border border-indigo-500/20 space-y-1">
                  <h4 className="text-indigo-400 font-bold text-xs">ฮาร์ดแวร์จำลอง AR / VR Camera Sandbox</h4>
                  <p className="text-[11px] text-white/60">จำลองระเบียนพล็อตโครงข่ายความจริงเสมือนและยิงสัญญาน AR สติ๊กเกอร์ขึ้นจอพับ</p>
                </div>

                <div className="bg-[#0C101B] border border-indigo-500/20 p-5 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white font-bold">จำลองพิกัดกล้องความละเอียดจริง (Mobile Mock Camera)</span>
                    <span className="text-[9px] text-indigo-400 font-mono font-bold tracking-widest">AR ENG ON</span>
                  </div>

                  <div className="relative h-48 bg-black rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
                    {/* Simulated desk matrix overlay */}
                    <div className="absolute inset-0 border border-indigo-500/15" style={{
                      backgroundImage: 'radial-gradient(#312E81 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                      transform: `rotateX(60deg) scale(${arZoom}) rotateZ(${arRotation}deg)`,
                      transition: 'transform 0.1s linear'
                    }} />

                    {/* Virtual rendering model */}
                    <div className="relative text-center z-10 p-4 bg-[#0A0A0A]/90 border border-indigo-500/30 rounded-xl space-y-1">
                      <span className="text-[9px] text-indigo-400 uppercase tracking-widest font-mono">AR Active Grid Anchor</span>
                      <h4 className="text-white font-bold text-xs">3D Force Vector Grid</h4>
                      <p className="text-[8px] text-white/40">Anchor Tracking State: {arAnchorActive ? "💚 Locked on Desk Desk" : "💔 Searching for flat surface"}</p>
                    </div>

                    {/* Target camera reticle overlay */}
                    <div className="absolute top-4 left-4 border-t-2 border-l-2 border-indigo-500 w-4 h-4"></div>
                    <div className="absolute top-4 right-4 border-t-2 border-r-2 border-indigo-500 w-4 h-4"></div>
                    <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-indigo-500 w-4 h-4"></div>
                    <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-indigo-500 w-4 h-4"></div>
                  </div>

                  {/* AR View Controllers */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-white/40 block">Camera Zoom Ratio</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setArZoom(z => Math.max(0.5, z - 0.25))} className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white font-bold text-[10px] cursor-pointer">-</button>
                        <span className="flex-1 text-center text-xs text-white font-mono">{arZoom.toFixed(2)}x</span>
                        <button onClick={() => setArZoom(z => Math.min(2.5, z + 0.25))} className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white font-bold text-[10px] cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-white/40 block">Anchor Rotation</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setArRotation(r => r - 45)} className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white font-bold text-[10px] cursor-pointer">↺</button>
                        <span className="flex-1 text-center text-xs text-white font-mono">{arRotation}°</span>
                        <button onClick={() => setArRotation(r => r + 45)} className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white font-bold text-[10px] cursor-pointer">↻</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-[#0A0A0A] p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-white/70">สัญญานพอยเตอร์ยึดจับแนวราบออโต้</span>
                    <button 
                      onClick={() => setArAnchorActive(!arAnchorActive)}
                      className={`text-[9px] font-bold px-3 py-1 rounded transition-colors ${
                        arAnchorActive ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white/40'
                      }`}
                    >
                      {arAnchorActive ? "Active" : "Disabled"}
                    </button>
                  </div>

                  <button 
                    onClick={() => alert(`📸 บันทึกไฟล์พิกัดและโมเดลเวกเตอร์ที่พล็อต AR แนบกับโปรเจคของ Alex ลงแกลเลอรี่สำเร็จ!`)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
                  >
                    ถ่ายภาพบันทึกพิกัด AR จำลอง
                  </button>
                </div>
              </div>
            )}

            {/* CLASSROOM SUB-SECTION: PISA TEST PREP */}
            {classroomSection === 'pisa' && (
              <div className="space-y-6 flex-1 pb-12">
                <div className="bg-purple-500/10 p-5 rounded-3xl border border-purple-500/20 space-y-1">
                  <h4 className="text-purple-400 font-bold text-xs">PISA Standard Prep & Analytics</h4>
                  <p className="text-[11px] text-white/60">แบบฝึกหัดวิเคราะห์โครงสร้างข้อมูลเชิงคณิตศาสตร์และวิทยาศาสตร์สำหรับการประเมินสมรรถนะนานาชาติ</p>
                </div>

                {pisaStatus === 'not-started' ? (
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">International PISA Exam suite</h4>
                      <p className="text-xs text-white/50">ท้าทายด้วยคำถามแนวคิดวิเคราะห์แก้ปัญหา (Problem Solving) 3 ข้อสะสะสมเหรียญ L2E สูงสุด 50 เหรียญ!</p>
                    </div>
                    <button 
                      onClick={() => { setPisaStatus('active'); setPisaScore(0); setPisaQuizIdx(0); setPisaUserAns(null); }}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs uppercase cursor-pointer w-full"
                    >
                      เริ่มทำแบบทดสอบจำลอง
                    </button>
                  </div>
                ) : pisaStatus === 'finished' ? (
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center space-y-5">
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">COMPLETE</span>
                    <div>
                      <h4 className="text-white text-lg font-black">สิ้นสุดแบบฝึกหัด PISA</h4>
                      <p className="text-xs text-white/50 mt-1">คะแนนที่คุณทำได้: <strong className="text-yellow-400 text-lg font-mono">{pisaScore} / 3</strong> ข้อ</p>
                    </div>
                    <div className="bg-emerald-900/10 border border-emerald-500/25 p-4 rounded-2xl text-xs text-emerald-400 font-mono">
                      {pisaScore === 3 ? "🎉 ยอดเยี่ยมมาก! ท่านตอบถูกหมด รับเหรียญสะสมรางวัล +50 Coins!" : "ทบทวนแนวคิดแบบแก้ปัญหาในหนังสือวิเคราะห์ AP ต่อเพื่อคะแนนที่สมบูรณ์แบบ"}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setPisaStatus('not-started'); }}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold font-sans cursor-pointer"
                      >
                        ปิดหน้าต่างสรุป
                      </button>
                      <button 
                        onClick={() => { setPisaStatus('active'); setPisaScore(0); setPisaQuizIdx(0); setPisaUserAns(null); }}
                        className="flex-1 py-3 bg-purple-600 hover:bg-purple-555 text-white rounded-xl text-xs font-bold font-sans cursor-pointer"
                      >
                        ทำสอบใหม่อีกครั้ง
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Active Question Render */}
                    {(() => {
                      const questions = [
                        {
                          q: "สมมติว่าคุณต้องการเก็บข้อมูลประวัติการทำเกรดของนักเรียน ด้วยความปลอดภัยสูงสุด หากเลือกโครงสร้างข้อมูล (Data Architecture) แบบห่วงโซ่สมดุล (Blockchain Hash-List) ทุกๆบล็อกจะเชื่อมโยงกันด้วยข้อใด?",
                          options: [
                            "รหัสพอยเตอร์ธรรมดา ชี้ไปบล็อคถัดไปตรงๆ",
                            "ค่าแฮชของบล็อกก่อนหน้า (Previous Block Hash Hash Pointer)",
                            "ดัชนีย์พิกัดแบบเกลียวแอดเดรส",
                            "สมการพิกัดตรีโกณมิติแบบสุ่มค่าช่วงคลื่น"
                          ],
                          ans: 1,
                          exp: "ถูกต้อง! บล็อกของ Ledger ใช้ค่าแฮชของบล็อกแรกเริ่มคั่นก่อนหน้าเป็น Hash Pointer เชื่อมโยงเพื่อให้แน่ใจในการเปิดรับและวิวัฒนาการข้อมูลไม่มีการแก้ไข"
                        },
                        {
                          q: "สำหรับการเรียกค้นหาข้อมูลคำถามที่มีความถี่สูงแบบสม่ำเร็ว (Constant Time: O(1)) โครงสร้างข้อมูลใดทำงานคุ้มค่าและตอบสนองเร็วที่สุด?",
                          options: [
                            "รายการลิงก์ลิสต์เชิงเดียว (Single Linked List)",
                            "ตารางแฮชแมป (Hash Map Table Indexing)",
                            "ต้นไม้ค้นหาทวิภาคระดับลึก (Binary Search Tree)",
                            "อาเรย์ดิบแบบต่อเนื่องไม่มีการระบายบล็อคค้าง"
                          ],
                          ans: 1,
                          exp: "ถูกต้อง! ตารางแฮช (Hash Map) ค้นหาข้อมูลได้เกือบจะเป็น O(1) เนื่องจากใช้ฟังก์ชันแฮชแปลเปรียบไปยึดตำแหน่งดัชนีย์ตรงโดยเฉลี่ย"
                        },
                        {
                          q: "โครงสร้างข้อมูลต้นไม้ค้นหาทวิภาคแบบปรับสมดุล (Self-Balanced Binary Search Tree) เช่น AVL, Red-Black Trees มีอัตราการเรียกค้นหาข้อมูลเฉลี่ยในประสิทธิภาพ Worst-case เท่าใด?",
                          options: [
                            "O(N)",
                            "O(1)",
                            "O(log N)",
                            "O(N²)"
                          ],
                          ans: 2,
                          exp: "ถูกต้อง! BST แบบปรับสมดุลยังคงรักษาระดับความสูงของกิ่งต้นไม้อยู่ในช่วงจำกัด ทำให้คำนวณและวิ่งเค้นลงกิ่งย่อยได้ด้วย O(log N)"
                        }
                      ];

                      const currentQ = questions[pisaQuizIdx];

                      return (
                        <div className="bg-white/5 p-5 border border-white/10 rounded-3xl space-y-4">
                          <div className="flex justify-between text-[10px] text-purple-400 font-bold font-mono">
                            <span>คำถามข้อที่ (QUESTION) {pisaQuizIdx + 1} / 3</span>
                            <span>Points: {pisaScore} / 3</span>
                          </div>
                          
                          <p className="text-white text-xs font-bold leading-relaxed">{currentQ.q}</p>

                          <div className="space-y-2 pt-2">
                            {currentQ.options.map((option, keyIdx) => {
                              const isChecked = pisaUserAns === keyIdx;
                              return (
                                <button
                                  key={keyIdx}
                                  onClick={() => pisaUserAns === null && setPisaUserAns(keyIdx)}
                                  disabled={pisaUserAns !== null}
                                  className={`w-full p-4 rounded-2xl text-left text-xs transition-all flex items-center justify-between border cursor-pointer ${
                                    isChecked
                                      ? keyIdx === currentQ.ans 
                                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500"
                                        : "bg-rose-500/20 text-rose-300 border-rose-500"
                                      : pisaUserAns !== null && keyIdx === currentQ.ans
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/50"
                                        : "bg-[#0A0A0A] border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
                                  }`}
                                >
                                  <span>{option}</span>
                                  {isChecked && (
                                    <span>{keyIdx === currentQ.ans ? "✅" : "❌"}</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {pisaUserAns !== null && (
                            <div className="space-y-4 pt-4 border-t border-white/5">
                              <div className={`p-4 rounded-xl text-[11px] leading-relaxed font-mono ${
                                pisaUserAns === currentQ.ans ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                              }`}>
                                <strong className="block mb-1">{pisaUserAns === currentQ.ans ? "คำตอบถูกต้อง!" : "คำตอบยังไม่ถูกต้อง"}</strong>
                                {currentQ.exp}
                              </div>

                              <button
                                onClick={() => {
                                  if (pisaUserAns === currentQ.ans) {
                                    setPisaScore(s => s + 1);
                                  }
                                  if (pisaQuizIdx + 1 < questions.length) {
                                    setPisaQuizIdx(idx => idx + 1);
                                    setPisaUserAns(null);
                                  } else {
                                    // Submit points dynamically to state
                                    const finalPoints = pisaUserAns === currentQ.ans ? pisaScore + 1 : pisaScore;
                                    if (finalPoints === 3) {
                                      setCoins(c => c + 50);
                                    }
                                    setPisaStatus('finished');
                                  }
                                }}
                                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
                              >
                                {pisaQuizIdx + 1 < questions.length ? "คำถามข้อต่อไป" : "ดูผลประเมินสุทธิ"}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* CLASSROOM SUB-SECTION: OLD EXAMS */}
            {classroomSection === 'old-exams' && (
              <div className="space-y-6 flex-1 pb-12">
                <div className="bg-pink-500/10 p-5 rounded-3xl border border-pink-500/20 space-y-1">
                  <h4 className="text-pink-400 font-bold text-xs">คลังข้อสอบเก่า แยกเป็นรายวิชา (Mock Exams Engine)</h4>
                  <p className="text-[11px] text-white/60">จำลองการจับเวลาจริงทำข้อสอบคัดเลือกเพื่อประเมินความพร้อมแบบเจาะลึกวิริยะภาพ</p>
                </div>

                <div className="flex gap-1.5 items-center overflow-x-auto pb-4 scrollbar-hide">
                  {['All', 'Physics', 'Calculus', 'Chemistry', 'Computer Science'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setExamSubjectFilter(sub)}
                      className={`py-2 px-3.5 rounded-xl text-[10px] font-bold whitespace-nowrap border cursor-pointer transition-all ${
                        examSubjectFilter === sub ? 'bg-pink-600 text-white border-pink-500' : 'bg-white/5 text-white/55 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {[
                    { id: "ex-1", title: "ข้อสอบปลายภาค ฟิสิกส์ ม.6 (AP Electrodynamics)", subject: "Physics", qCount: "30 Questions", dur: "90 Mins", year: "2025" },
                    { id: "ex-2", title: "สมรรถนะคณิตศาสตร์เชิงลึก: แคลคูลัสเวกเตอร์", subject: "Calculus", qCount: "25 Questions", dur: "120 Mins", year: "2025" },
                    { id: "ex-3", title: "ข้อสอบคัดกรองเคมีอินทรีย์โมเลกุลจำลอง", subject: "Chemistry", qCount: "40 Questions", dur: "100 Mins", year: "2024" },
                    { id: "ex-4", title: "ทฤษฎีโครงสร้างข้อมูล Data Architecture: กราฟและต้นไม้", subject: "Computer Science", qCount: "20 Questions", dur: "60 Mins", year: "2026" }
                  ].filter(ex => {
                    if (examSubjectFilter === 'All') return true;
                    return ex.subject.toLowerCase() === examSubjectFilter.toLowerCase();
                  }).map((ex) => (
                    <div key={ex.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="text-[8px] bg-pink-500/10 text-pink-300 px-2 py-0.5 rounded font-mono font-bold">{ex.subject}</span>
                        <h4 className="text-white text-xs font-bold mt-1.5 leading-snug">{ex.title}</h4>
                        <div className="flex items-center gap-2 text-[9px] text-white/30 font-mono mt-1">
                          <span>{ex.qCount}</span>
                          <span>•</span>
                          <span>{ex.dur} Limit</span>
                          <span>•</span>
                          <span>Year {ex.year}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => alert(`⏳ เริ่มต้นทำแบบทดสอบจำลองจับเวลากริ่งคลังอาวุธสำหรับวิชา ${ex.subject}. ตรวจสอบความถูกต้องผ่าน Blockchain เมื่อส่งเกรด.`)}
                        className="px-3.5 py-2 bg-pink-600 hover:bg-pink-550 text-white rounded-xl text-[9px] font-bold font-sans cursor-pointer uppercase flex-shrink-0"
                      >
                        Start Test
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLASSROOM SUB-SECTION: TEXTBOOKS */}
            {classroomSection === 'textbooks' && (
              <div className="space-y-6 flex-1 pb-12">
                <div className="bg-blue-500/10 p-5 rounded-3xl border border-blue-500/20 space-y-1">
                  <h4 className="text-blue-400 font-bold text-xs">หนังสือเรียน แยกเป็นรายวิชา (Textbooks Vault)</h4>
                  <p className="text-[11px] text-white/60">คลังตำราเรียนหลักสูตรแกนกลางอัปเดตและคู่มือเจาะลึกโครงสร้างคอมพิวเตอร์และอัลกอริทึม</p>
                </div>

                <div className="flex gap-1.5 items-center overflow-x-auto pb-4 scrollbar-hide">
                  {['All', 'Physics', 'Math', 'Chemistry', 'Computer Science'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setTextbookSubjectFilter(sub)}
                      className={`py-2 px-3.5 rounded-xl text-[10px] font-bold whitespace-nowrap border cursor-pointer transition-all ${
                        textbookSubjectFilter === sub ? 'bg-blue-600 text-white border-blue-500' : 'bg-white/5 text-white/55 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {[
                    { id: "tb-1", title: "ฟิสิกส์อะตอมระดับชั้นมัธยมศึกษาตอนปลาย เล่ม 3", subject: "Physics", size: "14.2 MB", prog: "80%", author: "สถาบันเทคโนโลยีล้ำสมัย" },
                    { id: "tb-2", title: "ทฤษฎีแคลคูลัสและการประยุกต์ใช้เวกเตอร์เชิงลึก", subject: "Math", size: "18.6 MB", prog: "35%", author: "Dr. Sarah Thompson" },
                    { id: "tb-3", title: "เคมีอินทรีย์และการสร้างแบบจำลองสมดุลพันธะโคเวเลนต์", subject: "Chemistry", size: "11.1 MB", prog: "90%", author: "ศูนย์วิจัยวิทยาศาสตร์และนวัตกรรม" },
                    { id: "tb-4", title: "สถาปัตยกรรมและโครงสร้างข้อมูลระบบกระจายศูนย์ (Data Structures)", subject: "Computer Science", size: "22.3 MB", prog: "55%", author: "Master Alan Turing" }
                  ].filter(tb => {
                    if (textbookSubjectFilter === 'All') return true;
                    return tb.subject.toLowerCase() === textbookSubjectFilter.toLowerCase();
                  }).map((tb) => (
                    <div key={tb.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[8px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded font-mono font-bold">{tb.subject} • E-Book</span>
                          <h4 className="text-white text-xs font-bold mt-1.5 leading-snug">{tb.title}</h4>
                          <p className="text-[9px] text-white/40 mt-0.5">Author/Publisher: {tb.author}</p>
                        </div>
                        <span className="text-[9px] text-white/30 font-mono flex-shrink-0">{tb.size}</span>
                      </div>

                      {/* Reading Progress Visual */}
                      <div className="space-y-1 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px]">
                        <span className="text-white/40">ความคืบหน้าในการเรียน (Progress): <strong className="text-blue-400 font-mono">{tb.prog}</strong></span>
                        <button 
                          onClick={() => alert(`📥 ดาวน์โหลดตำราอิเล็กทรอนิกส์ ${tb.title} (${tb.size}) ลงเครื่องสำหรับการใช้งานออฟไลน์สำเร็จ!`)}
                          className="text-blue-400 font-bold hover:underline font-sans cursor-pointer"
                        >
                          Download Read Offline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLASSROOM SUB-SECTION: REPLAY ARCHIVES */}
            {classroomSection === 'replays' && (
              <div className="space-y-6 flex-1 pb-12">
                <div className="bg-amber-500/10 p-5 rounded-3xl border border-amber-500/20 space-y-1">
                  <h4 className="text-amber-400 font-bold text-xs">ห้องการเรียนการสอนย้อนหลัง (Replays Library)</h4>
                  <p className="text-[11px] text-white/60">เข้าชมการสอนแบบความระเอียดสูงสุดย้อนหลัง ปรับสปีดความเร็วเพื่อความยืดหยุ่นในการเรียนฟื้นฟูความรู้</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1 font-mono">Archive Lessons List</h4>
                  <div className="space-y-2">
                    {[
                      { title: "Special Relativity & Time Dilatations", class: "AP Physics", date: "May 25, 2026", length: "45 mins", tutor: "Dr. Orion" },
                      { title: "DNA Synthesis & Hybridization Enzymes", class: "Biology", date: "May 20, 2026", length: "52 mins", tutor: "Bio Dept" },
                      { title: "Linear Matrix Transformations", class: "Calculus", date: "May 18, 2026", length: "40 mins", tutor: "Dr. Sarah" }
                    ].map((lec, idx) => (
                      <div key={idx} className="bg-[#0A0A0A] p-4 rounded-2.5xl border border-white/10 space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest">{lec.class} • By {lec.tutor}</span>
                            <h4 className="text-white text-xs font-bold mt-1 leading-snug">{lec.title}</h4>
                            <span className="text-[9px] text-white/35 font-mono">{lec.date} • {lec.length} duration</span>
                          </div>
                          
                          {/* Play simulated button */}
                          <button 
                            onClick={() => alert(`Streaming archive lecture: ${lec.title} \n\n[Speed configured at 1.5x, auto-synchronized closed captions (CC) ภาษาไทยเรียบร้อย]`)}
                            className="p-3 bg-amber-500 hover:bg-amber-400 rounded-xl text-black cursor-pointer flex-shrink-0"
                          >
                            <Play className="w-4 h-4 fill-black text-black" />
                          </button>
                        </div>

                        {/* Interactive speed multiplier options */}
                        <div className="flex gap-2 items-center justify-between text-[10px] border-t border-white/5 pt-2">
                          <span className="text-white/40">ปรับสปีดการเล่นวีดีโอจำลอง (Playback Speed)</span>
                          <div className="flex gap-1">
                            {['1.0x', '1.25x', '1.5x', '2.0x'].map((speed) => (
                              <button 
                                key={speed}
                                onClick={() => alert(`ความเร็วจำลองถูกปรับแต่งเป็น: ${speed}`)}
                                className="px-2 py-0.5 bg-white/5 border border-white/15 rounded text-[9px] text-white/70 hover:bg-white/10"
                              >
                                {speed}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* 11. POMODORO FOCUS MODE */}
      <AnimatePresence>
        {isFocusModeOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Flame className="w-6 h-6 text-rose-600" /> Cognitive Pomodoro</h3>
              <button onClick={() => setIsFocusModeOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-2">
                <span className="text-amber-400 text-xs tracking-widest uppercase font-mono font-bold flex items-center gap-1.5 justify-center">
                  <Volume2 className="w-4 h-4" /> Binaural: {binauralSound}
                </span>
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Active Study Ticker</h4>
              </div>

              {/* Countdown Ticker Card */}
              <div className="relative w-64 h-64 rounded-full border-4 border-rose-500/20 flex flex-col items-center justify-center shadow-2xl">
                <div className="absolute inset-2 rounded-full border border-rose-500/10 animate-pulse"></div>
                <div className="text-5xl font-mono text-white font-extrabold">
                  {Math.floor(focusTime / 60)}:{(focusTime % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-mono">Minutes remaining</div>
              </div>

              {/* Sessions Selector */}
              <div className="flex gap-2">
                {[15, 25, 45].map((mins) => (
                  <button 
                    key={mins}
                    onClick={() => changeFocusDuration(mins)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                      focusDuration === mins ? 'bg-rose-600 text-white' : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {mins} Min
                  </button>
                ))}
              </div>

              {/* Audio controller */}
              <div className="w-full max-w-sm bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                <span className="text-xs text-white">Binaural Frequencies</span>
                <div className="flex gap-1.5">
                  {['Off', 'Ocean', 'Cosmic'].map((style) => (
                    <button 
                      key={style}
                      onClick={() => setBinauralSound(style)}
                      className={`px-2.5 py-1 text-[9px] font-bold rounded-lg cursor-pointer ${
                        binauralSound === style ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/50'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-4 w-full max-w-xs">
                <button 
                  onClick={() => setFocusActive(!focusActive)}
                  className="flex-1 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  {focusActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {focusActive ? "Pause Track" : "Launch Session"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12. COGNITIVE AI CORE */}
      <AnimatePresence>
        {isAIOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Cpu className="w-6 h-6 text-violet-600" /> Cognitive AI Core</h3>
              <button onClick={() => setIsAIOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-gradient-to-br from-violet-950 to-indigo-950 p-6 rounded-3xl border border-violet-500/20 space-y-3">
                <span className="text-[10px] bg-violet-400/20 text-violet-300 border border-violet-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest tracking-wider">Dynamic Curriculum</span>
                <p className="text-xs text-white/80 leading-relaxed">Adjust your target difficulty and comprehension speed metrics. AI instantly computes supplementary lectures.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-white/60">Math Focus Difficulty</span>
                    <span className="text-violet-400 font-bold">Tier {aiMathDifficulty}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={aiMathDifficulty}
                    onChange={(e) => handleTweakAIParts(parseInt(e.target.value), aiCsPace)}
                    className="w-full accent-violet-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-white/60">Coding Syllabus Speed</span>
                    <span className="text-violet-400 font-bold">Pace {aiCsPace}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={aiCsPace}
                    onChange={(e) => handleTweakAIParts(aiMathDifficulty, parseInt(e.target.value))}
                    className="w-full accent-violet-600"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Recommended Supplementary Path</h4>
                <div className="space-y-2">
                  {aiRecommendations.map((rec, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-center">
                      <Sparkles className="w-5 h-5 text-violet-400 flex-shrink-0" />
                      <span className="text-xs text-white font-bold">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 13. BLOCKCHAIN CREDENTIAL PASSPORT & META-XR */}
      <AnimatePresence>
        {isBlockchainOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-500" />
                <div>
                  <h3 className="text-xl font-bold text-white">Blockchain Academic Center</h3>
                  <p className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-widest leading-none">Eduverse Decentralized Ledger Technology</p>
                </div>
              </div>
              <button onClick={() => setIsBlockchainOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            {/* Custom Tab Selectors */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: 'credentials', label: 'Micro-Credentials', icon: ShieldCheck, color: 'text-amber-400' },
                { id: 'passport', label: 'Skill Passport', icon: Award, color: 'text-indigo-400' },
                { id: 'l2e', label: 'L2E rewards', icon: Coins, color: 'text-rose-400' }
              ].map(tab => {
                const TabIcon = tab.icon;
                const isActive = blockchainTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setBlockchainTab(tab.id as any)}
                    className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
                      isActive 
                        ? 'bg-white/5 border-amber-500/40 text-white' 
                        : 'bg-[#0A0A0A] border-white/5 text-white/50 hover:text-white'
                    }`}
                  >
                    <TabIcon className={`w-4 h-4 ${tab.color}`} />
                    <span className="text-[9px] font-bold tracking-tight">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* BLOCKCHAIN INTERNAL VIEWPORT */}
            <div className="space-y-6 flex-1 pb-12">

              {/* TAB 1: MICRO-CREDENTIALS (BADGES RECORDED ON BLOCKCHAIN) */}
              {blockchainTab === 'credentials' && (
                <div className="space-y-5">
                  <div className="bg-amber-500/10 p-5 rounded-3xl border border-amber-500/20 space-y-1">
                    <h4 className="text-amber-400 font-bold text-xs">ระบบ Micro-Credentials สะสมหน่วยย่อย</h4>
                    <p className="text-[11px] text-white/60">บันทึกสัมฤทธิผลและทักษะย่อย (Badges) ลงบนกระจายศูนย์บล็อกเชนเพื่อความน่าเชื่อถือ ตรวจสอบสัญญานทันที</p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-white/40 text-[10px] uppercase font-bold tracking-widest pl-1 font-mono">เหรียญประทับตราเกียรติยศ (Your Verified Badges)</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { title: "AP Physics Modern Champion", code: "AP-PHY-MOD-01", hash: "0x39a1...10af", block: "44198", valids: "128 Nodes", date: "May 25, 2026" },
                        { title: "Calculus Linear Transformations Master", code: "CALC-LNX-420", hash: "0xe811...ff89", block: "44245", valids: "128 Nodes", date: "May 18, 2026" },
                        { title: "Algorithmic Efficiency Practitioner", code: "CS-ALGO-EFF-02", hash: "0xda92...8ed4", block: "44299", valids: "128 Nodes", date: "May 09, 2026" }
                      ].map((badge, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-2.5xl border border-white/10 space-y-2.5">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-amber-500/15 text-amber-400 rounded-xl flex items-center justify-center font-bold text-xs ring-1 ring-amber-500/20">
                                🎖️
                              </div>
                              <div>
                                <h4 className="text-white text-xs font-bold leading-none">{badge.title}</h4>
                                <span className="text-[9px] text-amber-400 font-mono font-bold uppercase tracking-widest">{badge.code}</span>
                              </div>
                            </div>
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">VERIFIED</span>
                          </div>

                          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/5 text-[9px] font-mono text-white/50">
                            <div>
                              <span className="block text-[8px] text-white/30">BlockHash Hash</span>
                              <span className="text-white">{badge.hash}</span>
                            </div>
                            <div>
                              <span className="block text-[8px] text-white/30">Block Index</span>
                              <span className="text-white">#{badge.block}</span>
                            </div>
                            <div>
                              <span className="block text-[8px] text-white/30">Confirmed By</span>
                              <span className="text-white">{badge.valids}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Immediate Ledger Query Validator Tool */}
                  <div className="bg-[#0C0E14] border border-amber-500/20 p-5 rounded-3xl space-y-4">
                    <span className="text-white font-bold text-xs block">เครื่องมือตรวจสอบความโปร่งใส (Tx instant Validator)</span>
                    <p className="text-[10px] text-white/50 leading-relaxed">ป้อนรหัสแฮชเพื่อสแกนยืนยันโครงสร้างเนื้อของเครดิตบล็อกสติ๊กเกอร์กับ Node ออนแอร์</p>
                    
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={txVerifyInput}
                        onChange={(e) => setTxVerifyInput(e.target.value)}
                        placeholder="กรุณาป้อน Hash (0x...)" 
                        className="flex-1 bg-black p-3 rounded-xl border border-white/10 text-xs text-white font-mono placeholder-white/30 focus:outline-none focus:border-amber-500"
                      />
                      <button 
                        onClick={() => {
                          setIsVerifyingTx(true);
                          setTxVerifyResult(null);
                          setTimeout(() => {
                            setIsVerifyingTx(false);
                            if (txVerifyInput.includes("0x") || txVerifyInput.length > 5) {
                              setTxVerifyResult("SUCCESS: ข้อมูลเกียรติยศแท้จริง! [Alex Universe] สำหรับหลักสูตร AP Electrodynamics ได้รับการยืนยันบูรณาการ ข้อมูลตรงกัน 100% ปราศจากการดัดแปลง");
                            } else {
                              setTxVerifyResult("ERROR: ไม่พบพิกัดบล็อกตรงกับแฮชที่ระบุ กรุณาตรวจสอบรหัสอีกครั้ง!");
                            }
                          }, 1200);
                        }}
                        disabled={isVerifyingTx}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs uppercase font-sans cursor-pointer flex items-center justify-center min-w-[100px]"
                      >
                        {isVerifyingTx ? "ตรวจสอบ..." : "ตรวจสัญญา"}
                      </button>
                    </div>

                    {txVerifyResult && (
                      <div className={`p-4 rounded-xl text-[10px] font-mono leading-relaxed ${
                        txVerifyResult.startsWith("SUCCESS") ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {txVerifyResult}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: SKILLS PASSPORT & JOB MATCHING LINKEDIN SYSTEM */}
              {blockchainTab === 'passport' && (
                <div className="space-y-6">
                  <div className="bg-indigo-500/10 p-5 rounded-3xl border border-indigo-500/20 space-y-1">
                    <h4 className="text-indigo-400 font-bold text-xs">Skill Passport: เชื่อมโยงระบบตลาดงาน</h4>
                    <p className="text-[11px] text-white/60">กระจายทักษะพอร์ตสะสมของคุณตรงกับสากลโดยอ้างอิงคุณสมบัติจำลองของ LinkedIn API เพื่อจับคู่โอกาสบริษัททั่วโลก</p>
                  </div>

                  {/* Personal Skills attributes visual */}
                  <div className="bg-white/5 border border-white/15 p-4 rounded-2.5xl space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-white font-bold">ทักษะสะสมหลักของ Alex Universe</span>
                      <span className="text-indigo-300 font-mono text-[9px]">Verified on Chains</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Quantum Electrodynamics', 'Vector Calculus', 'Data Structures (โครงสร้างข้อมูล)', 'AI Adaptive Core', 'React TS Engine'].map((skill, i) => (
                        <span key={i} className="text-[9px] bg-indigo-500/15 text-indigo-300 border border-indigo-500/35 px-2.5 py-1 rounded-full font-mono">
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Jobs listings simulated matching */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pl-1">
                      <h5 className="text-white/40 text-[10px] uppercase font-bold tracking-widest font-mono">สิทธิ์ตำแหน่งจับคู่ผ่าน API (Simulated LinkedIn API Matches)</h5>
                      <span className="text-[8px] text-emerald-400 font-mono font-bold animate-pulse">● API SYNCED</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: "Quantum Computing Intern", company: "Swiss Quantum Tech Labs (Zürich)", rate: "95%", req: "Quantum Physics, CS Math", salary: "CHF 4,200/mo" },
                        { title: "Junior DB Architecture Assistant", company: "Singapore Fintech Ledger Corp", rate: "88%", req: "Data Structures, Database Models", salary: "SGD 5,500/mo" },
                        { title: "Cognitive Learning Design Intern", company: "Silicon Valley AI Innovations", rate: "82%", req: "AI Adaptive Core, React Architecture", salary: "USD 6,000/mo" }
                      ].map((job, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-2.5xl border border-white/15 space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white text-xs font-bold leading-snug">{job.title}</h4>
                              <p className="text-[10px] text-white/55">{job.company}</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 rounded-lg">{job.rate} Match</span>
                          </div>

                          <div className="flex justify-between items-center text-[9px] text-white/40 font-mono pt-1.5 border-t border-white/5">
                            <span>Requires: {job.req}</span>
                            <span className="text-emerald-400 font-bold">{job.salary}</span>
                          </div>

                          <button 
                            onClick={() => alert(`📩 ส่งมอบ Skill Passport บันทึกบนเชนสมัครตำแหน่ง ${job.title} ไปยังระบบประมวลผล LinkedIn API จำลองเรียบร้อย!`)}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-bold font-sans cursor-pointer uppercase tracking-wider"
                          >
                            ส่งใบสมัครงานพร้อมประวัติบล็อกเชน (Apply)
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Generate Portfolio Template Wrapper */}
                  <div className="bg-[#110D1E] border border-violet-500/20 p-5 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-xs">AI Generate Portfolio Template</span>
                      <span className="text-[8px] bg-rose-500/25 text-rose-400 border border-rose-500/45 font-bold px-1.5 py-0.5 rounded font-mono uppercase">AI Creator</span>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed">
                      เขียนและอ้างอิงประวัติการสะสมความดีงาม อุณหภูมิร่างกาย คะแนนความประพฤติ และ Badges ออกมาเป็นเรซูเม่ฉบับจัดแต่งความสวยงามอัจฉริยะ
                    </p>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-white/40 block">เลือกดีไซน์เทมเพลต (Resume Theme Layout)</span>
                      <div className="grid grid-cols-3 gap-2">
                        {['cyber', 'academic', 'classic'].map((thm) => (
                          <button
                            key={thm}
                            onClick={() => setPortfolioTheme(thm as any)}
                            className={`py-2 px-1 text-[9px] font-bold uppercase rounded-lg border text-center cursor-pointer transition-all ${
                              portfolioTheme === thm 
                                ? 'bg-violet-600 text-white border-violet-400' 
                                : 'bg-[#0A0A0A] border-white/5 text-white/40 hover:text-white'
                            }`}
                          >
                            {thm} Theme
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setIsGeneratingPortfolio(true);
                        setGeneratedPortfolio(null);
                        setTimeout(() => {
                          setIsGeneratingPortfolio(false);
                          
                          let summary = "";
                          if (portfolioTheme === 'cyber') {
                            summary = `--- COGNITIVE CYBER-RESUME VERIFIED ---\nNAME: ALEX UNIVERSE | LEVEL: AP High school 12-A\nHONORS: AP Quantum Modern Hero, Calculus Master & Algorithmic Specialist\nL2E MINING TOKENS: 350 Coins Secure\nDIGITAL CITIZENSHIP: SDQ Perfect Stress Resistance & Conduct Score 98%\n--- ENCRYPTED AT BLOCK #${Math.floor(Math.random() * 50000)} ---`;
                          } else if (portfolioTheme === 'academic') {
                            summary = `--- ACADEMIC PORTFOLIO OF EXCELLENCE ---\nPresented by Alex Universe\nAffiliation: Grade 12-A Scientific stream\nGrade/Performance Records: High level marks in Advanced Calculus & AP Physics\nMicro-credentials Earned: AP Modern Physics Honor badge (Validated by 128 Core Nodes)\nVerified Civic Records: 98% Conduct score with high emotional intelligence (EQ/SDQ passed).`;
                          } else {
                            summary = `ALEX UNIVERSE - OFFICIAL EXECUTIVE BIOGRAPHY\nAddress: Registered Core Campus Network\nSpecializations: Applied Mathematical Physics and Large-scale Data Architectures\nAcademic Credentials: Fully minted on the Blockchain Ledger for supreme integrity\nInteractions: Completed PISA, Clinical Consultations, and offsite internships.`;
                          }
                          setGeneratedPortfolio(summary);
                          alert("🎉 AI Portfolio Template compiled successfully with custom styles!");
                        }, 1300);
                      }}
                      className="w-full py-3 bg-violet-600 hover:bg-violet-550 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
                    >
                      {isGeneratingPortfolio ? "ระบบ AI กำลังวิเคราะห์ผล..." : "AI เจเนอเรทเทมเพลตเรซูให้อัตโนมัติ (Generate Portfolio)"}
                    </button>

                    {generatedPortfolio && (
                      <div className="space-y-3 pt-3 border-t border-white/5 text-xs text-white">
                        <span className="text-[10px] text-violet-400 font-bold block">AI Generated Draft:</span>
                        <pre className="bg-[#0A0A0A] p-4 rounded-xl border border-white/10 text-[9px] font-mono leading-relaxed overflow-x-auto text-emerald-400 select-all whitespace-pre-wrap">
                          {generatedPortfolio}
                        </pre>
                        <button 
                          onClick={() => alert("💾 ดาวน์โหลดเอกสารและส่งต่อ LinkedIn / อีเมลของคุณแล้ว ความปลอดภัยสมบูรณ์!")}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                        >
                          Export to Digital Wallet / Sign Web3 PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: LEARN-TO-EARN SHOP & ACTIVE COINS LEDGER */}
              {blockchainTab === 'l2e' && (
                <div className="space-y-6">
                  <div className="bg-rose-500/10 p-5 rounded-3xl border border-rose-500/20 space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-rose-400 font-bold text-xs">ระบบ Learn-to-Earn (L2E) Protocol</h4>
                      <div className="flex items-center gap-1 bg-rose-500/20 text-rose-300 font-bold font-mono px-2 py-0.5 rounded text-[10px]">
                        <Coins className="w-3 h-3 text-rose-400 animate-bounce" /> {coins} Coins Balance
                      </div>
                    </div>
                    <p className="text-[11px] text-white/60">สะสมโทเคนเหรียญเรียนรู้เมกะจากการส่งงานตรงเวลา ทำกิจกรรม SDQ สำเร็จ และเข้าทดสอบ PISA</p>
                  </div>

                  {/* Redeem benefits items shop */}
                  <div className="space-y-3">
                    <h5 className="text-white/40 text-[10px] uppercase font-bold tracking-widest pl-1 font-mono">ร้านแลกของรางวัลเกียรติบัตร (Redemption Shop)</h5>
                    <div className="grid grid-cols-1 gap-2.5">
                      {[
                        { id: "rd-1", title: "ใบประกาศเกียรติบัตรฟิสิกส์คลื่นสะกดวิญญาณ (Advanced Certificate)", cost: 100, desc: "เกียรติบัตรอิเล็กทรอนิกส์ลายน้ำสีทองประทับด้วย Private Key รับรองโดยกระทรวงวิทยาศาสตร์จำลอง" },
                        { id: "rd-2", title: "สิทธิ Priority นัดหมายครูส่วนตัวสัปดาห์นี้ (Premium Consulting)", cost: 150, desc: "รับคิวจองพรีเมียมอันดับต้น ไม่ติดโควต้าเวลาปกติ เพื่อความสะดวกสบายอย่างสูงสุด" },
                        { id: "rd-3", title: "เหรียญสมเกียรติคุณยอดนักสมาธิ (Deep Focus badge on chain)", cost: 200, desc: "รางวัลตราประดับดิจิทัลแสดงความทุ่มเทในการเข้าสู่ภาวะโฟกัสด้วยเวลาสะสมรวม 3 ชั่วโมงขึ้นไป" }
                      ].map((item) => {
                        const hasAfforded = coins >= item.cost;
                        const isClaimed = boughtItems.includes(item.id);

                        return (
                          <div key={item.id} className="bg-[#120D12] border border-rose-500/10 p-4 rounded-2.5xl space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <h4 className="text-white text-xs font-bold leading-tight">{item.title}</h4>
                                <p className="text-[10px] text-white/45">{item.desc}</p>
                              </div>
                              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/15 border border-rose-500/25 px-2 py-0.5 rounded-lg whitespace-nowrap">{item.cost} Coins</span>
                            </div>

                            <button
                              onClick={() => {
                                if (isClaimed) {
                                  alert("คุณแลกเกียรติบัตร/สิทธิ์ตัวนี้เรียบร้อยแล้ว!");
                                  return;
                                }
                                if (!hasAfforded) {
                                  alert(`โทเคนเหรียญสะสมไม่เพียงพอ! ขาดอีก ${item.cost - coins} Coins เพื่อแลกสิทธิ์ตัวนี้ ทำแบบประเมินหรือคลังฟิสิกส์เพื่อเร่งสะสมได้!`);
                                  return;
                                }
                                setCoins(c => c - item.cost);
                                setBoughtItems(arr => [...arr, item.id]);
                                alert(`🎉 ขอแสดงความยินดี! แลกรับของรางวัลสำเร็จ!\n\n[ระบบทำการจารึกตราสัญลักษณ์ประวัติเกียรติประวัติของคุณ ด้วย Transaction Signature และส่งเอกสารทางการถึงหน้ากระดานดาวบอร์ดสำเร็จ]`);
                              }}
                              className={`w-full py-2.5 rounded-xl text-[10px] font-bold font-sans cursor-pointer uppercase transition-colors ${
                                isClaimed
                                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                                  : hasAfforded
                                    ? 'bg-rose-500 hover:bg-rose-400 text-white'
                                    : 'bg-white/5 text-white/20 border border-white/5 hover:bg-white/10'
                              }`}
                            >
                              {isClaimed ? "แลกรางวัลแล้ว (Claimed)" : `แลกรับด้วย ${item.cost} Coins`}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 14. SEMANTIC RESEARCH ENGINE */}
      <AnimatePresence>
        {isResearchOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-xl font-bold text-white">Academic Search Engine</h3>
                  <p className="text-[10px] text-blue-400 font-mono font-bold uppercase tracking-widest leading-none">โครงสร้างข้อมูลวิจัย (Data Architecture Center)</p>
                </div>
              </div>
              <button onClick={() => setIsResearchOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            {/* INTERACTIVE DATA ARCHITECTURE PLOTTER (โครงสร้างข้อมูล) */}
            <div className="bg-[#0C101B] border border-blue-500/15 p-5 rounded-3xl space-y-4 mb-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white font-bold flex items-center gap-2">🧬 Visual Data Architecture Simulator</span>
                <span className="text-[8px] text-blue-400 font-mono font-bold bg-blue-950 px-2 py-0.5 rounded">O(log N) - O(1) Real-time</span>
              </div>
              <p className="text-[10px] text-white/50 leading-relaxed">
                คลิกวิเคราะห์ประเมินแบบแผนแนวคิดเรื่อง โครงสร้างระบบฐานข้อมูลจำลอง (Computational Structures) เพื่อความเข้าใจในข้อหลักการ
              </p>

              {/* Structure Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'blockchain', label: 'Ledger Chain', icon: ShieldCheck, desc: 'Hash List' },
                  { id: 'binary-tree', label: 'Binary Tree', icon: Network, desc: 'AVL Balanced' },
                  { id: 'hash-map', label: 'Hash Table', icon: BarChart3, desc: 'Constant O(1)' }
                ].map(struct => {
                  const isActive = activeStructure === struct.id;
                  return (
                    <button
                      key={struct.id}
                      onClick={() => setActiveStructure(struct.id as any)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-blue-600/15 border-blue-500 text-white' 
                          : 'bg-[#0A0A0A] border-white/5 text-white/40 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-bold font-sans">{struct.label}</span>
                      <span className="text-[8px] opacity-70 font-mono mt-0.5">{struct.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic SVG / Canvas Visualization Container based on choice */}
              <div className="w-full h-36 bg-[#030712] border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden p-2">
                
                {/* 1. BLOCKCHAIN VIEW */}
                {activeStructure === 'blockchain' && (
                  <div className="flex items-center gap-3 relative z-10 w-full justify-center">
                    {[
                      { idx: "1", hash: "0x2e11", prev: "0x000" },
                      { idx: "2", hash: "0x9a8f", prev: "0x2e11" },
                      { idx: "3", hash: "0x7d04", prev: "0x9a8f" }
                    ].map((blk, i) => (
                      <React.Fragment key={i}>
                        <div className="p-2.5 bg-amber-950/20 border border-amber-500/30 rounded-xl text-center font-mono space-y-0.5 text-[8px] w-24">
                          <div className="text-amber-400 font-bold">Block #{blk.idx}</div>
                          <div className="text-white/60">Hash: {blk.hash}</div>
                          <div className="text-white/30 text-[7px]">Prev: {blk.prev}</div>
                        </div>
                        {i < 2 && (
                          <span className="text-amber-500/40 text-xs font-extrabold font-mono flex-shrink-0">➜</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* 2. BINARY TREE VIEW */}
                {activeStructure === 'binary-tree' && (
                  <svg className="w-56 h-28 relative z-10" viewBox="0 0 100 50">
                    {/* Root Node */}
                    <circle cx="50" cy="10" r="4" fill="#3B82F6" />
                    <text x="50" y="20" fill="white" fontSize="4" textAnchor="middle">Root: Level 1</text>
                    
                    {/* Level 2 lines */}
                    <line x1="50" y1="10" x2="30" y2="25" stroke="#334155" strokeWidth="0.8" />
                    <line x1="50" y1="10" x2="70" y2="25" stroke="#334155" strokeWidth="0.8" />
                    
                    {/* Level 2 Nodes */}
                    <circle cx="30" cy="25" r="4" fill="#10B981" />
                    <text x="30" y="34" fill="white" fontSize="4" textAnchor="middle">Left: O(log N)</text>
                    <circle cx="70" cy="25" r="4" fill="#10B981" />
                    <text x="70" y="34" fill="white" fontSize="4" textAnchor="middle">Right: O(log N)</text>

                    {/* Level 3 line sub-branches */}
                    <line x1="30" y1="25" x2="20" y2="40" stroke="#334155" strokeWidth="0.5" />
                    <line x1="30" y1="25" x2="40" y2="40" stroke="#334155" strokeWidth="0.5" />
                    <circle cx="20" cy="40" r="2.5" fill="#EF4444" />
                    <circle cx="40" cy="40" r="2.5" fill="#EF4444" />
                  </svg>
                )}

                {/* 3. HASH MAP VIEW */}
                {activeStructure === 'hash-map' && (
                  <div className="w-full text-center space-y-2 relative z-10 p-1 font-mono text-[9px]">
                    <div className="flex items-center justify-center gap-2 text-white">
                      <span className="p-1.5 bg-white/5 border border-white/5 rounded">Key: "Student Name"</span>
                      <span className="text-blue-400">⚡ hashFn()</span>
                      <span className="p-1.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300">Bucket Index: #42</span>
                    </div>
                    <div className="text-[8px] text-white/40">
                      Constant time lookups: <strong className="text-emerald-400 text-[10px]">O(1) complexity</strong> (ไม่จำกัดปริมานข้อมูล)
                    </div>
                  </div>
                )}

                {/* Absolute background matrix grid */}
                <div className="absolute inset-0 bg-radial from-blue-500/5 to-transparent pointer-events-none" />
              </div>

              {/* Quick Preset Query Tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-white/40 font-mono block">สลักค้นหาหัวข้อด่วน (Quick Search Presets)</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Data Architecture", "Blockchain", "Binary Trees", "Algorithms", "Hash-Maps", "Cognitive Learning"
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        setFilteredPapers(RESEARCH_PAPERS.filter(p => 
                          p.title.toLowerCase().includes(tag.toLowerCase()) || 
                          p.abstract.toLowerCase().includes(tag.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
                        ));
                        setSearchFeedback(`Semantic database resolved ${RESEARCH_PAPERS.filter(p => 
                          p.title.toLowerCase().includes(tag.toLowerCase()) || 
                          p.abstract.toLowerCase().includes(tag.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
                        ).length} matches for "${tag}" tag`);
                      }}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white/70 hover:text-white rounded-lg text-[9px] font-mono border border-white/5 cursor-pointer"
                    >
                      # {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Fuzzy Input Form */}
            <form onSubmit={handleSemanticSearch} className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Search quantum, climate change, marine, data architecture..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white/5 p-4 rounded-2xl text-xs text-white border border-white/10 focus:outline-none"
              />
              <button 
                type="submit"
                className="px-5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-bold uppercase text-white cursor-pointer"
              >
                Search
              </button>
            </form>

            {searchFeedback && (
              <div className="mb-4 text-[10px] text-emerald-400 font-mono pl-1">{searchFeedback}</div>
            )}

            <div className="flex-1 overflow-y-auto space-y-4 pb-12 scrollbar-hide pr-1">
              {filteredPapers.map(paper => (
                <div key={paper.id} className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[8px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase">{paper.ranking} • {paper.journal}</span>
                      <h4 className="text-white text-xs font-black mt-2 leading-tight">{paper.title}</h4>
                    </div>
                    <span className="text-[10px] text-white/30 font-mono">#{paper.year}</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed italic">{paper.abstract}</p>
                  
                  {/* Paper tags visualization */}
                  <div className="flex flex-wrap gap-1">
                    {paper.tags.map((t, i) => (
                      <span key={i} className="text-[8px] bg-white/5 text-white/40 px-2 py-0.5 rounded font-mono">@{t}</span>
                    ))}
                  </div>

                  <div className="flex justify-between text-[10px] text-white/40 pt-2 border-t border-white/5 font-mono">
                    <span>Impact Factor: {paper.impactFactor}</span>
                    <span>Citations: {paper.citations}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 15. AFTER-HOURS EDUCATION CLINIC */}
      <AnimatePresence>
        {isClinicOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Stethoscope className="w-6 h-6 text-emerald-500" /> Education Clinic</h3>
              <button onClick={() => setIsClinicOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-emerald-500/10 p-5 rounded-3xl border border-emerald-500/20 text-xs text-emerald-400 leading-relaxed font-mono">
                Diagnostic & IEP tracking clinic. Queue booking is online active.
              </div>

              <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3">
                <h4 className="text-white font-bold text-sm">Individualized IEP Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Skill analysis task complete</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full"></div>
                  </div>
                  <div className="text-[10px] text-white/40 leading-relaxed">Personalized IEP prescription recommends AP wave motion review on Tuesdays.</div>
                </div>
              </div>

              <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3">
                <h4 className="text-white font-bold text-sm">Clinical Counseling Schedule</h4>
                <div className="flex justify-between items-center bg-[#0A0A0A] p-3 rounded-xl border border-white/5">
                  <span className="text-xs text-white">Next: Psychological wellness check</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Booked (May 28)</span>
                </div>
                <button 
                  onClick={() => alert("📅 Mental health counselling request slot locked in for next Thursday. Automated calendar alert sent.")}
                  className="w-full py-3 bg-emerald-600 text-white font-bold text-xs uppercase rounded-xl"
                >
                  Book Counselling Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 16. STUDENT PAY MODAL */}
      <AnimatePresence>
        {isPayOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CreditCard className="w-6 h-6 text-orange-500" /> Student Pay (Canteen)</h3>
              <button onClick={() => setIsPayOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-gradient-to-br from-orange-600 to-amber-700 p-6 rounded-3xl text-center shadow-xl">
                <div className="text-[10px] text-white/60 uppercase tracking-widest font-mono">Cafeteria Active Balance</div>
                <div className="text-4xl font-mono font-black text-white py-2">฿ 2,450.00</div>
                <div className="text-[10px] text-white/40 font-mono">Synced with Parent Account</div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Self-Canteen Purchase Check</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { meal: "Hainanese Chicken Rice", cost: 45 },
                    { meal: "Phad Thai with Tofu", cost: 50 },
                    { meal: "Organic Smoothie Juice", cost: 30 },
                    { meal: "High-protein Soy Milk", cost: 15 }
                  ].map((food, i) => (
                    <button 
                      key={i}
                      onClick={() => buyCanteenMeal(food.meal, food.cost)}
                      className="p-4 bg-white/5 hover:bg-white/10 text-left border border-white/5 rounded-2.5xl cursor-pointer transition-all space-y-1"
                    >
                      <div className="text-xs text-white font-bold">{food.meal}</div>
                      <div className="text-sm font-mono font-bold text-orange-400">฿ {food.cost}</div>
                    </button>
                  ))}
                </div>
              </div>

              {payStatus && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 rounded-2xl font-mono">
                  {payStatus}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation spacer */}
      <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center justify-around px-4 shadow-2xl">
        <button className="p-2 text-rose-500 cursor-pointer"><LayoutDashboard className="w-6 h-6" /></button>
        <button onClick={() => setIsChatOpen(true)} className="p-2 text-white/40 cursor-pointer"><MessageSquare className="w-6 h-6" /></button>
        <div className="w-12 h-12 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-full flex items-center justify-center -translate-y-6 shadow-xl border-4 border-[#0A0A0A]">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <button onClick={() => setIsCalendarOpen(true)} className="p-2 text-white/40 cursor-pointer"><Calendar className="w-6 h-6" /></button>
        <button onClick={() => alert("Settings toggled! Educational profile matches system default standards.")} className="p-2 text-white/40 cursor-pointer"><Settings className="w-6 h-6" /></button>
      </div>
    </motion.div>
  );
}
