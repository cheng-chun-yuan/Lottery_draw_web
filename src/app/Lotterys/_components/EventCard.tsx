"use client";

import Link from "next/link";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { type LotteryDto } from "@/lib/types/db";

export default function EventCard({
  name,
  symbol,
  baseTokenURI,
  percentage,
  link,
}: LotteryDto) {
  const totalLink = link;
  return (
    <div>
      <Paper className="w-50 p-5 hover:cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <Typography className="break-all font-bold" variant="h4">
            {name}
          </Typography>
          <p className="pl-6 text-xl font-bold text-dark-blue">{symbol}</p>
          {/* Display percentage array with links */}
          <ul className="list-disc pl-8 ">
            {percentage.map((percent, index) => (
              <li key={index} className="text-lg">
                {index === 0
                  ? `${percent}`
                  : `${percent-percentage[index - 1]}`}
                % -
                <a
                  href={`${baseTokenURI}${index + 1}.json`.replace(/\s/g, "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Teir {index + 1}
                </a>
              </li>
            ))}
            <Link href={totalLink} >
              <div className="text-blue-500 hover:text-blue-700">View Event</div>
            </Link>
          </ul>
        </div>
      </Paper>
    </div>
  );
}
