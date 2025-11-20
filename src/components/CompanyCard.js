import React, { useState } from "react";
import clsx from "clsx";
import { Building2, MapPin, Briefcase, Users } from "lucide-react";

const CompanyCard = ({ company }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className={clsx(
        "relative h-[250px] w-full cursor-pointer rounded-2xl perspective-1000 transition-transform duration-500 hover:scale-[1.03] active:scale-[0.98]",
        "shadow-[0_0_20px_rgba(0,255,255,0.4)] border border-cyan-400",

        { "[&_.card-content]:rotate-y-180": isFlipped }
      )}
    >
      <div className="card-content h-full w-full transform-style-preserve-3d transition-transform duration-700">
        <div className="absolute inset-0 backface-hidden rounded-2xl 
          bg-gradient-to-br from-[#0a0f1f] to-[#001b2e] 
          p-4 shadow-xl border border-cyan-500/50">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-300 drop-shadow-[0_0_6px_#00ffff]">
            <Building2 size={20} className="text-cyan-400" /> 
            {company.name}
          </h2>
          <p className="mt-4 flex items-center gap-2 text-cyan-200">
            <MapPin size={18} className="text-cyan-400" /> {company.location}
          </p>

          <p className="mt-2 flex items-center gap-2 text-cyan-200">
            <Briefcase size={18} className="text-cyan-400" /> {company.industry}
          </p>

          <p className="mt-2 flex items-center gap-2 text-cyan-200">
            <Users size={18} className="text-cyan-400" /> Employees: {company.employees}
          </p>

       
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-2xl
          bg-gradient-to-br from-[#00131d] to-[#002a3b] 
          p-4 shadow-[0_0_20px_rgba(0,255,255,0.3)] 
          border border-cyan-500/40">

          <h3 className="text-xl font-bold text-cyan-300 drop-shadow-[0_0_5px_#00ffff]">
            About {company.name}
          </h3>

          <p className="mt-3 text-cyan-200">
            {company.name} operates in the 
            <span className="font-semibold text-cyan-300"> {company.industry} </span>
            sector based in 
            <span className="font-semibold text-cyan-300"> {company.location}</span>.
          </p>

          <p className="mt-3 text-cyan-200">
            Total Employees: 
            <span className="font-semibold text-cyan-300"> {company.employees}</span>
          </p>

          

          <div className="absolute top-0 left-0 w-full h-[3px]
            bg-cyan-400 shadow-[0_0_10px_#00ffff] rounded-t-2xl" />
        </div>

      </div>
    </div>
  );
};

export default CompanyCard;