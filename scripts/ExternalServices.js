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
       
      

        const response = await fetch(pubChemURL);
        const pubChemData = await convertToJSON(response);
        
        const returnedCompound = pubChemData.PropertyTable.Properties[0];
       console.log("PubChemData:" , pubChemData);
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
    async getPubChemImage(){
        const pubChemURL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${this.compound}/property/Title/JSON`;
        const response = await fetch(pubChemURL);
        const pubChemData = await convertToJSON(response);
        const CID = pubChemData.PropertyTable.Properties[0].CID
        const pubchemImageURL = `https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${CID}/PNG?image_size=300x300`;
        const Imageresponse = await fetch(pubchemImageURL);
        console.log("response:", Imageresponse.url)
        //console.log("CID:", CID)
        return Imageresponse.url
        
    }
    async getWikiData(){
        const wikiURL= `https://en.wikipedia.org/api/rest_v1/page/summary/${this.compound}`

        const response = await fetch(wikiURL);
        const wikiData = await convertToJSON(response);
        
        console.log("Wikipedia Data:" , wikiData);
      
        
        console.log("wikiData.description:" , wikiData.description);
        console.log("wikiData.extract:", wikiData.extract)
        return {

            Description: wikiData.description,
            Extract: wikiData.extract
        
                }
            
            }

    async init(){

        try{
        await this.getPubChemData()
        await this.getWikiData()
        await this.getPubChemImage()
            }
        catch (error){
            errorModal();
        console.log("Error fetching the data", error);
}

    }
}
