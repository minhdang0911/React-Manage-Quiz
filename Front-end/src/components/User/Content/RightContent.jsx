import CountDown from './CountDown';

const RightContent = (props) => {
    const { dataQuiz } = props;
    const onTImeUp = () => {
        props.handleFinish();
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
                            <div className="question" key={index}>
                                {index + 1}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default RightContent;
