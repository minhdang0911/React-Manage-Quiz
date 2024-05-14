import CountDown from './CountDown';
import { useRef } from 'react';
import { OtherHouses } from '@mui/icons-material';

const RightContent = (props) => {
    const refDiv = useRef([]);
    const { dataQuiz } = props;
    const onTImeUp = () => {
        props.handleFinish();
    };

    const getClassQuestion = (index, question) => {
        //check answers
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find((a) => a.isSelected === true);
            if (isAnswered) {
                return 'question selected';
            }
        }
        return 'question';
    };

    const handleClickQuestion = (question, index) => {
        props.setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach((item) => {
                if (item && item.className === 'question clicked') {
                    item.className = 'question';
                }
            });
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find((a) => a.isSelected === true);
            if (isAnswered) {
                return;
            }
        }
        refDiv.current[index].className = 'question clicked';
    };
    return (
        <>
            <div className="main-timer">
                <CountDown onTImeUp={onTImeUp} />
            </div>
            <div className="main-question">
                {dataQuiz &&
                    dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                className={getClassQuestion(index, item)}
                                key={index}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={(element) => (refDiv.current[index] = element)}
                            >
                                {index + 1}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default RightContent;
