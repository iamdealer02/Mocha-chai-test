import express, { Response } from 'express';

import * as healthCheckController from '../controllers/health.controller';

const router = express.Router();

router.get('/sync', (_req, res: Response) => {
  const result = healthCheckController.healthCheckSync();
  res.json({
    health: result,
    status: 200,
  });
});

router.get('/async', async (_req, res: Response) => {
  const result = await healthCheckController.healthCheckAsync();
  res.json({
    health: result,
    status: 200,
  });
});

export default router;
