import TicketComponentDashboard from "../TicketComponent";

const LowTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="Priority Low Tickets"
        ticketPriorityProps="low"
      />
    </div>
  );
};

export default LowTickets;
