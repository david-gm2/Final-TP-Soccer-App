import "../styles/StatsCard.css";

const StatsCard = ({ stats = [] }) => {
  return (
    <div className="stats-overview">
      {stats.map((stat, index) => (
        <div className="stats-card" key={stat.title ?? index}>
          <div>
            <h2>{stat.title}</h2>
            <p className="stat-value">{stat.value}</p>
          </div>
          <img src={stat.icon} alt={stat.title} />
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
