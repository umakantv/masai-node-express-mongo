import React, { useContext } from "react";
import AuthContext from "../../contexts/auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
      <AppBar position="static">
        <Toolbar disableGutters>
            <div>PT WEB 06</div>
            <div style={{background: 'red'}}>
              {user ? (
                <div>
                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user.name}
                        src="/static/images/avatar/2.jpg"
                      />
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
                      <MenuItem onClick={() => {
                        logout()
                      }}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </div>
              ) : (
                <Button style={{zIndex: 100}} variant="outlined" color="primary" onClick={() => setShowLoginForm(true)}>Login</Button>
              )}
            </div>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
}
