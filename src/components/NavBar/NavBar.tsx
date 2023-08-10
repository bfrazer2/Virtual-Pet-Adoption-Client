import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { AccountCircle, Logout } from '@mui/icons-material';

import styles from './NavBar.module.scss';
import { Typography } from '@mui/joy';

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
      onKeyDown: () => {},
    },
  } = options || {};
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    initialActiveIndex!,
  );
  const targetRefs = React.useRef<Array<HTMLAnchorElement>>([]);
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

export default function NavBar() {
  const { getTargetProps } =
    useRovingIndex();
  return (
    <Box sx={{ minHeight: 50, backgroundColor: '#e0f2e9' }}>
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
              <ListItemButton
                role="menuitem"
                {...getTargetProps(0)}
                component="a"
                href="#navigation-menu"
                variant='solid'
                color='success'
              >
                <ListItemDecorator>
                  <HomeRounded />
                </ListItemDecorator>
                Home
              </ListItemButton>
            </ListItem>
            <ListItem role="none">
              <ListItemButton
                role="menuitem"
                {...getTargetProps(0)}
                component="a"
                href="#navigation-menu"
                variant='solid'
                color='success'
              >
                <ListItemDecorator>
                  <AccountCircle />
                </ListItemDecorator>
                Account
              </ListItemButton>
            </ListItem>
          </div>
          <Typography color="success" level="h1" sx={{ textAlign: 'center' }}>Virtual Pet Adoption Center</Typography>
          <ListItem role="none">
            <ListItemButton
              role="menuitem"
              {...getTargetProps(0)}
              component="a"
              href="#navigation-menu"
              variant='solid'
              color='success'
            >
              <ListItemDecorator>
                <Logout />
              </ListItemDecorator>
              Logout
            </ListItemButton>
          </ListItem>
        </List>
    </Box>
  );
}