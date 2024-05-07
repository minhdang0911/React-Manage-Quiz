import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import { useState } from 'react';
import TableUser from './TableUser';

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
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
                <TableUser />
            </div>
            <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} />
        </div>
    );
};

export default ManageUser;
