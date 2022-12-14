import {useState, useEffect, useRef} from "react"
import '../styles/App.css'
import Coach from './Coach.js'
import Establishment from "./Establishment";
import MetaActivity from "./MetaActivity";
import Calendar from 'react-calendar'
import EndDate from "./EndDate";

function App() {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth()+1;
  const day = selectedDate.getDate();
  const today=`${year}-${month}-${day}`

  useEffect(() => {
    fetch(`https://api.staging.bsport.io/api/v1/offer/?company=6&date=${today}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token f18688960a8942c83d238b04e88389ac126bf55c'
  }})
    .then(response => 
      response.json())
    .then(json => {
      setData(json);
    });
  }, [selectedDate]);

  // Cette fonction permet d'actualiser "selectedDate" selon la date cliqué sur le calendrier
  const onClickDay = date => {
    setSelectedDate(date);
  }  
  
  // Cette fonction permet de vérifier si 2 dates ont le même jour (l'heure peut être différente)
  const sameDay = (date1, date2) =>{
    if (date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()) { 
        return true;
      }
    return false;
    }
    
  return (
    <div className="App"> 
        {/* This is a condition implemented to tell the user that the data is loading */}
      {data === null && <p className="loading">Loading data...</p>}
      {data !== null && (
        <div>
          <div className="calendar">
          <Calendar onClickDay={onClickDay}/>
          </div>
          <section className="today-box" id="today-box">
            <span className="today">Today</span>
            {/* Je fais afficher cette date sous le format "Fri Dec 30 2022" */}
            <h3 className="date-title">{new Date(JSON.stringify(selectedDate).replace(/\"/g, "", "")).toDateString()}</h3>
          </section>

          <ul>
            {/* J'itère sur chaque donnée afin de récuperer l'activité, l'entreprise, la date de début, le coach et l'établissement */}
            {data.results.map(result => (
              (sameDay(selectedDate,new Date(JSON.stringify(result.date_start).replace(/\"/g, "", ""))) == true ? 
                <div className="day">
                <li key={result.id} className="task">
                  <h4>
                    {new Date(JSON.stringify(result.date_start).replace(/\"/g, "", "")).toLocaleString("fr-FR",{hour:'numeric',minute:'numeric'})}
                    {/* Le composant EndDate me permet de calculer la date de fin à partir de la date de départ et de la durée de l'activité */}
                    <EndDate start={new Date(JSON.stringify(result.date_start).replace(/\"/g, "", ""))} duration={result.duration_minute} />  
                  </h4>   
                  <p className="Company_css">
                  Entreprise: {result.company}
                  </p>
                  {/* Le composant MetaActivity se connecte à l'API concerné afin de récupérer l'activité associé à l'ID trouvé dans les données de base */}
                  <MetaActivity id_metaActivity={result.meta_activity} />
                  {/* Le composant Coach se conne cte à l'API concerné afin de récupérer le coach associé à l'ID trouvé dans les données de base */}
                  <Coach id_coach={result.coach}/>
                  {/* Le composant Establishment se connecte à l'API concerné afin de récupérer l'établissement associé à l'ID trouvé dans les données de base */}
                  <Establishment id_establishment={result.establishment} />
                </li>
                </div>
              : 
              <p>No activities for today</p>)
            ))}
            {/* Si il n'y a pas d'activités pour la journée, ce message s'affichera. */}
          </ul>
        </div>
      )
      }
    </div>
  );
}

export default App;
