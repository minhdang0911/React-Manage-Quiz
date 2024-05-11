import { useState } from 'react';
import Select from 'react-select';
import { FaPlus, FaMinus, FaRegMinusSquare, FaRegPlusSquare } from 'react-icons/fa';

import './Questions.scss';

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [seletedQuiz, setSelectedQuiz] = useState({});
    return (
        <div className="questions-container">
            <div className="title">Manage Question</div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz:</label>
                    <Select value={seletedQuiz} onChange={setSelectedQuiz} options={options} />
                </div>

                <div className="mt-3"> Add questions</div>
                <div>
                    <div className="questions-content">
                        <div className="form-floating description ">
                            <input type="text" placeholder="name@example.com" className="form-control" />
                            <label>Description</label>
                        </div>
                        <div className="group-upload">
                            <label className="label-up">Upload image</label>
                            <input type="file" hidden />
                            <span>0 file is uploaded</span>
                        </div>
                        <div className="btn-add">
                            <span>
                                <FaPlus className="icon-add" />
                            </span>
                            <span>
                                <FaMinus className="icon-remove" />
                            </span>
                        </div>

                        {/* <div className="answers">
                        <input type="text" />
                    </div> */}
                    </div>
                    <div className="answers-content">
                        <input className="form-check-input iscorrect" type="checkbox" />
                        <div className="form-floating description  anwser-name">
                            <input type="text" placeholder="name@example.com" className="form-control" />
                            <label>Answer 1</label>
                        </div>
                        <div className="btn-group">
                            <span>
                                <FaRegPlusSquare className="icon-add" />
                            </span>
                            <span>
                                <FaRegMinusSquare className="icon-remove" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;
