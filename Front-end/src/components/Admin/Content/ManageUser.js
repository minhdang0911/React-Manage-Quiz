import ModalCreateUser from './ModalCreateUser';

const ManageUser = (props) => {
    return (
        <div className="manage-user-container">
            <div className="title">Quản lý người dùng</div>
            <div className="users-content">
                <button>Thêm mới người dùng</button>
            </div>
            <div>table</div>
            <ModalCreateUser />
        </div>
    );
};

export default ManageUser;
