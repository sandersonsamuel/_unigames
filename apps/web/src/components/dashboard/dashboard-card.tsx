import { ReactNode } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  children: ReactNode;
  title: string;
  icon: ReactNode;
};

export const DashboardCard = ({ children, icon, title }: Props) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="items-center justify-between flex">
        <CardTitle className="w-fit">{title}</CardTitle>
        <CardAction>{icon}</CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
