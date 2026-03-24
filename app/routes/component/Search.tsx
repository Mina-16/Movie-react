import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
const Search = () => {
  const [searchParams] = useSearchParams();
  const searchTerms = searchParams.get("q") || "";
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const allMoviesUrl =
        "https://api.themoviedb.org/3/discover/movie?api_key=199ecccfdd7253bea72433a5548f89d5";

      try {
        const response = await fetch(allMoviesUrl);
        const data = await response.json();

        const filterResults = data.results.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerms.toLowerCase()),
        );

        setSearchResult(filterResults);
      } catch (error) {
        console.log("error", error);
        setSearchResult([]);
      }
    };

    fetchSearchResults();
  }, [searchTerms]);

  return (
    <>
      <Typography>Search results for: {searchTerms}</Typography>

      <Grid container spacing={3}>
        {searchResult.map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{margin: "50px"}}>
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="decoration-none"
            >
              <Card
                sx={{
                  backgroundColor: "black",
                  p: 1,
                  borderRadius: 2,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sx={{
                    borderRadius: 2,
                    maxHeight: 400,
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "white", textAlign: "center" }}
                  >
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Search;
