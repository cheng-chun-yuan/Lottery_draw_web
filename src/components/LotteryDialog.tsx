"use client";

import { useState } from "react";
import React from "react";

import { DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { useAccount } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { MemeNFTFactoryABI } from "@/utils/abis/MemeNFTFactory";
import { MEMENFT_FACTORY_ADDRESS } from "@/utils/addresses";

function LotteryDialog() {
  const [open, setOpen] = React.useState(false);
  const [resultAddress, setResultAddress] = useState("");
  const { address } = useAccount();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [lotteryData, setLotteryData] = useState({
    address: address?.toString() || "",
    name: "",
    symbol: "",
    baseTokenURI: "",
    percentage: [] as number[],
    link: "",
  });

  // Define handleChange to update formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "percentage") {
      // Attempt to parse the string as an array
      try {
        const parsedPercentage = JSON.parse(value);
        if (Array.isArray(parsedPercentage)) {
          setLotteryData((prevData) => ({
            ...prevData,
            percentage: parsedPercentage.map(Number), // Ensure all elements are numbers
          }));
          return;
        }
        // Handle non-array inputs or other issues
        console.error("Percentage input is not a valid array.");
      } catch (error) {
        console.error("Failed to parse percentage input.", error);
      }
    } else {
      // Handle all other fields normally
      setLotteryData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const { config } = usePrepareContractWrite({
    address: MEMENFT_FACTORY_ADDRESS as `0x${string}`,
    abi: MemeNFTFactoryABI,
    functionName: "createMemeNFT",
    args: [
      lotteryData.name,
      lotteryData.symbol,
      lotteryData.baseTokenURI,
      lotteryData.percentage,
    ],
    onSuccess: (data) => {
      console.log("Success", data);

      setResultAddress(data.result?.toString() || "");
      console.log(resultAddress);
      const url = `https://testnet.snowtrace.io/address/${resultAddress}/contract/43113/code`;
      console.log("Submitting lottery data:", url);
      setLotteryData((prevData) => ({
        ...prevData,
        link: url,
      }));
    },
  });

  const { writeAsync: createMeme } = useContractWrite(config);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createMeme?.();
    // Send the data to the server
    try {
      const response = await fetch("/api/lotterys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lotteryData),
      });
      if (response.ok) {
        console.log("Lottery created successfully.");
      } else {
        console.error("Failed to create lottery:", response);
      }
    } catch (error) {
      console.error("Failed to create lottery:", error);
    }
  };

  return (
    <React.Fragment>
      <button
        className="w-30 m-4 flex h-10 items-center justify-center rounded-2xl bg-dark-blue p-4 text-xl font-bold text-white"
        onClick={handleClickOpen}
      >
        New Lottery
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Create Lottery Event</DialogTitle>
        <DialogContent className="space-y-2">
          <InputLabel htmlFor="name">Name:</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          <InputLabel htmlFor="symbol">Symbol:</InputLabel>
          <TextField
            margin="dense"
            id="symbol"
            name="symbol"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          <InputLabel htmlFor="percentage">percentage:</InputLabel>
          <TextField
            margin="dense"
            id="percentage"
            name="percentage"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            placeholder="e.g. [10, 20, 30, 100] the last number should be 100"
            className="pb-2"
          />
          <InputLabel htmlFor="">Base Token URI:</InputLabel>
          <TextField
            margin="dense"
            id="baseTokenURI"
            name="baseTokenURI"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            required
            className="pb-2"
          />
          {/* Assuming percentage is handled elsewhere or not directly input by users in this form */}
          <form onSubmit={handleSubmit} className="flex justify-center">
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default LotteryDialog;
