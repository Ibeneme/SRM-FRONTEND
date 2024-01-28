import TicketComponentDashboard from "../TicketComponent";

const ResolvedTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="Resolved Tickets"
        ticketStatusProps="resolved"
      />
    </div>
  );
};

export default ResolvedTickets;
