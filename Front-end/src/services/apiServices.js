import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
};

const getAllUser = () => {
    return axios.get('api/v1/participant/all');
};

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('username', username);
    data.append('id', id);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
};

const DeleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
};

const GetUSerWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword, delay: 3000 });
};

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username });
};

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
};

const getDataQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', data);
};

const getAllQuizForAdmin = () => {
    return axios.get(`/api/v1/quiz/all`);
};

const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
};

const deleteQuizForAdmin = (id) => {
    return axios.delete(`/api/v1/quiz/${id}`);
};

export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    DeleteUser,
    GetUSerWithPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDataQuiz,
    postSubmitQuiz,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    putUpdateQuizForAdmin,
    deleteQuizForAdmin,
};
