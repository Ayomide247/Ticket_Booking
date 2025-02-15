import { useEffect } from "react";
import { barCode, user } from "../../assets";
import FormProgress from "../../components/FormProgress";
import { useTicket } from "../TicketContext";
import { usePDF } from "react-to-pdf";
const MyTicket = () => {
  const { ticketStore, setTicketStore, resetBooking } = useTicket();

  const { toPDF, targetRef } = usePDF({ filename: "ticket.pdf" });

  const handleReset = () => resetBooking();

  // setTimeout(() => {
  //   window.location.reload();
  //   return;
  // }, 200);
  // useEffect(() => {}, []);
  return (
    <div className="py-5 lg:py-10 lg:px-36">
      <div className="bg-prime border-1 border-secondary rounded-2xl  md:p-10 shadow-lg ">
        <FormProgress />

        <section className=" flex flex-col items-center border-1 border-secondary rounded-2xl  p-5 bg-secondary/20 w-full">
          <section className="flex flex-col items-center">
            <h2 className="text-3xl md:text-[32px]">Your Ticket is Booked!</h2>
            <p className="text-[16px] text-center">
              Check your email for a copy or you can
              <span className="font-bold">download</span>
            </p>
          </section>
          <section
            class="ticket-container flex flex-col items-center pt-20 max-w-full h-auto mx-auto mt-10 md:pt-6"
            ref={targetRef}
          >
            <div className="flex flex-col md:items-center p-5 md:w-[450px]">
              <div
                className=" border-lightPrimary rounded-2xl p-1 md:w-[75%] border-1"
                style={{
                  borderColor: "#24a0b5",
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <h1 className="text-[2.125rem] font-road">
                    Techember Fest ”25
                  </h1>
                  <p className="text-[12px]">📍 04 Rumens road, Ikoyi, Lagos</p>
                  <p className="text-[12px]">📅 March 15, 2025 | 7:00 PM</p>

                  <img
                    src={
                      ticketStore?.ticket?.user?.photo
                        ? ticketStore?.ticket?.user?.photo
                        : user
                    }
                    alt="user"
                    className="my-3 h-24 w-40 md:h-40 md:w-40 object-cover rounded-2xl border-2 border-lightPrimar mt-2 shadow-lg"
                    style={{
                      borderColor: "#24a0b5",
                    }}
                  />
                </div>

                <div
                  className="w-full mx-auto p-4 bg-[#122024] rounded-2xl border border-[#2A3B3D"
                  style={{
                    borderColor: "#2A3B3D",
                    color: "#fff",
                  }}
                >
                  <div
                    className="grid grid-cols-2 gap-4 border-b border-[#2A3B3D pb-3 relative"
                    style={{
                      borderColor: "#2A3B3D",
                    }}
                  >
                    <div>
                      <p
                        className="text-gra-400"
                        style={{
                          color: "#99a1af",
                        }}
                      >
                        Name
                      </p>
                      <p className="font-bold text-[.7rem]">
                        {` ${ticketStore?.ticket?.user?.name}`}
                      </p>
                    </div>
                    <div className="relative">
                      <p
                        className="text-gra-400"
                        style={{
                          color: "#99a1af",
                        }}
                      >
                        Email
                      </p>
                      <p
                        className="font-bold text-whit text-[.6rem] overflow-hidden"
                        style={{
                          color: "#ffffff",
                        }}
                      >
                        {ticketStore?.ticket?.user?.email}
                      </p>
                    </div>

                    <div
                      className="absolute inset-y-0 left-1/2 w-px bg-[#2A3B3D"
                      style={{
                        backgroundColor: "#2A3B3D",
                      }}
                    ></div>
                  </div>

                  <dizv
                    className="grid grid-cols-2 gap-4 border-b border-[#2A3B3D py-3 relative"
                    style={{
                      borderColor: "#2A3B3D",
                    }}
                  >
                    <div>
                      <p
                        className="text-gra-400"
                        style={{
                          color: "#99a1af",
                        }}
                      >
                        Ticket Type:
                      </p>
                      <p className="font-bold text-[.6rem]">
                        {ticketStore?.ticket?.type?.name}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-gra-400"
                        style={{
                          color: "#99a1af",
                        }}
                      >
                        Ticket for :
                      </p>
                      <p className="font-bold text-[.6rem]">
                        {ticketStore?.ticket?.no_of_tickets}
                      </p>
                    </div>

                    <div
                      className="absolute inset-y-0 left-1/2 w-px bg-[#2A3B3D"
                      style={{
                        backgroundColor: "#2A3B3D",
                      }}
                    ></div>
                  </dizv>

                  <div className="pt-3 ">
                    <p
                      className="text-gra-400"
                      style={{
                        color: "#99a1af",
                      }}
                    >
                      Special request?
                    </p>
                    <p
                      className="text-sm text-whit overflow-auto h-[40px]"
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      {ticketStore?.ticket?.user?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative top-10 md:top-12">
              <img src={barCode} alt="" />
            </div>
          </section>
          <section className="flex flex-col w-full gap-5 mt-5 md:flex-row">
            <button
              className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
              onClick={handleReset}
            >
              Book Another Ticket
            </button>
            <button
              className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
              onClick={() => toPDF()}
            >
              Download Ticket
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default MyTicket;
