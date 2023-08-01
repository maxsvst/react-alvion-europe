import { MouseEventHandler } from "react";

export interface IItem {
  id: number;
  subject: string;
  description: string;
  createdBy: string;
  startDate: string;
  endDate: string;
  cost: number;
}

export interface IButtonProps {
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}
