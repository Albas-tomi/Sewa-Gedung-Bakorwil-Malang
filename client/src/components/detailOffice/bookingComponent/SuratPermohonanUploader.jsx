import axios from "axios";
import React from "react";
import { FaTrash } from "react-icons/fa6";

const SuratPermohonanUploader = ({
  formik,
  suratPermohonan,
  setSuratPermohonan,
}) => {
  // ============== UPLOAD PHOTOS  ==============
  const uploadSurat = (e) => {
    const files = Array.from(e.target.files); // Mengubah objek FileList menjadi array
    formik.setFieldValue("file", files);
    // FORM TO SEND BE
    const data = new FormData();
    // MENGELUARKAN DATA PADA FILES
    for (let index = 0; index < files.length; index++) {
      // SET ISI FORM DATA
      data.append("file", files[index]);
    }
    axios
      .post("/uploadsuratpermohonan", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: fileName } = response;
        setSuratPermohonan((prev) => {
          return [...prev, ...fileName];
        });
      });
  };
  // ============== UPLOAD PHOTOS  ==============
  // ============== DELETE PHOTOS  ==============
  const handleDeleteKtp = (fileName, e) => {
    e.preventDefault();
    setSuratPermohonan([
      ...suratPermohonan.filter((pict) => pict !== fileName),
    ]);
    axios
      .delete(`/deletesuratpermohonan/${fileName}`)
      .then((response) => {
        if (response.status === 200) {
          // Jika penghapusan berhasil di server, hapus foto dari state di client
          const indexToDelete = suratPermohonan.indexOf(fileName);
          if (indexToDelete !== -1) {
            suratPermohonan.splice(indexToDelete, 1); // Menghapus item dari array
            setSuratPermohonan([...suratPermohonan]); // Memperbarui state dengan array yang diperbarui
          }
        } else {
          console.error("Failed to delete photo on the server.");
        }
      })
      .catch((error) => {
        console.error("Error deleting photo: ", error);
      });
  };
  // ============== DELETE PHOTOS  ==============

  return (
    <div>
      <label className="label">
        <span className="label-text">Surat Permohonan</span>
      </label>
      {suratPermohonan.length > 0 &&
        suratPermohonan.map((link, idx) => (
          <div className="h-32 relative flex" key={idx}>
            <a
              className="rounded-2xl w-full object-licover"
              href={`http://localhost:4000/uploads/surat/${link}`}
            >
              {link}
            </a>
            <button
              onClick={(e) => handleDeleteKtp(link, e)}
              className=" absolute cursor-pointer bottom-2 right-2 text-white bg-black bg-opacity-60 p-2 rounded-2xl  "
            >
              <FaTrash />
            </button>
          </div>
        ))}

      <div
        className={`form-control w-full max-w-xs ${
          suratPermohonan.length > 0 && "hidden"
        }`}
      >
        <input
          type="file"
          onChange={uploadSurat}
          accept=".pdf"
          className="file-input file-input-bordered file-input-xs w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default SuratPermohonanUploader;
