import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllUser } from '../../../services/apiServices';
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();
        console.log('res', res);
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    };
    return (
        <div className="manage-user-container">
            <div className="title">Quản lý người dùng</div>
            <div className="users-content">
                <div className="btn-add-new" onClick={() => setShowModalCreateUser(true)}>
                    <button className="btn btn-primary">
                        <FcPlus />
                        Thêm mới người dùng
                    </button>
                </div>
            </div>
            <div className="table-users-container">
                <TableUser
                    listUsers={listUsers}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnDelete={handleClickBtnDelete}
                />
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUser={fetchListUser}
            />
            <ModalUpdateUser
                fetchListUser={fetchListUser}
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                resetUpdateData={resetUpdateData}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                fetchListUser={fetchListUser}
            />
        </div>
    );
};

export default ManageUser;
