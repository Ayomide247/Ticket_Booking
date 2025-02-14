// TICKET TYPES

// import { FaChevronDown } from "react-icons/fa";
// import FormProgress from "../FormProgress";
// import { useTicket } from "../TicketContext";
// import TicketSelection from "../TicketSelection";

// const TicketType = () => {
//   const { selectedOption, ticketStore, setTicketStore } = useTicket();

//   // const {} = useTi

//   const handleSelectChange = (event) => {
//     setTicketStore((prevState) => {
//       return {
//         ...prevState,
//         ticket: {
//           ...prevState.ticket,
//           no_of_tickets: event.target.value,
//         },
//         error: {
//           ...prevState.error,
//           num_of_ticket: "",
//         },
//       };
//     });
//   };

//   const handleSubmit = () => {
//     if (ticketStore?.ticket?.type?.id === null) {
//       setTicketStore((prevState) => {
//         return {
//           ...prevState,
//           error: {
//             ...prevState.error,
//             ticket_type: "please select ticket type",
//           },
//         };
//       });
//       return;
//     }
//     if (ticketStore?.ticket?.no_of_tickets) {
//       setTicketStore((prevState) => {
//         return {
//           ...prevState,
//           error: {
//             ...prevState.error,
//             num_of_ticket: "please select number of ticket",
//           },
//         };
//       });
//       return;
//     }
//     setTicketStore((prevState) => {
//       return {
//         ...prevState,
//         formSteps: 2,
//       };
//     });
//   };

//   // console.log(ticketStore);
//   return (
//     <div className="py-10 px-36">
//       <div className="bg-prime border-1 border-secondary rounded-2xl  p-10 shadow-lg">
//         {/* Form Progress */}
//         <FormProgress />

//         <section className="flex flex-col border-1 border-secondary rounded-2xl  p-5 bg-secondary/20">
//           <section className="flex flex-col items-center border-1 border-secondary rounded-2xl  py-5 px-14 bg-secondary/50  gap-5 shadow-lg w-full">
//             <h1 className="font-road text-[36px]">Techember Fest ”25</h1>
//             <p className="text-center font-roboto">
//               Join us for an unforgettable experience at <br /> Techember Fest
//               ”25! Secure your spot now.
//             </p>
//             <div className="flex gap-3">
//               <div className="flex">
//                 <span>📍 </span>
//                 <p> 04 Rumens road, Ikoyi, Lagos</p>
//               </div>
//               <div className="flex gap-3">
//                 <div> | |</div>
//                 <div>March 15, 2025 | 7:00 PM</div>
//               </div>
//             </div>
//           </section>

//           <div className=" border-2 border-secondary w-full rounded-lg my-7"></div>
//           <section className="w-full">
//             <h5>Select Ticket Type:</h5>

//             <TicketSelection className="w-full" />
//           </section>
//           <section className="relative mt-5 w-full ">
//             <h5>Number Of Tickets:</h5>

//             <select
//               className="appearance-none w-full border border-secondary rounded-md py-2 px-10 mt-2"
//               value={ticketStore?.ticket?.no_of_tickets}
//               onChange={handleSelectChange}
//             >
//               <option value="">Select...</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//             </select>
//             <FaChevronDown className="absolute right-10 top-11 w-5 h-5 pointer-events-none text-pure" />
//           </section>
//           <span className="block mt-1 text-sm text-red-400">
//             {ticketStore?.error?.num_of_ticket}
//           </span>

//           <section className="flex w-full gap-5 mt-5 ">
//             <button className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105">
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className=" text-center border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
//             >
//               Next
//             </button>
//           </section>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default TicketType;

// ATTENDDEE FORM
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { MdOutlineCloudDownload } from "react-icons/md";
// import FormProgress from "../../components/FormProgress";
// import FormValidation from "../../components/FormValidation";
// import { BiLoader } from "react-icons/bi";

// const AttendeeDetails = () => {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState("");
//   const imageInputRef = useRef(null);

//   useEffect(() => {
//     const savedImage = localStorage.getItem("uploadedImage");
//     if (savedImage) {
//       setUploading(false);
//       setUploadedUrl(savedImage);
//     }
//   }, []);

