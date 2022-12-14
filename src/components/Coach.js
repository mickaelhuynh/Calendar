import {useState, useEffect} from "react"

function Coach (id_coach){ 
    const id=id_coach.id_coach
    const [coach,setCoach] = useState(null);
    const API_coach= 'https://api.staging.bsport.io/api/v1/coach/?company=6'
    useEffect(() => {
        fetch(`${API_coach}&id__in=${id}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token f18688960a8942c83d238b04e88389ac126bf55c'
    }})
    .then(response => 
      response.json())
    .then(json => {
      setCoach(json);
    });
  }, [id]);
    

    return(
        <p className="Coach_css">
            Coach: {coach !== null && JSON.stringify(coach.results[0].user.name, null,2).replace(/\"/g, "", "")}
        </p>
    )
}

export default Coach