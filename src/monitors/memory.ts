import { mem } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { MemoryUnit, MEMORY_MAPPINGS, Units } from "../constants";
import { AbstractResource } from "./abstract-resource";

export class Memory extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, true, "memory");
  }

  protected async getDisplay(): Promise<string> {
    const unit = this.config.get<MemoryUnit>(`${this.configKey}.unit`, "GB");
    const memoryDangerThreshold = this.config.get<number>(
      `${this.configKey}.dangerThreshold`,
      0.9
    );

    const memoryData = await mem();
    const memoryDivisor = MEMORY_MAPPINGS[unit];
    const memoryUsed = memoryData.active / memoryDivisor;
    const memoryTotal = memoryData.total / memoryDivisor;
    const memoryUsedPercentage = memoryUsed / memoryTotal;
    const isDanger = memoryUsedPercentage > memoryDangerThreshold;

    let status = `$(server) ${this.formatNumber(
      memoryUsed
    )}/${this.formatNumber(memoryTotal)} ${unit}`;
    if (isDanger) {
      status += " \u26A0";
    }

    return status;
  }
}
