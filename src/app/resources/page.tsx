"use client";

import Header from "@/features/Header";
import Footer from "@/features/Footer";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24">
        <iframe
          src="https://pinkowo.github.io/hualien-bees/"
          className="w-full h-full border-0"
          title="找/送物資"
          allow="geolocation"
          style={{ height: "calc(100vh - 192px)" }}
        />
      </main>
      <Footer />
    </div>
  );
}
