// import node module libraries
import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import media files
import Logo from 'assets/pngs/logo.png';

// import data files
import { useScreenSize } from 'hooks/useScreenSize';
import NavbarDefaultRoutes from 'layouts/dashboard/navbars/MainNavRoutes';
import NavDropdownMain from 'layouts/dashboard/navbars/NavDropdownMain';
import { useHistory } from 'react-router-dom';

import { ReactComponent as MessageSvg } from 'assets/svg/Frame 6853.svg';
import { ReactComponent as MenuSvg } from 'assets/svg/menu.svg';
import { ReactComponent as BellSvg } from 'assets/svg/small tertiary button.svg';
import { CustomText } from 'components/CustomText';
import { getInitials } from 'helpers/formatText';
import { useDispatch } from 'react-redux';
import { customFetchQuery } from 'redux/features/customFetchQuery';
import { useCustomSelector } from 'redux/features/customSelector';
import { useGetUserMutation } from 'redux/features/user/userApi';
import { saveToStore } from 'redux/features/user/userSlice';

const MainNavbar = ({ transparent }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useCustomSelector();
  const [getUser, { isLoading }] = useGetUserMutation();

  const handleProfileFetch = async () => {
    await customFetchQuery({
      api: getUser,
      dispatch,
      handleSuccess: (data) => {
        dispatch(saveToStore(['user', data]));
      },
    });
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);
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
        data-testId="navbar"
        onToggle={(collapsed) => {
          setExpandedMenu(collapsed);
        }}
        expanded={expandedMenu}
        expand="lg"
        className={`navbar navbar-default shadow-none ${
          transparent ? 'navbar-transparent' : ''
        }`}
      >
        <Container
          data-testId={transparent ? 'navbar-transparent' : ''}
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
                          history?.location?.pathname?.includes(item.link)
                            ? 'text-white bg-black'
                            : 'text-gray-500 bg-transparent'
                        }`}
                      style={{
                        fontFamily: 'Degular',
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
                <BellSvg className="me-1" />

                <MessageSvg className="me-1" />

                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle
                    data-testId="dropdownUser"
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
                    <CustomText
                      text={getInitials(user)}
                      cNColor={'text-white'}
                      divClassName="bg-dark bg-gradient rounded-circle centered ms-1"
                      divStyle={{ width: 32, height: 32 }}
                      fontWeight={600}
                      fontSize={14}
                    />
                    <MenuSvg
                      className="ms-1"
                      onClick={() =>
                        isMobile || isTablet
                          ? setExpandedMenu((prev) => !prev)
                          : null
                      }
                    />
                  </Dropdown.Toggle>
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
