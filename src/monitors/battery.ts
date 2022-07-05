import { battery } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";

export class Battery extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, true, "battery");
  }

  protected async isShown(): Promise<boolean> {
    const hasBattery = (await battery()).hasBattery;
    return Promise.resolve(hasBattery && super.isShown());
  }

  protected async getDisplay(): Promise<string> {
    const rawBattery = await battery();
    const percentRemaining = Math.min(Math.max(rawBattery.percent, 0), 100);
    return `$(plug) ${percentRemaining}%`;
  }
}
