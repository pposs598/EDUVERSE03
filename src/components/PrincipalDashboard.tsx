import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Users, Clock, Navigation, MapPinned, 
  MessageSquare, Settings, Sparkles, Book, Newspaper, CreditCard, 
  Network, Microscope, Target, Headset, Smile, CalendarCheck, 
  LayoutDashboard, HeartPulse, BrainCircuit, MessageCircle, 
  ClipboardCheck, Monitor, Award, Stethoscope, Activity, Cpu, 
  ShieldCheck, BarChart3, Plus, Check, Play, Pause, Coins, Flame,
  FileText, Download, Send, Sliders, ChevronRight
} from 'lucide-react';
import { 
  RESEARCH_PAPERS, LIBRARY_BOOKS, STUDENTS_LIST, DAO_PROPOSALS
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

export default function PrincipalDashboard({ onLogout }: { onLogout: () => void }) {
  // Navigation modals
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isPersonnelOpen, setIsPersonnelOpen] = useState(false);
  const [isLessonOpen, setIsLessonOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // States
  const [financialBalance, setFinancialBalance] = useState(12450000);
  const [allocatedBudget, setAllocatedBudget] = useState({
    academic: 4500000,
    infrastructure: 3200000,
    personnel: 2800000,
    tech: 1950000
  });

  const [auditScore, setAuditScore] = useState(94);
  const [activeObservationCount, setActiveObservationCount] = useState(2);

  // Personnel status states
  const [teachersStatus, setTeachersStatus] = useState<Array<{ name: string; position: string; checkin: string; status: 'Active' | 'Late' | 'On Leave' }>>([
    { name: 'Prof. Orion Reynolds', position: 'AP Science Coordinator', checkin: '07:32 AM', status: 'Active' },
    { name: 'Dr. Sarah Thompson', position: 'Math Department Dean', checkin: '07:28 AM', status: 'Active' },
    { name: 'Mr. John Kepler', position: 'Astronomy & Computing', checkin: '07:55 AM', status: 'Active' },
    { name: 'Dr. Marie Curie', position: 'Chemistry Lab Head', checkin: '08:12 AM', status: 'Late' },
    { name: 'Ms. Ada Lovelace', position: 'Junior Cyber Coordinator', checkin: '--:--', status: 'On Leave' }
  ]);

  const toggleTeacherStatus = (name: string) => {
    setTeachersStatus(curr => curr.map(t => {
      if (t.name === name) {
        const next: 'Active' | 'Late' | 'On Leave' = t.status === 'Active' ? 'Late' : t.status === 'Late' ? 'On Leave' : 'Active';
        return { ...t, status: next };
      }
      return t;
    }));
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
              <p className="text-orange-500 text-[10px] uppercase tracking-widest font-mono">School Principal</p>
            </div>
          </div>
          <button onClick={onLogout} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide pb-28">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-orange-500/10 p-4 rounded-3xl border border-orange-500/20">
            <div className="text-[9px] font-bold text-orange-450 uppercase tracking-widest mb-1">Teacher Attendance</div>
            <div className="text-2xl font-bold font-mono text-white">98.5%</div>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-3xl border border-cyan-500/20">
            <div className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Budget Status</div>
            <div className="text-2.5xl font-bold font-mono text-white">92% Utilized</div>
          </div>
        </div>

        {/* Principal Icon Grid - Full 6 buttons required  */}
        <div>
          <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Executive Dashboard Overview</h4>
          <div className="grid grid-cols-3 gap-3">
            <FeatureItem icon={BarChart3} label="ข้อมูลสถิติภาพรวม" color="bg-orange-500" onClick={() => setIsStatsOpen(true)} />
            <FeatureItem icon={Users} label="ข้อมูลผู้บริหาร&ครู" color="bg-amber-500" onClick={() => setIsPersonnelOpen(true)} />
            <FeatureItem icon={ClipboardCheck} label="นิเทศการสอนทั้งหมด" color="bg-slate-600" onClick={() => setIsLessonOpen(true)} />
            
            <FeatureItem icon={Cpu} label="AI วิเคราะห์ความเสี่ยง" color="bg-indigo-500" onClick={() => setIsAiOpen(true)} />
            <FeatureItem icon={CreditCard} label="งบประมาณโรงเรียน" color="bg-blue-600" onClick={() => setIsFinancialOpen(true)} />
            <FeatureItem icon={ShieldCheck} label="Policy Track สพฐ." color="bg-teal-500" onClick={() => setIsPolicyOpen(true)} />
          </div>
        </div>

        {/* Executive Action Insights Card */}
        <div className="bg-gradient-to-br from-orange-950 to-slate-900 border border-orange-500/10 rounded-[2rem] p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-15">
            <Activity className="w-16 h-16 text-orange-400" />
          </div>
          <div className="relative z-10 space-y-4">
            <div>
              <div className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-1">Director Insights</div>
              <h4 className="text-white font-bold text-md">Campus attendance rate is up 12% compared to last terms. High efficiency overall.</h4>
            </div>
          </div>
        </div>
      </div>

      {/* --- EXECUTIVE MODALS --- */}

      {/* 1. COMPREHENSIVE OVERALL STATISTICS */}
      <AnimatePresence>
        {isStatsOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><BarChart3 className="w-6 h-6 text-orange-500" /> Statistics & Reports</h3>
              <button onClick={() => setIsStatsOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] text-white/40 block uppercase tracking-widest">Global Attendance</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">96.8%</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] text-white/40 block uppercase tracking-widest">Truancy / Absent rate</span>
                  <span className="text-xl font-bold text-rose-450 text-rose-400 font-mono">1.2%</span>
                </div>
              </div>

              <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest">Excellent Merits & Honors</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 bg-[#0A0A0A] border border-white/5 rounded-xl">
                    <span className="text-white">Alex Universe (AP Physics Project Lead)</span>
                    <span className="text-orange-400 font-bold">Standard Gold Award</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#0A0A0A] border border-white/5 rounded-xl">
                    <span className="text-white">Taylor Sparks (Robotics coding MVP)</span>
                    <span className="text-orange-400 font-bold">National Finalist</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PERSONNEL MANAGEMENT */}
      <AnimatePresence>
        {isPersonnelOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Users className="w-6 h-6 text-amber-500" /> Executive HR Status</h3>
              <button onClick={() => setIsPersonnelOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-white/60">
                Tracking all 48 registered teachers. Click on any teacher below to dynamically toggle status: Active ➔ Late ➔ On Leave.
              </div>

              <div className="space-y-2">
                {teachersStatus.map(t => (
                  <button 
                    key={t.name}
                    onClick={() => toggleTeacherStatus(t.name)}
                    className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center text-left hover:bg-white/10 cursor-pointer"
                  >
                    <div>
                      <div className="text-white font-bold text-xs">{t.name}</div>
                      <div className="text-[10px] text-white/40">{t.position}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-white">{t.checkin}</div>
                      <span className={`text-[9px] font-bold uppercase ${
                        t.status === 'Active' ? 'text-emerald-400' : t.status === 'Late' ? 'text-orange-400' : 'text-rose-400'
                      }`}>{t.status}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. EXECUTIVE LESSON SUPERVISIONS */}
      <AnimatePresence>
        {isLessonOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><ClipboardCheck className="w-6 h-6 text-slate-500" /> Teaching Observation Audits</h3>
              <button onClick={() => setIsLessonOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-slate-500/10 p-5 border border-slate-500/20 text-xs text-slate-350 text-white rounded-3xl leading-relaxed">
                48 teaching observations successfully logged inside the research database this semester. Standard performance is 94.2% compliant.
              </div>
              <div className="space-y-2">
                {[
                  { title: "Special Relativity AP Syllabus", teacher: "Prof. Orion Reynolds", score: "96%", status: "Meets high standard" },
                  { title: "Comprehension of Silicon Microchips", teacher: "Dr. Sarah Thompson", score: "98%", status: "Exemplary" },
                  { title: "DNA Hybridization laboratory guidelines", teacher: "Dr. Marie Curie", score: "89%", status: "Standard Passed" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-4 border border-white/5 rounded-2xl flex justify-between items-center text-xs text-white">
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-[10px] text-white/40">{item.teacher}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold font-mono">{item.score}</div>
                      <span className="text-[8px] text-white/50 block font-mono uppercase">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. AI RISK FORECASTING ANALYTICS */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Cpu className="w-6 h-6 text-indigo-500" /> Proactive AI Risk Analytics</h3>
              <button onClick={() => setIsAiOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-indigo-500/10 p-5 rounded-3xl border border-indigo-500/20 text-xs text-indigo-300 leading-relaxed">
                Our cognitive neural model analyses 10 years of student telemetry to identify academic and behavioral drop-out risk signals.
              </div>

              <div className="bg-white/5 p-5 border border-white/10 rounded-3xl space-y-3">
                <h4 className="text-white font-bold text-xs uppercase tracking-widest">Comprehension Friction Forecast (Q3)</h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">AP Physics wave analysis lag</span>
                      <span className="text-rose-400 font-bold font-mono">High Risk (82% probability)</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 w-4/5"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">CS algorithmic coordinate limits</span>
                      <span className="text-yellow-400 font-bold font-mono">Medium Risk (45% probability)</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 w-2/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SCHOOL BUGET FINANCIALS */}
      <AnimatePresence>
        {isFinancialOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><CreditCard className="w-6 h-6 text-blue-400" /> School Financials & Canteen</h3>
              <button onClick={() => setIsFinancialOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-20">
                  <BarChart3 className="w-24 h-24 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Total Annual Budget</div>
                  <div className="text-4xl font-mono font-bold text-white mb-8">฿ {financialBalance.toLocaleString()}</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[8px] text-white/40 uppercase tracking-widest">Fiscal Year</div>
                      <div className="text-sm font-mono text-white">2026-2027</div>
                    </div>
                    <div className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-md">Active</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Budget Allocation</h4>
                {[
                  { title: 'Academic Programs', amount: '฿ 4,500,000', percent: '36%' },
                  { title: 'Infrastructure', amount: '฿ 3,200,000', percent: '25%' },
                  { title: 'Personnel payroll', amount: '฿ 2,800,000', percent: '22%' },
                  { title: 'Frontier Tech Ecosystem', amount: '฿ 1,950,000', percent: '17%' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-white font-bold">{item.title}</div>
                      <div className="text-white/60 font-mono">{item.amount}</div>
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

      {/* 6. POLICY COMPLIANCE TRACKER 스พฐ. / OBEC */}
      <AnimatePresence>
        {isPolicyOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-50 bg-[#0A0A0A] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><ShieldCheck className="w-6 h-6 text-teal-500" /> Policy Compliance Track</h3>
              <button onClick={() => setIsPolicyOpen(false)} className="p-2 bg-white/5 rounded-full cursor-pointer"><ArrowLeft className="w-6 h-6 text-white" /></button>
            </div>
            <div className="space-y-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="bg-teal-500/10 p-5 rounded-3xl border border-teal-500/20 text-xs text-teal-400 font-mono leading-relaxed">
                Standard Сompliance tracker synced directly with OBEC (สพฐ.) education protection guidelines. Total criteria passing is 94.0%.
              </div>

              {[
                { title: 'Standard SDQ child reporting metrics', status: 'Compliant (100%)' },
                { title: 'Secure school boundary RFID scanners', status: 'Compliant (100%)' },
                { title: 'Vulnerable student counselor referral network', status: 'In Review (92%)' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-4 border border-white/5 rounded-xl flex justify-between items-center text-xs text-white">
                  <span className="font-bold">{item.title}</span>
                  <span className="text-teal-400 font-mono font-bold">{item.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav spacer */}
      <div className="absolute bottom-6 left-6 right-6 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center justify-around px-4 shadow-2xl">
        <button className="p-2 text-orange-500 cursor-pointer"><LayoutDashboard className="w-6 h-6" /></button>
        <button className="p-2 text-white/40 cursor-pointer" onClick={() => showToast("📞 Connecting direct secure chat channel to Advisor...")}><MessageSquare className="w-6 h-6" /></button>
        <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-full flex items-center justify-center -translate-y-6 shadow-xl border-4 border-[#0A0A0A]">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <button className="p-2 text-white/40 cursor-pointer" onClick={() => setIsStatsOpen(true)}><BarChart3 className="w-6 h-6" /></button>
        <button onClick={() => showToast("⚙️ Configurations verified with Ministry core server.")} className="p-2 text-white/40 cursor-pointer"><Settings className="w-6 h-6" /></button>
      </div>

      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute bottom-24 left-6 right-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white p-3.5 rounded-xl border border-orange-450/30 text-xs font-semibold shadow-2xl z-[999] flex items-center gap-2.5"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
