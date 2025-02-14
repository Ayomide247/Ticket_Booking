import { createContext, useState, useContext, useEffect } from "react";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils/helpers/storage";

const initialValues = {
  formSteps: 1,
  error: {
    ticket_type: "",
    photo: "",
  },
  ticket: {
    user: {
      name: "",
      email: "",
      message: "",
      photo: "",
    },
    type: {
      id: null,
      name: "",
      price: "",
      img: "",
      units: "",
    },
    no_of_tickets: 0,
  },
};

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const store = getItemFromLocalStorage("store");

  const [ticketStore, setTicketStore] = useState(store ? store : initialValues);

  const [formSteps, setFormSteps] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState({
    name: "",
    price: "",
    img: "",
    units: "",
  });
  const [selectedOption, setSelectedOption] = useState("0");

  const resetBooking = () => {
    setFormSteps(initialValues);
    setItemInLocalStorage("store", initialValues);
    localStorage.removeItem("uploadedImage");
    window.location.reload();
  };

  useEffect(() => {
    setItemInLocalStorage("store", ticketStore);
  }, [ticketStore]);

  return (
    <TicketContext.Provider
      value={{
        selectedTicket,
        setSelectedTicket,
        selectedOption,
        setSelectedOption,
        ticketStore,
        setTicketStore,
        resetBooking,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => useContext(TicketContext);
