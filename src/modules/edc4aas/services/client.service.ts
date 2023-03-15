import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { CONNECTOR_DEFAULT_API } from "../variables";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientUrl: URL;
  constructor(private httpClient: HttpClient,
    @Inject(CONNECTOR_DEFAULT_API) provider: URL) {
    this.clientUrl = new URL(provider.toString().concat("automated"));
  }

  public negotiateContractAndGetData(provider: URL, assetId: string) {
    var requestUrl = new URL(this.clientUrl.toString().concat("negotiate"));
    requestUrl.searchParams.append("assetId", assetId);
    requestUrl.searchParams.append("providerUrl", provider.toString());

    return this.httpClient.post(requestUrl.toString(), null);
  }

  public writeDataToHttpEndpoint(provider: URL, assetId: string, url: URL) {
    // Feature not in extension yet
  }
}
