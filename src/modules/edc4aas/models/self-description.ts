import { ConceptDescription } from "./concept-description";
import { AssetAdministrationShell } from "./shell";
import { Submodel } from "./submodel";

export interface SelfDescription {
  assetAdministrationShells: Array<AssetAdministrationShell>;
  submodels: Array<Submodel>;
  conceptDescriptions: Array<ConceptDescription>;
}
