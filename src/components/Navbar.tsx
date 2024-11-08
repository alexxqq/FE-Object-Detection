import styled from 'styled-components';
import authService from '../services/authService';

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 1.2rem 2rem; // Adjust padding for better spacing
  background-color: #1f1f1f; // Darker background for elegance
  color: #fff; // Text color
  display: flex; // Flexbox for layout
  justify-content: space-between; // Space out items
  align-items: center; // Center items vertically
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); // Shadow for depth
  /* position: sticky;  */
  top: 0;
  left: 0;
  z-index: 1000; // Ensure navbar is on top
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #61dafb; // Highlight color for logo
`;

const NavItems = styled.div`
  display: flex;
  gap: 1.5rem; // Space between nav items
`;

const NavItem = styled.a`
  color: #fff; // Link color
  text-decoration: none; // Remove underline
  font-size: 1.1rem;
  padding: 0.5rem 1rem; // Add padding for a button-like feel
  border-radius: 4px; // Rounded corners for buttons
  transition: all 0.3s ease-in-out; // Smooth transitions for hover effects
  cursor: pointer;

  &:hover {
    background-color: #61dafb; // Hover effect background
    color: #1f1f1f; // Change text color on hover
    text-decoration: none;
  }
`;

const Navbar = () => {
  const isAuthenticated = authService.isAuthenticated(); 
  const handleLogout = () => {
    authService.logout(); // Call the logout method from authService
    window.location.reload(); // Reload the page to update the Navbar
  };
  return (
    <NavbarContainer>
      <Logo>MyApp</Logo>
      <NavItems>
        <NavItem href="/">Home</NavItem>
        {isAuthenticated ? (
          <>
            <NavItem href="/history">History</NavItem>
            <NavItem as="button" onClick={handleLogout}>Logout</NavItem>
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
