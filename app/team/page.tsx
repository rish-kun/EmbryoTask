"use client";
import React, { useState } from "react";
import Link from "next/link";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
}

const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Backend Developer",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "UI/UX Designer",
      email: "mike@example.com",
    },
    {
      id: 4,
      name: "Sara Williams",
      role: "Project Manager",
      email: "sara@example.com",
    },
  ]);

  const [newMember, setNewMember] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    email: "",
  });
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const addMember = () => {
    const member = { ...newMember, id: Date.now() };
    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: "", role: "", email: "" });
    console.log("Added team member:", member);
  };

  const updateMember = () => {
    if (editingMember) {
      setTeamMembers(
        teamMembers.map((m) => (m.id === editingMember.id ? editingMember : m))
      );
      setEditingMember(null);
      console.log("Updated team member:", editingMember);
    }
  };

  const deleteMember = (id: number) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
    console.log("Deleted team member with id:", id);
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
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Panels
                </Link>
                <Link
                  href="/team"
                  className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
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
              Manage Team Members
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editingMember ? "Edit Team Member" : "Add New Team Member"}
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={
                          editingMember ? editingMember.name : newMember.name
                        }
                        onChange={(e) =>
                          editingMember
                            ? setEditingMember({
                                ...editingMember,
                                name: e.target.value,
                              })
                            : setNewMember({
                                ...newMember,
                                name: e.target.value,
                              })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        id="role"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={
                          editingMember ? editingMember.role : newMember.role
                        }
                        onChange={(e) =>
                          editingMember
                            ? setEditingMember({
                                ...editingMember,
                                role: e.target.value,
                              })
                            : setNewMember({
                                ...newMember,
                                role: e.target.value,
                              })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={
                          editingMember ? editingMember.email : newMember.email
                        }
                        onChange={(e) =>
                          editingMember
                            ? setEditingMember({
                                ...editingMember,
                                email: e.target.value,
                              })
                            : setNewMember({
                                ...newMember,
                                email: e.target.value,
                              })
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={editingMember ? updateMember : addMember}
                    >
                      {editingMember ? "Update Team Member" : "Add Team Member"}
                    </button>
                    {editingMember && (
                      <button
                        type="button"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setEditingMember(null)}
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
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
                    {teamMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {member.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                            onClick={() => setEditingMember(member)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => deleteMember(member.id)}
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

export default TeamPage;
