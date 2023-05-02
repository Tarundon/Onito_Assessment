import * as Yup from "yup";

const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

export const formSchema = Yup.object(
  {
    name: Yup.string().required("Name is required"),
    DOB: Yup.date().required(),
    gender: Yup.string().required("Gender is required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Mobile number is not valid"),
    emergency_number: Yup.string()
      .matches(phoneRegExp, "Emergency contact number is not valid"),
    govt_ID_type: Yup.string().required("ID type is required"),
    govt_ID: Yup.string().when("govt_ID_type", (govtIdType, schema) => {
      if (govtIdType.includes("adhaar")) {
        return schema
          .matches(/^\d{12}$/, "Govt Id should be a valid 12-digit numeric string");
      } else {
        return schema
          .matches(
            /^[a-zA-Z0-9]{10}$/,
            "Govt Id should be a valid 10-digit alpha-numeric string"
          );
      }
    })
  }
).required();

