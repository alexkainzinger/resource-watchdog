export const CONFIGURATION_KEY = "resourceWatchdog";
export const DEFAULT_UPDATE_FREQUENCY_MS = 2000;
export const DEFAULT_COLOR = "#FFFFFF";
export const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i;

export type FrequencyUnit = "GHz" | "MHz" | "KHz" | "Hz";
export type MemoryUnit = "GB" | "MB" | "KB" | "B";
export type TemperatureUnit = "C" | "F";
export type DiskSpaceFormat =
  | "PercentRemaining"
  | "PercentUsed"
  | "Remaining"
  | "UsedOutOfTotal";

export enum Units {
  None = 1,
  K = 1024,
  M = 1024 * 1024,
  G = 1024 * 1024 * 1024,
}

export const FREQUENCY_MAPPINGS: { [unit in FrequencyUnit]: number } = {
  GHz: Units.G,
  MHz: Units.M,
  KHz: Units.K,
  Hz: Units.None,
};

export const MEMORY_MAPPINGS: { [unit in MemoryUnit]: number } = {
  GB: Units.G,
  MB: Units.M,
  KB: Units.K,
  B: Units.None,
};
