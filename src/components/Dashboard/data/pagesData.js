/* =========================================================
   JEEVANA NETRA — SECONDARY PAGE DEMO DATA
   ========================================================= */

export const screeningHistory = [
  { id: 'JN-2026-148', patient: 'Demo Patient A', result: 'Moderate', risk: 'High', date: '04 Sep 2026', status: 'Requires Review' },
  { id: 'JN-2026-147', patient: 'Demo Patient B', result: 'Low Risk', risk: 'Low', date: '04 Sep 2026', status: 'Completed' },
  { id: 'JN-2026-146', patient: 'Demo Patient C', result: 'Normal', risk: 'Low', date: '03 Sep 2026', status: 'Completed' },
  { id: 'JN-2026-145', patient: 'Demo Patient D', result: 'Mild', risk: 'Medium', date: '03 Sep 2026', status: 'Pending' },
  { id: 'JN-2026-144', patient: 'Demo Patient E', result: 'Moderate', risk: 'High', date: '02 Sep 2026', status: 'Requires Review' },
  { id: 'JN-2026-143', patient: 'Demo Patient F', result: 'Normal', risk: 'Low', date: '02 Sep 2026', status: 'Completed' },
  { id: 'JN-2026-142', patient: 'Demo Patient G', result: 'Low Risk', risk: 'Low', date: '01 Sep 2026', status: 'Completed' },
  { id: 'JN-2026-141', patient: 'Demo Patient H', result: 'Mild', risk: 'Medium', date: '31 Aug 2026', status: 'Completed' },
  { id: 'JN-2026-140', patient: 'Demo Patient I', result: 'Normal', risk: 'Low', date: '30 Aug 2026', status: 'Completed' },
  { id: 'JN-2026-139', patient: 'Demo Patient J', result: 'Severe', risk: 'High', date: '29 Aug 2026', status: 'Requires Review' },
]

export const patientRecords = [
  { id: 'JN-P-001', name: 'Demo Patient A', age: 58, gender: 'Female', lastScreening: '04 Sep 2026', result: 'Moderate', risk: 'High', status: 'Doctor Report' },
  { id: 'JN-P-002', name: 'Demo Patient B', age: 47, gender: 'Male', lastScreening: '04 Sep 2026', result: 'Low Risk', risk: 'Low', status: 'Completed' },
  { id: 'JN-P-003', name: 'Demo Patient C', age: 63, gender: 'Male', lastScreening: '03 Sep 2026', result: 'Normal', risk: 'Low', status: 'Completed' },
  { id: 'JN-P-004', name: 'Demo Patient D', age: 71, gender: 'Female', lastScreening: '03 Sep 2026', result: 'Mild', risk: 'Medium', status: 'Pending' },
  { id: 'JN-P-005', name: 'Demo Patient E', age: 52, gender: 'Male', lastScreening: '02 Sep 2026', result: 'Moderate', risk: 'High', status: 'Doctor Report' },
  { id: 'JN-P-006', name: 'Demo Patient F', age: 39, gender: 'Female', lastScreening: '02 Sep 2026', result: 'Normal', risk: 'Low', status: 'Completed' },
]

export const aiInsights = [
  {
    title: 'Screening volume is climbing steadily',
    body: 'Monthly screenings increased 12.4% this period. Higher-risk cases remain within the expected range given the larger cohort.',
    tone: 'positive',
  },
  {
    title: 'High-risk cases warrant priority follow-up',
    body: '48 high-risk cases were flagged this month. Prioritizing clinician review for these patients can reduce time-to-intervention.',
    tone: 'warning',
  },
  {
    title: 'Low-risk cohort remains stable',
    body: '721 healthy cases showed no indication. Maintaining routine review cadence keeps this cohort on track without added workload.',
    tone: 'neutral',
  },
]

export const analyticsSummary = [
  { label: 'Total Screenings', value: '1,248' },
  { label: 'Unique Patients', value: '926' },
  { label: 'Avg. Confidence', value: '91%' },
  { label: 'Completion Rate', value: '96%' },
]
