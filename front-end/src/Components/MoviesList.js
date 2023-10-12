import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import avater from "../assets/images/avatar.webp";
import jawan from "../assets/images/jawan.jpg";
import joker from "../assets/images/joker.jpg";
import pathan from "../assets/images/pathan.jpg";
import Rating from "@mui/material/Rating";
import AddMovies from "./AddMovies";
import axios from "axios";
import EditMovies from "./EditMovies";
import TextField from "@mui/material/TextField";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { TableFooter } from "@mui/material";
import { BASE_URL } from "../constants";


const MoviesList = () => {
  const [add, setAdd] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [editMovies, setEditMovies] = useState(false);
  const [pageOffSet, setPageOffSet] = useState(0);
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(3);
  const [searchMovies, setSearchMovies] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [rowId, setRowId] = useState("");
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Movies Name",
    },
    {
      id: "calories",
      numeric: true,
      disablePadding: false,
      label: "duration",
    },

    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: "rating",
    },
  ];

  async function getMovies() {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/movies?page=${pageOffSet}&perPage=${limit}&name=${searchMovies}`
      );
      setMoviesList(response.data.movies);
      setTotalCount(response.data.total);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const handleChangePage = (event, newPage) => {
    const add = newPage > pageOffSet;
    setPageOffSet(newPage);
  };
  const onRowsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    getMovies();
  }, [pageOffSet, limit, searchMovies]);

  return (
    <div>
      <div style={{ padding: "20px 100px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "10px",
            position: "relative",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <TextField
              label=" Search Movie"
              variant="outlined"
              onChange={(e) => setSearchMovies(e.target.value)}
            />
          </div>
          <div>
            <Button variant="contained" onClick={() => setAdd(!add)}>
              {" "}
              Add
            </Button>
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: "10px",
                zIndex: "99999",
              }}
            >
              {add && <AddMovies getMovies={getMovies} setAdd={setAdd} />}
            </div>
          </div>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                    //   key={headCell.id}
                    //   align={headCell.numeric ? "right" : "left"}
                    //   padding={headCell.disablePadding ? "none" : "normal"}
                    //   sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                      // active={orderBy === headCell.id}
                      // direction={orderBy === headCell.id ? order : "asc"}
                      // onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {/* {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null} */}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {moviesList.map((row) => (
                  <TableRow
                    onClick={() => {
                      setEditMovies(!editMovies);
                      setRowId(row.id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.movieName}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.duration}h
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {row.rating}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    page={pageOffSet}
                    count={totalCount}
                    labelRowsPerPage={"Row per page"}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[1, 2, 3, 5, 25, 50, 100]}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={onRowsPerPageChange}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
        <EditMovies
          open={editMovies}
          handleClose={() => setEditMovies(false)}
          rowId={rowId}
          setEditMovies={setEditMovies}
          getMovies={getMovies}
        />
      </div>
    </div>
  );
};

export default MoviesList;
