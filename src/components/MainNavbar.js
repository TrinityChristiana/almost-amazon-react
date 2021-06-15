import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  //
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/data/auth';

const MainNavbar = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand href='/'>reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/admin'>
                Admin
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/authed'>
                Authed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/unauthed'>
                Unauthed
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>{!userInfo ? <Button onClick={signInUser}>Login</Button> : <Button onClick={signOutUser}>Log Out {userInfo.fullName}</Button>}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

MainNavbar.propTypes = {
  userInfo: PropTypes.oneOfType([
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      isAdmin: PropTypes.bool.isRequired,
    }),
    PropTypes.bool,
  ]),
};
export default MainNavbar;
