import { FaChevronDown } from "react-icons/fa";
import FormProgress from "../FormProgress";
import { useTicket } from "../TicketContext";
import TicketSelection from "../TicketSelection";

const TicketType = () => {
  const { selectedOption, ticketStore, setTicketStore } = useTicket();

  const handleSelectChange = (event) => {
    setTicketStore((prevState) => {
      return {
        ...prevState,
        ticket: {
          ...prevState.ticket,
          no_of_tickets: event.target.value,
        },
        error: {
          ...prevState.error,
          num_of_ticket: "",
        },
      };
    });
  };

  const handleSubmit = () => {
    if (ticketStore?.ticket?.type?.id === null) {
      setTicketStore((prevState) => {
        return {
          ...prevState,
          error: {
            ...prevState.error,
            ticket_type: "Please select ticket type",
          },
        };
      });
      return;
    }
    if (!ticketStore?.ticket?.no_of_tickets) {
      setTicketStore((prevState) => {
        return {
          ...prevState,
          error: {
            ...prevState.error,
            num_of_ticket: "Please select number of ticket",
          },
        };
      });
      return;
    }
    setTicketStore((prevState) => {
      return {
        ...prevState,
        formSteps: 2,
      };
    });
  };

  return (
    <div className="py-5 lg:py-10 lg:px-36" data-testid="ticket-type-container">
      <div
        className="bg-prime border-1 border-secondary rounded-2xl p-2 md:p-10 shadow-lg"
        data-testid="ticket-form"
      >
        <FormProgress data-testid="form-progress" />

        <section
          className="flex flex-col border-1 border-secondary rounded-2xl  p-1 py-5 md:p-5 bg-secondary/20"
          data-testid="ticket-section"
        >
          <section
            className="flex flex-col items-center border-1 border-secondary rounded-2xl  py-5 px-2 md:px-14 bg-secondary/50  gap-5 shadow-lg w-full"
            data-testid="event-info"
          >
            <h1 className="font-road text-[36px]" data-testid="event-title">
              Techember Fest ”25
            </h1>
            <p
              className="text-center font-roboto"
              data-testid="event-description"
            >
              Join us for an unforgettable experience at <br /> Techember Fest
              ”25! Secure your spot now.
            </p>
            <div className="flex gap-3" data-testid="event-details">
              <div className="flex">
                <span>📍 </span>
                <p data-testid="event-location">
                  {" "}
                  04 Rumens road, Ikoyi, Lagos
                </p>
              </div>
              <div className="flex gap-3">
                <div> | |</div>
                <div data-testid="event-date">March 15, 2025 | 7:00 PM</div>
              </div>
            </div>
          </section>

          <div className=" border-2 border-secondary w-full rounded-lg my-7"></div>
          <section className="w-full">
            <h5>Select Ticket Type:</h5>
            <TicketSelection
              className="w-full"
              data-testid="ticket-selection"
            />
          </section>
          <section className="relative mt-5 w-full ">
            <h5>Number of Tickets:</h5>
            <select
              className="appearance-none w-full border border-secondary rounded-md py-2 px-10 mt-2"
              value={ticketStore?.ticket?.no_of_tickets}
              onChange={handleSelectChange}
              data-testid="ticket-quantity"
            >
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <FaChevronDown
              className="absolute right-10 top-11 w-5 h-5 pointer-events-none text-pure"
              data-testid="dropdown-icon"
            />
          </section>
          <span
            className="block mt-1 text-sm text-red-400"
            data-testid="error-message"
          >
            {ticketStore?.error?.num_of_ticket}
          </span>

          <section className="flex w-full gap-5 mt-5 ">
            <button
              className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
              data-testid="cancel-button"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className=" text-center border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
              data-testid="next-button"
            >
              Next
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default TicketType;
