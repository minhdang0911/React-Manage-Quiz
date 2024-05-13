import { useState } from 'react';
import Select from 'react-select';
import { FaPlus, FaMinus, FaRegMinusSquare, FaRegPlusSquare } from 'react-icons/fa';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import { toast } from 'react-toastify';
import {
    getAllQuizForAdmin,
    postCreateNewAnswerForQuestion,
    postCreateNewQuestionForQuiz,
    getQuizWithQA,
} from '../../../../services/apiServices';

import './QuizQA.scss';
import { useEffect } from 'react';

const QuizQA = (props) => {
    const [listQuiz, setListQuiz] = useState([]);
    const [seletedQuiz, setSelectedQuiz] = useState({});
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: '',
    });

    useEffect(() => {
        fetchQuiz();
    }, []);

    useEffect(() => {
        if (seletedQuiz && seletedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [seletedQuiz]);

    function urltoFile(url, filename, mimeType) {
        return fetch(url)
            .then((res) => res.arrayBuffer())
            .then((buf) => new File([buf], filename, { type: mimeType }));
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(seletedQuiz.value);
        if (res && res.EC === 0) {
            //convert base64 to file obj
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(
                        `data:image/png;base64,${q.imageFile}`,
                        `Question-${q.id}.png`,
                        `image/png`,
                    );
                }
                newQA.push(q);
            }
            setQuestions(newQA);
        }
    };

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} -${item.description}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
            ],
        },
    ];

    const [questions, setQuestions] = useState(initQuestions);

    const handleAddRemoveQuestion = (type, id) => {
        console.log('type', type);
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: 'questions 1',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ],
            };
            setQuestions([...questions, newQuestion]);
        }

        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter((item) => item.id !== id);
            setQuestions(questionsClone);
        }
    };

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        console.log('type', type, questionId, answerId);
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };

            let index = questionsClone.findIndex((item) => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
            console.log('index', index);
        }

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex((item) => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter((item) => item.id !== answerId);
            setQuestions(questionsClone);
        }
    };

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex((item) => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    };

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageName = event.target.files[0].name;
            questionsClone[index].imageFile = event.target.files[0];

            setQuestions(questionsClone);
        }
    };

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map((answer) => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value;
                    }
                    if (type === 'INPUT') {
                        answer.description = value;
                    }
                }
                return answer;
            });

            setQuestions(questionsClone);
        }
    };

    const handleSubmitQuestionForQuiz = async () => {
        console.log('question', questions, seletedQuiz);

        // Submit questions
        // await Promise.all(
        //     questions.map(async (question) => {
        //         const createdQuestion = await postCreateNewQuestionForQuiz(
        //             +seletedQuiz.value,
        //             question.description,
        //             question.imageFile,
        //         );
        //         // Submit answers
        //         await Promise.all(
        //             question.answers.map(async (answer) => {
        //                 await postCreateNewAnswerForQuestion(
        //                     answer.description,
        //                     answer.isCorrect,
        //                     createdQuestion.DT.id,
        //                 );
        //             }),
        //         );
        //     }),
        // );

        //vallidate quiz
        if (_.isEmpty(seletedQuiz)) {
            toast.error('Please choose a quiz');
            return;
        }

        //validate answer
        let isValidAnswer = true;
        let indexQ = 0,
            indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
            return;
        }

        //validate question
        let isValidQuestion = true;
        let indexQ1 = 0;

        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQ1 = i;
                break;
            }
        }

        if (isValidQuestion === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`);
            return;
        }

        for (const question of questions) {
            const q = await postCreateNewQuestionForQuiz(+seletedQuiz.value, question.description, question.imageFile);
            //submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
            }
        }
        toast.success('Create Question and answers success');
        setQuestions(initQuestions);
    };

    const handlePReviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName,
            });
        }

        console.log('file', questionsClone[index].imageFile);
        setIsPreviewImage(true);
    };

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz:</label>
                    <Select value={seletedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
                </div>

                <div className="mt-3 mb-2"> Add questions</div>
                {questions &&
                    questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="q-main mb-4">
                                <div className="questions-content">
                                    <div className="form-floating description ">
                                        <input
                                            value={question.description}
                                            type="text"
                                            placeholder="name@example.com"
                                            className="form-control"
                                            onChange={(event) =>
                                                handleOnChange('QUESTION', question.id, event.target.value)
                                            }
                                        />
                                        <label>Question {index + 1}'s Description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className="label-up" />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type="file"
                                            hidden
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                        />
                                        <span>
                                            {question.imageName ? (
                                                <span
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handlePReviewImage(question.id)}
                                                >
                                                    {question.imageName}
                                                </span>
                                            ) : (
                                                '0 file is uploaded'
                                            )}
                                        </span>
                                    </div>
                                    <div className="btn-add">
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <FaPlus className="icon-add" />
                                        </span>

                                        {questions.length > 1 && (
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <FaMinus className="icon-remove" />
                                            </span>
                                        )}
                                    </div>

                                    {/* <div className="answers">
                            <input type="text" />
                        </div> */}
                                </div>
                                {question.answers &&
                                    question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answers-content">
                                                <input
                                                    onChange={(event) =>
                                                        handleAnswerQuestion(
                                                            'CHECKBOX',
                                                            answer.id,
                                                            question.id,
                                                            event.target.checked,
                                                        )
                                                    }
                                                    checked={answer.isCorrect}
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                />
                                                <div className="form-floating description  anwser-name">
                                                    <input
                                                        type="text"
                                                        placeholder="name@example.com"
                                                        className="form-control"
                                                        value={answer.description}
                                                        onChange={(event) =>
                                                            handleAnswerQuestion(
                                                                'INPUT',
                                                                answer.id,
                                                                question.id,
                                                                event.target.value,
                                                            )
                                                        }
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className="btn-group">
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <FaRegPlusSquare className="icon-add" />
                                                    </span>
                                                    {question.answers.length > 1 && (
                                                        <span
                                                            onClick={() =>
                                                                handleAddRemoveAnswer('REMOVE', question.id, answer.id)
                                                            }
                                                        >
                                                            <FaRegMinusSquare className="icon-remove" />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}

                {questions && questions.length > 0 && (
                    <div>
                        <button className="btn btn-warning" onClick={() => handleSubmitQuestionForQuiz()}>
                            Save Question
                        </button>
                    </div>
                )}

                {isPreviewImage === true && (
                    <Lightbox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default QuizQA;
