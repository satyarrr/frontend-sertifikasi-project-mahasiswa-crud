import Mahasiswa from "../models/Mahasiswa";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// Fungsi untuk mendapatkan data mahasiswa dari API
async function getMahasiswa() {
  try {
    const response = await fetch(`${apiUrl}/mahasiswa`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      console.error("Request failed:", response.statusText);
      throw new Error("Request failed");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // Parse data JSON dan map ke objek Mahasiswa
      const data = await response.json();

      return data.map((mahasiswaData) => {
        // Membuat objek Mahasiswa dari data yang diterima
        return new Mahasiswa(
          mahasiswaData.id,
          mahasiswaData.nim,
          mahasiswaData.nama,
          mahasiswaData.jurusan
        );
      });
    } else {
      throw new Error("Response is not in JSON format");
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// Fungsi untuk membuat mahasiswa baru melalui API
async function createMahasiswa(mahasiswaData) {
  try {
    const response = await fetch(`${apiUrl}/mahasiswa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(mahasiswaData),
    });

    if (!response.ok) {
      console.error("Request failed:", response.statusText);
      throw new Error("Request failed");
    }

    // Parse data JSON dan buat objek Mahasiswa baru
    const newMahasiswa = await response.json();
    return new Mahasiswa(
      newMahasiswa.id,
      newMahasiswa.nim,
      newMahasiswa.nama,
      newMahasiswa.jurusan
    );
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// Fungsi untuk memperbarui data mahasiswa melalui API
async function updateMahasiswa(id, mahasiswaData) {
  try {
    const response = await fetch(`${apiUrl}/mahasiswa/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(mahasiswaData),
    });

    if (!response.ok) {
      console.error("Request failed:", response.statusText);
      throw new Error("Request failed");
    }

    // Parse data JSON dan buat objek Mahasiswa yang diperbarui
    const updatedMahasiswa = await response.json();
    return new Mahasiswa(
      updatedMahasiswa.id,
      updatedMahasiswa.nim,
      updatedMahasiswa.nama,
      updatedMahasiswa.jurusan
    );
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// Fungsi untuk menghapus data mahasiswa melalui API
async function deleteMahasiswa(id) {
  try {
    const response = await fetch(`${apiUrl}/mahasiswa/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      console.error("Request failed:", response.statusText);
      throw new Error("Request failed");
    }

    // Jika berhasil, kembalikan objek yang menandakan keberhasilan
    return { success: true, message: "Mahasiswa deleted successfully" };
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// Ekspor fungsi-fungsi tersebut agar dapat digunakan di modul lain
export { getMahasiswa, createMahasiswa, updateMahasiswa, deleteMahasiswa };
