import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Users, Clock, Navigation, MapPinned, 
  MessageSquare, Settings, Sparkles, Book, Newspaper, CreditCard, 
  Network, Microscope, Target, Headset, Smile, CalendarCheck, 
  LayoutDashboard, HeartPulse, BrainCircuit, MessageCircle, 
  ClipboardCheck, Monitor, Award, Stethoscope, Activity, Cpu, 
  ShieldCheck, BarChart3, Plus, Check, Play, Pause, Coins, Flame,
  FileText, Download, Send, User, ChevronRight, Sliders, CheckSquare, Trash2
} from 'lucide-react';
import { 
  STUDENTS_LIST, HOMEWORK_LIST, DAO_PROPOSALS,
  Student, Homework 
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

export default function TeacherDashboard({ onLogout }: { onLogout: () => void }) {
  // Navigation modal states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [attendanceViewTab, setAttendanceViewTab] = useState<'daily' | 'semester'>('daily');
  const [selectedStuSummary, setSelectedStuSummary] = useState('stu-1');
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSupportSystemOpen, setIsSupportSystemOpen] = useState(false);
  const [isSdqOpen, setIsSdqOpen] = useState(false);
  const [isCommOpen, setIsCommOpen] = useState(false);
  const [isLeaveApprovalOpen, setIsLeaveApprovalOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isLessonOpen, setIsLessonOpen] = useState(false);

  // States
  const [students, setStudents] = useState<Student[]>(STUDENTS_LIST);
  const [attendance, setAttendance] = useState<Record<string, 'Present' | 'Late' | 'Leave' | 'Absent'>>({
    'stu-1': 'Present',
    'stu-2': 'Present',
    'stu-3': 'Late',
    'stu-4': 'Present'
  });

  const [flagAttendance, setFlagAttendance] = useState<Record<string, 'Present' | 'Absent'>>({
    'stu-1': 'Present',
    'stu-2': 'Present',
    'stu-3': 'Absent',
    'stu-4': 'Present'
  });

  // 5-Step Support System Tabs
  const [supportTab, setSupportTab] = useState<'info' | 'screening' | 'visits' | 'referral'>('info');
  const [studentRisk, setStudentRisk] = useState<Record<string, 'Normal' | 'At Risk' | 'Problem'>>({
    'stu-1': 'Normal',
    'stu-2': 'Normal',
    'stu-3': 'At Risk',
    'stu-4': 'Normal'
  });
  const [homeVisitNotes, setHomeVisitNotes] = useState<Record<string, string>>({
    'stu-1': 'Alex has excellent study setup; parent is very supportive.',
    'stu-3': 'Jordan struggles with focus at home and lacks laptop.'
  });
  const [referralList, setReferralList] = useState<Array<{ name: string; type: string; status: string }>>([
    { name: 'Jordan Comet', type: 'Clinical Wellness Counselor', status: 'Pending Intake' }
  ]);
  const [referralName, setReferralName] = useState("Jordan Comet");
  const [referralType, setReferralType] = useState("Wellness Psychology");

  // Communication / Homework post states
  const [homeworks, setHomeworks] = useState<Homework[]>(HOMEWORK_LIST);
  const [newHwSubject, setNewHwSubject] = useState("AP Physics");
  const [newHwTitle, setNewHwTitle] = useState("");
  const [newHwDesc, setNewHwDesc] = useState("");
  const [newHwDate, setNewHwDate] = useState("2026-06-15");

  const [newsfeed, setNewsfeed] = useState<Array<{ title: string; category: string; date: string }>>([
    { title: 'Annual STEM Chemistry Expo 2026', category: 'General', date: '2026-06-03' }
  ]);
  const [newNewsTitle, setNewNewsTitle] = useState("");

  const [parentChatMessages, setParentChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Helen Universe (Parent)', text: 'Hello Prof. Orion! Alex mentioned AP wave motion homework. Is there a simulator for that?', time: '09:12 AM' },
    { sender: 'You', text: 'Yes, Helen. Tell Alex to check the 3D Holographic simulator inside Classroom Hub.', time: '09:14 AM' }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Leave Approvals states
  const [pendingLeaves, setPendingLeaves] = useState<Array<{ id: string; parent: string; kid: string; reason: string; type: string; status: 'Pending' | 'Approved' | 'Rejected' }>>([
    { id: 'l-1', parent: 'Helen Universe', kid: 'Alex Universe', reason: 'High fever and clinic checkup', type: 'Sick Leave', status: 'Pending' },
    { id: 'l-2', parent: 'C Comet Group', kid: 'Jordan Comet', reason: 'Family business travel', type: 'Personal Leave', status: 'Pending' }
  ]);

  // Volunteer approval logs
  const [volunteerLogs, setVolunteerLogs] = useState<Array<{ id: string; kid: string; task: string; hours: number; status: 'Pending' | 'Approved' }>>([
    { id: 'v-1', kid: 'Alex Universe', task: 'Math peer mentorship leader', hours: 5, status: 'Pending' },
    { id: 'v-2', kid: 'Taylor Sparks', task: 'Library tech catalogue scanning', hours: 3, status: 'Pending' }
  ]);

  // Teaching Observation logs
  const [lessonsFeed, setLessonsFeed] = useState<Array<{ id: string; title: string; date: string; score: number; notes: string }>>([
    { id: 'les-1', title: 'AP Waves & Silicon Microchips', date: '2026-06-02', score: 95, notes: 'Stellar dynamic graphics, high adaptive pace!' }
  ]);
  const [newObsTitle, setNewObsTitle] = useState("");
  const [newObsScore, setNewObsScore] = useState(90);
  const [newObsNotes, setNewObsNotes] = useState("");

  const [isBlockchainOpen, setIsBlockchainOpen] = useState(false);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const [selectedStudentBlockchain, setSelectedStudentBlockchain] = useState<string>('stu-1');
  const [blockchainTab, setBlockchainTab] = useState<'credentials' | 'passport' | 'l2e' | 'mints'>('credentials');
  
  // Custom student blockchain states
  const [studentCoins, setStudentCoins] = useState<Record<string, number>>({
    'stu-1': 350,
    'stu-2': 420,
    'stu-3': 150,
    'stu-4': 280
  });

  const [mintStatus, setMintStatus] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [newMintBadge, setNewMintBadge] = useState("AP Physics Waves Expert");

  const [studentBadges, setStudentBadges] = useState<Record<string, Array<{ code: string; title: string; hash: string; block: number; date: string }>>>({
    'stu-1': [
      { code: 'AP-PHY-MOD-01', title: 'AP Physics Modern Champion', hash: '0x39a14bc2178d4ea88a1010a01fa2ff011119b', block: 44198, date: '2026-06-01' },
      { code: 'CALC-LNX-420', title: 'Calculus Linear Transformations Master', hash: '0xe8112abdc917fe438101a0be5fddfb890012', block: 44245, date: '2026-06-03' },
      { code: 'CS-ALGO-EFF-02', title: 'Algorithmic Efficiency Practitioner', hash: '0xda920fbdf9432fadc10be6a89c8ed4582a4d', block: 44299, date: '2026-06-05' }
    ],
    'stu-2': [
      { code: 'AP-CHM-03', title: 'Advanced Chemistry Polymer Catalyst', hash: '0x49f1bc42178d4ea88a1010a01fa2ff01124', block: 43220, date: '2026-05-20' },
      { code: 'SDQ-PERFECT-A', title: 'Perfect Conduct Merit', hash: '0x32eef0119ae22bc42178d4ea88a1010a01fa2', block: 44102, date: '2026-05-31' }
    ],
    'stu-3': [
      { code: 'SDQ-PERFECT-A', title: 'Perfect Conduct Merit', hash: '0x10a01fa2ff011119bc42178d4ea8a1010a01fa23', block: 43901, date: '2026-05-25' }
    ],
    'stu-4': [
      { code: 'CS-ALGO-EFF-02', title: 'Algorithmic Efficiency Practitioner', hash: '0xfa2bc42178d4ea8a1010a01fa2ff011119b4ef', block: 44211, date: '2026-06-02' }
    ]
  });

  const [studentL2ELogs, setStudentL2ELogs] = useState<Record<string, Array<{ id: string; title: string; cost: number; date: string; type: 'Earn' | 'Claim' }>>>({
    'stu-1': [
      { id: 'tx-1', title: 'Focus study duration completion (+50 Coins)', cost: 50, date: '2026-06-07', type: 'Earn' },
      { id: 'tx-2', title: 'SDQ behavioral questionnaire success (+35 Coins)', cost: 35, date: '2026-06-06', type: 'Earn' },
      { id: 'tx-3', title: 'Interactive Mechanics Lab submission (+15 Coins)', cost: 15, date: '2026-06-05', type: 'Earn' }
    ],
    'stu-2': [
      { id: 'tx-a', title: 'Daily PISA challenge full score (+50 Coins)', cost: 50, date: '2026-06-06', type: 'Earn' },
      { id: 'tx-b', title: 'AP Waves microelectronics test completion (+35 Coins)', cost: 35, date: '2026-06-06', type: 'Earn' }
    ],
    'stu-3': [
      { id: 'tx-c', title: 'Focus meditation 1 hour session (+50 Coins)', cost: 50, date: '2026-06-05', type: 'Earn' }
    ],
    'stu-4': [
      { id: 'tx-d', title: 'Volunteer peer academic leadership service (+50 Coins)', cost: 50, date: '2026-06-07', type: 'Earn' }
    ]
  });

  // Handlers
  const toggleAttendance = (kidId: string) => {
    setAttendance(prev => {
      const current = prev[kidId];
      let next: 'Present' | 'Late' | 'Leave' | 'Absent' = 'Present';
      if (current === 'Present') next = 'Late';
      else if (current === 'Late') next = 'Leave';
      else if (current === 'Leave') next = 'Absent';
      return { ...prev, [kidId]: next };
    });
  };

  const toggleFlag = (kidId: string) => {
    setFlagAttendance(prev => {
      const next = prev[kidId] === 'Present' ? 'Absent' : 'Present';
      return { ...prev, [kidId]: next };
    });
  };

  const handleAddReferral = (e: React.FormEvent) => {
    e.preventDefault();
    setReferralList(curr => [...curr, { name: referralName, type: referralType, status: 'Approved & forwarded' }]);
  };

  const handlePostHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHwTitle) return;
    const newHw: Homework = {
      id: 'hw-gen-' + Date.now(),
      subject: newHwSubject,
      title: newHwTitle,
      description: newHwDesc,
      dueDate: newHwDate,
      status: 'Pending'
    };
    setHomeworks(prev => [newHw, ...prev]);
    setNewHwTitle("");
    setNewHwDesc("");
    showToast("🚀 Complete: homework assignment dispatched to all registered student calendars!");
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle) return;
    setNewsfeed(curr => [{ title: newNewsTitle, category: 'General', date: 'Today' }, ...curr]);
    setNewNewsTitle("");
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setParentChatMessages(curr => [...curr, { sender: 'You', text: chatInput, time: now }]);
    setChatInput("");
    setTimeout(() => {
      setParentChatMessages(curr => [
        ...curr,
        { sender: 'Helen Universe (Parent)', text: 'Thank you for the update Prof. Orion! Synced successfully.', time: 'Just now' }
      ]);
    }, 1200);
  };

  const handleApproval = (id: string, decision: 'Approved' | 'Rejected') => {
    setPendingLeaves(curr => curr.map(item => item.id === id ? { ...item, status: decision } : item));
  };

  const approveVolunteer = (id: string) => {
    setVolunteerLogs(curr => curr.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    showToast("Voluntary service hours index certified on educational ledger!");
  };

  const handleAddObs = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObsTitle) return;
    setLessonsFeed(curr => [
      { id: 'obs-' + Date.now(), title: newObsTitle, score: newObsScore, notes: newObsNotes, date: 'Today' },
      ...curr
    ]);
    setNewObsTitle("");
    setNewObsNotes("");
  };

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
            <div className="w-12 h-12 rounded-full border-2 border-amber-500 p-0.5">
              <img 
                src="https://picsum.photos/seed/teacher/100/100" 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Prof. Orion Reynolds</h3>
              <p className="text-amber-400 text-[10px] uppercase tracking-widest font-mono">Senior Science Educator</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-28">
        {/* Statistics Panels */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-amber-500/10 p-4 rounded-3xl border border-amber-500/20">
            <div className="text-[9px] font-bold text-amber-450 uppercase tracking-widest mb-1">Active Classes</div>
            <div className="text-2xl font-bold font-mono text-white">4 Semesters</div>
          </div>
          <div className="bg-indigo-500/10 p-4 rounded-3xl border border-indigo-500/20">
            <div className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Students</div>
            <div className="text-2xl font-bold font-mono text-white">128 Enrolled</div>
          </div>
        </div>

        {/* Feature Icons Grid - Full 10 buttons for Teacher */}
        <div>
          <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Classroom Administration & Student Portfolios</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <FeatureItem icon={Clock} label="เช็คชื่อรายคาบ" color="bg-amber-500" onClick={() => setIsAttendanceOpen(true)} />
            <FeatureItem icon={Navigation} label="เช็คหน้าเสาธง" color="bg-orange-500" onClick={() => setIsFlagOpen(true)} />
            <FeatureItem icon={MapPinned} label="สถิติ เข้า-ออก" color="bg-rose-500" onClick={() => setIsLogOpen(true)} />
            <FeatureItem icon={HeartPulse} label="ดูแลช่วยเหลือ (5 ขั้น)" color="bg-rose-600" onClick={() => setIsSupportSystemOpen(true)} />
            <FeatureItem icon={BrainCircuit} label="ประเมินพฤติกรรม SDQ" color="bg-purple-500" onClick={() => setIsSdqOpen(true)} />
            <FeatureItem icon={MessageCircle} label="สื่อสาร & สั่งการบ้าน" color="bg-blue-500" onClick={() => setIsCommOpen(true)} />
            <FeatureItem icon={CalendarCheck} label="พิจารณาอนุมัติลา" color="bg-indigo-500" onClick={() => setIsLeaveApprovalOpen(true)} />
            <FeatureItem icon={Sparkles} label="อนุมัติจิตอาสา" color="bg-teal-600" onClick={() => setIsVolunteerOpen(true)} />
            <FeatureItem icon={ClipboardCheck} label="นิเทศการสอนวิจัย" color="bg-slate-600" onClick={() => setIsLessonOpen(true)} />
            <FeatureItem icon={ShieldCheck} label="ตรวจสอบบล็อกเชน" color="bg-emerald-600 font-bold" onClick={() => setIsBlockchainOpen(true)} />
          </div>
        </div>

         {/* AI Copilot Widget */}
         <button 
           onClick={() => setIsAiCopilotOpen(true)}
           className="w-full text-left bg-gradient-to-br from-indigo-950 via-[#120f26] to-slate-900 border border-violet-500/25 rounded-[2.5rem] p-6 relative overflow-hidden group hover:border-violet-500/40 active:scale-99 transition-all cursor-pointer"
         >
           <div className="absolute top-0 right-0 p-4 opacity-15 group-hover:scale-110 group-hover:rotate-6 transition-transform">
             <Cpu className="w-16 h-16 text-violet-400" />
           </div>
           <div className="relative z-10 space-y-3">
             <div className="flex items-center gap-2">
               <span className="text-[9px] bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                 AI Copilot Analysis
               </span>
               <span className="text-[9px] text-[#FF5D5D] font-mono font-bold uppercase animate-pulse">
                 ● 3 High-Alerts
               </span>
             </div>
             <div>
               <h4 className="text-white font-extrabold text-lg leading-tight">วิเคราะห์กลุ่มเสี่ยง & กำหนดบทเรียนเสริม</h4>
               <p className="text-[11.5px] text-white/70 leading-relaxed mt-1 font-sans">
                 Jordan Comet มีดัชนีจดจ่อ (Focus Quotient) ต่ำกว่าเกณฑ์คาบเรียนแอปเปิิล และอีก 2 คนมีพัฒนาการฟิสิกส์กลศาสตร์ช้า แตะเพื่อเปิดแผงวิเคราะห์และส่งยารักษาจุดอ่อน AI
               </p>
             </div>
           </div>
         </button>
      </div>

      {/* --- ALL MODULE MODALS --- */}

      {/* 1. CLASSROOM PERIOD ATTENDANCE */}
      <AnimatePresence>
        {isAttendanceOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-6 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-amber-500 animate-pulse" />
                <div>
                  <h3 className="text-xl font-bold text-white">Classroom Attendance Center</h3>
                  <p className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider leading-none font-sans">คลังควบคุมและวิเคราะห์รายงานการมาเรียนสะสมทั้งหมดยกห้องเรียน</p>
                </div>
              </div>
              <button onClick={() => setIsAttendanceOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer hover:bg-white/10 transition-colors"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            {/* Attendance Navigation View Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-6 bg-white/5 p-1 rounded-2xl border border-white/5 max-w-md mx-auto w-full select-none">
              <button 
                onClick={() => setAttendanceViewTab('daily')}
                className={`py-2 text-[10.5px] font-bold rounded-xl transition-all cursor-pointer ${attendanceViewTab === 'daily' ? 'bg-amber-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                เช็คชื่อรายคาบวันนี้
              </button>
              <button 
                onClick={() => setAttendanceViewTab('semester')}
                className={`py-2 text-[10.5px] font-bold rounded-xl transition-all cursor-pointer ${attendanceViewTab === 'semester' ? 'bg-amber-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                สรุปภาพรวมรายภาคการศึกษา
              </button>
            </div>

            <div className="space-y-6 flex-1 max-w-5xl mx-auto w-full select-none pb-12">
              
              {attendanceViewTab === 'daily' ? (
                <div className="space-y-6">
                  <div className="bg-white/5 p-4 rounded-2.5xl border border-white/10 text-xs text-white/70 leading-relaxed font-sans">
                    💡 คลิกที่กล่องของนักเรียนแต่ละคนเพื่อระบุสถานะ: **มา (Present)** ➔ **สาย (Late)** ➔ **ลา (Leave)** ➔ **ขาดเยียน (Absent)** ระบบจะบันทึกพร้อมผูกเข้าบัญชีเงินเหรียญสะสม L2E ซิงค์ทันทีแบบ Real-time
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {students.map(stu => (
                      <button 
                        key={stu.id} 
                        onClick={() => toggleAttendance(stu.id)}
                        className="w-full bg-[#111] p-4.5 rounded-2.5xl border border-white/5 flex justify-between items-center text-left hover:bg-white/5 active:scale-98 transition-all cursor-pointer"
                      >
                        <div>
                          <div className="text-white text-xs font-bold font-sans">{stu.name}</div>
                          <div className="text-[9.5px] text-white/45 font-mono">{stu.grade} • ID: {stu.id.toUpperCase()}</div>
                        </div>
                        <span className={`text-[10px] font-bold font-mono px-3 py-1.5 rounded-xl border ${
                          attendance[stu.id] === 'Present' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                          attendance[stu.id] === 'Late' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                          attendance[stu.id] === 'Leave' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                          'bg-rose-500/10 border-rose-500/20 text-rose-450 text-rose-400'
                        }`}>{attendance[stu.id]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* SEMESTER COMPREHENSIVE VIEW ON TEACHER SIDE */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Overall class stat & Student Matrix table list */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Overall Class KPI Card */}
                    <div className="bg-gradient-to-r from-amber-950/40 via-[#191510]/80 to-amber-950/25 border border-amber-500/20 p-5 rounded-3xl">
                      <span className="text-[9.5px] text-amber-500 font-mono font-bold tracking-widest block uppercase">ภาพรวมการมาเรียนทั้งเลขาคณิต (Class Cumulative Rate)</span>
                      <div className="flex items-baseline gap-2 mt-1.5 font-mono">
                        <span className="text-3xl font-black text-white">95.8%</span>
                        <span className="text-[11px] text-[#A6FF96] font-bold text-emerald-400">● เกณฑ์ดีเยี่ยม (Excellent)</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-normal mt-1 font-sans">
                        มีนักเรียนลงสถิติมาเรียนสม่ำเสมอเกิน 95% สูงถึง 3 คน และมีผู้เรียนอยู่ความเสี่ยงดูแลพิเศษ 1 คน (Jordan Comet)
                      </p>
                    </div>

                    {/* Student List Matrix */}
                    <div className="bg-white/5 border border-white/5 p-4 rounded-3.5xl space-y-3">
                      <span className="text-[10px] text-white/40 font-mono font-bold uppercase tracking-wider pl-1 block">คลังตารางสถิติจำแนกรายบุคคล (Click to investigate)</span>
                      <div className="space-y-2">
                        {[
                          { id: 'stu-1', name: 'Alex Universe', rate: '96.5%', label: 'มา 86 | สาย 2 | ลา 2', statusText: 'สม่ำเสมอ', style: 'text-emerald-450 text-emerald-400 border-emerald-550/20' },
                          { id: 'stu-2', name: 'Taylor Sparks', rate: '94.4%', label: 'มา 85 | สาย 1 | ลา 3 | ขาด 1', statusText: 'คงเส้นคงวา', style: 'text-emerald-450 text-emerald-400 border-white/5' },
                          { id: 'stu-3', name: 'Jordan Comet', rate: '88.8%', label: 'มา 80 | สาย 4 | ลา 4 | ขาด 2', statusText: 'ต้องปรับปรุง', style: 'text-rose-400 border-rose-500/15' },
                          { id: 'stu-4', name: 'Morgan Nebula', rate: '100%', label: 'มา 90 | สาย 0 | ลา 0', statusText: 'สมบูรณ์ดี', style: 'text-emerald-400 border-emerald-500/20' }
                        ].map(stuItem => (
                          <button
                            key={stuItem.id}
                            onClick={() => setSelectedStuSummary(stuItem.id)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex justify-between items-center cursor-pointer ${
                              selectedStuSummary === stuItem.id 
                                ? 'bg-amber-600/15 border-amber-500/40 text-white' 
                                : 'bg-[#111] hover:bg-white/5 border-white/5'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-2 font-sans">
                                {stuItem.name}
                                {selectedStuSummary === stuItem.id && <span className="text-[8px] bg-amber-500 text-white font-bold font-mono px-1.5 py-0.5 rounded-full uppercase">Investigating</span>}
                              </div>
                              <span className="text-[10px] text-white/45 block tracking-tight font-sans mt-0.5">{stuItem.label}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black font-mono block text-white">{stuItem.rate}</span>
                              <span className="text-[8px] uppercase tracking-wider block text-white/40">{stuItem.statusText}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Drill Down into selected student's semester calendar heatmap & monthly analytics */}
                  <div className="lg:col-span-6 space-y-4">
                    
                    {/* Selected Student Profile Drill Down */}
                    <div className="bg-[#111] border border-white/15 p-5 rounded-3.5xl space-y-4">
                      
                      {/* Name Header and summary */}
                      <div className="flex justify-between items-start pb-3 border-b border-white/5">
                        <div className="space-y-0.5">
                          <span className="text-[9px] uppercase font-mono font-bold text-amber-500">รายงานข้อมูลเชิงลึก (Deep Dive Drill logs)</span>
                          <h4 className="text-white text-md font-black font-sans">
                            {students.find(s => s.id === selectedStuSummary)?.name || 'Alex Universe'}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-mono font-black text-amber-400">
                            {selectedStuSummary === 'stu-1' ? '96.5%' : selectedStuSummary === 'stu-2' ? '94.4%' : selectedStuSummary === 'stu-3' ? '88.8%' : '100%'}
                          </span>
                          <span className="text-[9px] text-white/40 block leading-none font-sans">อัตราการมาเรียนในระบบ</span>
                        </div>
                      </div>

                      {/* 90-Days Contribution/Attendance grid for selected student */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-white/45">ตารางเรียนสะสม 90 วันในสมรรถนะปัญญา</span>
                          <span className="text-[#FFCD4B] font-bold">1/2569 Active Registry</span>
                        </div>

                        {/* Interactive Grid visualization */}
                        <div className="grid grid-cols-15 gap-1 font-mono">
                          {Array.from({ length: 90 }, (_, i) => {
                            let cellStatus: 'Present' | 'Late' | 'Leave' | 'Absent' = 'Present';
                            let col = 'bg-emerald-600/90';

                            // Seat status matching selected student
                            if (selectedStuSummary === 'stu-1') {
                              if (i === 12 || i === 72) { cellStatus = 'Late'; col = 'bg-yellow-500'; }
                              else if (i === 34 || i === 81 || i === 88) { cellStatus = 'Leave'; col = 'bg-blue-500'; }
                              else if (i === 55) { cellStatus = 'Absent'; col = 'bg-rose-600'; }
                            } else if (selectedStuSummary === 'stu-2') {
                              if (i === 5) { cellStatus = 'Late'; col = 'bg-yellow-500'; }
                              else if (i === 18 || i === 29 || i === 44) { cellStatus = 'Leave'; col = 'bg-blue-500'; }
                              else if (i === 62) { cellStatus = 'Absent'; col = 'bg-rose-600'; }
                            } else if (selectedStuSummary === 'stu-3') {
                              // Jordan Comet - higher risk
                              if (i % 15 === 0) { cellStatus = 'Late'; col = 'bg-yellow-500'; }
                              else if (i % 22 === 0) { cellStatus = 'Leave'; col = 'bg-blue-500'; }
                              else if (i % 38 === 0) { cellStatus = 'Absent'; col = 'bg-rose-600'; }
                            } else {
                              // 100% attendance list for Morgan
                              cellStatus = 'Present';
                            }

                            return (
                              <div 
                                key={i} 
                                title={`Day ${i + 1}`}
                                className={`aspect-square rounded-sm border border-black/20 ${col} text-[6.5px] font-bold flex items-center justify-center text-black/50 hover:scale-120 transition-all cursor-crosshair`}
                              >
                                {i + 1}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-between items-center text-[8.5px] text-white/40 pt-1 font-mono">
                          <span>วันจันทร์ (Day 1)</span>
                          <div className="flex gap-2">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-600 inline-block" /> มา</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-yellow-500 inline-block" /> สาย</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500 inline-block" /> ลา</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-rose-600 inline-block" /> ขาด</span>
                          </div>
                        </div>
                      </div>

                      {/* Specific Monthly Analysis for Chosen Student */}
                      <div className="space-y-3 font-sans border-t border-white/5 pt-4">
                        <span className="text-[10px] text-white/45 font-mono uppercase font-bold tracking-widest block">สถิติล่าสุดรายเดือน (Monthly Analysis logs)</span>
                        <div className="grid grid-cols-2 gap-2.5 text-xs">
                          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1">
                            <div className="flex justify-between font-bold">
                              <span className="text-white">มิถุนายน 2026</span>
                              <span className="text-emerald-450 text-emerald-400">100%</span>
                            </div>
                            <span className="text-[9.5px] text-white/40 block">มาครบบรรจุเป้าการจดจ่อ</span>
                          </div>

                          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1">
                            <div className="flex justify-between font-bold">
                              <span className="text-white">พฤษภาคม 2026</span>
                              <span className="text-amber-400 font-mono">
                                {selectedStuSummary === 'stu-3' ? '82%' : '96%'}
                              </span>
                            </div>
                            <span className="text-[9.5px] text-white/40 block">อิงสถิติมอบเกียรติบัตรรุ่น</span>
                          </div>
                        </div>
                      </div>

                      {/* Instructor Action items */}
                      <div className="bg-white/5 p-4 rounded-2.5xl space-y-2 border border-white/5">
                        <span className="text-[9px] text-amber-500 font-mono font-bold uppercase tracking-wider block">★ ACTION DESK (การดำเนินการทางการบันทึกผู้สอน)</span>
                        <p className="text-[11px] text-white/70 leading-relaxed font-sans">
                          {selectedStuSummary === 'stu-3' 
                            ? 'แนะนำให้ครูประสานตรวจวัดร่วมกับระบบจิตการเวทและส่ง "ใบสั่งยา AI แก้อุปสรรคสติสัมปชัญญะ" โดยทันทีเพื่อไม่ให้ดัชนีคะแนนสะสมขยับต่ำลงไปอีก'
                            : 'เด็กอยู่ในเกณฑ์พฤติกรรมยอดเยี่ยม คงตัวเร่งระดับวิถีความยากการสเกลโครงสร้างอัลกอริทึมวิจัยได้ตามเดิม'
                          }
                        </p>
                      </div>

                    </div>
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLAG CEREMONY ATTENDANCE */}
      <AnimatePresence>
        {isFlagOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Navigation className="w-6 h-6 text-orange-500" /> Flag Ceremony</h3>
              <button onClick={() => setIsFlagOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="space-y-2">
                {students.map(stu => (
                  <button 
                    key={stu.id}
                    onClick={() => toggleFlag(stu.id)}
                    className="w-full bg-white/5 p-4 border border-white/5 rounded-2xl flex justify-between items-center text-left hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <span className="text-white text-xs font-bold">{stu.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-lg ${
                      flagAttendance[stu.id] === 'Present' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                    }`}>{flagAttendance[stu.id]}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. STUDENT PORT / RUNNING ENTRY/EXIT LOG */}
      <AnimatePresence>
        {isLogOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><MapPinned className="w-6 h-6 text-rose-500" /> Campus Gate Scan Logs</h3>
              <button onClick={() => setIsLogOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="space-y-2">
                {[
                  { kid: 'Alex Universe', scanner: 'Main Gate #2 RFID', time: '07:44 AM', status: 'In' },
                  { kid: 'Taylor Sparks', scanner: 'Classroom C4 Bluetooth', time: '07:51 AM', status: 'In' },
                  { kid: 'Jordan Comet', scanner: 'Manual Teacher Override', time: '08:12 AM', status: 'Late In' },
                  { kid: 'Morgan Nebula', scanner: 'Back Gate Gate #1 RFID', time: '07:38 AM', status: 'In' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-4 border border-white/5 rounded-2xl flex justify-between items-center">
                    <div>
                      <div className="text-white text-xs font-bold">{item.kid}</div>
                      <div className="text-[9px] text-white/40">{item.scanner}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-black text-amber-400">{item.time}</div>
                      <span className="text-[9px] text-emerald-400 font-bold uppercase">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. 5-STEP STUDENT SUPPORT SYSTEM */}
      <AnimatePresence>
        {isSupportSystemOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><HeartPulse className="w-6 h-6 text-rose-600" /> 5-Step Support System</h3>
              <button onClick={() => setIsSupportSystemOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            {/* Support Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl mb-6 text-center">
              {['info', 'screening', 'visits', 'referral'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setSupportTab(tab as any)}
                  className={`py-2 px-1 text-[9px] font-black uppercase tracking-tight rounded-xl cursor-pointer ${supportTab === tab ? 'bg-rose-600 text-white' : 'text-white/40'}`}
                >
                  {tab === 'info' ? 'Profile' : tab === 'screening' ? 'Screening' : tab === 'visits' ? 'Home Visit' : 'Referral'}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide pb-12 space-y-6">
              {/* Profile sub-tab */}
              {supportTab === 'info' && (
                <div className="space-y-3">
                  <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">Student Detailed Index</h4>
                  {students.map(stu => (
                    <div key={stu.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-xs text-white space-y-1 relative">
                      <div className="font-bold">{stu.name}</div>
                      <div className="text-white/50 text-[10px]">Allergies: {stu.allergies} • Blood: {stu.bloodType} • Conduct: {stu.conductScore}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Screening sub-tab */}
              {supportTab === 'screening' && (
                <div className="space-y-4">
                  <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">Risk Classification Assessments</h4>
                  {students.map(stu => (
                    <div key={stu.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3">
                      <div className="text-xs font-bold text-white">{stu.name}</div>
                      <div className="grid grid-cols-3 gap-2">
                        {['Normal', 'At Risk', 'Problem'].map(level => (
                          <button 
                            key={level}
                            onClick={() => setStudentRisk(prev => ({ ...prev, [stu.id]: level as any }))}
                            className={`py-2 text-[9px] font-black uppercase rounded-lg border cursor-pointer ${
                              studentRisk[stu.id] === level ? 'bg-rose-600 text-white border-rose-500' : 'bg-[#0A0A0A] text-white/40 border-white/5'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Online Home Visits sub-tab */}
              {supportTab === 'visits' && (
                <div className="space-y-4">
                  <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">Online Visit Records</h4>
                  {students.map(stu => (
                    <div key={stu.id} className="bg-white/5 p-4 border border-white/10 rounded-2.5xl space-y-2">
                      <div className="text-xs font-bold text-white">{stu.name}</div>
                      <textarea 
                        value={homeVisitNotes[stu.id] || ""}
                        onChange={(e) => setHomeVisitNotes(prev => ({ ...prev, [stu.id]: e.target.value }))}
                        placeholder="Type guardian home interview observation notes..."
                        className="w-full bg-black/40 border border-white/5 p-3 rounded-xl text-xs text-white/85 focus:outline-none focus:ring-1 focus:ring-rose-500 h-20"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Referrals sub-tab */}
              {supportTab === 'referral' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">Forwarding Actions Audit</h4>
                    {referralList.map((r, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center text-xs">
                        <div>
                          <div className="text-white font-bold">{r.name}</div>
                          <div className="text-[10px] text-white/50">To: {r.type}</div>
                        </div>
                        <span className="text-[10px] text-amber-400 font-mono font-bold uppercase">{r.status}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddReferral} className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-4">
                    <h5 className="text-white font-bold text-sm">Initiate Referral File</h5>
                    <div>
                      <label className="text-[9px] text-white/40 pl-1 uppercase font-bold">Vulnerable student</label>
                      <select 
                        value={referralName}
                        onChange={(e) => setReferralName(e.target.value)}
                        className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1"
                      >
                        {students.map(stu => (
                          <option key={stu.id} value={stu.name}>{stu.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] text-white/40 pl-1 uppercase font-bold">Receiving Clinical Branch</label>
                      <input 
                        type="text" 
                        value={referralType}
                        onChange={(e) => setReferralType(e.target.value)}
                        className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1 focus:outline-none"
                      />
                    </div>

                    <button type="submit" className="w-full py-3 bg-rose-600 text-white font-bold text-xs uppercase rounded-xl">
                      Transmit Referral Package
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. TEACHER SDQ QUESTIONNAIRE */}
      <AnimatePresence>
        {isSdqOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><BrainCircuit className="w-6 h-6 text-purple-500" /> Professional SDQ</h3>
              <button onClick={() => setIsSdqOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-purple-500/10 p-5 rounded-3xl border border-purple-500/20 text-xs text-purple-400 font-mono leading-relaxed">
                Evaluating behavioral health on 128 registered students. Click below to lock clinical records.
              </div>
              <div className="space-y-3">
                {students.map(stu => (
                  <button 
                    key={stu.id}
                    onClick={() => showToast(`Locking psychiatric SDQ diagnostic checklist parameters for ${stu.name}`)}
                    className="w-full bg-white/5 p-4 border border-white/5 rounded-2xl flex justify-between items-center text-xs text-white hover:bg-white/10 cursor-pointer"
                  >
                    <span className="font-bold">{stu.name}</span>
                    <span className="text-[9px] text-purple-400 font-mono font-bold uppercase border border-purple-500/20 px-2 py-0.5 rounded">Evaluate Mind</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. COMMUNICATION DEPT (ASSIGN HOMEWORK & NOTIFIERS) */}
      <AnimatePresence>
        {isCommOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><MessageCircle className="w-6 h-6 text-blue-500" /> Communications</h3>
              <button onClick={() => setIsCommOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide space-y-6 pb-12">
              {/* Chat section */}
              <div className="bg-white/5 p-4 border border-white/10 rounded-3xl space-y-4">
                <h4 className="text-white font-bold text-xs flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping"></span> Chat Active: Helen Universe
                </h4>
                <div className="space-y-2 h-44 overflow-y-auto p-2 bg-black/40 rounded-xl scrollbar-hide text-[11px] leading-relaxed">
                  {parentChatMessages.map((m, i) => (
                    <div key={i} className={`p-2 rounded-xl mb-1 ${m.sender === 'You' ? 'bg-blue-600/20 ml-8 text-right' : 'bg-white/5 mr-8'}`}>
                      <div className="text-[8px] text-white/40 font-mono">{m.sender}</div>
                      <span className="text-white/90 font-bold">{m.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <input 
                    type="text" 
                    value={chatInput} 
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type parental answer..."
                    className="flex-1 bg-black text-xs text-white p-3 rounded-lg border border-white/10 focus:outline-none"
                  />
                  <button onClick={handleSendChat} className="p-3 bg-blue-600 rounded-lg text-white cursor-pointer"><Send className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Post Homework */}
              <form onSubmit={handlePostHomework} className="bg-white/5 p-5 border border-white/10 rounded-3xl space-y-4">
                <h4 className="text-white font-bold text-xs">Assign Assignment Syllabus</h4>
                <div>
                  <label className="text-[8px] text-white/40 pl-1 uppercase font-bold">Subject Select</label>
                  <select 
                    value={newHwSubject} 
                    onChange={(e) => setNewHwSubject(e.target.value)}
                    className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1"
                  >
                    <option value="AP Physics">AP Physics</option>
                    <option value="Vector Calculus">Vector Calculus</option>
                    <option value="Advanced Chemistry">Advanced Chemistry</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8px] text-white/40 pl-1 uppercase font-bold">Task Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Relativity Wave analysis..." 
                    value={newHwTitle}
                    onChange={(e) => setNewHwTitle(e.target.value)}
                    className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[8px] text-white/40 pl-1 uppercase font-bold">Due Date schedule</label>
                  <input 
                    type="date" 
                    value={newHwDate}
                    onChange={(e) => setNewHwDate(e.target.value)}
                    className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[8px] text-white/40 pl-1 uppercase font-bold">Assignment description</label>
                  <textarea 
                    placeholder="Task details..." 
                    value={newHwDesc}
                    onChange={(e) => setNewHwDesc(e.target.value)}
                    className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1 focus:outline-none h-18"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase rounded-xl">
                  Deploy Homework Assignment
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. PARENT LEAVE APPLICATION APPROVALS */}
      <AnimatePresence>
        {isLeaveApprovalOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CalendarCheck className="w-6 h-6 text-indigo-500" /> Skip Slip Inbox</h3>
              <button onClick={() => setIsLeaveApprovalOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="space-y-4">
                {pendingLeaves.map(leave => (
                  <div key={leave.id} className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{leave.type}</span>
                        <h4 className="text-white font-bold mt-2 text-xs">{leave.kid}</h4>
                        <p className="text-[9px] text-white/55">Reported by: {leave.parent}</p>
                      </div>
                      <span className={`text-[10px] font-mono font-bold ${
                        leave.status === 'Approved' ? 'text-emerald-400' : leave.status === 'Rejected' ? 'text-rose-400' : 'text-amber-400'
                      }`}>{leave.status}</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed italic">"{leave.reason}"</p>

                    {leave.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleApproval(leave.id, 'Approved')}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase rounded-xl cursor-pointer"
                        >
                          อนุมัติ (Approve)
                        </button>
                        <button 
                          onClick={() => handleApproval(leave.id, 'Rejected')}
                          className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] uppercase rounded-xl cursor-pointer"
                        >
                          ปฏิเสธ (Reject)
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. VOLUNTARY SERVICE approval Logs */}
      <AnimatePresence>
        {isVolunteerOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Sparkles className="w-6 h-6 text-teal-600" /> Voluntary Audit</h3>
              <button onClick={() => setIsVolunteerOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="space-y-3">
                {volunteerLogs.map(log => (
                  <div key={log.id} className="bg-white/5 p-4 border border-white/10 rounded-2.5xl flex justify-between items-center">
                    <div>
                      <h4 className="text-white text-xs font-bold">{log.kid}</h4>
                      <p className="text-[10px] text-white/50">{log.task}</p>
                      <span className="text-[9px] text-teal-400 font-mono font-bold">Approved credit index: {log.hours} Hours</span>
                    </div>
                    {log.status === 'Pending' ? (
                      <button 
                        onClick={() => approveVolunteer(log.id)}
                        className="py-2 px-3 bg-teal-600 rounded-xl text-[10px] text-white uppercase font-bold cursor-pointer"
                      >
                        Approve Ledger
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-mono font-bold">Certified</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. LESSON OBSERVERS / CLINICS */}
      <AnimatePresence>
        {isLessonOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><ClipboardCheck className="w-6 h-6 text-slate-600" /> Lesson Supervision</h3>
              <button onClick={() => setIsLessonOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide space-y-6 pb-12">
              <div className="space-y-2">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widestpl-1">Observation History Audit</h4>
                {lessonsFeed.map(les => (
                  <div key={les.id} className="bg-white/5 p-4 border border-white/10 rounded-2.5xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-bold">{les.title}</span>
                      <span className="text-slate-400 font-mono font-bold">{les.score} / 100</span>
                    </div>
                    <p className="text-xs text-white/50 italic leading-relaxed">"{les.notes}"</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddObs} className="bg-white/5 p-5 border border-white/10 rounded-3xl space-y-4">
                <h5 className="text-white font-bold text-sm">File Observation Assessment</h5>
                <div>
                  <label className="text-[9px] text-white/40 pl-1 uppercase font-bold">Lesson title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Organic Benzene Ring models AP" 
                    value={newObsTitle}
                    onChange={(e) => setNewObsTitle(e.target.value)}
                    className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-white/40 pl-1 uppercase font-bold">Observed score index (1-100)</label>
                  <input 
                    type="number" 
                    value={newObsScore}
                    onChange={(e) => setNewObsScore(parseInt(e.target.value))}
                    className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-white/40 pl-1 uppercase font-bold">Comprehensive clinical notes</label>
                  <textarea 
                    placeholder="Observations details..." 
                    value={newObsNotes}
                    onChange={(e) => setNewObsNotes(e.target.value)}
                    className="w-full bg-black p-3 text-xs text-white rounded-xl border border-white/10 mt-1 focus:outline-none h-18"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-slate-600 text-white font-bold text-xs uppercase rounded-xl cursor-pointer">
                  Log Observation Records
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. STUDENT ACADEMIC BLOCKCHAIN AUDITOR */}
      <AnimatePresence>
        {isBlockchainOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }} 
            className="fixed inset-0 z-50 bg-[#0A0A0A]/98 p-6 md:p-8 flex flex-col overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500 animate-pulse" />
                <div>
                  <h3 className="text-xl font-bold text-white">Student Blockchain Academic Auditor</h3>
                  <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest leading-none">ผู้ดูแลจัดการฐานข้อมูลหน่วยกิตบล็อกเชนประชากรนักเรียน</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsBlockchainOpen(false);
                  setMintStatus(null);
                }} 
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Split Screen Auditor Frame */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 select-none">
              
              {/* Left Column: Student Selector list */}
              <div className="lg:col-span-4 bg-[#121624]/40 border border-white/5 p-4 rounded-3xl space-y-3 flex flex-col">
                <h4 className="text-white/40 text-[10px] font-mono uppercase font-bold tracking-widest pl-1">รายชื่อนักเรียนในปกครอง (Enrolled Students)</h4>
                
                <div className="space-y-2 flex-1 overflow-y-auto max-h-[250px] lg:max-h-none pr-1">
                  {students.map((stu) => {
                    const isSelected = selectedStudentBlockchain === stu.id;
                    const bCount = studentBadges[stu.id]?.length || 0;
                    const coinsBal = studentCoins[stu.id] || 0;

                    return (
                      <button
                        key={stu.id}
                        onClick={() => {
                          setSelectedStudentBlockchain(stu.id);
                          setMintStatus(null);
                        }}
                        className={`w-full p-4 rounded-2.5xl text-left border transition-all flex justify-between items-center cursor-pointer ${
                          isSelected 
                            ? 'bg-emerald-600/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/5' 
                            : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-bold font-sans">{stu.name}</div>
                          <div className="text-[9px] opacity-70 font-mono">ห้อง {stu.grade} | จิตพิสัย: {stu.conductScore}%</div>
                        </div>
                        <div className="text-right space-y-0.5">
                          <span className="text-[8px] sm:text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold block">
                            {bCount} Badges
                          </span>
                          <span className="text-[8px] sm:text-[9px] text-yellow-400 font-bold block font-mono pl-1">
                            {coinsBal} Coins
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* General Ledger Stats */}
                <div className="bg-[#030712] border border-white/5 p-4.5 rounded-2xl text-[10px] text-white/50 space-y-2.5 font-mono">
                  <span className="text-[9px] text-emerald-400 font-bold block">★ CONSENSUS AUDIT METRICS</span>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Total Active Ledgers:</span>
                      <span className="text-white">4 Accounts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accredited Badges Minted:</span>
                      <span className="text-white">
                        {Object.values(studentBadges).reduce((acc: number, curr: any) => acc + (curr?.length || 0), 0)} Badges
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Circulating Coins:</span>
                      <span className="text-white">
                        {Object.values(studentCoins).reduce((acc: number, curr: any) => acc + (curr || 0), 0)} Coins
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Active Tab Content for selected student */}
              <div className="lg:col-span-8 bg-[#0B0D17] border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl">
                
                {/* Active Student Info Header */}
                <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-5">
                  <div>
                    <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider block">กำลังตรวจสอบบัญชีบล็อกเชน (ACTIVE INVESTIGATION)</span>
                    <h4 className="text-white font-bold text-base font-sans">
                      {students.find(s => s.id === selectedStudentBlockchain)?.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-450 text-emerald-300 font-mono font-bold px-3 py-1 rounded-xl text-xs">
                    <Coins className="w-4 h-4 text-emerald-400" /> {studentCoins[selectedStudentBlockchain]} Coins Balance
                  </div>
                </div>

                {/* Sub tabs selectors */}
                <div className="grid grid-cols-4 gap-1.5 mb-5">
                  {[
                    { id: 'credentials', label: 'เกียรติบัตรวิชาการ', icon: Award },
                    { id: 'passport', label: 'แนะนำสถาบันอุดมศึกษา', icon: ShieldCheck },
                    { id: 'l2e', label: 'เหรียญสะสม L2E', icon: Coins },
                    { id: 'mints', label: 'ส่งออก/Mint ตราใหม่', icon: Cpu }
                  ].map((tab) => {
                    const isActive = blockchainTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setBlockchainTab(tab.id as any);
                          setMintStatus(null);
                        }}
                        className={`py-2 p-1 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-emerald-600/10 border-emerald-500 text-white' 
                            : 'bg-white/5 border-white/5 text-white/40 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-emerald-400' : ''}`} />
                        <span className="text-[10px] text-center font-bold tracking-tight leading-tight block">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab content renders */}
                <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 max-h-[350px] lg:max-h-none pr-1">
                  
                  {/* TAB 1: Verified Credentials */}
                  {blockchainTab === 'credentials' && (
                    <div className="space-y-3">
                      <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/15 text-[10.5px] text-white/60 leading-relaxed">
                        ด้านล่างคือเกียรติบัตรประทับตราดิจิทัล (Verified Micro-Credentials) บน Ethereum Goerli/Sepolia จำลองของนักเรียน ข้อมูลได้รับการเข้ารหัสด้วยอัลกอริทึม SHA-256 ไม่สามารถปลอมแปลงแก้ไขค่าเฉลี่ยสถิติได้
                      </div>

                      <div className="space-y-2">
                        {studentBadges[selectedStudentBlockchain]?.map((badge, idx) => (
                          <div key={idx} className="bg-white/5 p-4 rounded-2.5xl border border-white/5 flex justify-between items-center">
                            <div className="space-y-1">
                              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase">{badge.code}</span>
                              <h5 className="text-white text-xs font-bold">{badge.title}</h5>
                              <p className="text-[9px] text-white/40 font-mono leading-none">Block: #{badge.block} · Hash: {badge.hash.slice(0, 16)}...</p>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                              ✓ Verified
                            </span>
                          </div>
                        ))}

                        {(!studentBadges[selectedStudentBlockchain] || studentBadges[selectedStudentBlockchain].length === 0) && (
                          <div className="text-white/30 text-xs text-center py-8">นักเรียนคนนี้ยังไม่มีตราเกียรติบัตรสะสมบนระบบบล็อกเชนในสัปดาห์นี้</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Academic Passport & University alignment */}
                  {blockchainTab === 'passport' && (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/15 text-[10.5px] text-white/60 leading-relaxed">
                        โมเดล AI เจเนอเรทแผนศึกษาต่ออุดมศึกษา วิเคราะห์ทักษะเด่นเชิงวิชาการเพื่อประเมินโอกาสสอบติดโควตา / รอบพอร์ตโฟลิโอในมหาวิทยาลัยชั้นนำ
                      </div>

                      <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] text-amber-500 font-mono uppercase font-bold tracking-widest pl-0.5 animate-pulse">✓ AI University Matcher Status</span>
                        </div>

                        {selectedStudentBlockchain === 'stu-1' ? (
                          <div className="space-y-1 pt-1">
                            <h5 className="text-white font-bold text-xs">🏫 จุฬาลงกรณ์มหาวิทยาลัย - คณะวิทยาศาสตร์ (คณิตศาสตร์ประยุกต์ & วิทยาการคอมพิวเตอร์) Match 96%</h5>
                            <p className="text-[10px] text-white/60 leading-relaxed">ตราเกียรติยศหลักสูตรฟิสิกส์ชั้นสูงและคณิตศาสตร์สากลส่งผลให้ประเมินโอกาสผ่านเกณฑ์คัดกรองโควตาผู้มีอัจฉริยภาพภาควิชาตรงเกณฑ์ในระดับสูงสุด</p>
                          </div>
                        ) : selectedStudentBlockchain === 'stu-2' ? (
                          <div className="space-y-1 pt-1">
                            <h5 className="text-white font-bold text-xs">🏫 มหาวิทยาลัยมหิดล - คณะวิทยาศาสตร์ (หลักสูตรฟิสิกส์ทฤษฎีและฟิสิกส์ควอนตัมชั้นสูง) Match 89%</h5>
                            <p className="text-[10px] text-white/60 leading-relaxed">ตัวแปรความสอดรับทักษะเชิงลึกจากภารกิจเคมีวิเคราะห์และการแพทย์สนับสนุนโอกาสตอบรับเข้าสมาคมนักวิจัยทุนโครงการจำลอง พสวท.</p>
                          </div>
                        ) : (
                          <div className="space-y-1 pt-1">
                            <h5 className="text-white font-bold text-xs">🏫 สถาบันเทคโนโลยีพระจอมเกล้าลาดกระบัง - คณะวิศวกรรมศาสตร์ (วิศวกรรมปัญญาประดิษฐ์) Match 84%</h5>
                            <p className="text-[10px] text-white/60 leading-relaxed">โครงงานโปรแกรมเมอร์และการสร้างลอจิกเทคโนโลยีบล็อกเชนมูลค่าเพิ่ม เหมาะอย่างยิ่งกับการยื่นโควตาผู้มีแววนวัตกรล้ำยุค</p>
                          </div>
                        )}
                      </div>

                      {/* Display cyber resume text dynamically */}
                      <div className="bg-[#030712] border border-white/5 p-4.5 rounded-2xl">
                        <span className="text-[8px] text-[#5D5DFF] font-mono uppercase font-bold tracking-widest block mb-2">📜 AUTOMATED ACADEMIC CYBER-RESUME PORTAL</span>
                        <pre className="text-[9px] text-emerald-400 font-mono select-all whitespace-pre-wrap leading-relaxed select-all">
                          {`NAME: ${students.find(s => s.id === selectedStudentBlockchain)?.name}\nGRADE: ${students.find(s => s.id === selectedStudentBlockchain)?.grade}\nMETRICS: conductScore ${students.find(s => s.id === selectedStudentBlockchain)?.conductScore}% | attendance 98%\nCREDENTIALS ACQUIRED: ${studentBadges[selectedStudentBlockchain]?.map(b => b.title).join(', ') || 'None'}\nLEDGER HASH: verified_secured_ledger@0x${selectedStudentBlockchain}c4`}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Learn-to-Earn Ledger logs */}
                  {blockchainTab === 'l2e' && (
                    <div className="space-y-3">
                      <div className="bg-[#1C1613]/55 p-4 rounded-2.5xl border border-yellow-500/10 flex justify-between items-center">
                        <div className="space-y-1">
                          <h5 className="text-yellow-400 font-bold text-xs">Learn-to-Earn (L2E) Protocol Log</h5>
                          <p className="text-[10px] text-white/50 leading-tight">สถิติสะสมและเบิกจ่ายโทเคนปัญญาทางวิชาการ (Academic Mining Coins)</p>
                        </div>
                        <Coins className="w-8 h-8 text-yellow-500 animate-spin" />
                      </div>

                      <div className="space-y-2">
                        {studentL2ELogs[selectedStudentBlockchain]?.map((log, idx) => (
                          <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center text-xs">
                            <div className="space-y-0.5">
                              <span className="text-[8px] text-white/40 block font-mono">{log.date} · ID: {log.id}</span>
                              <span className="text-white font-medium text-[11px] leading-tight block">{log.title}</span>
                            </div>
                            <span className="text-[10.5px] font-mono font-bold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-lg border border-yellow-500/20">
                              +{log.cost} Coins
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MINT NEW ACADEMIC BADGE (Teacher exclusive) */}
                  {blockchainTab === 'mints' && (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/15 text-[10.5px] text-white/60 leading-relaxed font-sans">
                        ฟังก์ชันพิเศษครูผู้ปกครอง: ออกใบรับรองเกียรติบัตรบล็อกเชน (Mint Badge) ให้แก่นักเรียนด้วยความพยายามหรือพฤติกรรมยอดเยี่ยม ข้อมูลจะถูกบันทึก ประทับตราด้วยเลขบล็อกจำลองและรหัสทรานแซกชั่นอย่างถาวร
                      </div>

                      <div className="bg-white/5 p-5 border border-white/10 rounded-2.5xl space-y-4 font-sans text-xs">
                        <h5 className="text-white font-bold">มอบตราสัญลักษณ์ประทับใหม่ (Mint Badge Tool)</h5>
                        
                        <div className="space-y-1.5">
                          <label className="text-[9px] text-white/40 pl-1 uppercase font-bold">กรอกชื่อใบประกาศเกียรติคุณวิชาการ</label>
                          <select 
                            value={newMintBadge}
                            onChange={(e) => setNewMintBadge(e.target.value)}
                            className="w-full bg-black py-3 px-3.5 text-xs text-white rounded-xl border border-white/10 mt-1 focus:outline-none"
                          >
                            <option value="AP Physics Waves Expert">AP Physics Waves Expert (เชี่ยวชาญพิเศษโครงสร้างคลื่นวิจัย)</option>
                            <option value="PISA Mathematics Hero">PISA Mathematics Hero (ผู้ทำข้อสอบคลังแบบประเมินระดับชาติยอดเยี่ยม)</option>
                            <option value="Exceptional Peer Mentor Core">Exceptional Peer Mentor Core (รางวัลแกนนำเพื่อนช่วยจิตอาสารวม 10 ชม.)</option>
                            <option value="Outstanding Scientific Report">Outstanding Scientific Report (ผู้นำเสนองานวิจัยดีเด่นประดับงานวิชาการ)</option>
                          </select>
                        </div>

                        {mintStatus && (
                          <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center space-y-1 text-[10px] text-emerald-300 font-mono">
                            {mintStatus}
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (isMinting) return;
                            setIsMinting(true);
                            setMintStatus("ระบบกำลังเชื่อมต่อสัญญาอัจฉริยะ (Smart Contract Deployment)...");
                            
                            setTimeout(() => {
                              setMintStatus("ระบบกำลังยืนยันฉันทามติ Merkle Node: Block generation pending...");
                            }, 1000);

                            setTimeout(() => {
                              const newCode = `GEN-MINT-${Math.floor(100 + Math.random() * 900)}`;
                              const blockNo = Math.floor(45000 + Math.random() * 2000);
                              const hashVal = "0x" + Math.random().toString(16).slice(2, 38) + "f2";
                              const dateFormatted = new Date().toISOString().split('T')[0];

                              const newBadgeObj = {
                                code: newCode,
                                title: newMintBadge,
                                hash: hashVal,
                                block: blockNo,
                                date: dateFormatted
                              };

                              // Append badge and coins
                              setStudentBadges(prev => ({
                                ...prev,
                                [selectedStudentBlockchain]: [...(prev[selectedStudentBlockchain] || []), newBadgeObj]
                              }));

                              setStudentCoins(prev => ({
                                ...prev,
                                [selectedStudentBlockchain]: (prev[selectedStudentBlockchain] || 0) + 50
                              }));

                              const logItem = {
                                id: `tx-gen-${Date.now()}`,
                                title: `Accredited Badge Mint: "${newMintBadge}" (+55 Coins)`,
                                cost: 55,
                                date: dateFormatted,
                                type: 'Earn' as const
                              };

                              setStudentL2ELogs(prev => ({
                                ...prev,
                                [selectedStudentBlockchain]: [logItem, ...(prev[selectedStudentBlockchain] || [])]
                              }));

                              setIsMinting(false);
                              setMintStatus(`🎉 ขอแสดงความยินดี! ฝังตราเกียรติบัตรใน Block #${blockNo} สำเร็จ! รหัสจำลอง ${newCode} บรรจุในพอร์ตเรียบร้อย พร้อมรางวัลสะสม +55 Coins!`);
                              showToast(`🎉 มอบและบันทึกวิชาการ "${newMintBadge}" สำเร็จบนโครงข่ายบล็อกเชน!`);
                            }, 2400);

                          }}
                          className={`w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase cursor-pointer ${
                            isMinting ? 'opacity-50 cursor-not-allowed animate-pulse' : ''
                          }`}
                        >
                          {isMinting ? "กำลังบันทึกข้อมูลเข้ารหัสบล็อก..." : "ออกตราบล็อกเชน (Mint Encrypted Badge On Chain)"}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 11. STUDENT COGNITIVE AI COPILOT AUDITOR */}
      <AnimatePresence>
        {isAiCopilotOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="fixed inset-0 z-50 bg-[#070913] p-6 flex flex-col overflow-y-auto scrollbar-hide select-none"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-600/20 text-violet-400 rounded-xl border border-violet-500/30 animate-pulse">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-1.5 leading-none">
                    AI Student Analyzer Core
                  </h3>
                  <p className="text-[10px] text-violet-400 font-mono font-bold tracking-widest uppercase mt-1">ผู้ช่วยสอนอัจฉริยะวิเคราะห์แก้ไขจุดอ่อนผู้เรียน</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiCopilotOpen(false)} 
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Split screen layout of AI Analyzer */}
            <div className="space-y-5 pb-12">
              
              {/* Executive Overview Banner */}
              <div className="bg-gradient-to-r from-violet-950/65 via-[#13112c]/85 to-purple-950/40 p-5 rounded-3.5xl border border-violet-500/20 space-y-2 font-sans">
                <span className="text-[9px] bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                  ★ CLASS-WIDE DIAGNOSTIC METRICS
                </span>
                <p className="text-[11.5px] text-white/80 leading-relaxed">
                  ประเมินผ่านแบบประเมินและทฤษฎีการจดจ่อ มีรายชื่อนักเรียนในความดูแล <strong>3 คนที่สมาธิหลุดและมีพฤติกรรมตกเกณฑ์ชั่วคราว</strong> ครูสามารถกดเลือกมอบคำใบ้หรือใบยาแก้จุดอ่อนแฝงได้ทันที
                </p>
              </div>

              {/* Class Cognitive Weak Spot List */}
              <div className="space-y-3 font-sans">
                <h4 className="text-white/40 text-[10px] uppercase font-mono font-bold tracking-widest pl-1">รายชื่อวิเคราะห์และใบสั่งยาแก้อ่อนรายบุคคล</h4>
                <div className="space-y-3">
                  
                  {/* Jordan Comet Analysis */}
                  <div className="bg-[#1b0f10] border border-rose-500/15 p-5 rounded-3xl space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-rose-500/10">
                      <div className="space-y-0.5">
                        <h5 className="text-white font-bold leading-none">Jordan Comet</h5>
                        <span className="text-[9px] text-[#FF5D5D] font-mono leading-none">ระดับเสี่ยง: สูงสุด (High Cognitive Fatigue)</span>
                      </div>
                      <span className="text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded font-mono font-bold">FOCUS ISSUE</span>
                    </div>
                    <div className="space-y-1.5 text-white/70 text-[11px] leading-relaxed">
                      <div><strong className="text-rose-300">จุดอ่อน:</strong> ดัชนีจดจ่อ (Focus Quotient) วูบชั่วคราวหลังจากทำสไลด์ Tier 4 ขึ้นไปเกิน 20 นาที มีผลตรวจ SDQ คะแนนความเครียดสูงขึ้น</div>
                      <div><strong className="text-emerald-400">ใบสั่งยา AI (Remedy):</strong> เปิดความถี่แทร็กสมาธิ (Binaural Focus Alpha Waves - 15 นาที) และมอบเหรียญรางวัลพิเศษเพื่อเป็นแรงจูงใจ</div>
                    </div>
                    <button 
                      onClick={() => showToast("🎉 ส่งใบสั่งยาแก้จุดอ่อนแบบ Binaural Track & เหรียญพิเศษ ไปยังแดชบอร์ด Jordan Comet เรียบร้อย!")}
                      className="w-full mt-2 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-[10px] uppercase cursor-pointer transition-colors"
                    >
                      ส่งใบสั่งยาปรับพฤติกรรม (Dispatch Target Remedy)
                    </button>
                  </div>

                  {/* Taylor Sparks Analysis */}
                  <div className="bg-[#111322] border border-violet-500/15 p-5 rounded-3xl space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-violet-500/10">
                      <div className="space-y-0.5">
                        <h5 className="text-white font-bold leading-none">Taylor Sparks</h5>
                        <span className="text-[9px] text-amber-400 font-mono leading-none">ระดับเสี่ยง: ปานกลาง (Inconsistent Attendance)</span>
                      </div>
                      <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-mono font-bold">ATTENDANCE</span>
                    </div>
                    <div className="space-y-1.5 text-white/70 text-[11px] leading-relaxed">
                      <div><strong className="text-rose-300">จุดอ่อน:</strong> ขาดการเข้าเรียนเสาธงในช่วง 2 วันมานี้ ขาดแคลนการประสานทำจิตอาสาเพื่อนช่วยเพื่อนเพื่อการเรียนรู้</div>
                      <div><strong className="text-emerald-400">ใบสั่งยา AI (Remedy):</strong> ส่งเทียบสัญญานอนุมัติลาแฝงวิเคราะห์ และปรับระดับความยากการเขียนโปรแกรมลงชั่วคราวที่ 2x เพื่อสร้างก้าวแรกที่มั่นใจใหม่</div>
                    </div>
                    <button 
                      onClick={() => showToast("🎉 ส่งเทียบปรับวิถี Pace 2x และมอบภารกิจเสาธงพิเศษให้กับ Taylor Sparks สำเร็จ!")}
                      className="w-full mt-2 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-[10px] uppercase cursor-pointer transition-colors"
                    >
                      มอบหมายบทเรียนสัมพัทธ์ (Dispatch Adaptive Syllabus)
                    </button>
                  </div>

                  {/* Alex Universe Analysis */}
                  <div className="bg-[#0e1614] border border-emerald-500/15 p-5 rounded-3xl space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-500/10">
                      <div className="space-y-0.5">
                        <h5 className="text-white font-bold leading-none">Alex Universe</h5>
                        <span className="text-[9px] text-emerald-400 font-mono leading-none">ระดับ: ดีเลิศ (Optimal Trajectory)</span>
                      </div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">READY TO LEAP</span>
                    </div>
                    <div className="space-y-1.5 text-white/70 text-[11px] leading-relaxed">
                      <div><strong className="text-emerald-300">จุดเด่นวิเคราะห์:</strong> ทำสถิติกลศาสตร์ Tier 5 และอัลกอริทึมประสิทธิภาพสูงได้สมบูรณ์ ประสานเหรียญ L2E ระดับขยันยิ่งยวด</div>
                      <div><strong className="text-emerald-400">คำสั่งยกระดับ (Promotion):</strong> มอบเทียบการอภิปรายผลเชิงกลศาสตร์ควอนตัมชั้นนำนานาชาติเป็นใบเบิกทาง และส่งเทียบโปรแกรม CERN Scholarship</div>
                    </div>
                    <button 
                      onClick={() => showToast("🎉 ปลดบล็อกเกียรติบัตรขั้นสูงพิเศษ และส่งเทียบหัวข้อวิจัยระดับท้าทายให้ Alex Universe เรียบร้อย!")}
                      className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-[10px] uppercase cursor-pointer transition-colors"
                    >
                      ปลดข้อเสนอสุดท้าทาย (Unlock Advanced Quantum Path)
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav spacer */}
      <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center justify-around px-4 shadow-2xl">
        <button className="p-2 text-amber-500 cursor-pointer"><LayoutDashboard className="w-6 h-6" /></button>
        <button onClick={() => setIsCommOpen(true)} className="p-2 text-white/40 cursor-pointer"><MessageSquare className="w-6 h-6" /></button>
        <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-full flex items-center justify-center -translate-y-6 shadow-xl border-4 border-[#0A0A0A]">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <button onClick={() => setIsLeaveApprovalOpen(true)} className="p-2 text-white/40 cursor-pointer"><CalendarCheck className="w-6 h-6" /></button>
        <button onClick={() => showToast("⚙️ Settings toggled: Profile parameters synchronized with server!")} className="p-2 text-white/40 cursor-pointer"><Settings className="w-6 h-6" /></button>
      </div>

      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute bottom-24 left-6 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3.5 rounded-xl border border-emerald-400/30 text-xs font-semibold shadow-2xl z-[999] flex items-center gap-2.5"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
