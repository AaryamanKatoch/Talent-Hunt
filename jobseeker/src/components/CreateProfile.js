import { useState, useEffect } from "react";
import { helper } from "../helper";
import {
  Autocomplete,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material/";

function CreateProfile(props) {
  const [data, setData] = useState({
    name: "",
    profile_picture: "",
    address: "",
    field_of_employment: "",
    years_of_experience: "",
    skills: [],
    education: "",
  });
  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node.js" },
    { value: "Angular", label: "Angular" },
    { value: "Vue", label: "Vue" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
  ];

  const [selectedSkill, setSelectedSkill] = useState([]);

  const handleSelectedSkillChange = (event, newValue) => {
    setSelectedSkill(newValue);
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      skills: selectedSkill.map((skill) => skill.value),
    }));
  }, [selectedSkill]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    try {
      data.name = helper.common.checkIsProperString(data.name, "Name");
      data.name = helper.common.isValidName(data.name);
      data.profile_picture = helper.common.isValidWebImage(
        data.profile_picture
      );
      data.skills = helper.common.checkIsProperArrayOfStrings(data.skills);
      data.address = helper.common.checkIsProperString(data.address);
      data.years_of_experience = helper.common.isValidInteger(
        data.years_of_experience
      );
      data.field_of_employment = helper.common.checkIsProperString(
        data.field_of_employment,
        "Field of employment"
      );
      data.education = helper.common.checkIsProperString(data.education);
    } catch (e) {
      alert(e);
      return;
    }
    props.onSubmit(data);
  };

  return (
    <div
      className="card"
      style={{
        width: "60rem",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3rem",
      }}
    >
      {/* {error ? <h5 className="card-header error">{error}</h5> : ""} */}
      <div className="card-body">
        <h5 className="card-title">Create Profile</h5>
        <br />
        <form onSubmit={handleSubmit} id="profile-form">
          <TextField
            label="Name"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            sx={{ mb: 3 }}
            required
          />
          <TextField
            label="Profile Picture URL"
            value={data.profile_picture || ""}
            onChange={(e) =>
              setData({ ...data, profile_picture: e.target.value })
            }
            variant="outlined"
            color="secondary"
            type="url"
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Address"
            value={data.address || ""}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            required
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Education"
            value={data.education || ""}
            onChange={(e) => setData({ ...data, education: e.target.value })}
            required
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Years of Experience"
            value={data.years_of_experience || ""}
            onChange={(e) =>
              setData({ ...data, years_of_experience: e.target.value })
            }
            required
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            sx={{ mb: 3 }}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Field Of Employement
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Field Of Employment"
              value={data.field_of_employment || ""}
              onChange={(e) =>
                setData({ ...data, field_of_employment: e.target.value })
              }
              required
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
          <br />
          <br />
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select skills"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: selectedSkill.map((option) => (
                    <Chip
                      key={option.value}
                      label={option.label}
                      style={{ margin: "2px" }}
                      onDelete={() => {
                        setSelectedSkill((prevSelected) =>
                          prevSelected.filter(
                            (skill) => skill.value !== option.value
                          )
                        );
                      }}
                    />
                  )),
                }}
              />
            )}
            value={selectedSkill}
            onChange={handleSelectedSkillChange}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
          />
          <br />
          <br />
          <Button variant="outlined" color="secondary" type="submit">
            Create Profile
          </Button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
