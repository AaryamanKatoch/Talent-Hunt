import React, {useState, useEffect,useContext} from 'react';
import axios from 'axios';
import Logout from './Logout';
import {Link,useParams} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  ButtonBase,
  Button
} from '@mui/material';
import noImage from '../assets/css/download.jpeg';
// import { AuthContext } from "../firebase/Auth";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState(undefined);
  const [jobsData, setJobsData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [b_disabled, setBDisable] = useState(false);
  let page_player = useParams().page;
  let [hasError,setError] = useState(false);
  // const {currentUser} = useContext(AuthContext);
  let card = null;
  const regex = /(<([^>]+)>)/gi;

  const clickEvent = () => {
    setBDisable(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setBDisable(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [b_disabled]);

  useEffect(() => {
    console.log('on load useeffect');
    // console.log(currentUser);
    // console.log(currentUser.email)
    // console.log(currentUser.displayName)
    async function fetchData() {
      try {
        const {data} = await axios.get('http://localhost:3000/jobseeker/jobs',{params: { page: page_player }});
        setJobsData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [page_player]); 

  const buildCard = (job) => {
    return (
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={job.id}>
        <Card
          sx={{
            width: '100%',
            height: 'auto',
            display: 'flex' ,
            // maxHeight:500,
            marginTop:5,
            boxShadow:
              '0 15px 30px rgba(0,0,0,0.30), 0 10px 8px rgba(0,0,0,0.22);',
            textDecoration: 'none'
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={job.companylogo ? job.companylogo : noImage}
            alt="Live from space album cover"
          />
          <CardActionArea>
            <Link className='Link-for-eventcard' to={`/`}>
              <CardContent>
              <Typography
                  sx={{
                    fontWeight: 'bold',
                    height:'40px',
                  }}
                  component='h3'
                >
                  Job title
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    height:'40px',
                  }}
                  component='h3'
                >
                  {job.description.replace(regex, '').substring(0, 35).toString()}
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>

        </Card>
      </Grid>
    );
  };

  card =
  jobsData &&
      jobsData.map((job) => {
        return buildCard(job);
      });

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else if(hasError){
    return (<div><h2>has error</h2></div>);   
  } else{
    return (
      // <div>
      //   <h2>Home</h2>
      //   <Logout/>
      // </div>
            <div className='main-div'>
              <div className='page-div makeCenter'>
                  {page_player>1 && (<Link to={`/page/${Number(page_player) - 1}`}><Button variant="outlined" color="secondary" type="submit"  className='page_button' disabled={b_disabled} onClick={clickEvent}>previous</Button></Link>)}
                  <h4 className='page_indicator'>{page_player}</h4>
                  {page_player<49 && (<Link to={`/page/${Number(page_player) + 1}`}><Button variant="outlined" color="secondary" type="submit" className='page_button'  disabled={b_disabled} onClick={clickEvent}>next</Button></Link>)}
                  <br></br>
                  <br></br>
              </div>
                <Grid 
                    container 
                    spacing={1}
                    sx={{
                        //flexGrow: 1,
                        //flexDirection: 'column'
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    {card}
                </Grid>
            </div>
    );
  }

  
}

export default Home