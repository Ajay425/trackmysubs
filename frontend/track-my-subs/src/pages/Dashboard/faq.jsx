import React from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

const Faq = ({ onCloseSidebar }) => {
  const faqs = [
    {
      question: "What is TrackMySubs?",
      answer: "TrackMySubs is a simple tool to manage and get reminded of all your subscriptions in one place.",
    },
    {
      question: "How do I add a subscription?",
      answer: "Go to the 'Add Subscription' page from the sidebar and fill out the form.",
    },
    {
      question: "How can I get notified before a subscription renews?",
      answer: "Set a reminder by selecting how many days before the renewal date you'd like to be notified.",
    },
    {
      question: "How do I reset my password?",
      answer: "Currently, password reset functionality is not available. Please contact support for help.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40 bg-[#101010] border-r border-white/10 shadow-lg">
        <Sidebar onClose={onCloseSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 relative ml-64">
        {/* Glowing Background */}
        <div className="absolute w-96 h-96 bg-purple-800 rounded-full blur-[160px] opacity-20 top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-[160px] opacity-20 bottom-0 right-0 animate-pulse"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center animate-fadeZoom">
            <h1 className="text-4xl font-bold text-[#7f5af0] neon-text mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-400 mb-6">Find answers to common questions about TrackMySubs.</p>
            <Link to="/home" className="inline-block px-5 py-2 bg-[#7f5af0] hover:bg-[#6841e6] text-white rounded-md text-sm font-medium shadow transition">
              ← Back to Dashboard
            </Link>
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-md transition hover:shadow-lg hover:border-[#7f5af0]"
              >
                <h2 className="text-lg font-semibold text-[#7f5af0]">{faq.question}</h2>
                <p className="text-gray-300 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .neon-text {
          text-shadow: 0 0 8px #7f5af0, 0 0 16px #7f5af0;
        }
        @keyframes fadeZoom {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeZoom {
          animation: fadeZoom 0.7s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default Faq;
