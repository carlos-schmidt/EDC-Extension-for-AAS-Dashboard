import { ConceptDescription } from "src/modules/edc4aas/models/concept-description";
import { AssetAdministrationShell } from "src/modules/edc4aas/models/shell";
import { Submodel } from "src/modules/edc4aas/models/submodel";
import { SubmodelElement } from "src/modules/edc4aas/models/submodel-element";

export class InformationTemplate {

  constructor() { }

  static renderShell(shell: AssetAdministrationShell): HTMLElement {
    return InformationTemplate.renderElement("AssetAdministrationShell", shell.idShort,
      shell.idsAssetId, shell.idsContractId,
      shell.identification.idType, shell.identification.id);
  }

  static renderSubmodel(submodel: Submodel) {
    return InformationTemplate.renderElement("Submodel", submodel.idShort,
      submodel.idsAssetId, submodel.idsContractId,
      submodel.identification.idType, submodel.identification.id);
  }

  static renderSubmodelElement(submodelElement: SubmodelElement) {
    return InformationTemplate.renderElement("SubmodelElement", submodelElement.idShort,
      submodelElement.idsAssetId, submodelElement.idsContractId,
      undefined, undefined);
  }

  static renderConceptDescription(conceptDescription: ConceptDescription) {
    return InformationTemplate.renderElement("ConceptDescription", conceptDescription.idShort,
      conceptDescription.identification.idType, conceptDescription.identification.id,
      conceptDescription.idsAssetId, conceptDescription.idsContractId);
  }

  private static renderElement(elementType: string, idShort: string, idsAssetId: string, idsContractId: string, idType?: string, id?: string) {
    const listItem = document.createElement('mat-list-item');

    const aasPropertiesHeader = document.createElement('div');
    aasPropertiesHeader.innerHTML = `AAS Properties`;
    listItem.appendChild(aasPropertiesHeader);
    const idShortDiv = document.createElement('div');
    idShortDiv.innerHTML = elementType + ` ` + idShort;
    listItem.appendChild(idShortDiv);

    if (idType !== undefined && id !== undefined) {
      const identificationType = document.createElement('div');
      identificationType.innerHTML = `Identification Type: ` + idType;
      listItem.appendChild(identificationType);
      const identification = document.createElement('div');
      identification.innerHTML = `Identifier: ` + id;
      listItem.appendChild(identification);
    }

    const edcPropertiesHeader = document.createElement('div');
    edcPropertiesHeader.innerHTML = `EDC Properties`;
    listItem.appendChild(edcPropertiesHeader);
    const assetId = document.createElement('div');
    assetId.innerHTML = `Asset ID: ` + idsAssetId;
    listItem.appendChild(assetId);
    const contractId = document.createElement('div');
    contractId.innerHTML = `Asset ID: ` + idsContractId;
    listItem.appendChild(contractId);

    return listItem;

  }

}
