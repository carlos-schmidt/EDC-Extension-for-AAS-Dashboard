import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { SelfDescription } from '../models/self-description';
import { SelfDescriptionContainer } from '../models/self-description-container';


/**
 * Combines several services that are used from the {@link SelfDescriptionBrowserComponent}
 */
@Injectable({
  providedIn: 'root'
})
export class SelfDescriptionBrowserService {
  fetch$ = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
  }

  public getAllSelfDescriptions(url: URL, _headers: HttpHeaders) {
    const selfDescriptions = this.fetch$
      .pipe(
        switchMap(() => {
          return this.httpClient.get<Array<SelfDescription>>(url.toString(),
            { headers: _headers });
        }));

    return new SelfDescriptionContainer(selfDescriptions, url);
  }
}
