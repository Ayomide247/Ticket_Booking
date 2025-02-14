import React, { useState } from "react";
import { TICKET_TYPES } from "../utils/data";
import { useTicket } from "./TicketContext";

const TicketSelection = () => {
  const { ticketStore, setTicketStore } = useTicket(); // Get function to update state

  const handleSelectTicket = (ticket) => {
    setTicketStore((prevState) => {
      return {
        ...prevState,
        ticket: {
          ...prevState.ticket,
          type: ticket,
        },
        error: {
          ...prevState.error,
          ticket_type: "",
        },
      };
    });
  };

  return (
    <div className="flex flex-col items-cente overflow-auto xl:overflow-hidden md:items-stretc">
      <ul className="flex flex-row items-center gap-7 bg-primary rounded-lg p-5 border border-secondary font-roboto text-[14px] mt-2 shadow-lg overflow-y-scroll md:overflow-auto min-w-[40rem] h-[11rem] md:h-full md:justify-center">
        {TICKET_TYPES.map((ticket) => (
          <li
            key={ticket.id}
            onClick={() => handleSelectTicket(ticket)}
            className={`${
              ticketStore?.ticket?.type?.id === ticket.id && "bg-[#2C545B]"
            } border border-secondary rounded-lg py-5 px-5 hover:bg-[#2C545B] shadow-lg transition ease-in duration-500 w-[165px] hover:scale-105 cursor-pointer`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">{ticket.price} </h3>
              <img src={ticket.img} alt="" className="w-[40px]" />
            </div>
            <p className="text-[12px]">{ticket.name}</p>
            <p className="text-[10px]">{ticket.units}</p>
          </li>
        ))}
      </ul>
      <span className="text-sm text-red-400">
        {ticketStore?.error?.ticket_type}
      </span>
    </div>
  );
};

export default TicketSelection;
