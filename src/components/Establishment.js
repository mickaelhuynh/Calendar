import {useState, useEffect} from "react"

function Establishment (id_establishment){ 
    const id=id_establishment.id_establishment
    const [establishment,setEstablishment] = useState(null);
    const API_establishment= 'https://api.staging.bsport.io/api/v1/establishment/?company=6'
    useEffect(() => {
        fetch(`${API_establishment}&id=${id}`, 
        {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token f18688960a8942c83d238b04e88389ac126bf55c'
    }})
    .then(response => 
      response.json())
    .then(json => {
      setEstablishment(json);
    });
  }, [id]);
    

    return(
        <p className="Etablishment_css">
          Etablissement: {establishment !== null && JSON.stringify(establishment.results[0].location.address, null,2).replace(/\"/g, "", "")}
        </p>
    )
}

export default Establishment