import React from "react";
import Container from "../Components/Container";
import { FaHeart, FaShieldAlt, FaUsers, FaBolt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {
  const{user}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const handleClick=()=>{
    if(user){
      return navigate("/feed");
    }
    navigate("/auth")
  }
  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-12 px-4">
        {/* Card */}
        <div className="bg-slate-900 rounded-2xl p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center mb-4 text-slate-100">
            About Us
          </h1>

          <p className="text-center text-slate-400 mb-10">
            A modern way to discover meaningful connections — one profile at a time.
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {/* Mission */}
            <section className="flex gap-4">
              <FaHeart className="text-red-400 text-2xl mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-slate-200">
                  Our Mission
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  We believe real connections start with intention. Our mission is
                  to remove noise, endless scrolling, and pressure — so you can
                  focus on genuine interactions.
                </p>
              </div>
            </section>

            {/* How it works */}
            <section className="flex gap-4">
              <FaBolt className="text-yellow-400 text-2xl mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-slate-200">
                  How It Works
                </h2>
                <ul className="text-slate-400 space-y-1 list-disc list-inside">
                  <li>View one profile at a time</li>
                  <li>Like or pass with a single click</li>
                  <li>Connect when interest is mutual</li>
                </ul>
              </div>
            </section>

            {/* Why different */}
            <section className="flex gap-4">
              <FaUsers className="text-blue-400 text-2xl mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-slate-200">
                  Why We’re Different
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Instead of overwhelming you with choices, we prioritize quality
                  over quantity. No distractions, no pressure — just real people.
                </p>
              </div>
            </section>

            {/* Safety */}
            <section className="flex gap-4">
              <FaShieldAlt className="text-emerald-400 text-2xl mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2 text-slate-200">
                  Safety & Privacy
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  Your privacy matters. We use secure systems and give you full
                  control over your connections and interactions.
                </p>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-slate-300 mb-4">
              Ready to meet someone new?
            </p>
            <button className="bg-indigo-700 px-6 py-3 rounded-full font-medium hover:bg-indigo-500 transition"
               onClick={handleClick}
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
