import { currentLoad } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";

export class CpuUsage extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, true, "cpuUsage");
  }

  protected async getDisplay() {
    const { currentLoadIdle } = await currentLoad();
    return `$(pulse) ${this.formatNumber(100 - currentLoadIdle)}%`;
  }
}
