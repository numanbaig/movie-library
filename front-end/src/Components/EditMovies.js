import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BASE_URL } from "../constants";

const EditMovies = ({ open, handleClose, rowId, getMovies, setEditMovies }) => {
  const [movieData, setMovieData] = useState({
    movieName: "",
    duration: "",
    rating: "",
  });

  console.log(movieData, "movie dat");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData({
      ...movieData,

      [name]: value,
    });
  };
  const gateMovieData = async () => {
    await axios
      .get(`${BASE_URL}/api/movies/${rowId}`)
      .then((response) => {
        setMovieData({
          movieName: response.data.movieName,
          duration: response.data.duration,
          rating: response.data.rating,
        });
        console.log("Edit successful:", response.data);
      })
      .catch((error) => {
        console.error("Edit failed:", error);
      });
  };

  const handleEdt = async () => {
    await axios
      .put(`http://192.168.1.57:3000/api/movies/${rowId}`, { ...movieData })
      .then(async (response) => {
        setMovieData({
          movieName: response.data.movieName,
          duration: response.data.duration,
          rating: response.data.rating,
        });
        await getMovies();
        setEditMovies(false);

        console.log("Edit successful:", response.data);
      })
      .catch((error) => {
        console.error("Edit failed:", error);
      });
  };
  useEffect(() => {
    if (rowId) {
      gateMovieData();
    }
  }, [rowId]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "300px",
              margin: " 0 auto",
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
              name="duration"
              value={movieData.duration}
              onChange={handleInputChange}
              id="outlined-basic"
              label="Duration"
              variant="outlined"
            />
            <TextField
              name="rating"
              value={movieData.rating}
              onChange={handleInputChange}
              id="outlined-basic"
              label="Rating"
              variant="outlined"
            />
          </Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={handleEdt}>
              {" "}
              Edit{" "}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMovies;
