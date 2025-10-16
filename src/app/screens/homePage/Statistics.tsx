import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
const Statistics = () => {
  const [counters, setCounters] = useState([
    {
      id: 1,
      value: 0,
      target: 15000,
      text: "Books Available",
      icon: "📚",
      delay: 0,
    },
    {
      id: 2,
      value: 0,
      target: 25,
      text: "Years Experience",
      icon: "⏳",
      delay: 200,
    },
    {
      id: 3,
      value: 0,
      target: 500,
      text: "Monthly Readers",
      icon: "👥",
      delay: 400,
    },
    { id: 4, value: 0, target: 50, text: "Awards Won", icon: "🏆", delay: 600 },
  ]);

  useEffect(() => {
    const duration = 2000; // Animation duration in ms

    const animateCounters = () => {
      counters.forEach((counter) => {
        const step = counter.target / (duration / 16); // 60fps

        setTimeout(() => {
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= counter.target) {
              current = counter.target;
              clearInterval(interval);
            }

            setCounters((prev) =>
              prev.map((item) => {
                if (item.id === counter.id) {
                  return { ...item, value: Math.floor(current) };
                }
                return item;
              })
            );
          }, 16);
        }, counter.delay);
      });
    };

    animateCounters();
  }, []);

  return (
    <div className="statistics-container">
      <Container>
        <div className="statistics-grid">
          {counters.map((counter) => (
            <div key={counter.id} className="statistic-item">
              <div className="icon-wrapper">
                <span role="img" aria-label={counter.text}>
                  {counter.icon}
                </span>
              </div>
              <div
                className={`animated-number delay-${counter.delay}`}
                style={{ animationDelay: `${counter.delay}ms` }}
              >
                {counter.value.toLocaleString()}+
              </div>
              <div className="statistic-text">{counter.text}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Statistics;
