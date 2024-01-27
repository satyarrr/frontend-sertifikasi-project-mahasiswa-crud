"use client";

import React, { useEffect, useState } from "react";
import MahasiswaForm from "./MahasiswaFormm"; // Import komponen MahasiswaForm
import {
  getMahasiswa,
  deleteMahasiswa,
  updateMahasiswa,
  createMahasiswa,
} from "../services/MahasiswaService"; // Import fungsi-fungsi CRUD dari service

const MahasiswaList = () => {
  const [mahasiswaList, setMahasiswaList] = useState([]); // State untuk menyimpan daftar mahasiswa
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null); // State untuk menyimpan data mahasiswa yang dipilih untuk diedit
  const [isCreateModalOpen, setCreateModalOpen] = useState(false); // State untuk mengontrol keberadaan modal tambah mahasiswa
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State untuk mengontrol keberadaan modal edit mahasiswa

  useEffect(() => {
    // Hook useEffect yang dijalankan saat komponen dipasang
    fetchMahasiswaData(); // Memanggil fungsi fetchMahasiswaData untuk mendapatkan data mahasiswa dari server
  }, []);

  const fetchMahasiswaData = async () => {
    try {
      // Mendapatkan data mahasiswa dari server menggunakan fungsi getMahasiswa dari service
      const data = await getMahasiswa();
      setMahasiswaList(data); // Mengupdate state mahasiswaList dengan data yang diperoleh
    } catch (error) {
      console.error("Error fetching mahasiswa data:", error.message);
    }
  };

  const handleCreateMahasiswa = async (mahasiswaData) => {
    try {
      // Membuat mahasiswa baru menggunakan fungsi createMahasiswa dari service
      await createMahasiswa(mahasiswaData);
      fetchMahasiswaData(); // Mengambil data terbaru setelah penambahan mahasiswa
      setCreateModalOpen(false); // Menutup modal tambah mahasiswa
    } catch (error) {
      console.error("Error creating mahasiswa:", error.message);
    }
  };

  const handleEditMahasiswa = async (mahasiswaData) => {
    try {
      // Mengupdate data mahasiswa yang dipilih untuk diedit menggunakan fungsi updateMahasiswa dari service
      await updateMahasiswa(selectedMahasiswa.id, mahasiswaData);
      fetchMahasiswaData(); // Mengambil data terbaru setelah perubahan data mahasiswa
      setSelectedMahasiswa(null); // Menghapus data mahasiswa yang dipilih untuk diedit
      setEditModalOpen(false); // Menutup modal edit mahasiswa
    } catch (error) {
      console.error("Error updating mahasiswa:", error.message);
    }
  };

  const handleDeleteMahasiswa = async (id) => {
    try {
      // Menghapus data mahasiswa menggunakan fungsi deleteMahasiswa dari service
      await deleteMahasiswa(id);
      fetchMahasiswaData(); // Mengambil data terbaru setelah penghapusan mahasiswa
    } catch (error) {
      console.error("Error deleting mahasiswa:", error.message);
    }
  };

  const handleEditClick = (mahasiswa) => {
    setSelectedMahasiswa(mahasiswa); // Menyimpan data mahasiswa yang dipilih untuk diedit
    setEditModalOpen(true); // Membuka modal edit mahasiswa
  };

  const handleCancelEdit = () => {
    setSelectedMahasiswa(null); // Membatalkan proses edit dan menghapus data mahasiswa yang dipilih
    setEditModalOpen(false); // Menutup modal edit mahasiswa
  };
  return (
    <div className=" m-4">
      <h2 className=" text-center text-2xl font-bold">Mahasiswa List</h2>
      <button
        onClick={() => setCreateModalOpen(true)}
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Create Mahasiswa
      </button>
      <div className=" grid grid-cols-3 gap-4 ">
        {mahasiswaList.map((mahasiswa) => (
          <div key={mahasiswa.id} className="bg-white p-4 rounded shadow">
            <div>
              <p className="text-lg font-semibold">{mahasiswa.nama}</p>
              <p className="text-gray-600">NIM: {mahasiswa.nim}</p>
              <p className="text-gray-600">Jurusan: {mahasiswa.jurusan}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleEditClick(mahasiswa)}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMahasiswa(mahasiswa.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isCreateModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h2>Create Mahasiswa</h2>
            <MahasiswaForm
              onSubmit={handleCreateMahasiswa}
              initialValues={{}}
            />
            <button
              onClick={() => setCreateModalOpen(false)}
              className=" text-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h2>Edit Mahasiswa</h2>
            <MahasiswaForm
              onSubmit={handleEditMahasiswa}
              initialValues={selectedMahasiswa}
            />
            <button
              onClick={handleCancelEdit}
              className=" text-red-400 border rounded-md p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MahasiswaList;