//   const handleRemove = () => {
//     setUploadedUrl("");
//     localStorage.removeItem("uploadedImage");
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleUpload = async () => {
//     if (!image) {
//       alert("Please select an image first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "my_cloud_preset");

//     try {
//       setUploading(true);
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dkxodnyv3/image/upload",
//         formData
//       );

//       const imageUrl = response.data.secure_url;
//       setUploadedUrl(imageUrl);
//       localStorage.removeItem("uploadedImage");
//       localStorage.setItem("uploadedImage", imageUrl);
//       // setUploading(false);
//       // alert("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Upload error:", error);
//       setUploading(false);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // console.log(uploading);
//   useEffect(() => {
//     if (image) {
//       handleUpload();
//       setImage(null);
//     }
//   }, [image]);

//   return (
//     <div className="py-10 px-36">
//       <div className="bg-prime border-1 border-secondary rounded-2xl  p-10 shadow-lg">
//         <FormProgress />

//         <section className=" flex flex-col items-center border-1 border-secondary rounded-2xl  p-5 bg-secondary/20 ">
//           <section className="flex flex-col  border-1 border-secondary rounded-2xl  p-14 bg-prime gap-5 shadow-lg w-full">
//             <h5>Upload Profile Photo</h5>
//             <div className="grou cursor-pointer relative flex flex-col items-center bg-primary h-[150px]">
//               <div
//                 className="absolute -top-5 grid place-content-center gap-7 bg-[#07373F]/100 rounded-2xl text-center border-2 border-lightPrimary font-roboto text-[14px] mt-2 shadow-lg w-[200px] h-[11rem]"
//                 onClick={() => {
//                   imageInputRef.current.click();
//                 }}
//               >
//                 <div className="opacity-100 flex flex-col items-center">
//                   <input
//                     className="hidden"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     // onDragEnter={handleImageChange}
//                     // onDragLeave={handleImageChange}
//                     ref={imageInputRef}
//                   />

//                   <MdOutlineCloudDownload
//                     onClick={handleUpload}
//                     className="text-[24px] font-semibold"
//                     disabled={uploading}
//                   />
//                   <span className="text-center ">
//                     Drag & drop or click to <br /> upload
//                   </span>
//                   {/* {uploading ? "Uploading..." : ""} */}

//                   {/* {uploadedUrl && (
//                     <div onClick={handleRemove} className="mt-3">
//                       <p>Uploaded Image:</p>

//                       <img src={uploadedUrl} alt="Uploaded" className="w-32" />
//                     </div>
//                   )} */}
//                 </div>
//                 <div className="group">
//                   <div
//                     className={`${
//                       uploading === true && "bg-[#0e464f] opacity-100 z-40"
//                     } absolute -left-1 -top-1 w-[202px] h-[11.5rem] object-cover border-1 border-black rounded-2xl grid place-content-center opacity-0`}
//                   >
//                     <BiLoader size={30} className="animate animate-spin" />
//                   </div>
//                   {uploadedUrl && (
//                     <img
//                       src={uploading ? preview : uploadedUrl}
//                       alt=""
//                       className="absolute left-0 top-0 rounded-2xl w-[200px] h-[11rem] object-cover z-10"
//                     />
//                   )}
//                   {/* group-hover:transition-all group-hover:ease-in-out group-hover:duration-500 group-hover:opacity-100 */}
//                   <div
//                     className={`${
//                       uploadedUrl &&
//                       "group-hover:opacity-50 group-hover:transition-all group-hover:ease-in-out group-hover:duration-500"
//                     } bg-black w-[200px] h-[11rem] grid place-content-center absolute left-0 top-0 opacity-0 rounded-2xl`}
//                   ></div>
//                   <div
//                     className={`opacity-0 ${
//                       uploadedUrl &&
//                       "group-hover:opacity-100 group-hover:transition-all group-hover:ease-in-out group-hover:duration-500"
//                     } flex flex-col items-center justify-center absolute left-0 top-0 rounded-2xl w-[200px] h-[11rem]`}
//                   >
//                     <MdOutlineCloudDownload
//                       onClick={handleUpload}
//                       className="text-[24px] font-semibold"
//                       disabled={uploading}
//                     />
//                     <span className="text-center ">
//                       Drag & drop or click to <br /> upload
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <div className=" border-2 border-secondary w-full rounded-lg my-7"></div>
//           <section className="w-full">
//             <FormValidation />
//           </section>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AttendeeDetails;

// MY TICKET
// import { barCode, user } from "../../assets";
// import FormProgress from "../../components/FormProgress";
// import { useTicket } from "../TicketContext";
// const savedImage = localStorage.getItem("uploadedImage");
// const MyTicket = () => {
//   const { ticketStore, setTicketStore, resetBooking } = useTicket();

//   const handleReset = () => resetBooking();
//   return (
//     <div className="py-10 px-36">
//       <div className="bg-prime border-1 border-secondary rounded-2xl  p-10 shadow-lg ">
//         <FormProgress />

//         <section className=" flex flex-col items-center border-1 border-secondary rounded-2xl  p-5 bg-secondary/20">
//           <section className="flex flex-col items-center ">
//             <h2 className="text-[32px]">Your Ticket is Booked!</h2>
//             <p className="text-[16px]">
//               Check your email for a copy or you can{" "}
//               <span className="font-bold">download</span>
//             </p>
//           </section>
//           <section class="ticket-container flex flex-col items-center max-w-full h-auto mx-auto mt-5">
//             <div className=" w-[450px] flex flex-col items-center  p-5 ">
//               <div className="w-[75%] h-[] border-1 border-lightPrimary rounded-2xl p-3">
//                 <div className="flex flex-col items-center gap-2">
//                   <h1 className="text-[26px]">Techember Fest ”25</h1>
//                   <p className="text-[12px]">📍 04 Rumens road, Ikoyi, Lagos</p>
//                   <p className="text-[12px]">📅 March 15, 2025 | 7:00 PM</p>

//                   <img
//                     src={savedImage ? savedImage : user}
//                     alt="user"
//                     className="my-3 h-40 w-40 object-cover bg-[#07373F]/100 rounded-2xl border-2 border-lightPrimary  mt-2 shadow-lg "
//                   />
//                 </div>

//                 <div className="w-full h-[43%] mx-auto p-4 bg-[#122024] rounded-2xl border border-[#2A3B3D] text-white">
//                   <div className="grid grid-cols-2 gap-4 border-b border-[#2A3B3D] pb-3 relative">
//                     <div>
//                       <p className="text-gray-400">Name</p>
//                       <p className="font-bold text-[.7rem]">
//                         {` ${ticketStore?.ticket?.user?.name}`}
//                       </p>
//                     </div>
//                     <div className="relative">
//                       <p className="text-gray-400">Email</p>
//                       <p className="font-bold text-white text-[.6rem]">
//                         {ticketStore?.ticket?.user?.email}
//                       </p>
//                     </div>

//                     <div className="absolute inset-y-0 left-1/2 w-px bg-[#2A3B3D]"></div>
//                   </div>

//                   <dizv className="grid grid-cols-2 gap-4 border-b border-[#2A3B3D] py-3 relative">
//                     <div>
//                       <p className="text-gray-400">Ticket Type:</p>
//                       <p className="font-bold">
//                         {ticketStore?.ticket?.type?.name}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-400">Ticket for :</p>
//                       <p className="font-bold ">
//                         {ticketStore?.ticket?.no_of_tickets}
//                       </p>
//                     </div>

//                     <div className="absolute inset-y-0 left-1/2 w-px bg-[#2A3B3D]"></div>
//                   </dizv>

//                   <div className="pt-3 ">
//                     <p className="text-gray-400">Special request?</p>
//                     <p className="text-sm text-white  overflow-auto h-[40px] ">
//                       {ticketStore?.ticket?.user?.message}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="relative top-15">
//               <img src={barCode} alt="" />
//             </div>
//           </section>
//           <section className="flex w-full gap-5 mt-5 ">
//             <button
//               className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
//               onClick={handleReset}
//             >
//               Cancel
//             </button>
//             <button className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105">
//               Next
//             </button>
//           </section>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default MyTicket;

// FORM VALIDATION
//  <form
//    onSubmit={handleSubmit}
//    className="w-full mx-auto py-6 text-pure shadow-lg rounded-lg space-y-4"
//  >
//    <div>
//      <label>Enter Your Name:</label>
//      <Field
//        type="text"
//        name="name"
//        className="mt-1 block w-full p-2 border border-secondary rounded-lg bg-prime active:bg-secondary"
//      />
//      <ErrorMessage name="name" component="div" className="text-red-500" />
//    </div>

//    <div>
//      <label> Enter your email address</label>
//      <Field
//        type="email"
//        name="email"
//        placeholder="you@example.com"
//        className="mt-1 block w-full p-2 border border-secondary rounded-lg bg-prime active:bg-secondary"
//      />
//      <ErrorMessage name="email" component="div" className="text-red-500" />
//    </div>

//    <div>
//      <label>Message:</label>
//      <Field
//        as="textarea"
//        name="message"
//        rows="4"
//        className="mt-1 block w-full p-2 border rounded-lg"
//      />
//      <ErrorMessage name="message" component="div" className="text-red-500" />
//    </div>
//    <section className="flex w-full gap-5 mt-5 ">
//      <button
//        type="button"
//        className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
//      >
//        Cancel
//      </button>
//      <button
//        type="submit"
//        disabled={isSubmitting}
//        className="text-center border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
//      >
//        {isSubmitting ? "Submitting..." : "Submit"}
//      </button>
//    </section>
//  </form>;


// NAVBAR

// import React from "react";
// import { Hugeicons, TiczLogo } from "../assets";
// import { LuTicket } from "react-icons/lu";
// import { BsArrowRight } from "react-icons/bs";
// import { useTicket } from "./TicketContext";

// const Navbar = () => {
//   const { ticketStore } = useTicket();

//   return (
//     <div className="flex justify-between items-center border-1 border-secondary rounded-2xl p-2 shadow-lg bg-prime">
//       <div className="flex items-center gap-2">
//         <div className="bg-secondary p-2 mt-1 rounded-lg">
//           <LuTicket />
//         </div>
//         <img src={TiczLogo} alt="Logo" />
//       </div>
//       <div className=" hidden md:flex gap-5 text-accent">
//         <a href="#" className={ticketStore?.formSteps !== 3 && "text-white"}>
//           Events
//         </a>
//         <a href="#" className={ticketStore?.formSteps === 3 && "text-white"}>
//           My Ticket
//         </a>
//         <a href="#">About Project</a>
//       </div>
//       <div className="flex items-center gap-1 bg-pure rounded-lg text-[#0A0C11] font-thin py-2 px-4 cursor-pointer hover:bg-lightPrimary hover:text-pure transition ease-in duration-400">
//         <button className="w-full cursor">My Ticket </button>
//         <BsArrowRight className="text-[26px]" />
//       </div>
//     </div>
//   );
// };

// export default Navbar;




import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useTicket } from "./TicketContext";
import { PaystackButton } from "react-paystack";

