import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Users, Clock, Navigation, MapPinned, 
  MessageSquare, Settings, Sparkles, Book, Newspaper, CreditCard, 
  Network, Microscope, Target, Headset, Smile, CalendarCheck, 
  LayoutDashboard, HeartPulse, BrainCircuit, MessageCircle, 
  ClipboardCheck, Monitor, Award, Stethoscope, Activity, Cpu, 
  ShieldCheck, BarChart3, Plus, Check, Play, Pause, Coins, Flame,
  FileText, Download, Send, Phone, Mail, UserPlus, Sliders, Share2
} from 'lucide-react';
import { 
  PARENTING_ARTICLES, STUDENTS_LIST, HOMEWORK_LIST,
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

export default function ParentDashboard({ onLogout }: { onLogout: () => void }) {
  // Navigation states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [attendanceViewTab, setAttendanceViewTab] = useState<'daily' | 'semester'>('daily');
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

  // New Parent-centered feature states
  const [isClinicOpen, setIsClinicOpen] = useState(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  // Clinic States
  const [clinicTeacher, setClinicTeacher] = useState("Dr. Orion Reynolds");
  const [clinicTime, setClinicTime] = useState("18:30 (จันทร์ - ศุกร์)");
  const [clinicTopic, setClinicTopic] = useState("ทิศทางสมรรถนะเทคโนโลยีพลังงานและการสอบเข้ามหาวิทยาลัย");
  const [clinicType, setClinicType] = useState("Zoom ออนไลน์");
  const [clinicBookings, setClinicBookings] = useState<Array<{ teacher: string; time: string; topic: string; type: string }>>([
    { teacher: "Prof. Sarah Jenkins", time: "วันพุธ 19:30 น.", topic: "การปรับตัวทางอารมณ์และสมาธิขณะติววิเคราะฟิสิกส์", type: "Zoom ออนไลน์" }
  ]);

  // News Alerts States
  const [newsAlertsEnabled, setNewsAlertsEnabled] = useState(true);

  // Article Filter States
  const [articleFilter, setArticleFilter] = useState("All");

  // Community States
  const [communityThreads, setCommunityThreads] = useState<Array<{ id: number; author: string; title: string; content: string; category: string; likes: number; replies: number }>>([
    { id: 1, author: "คุณแม่วิภาวี (ลูกอยู่ ม.6)", title: "แชร์วิธีเตรียมสอบ PISA ด้านวิทยาศาสตร์และคณิตศาสตร์", content: "ตอนนี้ทางโรงเรียนเปิดฟังก์ชันแนวข้อมสอบเก่า PISA ของผู้เรียน พัฒนาทักษะการคิดวิเคราะห์ได้อย่างดีเยี่ยมเลยค่ะ แนะนำคุณแม่ท่านอื่นพาลูกฝึกทำเยอะๆ นะคะ", category: "เตรียมสอบ", likes: 12, replies: 3 },
    { id: 2, author: "คุณพ่อจักรพันธ์ (ลูกเรียนห้องดนตรีเชิงฟิสิกส์)", title: "ปรึกษาเรื่องการแบ่งเวลากลุ่มโครงงาน Learn to Earn", content: "ลูกผมติดใจเกมดนตรีสังเคราะห์เก็บเหรียญแลกใบประกาศมาก อยากคุยกับคุณพ่อคุณแม่ท่านอื่นว่าจำกัดเวลาเล่นอย่างไร หรือส่งเสริมเพิ่มเทคนิคอย่างไรดีครับ", category: " Learn to Earn", likes: 8, replies: 5 }
  ]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("แชร์ความรู้");

  // States
  const [alex, setAlex] = useState<Student>(STUDENTS_LIST[0]);
  const [guardiansList, setGuardiansList] = useState<Array<{ name: string; relation: string; phone: string }>>([
    { name: 'Helen Universe', relation: 'Mother / Primary', phone: '081-344-9122' },
    { name: 'Richard Universe', relation: 'Father', phone: '089-221-4045' }
  ]);
  const [newGuardianName, setNewGuardianName] = useState("");
  const [newGuardianRelation, setNewGuardianRelation] = useState("Grandparent");
  const [newGuardianPhone, setNewGuardianPhone] = useState("");

  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveStatus, setLeaveStatus] = useState<string | null>(null);

  const [sdqAnswers, setSdqAnswers] = useState<Record<number, number>>({});
  const [sdqSubmitted, setSdqSubmitted] = useState(false);

  const [topupAmount, setTopupAmount] = useState("");
  const [spendingLimit, setSpendingLimit] = useState(200);
  const [balance, setBalance] = useState(2450);
  const [mealsHistory, setMealsHistory] = useState<Array<{ title: string; time: string; cost: number }>>([
    { title: 'Hainanese Chicken Rice', time: 'Today, 12:14 PM', cost: 45 },
    { title: 'Phad Thai with Tofu', time: 'Yesterday, 12:05 PM', cost: 50 },
    { title: 'High-protein Soy Milk', time: 'Yesterday, 07:35 AM', cost: 15 }
  ]);

  const [addressPin, setAddressPin] = useState("124 Deep Space Avenue, Cosmic Towers, Bangkok");
  const [addressStatus, setAddressStatus] = useState<string | null>(null);

  // Handlers
  const handleAddGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuardianName || !newGuardianPhone) return;
    setGuardiansList(prev => [...prev, { name: newGuardianName, relation: newGuardianRelation, phone: newGuardianPhone }]);
    setNewGuardianName("");
    setNewGuardianPhone("");
  };

  const submitLeave = () => {
    setLeaveStatus("Abesence notification successfully dispatched to Prof. Orion (Advisor). Real-time approval tracker updated.");
  };

  const handleSdqSubmit = () => {
    setSdqSubmitted(true);
  };

  const handleTopup = (amount: number) => {
    setBalance(prev => prev + amount);
    showToast(`Success: topped up ฿${amount}. Sync completed!`);
  };

  const updateLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpendingLimit(parseInt(e.target.value));
  };

  const pinHomeAddress = () => {
    setAddressStatus("Home coordinates checked via secure GPS tracking. Synced with school transport database!");
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
            <div className="w-12 h-12 rounded-full border-2 border-teal-500 p-0.5">
              <img 
                src="https://picsum.photos/seed/parent/100/100" 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Helen Universe</h3>
              <p className="text-teal-400 text-[10px] uppercase tracking-widest font-mono">Alex's Guardian Parent</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-28">
        {/* Child Fast Glance */}
        <div className="p-5 bg-gradient-to-br from-teal-950 to-slate-900 border border-teal-500/20 rounded-[2rem] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/seed/alex/100/100" className="w-12 h-12 rounded-full border border-teal-500/30 object-cover" referrerPolicy="no-referrer" />
            <div>
              <div className="text-xs text-teal-400 font-bold uppercase tracking-widest font-mono">Alex Universe</div>
              <p className="text-xs text-white/50">Checked in today at 07:44 AM</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-550/30 text-emerald-400 px-2 py-0.5 rounded">Campus (มา)</span>
        </div>

        {/* Core parent buttons panel */}
        <div>
          <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Parental Controllers</h4>
          <div className="grid grid-cols-3 gap-3">
            <FeatureItem icon={Clock} label="เวลาเข้า-ออกย้อนหลัง" color="bg-teal-500" onClick={() => setIsAttendanceOpen(true)} />
            <FeatureItem icon={CalendarCheck} label="การบ้าน & การส่ง" color="bg-indigo-500" onClick={() => setIsHomeworkOpen(true)} />
            <FeatureItem icon={Newspaper} label="ประกาศ & ข่าวสาร" color="bg-orange-500" onClick={() => setIsNewsOpen(true)} />
            
            <FeatureItem icon={Activity} label="ความประพฤติ" color="bg-blue-500" onClick={() => setIsConductOpen(true)} />
            <FeatureItem icon={FileText} label="รายงานผลการเรียน" color="bg-pink-500" onClick={() => setIsGradesOpen(true)} />
            <FeatureItem icon={HeartPulse} label="ข้อมูลการเวชกรรม" color="bg-red-500" onClick={() => setIsHealthOpen(true)} />
            
            <FeatureItem icon={MessageCircle} label="แจ้งลาตรงครู" color="bg-violet-500" onClick={() => setIsLeaveOpen(true)} />
            <FeatureItem icon={BrainCircuit} label="ประเมินพฤติกรรม SDQ" color="bg-purple-500" onClick={() => setIsSDQOpen(true)} />
            <FeatureItem icon={Users} label="ครูที่ปรึกษา" color="bg-emerald-500" onClick={() => setIsAdvisorOpen(true)} />

            <FeatureItem icon={MapPinned} label="แชร์พิกัดบ้าน GPS" color="bg-amber-600" onClick={() => setIsLocationOpen(true)} />
            <FeatureItem icon={UserPlus} label="ผู้ปกครองเสริมฟรี" color="bg-rose-500" onClick={() => setIsGuardiansOpen(true)} />
            <FeatureItem icon={Book} label="บทความความรู้ดูแลบุตร" color="bg-blue-600" onClick={() => setIsArticlesOpen(true)} />

            {/* User Requested Custom Parent Feature Buttons */}
            <FeatureItem icon={Headset} label="คลินิกทางการศึกษา" color="bg-rose-600 font-bold" onClick={() => setIsClinicOpen(true)} />
            <FeatureItem icon={Microscope} label="ติดตามหลักสูตรการสอน" color="bg-amber-500 font-bold" onClick={() => setIsCurriculumOpen(true)} />
            <FeatureItem icon={Network} label="ชุมชนร่วมมือผู้ปกครอง" color="bg-cyan-600 font-bold" onClick={() => setIsCommunityOpen(true)} />
          </div>
        </div>

        {/* Student Pay Management */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard className="w-16 h-16 text-teal-400" />
          </div>
          <div className="relative z-10 space-y-4">
            <div>
              <div className="text-[10px] text-teal-400 font-bold uppercase tracking-widest mb-1">Student Pay Console</div>
              <h4 className="text-white font-bold text-lg">Smart Cafe Spending Controls</h4>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/15 flex justify-between items-center">
                <span className="text-xs text-white">Alex's Cafe Balance</span>
                <span className="text-lg font-mono font-bold text-teal-400">฿ {balance.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/60">Daily Limit Spend Cutoff</span>
                  <span className="text-teal-400 font-bold">฿ {spendingLimit}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="500" 
                  step="50"
                  value={spendingLimit}
                  onChange={(e) => setSpendingLimit(parseInt(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => handleTopup(100)} className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase cursor-pointer hover:bg-white/10">+฿100</button>
                <button onClick={() => handleTopup(200)} className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase cursor-pointer hover:bg-white/10">+฿200</button>
                <button onClick={() => handleTopup(500)} className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase cursor-pointer hover:bg-white/10">+฿500</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DETAILED MODALS --- */}

      {/* 1. ATTENDANCE TRAIL */}
      <AnimatePresence>
        {isAttendanceOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-6 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-teal-400 animate-pulse" />
                <div>
                  <h3 className="text-xl font-bold text-white">Student Arrival & Departure Center</h3>
                  <p className="text-[10px] text-teal-400 font-mono font-bold uppercase tracking-wider leading-none">รายงานพฤติกรรมการเข้าเรียนและสรุปการมาเรียนทั้งเทอมของบุตรหลาน</p>
                </div>
              </div>
              <button onClick={() => setIsAttendanceOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer hover:bg-white/10 transition-colors"><ArrowLeft className="w-5 h-5 text-white" /></button>
            </div>

            {/* Attendance Toggle View Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-6 bg-white/5 p-1 rounded-2xl border border-white/5 max-w-md mx-auto w-full select-none">
              <button 
                onClick={() => setAttendanceViewTab('daily')}
                className={`py-2 text-[10.5px] font-bold rounded-xl transition-all cursor-pointer ${attendanceViewTab === 'daily' ? 'bg-teal-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                บันทึกการสแกนเข้า-ออกล่าสุด
              </button>
              <button 
                onClick={() => setAttendanceViewTab('semester')}
                className={`py-2 text-[10.5px] font-bold rounded-xl transition-all cursor-pointer ${attendanceViewTab === 'semester' ? 'bg-teal-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                สรุปสถิติมารุ่นทั้งเทอม
              </button>
            </div>

            <div className="space-y-6 flex-1 max-w-4xl mx-auto w-full select-none pb-12">
              
              {attendanceViewTab === 'daily' ? (
                <div className="space-y-4">
                  {/* Summary Rate */}
                  <div className="bg-gradient-to-br from-teal-950 to-slate-900 border border-teal-500/20 p-5 rounded-3xl text-center">
                    <span className="text-[10px] uppercase text-teal-400 tracking-widest font-mono font-bold block mb-1">ภาพรวมการมาเรียนสัปดาห์นี้</span>
                    <span className="text-4xl font-mono text-white font-black">98.5%</span>
                    <span className="text-[11px] text-white/50 block mt-1">ตรงตามประกาศกฎโรงเรียน และลงเกียรติประวัติเรียบร้อย</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { title: "Alex Universe entered Gate 2 (ประตูหลัก)", time: "Today, 07:44 AM", status: "Gate check on-time", col: "text-emerald-400" },
                      { title: "Alex Universe exited Campus Gate (เลิกเรียน)", time: "Yesterday, 04:12 PM", status: "Normal dismiss", col: "text-teal-400" },
                      { title: "Alex Universe entered Gate 1 (ประตูรอง)", time: "Yesterday, 08:12 AM", status: "Late entry logged", col: "text-amber-400" }
                    ].map((note, index) => (
                      <div key={index} className="bg-white/5 p-4 rounded-2.5xl border border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors">
                        <div>
                          <h4 className="text-white text-xs font-bold">{note.title}</h4>
                          <p className="text-[9px] text-white/45">{note.time}</p>
                        </div>
                        <span className={`text-[9.5px] font-mono font-bold uppercase tracking-wider ${note.col}`}>{note.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* SEMESTER ANALYSIS FOR PARENTS */
                <div className="space-y-6">
                  
                  {/* Rate statistics header */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4 bg-white/5 border border-white/10 p-5 rounded-3xl flex flex-col justify-center items-center text-center space-y-2">
                      <span className="text-[9px] text-teal-400 uppercase font-mono tracking-widest font-bold">อัตราสถิติรวม (เทอม 1/2569)</span>
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="absolute w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="48" className="stroke-white/10 fill-none" strokeWidth="6" />
                          <circle cx="56" cy="56" r="48" className="stroke-teal-600 fill-none transition-all duration-1000" strokeWidth="6" strokeDasharray="301.6" strokeDashoffset="10.5" />
                        </svg>
                        <div className="text-center font-mono">
                          <span className="text-2xl font-black text-white block">96.5%</span>
                          <span className="text-[9px] text-white/45 font-sans leading-none block">สายสะสม 2%</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-white/60 leading-tight">มาจริง 86 วันสาย 2 วัน จากวันเรียนทั้งหมด 90 วัน</span>
                    </div>

                    <div className="md:col-span-8 bg-[#091512] border border-teal-500/10 p-5 rounded-3xl flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[9px] text-teal-450 text-teal-400 font-mono font-bold uppercase tracking-wider block">✓ GUARDIAN INSIGHTS SUMMARY</span>
                        <h4 className="text-white font-bold text-sm">รายงานประสิทธิผลความสม่ำเสมอของบุตรหลาน</h4>
                        <p className="text-[11.5px] text-white/70 leading-relaxed font-sans">
                          Alex Universe มีความรับผิดชอบอย่างก้าวหน้ามาก อัตราการเข้าเรียนเฉลี่ยในวิชาคณิตศาสตร์และคอมพิวเตอร์อยู่ในระดับดีเด่นตลอดภาคเรียน ไม่มีประวัติการขาดเรียนโดยไม่ได้รับสิทธิ์รับรอง มีส่วนร่วมนอกห้องเรียนและจิตอาสาสมบูรณ์
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-3.5 mt-2.5">
                        <div className="space-y-0.5 font-sans">
                          <span className="text-[10px] text-white/40 block">ประเมินสัดส่วนพัฒนาการ</span>
                          <span className="text-white text-xs font-bold leading-none font-mono">ระดับเอ (Excellent Tracker)</span>
                        </div>
                        <div className="space-y-0.5 font-sans">
                          <span className="text-[10px] text-white/40 block">ใบลาอนุมัติสะสม</span>
                          <span className="text-teal-400 text-xs font-bold leading-none font-mono">3 ครั้ง (ผ่านการรับรองระบบ)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 90-Days Heatmap Grid */}
                  <div className="bg-[#0e0e0e] border border-white/5 p-5 rounded-3xl space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5 pb-2 border-b border-white/5">
                      <div>
                        <span className="text-[10px] text-teal-400 font-mono font-bold uppercase tracking-widest block">SEMESTER DAY-BY-DAY ATTENDANCE HEATMAP (90 วัน)</span>
                        <p className="text-[9px] text-white/40 mt-1">แต่ละช่องคือตารางเรียน เรียงตามสัปดาห์ (วันจันทร์ ถึง วันศุกร์)</p>
                      </div>
                      <div className="flex flex-wrap gap-2.5 text-[8.5px] text-white/50 font-mono">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-teal-600 inline-block" /> มาเรียน (84)</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-yellow-500 inline-block" /> สาย (2)</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block" /> ลา (3)</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-600 inline-block" /> ขาด (1)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-10 sm:grid-cols-18 gap-1.5 py-2">
                      {Array.from({ length: 90 }, (_, i) => {
                        let label = 'มาเรียนปกติ';
                        let colorClass = 'bg-teal-600';
                        if (i === 12) { label = 'สาย'; colorClass = 'bg-yellow-500'; }
                        else if (i === 34) { label = 'ลาป่วย'; colorClass = 'bg-blue-500'; }
                        else if (i === 55) { label = 'ขาด'; colorClass = 'bg-rose-600'; }
                        else if (i === 72) { label = 'สาย'; colorClass = 'bg-yellow-500'; }
                        else if (i === 81) { label = 'ลา'; colorClass = 'bg-blue-500'; }
                        else if (i === 88) { label = 'ลา'; colorClass = 'bg-blue-500'; }

                        return (
                          <div 
                            key={i}
                            title={`วันที่ ${i + 1}: ${label}`}
                            className={`aspect-square sm:w-full rounded-md border border-white/5 ${colorClass} text-[8px] flex items-center justify-center font-bold text-black/40 hover:scale-115 transition-transform cursor-pointer relative group`}
                          >
                            {i + 1}
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-[7px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none mb-1">
                              Day {i + 1}: {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Monthly breakdowns */}
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3">
                    <span className="text-[10px] text-white/45 font-mono uppercase font-bold tracking-widest pl-0.5">สรุปสถิตินับจำนวนแยกเป็นรายเดือน</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {[
                        { month: 'มิถุนายน 2026', rate: '100%', detail: 'มา 15 คาบ, ลา 0 คาบ', barWidth: 'w-full' },
                        { month: 'พฤษภาคม 2026', rate: '96%', detail: 'มา 24 คาบ, ลา 1 คาบ', barWidth: 'w-[96%]' },
                        { month: 'เมษายน 2026', rate: '95%', detail: 'มา 22 คาบ, ขาด 1 คาบ', barWidth: 'w-[95%]' },
                        { month: 'มีนาคม 2026', rate: '92%', detail: 'มา 24 คาบ, สาย 1 คาบ, ลา 1 คาบ', barWidth: 'w-[92%]' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-1.5 hover:bg-white/10 transition-colors">
                          <div className="flex justify-between font-bold">
                            <span className="text-white">{item.month}</span>
                            <span className="text-teal-400 font-mono">{item.rate}</span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className={`bg-teal-500 h-full ${item.barWidth}`} />
                          </div>
                          <span className="text-[9.5px] text-white/40 block leading-none">{item.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subject metrics breakdown */}
                  <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3">
                    <span className="text-[10px] text-white/45 font-mono uppercase font-bold tracking-widest pl-0.5">การตอบรับช่วงเวลาเรียนของบุตรหลานรายวิชาหลัก</span>
                    <div className="space-y-3">
                      {[
                        { title: 'Advanced Physics (ฟิสิกส์วิจัยและแบบทัศนะ)', attended: '39 / 40 คาบ', percent: '97.5%' },
                        { title: 'Mathematical Calculus (แคลคูลัสแผนเรขาคณิต)', attended: '40 / 40 คาบ', percent: '100%' },
                        { title: 'Computer Science and AI Programming', attended: '28 / 30 คาบ', percent: '93.3%' },
                        { title: 'Social & Collaborative Merits (จิตอาสาและสังคม)', attended: '36 / 36 คาบ', percent: '100%' }
                      ].map((sub, idx) => (
                        <div key={idx} className="space-y-1 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-white/85 font-semibold leading-tight">{sub.title}</span>
                            <div className="space-x-2 font-mono">
                              <span className="text-white/50">{sub.attended}</span>
                              <span className="text-teal-400 font-bold">{sub.percent}</span>
                            </div>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-teal-500 h-full" style={{ width: sub.percent }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HOMEWORK DEADLINES CHECK */}
      <AnimatePresence>
        {isHomeworkOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CalendarCheck className="w-6 h-6 text-indigo-500" /> Alex's Assignments</h3>
              <button onClick={() => setIsHomeworkOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="space-y-3">
                {HOMEWORK_LIST.map((hw) => (
                  <div key={hw.id} className="bg-white/5 p-4 rounded-2.5xl border border-white/10 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{hw.subject}</span>
                        <h4 className="text-white font-bold ml-0 mt-0.5 text-xs">{hw.title}</h4>
                      </div>
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${hw.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>{hw.status}</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{hw.description}</p>
                    <span className="text-[9px] text-white/30 block font-mono">Due on schedule: {hw.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SCHOOL ANNOUNCEMENT NEWS */}
      <AnimatePresence>
        {isNewsOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Newspaper className="w-6 h-6 text-orange-500" /> ข่าวสาร & การแจ้งเตือน</h3>
              <button onClick={() => setIsNewsOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            {/* Direct Notification Settings toggle from "รับแจ้งเตือนข่าวสารายภายในโรงเรียนโดยอัตโนมัติ" */}
            <div className="bg-white/5 p-5 border border-orange-500/10 rounded-3xl mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white text-xs font-bold">แจ้งเตือนข่าวด่วนอัตโนมัติ (Auto News Alerts)</h4>
                  <p className="text-[9px] text-white/40">ส่งแจ้งเตือนด่วนผ่านมือถือและแอปพลิเคชันระบบเวลาจริง</p>
                </div>
                <button 
                  onClick={() => {
                    setNewsAlertsEnabled(!newsAlertsEnabled);
                    showToast(newsAlertsEnabled ? "ปิดการแจ้งเตือน SMS ข่าวด่วน" : "เปิดระบบแจ้งเตือน SMS ข่าวด่วนยามวิกฤตเรียบร้อย!");
                  }}
                  className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${newsAlertsEnabled ? 'bg-orange-500' : 'bg-white/10'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${newsAlertsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {newsAlertsEnabled && (
                <div className="flex items-center gap-2 text-[9px] text-emerald-400 font-mono pl-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  เชื่อมต่ออุปกรณ์มือถือ 081-344-9122 (Primary) เปิดรับ SMS สำเร็จ
                </div>
              )}
            </div>

            <div className="space-y-4 overflow-y-auto scrollbar-hide pb-12 flex-1">
              <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">จดหมายข่าวโรงเรียนทั้งหมด (School Bulletin)</h4>
              {[
                { title: 'Annual STEM Chemistry Expo 2026', desc: 'Join other parents to check out digital simulation projects and molecules designs on Tuesday at Multi-purpose cosmic hall.', date: 'Jun 12, 2026', badge: 'วิทยาศาสตร์' },
                { title: 'Standard SDQ Testing Audit Protocol', desc: 'Our school is launching cognitive evaluations to profile student resilience indicators.', date: 'May 28, 2026', badge: 'พฤติกรรม' }
              ].map((news, i) => (
                <div key={i} className="bg-white/5 p-5 border border-white/10 rounded-3xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] text-orange-400 font-bold uppercase tracking-wider">{news.date}</span>
                    <span className="text-[9px] bg-orange-500/10 text-orange-300 px-2 py-0.5 rounded font-mono font-bold text-[8px]">{news.badge}</span>
                  </div>
                  <h4 className="text-white text-xs font-bold">{news.title}</h4>
                  <p className="text-xs text-white/65 leading-relaxed">{news.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. BEHAVIOR AND CONDUCT SCORES */}
      <AnimatePresence>
        {isConductOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Activity className="w-6 h-6 text-blue-500" /> Behavioral & Conduct Logs</h3>
              <button onClick={() => setIsConductOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-white/5 p-6 border border-white/10 rounded-3xl text-center space-y-1">
                <span className="text-[10px] text-blue-400 uppercase tracking-widest font-mono">Conduct Score Index</span>
                <div className="text-4xl text-white font-mono font-black">{alex.conductScore}/100</div>
                <div className="text-xs text-white/40">Highly compliant curriculum interaction</div>
              </div>

              <div className="space-y-2">
                {[
                  { task: "Peer mentoring leadership bonus", pts: "+5", clr: "text-emerald-400" },
                  { task: "Flag ceremony tardiness infraction", pts: "-2", clr: "text-rose-400" }
                ].map((log, i) => (
                  <div key={i} className="bg-[#0A0A0A] border border-white/5 p-4 rounded-xl flex justify-between text-xs">
                    <span className="text-white/80 font-bold">{log.task}</span>
                    <span className={`font-bold font-mono ${log.clr}`}>{log.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. ACADEMIC GRADE CARDS */}
      <AnimatePresence>
        {isGradesOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><FileText className="w-6 h-6 text-pink-500" /> Academic Grade Report</h3>
              <button onClick={() => setIsGradesOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="grid grid-cols-2 gap-3 pb-2 border-b border-white/10">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <div className="text-[9px] text-pink-400 uppercase tracking-widest">GPA Semester 1</div>
                  <div className="text-2xl font-black text-white mt-1">3.94</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <div className="text-[9px] text-pink-400 uppercase tracking-widest">Credits earned</div>
                  <div className="text-2xl font-black text-white mt-1">16.5 / 16.5</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { sub: 'AP Physics', score: '96/100', grade: '4.0' },
                  { sub: 'Vector Calculus', score: '98/100', grade: '4.0' },
                  { sub: 'Computer Science II', score: '88/100', grade: '3.5' }
                ].map((item, id) => (
                  <div key={id} className="bg-white/5 p-4 rounded-2xl flex justify-between items-center text-xs">
                    <span className="text-white font-bold">{item.sub}</span>
                    <span className="font-mono text-pink-400 font-bold">{item.grade} GPA ({item.score})</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. HEALTH CLINICAL INFORMATION */}
      <AnimatePresence>
        {isHealthOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><HeartPulse className="w-6 h-6 text-red-500" /> Student Health Diagnostics</h3>
              <button onClick={() => setIsHealthOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-white/40 block uppercase tracking-widest">Temperature</span>
                  <span className="text-lg font-bold text-white font-mono">{alex.temperature}° C</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-white/40 block uppercase tracking-widest">Weight</span>
                  <span className="text-lg font-bold text-white font-mono">{alex.weight} kg</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-white/40 block uppercase tracking-widest">Blood Type</span>
                  <span className="text-lg font-bold text-white font-mono">{alex.bloodType}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-red-400 block uppercase tracking-widest font-bold">Food Allergies</span>
                  <span className="text-xs font-bold text-red-400">{alex.allergies}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. PARENT Digital Absence Submission */}
      <AnimatePresence>
        {isLeaveOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><MessageCircle className="w-6 h-6 text-violet-500" /> Parent Leave Reporting</h3>
              <button onClick={() => setIsLeaveOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide">
              <div className="bg-violet-500/10 p-5 rounded-3xl border border-violet-500/20 text-xs text-violet-300">
                Authorized guardian skip filing portal. Advisor (Dr. Sarah) will receive immediate live push alerts.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-2">Absence Tag Category</label>
                  <select 
                    value={leaveType} 
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none"
                  >
                    <option value="Sick Leave" className="bg-[#0A0A0A]">Sick Leave (ลาป่วย)</option>
                    <option value="Personal Leave" className="bg-[#0A0A0A]">Personal Business (ลากิจ)</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-2">Reason description</label>
                  <textarea 
                    placeholder="Details for parent verification..." 
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none text-xs h-24"
                  />
                </div>

                <button 
                  onClick={submitLeave}
                  className="w-full py-4 bg-violet-600 hover:bg-violet-550 text-white font-bold rounded-2xl cursor-pointer"
                >
                  File Absence Slip
                </button>

                {leaveStatus && (
                  <div className="p-4 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-mono rounded-2xl">
                    {leaveStatus}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. PARENT SDQ PROFILING BOOKLET */}
      <AnimatePresence>
        {isSDQOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><BrainCircuit className="w-6 h-6 text-purple-500" /> Parent-Side SDQ Evaluator</h3>
              <button onClick={() => setIsSDQOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-purple-500/10 p-5 rounded-3xl border border-purple-500/20 text-xs text-purple-300">
                Please rate Alex's home behavior parameters during the last 6 months to complete standard diagnostic clinical records.
              </div>

              {[
                { id: 1, stmt: "Alex is generally obedient, usually doing what adults request." },
                { id: 2, stmt: "Alex has at least one good friend or peer partner." },
                { id: 3, stmt: "Alex is easily distracted, concentration wanders often." }
              ].map((item) => (
                <div key={item.id} className="bg-white/5 p-4 rounded-2.5xl border border-white/5 space-y-3">
                  <p className="text-xs text-white leading-relaxed font-bold">{item.stmt}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['Not True', 'Somewhat', 'Certainly'].map((lbl, i) => (
                      <button 
                        key={i}
                        onClick={() => setSdqAnswers(prev => ({ ...prev, [item.id]: i }))}
                        className={`py-2 text-[9px] font-black uppercase tracking-wider rounded-xl border cursor-pointer transition-all ${
                          sdqAnswers[item.id] === i ? 'bg-purple-600 text-white border-purple-500' : 'bg-white/5 text-white/50 border-white/10'
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button 
                onClick={handleSdqSubmit}
                className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl shrink-0"
              >
                Submit Guardian Evaluation
              </button>

              {sdqSubmitted && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-555/20 text-emerald-400 text-xs rounded-2xl font-mono leading-relaxed">
                  SDQ Diagnostic Sync completed. Profiles indicate highly supportive educational environment. Added +35 coins to Alex's account!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. ADVISOR PROFILE INFORMATION */}
      <AnimatePresence>
        {isAdvisorOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Users className="w-6 h-6 text-emerald-500" /> Adviser Profile</h3>
              <button onClick={() => setIsAdvisorOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="text-center space-y-4">
                <img src="https://picsum.photos/seed/teacher/150/150" className="w-28 h-28 rounded-full mx-auto border-2 border-emerald-500/30 object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-white text-lg font-black">Prof. Orion Reynolds</h4>
                  <p className="text-xs text-white/40">Senior Educator • Science Department Coordinator</p>
                </div>
              </div>

              <div className="space-y-3 bg-white/5 p-5 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 text-xs text-white">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>081-455-2244</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>orion.science@eduverse.ac.th</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. GPS PIN STUDENT HOME ADDRESS */}
      <AnimatePresence>
        {isLocationOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><MapPinned className="w-6 h-6 text-amber-600" /> Share Student Home</h3>
              <button onClick={() => setIsLocationOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide">
              <div className="bg-amber-500/10 p-5 rounded-3xl border border-amber-500/20 text-xs text-amber-400">
                Transmit highly accurate address coordinate parameters to school bus networks for proactive student safety tracking.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-2">Registered Address Location</label>
                  <input 
                    type="text" 
                    value={addressPin}
                    onChange={(e) => setAddressPin(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-xs focus:outline-none"
                  />
                </div>

                <button 
                  onClick={pinHomeAddress}
                  className="w-full py-4 bg-amber-600 text-white font-bold rounded-2xl cursor-pointer"
                >
                  Pin GPS Coordinates
                </button>

                {addressStatus && (
                  <div className="p-4 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-mono rounded-2xl">
                    {addressStatus}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 11. UNLIMITED ADDITIONAL GUARDIANS */}
      <AnimatePresence>
        {isGuardiansOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><UserPlus className="w-6 h-6 text-rose-500" /> Co-Guardians</h3>
              <button onClick={() => setIsGuardiansOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="space-y-2">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">Active Alerts Receivers</h4>
                {guardiansList.map((g, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center text-xs">
                    <div>
                      <div className="text-white font-bold">{g.name}</div>
                      <div className="text-[10px] text-white/50">{g.relation}</div>
                    </div>
                    <span className="font-mono text-white/40 font-bold">{g.phone}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddGuardian} className="bg-white/5 p-5 border border-white/10 rounded-3xl space-y-4">
                <h4 className="text-white font-bold text-sm">Add Free Guardian Alerts</h4>
                
                <input 
                  type="text" 
                  placeholder="Full name" 
                  value={newGuardianName}
                  onChange={(e) => setNewGuardianName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                />

                <select 
                  value={newGuardianRelation}
                  onChange={(e) => setNewGuardianRelation(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none bg-black"
                >
                  <option value="Grandparent">Grandparent</option>
                  <option value="Uncle / Aunt">Uncle / Aunt</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Tutor / Coach">Tutor / Coach</option>
                </select>

                <input 
                  type="text" 
                  placeholder="Tel telephone number" 
                  value={newGuardianPhone}
                  onChange={(e) => setNewGuardianPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                />

                <button 
                  type="submit" 
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase rounded-xl"
                >
                  Register Guardian
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 12. PARENT GUIDANCE ARTICLES */}
      <AnimatePresence>
        {isArticlesOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Book className="w-6 h-6 text-blue-600" /> Parenting Wisdom Library</h3>
              <button onClick={() => setIsArticlesOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            {/* Categories filters */}
            <div className="flex gap-2 items-center overflow-x-auto pb-4 scrollbar-hide mb-4">
              {['All', 'Wellness', 'Acoustics', 'Cognitive', 'Nutrition'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setArticleFilter(cat)}
                  className={`py-1.5 px-4 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    articleFilter === cat ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12 flex-1">
              {PARENTING_ARTICLES.filter(art => {
                if (articleFilter === 'All') return true;
                return art.category.toLowerCase() === articleFilter.toLowerCase();
              }).map((art) => (
                <div key={art.id} className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase">{art.category}</span>
                    <span className="text-[10px] text-white/30 font-mono">{art.time}</span>
                  </div>
                  <h4 className="text-white text-xs font-black leading-tight">{art.title}</h4>
                  <p className="text-xs text-white/55 leading-relaxed">{art.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 13. AFTER-HOURS EDUCATION CLINIC (คลินิกนัดหมายเวลา ปรึกษาครูรายคน) */}
      <AnimatePresence>
        {isClinicOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Headset className="w-6 h-6 text-rose-500" /> คลินิกการศึกษานอกเวลา</h3>
              <button onClick={() => setIsClinicOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12 flex-1">
              <div className="bg-rose-500/10 p-5 rounded-3xl border border-rose-500/20 text-xs text-rose-300 leading-relaxed">
                <strong>Education Clinic</strong>: บริการนัดหมายครูผู้สอนเพื่อลงเวลาปรึกษาพัฒนาการเรียน พฤติกรรมของบุตรหลาน หรือปรึกษารายความถนัดแบบตัวต่อตัวนอกเวลาเรียน
              </div>

              {/* Current booked list */}
              <div className="space-y-3">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">การนัดหมายปัจจุบันของคุณ (Active Consultations)</h4>
                {clinicBookings.length === 0 ? (
                  <p className="text-xs text-white/30 italic pl-1">ไม่มีประวัติการนัดหมายในเทอมนี้</p>
                ) : (
                  clinicBookings.map((bk, i) => (
                    <div key={i} className="bg-white/5 border border-rose-500/20 p-4 rounded-2xl flex flex-col space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-xs font-bold">{bk.teacher}</span>
                        <span className="text-[9px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-mono font-bold">{bk.type}</span>
                      </div>
                      <div className="text-[11px] text-white/60">เรื่อง: {bk.topic}</div>
                      <div className="text-[10px] text-pink-400 font-mono">เวลาที่นัด: {bk.time}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Booking Input Form */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
                <h4 className="text-white font-bold text-sm">จองเวลาปรึกษาคุณครู (Book Appointment)</h4>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest pl-1">ครูที่ต้องการนัดหมาย</label>
                  <select 
                    value={clinicTeacher}
                    onChange={(e) => setClinicTeacher(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white text-xs font-bold focus:outline-none"
                  >
                    <option value="Dr. Orion Reynolds (ครูที่ปรึกษา)">Dr. Orion Reynolds (ครูที่ปรึกษา / วิทยาศาตร์)</option>
                    <option value="Prof. Sarah Jenkins (แคลคูลัส)">Prof. Sarah Jenkins (คณิตศาสตร์)</option>
                    <option value="Master Alan Turing (วิทยาการคำนวณ)">Master Alan Turing (วิทยาการคำนวณ)</option>
                    <option value="Teacher Lisa Stark (เคมี)">Teacher Lisa Stark (เคมีอินทรีย์)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest pl-1">เรื่องที่ต้องการปรึกษา</label>
                  <input 
                    type="text" 
                    placeholder="เช่น สมาธิการเรียนวิชาฟิสิกส์, แผนเลือกสายมหาลัย" 
                    value={clinicTopic}
                    onChange={(e) => setClinicTopic(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest pl-1">รูปแบบการพบ</label>
                    <select 
                      value={clinicType}
                      onChange={(e) => setClinicType(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white text-[10px] focus:outline-none"
                    >
                      <option value="Zoom ออนไลน์">Zoom ออนไลน์</option>
                      <option value="พบกันที่ห้องวิชาการ">พบกันที่ห้องวิชาการ</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest pl-1">เวลาที่คุณสะดวก</label>
                    <input 
                      type="text" 
                      placeholder="เช่น อังคาร 18:00 น." 
                      value={clinicTime}
                      onChange={(e) => setClinicTime(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white text-[10px] focus:outline-none"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!clinicTopic || !clinicTime) return;
                    setClinicBookings(prev => [...prev, { teacher: clinicTeacher, time: clinicTime, topic: clinicTopic, type: clinicType }]);
                    showToast("บันทึกนัดหมายสำเร็จ! คุณครูจะตอบรับเวลาเข้าเครื่องช่วยเตือนใน 15 นาที");
                  }}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 rounded-xl text-white font-bold text-xs uppercase cursor-pointer transition-colors"
                >
                  ยืนยันยืนยันตัวตนส่งนัดหมาย
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 14. SYLLABUS/CURRICULUM TRACKING (ผู้ปกครองติดตามหลักสูตรการสอนและแผนการส่ง) */}
      <AnimatePresence>
        {isCurriculumOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Microscope className="w-6 h-6 text-amber-500" /> Syllabus Tracker</h3>
              <button onClick={() => setIsCurriculumOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12 flex-1">
              <div className="bg-amber-500/10 p-5 rounded-3xl border border-amber-500/20 text-xs text-amber-400 leading-relaxed">
                <strong>ติดตามความคืบหน้าหลักสูตร</strong>: แผนที่แสดงสาระการเรียนรู้ปัจจุบันของ Alex ในแต่ละรายวิชาที่สถานศึกษาผู้สอนดำเนินการจริง
              </div>

              {[
                { subject: "Advanced Physics (AP-12)", progress: 85, activeTopic: "ธรรมาภิบาลของกลศาสตร์สมพัทธภาพและการรวมแรงสนาม", goal: "นักเรียนอภิปรายสูตรคำนวณและประดิษฐ์แกนจำลองวิญญาณระดับอะตอมได้", instructor: "Dr. Orion Reynolds" },
                { subject: "Vector Calculus", progress: 70, activeTopic: "ลิมิตของฟังก์ชันสองตัวแปรและผิวโค้งอินทิเกรตสามชั้น", goal: "คำนวณหาปริมาตรหีบชัตเทิลสำรองได้ด้วยทฤษฎีบทกรีนอย่างแม่นยำ", instructor: "Prof. Sarah Jenkins" },
                { subject: "Computer Science II", progress: 95, activeTopic: "ฟังก์ชันของเทคโนโลยีโครงข่ายประสาทลูปร้อน (Transformer Models)", goal: "พัฒนาและแก้ไขโมดูลคัดกรองพฤติกรรมการเรียนเพื่อรับใบเซอร์เกียรติบัตร", instructor: "Master Alan Turing" }
              ].map((sub, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-3xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">{sub.instructor}</span>
                      <h4 className="text-white text-sm font-bold">{sub.subject}</h4>
                    </div>
                    <span className="text-xs text-amber-400 font-mono font-bold">{sub.progress}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full" style={{ width: `${sub.progress}%` }}></div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-white/70">
                    <div><span className="text-[10px] text-white/30 uppercase pl-1 block">เรื่องที่กำลังเรียน (Current Topic)</span> <p className="pl-1 text-white font-medium">{sub.activeTopic}</p></div>
                    <div className="pt-1"><span className="text-[10px] text-white/30 uppercase pl-1 block font-bold">วัตถุประสงค์ (Learning Objective)</span> <p className="pl-1 italic text-white/50">{sub.goal}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 15. COLLABORATIVE PARENT COOPERATIVE COMMUNITY (ชุมชนผู้ปกครอง ร่วมมือช่วยเหลือกัน) */}
      <AnimatePresence>
        {isCommunityOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Network className="w-6 h-6 text-cyan-400" /> ชุมชนผู้ปกครองร่วมมือ</h3>
              <button onClick={() => setIsCommunityOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>

            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12 flex-1">
              <div className="bg-cyan-500/10 p-5 rounded-3xl border border-cyan-500/20 text-xs text-cyan-300 leading-normal">
                ช่องทางสำหรับผู้ปกครองร่วมแลกเปลี่ยนความเห็น ไอเดียการพัฒนาผู้เรียน ตลอดจนแนวทางจัดหาโครงงานย่อยระดับมัธยมร่วมกันอย่างปลอดภัย
              </div>

              {/* Form to submit thread */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
                <h4 className="text-white font-bold text-xs">ตั้งกระทู้ใหม่ในบอร์ดชุมชน (Create Discussion Thread)</h4>
                
                <input 
                  type="text" 
                  placeholder="หัวข้อกระทู้เด็ด เช่น คอร์สวิทย์พิเศษฤดูร้อน" 
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none"
                />

                <textarea 
                  placeholder="เขียนอธิบายคำตอบ ข้อมูล หรือต้องการปรึกษา..." 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-xs text-white h-20 focus:outline-none resize-none"
                />

                <div className="flex justify-between items-center">
                  <select 
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="bg-[#0A0A0A] border border-white/10 text-white rounded-xl p-2 text-[10px] focus:outline-none"
                  >
                    <option value="แชร์ความรู้">แชร์ความรู้</option>
                    <option value="เตรียมสอบ">เตรียมสอบ</option>
                    <option value="กิจกรรมวิทยาศาสตร์">กิจกรรมวิทยาศาสตร์</option>
                    <option value="สุขภาพและความประพฤติ">สุขภาพและความประพฤติ</option>
                  </select>

                  <button 
                    onClick={() => {
                      if (!newPostTitle || !newPostContent) return;
                      setCommunityThreads(prev => [
                        {
                          id: Date.now(),
                          author: "คุณแม่วิภาวี (แม่ของ Alex) - ปัจจุบัน",
                          title: newPostTitle,
                          content: newPostContent,
                          category: newPostCategory,
                          likes: 1,
                          replies: 0
                        },
                        ...prev
                      ]);
                      setNewPostTitle("");
                      setNewPostContent("");
                      showToast("ส่งกระทู้ขึ้นกระดานบอร์ดผู้ปกครองสำเร็จ!");
                    }}
                    className="py-2.5 px-6 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-white font-bold text-xs uppercase cursor-pointer"
                  >
                    ตั้งกระทู้
                  </button>
                </div>
              </div>

              {/* Feed threads list */}
              <div className="space-y-4">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-1">กระทู้ยอดนิยม (Forum Feed)</h4>
                {communityThreads.map((th) => (
                  <div key={th.id} className="bg-white/5 border border-white/5 p-5 rounded-3xl space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-cyan-400 font-mono font-bold">{th.author}</span>
                      <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded text-[8px] font-bold uppercase">{th.category}</span>
                    </div>
                    <h4 className="text-white text-xs font-bold">{th.title}</h4>
                    <p className="text-[11px] text-white/55 leading-relaxed">{th.content}</p>
                    <div className="flex items-center gap-4 text-[10px] text-white/30 pt-2 border-t border-white/5">
                      <button 
                        onClick={() => {
                          setCommunityThreads(prev => prev.map(t => t.id === th.id ? { ...t, likes: t.likes + 1 } : t));
                        }}
                        className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                      >
                        👍 ถูกใจ ({th.likes})
                      </button>
                      <span>💬 {th.replies} ตอบพ่วง</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center justify-around px-4 shadow-2xl">
        <button className="p-2 text-teal-400 cursor-pointer"><LayoutDashboard className="w-6 h-6" /></button>
        <button onClick={() => setIsLeaveOpen(true)} className="p-2 text-white/40 cursor-pointer"><MessageSquare className="w-6 h-6" /></button>
        <div className="w-12 h-12 bg-gradient-to-tr from-teal-500 to-cyan-500 rounded-full flex items-center justify-center -translate-y-6 shadow-xl border-4 border-[#0A0A0A]">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <button onClick={() => setIsHomeworkOpen(true)} className="p-2 text-white/40 cursor-pointer"><CalendarCheck className="w-6 h-6" /></button>
        <button onClick={() => setIsNewsOpen(true)} className="p-2 text-white/40 cursor-pointer"><Newspaper className="w-6 h-6" /></button>
      </div>

      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute bottom-24 left-6 right-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-3.5 rounded-xl border border-teal-400/30 text-xs font-semibold shadow-2xl z-[999] flex items-center gap-2.5"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
