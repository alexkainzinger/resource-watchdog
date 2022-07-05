import { fsSize, Systeminformation } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { DiskSpaceFormat, Units } from "../constants";
import { AbstractResource } from "./abstract-resource";

export class Disk extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, false, "disk");
  }

  protected async isShown(): Promise<boolean> {
    const hasDefinedDrives = this._getDrives().length > 0;
    return Promise.resolve(hasDefinedDrives && super.isShown());
  }

  protected async getDisplay(): Promise<string> {
    const fsSizes = await fsSize();
    const drives = this._getDrives();
    const formattedDrives: string[] = [];

    for (let fsSize of fsSizes) {
      if (drives.indexOf(fsSize.fs) !== -1) {
        formattedDrives.push(this._getFormattedDiskSpace(fsSize));
      }
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
          fsSize.size - fsSize.use
        );
        return `${fsSize.fs} ${remaining} remaining`;
      case "UsedOutOfTotal":
        const used = this._convertBytesToLargestUnit(fsSize.use);
        const total = this._convertBytesToLargestUnit(fsSize.size);
        return `${fsSize.fs} ${used}/${total} used`;
    }
  }

  private _convertBytesToLargestUnit(bytes: number): string {
    let unit = Units.None;
    while (bytes / unit >= 1024 && unit < Units.G) {
      unit *= 1024;
    }
    return this.formatNumber(bytes / unit);
  }

  private _getDrives() {
    return this.config.get<string[]>(`${this.configKey}.drives`, []);
  }
}
