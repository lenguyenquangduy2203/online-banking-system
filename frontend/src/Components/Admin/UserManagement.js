import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosConfig/axiosInstance';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await axiosInstance.get('/api/admin/users', {
          headers: {
            'admin-header': token,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h3>User Management</h3>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email}) - Role: {user.role || 'User'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserManagement;
