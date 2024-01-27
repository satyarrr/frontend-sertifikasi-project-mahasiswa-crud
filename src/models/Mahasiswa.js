class Mahasiswa {
  // Konstruktor untuk membuat objek Mahasiswa dengan properti yang diberikan
  constructor(id, nim, nama, jurusan) {
    // Properti id untuk menyimpan identifikasi unik mahasiswa
    this.id = id;

    // Properti nim untuk menyimpan nomor induk mahasiswa
    this.nim = nim;

    // Properti nama untuk menyimpan nama lengkap mahasiswa
    this.nama = nama;

    // Properti jurusan untuk menyimpan jurusan mahasiswa
    this.jurusan = jurusan;
  }
}

// Ekspor kelas Mahasiswa agar dapat digunakan di modul lain
export default Mahasiswa;
