"use client";

import { ABI_DEPOSIT } from "@/wallet/ABIs/deposit.ABI";
import { BLOCK_CHAIN } from "@/wallet/constant/app.constants";
import { Box, Center, Container } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { formatUnits } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

export default function RainbowKit() {
   const account = useAccount();

   const readContract = useReadContract({
      address: BLOCK_CHAIN["TEST_NET"].CONTRACT_DEPOSIT as `0x${string}`,
      abi: ABI_DEPOSIT,
      functionName: "config",
   });

   console.log({ data: readContract.data, error: readContract.error });

   const balance = useBalance({
      address: account.address,
      token: BLOCK_CHAIN["TEST_NET"].TOKEN_ARB.address as `0x${string}`,
   });

   if (balance.data) {
      console.log(formatUnits(balance?.data?.value, balance?.data!?.decimals));
   }

   return (
      <Box>
         <Container>
            <Center>
               <ConnectButton />
            </Center>
         </Container>
      </Box>
   );
}
