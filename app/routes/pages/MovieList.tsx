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
import AllMovie from "../component/ux/AllMovie";
import Feature from "../component/ux/Feature";
import Upcoming from "../component/ux/Upcoming";

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

const MovieListContent = () => {
  const allMoviesUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=199ecccfdd7253bea72433a5548f89d5";
  const featureMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=199ecccfdd7253bea72433a5548f89d5";
  const upcomingMoviesUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=199ecccfdd7253bea72433a5548f89d5";
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [featureMovies, setFeatureMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMovie = () => {
    fetch(allMoviesUrl)
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results);
        setLoading(false);
      });

    fetch(featureMoviesUrl)
      .then((res) => res.json())
      .then((json) => {
        setFeatureMovies(json.results.slice(0, 4) || []);
        setLoading(false);
      });

    fetch(upcomingMoviesUrl)
      .then((res) => res.json())
      .then((json) => {
        setUpcomingMovies(json.results);
        setLoading(false);

      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies");
        setMovieList([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };
  const upcomingResponsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

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
  const movies = Array.isArray(movieList) ? movieList : [];

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
      <AllMovie responsive={responsive} map={movies} />
      <Feature map={featureMovies} />
      {/* <Upcoming responsive={upcomingResponsive} map={upcomingMovies} /> */}
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
      {() => <MovieListContent />}
    </ClientOnly>
  );
};
export default MovieList;
