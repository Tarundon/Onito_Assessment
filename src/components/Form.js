import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { State, City } from "country-state-city";
import { formSchema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const [showPopup, setShowPopup] = useState(false);
 
  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name: data.name,
        DOB: data.DOB,
        gender: data.gender,
        mobile: data.mobile,
        govtIdType: data.govt_ID_type,
        govtIdNumber: data.govt_ID,
        guardianTitle: data["guardian-label"],
        guardianName: data["guardian-name"],
        country: data.country,
        state: data.state,
        city: data.city,
        address: data.address,
        pincode: data.pincode,
        nationality: data.nationality,
      });
      // console.log(response.data, "data saved");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      // console.log(error.message);
    }
   
    reset();
  };

 
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    getStateList();
  }, []);

  useEffect(() => {
    getCityList();
  }, [selectedState]);

  
  const getStateList = () => {
    const stateList = State.getStatesOfCountry("IN");
    setState(stateList);
  };

  const getCityList = () => {
    const cityList = City.getCitiesOfState("IN", selectedState);
    setCity(cityList);
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
  };
  const handleReset = () => {
    reset({
      name: "",
        DOB: "",
        gender: "",
        mobile: "",
        govt_ID_type: "",
        govt_ID: "",
        guardianTitle: "",
        guardianName: "",
        country: "",
        state: "",
        city: "",
        address: "",
        pincode: "",
        nationality:"",
        emergency_number: "",

    });
    setSelectedState("");
  };

  return (
    <>
      <div className="flex justify-between mt-2 ">
        <h1 className="font-bold text-2xl pl-5 underline">
          User Registration Form
        </h1>
        <div className="pr-5">
          <Link to={"userData"}>
            <button className="border-2 border-blue-500 text-blue-500 bg-white hover:bg-blue-700 hover:text-white font-bold py-1 px-2 rounded">
              User Details
            </button>
          </Link>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
        className="border rounded-md shadow-lg m-3 p-2"
      >
        <div className="m-2">
          <h2 className="font-bold underline">Personal Details</h2>
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className=" ">
              <label htmlFor="name" className="mr-3">
                Name <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                {...register("name")}
                className="border rounded-md p-0.5 bg-slate-100 text-center"
                placeholder="Enter Name"
                type="text"
                name="name"
                id="name"
              />
              {errors.name && (
                <p className="error text-red-600 text-center mr-14 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className=" ">
              <label htmlFor="DOB" className="mr-3">
                Date Of Birth <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                {...register("DOB")}
                className="border rounded-md p-0.5 bg-slate-100 text-center"
                placeholder="DD/MM/YY or Age in Years"
                type="date"
                name="DOB"
                id="DOB"
              />
              {errors.DOB && (
                <p className="error text-red-600 text-center text-sm">
                  {(errors.DOB.message = "Please enter your date of birth")}
                </p>
              )}
            </div>
            <div className=" ">
              <label htmlFor="gender" className="mr-3">
                Sex <span className="text-red-700 font-bold">*</span>
              </label>
              <select
                className="border rounded-md p-0.5 bg-slate-100  "
                {...register("gender")}
                name="gender"
                defaultValue=""
              >
                <option className="" value="" disabled>
                  Select gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>

              {errors.gender && (
                <p className="error text-red-600 ml-9 text-sm">
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div className=" ">
              <label htmlFor="mobile" className="mr-3">
                Mobile
              </label>
              <input
                {...register("mobile")}
                className="border rounded-md p-0.5 bg-slate-100 text-center"
                placeholder="Enter Mobile"
                type="number"
                name="mobile"
                id="mobile"
              />
              {errors.mobile && (
                <p className="error text-red-600 ml-16 text-sm">
                  {errors.mobile.message}
                </p>
              )}
            </div>
            <div className="">
              <label htmlFor="govt_ID" className="mr-3">
                Govt. ID
              </label>
              <select
                className="border rounded-md p-0.5 bg-slate-100"
                {...register("govt_ID_type")}
                name="govt_ID_type"
                defaultValue=""
              >
                <option value="" disabled>
                  select type
                </option>
                <option value="adhaar">Adhaar</option>
                <option value="pancard">Pan Card</option>
                <option value="voter_id">Voter ID</option>
                <option value="other">Other</option>
              </select>
              {/* {errors.govt_ID_type && (
                <p className="error text-red-600  text-sm">
                  {errors.govt_ID_type.message}
                </p>
              )} */}

              <input
                {...register("govt_ID")}
                className="border rounded-md p-0.5 bg-slate-100 ml-3 text-center"
                placeholder="Enter ID"
                type="text"
                name="govt_ID"
                id="govt_ID"
              />
               <div className="flex">
               {errors.govt_ID_type && (
                <p className="error text-red-600 text-center mr-2 ml-16 text-sm">
                  {errors.govt_ID_type.message}
                </p>
              )}
              {errors.govt_ID && (
                <p className="error text-red-600 text-center  text-sm">
                  {errors.govt_ID.message}
                </p>
              )}
               </div>
            </div>
          </div>
        </div>

        <div className="mx-2 my-4">
          <h2 className="font-bold underline">Contact Details</h2>
          <div className="grid grid-cols-3 mt-3 gap-4">
            <div className="">
              <label htmlFor="guardian-label">Guardian Details</label>
              <select
                {...register("guardian-label")}
                className="border rounded-md p-0.5 ml-2 bg-slate-100"
                name="guardian-label"
                id="guardian-label"
                defaultValue=""
              >
                <option value="" disabled>
                  Enter Label
                </option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
              </select>
              <input
                {...register("guardian-name")}
                className="border rounded-md p-0.5 bg-slate-100 ml-2 text-center w-4/12"
                placeholder="Guardian Name"
                type="text"
                name="guardian-name"
                id="guardian-name"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                className="border rounded-md p-0.5 bg-slate-100 ml-3 text-center"
                placeholder="Enter Email"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="emergency_number">Emergency Cont. Number</label>
              <input
                {...register("emergency_number")}
                className="border rounded-md p-0.5 bg-slate-100 ml-3 text-center"
                placeholder="Enter Number"
                type="number"
                name="emergency_number"
                id="emergency_number"
              />
              {errors.emergency_number && (
                <p className="error text-red-600 ml-9 text-sm">
                  {errors.emergency_number.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mx-2 my-4">
          <h2 className="font-bold underline">Address Details</h2>
          <div className="grid grid-cols-3 mt-3 gap-4">
            <div>
              <label htmlFor="address">Address</label>
              <input
                {...register("address")}
                placeholder="Enter Address"
                className="border rounded-md p-0.5 bg-slate-100 ml-2 text-center w-4/12"
                type="text"
                name="address"
                id="address"
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <select
                {...register("state")}
                name="state"
                className="border rounded-md p-0.5 ml-2 bg-slate-100"
                id="state"
                onChange={handleStateChange}
                defaultValue=""
              >
                <option value="" disabled selected>
                  Select State
                </option>
                {state &&
                  state.map((data, index) => {
                    return (
                      <option key={data.isoCode} value={data.isoCode}>
                        {data.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label htmlFor="city">City</label>
              <select
                {...register("city")}
                className="border rounded-md p-0.5 ml-2 bg-slate-100"
                name="city"
                id="city"
                defaultValue=""
              >
                <option value="" disabled selected>
                  Select City
                </option>
                {selectedState &&
                  city.map((data, index) => {
                    return (
                      <option key={data.isoCode} value={data.name}>
                        {data.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <select
                {...register("country")}
                className="border rounded-md p-0.5 ml-2 bg-slate-100"
                name="country"
                id="country"
              >
                <option value="India">India</option>
              </select>
            </div>
            <div>
              <label htmlFor="pincode">PinCode</label>
              <input
                {...register("pincode")}
                placeholder="Pincode"
                className="border rounded-md p-0.5 bg-slate-100 ml-2 text-center w-4/12"
                type="number"
                name="pincode"
                id="pincode"
              />
            </div>
          </div>
        </div>
        <div className="mx-2 my-4">
          <h2 className="font-bold underline">Other Details</h2>
          <div className="grid grid-cols-3 mt-3 gap-4">
            <div className="">
              <label htmlFor="occupation">Occupation</label>
              <input
                {...register("occupation")}
                placeholder="Enter Occupation"
                className="border rounded-md p-0.5 bg-slate-100 ml-2 text-center w-4/12"
                type="text"
                name="occupation"
                id="occupation"
              />
            </div>
            <div>
              <label htmlFor="religion">Religion</label>
              <select
                {...register("religion")}
                className="border rounded-md p-0.5 ml-2 bg-slate-100"
                name="religion"
                id="religion"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Religion
                </option>
                <option value="Hinduism">Hinduism</option>
                <option value="Islam">Islam</option>
                <option value="Sikhism">Sikhism</option>
                <option value="Buddhism">Buddhism</option>
                <option value="Jainism">Jainism</option>
                <option value="Christian">Christian</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="marital-status">Marital Status</label>
              <select
                {...register("marital-status")}
                className="border rounded-md p-0.5 ml-2 bg-slate-100"
                name="marital-status"
                id="marital-status"
                defaultValue=""
              >
                <option value="" disabled>
                  Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div>
              <label htmlFor="blood-group">Blood Group</label>
              <select
                {...register("blood-group")}
                className="border rounded-md p-0.5 ml-2 bg-slate-100"
                name="blood-group"
                id="blood-group"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div>
              <label htmlFor="nationality">Nationality</label>
              <select
                {...register("nationality")}
                className="border rounded-md p-0.5 ml-2 bg-slate-100"
                name="nationality"
                id="nationality"
                defaultValue=""
              >
                <option value="India">India</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            className="border-2 border-green-600 bg-white text-green-600 hover:bg-green-700   hover:text-white font-bold py-1 px-2 mr-4 rounded"
            type="submit"
          >
            SUBMIT
          </button>
          {showPopup && (
        <div className=" absolute bottom-12 right-10 mb-4 mr-4 bg-green-500 text-white px-2 py-1 shadow-lg border-none rounded">
          Data submitted successfully
        </div>)}
          <button
            className="border-2 border-rose-600 text-red-500 bg-white hover:bg-rose-700 hover:text-white font-bold py-1 px-2 rounded"
            type="reset"
          >
            CANCEL
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
