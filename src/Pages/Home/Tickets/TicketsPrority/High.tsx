import TicketComponentDashboard from "../TicketComponent";

const HighTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="Priority High Tickets"
        ticketPriorityProps="high"
      />
    </div>
  );
};

export default HighTickets;
