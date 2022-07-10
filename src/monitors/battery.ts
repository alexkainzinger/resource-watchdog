import { battery } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";

export class Battery extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, true, "battery");
  }

  protected async isShown() {
    if (!(await super.isShown())) {
      return false;
    }

    const { hasBattery } = await battery();
    return Promise.resolve(hasBattery);
  }

  protected async getDisplay() {
    const { percent } = await battery();
    const percentRemaining = Math.min(Math.max(percent, 0), 100);
    return `$(plug) ${percentRemaining}%`;
  }
}
