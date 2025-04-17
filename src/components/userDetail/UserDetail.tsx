import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserId, Users } from "../../types";


const UserDetail = () => {
  const [userId, setUserID] = useState<UserId[]>([])
  const [users, setUser] = useState<Users | null>(null)
  const [load, setLoad] = useState<boolean>(true)
  const [error, setError] = useState<String>("")
  const { id } = useParams();
  const navigate = useNavigate();
  const getRequestId = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    const response = await axios.get<UserId[]>(url)
    setUserID(response.data)
  }
  const getRequest = async () => {
    try {
      const url = `https://jsonplaceholder.typicode.com/users/${id}`
      const response = await axios.get<Users>(url)
      setUser(response.data)
    } catch { setError("Request failed") }
    finally { setLoad(false) }
  }

  console.log(users);

  useEffect(() => {
    getRequestId()
    getRequest()
  }, [id])
  if (load) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!users) return <p className="p-4">User not found</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back
      </button>
          <div>
            <h2 className="text-2xl font-bold mb-2">{users.name}</h2>
            <p>Email: {users.email}</p>
            <p>Phone: {users.phone}</p>
            <p>
              Address: {users.address.street}, {users.address.city}, {users.address.zipcode}
            </p>
            <p>Company: {users.company.name}</p>
          </div>
      <h3 className="text-xl font-semibold mt-6 mb-2">Posts:</h3>
      <ul className="space-y-4">
        {userId.map((post) => (
          <li key={post.id} className="border p-3 rounded shadow">
            <h4 className="font-bold mb-1">{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetail;
