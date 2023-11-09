import axios from "axios";
import React from "react";
import { FaTrash } from "react-icons/fa6";

const KtpUploader = ({ formik, setPhotoKtp, photoKtp }) => {
  // ============== UPLOAD PHOTOS  ==============
  const uploadKtp = (e) => {
    const files = Array.from(e.target.files); // Mengubah objek FileList menjadi array
    formik.setFieldValue("photo", files);
    // FORM TO SEND BE
    const data = new FormData();
    // MENGELUARKAN DATA PADA FILES
    for (let index = 0; index < files.length; index++) {
      // SET ISI FORM DATA
      data.append("photo", files[index]);
    }
    axios
      .post("/uploadKtp", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: fileName } = response;
        setPhotoKtp((prev) => {
          return [...prev, ...fileName];
        });
      });
  };

  // ============== UPLOAD PHOTOS  ==============
  // ============== DELETE PHOTOS  ==============
  const handleDeleteKtp = (fileName, e) => {
    e.preventDefault();
    setPhotoKtp([...photoKtp.filter((pict) => pict !== fileName)]);
    axios
      .delete(`/deleteKtp/${fileName}`)
      .then((response) => {
        if (response.status === 200) {
          // Jika penghapusan berhasil di server, hapus foto dari state di client
          const indexToDelete = photoKtp.indexOf(fileName);
          if (indexToDelete !== -1) {
            photoKtp.splice(indexToDelete, 1); // Menghapus item dari array
            setPhotoKtp([...photoKtp]); // Memperbarui state dengan array yang diperbarui
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
        <span className="label-text">Foto KTP Penanggung Jawab Kegiatan</span>
      </label>
      {photoKtp?.length > 0 &&
        photoKtp.map((link, idx) => (
          <div className="h-32 relative flex" key={idx}>
            <img
              className="rounded-2xl w-full object-cover"
              src={`http://localhost:4000/uploads/ktp/${link}`}
              alt="gedung"
            />
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
          photoKtp.length > 0 && "hidden"
        }`}
      >
        <input
          type="file"
          onChange={uploadKtp}
          accept=".jpg,.jpeg,.png"
          className="file-input file-input-bordered file-input-xs w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default KtpUploader;
