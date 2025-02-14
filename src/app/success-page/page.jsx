"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

import ticket from "../../../public/ticket.svg";
import user from "../../../public/user.png";
import Button from "../component/Button";
import Steps from "../component/Steps";
import { Road_Rage } from "next/font/google";

const roadRage = Road_Rage({
subsets: ["latin"],
weight: "400",
display: "swap",
});

function Page() {
const router = useRouter();
const [formData, setFormData] = useState({
  name: "John Doe",
  email: "user@example.com",
  request: "Nil",
});

const [uploadImage, setUploadImage] = useState("");
const [ticketData, setTicketData] = useState({ type: "", count: 0 });

useEffect(() => {
  const savedData = JSON.parse(localStorage.getItem("ticketData") || "{}");
  if (savedData.type && savedData.count) {
    setTicketData(savedData);
  }
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

// Generate ticket details as QR Code data
const qrCodeData = JSON.stringify({
  name: formData.name,
  email: formData.email,
  ticketType: ticketData.type,
  ticketCount: ticketData.count,
});

return (
  <div className="w-[700px] mx-auto p-8 bg-darkBlue rounded-lg shadow-xl border border-bgBlue text-center">
    <Steps title="Ready" step="3" progress="100%" />
    <div className="pt-4">
      <h1 className="text-white text-3xl font-semibold">
        Your Ticket is Booked!
      </h1>
      <p className="text-gray-400 mt-2 text-sm">
        Check your email for a copy or you can{" "}
        <span className=" font-semibold cursor-pointer">download</span>
      </p>

      {/* Ticket selection Section */}
      <div className="relative mt-6">
        <Image
          src={ticket}
          alt="ticket background"
          className="w-[300px] h-[600px] mx-auto object-cover"
        />

        <div className="absolute inset-0 px-4 py-6 text-gray50">
          <div className="bg-[#031E21]/10 border border-[#24A0B5] rounded-lg w-[260px] mx-auto">
            <h2
              className={`${roadRage.className} text-lg font-semibold text-center text-gray50 mt-5`}
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
            <div className="flex justify-center items-center mt-5">
              {uploadImage ? (
                <img
                  src={uploadImage}
                  alt="User"
                  className="w-24 h-24 rounded-lg object-cover border-4 border-[#24A0B5]"
                />
              ) : (
                <Image
                  src={user}
                  alt="avatar"
                  className="w-24 h-24 object-cover"
                />
              )}
            </div>

            {/* User's Details */}
            <div className="mt-4 p-4 rounded-lg text-sm bg-[#08343C] border border-[#12464E] w-[232px] mx-auto text-left mb-6 ">
              <div className="grid grid-cols-2 divide-x-2 divide-[#12464E] whitespace-break-spaces">
                <div className="p-2 border-b-2 border-[#12464E]">
                  <p className="text-white text-[10px]">Name</p>
                  <p className="text-gray50 text-xs whitespace-break-spaces">
                    {formData.name}
                  </p>
                </div>
                <div className="p-2 border-b-2 border-[#12464E]">
                  <p className="text-white text-[10px]">Email</p>
                  <p className="text-gray50 text-xs whitespace-normal">
                    {formData.email}
                  </p>
                </div>
                <div className="p-2 border-b-2 border-[#12464E]">
                  <p className="text-white text-[10px]">Ticket Type</p>
                  <p className="text-gray50 text-xs">{ticketData.type}</p>
                </div>
                <div className="p-2 border-b-2 border-[#12464E]">
                  <p className="text-white text-[10px]">Ticket Count</p>
                  <p className="text-gray50 text-xs">{ticketData.count}</p>
                </div>

                <div className="mt-2">
                  <p className="text-white text-[10px]">Special request?</p>
                  <p className="text-gray50 text-xs">{formData.request}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code  */}
      <div className="relative bottom-[120px] flex flex-col items-center mt-6">
        <div className="  rounded-md ">
          <QRCodeCanvas value={qrCodeData} size={80} />
        </div>
      </div>
    </div>

    <div className="text-center ">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <Button type="bookAnother" onClick={() => router.push("/")} />
        <Button type="download" />
      </div>
    </div>
  </div>
);
}

export default Page;
