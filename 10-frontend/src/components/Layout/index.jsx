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
import Container from "@mui/material/Container";
import {Link} from "react-router-dom";

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
      <AppBar position="static" color="default">
        <Toolbar style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Box>
            <Link to='/'><Typography variant="h4">Blog App</Typography></Link>
          </Box>
          <Box>
            {user ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.name}
                    src={user.image}
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
                  <MenuItem>
                    <Typography>{user.name}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    logout()
                  }}>
                    <Typography>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button style={{zIndex: 100}} variant="outlined" color="primary" onClick={() => setShowLoginForm(true)}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <main style={{marginTop: 20}}>
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
}
