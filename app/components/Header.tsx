import Link from 'next/link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as LinkText,
  Switch,
} from '@material-ui/core';

import { useAuth } from 'lib/useAuth';
import { themeLight } from 'lib/theme';

export default function Header({ theme, toggle }) {
  const classes = useStyles();
  const { user } = useAuth();

  const links = [
    !user && { label: 'Sign Up', href: '/auth/signup' },
    !user && { label: 'Sign In', href: '/auth/signin' },
    user && { label: 'Create', href: '/streams/new' },
    user && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <Link href={href} key={href}>
          <Button color="inherit">{label} </Button>
        </Link>
      );
    });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <LinkText href="" color="inherit">
                Streamify
              </LinkText>
            </Link>
          </Typography>
          <Switch checked={theme} onChange={toggle} />

          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: themeLight.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));
