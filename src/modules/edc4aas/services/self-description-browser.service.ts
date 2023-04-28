import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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
  // Save state when switching pages
  selfDescriptionContainers$: Set<SelfDescriptionContainer>;

  constructor(private httpClient: HttpClient) {
    this.selfDescriptionContainers$ = new Set();
  }

  public getAllSelfDescriptions() {
    return this.selfDescriptionContainers$;
  }

  public updateSelfDescriptions(selfDescriptions: Observable<SelfDescription[]>, url: URL) {
    this.selfDescriptionContainers$.add(new SelfDescriptionContainer(selfDescriptions, url));
  }
  public readSelfDescriptions(url: URL) {
    const selfDescriptions = this.fetch$
      .pipe(
        switchMap(() => {
          return this.httpClient.get<Array<SelfDescription>>(url.toString());
        }));

    this.updateSelfDescriptions(selfDescriptions, url);
  }

  public removeSelfDescriptionContainer(selfDescriptionContainer: SelfDescriptionContainer) {
    return this.selfDescriptionContainers$.delete(selfDescriptionContainer);
  }

}
