import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import { CBCMJobStatus } from '../stubs/CBCMJobStatus'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LOAD_JOBSUMMARY } from '../GraphQL/Queries';



function JobSummary() {
    const { systemName,setSelectedJob } = useContext(AppContext);
    const [mydata, setMydata] = CBCMJobStatus.map((element) => element.data.jobsPerStatus);
    const [status,setStatus] = useState(1);
    const JobsummaryError= [{"jobName":"No Data Found","jobStatus":0,"srcSystem":"NA","targetSystem":"NA","__typename":"JobSummaryBySystemType"}];


    const [jobSummaryResponse, setJobSummaryResponse] = useState([]);

    const { error, loading, data } = useQuery(LOAD_JOBSUMMARY, { variables: { systemName , status } });

    useEffect(() => {
        if (data ) {
            if (data.jobSummaryBySystem.length > 0) {
            setJobSummaryResponse(data.jobSummaryBySystem);
            {console.log(data.jobSummaryBySystem.length)}
        }
        else {
            setJobSummaryResponse(JobsummaryError);
        }

        }
        else {
            setJobSummaryResponse(mydata);
        }
        
        

    }, [data])


    return (

        
        
        <div className="page-contain">
        <h3>JobSummary for - {systemName}</h3>
            {jobSummaryResponse.map((item) =>
                <div >
                    <Link to='/jobdetails' className='data-card' onClick={setSelectedJob(item.jobName)}>
                        
                        <h4>{item.jobName ? item.jobName : "NA"}</h4>
                        <h3></h3>
                        <span>Source : <h4>{item.srcSystem ? item.srcSystem : "NA"} </h4> </span>
                        <span> Target : <h4>{item.targetSystem ? item.targetSystem : "NA"} </h4> </span>
                        <span>Status: <h4>{item.jobStatus ? item.jobStatus : "NA"} </h4> </span>

                        <span class="link-text">View Details</span>
                    </Link>
                </div>
            )}
        </div>
   


    )
}

export default JobSummary;