import styled from 'styled-components';
import authService from '../services/authService';
import SVG from './Icons/Logo';
import { Path } from '../common/constants/path.enum';

const NavbarContainer = styled.nav`
  width: 100%;
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
  padding: 1rem;
  padding-bottom: 0.5rem;
  font-weight: bold;
  letter-spacing: 1px;
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
      <Logo href={Path.HOME}><SVG/></Logo>
      <NavItems>
        {isAuthenticated ? (
          <>
            <NavItem href={Path.HISTORY}>History</NavItem>
            <NavItem onClick={handleLogout}>Logout</NavItem>
          </>
        ) : (
          <>
            <NavItem href={Path.LOGIN}>Login</NavItem>
            <NavItem href={Path.REGISTER}>Register</NavItem>
          </>
        )}
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
