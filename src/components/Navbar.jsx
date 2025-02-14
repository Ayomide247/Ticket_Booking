import React from "react";
import { Hugeicons, TiczLogo } from "../assets";
import { LuTicket } from "react-icons/lu";
import { BsArrowRight } from "react-icons/bs";
import { useTicket } from "./TicketContext";

const Navbar = () => {
  const { ticketStore } = useTicket();

  return (
    <div className="flex justify-between items-center border-1 border-secondary rounded-2xl p-2 shadow-lg bg-prime font-primary">
      <div className="flex items-center gap-2">
        <div className="bg-secondary p-2 mt-1 rounded-lg">
          <LuTicket />
        </div>
        <img src={TiczLogo} alt="Logo" />
      </div>
      <div className=" hidden md:flex gap-5 text-accent">
        <a href="#" className={ticketStore?.formSteps !== 3 && "text-white"}>
          Events
        </a>
        <a href="#" className={ticketStore?.formSteps === 3 && "text-white"}>
          My Ticket
        </a>
        <a href="#">About Project</a>
      </div>
      <div className="flex items-center gap-1 bg-pure rounded-lg text-[#0A0C11] font- py-2 px-4 cursor-pointer hover:bg-lightPrimary hover:text-pure transition ease-in duration-400 font-roboto">
        <button className="w-full cursor">My Ticket </button>
        <BsArrowRight className="text-[26px]" />
      </div>
    </div>
  );
};

export default Navbar;
