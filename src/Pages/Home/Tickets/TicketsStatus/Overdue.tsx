import TicketComponentDashboard from "../TicketComponent";

const OverdueTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="Overdue Tickets"
        ticketStatusProps="overdue"
      />
    </div>
  );
};

export default OverdueTickets;
