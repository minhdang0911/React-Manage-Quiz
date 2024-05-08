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
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword });
};
export { postCreateNewUser, getAllUser, putUpdateUser, DeleteUser, GetUSerWithPaginate, postLogin };
