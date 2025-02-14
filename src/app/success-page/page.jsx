"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import ticket from "../../../public/ticket.svg";
import Button from "../component/Button";
import Steps from "../component/Steps";
import { Road_Rage } from "next/font/google";
import barcode from "../../../public/barcode.svg";

const roadRage = Road_Rage({
subsets: ["latin"],
weight: "400",
display: "swap",
});

function Page() {
const router = useRouter();
const ticketRef = useRef(null);
const [formData, setFormData] = useState({
  name: "John Doe",
  email: "user@example.com",
  request: "Nil",
});

const [uploadImage, setUploadImage] = useState("");
const [ticketType, setTicketType] = useState("");
const [ticketCount, setTicketCount] = useState("");

useEffect(() => {
  setTicketType(localStorage.getItem("selectedTicket") || "N/A");
  setTicketCount(localStorage.getItem("selectedCount") || "0");
}, []);

useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
  if (savedData) {
    setFormData((prev) => ({
      ...prev,
      name: savedData.name || prev.name,
      email: savedData.email || prev.email,
      request: savedData.request || prev.request,
    }));
    setUploadImage(savedData.uploadImage || "");
  }
}, []);

const handleDownload = async () => {
  const element = ticketRef.current;
  const canvas = await html2canvas(element);
  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = data;
  link.download = "ticket.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

return (
  <div className="lg-w-[700px] md-w-[650px] w-365px mx-auto p-8 bg-darkBlue rounded-lg shadow-xl border border-bgBlue overflow-hidden ">
    <Steps title="Ready" step="3" progress="100%" />
    <div className="pt-4 text-center">
      <h1 className="text-white md-text-3xl text-xl font-semibold">
        Your Ticket is Booked!
      </h1>
      <p className="text-gray-400 mt-2 text-sm">
        Check your email for a copy or you can{" "}
        <span className=" font-semibold cursor-pointer">download</span>
      </p>
      <div
        className="relative w-[300px] h-[670px] mt-6 mx-auto overflow-hidden"
        ref={ticketRef}
      >
        <Image
          src={ticket}
          alt="ticket background"
          className=" mx-auto object-cover"
        />

        <div className="absolute inset-0 px-4 py-6 text-gray50 ">
          <div className="bg-[#031E21]/10 border border-[#24A0B5] rounded-lg w-[260px] mx-auto pb-4">
            <h2
              className={`${roadRage.className} text-2xl font-semibold text-center text-white mt-3`}
            >
              Techember Fest '25
            </h2>
            <p className="text-gray-400 text-xs">
              📍 04 Rumens road, Ikoyi, Lagos
            </p>
            <p className="text-gray-400 text-xs">
              📅 March 15, 2025 | 7:00 PM
            </p>

            {/* User avatar Image */}
            <div className="flex justify-center items-center mt-5 mb-2">
              {uploadImage ? (
                <img
                  src={uploadImage}
                  alt="User"
                  className="w-24 h-24 rounded-lg object-cover border-4 border-[#24A0B5]"
                />
              ) : (
                <div className="w-24 h-24 bg-black" />
              )}
            </div>

            {/* User's Details */}
            <div className="max-w-[250px] mx-auto bg-[#08343C] border-1 border-[#12464E] rounded-lg ">
              <div className=" p-2 text-sm text-left ">
                <div className="grid grid-cols-2 divide-x-2 divide-[#12464E] whitespace-break-spaces font-roboto border-1 border-[#12464E]">
                  <div className="p-2 border-b-2 border-[#12464E]">
                    <p className="text-gray text-sm mb-1">Name</p>
                    <div className="relative group">
                      <p className="text-white text-xs overflow-hidden text-ellipsis max-w-[120px] group-hover:whitespace-normal">
                        {formData.name}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 border-b-2 border-[#12464E]">
                    <p className="text-gray text-sm mb-1">Email</p>

                    <div className="relative group">
                      <p className="text-white text-xs overflow-hidden text-ellipsis max-w-[120px] group-hover:whitespace-normal">
                        {formData.email}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 border-b-2 border-[#12464E]">
                    <p className="text-gray text-sm mb-1">Ticket Type</p>
                    <div className="relative group">
                      <p className="text-white text-xs overflow-hidden text-ellipsis max-w-[120px] group-hover:whitespace-normal">
                        {ticketType}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 border-b-2 border-[#12464E]">
                    <p className="text-gray text-sm mb-1">Ticket Count</p>
                    <div className="relative group">
                      <p className="text-white text-xs overflow-hidden text-ellipsis max-w-[120px] group-hover:whitespace-normal">
                        {ticketCount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray text-sm mb-1">Special request?</p>
                  <p className="text-white text-xs">
                    {formData.request.length > 45
                      ? `${formData.request.substring(0, 45)}...`
                      : formData.request}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code  */}
      <div className="relative bottom-[180px] flex flex-col items-center mt-6">
        <div className="  rounded-md ">
          <Image src={barcode} alt={"bar code"} />
          {/* <QRCodeCanvas value={qrCodeData} size={80} /> */}
        </div>
      </div>
    </div>

    <div className="text-center -mt-32">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-2">
        <Button type="bookAnother" onClick={() => router.push("/")} />
        <Button type="download" onClick={handleDownload} />
      </div>
    </div>
  </div>
);
}

export default Page;
