import React from 'react';

function PlanDetails({ plan }) {
  return (
    <div>
      <h2>{plan.city}</h2>
      <p>{plan.description}</p>
      <ul>
        {plan.activities.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanDetails;