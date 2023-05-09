import { useState } from "react";
import { helper } from "../helper";
import {
  Alert,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material/";

function PostJobForm(props) {
  const [data, setData] = useState({
    name: "",
    description: "",
    responsibilities: "",
    visaRequirements: "",
    minimumQualification: "",
  });
  const [error, setError] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      data.name = helper.common.checkIsProperString(data.name, "Name");
      data.description = helper.common.checkIsProperString(
        data.description,
        "Description"
      );
      data.responsibilities = helper.common.checkIsProperString(
        data.responsibilities,
        "Responsibilities"
      );
      data.visaRequirements = helper.common.isValidVisaRequirement(
        data.visaRequirements
      );
      data.minimumQualification = helper.common.isValidMinimumQualification(
        data.minimumQualification
      );
    } catch (e) {
      setError(e.message);
      return;
    }
    props.onSubmit(data);
    setData({
      name: "",
      description: "",
      responsibilities: "",
      visaRequirements: "",
      minimumQualification: "",
    });
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
        <h2 className="card-title">Create Job Posting</h2>
        <br />
        <form onSubmit={handleSubmit} id="job-form">
          <TextField
            label="Name"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            variant="filled"
            color="secondary"
            type="text"
            fullWidth
            sx={{ mb: 3 }}
            required
          />
          <TextField
            label="Description"
            value={data.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            required
            variant="filled"
            color="secondary"
            type="text"
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Responsibilities"
            value={data.responsibilities || ""}
            onChange={(e) =>
              setData({ ...data, responsibilities: e.target.value })
            }
            variant="filled"
            color="secondary"
            type="text"
            fullWidth
            sx={{ mb: 3 }}
            required
          />
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Visa Requirements*</InputLabel>
            <Select
              variant="filled"
              label="Visa Requirements"
              value={data.visaRequirements || ""}
              onChange={(e) =>
                setData({ ...data, visaRequirements: e.target.value })
              }
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
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Minimum Qualification*</InputLabel>
            <Select
              label="Minimum Qualification"
              variant="filled"
              value={data.minimumQualification || ""}
              onChange={(e) =>
                setData({ ...data, minimumQualification: e.target.value })
              }
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
          <br />
          <br />
          <Button variant="outlined" color="secondary" type="submit">
            Create Job
          </Button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

export default PostJobForm;
