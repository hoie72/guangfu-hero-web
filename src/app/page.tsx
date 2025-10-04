import Header from "@/features/Header";
import Tabs from "@/features/Tabs";
import Footer from "@/features/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24">
        <Tabs />
      </main>
      <Footer />
    </div>
  );
}
