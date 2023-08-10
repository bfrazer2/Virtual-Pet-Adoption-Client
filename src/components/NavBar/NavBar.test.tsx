import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { NavBar } from './NavBar';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}));

describe('NavBar', () => {
  
  test('renders the Virtual Pet Adoption Center title', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    });
    render(
      <Router>
        <NavBar />
      </Router>
    );
    expect(await screen.findByText('Virtual Pet Adoption Center')).toBeInTheDocument();
  });

  test('renders Home, Account, and Login buttons when not authenticated', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    });
    render(
      <Router>
        <NavBar />
      </Router>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  test('renders Home, Account, and Logout buttons when authenticated', async () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    });
    render(
      <Router>
        <NavBar />
      </Router>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  test('calls loginWithRedirect when Login button is clicked', async () => {
    const loginWithRedirect = jest.fn();
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect,
      logout: jest.fn(),
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );

    fireEvent.click(screen.getByText('Login'));
    expect(loginWithRedirect).toHaveBeenCalled();
  });

  test('calls logout when Logout button is clicked', async () => {
    const logout = jest.fn();
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
      logout,
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(logout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });
});
