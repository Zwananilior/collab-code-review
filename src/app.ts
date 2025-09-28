import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import projectsRoutes from './routes/projects';
import submissionsRoutes from './routes/submissions';
import commentsRoutes from './routes/comments';
import { initWebsocket } from './ws';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/comments', commentsRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// WebSocket initializer (will attach to same server in production)
initWebsocket();

export default app;
