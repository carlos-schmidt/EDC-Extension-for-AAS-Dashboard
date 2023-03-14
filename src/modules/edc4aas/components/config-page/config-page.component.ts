import { Component, Inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EDC4AASConfigService } from "../../services/edc4aas-config.service";
import { CONNECTOR_SELF_DESCRIPTION_API } from "../../variables";

@Component({
  selector: 'Config',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit {

  config: Map<string, string>;
  provider: URL;
  private providerNoPath: URL;

  constructor(private edc4AASConfigService: EDC4AASConfigService,
    @Inject(CONNECTOR_SELF_DESCRIPTION_API) provider: URL) {
    this.provider = provider;
    this.providerNoPath = new URL(provider.toString().substring(0, new URL(provider).pathname.length + 1));
    this.config = this.edc4AASConfigService.getConfig(this.providerNoPath);
  }

  public ngOnInit() {
    this.providerNoPath = new URL(this.provider.toString().substring(0, new URL(this.provider).pathname.length + 1));
    this.config = this.edc4AASConfigService.getConfig(this.providerNoPath);
  }

  public updateConfig() {
    if (this.config)
      this.edc4AASConfigService.updateConfig(this.providerNoPath, this.config);
  }

  // GUI update function
  async updateConfigValue(key: string, newValue: any) {
    console.log(newValue);
    this.config.set(key, newValue); // TODO why does the input field keep going out of focus on input
  }

}
