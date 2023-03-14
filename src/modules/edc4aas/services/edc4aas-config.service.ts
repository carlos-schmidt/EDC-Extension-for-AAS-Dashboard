import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/**
 * Mainly REST interfaces to the EDC4AAS extension's configuration
 */
@Injectable({
  providedIn: 'root'
})
export class EDC4AASConfigService {
  private config!: Map<string, string>;

  constructor(private httpClient: HttpClient) {
  }

  public getConfig(edcUrl: URL): Map<string, string> {
    var configUrl = edcUrl + "api/config";
    this.httpClient
      .get<JSON>(configUrl)
      .subscribe((data) => this.config = new Map(Object.entries(data)));
    return this.config;
  }

  public updateConfig(edcUrl: URL, newConfig: Map<string, string>) {
    var configUrl = edcUrl + "api/config";
    var json = JSON.stringify(Object.fromEntries(newConfig));
    console.log(json);
    this.httpClient.put(configUrl, json).subscribe(() => console.log("PUT request to " + configUrl + "..."));
    return this.getConfig(edcUrl);
  }

}
