import React from "react";

interface TicketDashboardCardProps {
  title: string;
  value: string;
  rateColor: string;
  rateText: string;
}

const TicketDashboardCard: React.FC<TicketDashboardCardProps> = ({
  title,
  value,
  rateColor,
  rateText,
}) => {
  return (
    <div className="total-tickets-dashboard-cards">
      <p className="total-tickets-dashboard-cards-p">{title}</p>
      <h3 className="total-tickets-dashboard-cards-bold">{value}</h3>
      <p className="total-tickets-dashboard-cards-rate">
        <span style={{ color: rateColor }}>{rateText}</span> since last week
      </p>
    </div>
  );
};

export default TicketDashboardCard;
