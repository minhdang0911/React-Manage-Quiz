import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllUser, GetUSerWithPaginate } from '../../../services/apiServices';
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const LIMIT_USER = 5;
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1);
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();
        console.log('res', res);
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    };

    const fetchListUserWithPaginate = async (page) => {
        let res = await GetUSerWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
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
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUser={fetchListUser}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalUpdateUser
                fetchListUser={fetchListUser}
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                resetUpdateData={resetUpdateData}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                fetchListUser={fetchListUser}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default ManageUser;
