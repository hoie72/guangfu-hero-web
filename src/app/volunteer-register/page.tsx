"use client";

import Header from "@/features/Header";
import Footer from "@/features/Footer";

export default function VolunteerRegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24">
        <iframe
          src="https://hualien-volunteers-frontend-iota.vercel.app/"
          className="w-full h-full border-0"
          title="當/找志工"
          allow="geolocation"
          style={{ height: "calc(100vh - 192px)" }}
        />
      </main>
      <Footer />
    </div>
  );
}
