import { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import Language from '../Headers/Language';
const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const handleLogin = async () => {
        //validate

        //submit api

        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('email khong hop le');
            return;
        }

        if (!password) {
            toast.error('vui long nhap mat khau');
            return;
        }
        let res = await postRegister(email, password, username);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate('/login');
        }

        if (res && +res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    return (
        <div className="login-container">
            <div className="header">
                <span>Tạo tài khoản ngay nào</span>
                <button
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Đăng nhập
                </button>
                {/* <Language /> */}
            </div>
            <div className="title col-4 mx-auto">TMD Quiz</div>
            <div className="welcome col-4 mx-auto">Xin chào, ai đấy nhỉ?</div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group pass-group ">
                    <label>Mật khẩu</label>
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {isShowPassword ? (
                        <span className="icons-eyes" onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                    ) : (
                        <span className="icons-eyes" onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Tên người dùng</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div>
                    <button className="btn-submit" onClick={() => handleLogin()}>
                        Đăng ký
                    </button>
                    <div className=" text-center">
                        <span
                            className="back"
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            {' '}
                            &#60; &#60; Trở lại trang chủ
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
