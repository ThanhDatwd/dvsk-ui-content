export const signMsg = {
  lockGiftboxMsg: (boxNumber: number, userAddress: string) =>
    `I want to buy box ${boxNumber} for my address at ${userAddress.toLowerCase()}`,
  buyGiftboxMsg: (boxNumber: number, userAddress: string, txHash: string) => `
    I want to buy box ${boxNumber} for my address at ${userAddress.toLowerCase()}. My txHash is ${txHash}
    `,
  spinLuckyWheel: (userAddress: string): string =>
    `I want to spin the lucky wheel for my address at ${userAddress.toLowerCase()}`,
  claimReferralReward: (userAddress: string) =>
    `I want to claim referral reward for my address at ${userAddress}`,
};
