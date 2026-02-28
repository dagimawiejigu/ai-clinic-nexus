import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  Plus, 
  Trash2, 
  ChevronRight, 
  BrainCircuit,
  AlertCircle,
  FileText,
  Pill,
  Activity
} from 'lucide-react';
import { useClinicStore } from '../../hooks/useClinicStore';
import { toast } from 'sonner';
import { Medication } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

export function ConsultationRoom({ initialPatientId }: { initialPatientId: string | null }) {
  const { patients, addConsultation } = useClinicStore();
  const [selectedPatientId, setSelectedPatientId] = useState(initialPatientId || '');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const [newMed, setNewMed] = useState<Medication>({
    name: '',
    dosage: '',
    frequency: '',
    duration: ''
  });

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const handleAddMedication = () => {
    if (!newMed.name || !newMed.dosage) return;
    setMedications([...medications, newMed]);
    setNewMed({ name: '', dosage: '', frequency: '', duration: '' });
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const runAiAnalysis = () => {
    if (!symptoms) {
      toast.error('Please enter symptoms first');
      return;
    }
    setIsAiAnalyzing(true);
    
    // Simulate AI Processing
    setTimeout(() => {
      let analysis = "";
      const s = symptoms.toLowerCase();
      
      if (s.includes('fever') && s.includes('cough')) {
        analysis = "The combination of fever and cough suggests a respiratory infection. Differential diagnoses include Common Cold, Influenza, or potentially COVID-19. Recommended: Viral test and rest.";
        setDiagnosis("Viral Upper Respiratory Tract Infection");
        setTreatment("Supportive care, hydration, and fever management.");
      } else if (s.includes('headache') && s.includes('light')) {
        analysis = "Symptoms consistent with Migraine headache. Note the photophobia. Recommended: NSAIDs and dark room rest.";
        setDiagnosis("Migraine Headaches");
        setTreatment("Pain relief and trigger avoidance.");
      } else {
        analysis = "Based on the provided symptoms, further physical examination is required. Consider monitoring vitals and conducting blood tests if persistent.";
      }
      
      setAiAnalysis(analysis);
      setIsAiAnalyzing(false);
      toast.success('AI Analysis complete!');
    }, 2000);
  };

  const handleSave = () => {
    if (!selectedPatientId || !symptoms || !diagnosis) {
      toast.error('Please complete the consultation details');
      return;
    }

    addConsultation({
      patientId: selectedPatientId,
      symptoms,
      diagnosis,
      treatment,
      medications,
      aiAnalysis: aiAnalysis || undefined
    });

    toast.success('Consultation record saved');
    setSymptoms('');
    setDiagnosis('');
    setTreatment('');
    setMedications([]);
    setAiAnalysis(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col h-full gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Consultation Room</h2>
          <p className="text-slate-500">Record symptoms, diagnosis, and treatment with AI assistance.</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          Save Record
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Left Column: Input */}
        <div className="lg:col-span-8 space-y-6 overflow-y-auto pr-2 pb-12 scrollbar-hide">
          {/* Patient Selection */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <label className="text-sm font-bold text-slate-700 mb-3 block">Selected Patient</label>
            <select
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={selectedPatientId}
              onChange={e => setSelectedPatientId(e.target.value)}
            >
              <option value="">Select a patient...</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.firstName} {p.lastName} (ID: {p.id.slice(0,5)})</option>
              ))}
            </select>
            {selectedPatient && (
              <div className="mt-4 flex gap-4 p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                <div className="flex-1">
                  <p className="text-xs text-teal-600 font-bold uppercase">Age / Gender</p>
                  <p className="text-slate-800 font-medium capitalize">{selectedPatient.dob || 'N/A'} • {selectedPatient.gender}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-teal-600 font-bold uppercase">Contact</p>
                  <p className="text-slate-800 font-medium">{selectedPatient.phone}</p>
                </div>
              </div>
            )}
          </section>

          {/* Symptoms & AI Support */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <FileText size={18} className="text-teal-600" />
                Presenting Symptoms
              </label>
              <button
                onClick={runAiAnalysis}
                disabled={isAiAnalyzing}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  isAiAnalyzing 
                  ? 'bg-slate-100 text-slate-400' 
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {isAiAnalyzing ? 'Analyzing...' : <><BrainCircuit size={16} /> AI Analyze</>}
              </button>
            </div>
            <textarea
              rows={4}
              placeholder="Enter patient's reported symptoms..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
              value={symptoms}
              onChange={e => setSymptoms(e.target.value)}
            ></textarea>

            <AnimatePresence>
              {aiAnalysis && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl relative overflow-hidden"
                >
                  <div className="flex items-start gap-3 relative z-10">
                    <Sparkles className="text-indigo-600 mt-1 shrink-0" size={18} />
                    <div>
                      <h4 className="text-sm font-bold text-indigo-900 mb-1">AI Counselor Insight</h4>
                      <p className="text-sm text-indigo-800/80 leading-relaxed">{aiAnalysis}</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <BrainCircuit size={64} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Diagnosis & Treatment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Stethoscope size={18} className="text-teal-600" />
                Diagnosis
              </label>
              <input
                type="text"
                placeholder="Final clinical diagnosis"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
              />
            </section>
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Activity size={18} className="text-teal-600" />
                Treatment Plan
              </label>
              <input
                type="text"
                placeholder="Core treatment strategy"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                value={treatment}
                onChange={e => setTreatment(e.target.value)}
              />
            </section>
          </div>

          {/* Medication Table */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <label className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Pill size={18} className="text-teal-600" />
              Medication & Counseling
            </label>
            
            <div className="grid grid-cols-4 gap-3 mb-4">
              <input
                placeholder="Medication Name"
                className="col-span-1 text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                value={newMed.name}
                onChange={e => setNewMed({...newMed, name: e.target.value})}
              />
              <input
                placeholder="Dosage (e.g. 500mg)"
                className="col-span-1 text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                value={newMed.dosage}
                onChange={e => setNewMed({...newMed, dosage: e.target.value})}
              />
              <input
                placeholder="Freq (e.g. BID)"
                className="col-span-1 text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                value={newMed.frequency}
                onChange={e => setNewMed({...newMed, frequency: e.target.value})}
              />
              <button
                onClick={handleAddMedication}
                className="bg-teal-50 text-teal-600 font-bold rounded-lg hover:bg-teal-100 transition-colors flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {medications.map((med, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group">
                  <div className="flex gap-4">
                    <span className="font-bold text-slate-700">{med.name}</span>
                    <span className="text-slate-500">{med.dosage}</span>
                    <span className="text-teal-600 font-medium">{med.frequency}</span>
                  </div>
                  <button 
                    onClick={() => removeMedication(idx)}
                    className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {medications.length === 0 && (
                <p className="text-center py-4 text-slate-400 text-sm">No medications prescribed yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: AI Counselor & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden h-[400px] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center">
                <BrainCircuit className="text-teal-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold">Med-AI Assistant</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-teal-400 font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></span>
                  Active Counseling
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 text-sm">
              <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                <p className="text-slate-300">Hello Dr. Miller. I'm ready to assist with diagnosis analysis and medication interactions.</p>
              </div>
              
              {isAiAnalyzing && (
                <div className="flex justify-center py-4">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}

              {aiAnalysis && (
                <div className="bg-teal-500/20 p-3 rounded-2xl rounded-tl-none border border-teal-500/30">
                  <p className="text-teal-50 leading-relaxed italic">
                    "I suggest checking if the patient has any known allergies to NSAIDs if you proceed with the Migraine protocol."
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <input 
                placeholder="Ask AI Counselor..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-teal-400 outline-none"
              />
              <button className="bg-teal-500 p-2.5 rounded-xl hover:bg-teal-400 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-center gap-3 text-amber-800 font-bold mb-3">
              <AlertCircle size={20} />
              <h4>Safety Reminder</h4>
            </div>
            <p className="text-sm text-amber-700/80 leading-relaxed">
              Always verify AI suggestions with clinical guidelines and patient history. Ensure drug-to-drug interactions are cross-referenced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}