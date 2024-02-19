import { z } from "zod";

const publicEnvSchema = z.object({
  RAINBOW_PROJECT_ID: z.string(),
  BASE_URL: z.string().optional(),
  NEXT_PUBLIC_BASE_URL: z.string().optional(),
  NEXT_PUBLIC_RAINBOW_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_CLIENT_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_ID: z.string().optional(),
});

type PublicEnv = z.infer<typeof publicEnvSchema>;

export const publicEnv: PublicEnv = {
  RAINBOW_PROJECT_ID:
    process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID ||
    "966691db73928f3c8a904ea62261b457",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  NEXT_PUBLIC_BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  NEXT_PUBLIC_RAINBOW_PROJECT_ID:
    process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID ||
    "966691db73928f3c8a904ea62261b457",
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "1",
  NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || "1",
  NEXT_PUBLIC_CLIENT_KEY: process.env.NEXT_PUBLIC_CLIENT_KEY || "1",
  NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID || "1",
};

publicEnvSchema.parse(publicEnv);
