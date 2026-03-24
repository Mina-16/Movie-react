import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

function ClientOnly({ children }: { children: () => React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <CircularProgress />;
  return <>{children()}</>;
}
interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

const Upcoming = ({ map }: { map: Movie[] }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 5 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Box sx={{ p: 8 }}>
      <ClientOnly>
        {() => (
          <Suspense fallback={<CircularProgress />}>
            <Carousel autoPlay infinite responsive={responsive}>
              {map.map((movie) => (
                <Box key={movie.id} sx={{ backgroundColor: "black", mt: 2 }}>
                  <Link to={`/movie/${movie.id}`}>
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
                </Box>
              ))}
            </Carousel>
          </Suspense>
        )}
      </ClientOnly>
    </Box>
  );
};

export default Upcoming;
