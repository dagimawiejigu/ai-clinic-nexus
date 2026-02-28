import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Patient, Consultation, ClinicState } from '../types';

interface AppStore extends ClinicState {
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt'>) => Patient;
  addConsultation: (consultation: Omit<Consultation, 'id' | 'date'>) => Consultation;
}

const initialPatients: Patient[] = [
  {
    id: 'p1',
    firstName: 'James',
    lastName: 'Wilson',
    dob: '1985-06-12',
    gender: 'male',
    phone: '555-0102',
    email: 'james.w@example.com',
    address: '42 Maple St, Springfield',
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    firstName: 'Emma',
    lastName: 'Thompson',
    dob: '1992-03-24',
    gender: 'female',
    phone: '555-0198',
    email: 'emma.t@example.com',
    address: '15 Oak Ave, Springfield',
    createdAt: new Date().toISOString()
  }
];

export const useClinicStore = create<AppStore>()(
  persist(
    (set) => ({
      patients: initialPatients,
      consultations: [],
      addPatient: (patientData) => {
        const newPatient: Patient = {
          ...patientData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ patients: [...state.patients, newPatient] }));
        return newPatient;
      },
      addConsultation: (consultationData) => {
        const newConsultation: Consultation = {
          ...consultationData,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString(),
        };
        set((state) => ({ consultations: [...state.consultations, newConsultation] }));
        return newConsultation;
      },
    }),
    {
      name: 'clinic-data',
    }
  )
);