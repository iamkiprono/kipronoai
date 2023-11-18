"use client";

import { livematches } from "@/lib/livescore";
import React, { useState } from "react";

const page = () => {
  const [filter, setFilter] = useState("");

  const allCountries = livematches.data.match.map((match) => {
    return match.country.name;
  });

  const filteredCountries = [...new Set(allCountries)];

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex gap-2 flex-wrap">
        Filter: <p onClick={() => setFilter("")}>All</p>
        {filteredCountries.map((match) => {
          return (
            <p
              onClick={(e) => setFilter(match)}
              className={`border p-1 cursor-pointer ${
                filter === match ? "bg-black text-white" : ""
              }`}
              key={match.id}
            >
              {match}
            </p>
          );
        })}
      </div>
      {filter}
      {livematches.data.match
        .filter((m) =>
          filter ? m.country.name === filter : m.country.name !== filter
        )
        .map((match) => {
          return (
            <div
              className="border bg-slate-200 w-fit md:w-[600px] flex flex-col gap-2 shadow-sm my-2 p-2 justify-between"
              key={match.fixture_id}
            >
              <div className="flex gap-2">
                {match.status === "FINISHED" ? (
                  <p className="underline">Full Time</p>
                ) : (
                  <p className="text-red-500">Live {match.time} '</p>
                )}
                <p>{match.home_name}</p>-<p>{match.away_name}</p>
                <p className="text-[#a1a1aa]">
                  HT: {match.ht_score ? match.ht_score : "-"}
                </p>
                {match.status === "FINISHED" ? (
                  <p className="underline">{match.score}</p>
                ) : (
                  <p className="text-red-500">{match.score}</p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default page;
