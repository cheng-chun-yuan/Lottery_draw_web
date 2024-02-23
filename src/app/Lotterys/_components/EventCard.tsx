"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { type LotteryDto } from "@/lib/types/db";

// Assuming fetchData function remains the same
async function fetchData(baseTokenURI: string, index: number) {
  try {
    const response = await fetch(
      `${baseTokenURI}${index + 1}.json`.replace(/\s/g, ""),
    );
    if (!response.ok) {
      // Handle response error
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
export default function EventCard({
  name,
  symbol,
  baseTokenURI,
  percentage,
  link,
}: LotteryDto) {
  // State to store traits
  const [traits, setTraits] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchTraits = async () => {
      const traitsTemp = await Promise.all(
        percentage.map(async (_, index) => {
          try {
            const json = await fetchData(baseTokenURI, index);
            const image = json.image; // Adjust this according to the actual structure
            const trait = json.attributes[0].value; // Adjust this according to the actual structure
            return { trait, image };
          } catch (error) {
            console.error("Error fetching trait data: ", error);
            return { trait: "", image: "" }; // Return a fallback or error value
          }
        }),
      );
      setTraits(traitsTemp.map((item) => item.trait));
      setImages(traitsTemp.map((item) => item.image));
    };

    fetchTraits();
  }, [baseTokenURI, percentage]);

  return (
    <div>
      <Paper className="w-[95%] p-5 hover:cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <Typography className="break-all font-bold" variant="h4">
            {name}
          </Typography>
          <p className="pl-6 text-xl font-bold text-dark-blue">{symbol}</p>
          {/* Display percentage array with links and traits */}
          <ul className="list-disc pl-8 ">
            {percentage.map((percent, index) => (
              <li key={index} className="text-lg">
                {index === 0
                  ? `${percent}`
                  : `${percent - percentage[index - 1]}`}
                % -
                <a
                  href={images[index]?.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Tier {index + 1} : {traits[index]}
                </a>
              </li>
            ))}
          </ul>
          <Link href={link}>
              <div className="text-blue-500 hover:text-blue-700">
                View Event
              </div>
            </Link>
        </div>
      </Paper>
    </div>
  );
}
