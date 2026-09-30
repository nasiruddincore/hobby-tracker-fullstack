import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Send, UserCircle } from 'lucide-react';

export default function Community({ userId = 1 }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/feed');
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch feed", error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (file) formData.append('file', file);

    await axios.post(`http://localhost:8000/api/posts?user_id=${userId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    setContent('');
    setFile(null);
    fetchFeed();
  };

  return (
    <div className="p-8 max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Community Feed</h1>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-100 mb-8">
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <textarea 
            placeholder="Share your latest achievement or milestone..." 
            className="w-full p-3 border rounded-lg resize-none"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:bg-blue-50 p-2 rounded">
              <Image size={20} />
              <span className="text-sm font-medium">{file ? file.name : "Attach Image"}</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => setFile(e.target.files[0])} 
              />
            </label>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <Send size={18} /> Post
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <UserCircle size={40} className="text-gray-400" />
              <div>
                <p className="font-bold text-gray-800">User #{post.user_id}</p>
                <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
            {post.media_url && (
              <img 
                src={`http://localhost:8000${post.media_url}`} 
                alt="Achievement" 
                className="w-full h-auto rounded-lg border object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}