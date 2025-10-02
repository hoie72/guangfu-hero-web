import Header from "@/components/Header";
import Tabs from "@/components/Tabs";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-24">
        <Tabs />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex gap-4">
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            找 / 送物資
          </button>
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            當 / 找志工
          </button>
        </div>
      </footer>
    </div>
  );
}
