import { useState, useEffect } from "react";
import { helper } from "../helper";
import {
  Alert,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
  Chip,
} from "@mui/material/";

function EditProfile(props) {
  const [data, setData] = useState({
    name: props.data.name,
    profile_picture: props.data.profile_picture,
    address: props.data.address,
    field_of_employment: props.data.field_of_employment,
    years_of_experience: props.data.years_of_experience,
    skills: props.data.skills,
    education: props.data.education,
  });
  const [error, setError] = useState(undefined);

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node.js" },
    { value: "Angular", label: "Angular" },
    { value: "Vue", label: "Vue" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
  ];
  const preselectedValues = props.data.skills;

  const initialSelectedSkills = preselectedValues
    .map((value) => options.find((option) => option.value === value))
    .filter((option) => option !== undefined);

  const [selectedSkill, setSelectedSkill] = useState(initialSelectedSkills);

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
      setError(undefined);
    } catch (e) {
      setError(e.message);
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
      {error && <Alert severity="error">{error}</Alert>}
      <div className="card-body">
        <h1 className="card-title">Edit Profile</h1>
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
            Edit Profile
          </Button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
