import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("all", "routes/pages/AllMovies.tsx"),
  route("search", "routes/component/Search.tsx"),
  route("feature", "routes/pages/feature.tsx"),
  route("movie/:id", "routes/pages/MovieDetails.tsx"),
] satisfies RouteConfig;
