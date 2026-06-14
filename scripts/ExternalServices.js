async function convertToJSON(response){

    if (!response.ok){
        
        throw new Error(`HTTP error ${response.status}`)
    }
    return response.json();
}
function errorModal(){
const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("closeModal");

modal.showModal();
modalBtn.addEventListener("click", ()=>{
    modal.close();
})
}

export default class ExternalServices{
    constructor(compound){
        this.compound = compound
    }

    async getPubChemData(){
       const pubChemURL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${this.compound}/property/Title,MolecularWeight,MolecularFormula,HBondDonorCount,HBondAcceptorCount,IUPACName/JSON`;
       
      
        try{
        const response = await fetch(pubChemURL);
        const pubChemData = await convertToJSON(response);
        
            if (!response.ok) {
            throw new Error(`PubChem returned ${response.status}`);
            }

        const returnedCompound = pubChemData.PropertyTable.Properties[0];
       
       return {
            CID: returnedCompound.CID,
            Title : returnedCompound.Title,
            MolecularWeight: returnedCompound.MolecularWeight,
            MolecularFormula: returnedCompound.MolecularFormula,
            HBondAcceptorCount: returnedCompound.HBondAcceptorCount,
            HBondDonorCount: returnedCompound.HBondDonorCount,
            IUPACName: returnedCompound.IUPACName
                }
}
        catch (error){
            console.error("Compound not found:", error)
            errorModal();
            throw error
        }
        
    }
    async getPubChemImage(){
        const pubChemURL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${this.compound}/property/Title/JSON`;
        const response = await fetch(pubChemURL);
        const pubChemData = await convertToJSON(response);
        const CID = pubChemData.PropertyTable.Properties[0].CID
        const pubchemImageURL = `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${CID}/PNG?image_size=150x150`;
        const Imageresponse = await fetch(pubchemImageURL);
       
        return Imageresponse.url
        
    }
    async getWikiData(){
        const wikiURL= `https://en.wikipedia.org/api/rest_v1/page/summary/${this.compound}`

        const response = await fetch(wikiURL);
        const wikiData = await convertToJSON(response);
    
        return {

            Description: wikiData.description,
            Extract: wikiData.extract
        
                }
            
            }

    async init(){

        
        await this.getPubChemData()
        await this.getWikiData()
        await this.getPubChemImage()
            }
        

    
}
