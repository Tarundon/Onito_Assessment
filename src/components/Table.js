import React, { useState, useEffect, useRef } from "react";
import "datatables.net-dt/css/jquery.dataTables.css";
import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import $ from "jquery";
import axios from "axios";
import "./tableStyle.css";
import { Link } from "react-router-dom";

const UserDataTable = () => {
  const [data, setData] = useState([]);

  const tableRef = useRef();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    await axios
      .get("http://localhost:5000/register")
      .then((response) => {
        console.log(response?.data?.data?.user);
        setData(response?.data?.data?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const ageInMs = Date.now() - dobDate.getTime();
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(ageInYears);
  };

  const getFullAddress = (place, state, city, country, pinCode) => {
    const addressArr = [
      place || "",
      city || "",
      state || "",
      country || "",
      pinCode || "",
    ].filter(Boolean);
    return addressArr.join(", ");
  };

  useEffect(() => {
    if (data.length) {
      $(tableRef.current).DataTable();
    }
  }, [data]);


  return (
    <div className=" m-3">
      <div className="flex  mb-5 justify-start">
        <Link to={'/'}>
        <div className="mr-80 border-2 border-gray-600 text-orange-600 bg-white hover:bg-orange-600 font-semibold hover:text-white py-0.5 px-2 rounded">
          Back to User Registration
        </div>
        </Link>
        <div className=" text-center font-bold text-xl underline">
          User Details
        </div>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr className="bg-yellowish-green">
            <th>Name</th>
            <th>Age/Sex</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Govt ID</th>
            <th>Guardian Details</th>
            <th>Nationality</th>
          </tr>
        </thead>
        <tbody className="">
          {data &&
            data.map((item, index) => (
              <tr className="odd:bg-white even:bg-slate-200 " key={index}>
                <td>{item.name}</td>
                <td>
                  {calculateAge(item.dob)}Y/{item.gender.charAt(0).toUpperCase()}
                </td>
                <td>{item.mobile}</td>
                <td className="w-28">
                  {getFullAddress(
                    item.address,
                    item.city,
                    item.state,
                    item.country,
                    item.pincode
                  )}
                </td>
                <td>{item.govtIdNumber}</td>
                <td>
                  {item.guardianTitle} {item.guardianName}
                </td>
                <td>{item.nationality}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
