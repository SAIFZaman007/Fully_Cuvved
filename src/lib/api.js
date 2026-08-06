import axios from 'axios';
import { sleep, generateReference } from './utils';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * API CONTRACT
 * This file is the single source of truth for how the frontend talks to the
 * FastAPI backend. Every function below documents the exact endpoint, method,
 * payload and expected response shape it needs. Implement the backend to
 * match this contract and nothing else in the frontend needs to change.
 *
 * Base URL comes from VITE_API_URL (see .env.example).
 * Auth: Bearer token stored in localStorage under "fc_token", attached
 * automatically to every request.
 *
 * MOCK MODE
 * Set VITE_ENABLE_MOCKS=true (default for local dev) to run the entire
 * frontend against realistic in-memory mock data — useful for building and
 * demoing the UI before the backend exists. Set it to false (or deploy with
 * it unset) once the real API is live; every function transparently calls
 * the real endpoint instead. No component code needs to change either way.
 * ─────────────────────────────────────────────────────────────────────────
 */

const USE_MOCKS = String(import.meta.env.VITE_ENABLE_MOCKS ?? 'true') === 'true';
const TOKEN_KEY = 'fc_token';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 20000,
  headers: { Accept: 'application/json' },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// ── Mock helpers ────────────────────────────────────────────────────────
const MOCK_LATENCY = 550;
const MOCK_USER = { id: 'usr_demo', name: 'Alex Morgan', email: 'demo@fullycuvved.com' };
const mockDb = {
  documents: [
    { id: 'DOC-9021', type: 'Legal Contract', status: 'completed', price: 1000, createdAt: '2026-07-28T10:12:00Z' },
    { id: 'DOC-9022', type: 'Alternative Note', status: 'processing', price: 1200, createdAt: '2026-08-01T09:02:00Z' },
    { id: 'DOC-9023', type: 'Technical Proposal', status: 'completed', price: 1500, createdAt: '2026-08-02T14:44:00Z' },
  ],
};

/**
 * POST /auth/signup  { name, email, password } -> { token, user }
 */
export async function signup({ name, email, password }) {
  if (USE_MOCKS) {
    await sleep(MOCK_LATENCY);
    if (!name || !email || !password) throw new ApiError('All fields are required.');
    return { token: 'mock.jwt.token', user: { ...MOCK_USER, name, email } };
  }
  const { data } = await http.post('/auth/signup', { name, email, password });
  return data;
}

/**
 * POST /auth/login  { email, password } -> { token, user }
 */
export async function login({ email, password }) {
  if (USE_MOCKS) {
    await sleep(MOCK_LATENCY);
    if (!email || !password) throw new ApiError('Enter your email and password.');
    return { token: 'mock.jwt.token', user: { ...MOCK_USER, email } };
  }
  const { data } = await http.post('/auth/login', { email, password });
  return data;
}

/**
 * GET /auth/me -> { user }
 */
export async function getCurrentUser() {
  if (USE_MOCKS) {
    await sleep(200);
    return getAuthToken() ? MOCK_USER : null;
  }
  const { data } = await http.get('/auth/me');
  return data.user;
}

/**
 * POST /documents/estimate  { docType, description } -> { estimatedPrice, minPrice, maxPrice, currency }
 * Used for live pricing feedback as the user types in the generator.
 */
export async function estimatePrice({ docType, description }) {
  if (USE_MOCKS) {
    await sleep(350);
    const base = docType === 'alternative-note' ? 1200 : 1000;
    const complexity = Math.min(Math.floor((description?.length || 0) / 40), 9);
    return {
      currency: 'GBP',
      minPrice: base,
      maxPrice: base + 9000,
      estimatedPrice: base + complexity * 700,
    };
  }
  const { data } = await http.post('/documents/estimate', { docType, description });
  return data;
}

/**
 * POST /documents/generate  (multipart/form-data)
 *   fields: docType, description, referenceFile? (File)
 * -> { orderId, status, previewText }
 */
export async function generateDocument({ docType, description, referenceFile, onUploadProgress }) {
  if (USE_MOCKS) {
    await sleep(1400);
    return {
      orderId: generateReference('ORD'),
      status: 'draft_ready',
      previewText: buildMockPreview(docType, description),
    };
  }
  const form = new FormData();
  form.append('docType', docType);
  form.append('description', description);
  if (referenceFile) form.append('referenceFile', referenceFile);
  const { data } = await http.post('/documents/generate', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
  return data;
}

/**
 * POST /orders/:id/checkout  { paymentMethodToken } -> { status, receiptUrl }
 * NOTE: integrate a real processor (e.g. Stripe Elements) server-side; the
 * frontend never touches raw card data directly.
 */
export async function checkoutOrder(orderId, { paymentMethodToken }) {
  if (USE_MOCKS) {
    await sleep(1200);
    return { status: 'paid', receiptUrl: '#', orderId };
  }
  const { data } = await http.post(`/orders/${orderId}/checkout`, { paymentMethodToken });
  return data;
}

/**
 * GET /orders/:id -> { order }
 */
export async function getOrder(orderId) {
  if (USE_MOCKS) {
    await sleep(500);
    return { id: orderId, status: 'completed', type: 'Legal Contract', price: 1000, createdAt: new Date().toISOString() };
  }
  const { data } = await http.get(`/orders/${orderId}`);
  return data.order;
}

/**
 * GET /orders?email= -> { orders: [] }  (guest order tracking)
 */
export async function trackOrdersByEmail(email) {
  if (USE_MOCKS) {
    await sleep(600);
    if (!email) throw new ApiError('Enter the email used at checkout.');
    return mockDb.documents;
  }
  const { data } = await http.get('/orders', { params: { email } });
  return data.orders;
}

/**
 * GET /documents -> { documents: [] }  (authenticated "My Documents")
 */
export async function listMyDocuments() {
  if (USE_MOCKS) {
    await sleep(500);
    return mockDb.documents;
  }
  const { data } = await http.get('/documents');
  return data.documents;
}

/**
 * GET /pricing -> { tiers: [] }
 */
export async function getPricingTiers() {
  if (USE_MOCKS) {
    await sleep(250);
    return null; // frontend falls back to local static copy — see data/pricing.js
  }
  const { data } = await http.get('/pricing');
  return data.tiers;
}

/**
 * POST /contact  { name, email, message } -> { success }
 */
export async function sendContactMessage(payload) {
  if (USE_MOCKS) {
    await sleep(600);
    return { success: true };
  }
  const { data } = await http.post('/contact', payload);
  return data;
}

export class ApiError extends Error {}

function buildMockPreview(docType, description) {
  const header =
    docType === 'alternative-note'
      ? '// ALTERNATIVE DOCUMENTATION — DRAFT'
      : docType === 'proposal'
        ? '// ENTERPRISE PROPOSAL — DRAFT'
        : '// SERVICE AGREEMENT — DRAFT';
  const snippet = (description || 'General purpose documentation request.').slice(0, 160);
  return `${header}\n\nGENERATED: ${new Date().toISOString()}\nINPUT SUMMARY: ${snippet}${
    description?.length > 160 ? '…' : ''
  }\n\nSTATUS: Ready for review before checkout.`;
}
