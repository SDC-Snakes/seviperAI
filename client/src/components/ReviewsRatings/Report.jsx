import React, { useState } from 'react';

function Report() {
  // later on, once we retreive data from the API , reportState
  // needs to be initialized to the report state from the data in the API
  const [reportState, setReportState] = useState(false)
  const ReportFunc = () => {
    setReportState(true);
    // axios post request to change the report data in the API
  };
  return (
    <div className="Report" onClick={ReportFunc}>
      Report
    </div>
  );
}

export default Report;
