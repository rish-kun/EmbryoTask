"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Panel {
  id: number;
  title: string;
  moderator: string;
  date: string;
}

const PanelsPage: React.FC = () => {
  const [panels, setPanels] = useState<Panel[]>([
    {
      id: 1,
      title: "Future of AI",
      moderator: "Emily Chen",
      date: "2024-09-20",
    },
    {
      id: 2,
      title: "Blockchain in Finance",
      moderator: "Michael Wong",
      date: "2024-09-21",
    },
    {
      id: 3,
      title: "Cybersecurity Trends",
      moderator: "Sarah Johnson",
      date: "2024-09-22",
    },
    {
      id: 4,
      title: "Space Exploration",
      moderator: "David Lee",
      date: "2024-09-23",
    },
  ]);

  const [newPanel, setNewPanel] = useState<Omit<Panel, "id">>({
    title: "",
    moderator: "",
    date: "",
  });
  const [editingPanel, setEditingPanel] = useState<Panel | null>(null);

  const addPanel = () => {
    const panel = { ...newPanel, id: Date.now() };
    setPanels([...panels, panel]);
    setNewPanel({ title: "", moderator: "", date: "" });
    console.log("Added panel:", panel);
  };

  const updatePanel = () => {
    if (editingPanel) {
      setPanels(
        panels.map((p) => (p.id === editingPanel.id ? editingPanel : p))
      );
      setEditingPanel(null);
      console.log("Updated panel:", editingPanel);
    }
  };

  const deletePanel = (id: number) => {
    setPanels(panels.filter((p) => p.id !== id));
    console.log("Deleted panel with id:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-indigo-600">
                  Admin Dashboard
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/lectures"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Lectures
                </Link>
                <Link
                  href="/panels"
                  className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Panels
                </Link>
                <Link
                  href="/team"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Team Members
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Manage Panels
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editingPanel ? "Edit Panel" : "Add New Panel"}
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={
                          editingPanel ? editingPanel.title : newPanel.title
                        }
                        onChange={(e) =>
                          editingPanel
                            ? setEditingPanel({
                                ...editingPanel,
                                title: e.target.value,
                              })
                            : setNewPanel({
                                ...newPanel,
                                title: e.target.value,
                              })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="moderator"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Moderator
                      </label>
                      <input
                        type="text"
                        name="moderator"
                        id="moderator"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={
                          editingPanel
                            ? editingPanel.moderator
                            : newPanel.moderator
                        }
                        onChange={(e) =>
                          editingPanel
                            ? setEditingPanel({
                                ...editingPanel,
                                moderator: e.target.value,
                              })
                            : setNewPanel({
                                ...newPanel,
                                moderator: e.target.value,
                              })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={editingPanel ? editingPanel.date : newPanel.date}
                        onChange={(e) =>
                          editingPanel
                            ? setEditingPanel({
                                ...editingPanel,
                                date: e.target.value,
                              })
                            : setNewPanel({ ...newPanel, date: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={editingPanel ? updatePanel : addPanel}
                    >
                      {editingPanel ? "Update Panel" : "Add Panel"}
                    </button>
                    {editingPanel && (
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setEditingPanel(null)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Moderator
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {panels.map((panel) => (
                      <tr key={panel.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {panel.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {panel.moderator}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {panel.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            onClick={() => setEditingPanel(panel)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => deletePanel(panel.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PanelsPage;
