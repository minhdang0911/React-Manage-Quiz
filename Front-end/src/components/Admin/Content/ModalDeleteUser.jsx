import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../../../services/apiServices';
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await DeleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUser();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Xoa User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có muốn xóa user có email là <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteUser;
