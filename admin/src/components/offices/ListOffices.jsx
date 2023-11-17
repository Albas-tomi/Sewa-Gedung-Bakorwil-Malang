import React, { useCallback, useEffect } from "react";
import {
  deleteOffice,
  retrieveOffices,
  updateOffice,
} from "../../config/offices/officesThunk";
import {
  useOfficesSelector,
  useOfficesTypeSelector,
} from "../../config/offices/officesSelector";
import { formatRupiah } from "../../../rpFormatter";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ListOffices = () => {
  const dataOffices = useOfficesSelector();
  const officeType = useOfficesTypeSelector();
  const dispatch = useDispatch();

  const handleDeleteOffice = useCallback((id) => {
    dispatch(deleteOffice({ id }));
    window.location.reload();
  });
  useEffect(() => {
    dispatch(retrieveOffices());
  }, []);
  useEffect(() => {
    if (officeType === updateOffice.fulfilled.type) {
      dispatch(retrieveOffices());
    }
  }, [officeType]);
  return (
    <div>
      <table className="table w-full text-center">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Ruangan</th>
            <th>Jam Aktif</th>
            <th>Informasi Ruangan</th>
            <th>Maksimal Guest</th>
            <th>Harga Sewa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataOffices.map((data, idx) => (
            <tr key={data._id}>
              <td>{(idx += 1)}</td>
              <td>{data.title}</td>
              <td>
                {data.buka} - {data.tutup}
              </td>
              <td className="">
                <span className="text-xs line-clamp-2 max-w-lg font-bold">
                  {data.extraInfo}
                </span>
              </td>
              <td className="font-bold text-lg">{data.maxGuest}</td>
              <td>{formatRupiah(data.price)}</td>
              <td className="flex gap-2 items-center">
                <Link to={`/form-offices/${data._id}`}>
                  <button className="btn btn-outline btn-warning btn-xs">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteOffice(data._id)}
                  className="btn btn-outline btn-error btn-xs"
                >
                  Hapus
                </button>

                <button className="btn btn-outline btn-info btn-xs">
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOffices;
