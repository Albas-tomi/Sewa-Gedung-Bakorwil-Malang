import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const sendEmail = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      await emailjs.sendForm(
        "service_s3n1ppe",
        "template_bhcovvt",
        form.current,
        "XeSkKCtKDKKBnm10x"
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil mengrimkan pesan",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();

      console.log("success", form.current);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.log("gagal", error.message);
    }
  };
  if (loading) {
    return (
      <div className="w-full flex h-screen items-center justify-center first-letter:">
        <span className="loading loading-bars text-blue-400  w-1/12"></span>
      </div>
    );
  }
  return (
    <>
      <div className="text__contact__us  mt-5 flex justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 font-face-ro-bold">
          Contact Us
        </h1>
      </div>
      <div className="tim__kami flex justify-center items-center">
        <h1 className="text-xl mb-4 font-face-ro-med">
          Tim kami akan sangat senang untuk bisa membantu anda
        </h1>
      </div>
      <div className="contact_us flex justify-center items-center">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-4 p-4"
        >
          <div className="name grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="relative">
              <label
                htmlFor="namaDepan"
                className="label__name absolute -top-3 left-2 bg-white px-1 font-face-ro"
              >
                Nama Depan
              </label>
              <input
                type="text"
                id="namaDepan"
                name="namaDepan"
                className="w-full p-1 border border-gray-300 rounded font-face-ro"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="namaBelakang"
                className="label__name absolute -top-3 left-2 bg-white px-1 font-face-ro"
              >
                Nama Belakang
              </label>
              <input
                type="text"
                id="namaBelakang"
                name="namaBelakang"
                className="w-full p-1 border border-gray-300 rounded font-face-ro"
              />
            </div>
          </div>
          <div className="grid gap-12">
            <div className="relative">
              <label
                htmlFor="email"
                className="label__name absolute -top-3 left-2 bg-white px-1 font-face-ro"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                rows="4"
                className="w-full p-1 border border-gray-300 rounded font-face-ro"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="message"
                className="label__name absolute -top-3 left-2 bg-white px-1 font-face-ro"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-1 border border-gray-300 rounded font-face-ro"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-md col-span-12 sm:col-span-12 text-white px-4 py-2 bg-blue-600"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
      <hr />
    </>
  );
};

export default ContactUs;
