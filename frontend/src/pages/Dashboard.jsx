import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Clock, Target, Plus } from 'lucide-react';

export default function Dashboard({ userId = 1 }) {
  const [stats, setStats] = useState({ active_skills: 0, total_practice_hours: 0, skills: [] });
  const [newSkill, setNewSkill] = useState({ name: '', category: '', target_hours: '' });
  const [logData, setLogData] = useState({ skill_id: '', duration_minutes: '', notes: '' });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/dashboard/${userId}`);
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch dashboard", error);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8000/api/skills?user_id=${userId}`, newSkill);
    fetchDashboard();
    setNewSkill({ name: '', category: '', target_hours: '' });
  };

  const handleLogPractice = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8000/api/practice?user_id=${userId}`, logData);
    fetchDashboard();
    setLogData({ skill_id: '', duration_minutes: '', notes: '' });
    alert("Practice Logged Successfully!");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Activity size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm">Active Skills</p>
            <p className="text-2xl font-bold">{stats.active_skills}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Clock size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Hours Practiced</p>
            <p className="text-2xl font-bold">{stats.total_practice_hours} hrs</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Target size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm">Current Streak</p>
            <p className="text-2xl font-bold">3 Days</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus size={20}/> Add New Skill</h2>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <input type="text" placeholder="Skill Name (e.g. Guitar)" className="w-full p-2 border rounded" 
                   value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} required />
            <input type="text" placeholder="Category (e.g. Music)" className="w-full p-2 border rounded" 
                   value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})} required />
            <input type="number" placeholder="Target Hours" className="w-full p-2 border rounded" 
                   value={newSkill.target_hours} onChange={e => setNewSkill({...newSkill, target_hours: e.target.value})} required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create Skill</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock size={20}/> Log Practice Session</h2>
          <form onSubmit={handleLogPractice} className="space-y-4">
            <select className="w-full p-2 border rounded" 
                    value={logData.skill_id} onChange={e => setLogData({...logData, skill_id: e.target.value})} required>
              <option value="">Select a Skill...</option>
              {stats.skills?.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <input type="number" placeholder="Duration (Minutes)" className="w-full p-2 border rounded" 
                   value={logData.duration_minutes} onChange={e => setLogData({...logData, duration_minutes: e.target.value})} required />
            <textarea placeholder="What did you practice?" className="w-full p-2 border rounded" 
                      value={logData.notes} onChange={e => setLogData({...logData, notes: e.target.value})} required />
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Save Log</button>
          </form>
        </div>
      </div>
    </div>
  );
}