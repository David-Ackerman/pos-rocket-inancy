import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
} from "lucide-react";

export const secondaryColors = {
  blue: "secondary-blue",
  red: "secondary-red",
  green: "secondary-green",
  yellow: "secondary-yellow",
  purple: "secondary-purple",
  pink: "secondary-pink",
  orange: "secondary-orange",
};

export const primaryColors = [
  "blue",
  "red",
  "green",
  "yellow",
  "purple",
  "pink",
  "orange",
];

export const getSecondaryColor = (color: string) => {
  return secondaryColors[color as keyof typeof secondaryColors];
};

export const icons = [
  {
    name: "briefcase",
    Icon: BriefcaseBusiness,
  },
  {
    name: "car-front",
    Icon: CarFront,
  },
  {
    name: "heart-pulse",
    Icon: HeartPulse,
  },
  {
    name: "piggy-bank",
    Icon: PiggyBank,
  },
  { name: "shopping-cart", Icon: ShoppingCart },
  { name: "ticket", Icon: Ticket },
  { name: "tool-case", Icon: ToolCase },
  { name: "utensils", Icon: Utensils },
  { name: "paw-print", Icon: PawPrint },
  { name: "house", Icon: House },
  { name: "gift", Icon: Gift },
  { name: "dumbbell", Icon: Dumbbell },
  { name: "book-open", Icon: BookOpen },
  { name: "baggage-claim", Icon: BaggageClaim },
  { name: "mailbox", Icon: Mailbox },
  { name: "receipt-text", Icon: ReceiptText },
];
