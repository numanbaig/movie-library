import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../constants";

const AddMovies = ({ getMovies, setAdd }) => {
  const [movieData, setMovieData] = useState({
    movieName: "",
    duration: "",
    rating: "",
  });

  const handleAddClick = async () => {
    await axios
      .post(`${BASE_URL}/api/movies`, movieData)
      .then(async (response) => {
        setAdd(false);
        await getMovies();

        console.log("Movie added:", response.data);

        setMovieData({
          movieName: "",
          duration: "",
          rating: "",
        });
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  return (
    <Box
      sx={{
        zIndex: 99999,
        background: "#ffff",
        width: "400px",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #3333",
      }}
    >
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "300px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <TextField
            name="movieName"
            value={movieData.movieName}
            onChange={handleInputChange}
            id="outlined-basic"
            label="Movie Name"
            variant="outlined"
          />
          <TextField
            type="number"
            name="duration"
            value={movieData.duration}
            onChange={handleInputChange}
            id="outlined-basic"
            label="Duration"
            variant="outlined"
          />
          <TextField
            type="number"
            name="rating"
            value={movieData.rating}
            onChange={handleInputChange}
            id="outlined-basic"
            label="Rating"
            variant="outlined"
          />
        </Box>
        <Button variant="contained" onClick={handleAddClick}>
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddMovies;
