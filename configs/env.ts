import {z} from 'zod';

const envSchema = z.object({
    JsonMockUrl: z.string().url(),
});

export const env = envSchema.parse({
    JsonMockUrl: import.meta.env.APP_JSON_MOCK_URL,
});
