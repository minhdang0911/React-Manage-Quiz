import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    const { t } = useTranslation();

    const handleLogOut = async () => {
        let res = await logout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            //clear data redux
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
        console.log('log out', res);
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className="navbar-brand">
                    TMD Quiz
                </NavLink>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">
                            {t('homepage.header.Home')}
                        </NavLink>
                        <NavLink to="/users" className="nav-link">
                            {t('homepage.header.Quiz')}
                        </NavLink>
                        <NavLink to="/admins" className="nav-link">
                            {t('homepage.header.admin')}
                        </NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button className="btn-login" onClick={() => handleLogin()}>
                                    {t('homepage.header.login')}
                                </button>
                                <button
                                    className="btn-signup"
                                    onClick={() => {
                                        navigate('/register');
                                    }}
                                >
                                    {t('homepage.header.Logout')}
                                </button>
                            </>
                        ) : (
                            <NavDropdown title={t('homepage.header.user')} id="basic-nav-dropdown">
                                <NavDropdown.Item> {t('homepage.header.profile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>
                                    {' '}
                                    {t('homepage.header.Logout')}
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}

                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