const FormValidation = () => {
  const { ticketStore, setTicketStore } = useTicket();
  const publicKey = "pk_test_30935254e277d16e13b3b46de0616a73647b8f34";

  const bookingBtnRef = useRef(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string(),
    // .required("Message is required"),
  });
  console.log(ticketStore?.ticket);

  const handleNext = (data) => {
    const { name, email, message } = data?.data;
    return setTicketStore((prevState) => {
      return {
        ...prevState,
        formSteps: 3,
        ticket: {
          ...prevState.ticket,
          user: {
            ...prevState.ticket.user,
            name,
            email,
            message,
          },
        },
      };
    });
  };

  const componentProps = {
    email: ticketStore?.ticket?.user?.email || "bayomide247@gmail.com",
    amount: ticketStore?.ticket?.type?.price?.split("$")?.[1] * 100,
    metadata: {
      name: ticketStore?.ticket?.user?.name,
      // phoneNumber,
    },
    publicKey,
    // text: "Book Now",
    onSuccess: () =>
      handleNext({
        data: {
          name: ticketStore?.ticket?.user?.name,
          email: ticketStore?.ticket?.user?.email,
          message: ticketStore?.ticket?.user?.message,
        },
        step: 3,
      }),
    // localStorage.clear(),
    // navigate("/"),
    // window.location.reload()
    onClose: () => alert("Are you sure you want to close?"),
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { name, email, message } = values;
          if (ticketStore?.ticket?.user?.photo === "") {
            setTicketStore((prevState) => {
              return {
                ...prevState,
                error: {
                  ...prevState.error,
                  photo: "Photo is required",
                },
              };
            });
            setSubmitting(false);
            return;
          }
          setSubmitting(false);
          if (ticketStore?.ticket?.type?.price?.toLowerCase() === "free") {
            handleNext({ data: { ...values }, step: 3 });
            return;
          }
          bookingBtnRef.current.click();
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full mx-auto py-6 text-pure shadow-lg rounded-lg space-y-4"
            data-testid="form"
          >
            <div>
              <label>Enter Your Name:</label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full p-2 border border-secondary rounded-lg bg-prime active:bg-secondary"
                data-testid="name-field"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
                data-testid="name-error"
              />
            </div>

            <div>
              <label> Enter your email address</label>
              <Field
                type="email"
                name="email"
                placeholder="you@example.com"
                className="mt-1 block w-full p-2 border border-secondary rounded-lg bg-prime active:bg-secondary"
                data-testid="email-field"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
                data-testid="email-error"
              />
            </div>

            <div>
              <label>Message:</label>
              <Field
                as="textarea"
                name="message"
                rows="4"
                className="mt-1 block w-full p-2 border rounded-lg"
                data-testid="message-field"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500"
                data-testid="message-error"
              />
            </div>
            <section className="flex w-full gap-5 mt-5">
              <button
                type="button"
                className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
                data-testid="cancel-button"
                onClick={() => {
                  setTicketStore((prevState) => {
                    return {
                      ...prevState,
                      formSteps: 1,
                    };
                  });
                }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-center border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
                data-testid="submit-button"
                // onClick={() => {
                //   bookingBtnRef.current.click();
                // }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </section>
          </form>
        )}
      </Formik>
      <PaystackButton
        className=""
        {...componentProps}
        children={
          <span
            className="text-white font-semibold cursor-pointer hidden"
            ref={bookingBtnRef}
          >
            Free Book Now
          </span>
        }
        // onClick={handleClick()}
      />
    </>
  );
};

export default FormValidation;
