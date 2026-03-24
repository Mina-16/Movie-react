import type { Route } from "./+types/home";
import MovieList from "./pages/MovieList";
import ViweSwiper from "./component/Swiper/ViweSwiper";
import { useEffect, useState } from "react";
import Upcoming from "./component/ux/Upcoming";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const allMoviesUrl =
    "https://api.themoviedb.org/3/discover/movie?api_key=199ecccfdd7253bea72433a5548f89d5";
  const featureMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=199ecccfdd7253bea72433a5548f89d5";
  const upcomingUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=199ecccfdd7253bea72433a5548f89d5";
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [featureMovies, setFeatureMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMovie = async () => {
    try {
      const [all, feature, upcoming] = await Promise.all([
        fetch(allMoviesUrl).then((r) => r.json()),
        fetch(featureMoviesUrl).then((r) => r.json()),
        fetch(upcomingUrl).then((r) => r.json()),
      ]);

      setMovieList(all.results);
      setFeatureMovies(feature.results);
      setUpcomingMovies(upcoming.results);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);

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

  const progressShelter = {
    // class of progress of first movie
    flex: true,
    itemEnd: true,
    justifyEnd: true,
    translateY: true,
    gap: "0",

  };

  const progressZotopia = {
    // class of progress of second movie
    flex: false,
    itemEnd: true,
    justifyEnd: false,
    translate: false,
    gap: "2",
  };

  const Shelter = [
    //first movie
    {
      img: "./ImageMovie/Shelter/Shelter-1.png",
      logo: "./ImageMovie/Shelter/ShelterLogo.png",
    },
    {
      img: "./ImageMovie/Shelter/Shelter-2.png",
      logo: "./ImageMovie/Shelter/ShelterLogo.png",
    },
    {
      img: "./ImageMovie/Shelter/Shelter-3.png",
      logo: "./ImageMovie/Shelter/ShelterLogo.png",
    },
    {
      img: "./ImageMovie/Shelter/Shelter-4.png",
      logo: "./ImageMovie/Shelter/ShelterLogo.png",
    },
  ];

  const zotopia = [
    //second movie
    {
      img: "./ImageMovie/Zotopia/Zotopia-1.png",
      logo: "./ImageMovie/Zotopia/ZotopiaLogo.png",
    },
    {
      img: "./ImageMovie/Zotopia/Zotopia-2.png",
      logo: "./ImageMovie/Zotopia/ZotopiaLogo.png",
    },
    {
      img: "./ImageMovie/Zotopia/Zotopia-3.png",
      logo: "./ImageMovie/Zotopia/ZotopiaLogo.png",
    },
    {
      img: "./ImageMovie/Zotopia/Zotopia-4.png",
      logo: "./ImageMovie/Zotopia/ZotopiaLogo.png",
    },
  ];

  return (
    <div className=" bg-black">
      {/* <MovieList /> */}
      <ViweSwiper
        mapName={Shelter}
        mapLink={featureMovies}
        cProgress={progressShelter}
        start={1}
        end={2}
      />
      <Upcoming map={movieList} />

      <ViweSwiper
        mapName={zotopia}
        mapLink={featureMovies}
        cProgress={progressZotopia}
        start={3}
        end={4}
      />

      <Upcoming map={upcomingMovies} />
      <Upcoming map={featureMovies} />


    </div>
  );
}
