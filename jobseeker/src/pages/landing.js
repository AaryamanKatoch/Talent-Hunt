import React from "react";

const Landing = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <h1>Welcome to JobHunt!</h1>
      <br />
      <p>
        Welcome to JobHunt, the premier job portal for job seekers and employers
        alike. Our platform offers a simple and effective way for job seekers to
        find their next career opportunity and for employers to connect with top
        talent.
      </p>
      <p>
        Whether you're a recent graduate looking to start your career, an
        experienced professional seeking a new challenge, or an employer looking
        to fill a crucial position, we've got you covered.
      </p>
      <p>
        For job seekers, our intuitive search bar makes it easy to find job
        listings that match your skills and interests. Our platform also
        provides personalized job recommendations based on your search history
        and profile information, so you can discover new opportunities that you
        may not have otherwise found.
      </p>
      <p>
        For employers, we offer a streamlined process for posting job listings
        and screening candidates. Our platform allows you to easily manage job
        postings, track applicant information, and communicate with potential
        hires.
      </p>
      <p>
        At JobHunt, we're committed to providing a user-friendly and efficient
        job portal that meets the needs of job seekers and employers alike.
        Whether you're looking for your dream job or the perfect candidate,
        we're here to help. Join our community today and take the next step in
        your career journey.
      </p>
    </div>
  );
};

export default Landing;
