import { usePagination, useTable, Column } from "react-table";
import { JobDetailsData } from "../stubs/JobDetailsData";
import { useState, useContext,useEffect } from "react";
import '../css/table.css'

function JobDet() {

}

function JobDetails() {

  const [myData, setMyData] = JobDetailsData.map((element) => element.data.jobDetails);

  /*
  const keys = Object.keys(myData[0]).join(',');
  const res1 = Object.values(myData[0]).join(',');
  */




  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    const rowsArray = [];
    const valuesArray = [];

    myData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    setTableRows(rowsArray[0]);
    setValues(valuesArray);
  };

  useEffect(() => {
    const rowsArray = [];
    const valuesArray = [];

    myData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    setTableRows(rowsArray[0]);
    setValues(valuesArray);

}, [])



  return (
    <div class="card">
      <button onClick={changeHandler}>Refresh Data</button>

      {console.log(values)}
      {console.log(tableRows)}



      {/* Table */}

      <div class="table-title"> Job Details Data</div>
      <div class="table-wrapper">

      <table class="fl-table">
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      
      </div>

    
    </div>
  )
}

export default JobDetails;