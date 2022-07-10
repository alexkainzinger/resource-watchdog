import { fsSize, Systeminformation } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { DiskSpaceFormat } from "../constants";
import { AbstractResource } from "./abstract-resource";

export class Disk extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, false, "disk");
  }

  protected async isShown() {
    if (!(await super.isShown())) {
      return false;
    }

    const hasDefinedDrives = this._getDrives().length > 0;
    return Promise.resolve(hasDefinedDrives);
  }

  protected async getDisplay() {
    const fsSizes = await fsSize();
    const drives = this._getDrives();
    const formattedDrives = fsSizes
      .filter((fsData) => drives.indexOf(fsData.fs) !== -1)
      .map((fsData) => this._getFormattedDiskSpace(fsData));

    if (formattedDrives.length === 0) {
      return "disk(s) not found";
    }
    return `$(database) ${formattedDrives.join(", ")}`;
  }

  private _getFormattedDiskSpace(fsSize: Systeminformation.FsSizeData) {
    const format = this.config.get<DiskSpaceFormat>(
      `${this.configKey}.format`,
      "PercentRemaining"
    );

    switch (format) {
      case "PercentRemaining":
        return `${fsSize.fs} ${this.formatNumber(100 - fsSize.use)}% remaining`;
      case "PercentUsed":
        return `${fsSize.fs} ${this.formatNumber(fsSize.use)}% used`;
      case "Remaining":
        const remaining = this._convertBytesToLargestUnit(
          fsSize.size - fsSize.used,
          true
        );
        return `${fsSize.fs} ${remaining} remaining`;
      case "UsedOutOfTotal":
        const used = this._convertBytesToLargestUnit(fsSize.used, true);
        const total = this._convertBytesToLargestUnit(fsSize.size, true);
        return `${fsSize.fs} ${used}/${total} used`;
    }
  }

  private _getDrives() {
    return this.config.get<string[]>(`${this.configKey}.drives`, []);
  }
}
