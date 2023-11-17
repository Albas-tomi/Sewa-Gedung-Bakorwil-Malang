import axios from "axios";
import React from "react";
import { MdUploadFile } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const PhotoUploader = ({ setPhoto, formik, photo }) => {
  // ============== UPLOAD PHOTOS BY PHOTO ==============
  const uploadPhotos = (e) => {
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
      .post("/upload-office", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: fileName } = response;
        setPhoto((prev) => {
          return [...prev, ...fileName];
        });
      });
  };

  const handleDeleteSurat = (fileName, e) => {
    e.preventDefault();
    setPhoto([...photo.filter((pict) => pict !== fileName)]);
    axios
      .delete(`/delete-office/${fileName}`)
      .then((response) => {
        if (response.status === 200) {
          // Jika penghapusan berhasil di server, hapus foto dari state di client
          const indexToDelete = photo.indexOf(fileName);
          if (indexToDelete !== -1) {
            photo.splice(indexToDelete, 1); // Menghapus item dari array
            setPhoto([...photo]); // Memperbarui state dengan array yang diperbarui
          }
        } else {
          console.error("Failed to delete photo on the server.");
        }
      })
      .catch((error) => {
        console.error("Error deleting photo: ", error);
      });
  };

  return (
    <div>
      {" "}
      <h2 className="text-2xl pt-4">Upload Photos Office</h2>
      <div className="grid gap-2 mt-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photo.map((link, idx) => (
          <div className="h-32 relative flex" key={idx}>
            <img
              className="rounded-2xl w-full object-cover"
              src={`http://localhost:4000/uploads/office/${link}`}
              alt="gedung"
            />
            <button
              onClick={(e) => handleDeleteSurat(link, e)}
              className=" absolute cursor-pointer bottom-2 right-2 text-white bg-black bg-opacity-60 p-2 rounded-2xl  "
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <label className="border h-32 cursor-pointer flex items-center justify-center gap-2 bg-transparent rounded-2xl p-5 text-2xl text-gray-600">
          <input
            type="file"
            className="hidden"
            name="photos"
            id="photos"
            onChange={uploadPhotos}
          />
          <MdUploadFile className="text-4xl" />
          Upload
        </label>
      </div>
      {/* ========PHOTO======== */}
    </div>
  );
};

export default PhotoUploader;
