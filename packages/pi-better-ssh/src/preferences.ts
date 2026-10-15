import { harnessSettingsPath, readHarnessSetting, type HarnessSettingsSeams } from "./shared-harness-settings.js";

export function readSshPreferences(seams: HarnessSettingsSeams = {}): { promoteCodeModeTools: boolean } {
  const value = readHarnessSetting<unknown>("ssh", seams);
  if (value === undefined) return { promoteCodeModeTools: false };
  if (!value || typeof value !== "object" || Array.isArray(value)
    || ("promoteCodeModeTools" in value && typeof value.promoteCodeModeTools !== "boolean")) {
    throw new Error(`SSH preferences at ${harnessSettingsPath(seams)} must contain an object with a boolean promoteCodeModeTools setting.`);
  }
  return { promoteCodeModeTools: "promoteCodeModeTools" in value && value.promoteCodeModeTools === true };
}
