import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import FormProgress from "../../components/FormProgress";
import FormValidation from "../../components/FormValidation";
import { BiLoader } from "react-icons/bi";
import { useTicket } from "../TicketContext";

const AttendeeDetails = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const imageInputRef = useRef(null);

  const { ticketStore, setTicketStore } = useTicket();

  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setUploading(false);
      setUploadedUrl(savedImage);
    }
  }, []);

  const handleRemove = () => {
    setUploadedUrl("");
    localStorage.removeItem("uploadedImage");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_cloud_preset");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkxodnyv3/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      setTicketStore((prevState) => {
        return {
          ...prevState,
          ticket: {
            ...prevState.ticket,
            user: {
              ...prevState.ticket.user,
              photo: imageUrl,
            },
          },
          error: {
            ...prevState.error,
            photo: "",
          },
        };
      });
      setUploadedUrl(imageUrl);
      localStorage.removeItem("uploadedImage");
      localStorage.setItem("uploadedImage", imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (image) {
      handleUpload();
      setImage(null);
    }
  }, [image]);

  return (
    <div className=" py-5 lg:py-10 lg:px-36" data-testid="attendee-details">
      <div className="bg-prime border-1 border-secondary rounded-2xl p-2 md:p-10 shadow-lg">
        <FormProgress data-testid="form-progress" />

        <section className="flex flex-col items-center border-1 border-secondary rounded-2xl p-5 bg-secondary/20">
          <section className="flex flex-col border-1 border-secondary rounded-2xl p-14 bg-prime gap-5 shadow-lg w-full">
            <h5 data-testid="upload-title">Upload Profile Photo</h5>
            <div
              className="cursor-pointer relative flex flex-col items-center bg-primary h-[150px]"
              data-testid="upload-container"
            >
              <div
                className={`${
                  ticketStore?.error?.photo && "border-red-400"
                } absolute -top-5 grid place-content-center gap-7 bg-[#07373F]/100 rounded-2xl text-center border-2 border-lightPrimary font-roboto text-[14px] mt-2 shadow-lg w-[200px] h-[11rem]`}
                onClick={() => imageInputRef.current.click()}
                data-testid="upload-box"
              >
                <div className="opacity-100 flex flex-col items-center">
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={imageInputRef}
                    data-testid="file-input"
                  />
                  <MdOutlineCloudDownload
                    onClick={handleUpload}
                    className="text-[24px] font-semibold"
                    disabled={uploading}
                    data-testid="upload-icon"
                  />
                  <span className="text-center block mt-2">
                    Drag & drop or click <br /> to upload
                  </span>
                </div>
                <div className="group">
                  <div
                    className={`${
                      uploading === true && "bg-[#0e464f] opacity-100 z-40"
                    } absolute -left-1 -top-1 w-[202px] h-[11.5rem] object-cover border-1 border-black rounded-2xl grid place-content-center opacity-0`}
                    data-testid="uploading-overlay"
                  >
                    <BiLoader size={30} className="animate animate-spin" />
                  </div>
                  {uploadedUrl && (
                    <img
                      src={uploading ? preview : uploadedUrl}
                      alt="Uploaded"
                      className="absolute left-0 top-0 rounded-2xl w-[200px] h-[11rem] object-cover z-10"
                      data-testid="uploaded-image"
                    />
                  )}
                </div>
              </div>
            </div>
            <span className="text-sm text-red-400">
              {ticketStore?.error?.photo}
            </span>
          </section>
          <div className="border-2 border-secondary w-full rounded-lg my-7"></div>
          <section className="w-full">
            <FormValidation data-testid="form-validation" />
          </section>
        </section>
      </div>
    </div>
  );
};

export default AttendeeDetails;
