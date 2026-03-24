import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "absolute",
  height: "100%",
  display: "flex",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
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
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?q=${searchTerm}`);
      setOpenMenu(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" sx={{ zIndex: 1000, background: "none" }}>
        <Toolbar className="flex justify-between">

          {/* Logo */}
          <Typography
            variant="h6"
            className="text-white hidden sm:block"
          >
            Movies
          </Typography>

          {/* Links - Desktop */}
          <div className="hidden md:block">
            <ul className="flex gap-4 p-0 m-0">
              <li>
                <Link to="/" className="text-white hover:text-red-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/feature" className="text-white hover:text-red-500">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white hover:text-red-500">
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:block">
            <Search sx={{ borderRadius: "20px", maxWidth: "400px" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                onKeyDown={handleSearchSubmit}
              />
            </Search>
          </div>

          {/* Menu Button - Mobile */}
          <div className="md:hidden">
            <button onClick={() => setOpenMenu(!openMenu)}>
              <MenuIcon className="text-white" />
            </button>
          </div>
        </Toolbar>

        {/* Mobile Menu (نفس التصميم) */}
        {openMenu && (
          <div className="md:hidden px-4 pb-4">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-red-500"
                  onClick={() => setOpenMenu(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/feature"
                  className="text-white hover:text-red-500"
                  onClick={() => setOpenMenu(false)}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-red-500"
                  onClick={() => setOpenMenu(false)}
                >
                  Upcoming
                </Link>
              </li>
            </ul>

            {/* نفس السيرش بالظبط */}
            <div className="mt-4">
              <Search sx={{ borderRadius: "20px", maxWidth: "400px" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={searchTerm}
                  onChange={(e) => setsearchTerm(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                />
              </Search>
            </div>
          </div>
        )}
      </AppBar>
    </Box>
  );
}