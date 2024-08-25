import {z} from 'zod';

const envSchema = z.object({
  JsonMockUrl: z.string().url(),
  JWTKey: z.string(),
});

export const env = envSchema.parse({
  JsonMockUrl: import.meta.env.APP_JSON_MOCK_URL,
  JWTKey: import.meta.env.APP_JWT_KEY,
});
