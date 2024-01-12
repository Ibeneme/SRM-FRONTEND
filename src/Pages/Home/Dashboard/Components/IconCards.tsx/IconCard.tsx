import React, { ReactNode } from "react";

interface IconDashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

const IconDashboardCard: React.FC<IconDashboardCardProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="icon-tickets-dashboard-cards">
      <div className="icon-tickets-dashboard-cards-icons">{icon}</div>
      <div>
        <p className="icon-tickets-dashboard-cards-p">{title}</p>
        <h3 className="icon-tickets-dashboard-cards-bold">{value}</h3>
      </div>{" "}
    </div>
  );
};

export default IconDashboardCard;
