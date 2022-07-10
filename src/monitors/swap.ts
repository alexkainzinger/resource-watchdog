import { mem } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { MemoryUnit, MEMORY_MAPPINGS } from "../constants";
import { AbstractResource } from "./abstract-resource";

export class Swap extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, false, "swap");
  }

  protected async getDisplay() {
    const unit = this.config.get<MemoryUnit>(`${this.configKey}.unit`, "GB");
    const swapDangerThreshold = this.config.get<number>(
      `${this.configKey}.dangerThreshold`,
      0.9
    );

    const { swapused, swaptotal } = await mem();
    const swapDivisor = MEMORY_MAPPINGS[unit];
    const swapUsed = swapused / swapDivisor;
    const swapTotal = swaptotal / swapDivisor;
    const swapUsedPercentage = swapUsed / swapTotal;
    const isDanger = swapUsedPercentage > swapDangerThreshold;

    let status = `$(arrow-swap) ${this.formatNumber(
      swapUsed
    )}/${this.formatNumber(swapTotal)} ${unit}`;
    if (isDanger) {
      status += " \u26A0";
    }

    return status;
  }
}
