"use client";

/* eslint-disable @next/next/no-img-element */

interface BoardingPassProps {
  summary: {
    airline: string;
    arrival: string;
    departure: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    seat: string;
    date: string;
    gate: string;
  };
}

export const BoardingPass = ({
  summary = {
    airline: "American Airlines",
    arrival: "SFO",
    departure: "NYC",
    departureTime: "10:00 AM",
    arrivalTime: "12:00 PM",
    price: 100,
    seat: "1A",
    date: "2021-12-25",
    gate: "31",
  },
}: BoardingPassProps) => {
  return (
    <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="aspect-square w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-50 sm:w-12">
          <img
            src="https://www.gstatic.com/flights/airline_logos/70px/UA.png"
            className="aspect-square object-cover"
            alt="airline logo"
          />
        </div>
        <div className="">
          <div className="text-lg font-medium">{summary.airline}</div>
          <div className="text-sm">
            {summary.departure} - {summary.arrival}
          </div>
        </div>
        <div className="ml-auto text-center">
          <div className="text-xs uppercase text-zinc-600">Gate</div>
          <div className="font-mono text-2xl">{summary.gate}</div>
        </div>
      </div>
      <div className="grid gap-1 rounded-xl bg-zinc-50 p-4">
        <div className="text-lg font-medium">Rauch / Guillermo</div>
        <div className="flex justify-between text-sm">
          <div>{summary.departure}</div>
          <div className="">{summary.date}</div>
          <div className="">{summary.arrival}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="grid gap-1 rounded-xl bg-zinc-50 px-4 py-3">
          <div className="text-xs uppercase text-zinc-600">Seat</div>
          <div className="font-mono text-2xl leading-none">{summary.seat}</div>
        </div>
        <div className="grid flex-1 gap-1 rounded-xl bg-zinc-50 px-4 py-3">
          <div className="text-xs uppercase text-zinc-600">Class</div>
          <div className="text-xl leading-none">BUSINESS</div>
        </div>
        <div className="grid gap-1 rounded-xl bg-zinc-50 px-4 py-3">
          <div className="text-xs uppercase text-zinc-600">Departs</div>
          <div className="text-xl leading-none">{summary.departureTime}</div>
        </div>
        <div className="grid gap-1 rounded-xl bg-zinc-50 px-4 py-3">
          <div className="text-xs uppercase text-zinc-600">Arrival</div>
          <div className="text-xl leading-none">{summary.arrivalTime}</div>
        </div>
      </div>
      <div className="hidden sm:flex"></div>
    </div>
  );
};
