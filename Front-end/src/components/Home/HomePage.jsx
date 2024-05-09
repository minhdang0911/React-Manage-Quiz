import videoHomepage from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const navigate = useNavigate();

    console.log('account', account, 'is', isAuthenticated);
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title-1">There's a better way to ask</div>
                <div className="title-2">
                    You don't want to makle a boring form. And your audience won't answer ond. Create a typeform
                    instead-and make everyone happy
                </div>
                <div className="title-3">
                    {isAuthenticated === false ? (
                        <button
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Get's started. It's free
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                navigate('/users');
                            }}
                        >
                            Doing Quiz Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
