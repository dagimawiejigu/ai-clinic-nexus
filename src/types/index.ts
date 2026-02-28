export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  createdAt: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  medications: Medication[];
  aiAnalysis?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface ClinicState {
  patients: Patient[];
  consultations: Consultation[];
}