import React, { useState, useEffect } from "react";

const MahasiswaForm = ({ onSubmit, initialValues }) => {
  // State untuk menyimpan data mahasiswa dalam form
  const [mahasiswaData, setMahasiswaData] = useState(initialValues || {});

  // Effect untuk mengatur ulang data mahasiswa saat prop initialValues berubah
  useEffect(() => {
    setMahasiswaData(initialValues || {});
  }, [initialValues]);

  // Handler untuk mengubah nilai data mahasiswa saat input diubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMahasiswaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler untuk menangani pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mahasiswaData); // Memanggil fungsi onSubmit yang diberikan sebagai prop dengan data mahasiswa sebagai argumen
    // Membersihkan formulir setelah pengiriman
    setMahasiswaData({});
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="nim"
        >
          NIM:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="nim"
          id="nim"
          value={mahasiswaData.nim || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="nama"
        >
          Nama:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="nama"
          id="nama"
          value={mahasiswaData.nama || ""}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="jurusan"
        >
          Jurusan:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="jurusan"
          id="jurusan"
          value={mahasiswaData.jurusan || ""}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className=" text-green-400 mb-3 p-2 border rounded-md"
      >
        {initialValues && Object.keys(initialValues).length > 0
          ? "Save"
          : "Create"}
      </button>
    </form>
  );
};

export default MahasiswaForm;
