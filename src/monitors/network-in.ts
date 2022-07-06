import { networkStats } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";

export class NetworkIn extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, false, "networkIn");
  }

  protected async getDisplay(): Promise<string> {
    const networkData = await networkStats();
    const totalRxSec = networkData.reduce(
      (acc, iface) => acc + (iface.rx_sec || 0),
      0
    );
    const rxSec = this._convertBytesToLargestUnit(
      totalRxSec / networkData.length,
      true
    );
    return `$(cloud-download) ${rxSec}/s`;
  }
}
