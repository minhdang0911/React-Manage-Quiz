import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/apiServices';
import { useNavigate } from 'react-router-dom';
import './ListQuiz.scss';

const ListQuiz = (props) => {
    const [azzQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        let res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    };
    return (
        <div className="list-quiz-container container">
            {azzQuiz &&
                azzQuiz.length > 0 &&
                azzQuiz.map((quiz, index) => {
                    return (
                        <div key={index + 1} className="card" style={{ width: '12rem' }}>
                            <img
                                className="card-img-top"
                                src={`data:image/jpeg;base64,${quiz.image}`}
                                alt="Card image cap"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        navigate(`/quiz/${quiz.id}`);
                                    }}
                                >
                                    Start now
                                </button>
                            </div>
                        </div>
                    );
                })}
            {azzQuiz && azzQuiz.length === 0 && <div>You don't have any quiz now...</div>}
        </div>
    );
};
export default ListQuiz;
