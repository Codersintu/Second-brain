import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../Config";

function ShareBrainPage() {
  const { sharelink } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${sharelink}`);
        console.log(res.data)
        setData(res.data);
      } catch (err) {
        console.error("Error loading shared brain:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSharedBrain();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Loading shared brain...</div>;

  if (!data)
    return <div className="p-8 text-red-500">Invalid or expired share link.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-60 bg-gray-200 p-8">
        <h1 className="text-3xl font-bold">Brainly</h1>
        <p className="text-gray-600">Shared brain by {data.username}</p>
      </div>

      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Public Notes</h2>
        {data.content.length === 0 ? (
          <p className="text-gray-500">No shared content yet.</p>
        ) : (
          <ul className="space-y-3">
            {data.content.map((item: any) => (
              <li
                key={item._id}
                className="border p-4 rounded-lg bg-white shadow-sm"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <a href={item.link} className="text-sm text-gray-600">{item.link}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ShareBrainPage;
