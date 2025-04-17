import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
interface UserId {
    body: string,
    title: string,
    id: number,
    userId: number
}
const UserDetail = () => {
    const [userId, setUserID] = useState<UserId[]>([])
    const { id } = useParams();
    const navigate = useNavigate();
    const getRequestId = async () => {
        const url = `https://jsonplaceholder.typicode.com/posts?${id}`
        const response = await axios.get<UserId[]>(url)
        setUserID(response.data)
    }
    useEffect(() => {
        getRequestId()
    }, [])
  return (
    <div>
        <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back
      </button>
    </div>
  )
}

export default UserDetail;
