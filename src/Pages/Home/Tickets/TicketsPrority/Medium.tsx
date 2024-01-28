import TicketComponentDashboard from "../TicketComponent";

const MediumTickets = () => {
  return (
    <div>
      <TicketComponentDashboard
        headersTickets="Priority Medium Tickets"
        ticketPriorityProps="medium"
      />
    </div>
  );
};

export default MediumTickets;
