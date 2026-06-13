//import ExternalServices from "./ExternalServices";


export default class CompoundDetails{
    
    constructor(dataSource, pubchemdetailsElement,wikidetailsElement, imageElement){
        this.dataSource = dataSource;
        this.pubchemdetailsElement = pubchemdetailsElement;
        this.imageElement = imageElement;
        this.wikidetailsElement = wikidetailsElement;
        this.pubChemDetails = {};
        this.wikiDetails = {};
        this.image = {};

    }
    
async init(){
            
    this.pubChemDetails = await this.dataSource.getPubChemData();
    this.wikiDetails = await this.dataSource.getWikiData();
    this.image = `<img src = "${await this.dataSource.getPubChemImage()}" alt = "${await this.pubChemDetails.Title}"/>`;
    this.renderTemplates(this.pubchemdetailsElement, this.wikidetailsElement, this.imageElement);

}
compoundPubChemDetailsTemplate(){
    return ` <h3 class="compound-title"> ${this.pubChemDetails.Title}</h3>
   <table>
    <thead>
    <tr>
    <th scope="col"> Property </th>
    <th scope ="col"> Value</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <th scope="row" > Molecular Weight </th>
    <td> ${this.pubChemDetails.MolecularWeight}</td>
    </tr>
    <tr>
    <th scope="row"> Molecular Formula </th>
    <td> ${this.pubChemDetails.MolecularFormula}</td>
    </tr>
    <tr>
    <th scope="row"> HBondAcceptorCount </th>
    <td> ${this.pubChemDetails.HBondAcceptorCount}</td>
    </tr>
    <tr>
    <th scope="row"> HBondDonorCount </th>
    <td> ${this.pubChemDetails.HBondDonorCount}</td>
    </tr>
    <tr>
    <th scope="row"> IUPACName </th>
    <td> ${this.pubChemDetails.IUPACName}</td>
    </tr>
    </tbody>
    </table>
    `
}
wikiCompoundDetailsTemplate(){
    return ` 
    <h3 class="compound-title"> Description: </h3>
    <p> ${this.wikiDetails.Description}</p>
    <h4> Extract: </h4>
    <p> ${this.wikiDetails.Extract}</p>
    `
}
renderTemplates(element, element2, element3, clear=false){
    const pubChemString = this.compoundPubChemDetailsTemplate();
   const wikiString = this.wikiCompoundDetailsTemplate();
    if (clear){
        element.innerHTML ="";
    }
    element.innerHTML = pubChemString;
  element2.innerHTML = wikiString;
  element3.innerHTML = this.image;
}

}