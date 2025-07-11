import { motion } from "framer-motion";

const SummaryCards = ({ subscriptions }) => {
  const safeSubs = Array.isArray(subscriptions) ? subscriptions : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeZoom perspective">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="relative w-full h-full min-h-[140px]"
          initial={{ rotateY: -180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ delay: i * 0.4, duration: 0.7, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Back of card (hidden initially) */}
          <div className="absolute w-full h-full backface-hidden rounded-xl bg-[#1a1a1a] border border-white/10 shadow-md flex items-center justify-center rotate-y-180">
            <span className="text-gray-500 text-lg font-semibold"></span>
          </div>

          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden rounded-xl bg-black/40 border border-white/10 p-6 backdrop-blur-md shadow-md flex flex-col items-center justify-center">
            {i === 0 && (
              <>
                <h2 className="text-lg text-gray-300 mb-1">Total Subscriptions: </h2>
                <p className="text-3xl font-bold text-white">{safeSubs.length}</p>
              </>
            )}
            {i === 1 && (
              <>
                <h2 className="text-lg text-gray-300 mb-1">Total Cost: </h2>
                <p className="text-3xl font-bold text-white">
                  ${safeSubs.reduce((total, s) => total + s.price, 0).toFixed(2)}
                </p>
              </>
            )}
            {i === 2 && (
              <>
                <h2 className="text-lg text-gray-300 mb-1">Status: </h2>
                <p className="text-3xl font-bold text-green-400">Active</p>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
