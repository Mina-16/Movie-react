import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearchSubmit = (event) => {
    if (event.key == "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?q=${searchTerm}`);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        sx={{
          zIndex: 1000,
          background: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Movies
            </Typography>
          </div>
          <div>
            <ul className="flex gap-4 p-0 m-0">
              <li>
                <Link
                  to={"/"}
                  className="text-white decoration-none hover:text-red-500 hover:shadow-lg hover:shadow-red-400/50"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/feature"}
                  className="text-white decoration-none hover:text-red-500 hover:shadow-lg hover:shadow-red-400/50"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="text-white decoration-none mr-1.5 hover:text-red-500 hover:shadow-lg hover:shadow-red-400/50"
                >
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Search sx={{ borderRadius: "20px", maxWidth: "400px" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={(event) => setsearchTerm(event.target.value)}
                onKeyDown={handleSearchSubmit}
              />
            </Search>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
