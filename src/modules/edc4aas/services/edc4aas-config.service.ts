import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Mainly REST interfaces to the EDC4AAS extension's configuration
 */
@Injectable({
  providedIn: 'root'
})
export class EDC4AASConfigService {
  private config!: Record<string, any>;

  constructor(private httpClient: HttpClient) {
  }

  public getConfig(edcUrl: URL): Record<string, any> {
    var configUrl = edcUrl + "api/config";
    this.httpClient
      .get<Record<string, string>>(configUrl)
      .subscribe((data) => this.config = data);
    return this.config;
  }

  public updateConfig(edcUrl: URL, newConfig: Record<string, any>) {
    var configUrl = edcUrl + "api/config";
    var arrayOfValues = Object.entries(newConfig);
    var json = "{";
    for (let val of arrayOfValues) {
      json += "\"" + val[0] + "\":\"" + val[1] + "\",";
    } // TODO fix null values for URLS
    json = json.substring(0, json.length - 1) + "}";

    console.log(json);
    this.httpClient.put(configUrl, json).subscribe(() => console.log("PUT request to " + configUrl + "..."));
    return this.getConfig(edcUrl);
  }

}
