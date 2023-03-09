import { HttpClient } from '@angular/common/http';
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
  * @returns HTTP POST response
  */
  public registerUrl(edcUrl: URL, aasUrl: URL) {
    var requestUrl = edcUrl + "api/client?url=" + aasUrl;
    return this.httpClient.post(requestUrl, null).subscribe((error) => console.log(error));
  }

  /**
   * Register an AAS service the EDC using an environment file.
   *
   * @param edcUrl Clean URL of EDC (only protocol://hostname:port)
   * @param aasPath Path to AAS environment
   * @param aasPort Port of new AAS service
   * @returns HTTP POST response
   */
  registerFileWithPort(edcUrl: URL, aasPath: string, aasPort: Number) {
    var requestUrl = edcUrl + "api/environment?environment=" + aasPath + "&port=" + aasPort;
    return this.httpClient.post(requestUrl, null).subscribe((error) => console.log(error));;
  }

  /**
   * Register an AAS service the EDC using an environment file.
   *
   * @param edcUrl Clean URL of EDC (only protocol://hostname:port)
   * @param aasPath Path to AAS environment
   * @param aasConfigFile Config file for the AAS environment
   * (see EDC4AAS Extension for supported config files)
   * @returns HTTP POST response
   */
  registerFileWithConfig(edcUrl: URL, aasPath: string, aasConfigFile: string) {
    var requestUrl = edcUrl + "api/environment?environment=" + aasPath + "&config=" + aasConfigFile;
    return this.httpClient.post(requestUrl, null).subscribe((error) => console.log(error));;
  }
}
