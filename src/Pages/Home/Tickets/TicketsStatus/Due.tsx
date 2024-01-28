import TicketComponentDashboard from "../TicketComponent";


const DueTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="Due Tickets"
        ticketStatusProps="due"
      />
    </div>
  );
};

export default DueTickets;
