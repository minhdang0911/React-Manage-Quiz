import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

const AssignQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);
    const [seletedQuiz, setSelectedQuiz] = useState({});

    const [listUser, setListUser] = useState([]);
    const [seletedUser, setSelectedUser] = useState({});
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} -${item.name}`,
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let users = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} -${item.username} -${item.email}`,
                };
            });
            setListUser(users);
        }
    };

    const handleAssign = async () => {
        let res = await postAssignQuiz(seletedQuiz.value, seletedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setSelectedQuiz({});
            setSelectedUser({});
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="assign-quiz-container row">
            <div className="col-6 form-group">
                <label className="mb-2">Select Quiz:</label>
                <Select value={seletedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
            </div>

            <div className="col-6 form-group">
                <label className="mb-2">Select User:</label>
                <Select value={seletedUser} onChange={setSelectedUser} options={listUser} />
            </div>
            <div>
                <button onClick={() => handleAssign()} className="btn btn-warning mt-3">
                    Assign
                </button>
            </div>
        </div>
    );
};

export default AssignQuiz;
