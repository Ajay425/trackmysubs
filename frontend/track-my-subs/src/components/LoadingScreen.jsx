import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnim from "../assets/loading.json"; // adjust path if needed

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "<Trackmysubs.com/>";
  const [progress, setProgress] = useState(0);

  const tips = [
    "Tip: You can edit subscriptions anytime.",
    "Tip: Archiving auto-deletes in 14 days.",
    "Tip: Toggle reminders when adding a sub!",
  ];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      setProgress(Math.min((index / fullText.length) * 100, 100));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#1a1a1a] text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* background glow */}
      <div className="absolute w-96 h-96 bg-purple-800 rounded-full blur-[160px] opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-[160px] opacity-20 bottom-0 right-0 animate-pulse"></div>

      {/* Lottie animation */}
      <div className="w-40 h-40 mb-6">
        <Lottie animationData={loadingAnim} loop={true} />
      </div>

      {/* typing animation */}
      <div className="mb-4 text-4xl md:text-5xl font-mono font-bold text-[#7f5af0] tracking-wide animate-fadeIn">
        {text}
        <span className="animate-blink text-white ml-1">|</span>
      </div>

      <p className="text-sm text-gray-400">{progress.toFixed(0)}%</p>
      <p className="mt-4 text-xs text-gray-500 italic">{randomTip}</p>
    </div>
  );
};
