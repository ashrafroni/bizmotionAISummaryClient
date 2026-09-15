export interface RuntimeConfig {
  apiBaseUrl: string;
}

let cachedConfig: RuntimeConfig | null = null;

export async function loadRuntimeConfig(): Promise<RuntimeConfig> {
  if (cachedConfig) return cachedConfig;
  try {
    const res = await fetch('/assets/config.json');
    if (!res.ok) throw new Error(`Failed to load runtime config: ${res.status}`);
    cachedConfig = await res.json();
  } catch {
    cachedConfig = { apiBaseUrl: '' };
  }
  return cachedConfig;
}
