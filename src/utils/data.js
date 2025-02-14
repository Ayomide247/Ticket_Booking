import { Regular, vip, vvip } from "../assets/index";

export const TICKET_TYPES = [
  {
    id: 1,
    name: "REGULAR ACCESS",
    price: "FREE",
    img: Regular,
    units: "20/52",
  },
  {
    id: 2,
    name: "VIP ACCESS",
    price: "$150",
    img: vip,
    units: "18/30",
  },
  {
    id: 3,
    name: "VVIP ACCESS",
    price: "$300",
    img: vvip,
    units: "12/25",
  },
];
