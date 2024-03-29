import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PhotoUploader from "./PhotoUploader";
import { useDispatch } from "react-redux";
import { createdOffice, updateOffice } from "../../config/offices/officesThunk";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const InputOffice = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // INITIAL STATE
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState("");
  const [price, setPrice] = useState(0);
  const [catatan, setCatatan] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [isPaidOffice, setIsPaidOffice] = useState(false);
  const navigate = useNavigate();

  const notify = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/office/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setPhoto(data.photos);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.buka);
      setCheckOut(data.tutup);
      setMaxGuest(data.maxGuest);
      setPrice(data.price);
      setCatatan(data.catatan);
      setFasilitas(data.fasilitas);
      setIsPaidOffice(data.paidOffice);
    });
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title,
      address: address,
      photos: photo,
      description: description,
      extraInfo: extraInfo,
      buka: checkIn,
      tutup: checkOut,
      maxGuest: maxGuest,
      catatan: catatan,
      fasilitas: fasilitas,
      paidOffice: isPaidOffice,
      price: price,
    },
    // ======== SUBMIT DATA ===========
    onSubmit: (values, { resetForm }) => {
      if (id) {
        dispatch(updateOffice({ ...values, id }));
        resetForm();
        setPhoto([]);
        navigate("/offices");
        notify("Data Berhasil di Edit !");
      } else {
        dispatch(createdOffice(values));
        navigate("/offices");
        window.location.reload();
        notify("Data Berhasil di Tambahkan !");
        resetForm();
      }
    },
  });

  return (
    <div className="p-3">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl pt-4">Title</h2>
        <p className="text-gray-500 text-sm">
          Title to your office for bookings
        </p>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          placeholder="title for example:gedung arjuna, ejsc co-working-space"
          name="title"
          id="title"
          onChange={(e) => {
            formik.handleChange(e);
            setTitle(e.target.value);
          }}
          value={title}
        />
        <h2 className="text-2xl pt-4">Address</h2>
        <p className="text-gray-500 text-sm">
          Address to your office for bookings
        </p>
        <input
          type="text"
          placeholder="address"
          name="address"
          className="input input-bordered input-sm w-full"
          id="address"
          onChange={(e) => {
            formik.handleChange(e);
            setAddress(e.target.value);
          }}
          value={address}
        />

        {/* ========PHOTO======== */}
        <PhotoUploader formik={formik} setPhoto={setPhoto} photo={photo} />
        <h2 className="text-2xl pt-4">Description</h2>
        <p className="text-gray-500 text-sm">Description to your office</p>
        <textarea
          name="description"
          id="description"
          className="textarea textarea-bordered textarea-sm w-full"
          onChange={(e) => {
            formik.handleChange(e);
            setDescription(e.target.value);
          }}
          value={description}
        />
        <h2 className="text-2xl pt-4">Ekstra Info Kegiatan</h2>
        <textarea
          name="extraInfo"
          id="extraInfo"
          className="textarea textarea-bordered textarea-sm w-full"
          onChange={(e) => {
            formik.handleChange(e);
            setExtraInfo(e.target.value);
          }}
          value={extraInfo}
        />
        <h2 className="text-2xl pt-4">Fasilitas</h2>
        <textarea
          name="fasilitas"
          id="fasilitas"
          className="textarea textarea-bordered textarea-sm w-full"
          onChange={(e) => {
            formik.handleChange(e);
            setFasilitas(e.target.value);
          }}
          value={fasilitas}
        />
        <h2 className="text-2xl pt-4">Catatan Tambahan</h2>
        <textarea
          name="catatan"
          id="catatan"
          className="textarea textarea-bordered textarea-sm w-full"
          onChange={(e) => {
            formik.handleChange(e);
            setCatatan(e.target.value);
          }}
          value={catatan}
        />
        <h2 className="text-2xl py-4">Penyewaan Berbayar ?</h2>
        <div>
          <input
            type="checkbox"
            checked={isPaidOffice}
            onChange={(e) => setIsPaidOffice(e.target.checked)}
            className="checkbox checkbox-md"
          />
        </div>
        <h2 className="text-2xl pt-4">Jam Buka & Jam Tutup</h2>

        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Buka</h3>
            <input
              type="time"
              className="input input-bordered input-sm w-full"
              name="checkIn"
              id="checkIn"
              onChange={(e) => {
                formik.handleChange(e);
                setCheckIn(e.target.value);
              }}
              value={checkIn}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Tutup</h3>
            <input
              type="time"
              className="input input-bordered input-sm w-full"
              name="checkOut"
              id="checkOut"
              onChange={(e) => {
                formik.handleChange(e);
                setCheckOut(e.target.value);
              }}
              value={checkOut}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Kapasitas Maksimal</h3>
            <input
              type="number"
              className="input input-bordered input-sm w-full"
              name="maxGuest"
              id="maxGuest"
              onChange={(e) => {
                formik.handleChange(e);
                setMaxGuest(e.target.value);
              }}
              value={maxGuest}
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Harga Sewa</h3>
            <input
              type="number"
              name="price"
              className="input input-bordered input-sm w-full"
              id="price"
              onChange={(e) => {
                formik.handleChange(e);
                setPrice(e.target.value);
              }}
              value={price}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-info text-white w-full py-2 rounded-full my-4"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default InputOffice;
