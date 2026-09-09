/* =========================================================
   JEEVANA NETRA — DASHBOARD DEMO DATA
   ---------------------------------------------------------
   All values here are DEMO / PROTOTYPE data only.
   Swap these with real API responses when the backend is
   connected. Structured so components read from here and can
   easily be wired to a service layer later.
   ========================================================= */

export const ACCENT_USER = {
  name: 'MITS Demo',
  short: 'MITS',
  role: 'Clinician',
  handle: 'Demo Account',
}

export const overviewStats = [
  {
    id: 'total',
    label: 'Total Screenings',
    value: '1,248',
    trend: '+12.4%',
    trendNote: 'vs last month',
    status: 'neutral',
    supporting: 'Across all providers',
  },
  {
    id: 'healthy',
    label: 'Healthy Cases',
    value: '721',
    trend: '+6.1%',
    trendNote: 'vs last month',
    status: 'positive',
    supporting: 'No indication detected',
  },
  {
    id: 'attention',
    label: 'Requires Attention',
    value: '186',
    trend: '-2.3%',
    trendNote: 'vs last month',
    status: 'warning',
    supporting: 'Review recommended',
  },
  {
    id: 'high',
    label: 'High Risk Cases',
    value: '48',
    trend: '+1.4%',
    trendNote: 'vs last month',
    status: 'critical',
    supporting: 'Urgent evaluation',
  },
]

export const screeningActivity = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 58 },
  { day: 'Wed', value: 49 },
  { day: 'Thu', value: 66 },
  { day: 'Fri', value: 74 },
  { day: 'Sat', value: 69 },
  { day: 'Sun', value: 85 },
]

export const recentScreenings = [
  {
    id: 'JN-2026-148',
    patient: 'Demo Patient A',
    result: 'Moderate',
    risk: 'High',
    date: '04 Sep 2026',
    status: 'Requires Review',
  },
  {
    id: 'JN-2026-147',
    patient: 'Demo Patient B',
    result: 'Low Risk',
    risk: 'Low',
    date: '04 Sep 2026',
    status: 'Completed',
  },
  {
    id: 'JN-2026-146',
    patient: 'Demo Patient C',
    result: 'Normal',
    risk: 'Low',
    date: '03 Sep 2026',
    status: 'Completed',
  },
  {
    id: 'JN-2026-145',
    patient: 'Demo Patient D',
    result: 'Mild',
    risk: 'Medium',
    date: '03 Sep 2026',
    status: 'Pending',
  },
  {
    id: 'JN-2026-144',
    patient: 'Demo Patient E',
    result: 'Moderate',
    risk: 'High',
    date: '02 Sep 2026',
    status: 'Requires Review',
  },
  {
    id: 'JN-2026-143',
    patient: 'Demo Patient F',
    result: 'Normal',
    risk: 'Low',
    date: '02 Sep 2026',
    status: 'Completed',
  },
]

export const systemStatus = [
  { label: 'AI Screening Engine', state: 'operational' },
  { label: 'Model Service', state: 'operational' },
  { label: 'Report Generation', state: 'operational' },
]
