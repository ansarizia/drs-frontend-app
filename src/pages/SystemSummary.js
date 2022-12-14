import { useState, useContext, useEffect } from "react";
import '../css/DataCard.css';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import DoughnutChart from '../components/DoughnutChart';
import { JobData } from '../stubs/DRS_job_status';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { useQuery, gql } from '@apollo/client';
import { LOAD_SYSTEMSUMMARY } from '../GraphQL/Queries';

function SystemSummary() {


  /* const [mydata, setMydata] = JobData.map((element) => element.data.jobsBySystem) */
  const { setSystemName, setSelectedSystem } = useContext(AppContext);



  const [newSystemName, setNewSystemName] = useState("");

  const [systemSummaryResponse, setSystemSummaryResponse] = useState([]);

  const { error, loading, data } = useQuery(LOAD_SYSTEMSUMMARY);
  useEffect(() => {
    if (data) {
      setSystemSummaryResponse(data.systemSummary);
    }
    else {
      setSystemSummaryResponse(JobData.map((element) => element.data.jobsBySystem));
    }

  }, [data])

  function PopulateChart(props) {
    const [jobStatusData, setJobStatusData] = useState(

      {
        labels: ['Completed', 'Pending'],
        datasets: [{
          label: props.label,
          data: [props.data.completedJobs, props.data.pendingJobs],
          backgroundColor: [
            '#47B39C',
            '#FFC154'

          ]
        }]
      }
    )

    return (
      <div ><PieChart chartData={jobStatusData} />  </div>
    )
  }

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <h2>SystemSummary </h2>
      <div className="page-contain">

        {systemSummaryResponse.map((item) =>
          <Link to='/jobsummary' className='data-card' onClick={() => setSystemName(item.systemName)} >
            < PopulateChart data={item} label={item.systemName} />
            <span className="link-text"    > {item.systemName} </span>
          </Link>
        )}
      </div>
    </div>
  );

}

export default SystemSummary;