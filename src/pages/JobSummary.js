import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import { CBCMJobStatus } from '../stubs/CBCMJobStatus'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LOAD_JOBSUMMARY } from '../GraphQL/Queries';



function JobSummary() {
    const { systemName } = useContext(AppContext);
    const [mydata, setMydata] = CBCMJobStatus.map((element) => element.data.jobsPerStatus);
    const [status,setStatus] = useState(1);


    const [jobSummaryResponse, setJobSummaryResponse] = useState([]);

    const { error, loading, data } = useQuery(LOAD_JOBSUMMARY, { variables: { systemName , status } });

    useEffect(() => {
        if (data) {

            setJobSummaryResponse(data.jobSummaryBySystem);

        }

    }, [data])


    return (

        <div >
            <h1>JobSummary for - {systemName}</h1>
            <div className="page-contain">
                {jobSummaryResponse.map((item) =>
                    <div >
                        <Link to='/jobdetails' className='data-card'>
                            <h3>{item.jobName}</h3>
                            <h4></h4>
                            <span>srcSystem: {item.srcSystem} </span>
                            <span>targetSystem: {item.targetSystem} </span>
                            <span>Status: {item.jobStatus} </span>

                            <span class="link-text">View Details</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>


    )
}

export default JobSummary;