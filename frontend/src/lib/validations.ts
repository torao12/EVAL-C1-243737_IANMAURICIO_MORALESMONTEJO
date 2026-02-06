import { z } from 'zod';

// Whitelist de programas permitidos para el ranking [cite: 21]
const PROGRAMS = ['Sistemas', 'Mecatrónica', 'Derecho', 'Historia'] as const;

export const RankingFilterSchema = z.object({
  program: z.enum(PROGRAMS).optional(),
  term: z.string().min(1, "El periodo es obligatorio") // [cite: 21]
});

export const SearchPaginationSchema = z.object({
  search: z.string().optional().default(''),
  page: z.coerce.number().min(1).default(1), // [cite: 56]
  limit: z.coerce.number().min(1).max(50).default(10), // [cite: 56]
});