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
        // console.log(data)
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
        if (person.field_of_employment === field) {
          return person;
        }
      });
    } else {
      temp = [...temp];
    }
    setFilteredPeople(temp);
    if (temp.length < 1) {
      setError("No matches Found");
    } else {
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
      {/* <h4>Find Job Seekers For Your Roles</h4> */}
      <br />
      <div className="container form-container">
        <form onSubmit={handleSearch} id="search-form">
          <div className="row">
            <TextField
              label="Search"
              type="text"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              variant="filled"
              color="secondary"
              className="col-3"
              autoFocus
            />
            <div className="col-1"></div>
            <FormControl className="col-2">
              <InputLabel color="secondary">Skill</InputLabel>
              <Select
                value={skill}
                label="Type"
                variant="filled"
                color="secondary"
                size="small"
                onChange={(e) => setSkill(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
                <MenuItem value={"React"}>React</MenuItem>
                <MenuItem value={"Node"}>Node</MenuItem>
                <MenuItem value={"Angular"}>Angular</MenuItem>
                <MenuItem value={"Vue"}>Vue</MenuItem>
                <MenuItem value={"Python"}>Python</MenuItem>
                <MenuItem value={"Java"}>Java</MenuItem>
                <MenuItem value={"Nursing"}>Nursing</MenuItem>
                <MenuItem value={"Doctor"}>Doctor</MenuItem>
                <MenuItem value={"Clinical"}>Clinical</MenuItem>
                <MenuItem value={"Teaching"}>Teaching</MenuItem>
                <MenuItem value={"Administrative"}>Administrative</MenuItem>
                <MenuItem value={"Marketing"}>Marketing</MenuItem>
                <MenuItem value={"Sales"}>Sales</MenuItem>
                <MenuItem value={"Leadership"}>Leadership</MenuItem>
                <MenuItem value={"Autocad"}>Autocad</MenuItem>
                <MenuItem value={"Marketing"}>Marketing</MenuItem>
                <MenuItem value={"Design"}>Design</MenuItem>
                <MenuItem value={"Construction"}>Construction</MenuItem>
              </Select>
            </FormControl>
            <div className="col-1"></div>
            <FormControl className="col-2">
              <InputLabel color="secondary">Field</InputLabel>
              <Select
                value={field}
                label="Type"
                variant="filled"
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
                <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Law"}>Law</MenuItem>
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
        <div className="container" style={{ marginTop: "2em", color: "red" }}>
          {error && <div>{error}</div>}
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
