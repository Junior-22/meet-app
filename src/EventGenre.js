import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  const Colours = ["#204051", "#84A9AC", "#83a6ed", "#FABB51", "#C74B50"];

  useEffect(() => {
    const getData = () => {
      const genres = ["React", "JS", "Node", "jQuery", "AngularJS"];
      const data = genres.map((genre) => {
        const value = events.filter(({ summary }) =>
          summary.includes(genre)
        ).length;
        return { name: genre, value };
      });
      return data;
    };

    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          innerRadius={30}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={Colours[index % Colours.length]} name={entry.name} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;