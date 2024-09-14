"use client";
// pages/lectures.tsx
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Lecture {
  id: number;
  title: string;
  speaker: string;
  date: string;
}

const LecturesPage: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([
    {
      id: 1,
      title: "Introduction to React",
      speaker: "John Doe",
      date: "2024-09-15",
    },
    {
      id: 2,
      title: "Advanced TypeScript",
      speaker: "Jane Smith",
      date: "2024-09-16",
    },
    {
      id: 3,
      title: "Next.js Best Practices",
      speaker: "Bob Johnson",
      date: "2024-09-17",
    },
    {
      id: 4,
      title: "Tailwind CSS Masterclass",
      speaker: "Alice Brown",
      date: "2024-09-18",
    },
  ]);

  const [newLecture, setNewLecture] = useState<Omit<Lecture, "id">>({
    title: "",
    speaker: "",
    date: "",
  });
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);

  const addLecture = () => {
    const lecture = { ...newLecture, id: Date.now() };
    setLectures([...lectures, lecture]);
    setNewLecture({ title: "", speaker: "", date: "" });
    console.log("Added lecture:", lecture);
  };

  const updateLecture = () => {
    if (editingLecture) {
      setLectures(
        lectures.map((l) => (l.id === editingLecture.id ? editingLecture : l))
      );
      setEditingLecture(null);
      console.log("Updated lecture:", editingLecture);
    }
  };

  const deleteLecture = (id: number) => {
    setLectures(lectures.filter((l) => l.id !== id));
    console.log("Deleted lecture with id:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Admin Dashboard
            </Link>
            <div className="flex space-x-4">
              <Link href="/lectures" className="text-indigo-600 font-semibold">
                Lectures
              </Link>
              <Link
                href="/panels"
                className="text-gray-600 hover:text-gray-800"
              >
                Panels
              </Link>
              <Link href="/team" className="text-gray-600 hover:text-gray-800">
                Team Members
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Manage Lectures
        </h1>
      </header>

      <main>
        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {editingLecture ? "Edit Lecture" : "Add New Lecture"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingLecture ? editingLecture.title : newLecture.title}
                onChange={(e) =>
                  editingLecture
                    ? setEditingLecture({
                        ...editingLecture,
                        title: e.target.value,
                      })
                    : setNewLecture({ ...newLecture, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Speaker"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={
                  editingLecture ? editingLecture.speaker : newLecture.speaker
                }
                onChange={(e) =>
                  editingLecture
                    ? setEditingLecture({
                        ...editingLecture,
                        speaker: e.target.value,
                      })
                    : setNewLecture({ ...newLecture, speaker: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editingLecture ? editingLecture.date : newLecture.date}
                onChange={(e) =>
                  editingLecture
                    ? setEditingLecture({
                        ...editingLecture,
                        date: e.target.value,
                      })
                    : setNewLecture({ ...newLecture, date: e.target.value })
                }
              />
            </div>
            <motion.button
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={editingLecture ? updateLecture : addLecture}
            >
              {editingLecture ? "Update Lecture" : "Add Lecture"}
            </motion.button>
            {editingLecture && (
              <motion.button
                className="mt-6 ml-4 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditingLecture(null)}
              >
                Cancel
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Speaker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lectures.map((lecture) => (
                <motion.tr
                  key={lecture.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lecture.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lecture.speaker}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lecture.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <motion.button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditingLecture(lecture)}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      className="text-red-600 hover:text-red-900"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteLecture(lecture.id)}
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
};

export default LecturesPage;
