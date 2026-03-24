import React, { useEffect, useState, Suspense, lazy, type ReactNode } from "react";
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
const Feature = ({map}: {map: ReactNode}) => {
  return (
    <div>
              <Typography variant="h4" gutterBottom className="mt-12">
                feature movie
              </Typography>
              <div className="flex gap-4 flex-wrap">
                {map.map((movie) => (
                  <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="decoration-none"
                  >
                    <Card className="w-69">
                      <CardMedia
                        component="img"
                        height="150px"
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
                ))}
              </div>

                    <div className="flex justify-end mt-4">
                      <Link to={"/feature"}>
                      <Button variant="contained">See All</Button>
                      </Link>
                    </div>
      
    </div>
  )
}

export default Feature
