import { Router } from 'express';
import { getAccounts, createAccount, deleteAccount } from '../controllers/accountController.js';
import { listStreams, getStreamsByAccount, listActiveStreams, getStreamById } from '../controllers/streamController.js';
import { healthCheck } from '../controllers/healthController.js';

const router = Router();

// Accounts
router.get('/accounts', getAccounts);
router.post('/accounts', createAccount);
router.delete('/accounts/:id', deleteAccount);

// Streams
router.get('/streams', listStreams);
router.get('/streams/active', listActiveStreams);
router.get('/streams/account/:username', getStreamsByAccount);
router.get('/streams/:id', getStreamById);

// Health
router.get('/health', healthCheck);

export default router;
