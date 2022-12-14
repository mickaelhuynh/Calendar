import {useState} from 'react'

function EndDate({start,duration}){
    const dur=duration;
    start.setMinutes(start.getMinutes() + dur)
    return (
        <p>
            {start.toLocaleString("fr-FR",{
                hour:'numeric',minute:'numeric'
            })}
        </p>)
}

export default EndDate;