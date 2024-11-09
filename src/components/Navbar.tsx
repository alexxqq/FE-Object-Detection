import styled from 'styled-components';
import authService from '../services/authService';
import SVG from './Icons/Logo';

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 1.2rem 2rem;
  background-color: #1f1f1f;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-left: 2rem;
  color: #61dafb;
`;

const NavItems = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #61dafb;
    color: #1f1f1f;
    text-decoration: none;
  }
`;

const Navbar = () => {
  const isAuthenticated = authService.isAuthenticated(); 
  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };
  return (
    <NavbarContainer>
      <Logo href='/'><SVG/></Logo>
      <NavItems>
        {isAuthenticated ? (
          <>
            <NavItem href="/history">History</NavItem>
            <NavItem onClick={handleLogout}>Logout</NavItem>
          </>
        ) : (
          <>
            <NavItem href="/login">Login</NavItem>
            <NavItem href="/register">Register</NavItem>
          </>
        )}
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
