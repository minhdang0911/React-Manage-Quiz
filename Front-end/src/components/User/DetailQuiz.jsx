import _ from 'lodash';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiServices';
import './DetailQuiz.scss';

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

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
                        answers.push(item.answers);
                        console.log('item,answers', item.answers);
                    });
                    console.log('value', value, 'key', key);

                    return { questionId: key, answers, questionDescription, image };
                })
                .value();
            console.log(data);
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
                    <div className="question">Question1 : How are you?</div>
                    <div className="answer">
                        <div className="a-child">A . wqewqewqe</div>
                        <div className="b-child">B. wqewqewq</div>
                        <div className="c-child">C. wewqeqweq</div>
                    </div>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary">Previos</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>
            <div className="right-content">count down</div>
        </div>
    );
};

export default DetailQuiz;
