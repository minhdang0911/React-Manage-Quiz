import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    Web trắc nghiệm
                </NavLink>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            Trang chủ
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            Người dùng
                        </NavLink>
                        <NavLink to="/admins" className="nav-link">
                            Quan tri
                        </NavLink>
                    </Nav>
                    <Nav>
                        <button className="btn-login" onClick={() => handleLogin()}>
                            Đăng nhập
                        </button>
                        <button className="btn-signup">Đăng ký</button>
                        {/* <NavDropdown title="Người dùng" id="basic-nav-dropdown">
                            <NavDropdown.Item>Đăng nhập </NavDropdown.Item>
                            <NavDropdown.Item>Đăng xuất</NavDropdown.Item>
                            <NavDropdown.Item>Thông tin người dùng</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
