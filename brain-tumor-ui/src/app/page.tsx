"use client";

import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { MainPanels } from "../components/main-panels";

export default function Home() {

  return (
    <div className="min-h-screen relative flex">

      {/*BACKGROUND VIDEO */}
      <div className=" fixed inset-0 z-0 overflow-hidden">
        <video 
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full objext-cover opacity-50"
        >
          <source src="/bg.mp4" type="video/mp4"/>
        </video>
      </div>

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-10 bg-linear-to-r from-black via-transparent to-black" />

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-20 flex w-full">

        {/* Sidebar */}
        <div className="hidden lg:block w-86">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col items-center pt-10 px-4">
          {/* TITLE SECTION */}
          <Header />
          {/* MAIN SECTIONS */}
          <MainPanels  />
        </div>
      </div>
    </div>
  );
}