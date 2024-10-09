interface CustomerProps {
  name: string;
  initialDeposit: number;
  password: string;
  role: "customer" | "manager";
}
export { CustomerProps };
