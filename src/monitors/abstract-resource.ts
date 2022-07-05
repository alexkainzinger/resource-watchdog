import { WorkspaceConfiguration } from "vscode";

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

  protected formatNumber(number: number) {
    return number.toFixed(this.getPrecision());
  }

  protected getPrecision() {
    return this.config.get<number>("precision", 2);
  }
}
