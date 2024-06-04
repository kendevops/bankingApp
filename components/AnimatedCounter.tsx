"use client";

import { formatAmount } from "@/lib/utils";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp
        decimals={2}
        duration={2.75}
        prefix="$"
        decimal="."
        end={amount}
      />
    </div>
  );
};

export default AnimatedCounter;
