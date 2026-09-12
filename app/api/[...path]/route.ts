import { NextRequest, NextResponse } from 'next/server';

const employees = [
  { id: 'anaya', name: 'Anaya', role: 'Sales specialist', language: 'Hindi · English', callsToday: 36, status: 'Calling' },
  { id: 'tara', name: 'Tara', role: 'Support guide', language: 'Telugu · English', callsToday: 24, status: 'Available' },
  { id: 'rohan', name: 'Rohan', role: 'Follow-up expert', language: 'Hindi · Marathi', callsToday: 19, status: 'Paused' },
];
const calls = [
  { id: 'call-1', employeeId: 'anaya', leadName: 'Priya Sharma', phone: '+91 98765 43210', duration: '12m 48s', status: 'completed', sentiment: 'Positive', summary: 'Requested a premium-plan walkthrough.', recordingUrl: '#', createdAt: 'Today, 11:07 AM' },
  { id: 'call-2', employeeId: 'tara', leadName: 'Vikram Singh', phone: '+91 98450 22111', duration: '6m 22s', status: 'completed', sentiment: 'Neutral', summary: 'Asked to receive details on WhatsApp.', recordingUrl: '#', createdAt: 'Today, 10:42 AM' },
  { id: 'call-3', employeeId: 'rohan', leadName: 'Meera Nair', phone: '+91 99800 24567', duration: '0m 00s', status: 'retry-scheduled', sentiment: 'Unknown', summary: 'Retry queued for tomorrow morning.', recordingUrl: '#', createdAt: 'Today, 9:18 AM' },
];
const plans = [
  { id: 'value', name: 'Value', pricePerMin: 3.5, description: 'For focused bulk calling campaigns.', features: ['Native multilingual calling', 'Call summary & fields', 'Campaign controls'] },
  { id: 'standard', name: 'Standard', pricePerMin: 5, badge: 'Most popular', description: 'For everyday customer conversations.', features: ['Everything in Value', 'CRM sync', 'WhatsApp actions'] },
  { id: 'premium', name: 'Premium', pricePerMin: 7, description: 'For higher-context conversations.', features: ['Everything in Standard', 'Priority routing', 'Custom integrations'] },
];
const json = (value: unknown, init?: ResponseInit) => NextResponse.json(value, init);

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/'); const query = request.nextUrl.searchParams;
  if (path === 'auth/me') return json({ user: { name: 'Demo user', email: 'demo@svara.ai' } });
  if (path === 'dashboard/summary') return json({ employeesWorking: employees.filter(x => x.status !== 'Paused').length, conversationsHandled: 127, qualifiedLeads: 41, creditsSpent: 2840 });
  if (path === 'employees') return json(employees);
  if (path.startsWith('employees/')) { const employee = employees.find(x => x.id === params.path[1]); return employee ? json({ employee, recentCalls: calls.filter(x => x.employeeId === employee.id) }) : json({ error: 'Employee not found' }, { status: 404 }); }
  if (path === 'calls') { const filtered = calls.filter(call => (!query.get('employeeId') || call.employeeId === query.get('employeeId')) && (!query.get('status') || call.status === query.get('status'))); return json(filtered); }
  if (path === 'leads') return json(calls.map((call, index) => ({ id: `lead-${index + 1}`, name: call.leadName, phone: call.phone, source: index === 0 ? 'Meta form' : index === 1 ? 'Website' : 'Referral', status: index === 0 ? 'Qualified' : index === 1 ? 'Meeting booked' : 'Retry scheduled', createdAt: call.createdAt })));
  if (path === 'credits/balance') return json({ balance: 8460, plan: 'Standard' });
  if (path === 'pricing/plans') return json(plans);
  if (path === 'integrations') return json([{ type: 'HubSpot', connected: true, lastSync: '4 mins ago' }, { type: 'Google Sheets', connected: true, lastSync: '8 mins ago' }, { type: 'WhatsApp', connected: false, lastSync: null }]);
  return json({ error: 'Not found' }, { status: 404 });
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/'); const body = await request.json().catch(() => ({}));
  if (path === 'auth/login' || path === 'auth/signup') return json({ token: 'demo-svara-token', user: { name: body.name || 'Demo user', email: body.email } });
  if (path === 'auth/social') return json({ token: 'demo-svara-token', user: { name: `${body.provider || 'SSO'} user`, email: 'demo@svara.ai' } });
  if (path === 'auth/magic-link') return json({ accepted: true, email: body.email });
  if (path === 'demo/call') return json({ callId: `demo-${Date.now()}`, status: 'queued', estimatedWaitSeconds: 24 });
  if (path.startsWith('demo/call/') && (path.endsWith('/accepted') || path.endsWith('/declined'))) return json({ callId: body.callId, status: path.endsWith('/accepted') ? 'accepted' : 'declined' });
  if (path === 'calls/trigger') return json({ call: { id: `call-${Date.now()}`, status: 'queued', ...body } });
  if (path === 'employees') return json({ employee: { id: `employee-${Date.now()}`, ...body, status: 'Available', callsToday: 0 } });
  return json({ error: 'Not found' }, { status: 404 });
}
