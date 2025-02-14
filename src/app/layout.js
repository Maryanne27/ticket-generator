import Header from "./component/Header";
import PageContainer from "./component/PageContainer";
import "./globals.css";
import { Road_Rage } from "next/font/google";

const roadRage = Road_Rage({
subsets: ["latin"],
weight: "400",
display: "swap",
});

export const metadata = {
title: "Ticket App",
description: "Techember fest event 2025",
};

export default function RootLayout({ children }) {
return (
  <html lang="en">
    <body className="text-white">
      <PageContainer>
        <Header />
        {children}
      </PageContainer>
    </body>
  </html>
);
}
