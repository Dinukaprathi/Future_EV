import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import "./About-us.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <Container maxWidth="lg" className="about-us-container">
        <Typography variant="h4" className="about-us-title" gutterBottom>
          About Us
        </Typography>

        <Typography variant="body1" className="about-us-description" paragraph>
          At <strong>Future EV Station</strong>, we are dedicated to revolutionizing the way Sri Lanka powers its vehicles. Our mission is to support the adoption of electric vehicles across the nation, reducing carbon footprints and promoting sustainable mobility.
        </Typography><br></br><br></br>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="about-us-card">
              <Typography variant="h6" className="card-title">
                Our Mission
              </Typography>
              <Typography variant="body2" className="card-description">
                To provide state-of-the-art charging facilities and accelerate Sri Lanka’s transition to clean energy transportation.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="about-us-card">
              <Typography variant="h6" className="card-title">
                Our Vision
              </Typography>
              <Typography variant="body2" className="card-description">
                A future where clean energy drives transportation, creating a healthier planet for generations to come.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} className="about-us-card">
              <Typography variant="h6" className="card-title">
                Our Values
              </Typography>
              <Typography variant="body2" className="card-description">
                Innovation, sustainability, and customer focus are at the heart of everything we do.
              </Typography>
            </Paper>
          </Grid>
        </Grid><br></br><br></br>

        <Typography variant="body1" className="about-us-description" paragraph>
          With a network of strategically located charging stations across Sri Lanka, we are here to make EV charging convenient and reliable. Join us in driving the future of transportation for a cleaner, greener Sri Lanka.
        </Typography>
      </Container>
    </div>
  );
};

export default AboutUs;
