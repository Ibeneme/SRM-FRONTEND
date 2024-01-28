import TicketComponentDashboard from "../TicketComponent";


const NewTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="New Tickets"
        ticketStatusProps="new"
      />
    </div>
  );
};

export default NewTickets;
