import { Component, Inject, OnInit } from "@angular/core";
import { EDC4AASConfigService } from "../../services/edc4aas-config.service";
import { CONNECTOR_DEFAULT_API } from "../../variables";

@Component({
  selector: 'Config',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit {

  config?: Map<string, string>;
  provider: URL;

  constructor(private edc4AASConfigService: EDC4AASConfigService,
    @Inject(CONNECTOR_DEFAULT_API) provider: URL) {
    this.provider = provider;
  }

  public ngOnInit() {
    this.edc4AASConfigService.getConfig(this.provider).subscribe((data) => this.config = new Map(Object.entries(data)));;
  }

  public updateConfig() {
    if (this.config)
      this.edc4AASConfigService.updateConfig(this.provider, this.config);
  }

  // GUI update function
  async updateConfigValue(key: string, newValue: any) {
    this.config?.set(key, newValue);
  }

  trackByFn(index: any, _item: any) {
    return index;
  }

  isBool(value: any) {
    console.log(value === "true" || value === "false")
    return value === "true" || value === "false";
  }
  toggle(key: string) {
    if (this.config?.get(key) === "true") {
      this.config.set(key, "false");
    }
    else if (this.config?.get(key) === "false") {
      this.config?.set(key, "true");
    }
  }
}
