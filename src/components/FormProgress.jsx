import { useTicket } from "./TicketContext";

const FormProgress = () => {
  const { ticketStore } = useTicket();

  const MAPPED_TITLE = {
    1: "Ticket Selection",
    2: "Attendee Details",
    3: "Ready",
  };

  return (
    <div className="p-5">
      <section className="flex justify-between items-center ">
        <h1 className=" text-[32px]">{MAPPED_TITLE[ticketStore?.formSteps]}</h1>
        <p className="font-Roboto">Step {ticketStore?.formSteps}/3</p>
      </section>

      <div className=" bg-secondary w-full rounded-lg my-2">
        <div
          className="w-0 border-2 border-lightPrimary rounded-lg"
          style={{ width: `${(ticketStore?.formSteps / 3) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgress;
