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
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
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
    alert("🚀 Complete: homework assignment dispatched to all registered student calendars!");
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
    alert("Voluntary service hours index certified on educational ledger!");
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

        {/* Feature Icons Grid - Full 9 buttons required for Teacher */}
        <div>
          <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Classroom Administration</h4>
          <div className="grid grid-cols-3 gap-3">
            <FeatureItem icon={Clock} label="เช็คชื่อรายคาบ" color="bg-amber-500" onClick={() => setIsAttendanceOpen(true)} />
            <FeatureItem icon={Navigation} label="เช็คหน้าเสาธง" color="bg-orange-500" onClick={() => setIsFlagOpen(true)} />
            <FeatureItem icon={MapPinned} label="สถิติ เข้า-ออก" color="bg-rose-500" onClick={() => setIsLogOpen(true)} />
            
            <FeatureItem icon={HeartPulse} label="ดูแลช่วยเหลือ (5 ขั้น)" color="bg-rose-600" onClick={() => setIsSupportSystemOpen(true)} />
            <FeatureItem icon={BrainCircuit} label="ประเมินพฤติกรรม SDQ" color="bg-purple-500" onClick={() => setIsSdqOpen(true)} />
            <FeatureItem icon={MessageCircle} label="สื่อสาร & สั่งการบ้าน" color="bg-blue-500" onClick={() => setIsCommOpen(true)} />
            
            <FeatureItem icon={CalendarCheck} label="พิจารณาอนุมัติลา" color="bg-indigo-500" onClick={() => setIsLeaveApprovalOpen(true)} />
            <FeatureItem icon={Sparkles} label="อนุมัติจิตอาสา" color="bg-teal-600" onClick={() => setIsVolunteerOpen(true)} />
            <FeatureItem icon={ClipboardCheck} label="นิเทศการสอนวิจัย" color="bg-slate-600" onClick={() => setIsLessonOpen(true)} />
          </div>
        </div>

        {/* AI Copilot Widget */}
        <div className="bg-gradient-to-br from-amber-950 to-slate-900 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-15">
            <Cpu className="w-16 h-16 text-amber-500" />
          </div>
          <div className="relative z-10 space-y-4">
            <div>
              <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">AI Copilot Analysis</div>
              <h4 className="text-white font-bold text-lg">Struggling Student Interventions</h4>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">3 students are lagging behind on Vector Calculus limits: Jordan Comet is at HIGH risk. Recommended counseling clinic review.</p>
          </div>
        </div>
      </div>

      {/* --- ALL MODULE MODALS --- */}

      {/* 1. CLASSROOM PERIOD ATTENDANCE */}
      <AnimatePresence>
        {isAttendanceOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Clock className="w-6 h-6 text-amber-500" /> Class Attendance</h3>
              <button onClick={() => setIsAttendanceOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-white/60">
                Tap on any student box to cycle through status: **Present (มา)** ➔ **Late (สาย)** ➔ **Leave (ลา)** ➔ **Absent (ขาด)**.
              </div>

              <div className="space-y-2">
                {students.map(stu => (
                  <button 
                    key={stu.id} 
                    onClick={() => toggleAttendance(stu.id)}
                    className="w-full bg-white/5 p-4 rounded-2.5xl border border-white/10 flex justify-between items-center text-left hover:bg-white/10 active:scale-98 transition-all cursor-pointer"
                  >
                    <div>
                      <div className="text-white text-xs font-bold">{stu.name}</div>
                      <div className="text-[9px] text-white/40">{stu.grade}</div>
                    </div>
                    <span className={`text-[10px] font-bold font-mono px-3 py-1 rounded-lg ${
                      attendance[stu.id] === 'Present' ? 'bg-emerald-500/15 text-emerald-450 text-emerald-400' :
                      attendance[stu.id] === 'Late' ? 'bg-orange-500/15 text-orange-400' :
                      attendance[stu.id] === 'Leave' ? 'bg-blue-500/15 text-blue-400' :
                      'bg-rose-500/15 text-rose-450 text-rose-400'
                    }`}>{attendance[stu.id]}</span>
                  </button>
                ))}
              </div>
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
                    onClick={() => alert(`Locking psychiatric SDQ diagnostic checklist parameters for ${stu.name}`)}
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

      {/* Bottom Nav spacer */}
      <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center justify-around px-4 shadow-2xl">
        <button className="p-2 text-amber-500 cursor-pointer"><LayoutDashboard className="w-6 h-6" /></button>
        <button onClick={() => setIsCommOpen(true)} className="p-2 text-white/40 cursor-pointer"><MessageSquare className="w-6 h-6" /></button>
        <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-full flex items-center justify-center -translate-y-6 shadow-xl border-4 border-[#0A0A0A]">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <button onClick={() => setIsLeaveApprovalOpen(true)} className="p-2 text-white/40 cursor-pointer"><CalendarCheck className="w-6 h-6" /></button>
        <button onClick={() => alert("Settings toggled! Educational profile matches system default standards.")} className="p-2 text-white/40 cursor-pointer"><Settings className="w-6 h-6" /></button>
      </div>
    </motion.div>
  );
}
