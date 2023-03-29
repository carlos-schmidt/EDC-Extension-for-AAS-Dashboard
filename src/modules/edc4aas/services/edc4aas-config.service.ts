import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

/**
 * Mainly REST interfaces to the EDC4AAS extension's configuration
 */
@Injectable({
  providedIn: 'root'
})
export class EDC4AASConfigService {

  constructor(private httpClient: HttpClient) {
  }

  public getConfig(edcUrl: URL): Observable<Object> {
    var configUrl = edcUrl + "/config";
    return this.httpClient.get(configUrl);
  }

  public updateConfig(edcUrl: URL, newConfig: Map<string, string>) {
    var configUrl = edcUrl + "/config";
    var json = JSON.stringify(Object.fromEntries(newConfig));
    console.log(json);
    this.httpClient.put(configUrl, json).subscribe(() => console.log("PUT request to " + configUrl + "..."));
    return this.getConfig(edcUrl);
  }

}
