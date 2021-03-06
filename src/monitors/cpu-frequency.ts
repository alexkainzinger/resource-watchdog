import { cpuCurrentSpeed } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";
import { FrequencyUnit, FREQUENCY_MAPPINGS, Units } from "../constants";

export class CpuFrequency extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, true, "cpuFrequency");
  }

  protected async getDisplay() {
    const { avg } = await cpuCurrentSpeed();
    const speedHz = avg * Units.G;
    return `$(dashboard) ${this._getDisplayWithFormat(speedHz)}`;
  }

  private _getDisplayWithFormat(speedHz: number) {
    const unit = this.config.get<FrequencyUnit>(
      `${this.configKey}.unit`,
      "GHz"
    );
    const freqDivisor = FREQUENCY_MAPPINGS[unit];
    return `${this.formatNumber(speedHz / freqDivisor)} ${unit}`;
  }
}
