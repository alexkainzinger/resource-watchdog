import { networkStats } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";

export class NetworkOut extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, false, "networkOut");
  }

  protected async getDisplay() {
    const networkData = await networkStats();
    const totalTxSec = networkData.reduce(
      (acc, iface) => acc + (iface.tx_sec || 0),
      0
    );
    const txSec = this._convertBytesToLargestUnit(
      totalTxSec / networkData.length,
      true
    );
    return `$(cloud-upload) ${txSec}/s`;
  }
}
