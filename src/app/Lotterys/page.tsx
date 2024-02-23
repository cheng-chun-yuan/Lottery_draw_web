"use client";

import { useEffect, useState } from "react";

import type { LotteryDto } from "@/lib/types/db";

import EventCard from "./_components/EventCard";

function EventsPage() {
  const [dbEvents, setDbEvents] = useState<LotteryDto[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/lotterys");
      const data = await response.json();
      setDbEvents(data);
    };
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pl-32 pr-32">
      <div className="w-[100%]">
        <p className="flex justify-start p-2 text-4xl font-bold">Lotterys</p>
        <div className="p-4"></div>
        <div className="flex flex-row justify-center">
          {dbEvents.map((e) => {
            return (
              <div
                key={e.name}
                className="w-1/4 min-w-[150px] max-w-[300px] flex-none"
              >
                <EventCard
                  name={e.name}
                  symbol={e.symbol}
                  baseTokenURI={e.baseTokenURI}
                  percentage={e.percentage}
                  link={e.link}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default EventsPage;
