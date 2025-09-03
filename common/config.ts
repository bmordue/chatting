import { config } from "dotenv";

// Load environment variables
config();

export interface AppConfig {
  openai: {
    apiKey: string;
  };
  steam?: {
    apiKey: string;
    userId: string;
  };
  chatDir: string;
}

function validateConfig(): AppConfig {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  const appConfig: AppConfig = {
    openai: {
      apiKey: openaiApiKey,
    },
    chatDir: "chats/",
  };

  // Steam configuration is optional
  if (process.env.STEAM_API_KEY && process.env.STEAM_USER_ID) {
    appConfig.steam = {
      apiKey: process.env.STEAM_API_KEY,
      userId: process.env.STEAM_USER_ID,
    };
  }

  return appConfig;
}

let _appConfig: AppConfig | null = null;

export function getConfig(): AppConfig {
  if (!_appConfig) {
    _appConfig = validateConfig();
  }
  return _appConfig;
}

// For backward compatibility, but only if OPENAI_API_KEY exists
export const appConfig = process.env.OPENAI_API_KEY ? validateConfig() : null;