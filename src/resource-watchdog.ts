import { StatusBarAlignment, StatusBarItem, window, workspace } from "vscode";
import {
  CONFIGURATION_KEY,
  DEFAULT_COLOR,
  DEFAULT_UPDATE_FREQUENCY_MS,
  HEX_COLOR_REGEX,
} from "./constants";
import {
  AbstractResource,
  Battery,
  CpuFrequency,
  CpuTemperature,
  CpuUsage,
  Disk,
  Memory,
  NetworkIn,
  NetworkOut,
  Swap,
  Uptime,
} from "./monitors";

export default class ResourceWatchdog {
  private _statusBarItem: StatusBarItem;
  private _config = workspace.getConfiguration(CONFIGURATION_KEY);
  private _updating = false;
  private _resources: AbstractResource[] = [];

  constructor() {
    this._statusBarItem = window.createStatusBarItem(
      this._getStatusBarAlignment()
    );
    this._statusBarItem.color = this._getStatusBarColor();
    this._statusBarItem.show();

    this._resources.push(new Battery(this._config));
    this._resources.push(new CpuFrequency(this._config));
    this._resources.push(new CpuUsage(this._config));
    this._resources.push(new CpuTemperature(this._config));
    this._resources.push(new Disk(this._config));
    this._resources.push(new Memory(this._config));
    this._resources.push(new NetworkIn(this._config));
    this._resources.push(new NetworkOut(this._config));
    this._resources.push(new Swap(this._config));
    this._resources.push(new Uptime(this._config));
  }

  public startUpdating() {
    this._updating = true;
    this._update();
  }

  public stopUpdating() {
    this._updating = false;
  }

  public dispose() {
    this.stopUpdating();
    this._statusBarItem.dispose();
  }

  public onConfigChange() {
    this._config = workspace.getConfiguration(CONFIGURATION_KEY);
    for (const resource of this._resources) {
      resource.updateConfig(this._config);
    }
  }

  private async _update() {
    if (!this._updating) {
      return;
    }

    const pendingUpdates = this._resources.map((resource) =>
      resource.getResourceDisplay()
    );

    try {
      const updates = await Promise.all(pendingUpdates);

      this._statusBarItem.text = updates
        .filter((update) => !!update)
        .join("   ");
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(
        () => this._update(),
        this._config.get<number>(
          "updateFrequencyMs",
          DEFAULT_UPDATE_FREQUENCY_MS
        )
      );
    }
  }

  private _getStatusBarAlignment() {
    return this._config.get<boolean>("leftAlignment")
      ? StatusBarAlignment.Left
      : StatusBarAlignment.Right;
  }

  private _getStatusBarColor() {
    const configColor = this._config.get<string>("color", DEFAULT_COLOR);
    if (!HEX_COLOR_REGEX.test(configColor)) {
      return DEFAULT_COLOR;
    }
    return configColor;
  }
}
