//React Imports
import { FC, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

//MUI Imports
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { AccountCircle, Logout, Login } from '@mui/icons-material';
import { Typography } from '@mui/joy';
import { ButtonBase } from '@mui/material';

//Auth0 Imports
import { useAuth0 } from '@auth0/auth0-react';

//Native Imports
//Styles
import styles from './NavBar.module.scss';

type Options = {
  initialActiveIndex: null | number;
  vertical: boolean;
  handlers?: {
    onKeyDown: (
      event: React.KeyboardEvent<HTMLAnchorElement>,
      fns: { setActiveIndex: React.Dispatch<React.SetStateAction<number | null>> },
    ) => void;
  };
};

const useRovingIndex = (options?: Options) => {
  const {
    initialActiveIndex = 0,
    vertical = false,
    handlers = {
      onKeyDown: () => { },
    },
  } = options || {};
  const [activeIndex, setActiveIndex] = useState<number | null>(
    initialActiveIndex!,
  );
  const targetRefs = useRef<Array<HTMLAnchorElement>>([]);
  const targets = targetRefs.current;
  const focusNext = () => {
    let newIndex = activeIndex! + 1;
    if (newIndex >= targets.length) {
      newIndex = 0;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const focusPrevious = () => {
    let newIndex = activeIndex! - 1;
    if (newIndex < 0) {
      newIndex = targets.length - 1;
    }
    targets[newIndex]?.focus();
    setActiveIndex(newIndex);
  };
  const getTargetProps = (index: number) => ({
    ref: (ref: HTMLAnchorElement) => {
      if (ref) {
        targets[index] = ref;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (Number.isInteger(activeIndex)) {
        if (e.key === (vertical ? 'ArrowDown' : 'ArrowRight')) {
          focusNext();
        }
        if (e.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) {
          focusPrevious();
        }
        handlers.onKeyDown?.(e, { setActiveIndex });
      }
    },
    onClick: () => {
      setActiveIndex(index);
    },
  });
  return {
    getTargetProps,
  };
};

type NavBarProps = {
  //
}

export const NavBar: FC<NavBarProps> = () => {
  const { getTargetProps } =
    useRovingIndex();

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      <Box className={styles.container}>
        <List
          role="menubar"
          orientation="horizontal"
          sx={{
            '--List-radius': '8px',
            '--List-padding': '4px',
            '--List-gap': '8px',
            justifyContent: 'space-between'
          }}
        >
          <div className={styles.navBarWrapper}>
            <ListItem role="none">
              <ButtonBase component={Link} to="/dashboard">
                <ListItemButton
                  role="menuitem"
                  {...getTargetProps(0)}
                  variant='solid'
                  color='success'
                  sx={{ minHeight: '42px', marginLeft: '0px' }}
                >
                  <ListItemDecorator>
                    <HomeRounded />
                  </ListItemDecorator>
                  Home
                </ListItemButton>
              </ButtonBase>
            </ListItem>
            <ListItem role="none">
              <ButtonBase component={Link} to="/account">
                <ListItemButton
                  role="menuitem"
                  {...getTargetProps(0)}
                  variant='solid'
                  color='success'
                  sx={{ minHeight: '42px' }}
                >
                  <ListItemDecorator>
                    <AccountCircle />
                  </ListItemDecorator>
                  Account
                </ListItemButton>
              </ButtonBase>
            </ListItem>
          </div>
          <Typography level="h1" sx={{ textAlign: 'center', color: '#FFFFFF' }}>Virtual Pet Adoption Center</Typography>
          {!isAuthenticated ? (
            <ListItem role="none">
              <ButtonBase>
                <ListItemButton
                  role="menuitem"
                  {...getTargetProps(0)}
                  variant='solid'
                  color='success'
                  sx={{ minHeight: '42px', marginRight: '12px' }}
                  onClick={() => loginWithRedirect()}
                >
                  <ListItemDecorator>
                    <Login />
                  </ListItemDecorator>
                  Login
                </ListItemButton>
              </ButtonBase>
            </ListItem>
          ) : (
            <ListItem role="none">
              <ButtonBase>
                <ListItemButton
                  role="menuitem"
                  {...getTargetProps(0)}
                  variant='solid'
                  color='success'
                  sx={{ minHeight: '42px', marginRight: '16px' }}
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  <ListItemDecorator>
                    <Logout />
                  </ListItemDecorator>
                  Logout
                </ListItemButton>
              </ButtonBase>
            </ListItem>
          )}
        </List>
      </Box>
    </>
  );
}