import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import FormProgress from "../components/FormProgress";
import FormValidation from "../components/FormValidation";
import Navbar from "../components/Navbar";

const AttenddeDetails = () => {
  const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const imageInputRef = useRef(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
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

    setUploading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_cloud_preset");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkxodnyv3/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      setUploadedUrl(imageUrl);

      localStorage.setItem("uploadedImage", imageUrl);

      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="w-full bg-primary py-10 px-48 text-[#FFFFFF] ">
      <Navbar />

      <div className="py-10 px-36">
        <div className="bg-prime border-1 border-secondary rounded-2xl  p-10 shadow-lg">
          <FormProgress />

          <section className=" flex flex-col items-center border-1 border-secondary rounded-2xl  p-5 bg-secondary/20 ">
            <section className="flex flex-col  border-1 border-secondary rounded-2xl  p-14 bg-prime gap-5 shadow-lg w-full">
              <h5>Upload Profile Photo</h5>
              <div className=" relative flex flex-col items-center bg-primary h-[150px]">
                <div
                  className="absolute -top-5 grid place-content-center gap-7 bg-[#07373F]/100 rounded-2xl text-center  border-2 border-lightPrimary font-roboto text-[14px] mt-2 shadow-lg w-[200px] h-[11rem]"
                  onClick={() => {
                    imageInputRef.current.click();
                  }}
                >
                  <div className="flex flex-col items-center">
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={imageInputRef}
                    />

                    <MdOutlineCloudDownload
                      onClick={handleUpload}
                      className="text-[24px] font-semibold"
                      disabled={uploading}
                    />
                    <span className="text-center ">
                      Drag & drop or click to <br /> upload
                    </span>
                    {uploading ? "Uploading..." : ""}

                    {uploadedUrl && (
                      <div onClick={handleRemove} className="mt-3">
                        {/* <p>Uploaded Image:</p> */}

                        <img
                          src={uploadedUrl}
                          alt="Uploaded"
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <div className=" border-2 border-secondary w-full rounded-lg my-7"></div>
            <section className="w-full">
              <FormValidation />
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AttenddeDetails;
