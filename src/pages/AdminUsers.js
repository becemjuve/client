import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../baseUrl';
import { authConfig } from '../config/authConfig';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap'; // Import Bootstrap components

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { user: authUser } = useSelector((state) => state.auth);

  // request handler
  const getUsers = () => {
    axios
      .get(baseUrl + 'admin/all-users', {
        headers: {
          'x-auth': localStorage.getItem('token'),
        },
      })
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err));
  };

  const deleteUserHandler = (id) => {
    axios
      .delete(baseUrl + 'admin/' + id, {
        headers: {
          'x-auth': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        toast(res.data.message, { type: 'success' });
        getUsers();
      })
      .catch((err) => console.log(err));

    setShowDeleteModal(false); 
  };

  const updateUserHandler = (id, role) => {
    const isAdmin = role ? false : true;
    axios
      .put(baseUrl + 'admin/up-date-role/' + id, { isAdmin }, {
        headers: {
          'x-auth': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        toast(res.data.message, { type: 'success' });
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <div className="user-profile-page mt-2">
        <h1>Admin User Control</h1>
      </div>
      <ul className='list-group'>
        {users.map((user) => (
          <li key={user._id} className='list-group-item d-flex justify-content-between'>
            <p className='first-last-name'>
              {user.firstName} {user.lastName}
            </p>
            <p className='role-user'>{user.isAdmin ? 'admin' : 'user'}</p>
            <Button
              className={`update-role btn btn-${user.isAdmin ? 'warning' : 'success'}`}
              disabled={authUser?._id === user._id}
              onClick={() => updateUserHandler(user._id, user.isAdmin)}
            >
              {user.isAdmin ? 'DownGrade' : 'UpGrade'}
            </Button>
            {authUser?._id !== user._id && (
              <>
                <Button
                  variant='danger'
                  onClick={() => handleDeleteClick(user)} // Show delete confirmation modal
                >
                  <i class="fa-solid fa-trash"></i>
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {userToDelete && `${userToDelete.firstName} ${userToDelete.lastName}`}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={() => deleteUserHandler(userToDelete?._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminUsers;
