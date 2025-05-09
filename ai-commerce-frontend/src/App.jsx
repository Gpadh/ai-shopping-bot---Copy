import { useState } from "react";
import Header from "./components/Header";
import ChatInterface from "./components/ChatInterface";
import TextRecommender from "./components/TextRecommender";
import ImageSearch from "./components/ImageSearch";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("chat");

  const tabs = [
    { label: "Chat", value: "chat" },
    { label: "Text Recommender", value: "text" },
    { label: "Image Search", value: "image" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <Header />

      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl mt-6">
        {/* Tab Buttons */}
        <div className="flex justify-center space-x-2 p-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div style={{ display: activeTab === "chat" ? "block" : "none" }}>
            <ChatInterface />
          </div>
          <div style={{ display: activeTab === "text" ? "block" : "none" }}>
            <TextRecommender />
          </div>
          <div style={{ display: activeTab === "image" ? "block" : "none" }}>
            <ImageSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
