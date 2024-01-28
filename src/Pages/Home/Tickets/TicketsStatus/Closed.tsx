import TicketComponentDashboard from "../TicketComponent";

const ClosedTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="Closed Tickets"
        ticketStatusProps="closed"
      />
    </div>
  );
};

export default ClosedTickets;
