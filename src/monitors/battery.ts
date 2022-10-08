import { battery } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";

export class Battery extends AbstractResource {
  private hasBattery: boolean | undefined;

  constructor(config: WorkspaceConfiguration) {
    super(config, false, "battery");
  }

  protected async isShown() {
    if (!(await super.isShown())) {
      return false;
    }

    // cache the result of the first call to systeminformation.battery() as it seems to be expensive on CPU
    // https://github.com/alexkainzinger/resource-watchdog/issues/2
    if (this.hasBattery === undefined) {
      const { hasBattery } = await battery();
      this.hasBattery = hasBattery;
    }

    return Promise.resolve(this.hasBattery);
  }

  protected async getDisplay() {
    const { percent } = await battery();
    const percentRemaining = Math.min(Math.max(percent, 0), 100);
    return `$(plug) ${percentRemaining}%`;
  }
}
