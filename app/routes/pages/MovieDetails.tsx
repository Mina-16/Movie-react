import { Box, Container, Typography, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "~/routes/component/ui/button";
import { useParams } from "react-router";
import CardInfo from "../component/Swiper/CardInfo";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<any>(null);

  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=199ecccfdd7253bea72433a5548f89d5`;

  useEffect(() => {
    fetch(detailsUrl)
      .then((res) => res.json())
      .then((json) => setMovie(json));
  }, [id]);

  if (!movie) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        // backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
        }}
      />

      <CardInfo>
        <Container sx={{ position: "relative", color: "white" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            {movie.title}
          </Typography>

          <Typography sx={{ mb: 2, opacity: 0.9 }}>{movie.overview}</Typography>

          <Typography sx={{ mb: 1 }}>
            Release Date: {movie.release_date}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Genres: {movie.genres?.map((g: any) => g.name).join(", ")}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
            <Typography>({movie.vote_count})</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              className="rounded-full bg-red-500 border-none outline-none hover:scale-105
    hover:shadow-lg
    hover:shadow-red-400/50"
            >
              Watch
            </Button>
            <Button className="rounded-full border-1 border-red-500 outline-none hover:scale-105
    hover:shadow-lg
    hover:shadow-red-400/50">Add List</Button>
          </Box>
        </Container>
      </CardInfo>
    </Box>
  );
};

export default MovieDetails;
