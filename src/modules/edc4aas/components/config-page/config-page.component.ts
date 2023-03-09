import { Component, Inject } from "@angular/core";
import { EDC4AASConfigService } from "../../services/edc4aas-config.service";
import { CONNECTOR_SELF_DESCRIPTION_API } from "../../variables";

@Component({
  selector: 'Config',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent {

  config: Record<string, any>;
  private providerNoPath: URL;

  constructor(private edc4AASConfigService: EDC4AASConfigService,
    @Inject(CONNECTOR_SELF_DESCRIPTION_API) provider: URL) {
    this.providerNoPath = new URL(provider.toString().substring(0, new URL(provider).pathname.length + 1));
    this.config = this.edc4AASConfigService.getConfig(this.providerNoPath);
  }

  public updateConfig() {
    if (this.config)
      this.edc4AASConfigService.updateConfig(this.providerNoPath, this.config);
  }

  // GUI update function
  updateConfigValue(key: string, newValue: any) {
    this.config[key] = newValue; // TODO why does the input field keep going out of focus on input
  }
}
