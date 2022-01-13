import './Voters.css'
import React from 'react';
import ErrorComponent from "../error/ErrorComponent";
import * as R from 'ramda'
import {createElectionPagePath} from "../election/electionConstant";
import {dashboardPagePath} from "../dashboard/dashboardConstant";

const eligibleClass = eligible => {
    if(eligible){
        return 'selected'
    } else {
        return 'not-selected'
    }
}

const Voter = ({name, eligible, onClick}) => {
    const theClass = eligibleClass(eligible)
    return <li className={theClass} onClick={onClick}>{name}</li>
}

const VoterList = ({voters, setVoterEligibility}) => {
    const createVoterElement = voter =>{
        const onClick = () => {
            setVoterEligibility({name:voter.name, eligible:!voter.eligible})
        }
        return <Voter key={voter.name} name={voter.name} eligible={voter.eligible} onClick={onClick}/>
    }
    const voterElements = R.map(createVoterElement, voters)
    return <ul className={'flex'}>
        {voterElements}
    </ul>
}

const Voters = (
    {
        electionName,
        originalVoters,
        votersWithEdits,
        updateVoterEdits,
        setVotersRequest,
        fetchVotersRequest,
        errors
    }) => {
    const hasPendingEdits = !R.equals(originalVoters, votersWithEdits)
    const applyChanges = () => {
        const eligibleVoters = R.filter(R.prop('eligible'), votersWithEdits)
        const eligibleVoterNames = R.map(R.prop('name'), eligibleVoters)
        setVotersRequest({election:electionName, voters:eligibleVoterNames})
    }
    const discardChanges = () => {
        fetchVotersRequest(electionName)
    }
    const setVoterEligibility = updatedVoter => {
        const updateVoter = originalVoter => {
            if(updatedVoter.name === originalVoter.name){
                return updatedVoter
            } else {
                return originalVoter
            }
        }
        const newVotersWithEdits = R.map(updateVoter, votersWithEdits)
        updateVoterEdits(newVotersWithEdits)
    }
    return <div className={'Voters center-page'}>
        <div className={'single-column'}>
            <h1>Voters for {electionName}</h1>
            <ErrorComponent errors={errors}/>
            <span>Filter</span>
            <input/>
            <VoterList voters={votersWithEdits} setVoterEligibility={setVoterEligibility}/>
            <button type={"submit"} onClick={applyChanges} disabled={!hasPendingEdits}>Apply Changes</button>
            <button type={"submit"} onClick={discardChanges} disabled={!hasPendingEdits}>Discard Changes</button>
            <hr/>
            <a href={createElectionPagePath(electionName)}>election {electionName}</a>
            <a href={dashboardPagePath}>dashboard</a>
        </div>
    </div>
}

/*
/SetEligibleVoters
{
  "electionName" : "Favorite Ice Cream",
  "userNames" : [ "Alice", "Bob", "Dave" ]
}
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoiT1dORVIiLCJ1c2VyTmFtZSI6IkFsaWNlIn0.Y_1bjGnsxpXABD6x8OnXYoiCVkTOXsLrbJQRMJ-SkeaitfU12uedqtJtS7RTLWNljzGBoHgjpRA0hFCZ2_GgNfKKq6ZTnTQyHdoC_vQblSabfM8ZiU1z8zXG9tOHDwnJ7OL9zBreGxinsKClcfBNlYIn1KC2R3CbkDxICrR_DcA
Cookie: Refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyTmFtZSI6IkFsaWNlIn0.bDwBqTpowEk1UoXTLtMuYUchVokw2RmiVsh70Ne4BqmS62Z1OUmJUGG2EpYcFqI6fZ6pRfK_Zahn6brCctk1KodZA9vUp9kF8WoZQo1m6TIULW2FS6Mhzojcd6VXhk99hABjZWdXzGP8lEow64AtL3CjDUWeQpv445RimjD0Z4Y
200

/ListEligibility
{
  "electionName" : "Favorite Ice Cream"
}
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoiT1dORVIiLCJ1c2VyTmFtZSI6IkFsaWNlIn0.Y_1bjGnsxpXABD6x8OnXYoiCVkTOXsLrbJQRMJ-SkeaitfU12uedqtJtS7RTLWNljzGBoHgjpRA0hFCZ2_GgNfKKq6ZTnTQyHdoC_vQblSabfM8ZiU1z8zXG9tOHDwnJ7OL9zBreGxinsKClcfBNlYIn1KC2R3CbkDxICrR_DcA
Cookie: Refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyTmFtZSI6IkFsaWNlIn0.bDwBqTpowEk1UoXTLtMuYUchVokw2RmiVsh70Ne4BqmS62Z1OUmJUGG2EpYcFqI6fZ6pRfK_Zahn6brCctk1KodZA9vUp9kF8WoZQo1m6TIULW2FS6Mhzojcd6VXhk99hABjZWdXzGP8lEow64AtL3CjDUWeQpv445RimjD0Z4Y
200
Content-Type: application/json
[ {
  "name" : "Alice",
  "eligible" : true
}, {
  "name" : "Bob",
  "eligible" : true
}, {
  "name" : "Dave",
  "eligible" : true
}, {
  "name" : "Eve",
  "eligible" : false
} ]

/IsEligible
{
  "userName" : "Alice",
  "electionName" : "Favorite Ice Cream"
}
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJyb2xlIjoiT1dORVIiLCJ1c2VyTmFtZSI6IkFsaWNlIn0.Y_1bjGnsxpXABD6x8OnXYoiCVkTOXsLrbJQRMJ-SkeaitfU12uedqtJtS7RTLWNljzGBoHgjpRA0hFCZ2_GgNfKKq6ZTnTQyHdoC_vQblSabfM8ZiU1z8zXG9tOHDwnJ7OL9zBreGxinsKClcfBNlYIn1KC2R3CbkDxICrR_DcA
Cookie: Refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyTmFtZSI6IkFsaWNlIn0.bDwBqTpowEk1UoXTLtMuYUchVokw2RmiVsh70Ne4BqmS62Z1OUmJUGG2EpYcFqI6fZ6pRfK_Zahn6brCctk1KodZA9vUp9kF8WoZQo1m6TIULW2FS6Mhzojcd6VXhk99hABjZWdXzGP8lEow64AtL3CjDUWeQpv445RimjD0Z4Y
200
Content-Type: application/json
true

 */

export default Voters
