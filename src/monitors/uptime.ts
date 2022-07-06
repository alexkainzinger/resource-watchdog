import { time } from "systeminformation";
import { WorkspaceConfiguration } from "vscode";
import { AbstractResource } from "./abstract-resource";

export class Uptime extends AbstractResource {
  constructor(config: WorkspaceConfiguration) {
    super(config, false, "uptime");
  }

  protected async getDisplay(): Promise<string> {
    const t = time();
    const uptime = Number(t.uptime);
    return `$(clock) ${this.formatTime(uptime)}`;
  }

  private formatTime(sec: number): string {
    const days = Math.floor(sec / (60 * 60 * 24));
    const hours = Math.floor(sec / (60 * 60)) % 24;
    const minutes = Math.floor(sec / 60) % 60;

    const hh = `${hours.toString().padStart(2, "0")}`;
    const mm = minutes.toString().padStart(2, "0");
    const hhmm = `${hh}h ${mm}m`;

    if (days < 1) {
        return hhmm;
    }
    return `${days}d ${hhmm}`;
  }
}
