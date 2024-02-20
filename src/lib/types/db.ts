export type createLotteryDto = {
  address: string;
  name: string;
  symbol: string;
  baseTokenURI: string;
  percentage: number[];
  vrfMainAddress: string;
  platformOwner: string;
};
export type LotteryDto = {
  name: string;
  symbol: string;
  baseTokenURI: string;
  percentage: number[];
  link: string;
};
