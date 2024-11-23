import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/Lamp";
import { FaBolt, FaChartBar, FaSyncAlt } from "react-icons/fa";
import { CardSpotlight } from "./ui/CardSpotlight";

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialY = windowWidth < 768 ? 500 : 150;
  const whileInViewY = windowWidth < 768 ? 320 : 50;

  return (
    <section className="relative min-h-[calc(100vh-4rem)]">
      <LampContainer className="z-10">
        <motion.div
          initial={{ opacity: 0, y: initialY }}
          whileInView={{ opacity: 1, y: whileInViewY }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative z-50 flex flex-col items-center justify-center space-y-8 px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-b from-white to-slate-500/50 py-4 bg-clip-text text-transparent">
            AI-Powered Product Recognition
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl text-center leading-relaxed">
            Transform your retail experience with our cutting-edge product
            recognition technology. Simply upload an image and let our AI do the
            magic.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Instant Recognition",
                description:
                  "Get real-time product identification with high accuracy.",
                icon: <FaBolt className="text-cyan-400" />,
              },
              {
                title: "Smart Analytics",
                description:
                  "Detailed insights and confidence scores for each product.",
                icon: <FaChartBar className="text-yellow-400" />,
              },
              {
                title: "Easy Integration",
                description: "Seamlessly integrate with your existing systems.",
                icon: <FaSyncAlt className="text-green-400" />,
              },
            ].map((feature, index) => (
              <CardSpotlight key={index} className="bg-black/40">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-200">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </CardSpotlight>
            ))}
          </div>

          {/* <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </motion.button> */}
        </motion.div>
      </LampContainer>
    </section>
  );
};

export default Hero;
