import { z } from 'zod';

export const setLogSchema = z.object({
  sessionId: z.string().cuid(),
  exerciseId: z.string().cuid(),
  weightLb: z.number().min(0).max(2000),
  elapsedSeconds: z.number().int().min(0).max(10000),
  performedAt: z.string().datetime().optional(),
});

export const exerciseSchema = z.object({
  name: z.string().trim().min(1).max(100),
  incrementLb: z.number().int().min(1).max(100),
});
