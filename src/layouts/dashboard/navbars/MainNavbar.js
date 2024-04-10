// import node module libraries
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import media files
import OJ from 'assets/pngs/avi.png';
import Logo from 'assets/pngs/logo.png';

// import data files
import { useScreenSize } from 'hooks/useScreenSize';
import NavbarDefaultRoutes from 'layouts/dashboard/navbars/MainNavRoutes';
import NavDropdownMain from 'layouts/dashboard/navbars/NavDropdownMain';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { ReactComponent as MessageSvg } from 'assets/svg/Frame 6853.svg';
import { ReactComponent as BellSvg } from 'assets/svg/small tertiary button.svg';
import { ReactComponent as MenuSvg } from 'assets/svg/menu.svg';
import { CustomText } from 'components/CustomText';
import { highlightWords } from 'helper/formatText';
import { useDispatch } from 'react-redux';

const MainNavbar = ({ transparent }) => {
  const history = useHistory();
  const route = useRouteMatch();
  const dispatch = useDispatch();
  const user = { firstName: 'Olamide', lastName: 'Jamal' };
  const { isLaptop, isTablet, isMobile } = useScreenSize();
  const [expandedMenu, setExpandedMenu] = useState(false);

  const scrollTo = (target) => {
    var targetElement = document.getElementById(target);
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const notifications = useMemo(() => {
    return [];
  }, [user]);

  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => {
          setExpandedMenu(collapsed);
          console.log(collapsed);
        }}
        expanded={expandedMenu}
        expand="lg"
        className={`navbar navbar-default shadow-none ${
          transparent ? 'navbar-transparent' : ''
        }`}
      >
        <Container
          className="rowcentered shadow w-100 bg-white"
          style={{
            paddingLeft: 12,
            paddingRight: 12,
            paddingBottom: 10,
            paddingTop: 10,
            borderRadius: 45,
          }}
        >
          <Navbar.Brand
            as={Link}
            to="/dashboard"
            style={{ minWidth: 120, paddingLeft: 12, paddingTop: 3 }}
          >
            <Image src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
            <MenuSvg />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className={`ms-auto gap-lg-4 gap-md-0 ${
                isLaptop
                  ? 'align-items-center justify-content-between'
                  : 'align-items-center '
              }`}
            >
              {NavbarDefaultRoutes.map((item, index) => {
                if (item.children === undefined) {
                  return (
                    <Nav.Link
                      key={index}
                      as={Link}
                      to={item.link}
                      className={`d-flex rounded-pill align-items-center justify-content-lg-center justify-content-start mt-lg-0 mt-md-2 ${
                        isTablet || isMobile ? 'w-100' : ''
                      } 
                        ${
                          route.path.includes(item.link)
                            ? 'text-white bg-black'
                            : 'text-gray-500 bg-transparent'
                        }`}
                      style={{
                        fontWeight: 600,
                        paddingLeft: 14,
                        paddingRight: 18,
                        paddingTop: 0,
                        paddingBottom: 0,
                        height: 40,
                      }}
                      onClick={() => {
                        item?.scrollTarget && scrollTo(item?.scrollTarget);
                      }}
                    >
                      <span className="me-4 me-lg-0">{item.icon}</span>
                      <span
                        className="ps-1"
                        style={{
                          paddingTop: 2,
                        }}
                      >
                        {item.menuitem}
                      </span>
                    </Nav.Link>
                  );
                } else {
                  return (
                    <NavDropdownMain
                      item={item}
                      key={index}
                      onClick={(value) => setExpandedMenu(value)}
                    />
                  );
                }
              })}
            </Nav>
            <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
              <div className={`mt-2 mt-lg-0 ms-auto d-flex align-items-center`}>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    bsPrefix="dt"
                    className="border-bottom-0"
                    id="dropdownNotification"
                  >
                    <BellSvg />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="dashboard-dropdown dropdown-menu-end mt-4 py-3 px-2"
                    aria-labelledby="dropdownUser"
                    align="end"
                    style={{ width: '100px' }}
                  ></Dropdown.Menu>
                </Dropdown>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    bsPrefix="dt"
                    className="border-bottom-0"
                    id="dropdownNotification"
                  >
                    <MessageSvg />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="dashboard-dropdown dropdown-menu-end mt-4 py-3 px-2"
                    aria-labelledby="dropdownUser"
                    align="end"
                    style={{ width: '100px' }}
                  ></Dropdown.Menu>
                </Dropdown>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    as={Nav.Link}
                    bsPrefix="dt"
                    className="border-bottom-0 d-flex align-items-center"
                    id="dropdownUser"
                    style={{
                      backgroundColor: '#EFF1F6',
                      borderRadius: '20px',
                      minWidth: '80px',
                      height: '40px',
                    }}
                  >
                    <Image
                      alt="avatar"
                      src={OJ}
                      className="rounded-circle px-2 ps-lg-0"
                    />
                    <MenuSvg />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
                    aria-labelledby="dropdownUser"
                    align="end"
                  >
                    <Dropdown.Item className="mt-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-md avatar-indicators avatar-online">
                          <Image
                            alt="avatar"
                            src={OJ}
                            className="rounded-circle"
                          />
                        </div>

                        <div className="ms-3 lh-1">
                          <h5 className="mb-1">
                            {user?.firstName + ' ' + user?.lastName}
                          </h5>
                          <p className="mb-0 text-muted">{user?.email}</p>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="mb-3" onClick={() => {}}>
                      <i className="fe fe-power me-2"></i> Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

// Specifies the default values for props
MainNavbar.defaultProps = {
  transparent: false,
};

// Typechecking With PropTypes
MainNavbar.propTypes = {
  transparent: PropTypes.bool,
};

export default MainNavbar;
