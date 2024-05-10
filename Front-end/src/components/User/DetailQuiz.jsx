import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiServices';
import './DetailQuiz.scss';
import ListQuiz from './ListQuiz';
import Question from './Question';

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

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

                    <button className="btn btn-warning" onClick={() => handleNext()}>
                        Next
                    </button>
                </div>
            </div>
            <div className="right-content">count down</div>
        </div>
    );
};

export default DetailQuiz;
