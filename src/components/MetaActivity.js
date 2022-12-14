import {useState, useEffect} from "react"

function MetaActivity (id_metaActivity){ 
    const id=id_metaActivity.id_metaActivity
    const [metaActivity,setMetaActivity] = useState(null);
    const API_metaActivity= 'https://api.staging.bsport.io/api/v1/meta-activity/?company=6'
    useEffect(() => {
        fetch(`${API_metaActivity}&id__in=${id}`, 
        {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token f18688960a8942c83d238b04e88389ac126bf55c'
    }})
    .then(response => 
      response.json())
    .then(json => {
      setMetaActivity(json);
    });
  }, [id]);
    

    return(
        <p className="metaActivity_css">
          Activité: {metaActivity !== null && JSON.stringify(metaActivity.results[0].name, null,2).replace(/\"/g, "", "")}
        </p>
    )
}

export default MetaActivity