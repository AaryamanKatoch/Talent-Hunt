import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import noImage from "../assets/css/download.jpeg";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MuiAlert from "@mui/material/Alert";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [jobsData, setJobsData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [b_disabled, setBDisable] = useState(false);
  const [wantAttention, setWantAttention] = useState(false);
  let page_player = useParams().page;
  let [hasError, setError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  const [visaReq, setVisaReq] = useState("");
  const [minQual, setMinQual] = useState("");
  const navigate = useNavigate();
  let card = null;
  const regex = /(<([^>]+)>)/gi;

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
  });

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
    const handlePopstate = () => {
      setVisaReq("");
      setMinQual("");
      setSearchTerm("");
      setWantAttention(true);
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/jobseeker/jobs",
          {
            params: {
              page: page_player,
              search: searchTerm,
              visaReq: visaReq,
              minQual: minQual,
            },
          }
        );
        setJobsData(data);
        setLoading(false);
        setWantAttention(false);
        setError(false);
      } catch (e) {
        setErrorMessage(e.response.data);
        setError(true);
        setLoading(false);
        setWantAttention(false);
      }
    }
    fetchData();
  }, [page_player, wantAttention]);

  const handleSearch = (e) => {
    e.preventDefault();
    setWantAttention(true);
    navigate(`/page/${1}`);
  };

  const buildCard = (job) => {
    return (
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={job._id}>
        <Card
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            // maxHeight:500,
            marginTop: 5,
            boxShadow:
              "0 15px 30px rgba(0,0,0,0.30), 0 10px 8px rgba(0,0,0,0.22);",
            textDecoration: "none",
          }}
        >
          {/* <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={job.image ? job.image : noImage}
            alt="Live from space album cover"
          /> */}
          {job.image ? (
            <img src={`data:image/png;base64,${job.image}`} />
          ) : (
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={noImage}
              alt="Live from space album cover"
            />
          )}
          <CardActionArea>
            <Link className="Link-for-eventcard" to={`/jobDetails/${job._id}`}>
              <CardContent>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    height: "40px",
                  }}
                  component="p"
                >
                  {job.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    height: "40px",
                  }}
                  component="p"
                >
                  {job.description
                    .replace(regex, "")
                    .substring(0, 35)
                    .toString()}
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
    jobsData.jobs &&
    jobsData.jobs.map((job) => {
      return buildCard(job);
    });

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  // else if (hasError) {
  //   return (
  //     <div className="makeCenter">
  //     <Alert severity="error">{errorMessage}</Alert>
  //   </div>
  //   );
  // }
  else {
    return (
      <div className="main-div">
        <div className="container form-container">
          <form id="search-form" onSubmit={handleSearch}>
            <div className="row">
              <TextField
                label="Search"
                type="text"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                color="secondary"
                className="col-3"
              />
              <div className="col-1"></div>
              <FormControl className="col-2">
                <InputLabel
                  id="demo-simple-select-helper-label"
                  color="secondary"
                >
                  Visa Requirements
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={visaReq}
                  label="Type"
                  color="secondary"
                  size="small"
                  onChange={(e) => setVisaReq(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Citizen"}>Citizen</MenuItem>
                  <MenuItem value={"GreenCard"}>Green Card</MenuItem>
                  <MenuItem value={"H1B"}>H1B</MenuItem>
                  <MenuItem value={"F1"}>F1</MenuItem>
                  <MenuItem value={"H4EAD"}>H4EAD</MenuItem>
                </Select>
              </FormControl>
              <div className="col-1"></div>
              <FormControl className="col-2">
                <InputLabel
                  id="demo-simple-select-helper-label"
                  color="secondary"
                >
                  Minimum Qualification
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={minQual}
                  label="Type"
                  color="secondary"
                  size="small"
                  onChange={(e) => setMinQual(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"bachelors"}>Bachelors Degree</MenuItem>
                  <MenuItem value={"masters"}>Masters Degree</MenuItem>
                  <MenuItem value={"phd"}>PHD</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
              <div className="col-1"></div>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className="col-1"
                style={{ maxHeight: "40px" }}
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {hasError ? (
          <div className="makeCenter">
            <Alert severity="error">{errorMessage}</Alert>
          </div>
        ) : (
          <div>
            <div className="page-div makeCenter">
              {page_player > 1 && (
                <Link to={`/page/${Number(page_player) - 1}`}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    className="page_button"
                    disabled={b_disabled}
                    onClick={clickEvent}
                  >
                    previous
                  </Button>
                </Link>
              )}
              <div className="page_indicator">{page_player}</div>
              {jobsData.moreJobsExist && (
                <Link to={`/page/${Number(page_player) + 1}`}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    className="page_button"
                    disabled={b_disabled}
                    onClick={clickEvent}
                  >
                    next
                  </Button>
                </Link>
              )}
              <br></br>
              <br></br>
            </div>
            <Grid
              container
              spacing={1}
              sx={{
                //flexGrow: 1,
                //flexDirection: 'column'
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {card}
            </Grid>
          </div>
        )}
      </div>
    );
  }
};

export default Home;
