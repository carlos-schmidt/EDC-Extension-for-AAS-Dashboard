import { Observable } from "rxjs";
import { SelfDescription } from "./self-description";

export class SelfDescriptionContainer {
  selfDescriptions: Observable<Array<SelfDescription>>;
  provider: URL;

  constructor(selfDescriptions: Observable<Array<SelfDescription>>, provider: URL) {
    this.selfDescriptions = selfDescriptions;
    this.provider = provider;
  }
}
