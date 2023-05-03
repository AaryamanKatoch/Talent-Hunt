import React from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

function BuildCard({ data }) {
  return (
    <div>
      <Grid
        item
        xs={12}
        sm={7}
        md={5}
        lg={4}
        xl={3}
        key={data.id}
        style={{
          marginBottom: "10px",
          marginLeft: "70px",
          marginTop: "15px",
        }}
      >
        <Link
          to={`/jobSeeker/${data._id}`}
          style={{ textDecoration: "none" }}
        >
          <div
            className="card bg-dark"
            style={{
              width: "15rem",
              height: "19rem",
              marginLeft: "10px",
              marginRight: "10px",
              borderRadius: 5,
              border: "2px groove #1e8678",
              color: "white"
            }}
          >
            <div className="card-body">
              <h5 className="card-title">
                {data.name}
              </h5>
              <hr />
              <p className="card-text">{data["email"]}</p>
              <hr />
              <p className="card-text">{data["years_of_experience"]} years of experience</p>
              <hr />
              <p className="card-text">{data["field_of_employment"]}</p>
              <hr />
              <Link to={`/jobSeeker/${data._id}`}><p className="card-text btn btn-info">Know More</p></Link>
            </div>
          </div>
        </Link>
      </Grid>
    </div>
  );
}

export default BuildCard;