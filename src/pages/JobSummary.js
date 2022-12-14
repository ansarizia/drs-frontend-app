import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import { CBCMJobStatus } from '../stubs/CBCMJobStatus'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LOAD_JOBSUMMARY } from '../GraphQL/Queries';



function JobSummary() {
    const { systemName, setSelectedJob, setInquiryQ } = useContext(AppContext);
    const [mydata, setMydata] = CBCMJobStatus.map((element) => element.data.jobsPerStatus);
    const [status, setStatus] = useState(1);
    const JobsummaryError = [{ "jobName": "No Data Found", "jobStatus": 0, "srcSystem": "NA", "targetSystem": "NA", "__typename": "JobSummaryBySystemType" }];


    const [jobSummaryResponse, setJobSummaryResponse] = useState([]);

    const { error, loading, data } = useQuery(LOAD_JOBSUMMARY, { variables: { systemName, status } });

    useEffect(() => {
        if (data) {
            if (data.jobSummaryBySystem.length > 0) {
                setJobSummaryResponse(data.jobSummaryBySystem);

            }
            else {
                setJobSummaryResponse(JobsummaryError);
            }

        }



    }, [data])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (


        <div>
            <h2>JobSummary for - {systemName}</h2>
            <div className="page-contain">

                {jobSummaryResponse.map((item) =>

                    <div >
                        <Link to='/jobdetails' className='data-card' onClick={() => { setInquiryQ(item.inquiryQ); setSelectedJob(item.jobName) }}>

                            <h4>{item.jobName ? item.jobName : "NA"}</h4>
                            <h3></h3>
                            <span>Source : <h4>{item.srcSystem ? item.srcSystem : "NA"} </h4> </span>
                            <span> Target : <h4>{item.targetSystem ? item.targetSystem.name : "NA"} </h4> </span>
                            <span>Status: <h4>{item.jobStatus == 1 ? "Completed" : "Failed"} </h4> </span>
                            <span>Pending records: <h4>{item.pendingRecords == 1 ? "Yes" : "NA"} </h4> </span>
                            <span> Reason : <h4>{item.failureReason ? item.failureReason : "NA"} </h4> </span>
                            <span> Date : <h4>{item.runDate ? item.runDate : "NA"} </h4> </span>
                            <span class="link-text">View Details</span>
                        </Link>
                        {console.log(item.pendingRecords)}

                    </div>
                )}
            </div>
        </div>



    )
}

export default JobSummary;