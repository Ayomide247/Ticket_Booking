import React from "react";
import Navbar from "../components/Navbar";
import { useTicket } from "../components/TicketContext";
import AttendeeDetails from "../components/steps/AttendeeDetails";
import MyTicket from "../components/steps/MyTicket";
import TicketType from "../components/steps/TicketType";

const TicketPage = () => {
  const { ticketStore } = useTicket();
  const getCurrentForm = (step) => {
    switch (step) {
      case 3:
        return <MyTicket />;
      case 2:
        return <AttendeeDetails />;
      default:
        return <TicketType />;
    }
  };

  return (
    <div className="w-full bg-primary py-10 px-2 lg:px-48 text-[#FFFFFF] font-roa">
      <Navbar />
      {getCurrentForm(ticketStore?.formSteps)}
    </div>
  );
};

export default TicketPage;
