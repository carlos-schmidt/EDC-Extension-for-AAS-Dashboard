import { ConceptDescription } from "./concept-description";
import { AssetAdministrationShell } from "./shell";
import { Submodel } from "./submodel";

export interface SelfDescription {
  shells?: Array<AssetAdministrationShell>;
  submodels?: Submodel[];
  conceptDescriptions?: Array<ConceptDescription>;
}
