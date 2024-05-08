import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import ReactPaginate from 'react-paginate';

const TableUser = (props) => {
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
        props.setCurrentPage(+event.selected + 1);
    };

    const { listUsers, pageCount } = props;
    const [detailUser, setDetailUser] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const handleViewDetail = (user) => {
        setDetailUser(user);
        if (user.image) {
            setPreviewImage(`data:image/jpeg;base64,${user.image}`);
        } else {
            setPreviewImage('');
        }
    };

    const handleClose = () => {
        setDetailUser(null);
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => handleViewDetail(item)}>
                                            View
                                        </button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                    {listUsers && listUsers.length === 0 && (
                        <tr>
                            <td colSpan={'4'}>No data</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Sau>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Trước"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>

            <Modal open={!!detailUser} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 400,
                        bgcolor: 'white',
                        boxShadow: 24,
                        borderRadius: 4,
                        p: 2,
                    }}
                >
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">User Detail</Typography>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Typography variant="body1">
                        <strong>Username:</strong> {detailUser?.username}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {detailUser?.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Role:</strong> {detailUser?.role}
                    </Typography>
                    <Paper
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 4,
                            overflow: 'hidden',
                            mt: 2,
                        }}
                    >
                        <img
                            src={previewImage}
                            alt="User preview"
                            style={{
                                width: '100%',
                                height: '150px',
                                display: 'block',
                            }}
                        />
                    </Paper>
                    {/* Add more details if needed */}
                </Box>
            </Modal>
        </>
    );
};

export default TableUser;
