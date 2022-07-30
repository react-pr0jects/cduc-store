import { Container, IconButton, Menu, MenuItem } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Close, ShoppingCart } from '@material-ui/icons';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Login from '../../features/Auth/components/Login';
import Register from '../../features/Auth/components/Register';
import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    // height: 48,
    padding: '0 30px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: 50,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default function ButtonAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItemCount = useSelector(cartItemsCountSelector);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [open, setOpen] = React.useState(false);

  //Kiểm tra xem đã login hay chưa
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  const [anchorEl, setAnchorEl] = React.useState(null);

  // Open LoginForm + RegisterForm
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Hiện Menu Logout, Profile sau khi Click vào AvatarUser
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //When Logout Click
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };
  //When Logout Click
  const handleCartClick = () => {
    history.push('/cart');
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.root}>
        <Container>
          <Toolbar disableGutters>
            <ShoppingCartIcon
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            ></ShoppingCartIcon>
            <Typography variant='h6' className={classes.title}>
              <Link to='/' className={classes.link}>
                CDUC SHOP
              </Link>
            </Typography>

            {!isLoggedIn && (
              <Button className={classes.link} color='inherit' onClick={handleClickOpen}>
                Đăng Nhập
              </Button>
            )}

            {isLoggedIn && (
              <Box>
                <IconButton aria-label='show 4 new ' color='inherit' onClick={handleCartClick}>
                  <Badge badgeContent={cartItemCount} color='secondary'>
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton color='inherit' onClick={handleUserClick}>
                  <AccountCircleIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        //Popover Material UI (tùy chỉnh vị trí menu)
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>Hồ Sơ</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Tài Khoản Cá Nhân</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Đăng Xuất</MenuItem>
      </Menu>

      <Dialog
        disableEscapeKeyDown
        disableBackdropClick
        open={open}
        onClose={handleClose}
        aria-labelledby='draggable-dialog-title'
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign='center'>
                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                  Bạn Đã Có Tài Khoản Rồi? Nhấn Vào Đây Để Đăng Nhập
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign='center'>
                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                Bạn Chưa Có Tài Khoản? Nhấn Vào Đây Để Đăng Kí
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
