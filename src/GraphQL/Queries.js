import {gql} from '@apollo/client'
import { AppContext } from '../App';
import { useContext, useState } from 'react'



function GetSystemName() {
  const { systemName } = useContext(AppContext);
  const [selectedSystem, setSelectedSystem ] = useState("");
  setSelectedSystem("system: "+systemName);
  console.log(selectedSystem);
}


export const LOAD_SYSTEMSUMMARY = gql`
query {
    systemSummary {
      systemName
      completedJobs
      pendingJobs
    }
  }`


  export const LOAD_JOBSUMMARY = gql`
  query($systemName: String! , $status: Int! ) {
    jobSummaryBySystem( system: $systemName , pending: $status) {
      jobName
      jobStatus
      srcSystem
      targetSystem
    }
  }`