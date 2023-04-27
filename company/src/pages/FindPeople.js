import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material/";
import { api } from "../api";
import BuildCard from "../components/BuildCard";
let card = null;

function FindPeople() {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [skill, setSkill] = useState("");
  const [field, setField] = useState("");
  const [allPeople, setAllPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let { data } = await api.routes.getAllPeople();
        setAllPeople(data);
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data);
      }
    };
    fetch();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let temp = [];
    //if searchTerm
    if (searchTerm) {
      allPeople.forEach((person) => {
        if (person.name.toLowerCase().indexOf(searchTerm) >= 0) {
          temp.push(person);
        }
      });
    } else {
      temp = [...allPeople];
    }
    //if skill
    if (skill) {
      temp = temp.filter((person) => {
        if (person.skills.includes(skill)) {
          return person;
        }
      });
    } else {
      temp = [...temp];
    }
    //if field
    if (field) {
      temp = temp.filter((person) => {
        if (person.field === field) {
          return person;
        }
      });
    } else {
      temp = [...temp];
    }
    setFilteredPeople(temp);
    if(temp.length < 1){
      setError("No matches Found")
    }
    else{
      setError(null);
    }    
  };
  
  if (filteredPeople.length > 0) {
    card =
      filteredPeople &&
      filteredPeople.map((person) => {
        return <BuildCard data={person} key={person._id} />;
      });
  } else {
    // console.log('here', allPeople);
    card =
      allPeople &&
      allPeople.slice(0, 11).map((person) => {
        return <BuildCard data={person} key={person._id} />;
      });
  }

  return (
    <div className="container">
      <h1>Find Job Seekers For Your Roles</h1>
      <br />
      <div className="container form-container">
        <form onSubmit={handleSearch} id="search-form">
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
              autoFocus
            />
            <div className="col-1"></div>
            <FormControl className="col-2">
              <InputLabel
                id="demo-simple-select-helper-label"
                color="secondary"
              >
                Skill
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={skill}
                label="Type"
                color="secondary"
                size="small"
                onChange={(e) => setSkill(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"DBA"}>DBA</MenuItem>
                <MenuItem value={"SDE"}>SDE</MenuItem>
                <MenuItem value={"Cloud Engineer"}>Cloud Engineer</MenuItem>
              </Select>
            </FormControl>
            <div className="col-1"></div>
            <FormControl className="col-2">
              <InputLabel
                id="demo-simple-select-helper-label"
                color="secondary"
              >
                Field
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={field}
                label="Type"
                color="secondary"
                size="small"
                onChange={(e) => setField(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"Automobile"}>Automobile</MenuItem>
                <MenuItem value={"Civil"}>Civil</MenuItem>
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
      <div className="container">
        <div className="container" style={{marginTop: "2em", color: "red"}}>
          {error && <h3>{error}</h3>}
        </div>        
        <br /> <br />
          <Grid
            container
            spacing={2}
            sx={{
              flexGrow: 1,
              flexDirection: "row",
            }}
          >
            {card}
          </Grid>
      </div>
    </div>
  );
}

export default FindPeople;
