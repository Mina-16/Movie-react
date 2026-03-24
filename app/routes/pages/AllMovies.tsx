import React, { useEffect, useState, Suspense, lazy } from "react";
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

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
}

// Lazy load the carousel component to avoid SSR issues
const Carousel = lazy(() => import("react-multi-carousel"));
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router";

// Custom ClientOnly component to handle SSR
function ClientOnly({
  children,
  fallback = null,
}: {
  children: () => React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children()}</> : <>{fallback}</>;
}

const AllMovies = () => {
  const allMoviesUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=199ecccfdd7253bea72433a5548f89d5";

  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMovie = () => {
    fetch(allMoviesUrl)
      .then((res) => res.json())
      .then((json) => {
        setAllMovies(json.results);
        setLoading(false);
      })

      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies");
        setAllMovies([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(allMovies);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        style={{ marginTop: "2rem", textAlign: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth="lg"
        style={{ marginTop: "2rem", textAlign: "center" }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  // Ensure movieList is always an array
  const movies = Array.isArray(allMovies) ? allMovies : [];

  if (movies.length === 0) {
    return (
      <Container
        maxWidth="lg"
        style={{ marginTop: "2rem", textAlign: "center" }}
      >
        <Typography variant="h6">No movies found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        All Movie
      </Typography>
      <Suspense
        fallback={
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        }
      >
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="decoration-none"
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {movie.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Suspense>
    </Container>
  );
};

// Wrapper component that only renders on client
const MovieList = () => {
  return (
    <ClientOnly
      fallback={
        <Container
          maxWidth="lg"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      }
    >
      {() => <AllMovies />}
    </ClientOnly>
  );
};
export default MovieList;
