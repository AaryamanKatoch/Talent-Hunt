import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {api} from '../api'

function Application() {
    const params = useParams();
    const jobId = params.jobId;
    // console.log(jobId);
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
      try {
        const { data } = await api.routes.getJobDetails(jobId);
        // console.log(data);
        setData(data);
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data);
      }
    };
    fetch();
    }, []);
    

  return (
    <div>Application</div>
  )
}

export default Application