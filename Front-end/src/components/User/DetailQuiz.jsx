import { recomposeColor } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiServices';
import RightContent from './Content/RightContent';
import './DetailQuiz.scss';
import ListQuiz from './ListQuiz';
import ModalResult from './ModalResult';
import Question from './Question';

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy('id')
                .map((value, key) => {
                    let answers = [];
                    let questionDescription,
                        image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                        console.log('item,answers', item.answers);
                    });
                    console.log('value', value, 'key', key);

                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handlePrevious = () => {
        if (index - 1 < 0) {
            return;
        } else {
            setIndex(index - 1);
        }
    };

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    };

    const handleDadCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let q = dataQuizClone.find((item) => +item.questionId === +questionId);
        if (q && q.answers) {
            let b = q.answers.map((item) => {
                if (item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });

            q.answers = b;

            console.log('b', b);
        }
        let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = q;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleFinish = async () => {
        // {
        //     "quizId": 1,
        //     "answers": [
        //         {
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         {
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        let payload = {
            quizId: +quizId,
            answers: [],
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach((a) => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id);
                    }
                });

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId,
                });
            });

            payload.answers = answers;
            //submit api
            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setIsShowModalResult(true);
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                });
            } else {
            }
        }
    };

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId} :{location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        handleDadCheckbox={handleDadCheckbox}
                        index={index}
                        data={dataQuiz && dataQuiz.length ? dataQuiz[index] : []}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrevious()}>
                        Previous
                    </button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>
                        Next
                    </button>

                    <button className="btn btn-warning" onClick={() => handleFinish()}>
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-content">
                <RightContent dataQuiz={dataQuiz} handleFinish={handleFinish} />
            </div>
            <ModalResult show={isShowModalResult} setShow={setIsShowModalResult} dataModalResult={dataModalResult} />
        </div>
    );
};

export default DetailQuiz;
