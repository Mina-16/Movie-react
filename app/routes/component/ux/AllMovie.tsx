import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  type ReactNode,
} from "react";
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
const Carousel = lazy(() => import("react-multi-carousel"));
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router";

const AllMovie = ({
  responsive,
  map,
}: {
  responsive?: ReactNode;
  map?: ReactNode;
}) => {
  return (
    <>
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
        <Carousel autoPlay={true} responsive={responsive} infinite>
          {map.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="decoration-none"
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="300px"
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
        </Carousel>
      </Suspense>
      <div className="flex justify-end mt-4">
        <Link to={"/all"}>
          <Button variant="contained">See All</Button>
        </Link>
      </div>
    </>
  );
};

export default AllMovie;
