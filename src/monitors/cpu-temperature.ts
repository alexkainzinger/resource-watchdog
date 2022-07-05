import { cpuTemperature } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";
import { TemperatureUnit } from "../constants";

export class CpuTemperature extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, false, "cpuTemperature");
  }

  protected async isShown(): Promise<boolean> {
    // temperature reporting has some issues on M1
    const temp = await cpuTemperature();
    const hasCpuTemp = typeof temp.main === "number" && temp.main > 0;
    return Promise.resolve(hasCpuTemp && super.isShown());
  }

  protected async getDisplay(): Promise<string> {
    const unit = this.config.get<TemperatureUnit>(
      `${this.configKey}.unit`,
      "C"
    );
    const cpuTemp = await cpuTemperature();

    let tempValue = cpuTemp.main;
    let tempUnit = "\u2103"; // °C
    if (unit === "F") {
      tempValue = this._celsiusToFahrenheit(tempValue);
      tempUnit = "\u2109"; // °F
    }

    return `$(thermometer) ${this.formatNumber(tempValue)} ${tempUnit}`;
  }

  private _celsiusToFahrenheit(temperature: number): number {
    return (temperature * 9) / 5 + 32;
  }
}
