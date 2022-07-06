import { WorkspaceConfiguration } from "vscode";
import { Units } from "../constants";

export abstract class AbstractResource {
  constructor(
    protected config: WorkspaceConfiguration,
    protected isShownByDefault: boolean,
    protected configKey: string,
    protected maxWidth: number = 0
  ) {}

  protected abstract getDisplay(): Promise<string>;

  public async getResourceDisplay(): Promise<string | undefined> {
    if (await this.isShown()) {
      const display = await this.getDisplay();
      this.maxWidth = Math.max(this.maxWidth, display.length);

      return display.padEnd(this.maxWidth, " ");
    }
    return undefined;
  }

  public updateConfig(config: WorkspaceConfiguration) {
    this.config = config;
  }

  protected async isShown() {
    return Promise.resolve(
      this.config.get<boolean>(`${this.configKey}.show`, this.isShownByDefault)
    );
  }

  protected _convertBytesToLargestUnit(
    bytes: number,
    withUnit = false
  ): string {
    let unit = Units.None;
    while (bytes / unit >= 1024 && unit < Units.G) {
      unit *= 1024;
    }

    const formattedValue = this.formatNumber(bytes / unit);
    if (!withUnit) {
      return formattedValue;
    }

    const unitName = Units[unit] === "None" ? "" : Units[unit];
    return `${formattedValue} ${unitName}B`;
  }

  protected formatNumber(number: number) {
    return number.toFixed(this.getPrecision());
  }

  protected getPrecision() {
    return this.config.get<number>("precision", 2);
  }
}
