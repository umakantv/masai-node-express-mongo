import React, { useContext } from "react";
import AuthContext from "../../contexts/auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import config from "../../config";
import Logo from '../../images/2006483.png';

export default function Layout({ children }) {
  const { user, setShowLoginForm, logout } = useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar
        position="static"
        color="default"
        style={{ background: 'white' }}
      >
        <Container>
          <Toolbar
            disableGutters
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Link to="/">
              <Stack direction="row" spacing={2}>
                <div>
                  <img src={Logo} alt="logo" width={40} />
                </div>
                <div>
                  <Typography variant="h4">
                    {config.APP_NAME}
                  </Typography>
                </div>
              </Stack>
            </Link>
            <Stack direction="row" spacing={2}>
              {user ? (
                <>
                  <Link to={`/create`}><Button variant="outlined">Create Post</Button></Link>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name} src={user.image} />
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem>
                      <Typography>{user.name}</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        setAnchorElUser(null);
                      }}
                    >
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  style={{ zIndex: 100 }}
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowLoginForm(true)}
                >
                  Login
                </Button>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <main style={{ marginTop: 20 }}>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
