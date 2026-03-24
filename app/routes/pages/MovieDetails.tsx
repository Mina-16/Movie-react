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
        minHeight: "60vh", // ✅ موبايل
        height: "70vh",    // ✅ تابلت
        "@media (min-width:1024px)": {
          height: "100vh", // ✅ ديسكتوب
        },
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // ✅ مهم جدًا للريسبونسيف
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.3))",
        }}
      />

      {/* Content */}
      <CardInfo>
        <Container
          sx={{
            position: "relative",
            color: "white",
            px: { xs: 2, sm: 3, md: 0 }, // ✅ padding ريسبونسيف
            maxWidth: "600px",
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: {
                xs: "1.8rem",
                sm: "2.5rem",
                md: "3rem",
              },
            }}
          >
            {movie.title}
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              mb: 2,
              opacity: 0.9,
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
              },
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.overview}
          </Typography>

          {/* Info */}
          <Typography sx={{ mb: 1, fontSize: { xs: "0.8rem", sm: "1rem" } }}>
            Release Date: {movie.release_date}
          </Typography>

          <Typography sx={{ mb: 2, fontSize: { xs: "0.8rem", sm: "1rem" } }}>
            Genres: {movie.genres?.map((g: any) => g.name).join(", ")}
          </Typography>

          {/* Rating */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
            <Typography>({movie.vote_count})</Typography>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap", // ✅ مهم للموبايل
            }}
          >
            <Button
              className="rounded-full bg-red-500 border-none outline-none 
              text-sm sm:text-base px-4 py-2
              hover:scale-105 hover:shadow-lg hover:shadow-red-400/50"
            >
              Watch
            </Button>

            <Button
              className="rounded-full border border-red-500 
              text-sm sm:text-base px-4 py-2
              hover:scale-105 hover:shadow-lg hover:shadow-red-400/50"
            >
              Add List
            </Button>
          </Box>
        </Container>
      </CardInfo>
    </Box>
  );
};

export default MovieDetails;