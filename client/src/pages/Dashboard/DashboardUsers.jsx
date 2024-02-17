import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Modal, Table, Button, TableRow } from 'flowbite-react';

import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DashboardUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/v1/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data?.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/v1/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/v1/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell className='!rounded-none truncate'>
                Date created
              </Table.HeadCell>
              <Table.HeadCell className='truncate'>User image</Table.HeadCell>
              <Table.HeadCell className='truncate'>Username</Table.HeadCell>
              <Table.HeadCell className='truncate min-w-52'>
                Email
              </Table.HeadCell>
              <Table.HeadCell className='truncate flex justify-center items-center'>
                Admin
              </Table.HeadCell>
              <Table.HeadCell className='truncate !rounded-none'>
                Delete
              </Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body key={user?._id} className='divide-y'>
                <TableRow>
                  <Table.Cell className='!rounded-none'>
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user?.profilePicture}
                      alt={user?.username}
                      className='w-10 h-10 object-cover rounded-full bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>{user?.username}</Table.Cell>
                  <Table.Cell className=''>{user.email}</Table.Cell>
                  <Table.Cell className='!rounded-none lowercase flex justify-center items-center'>
                    {user?.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className='flex place-content-center font-medium text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                    >
                      <MdOutlineDeleteForever size={25} />
                    </span>
                  </Table.Cell>
                </TableRow>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <div className='min-h-[50vh] flex justify-center items-center'>
          <p className='font-bold text-2xl'>You have no users yet!</p>
        </div>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <div>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this user?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button
                  className='rounded-sm'
                  color='failure'
                  onClick={handleDeleteUser}
                >
                  Yes, I'm sure
                </Button>
                <Button
                  className='rounded-sm'
                  color='gray'
                  onClick={() => setShowModal(false)}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardUsers;
