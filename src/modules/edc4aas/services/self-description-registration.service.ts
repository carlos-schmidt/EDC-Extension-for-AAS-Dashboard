import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


/**
 * Combines several services that are used from the {@link SelfDescriptionBrowserComponent}
 */
@Injectable({
  providedIn: 'root'
})
export class SelfDescriptionRegistrationService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Register a standalone AAS service (e.g., FA³ST) at the EDC.
   *
   * @param edcUrl Clean URL of EDC (only protocol://hostname:port)
   * @param aasUrl Base URL of the AAS Service to be added
   * @param _headers Authentication keys if needed
   */
  public registerUrl(edcUrl: URL, aasUrl: URL) {
    var requestUrl = edcUrl + "api/client?url=" + aasUrl;
    return this.httpClient.post(requestUrl, null);
  }

}
