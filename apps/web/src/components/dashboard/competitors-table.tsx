"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardCompetitorsType } from "@/types/competitors";

interface CompetitorsTableProps {
  competitors: DashboardCompetitorsType[];
}

export function CompetitorsTable({ competitors }: CompetitorsTableProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [studentFilter, setStudentFilter] = useState<"all" | "student">("all");
  const [presenceFilter, setPresenceFilter] = useState<
    "all" | "present" | "absent"
  >("all");

  const filteredCompetitors = useMemo(() => {
    return competitors.filter((competitor) => {
      const nameMatch = competitor.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());

      const studentMatch =
        studentFilter === "all" ||
        (studentFilter === "student" && !!competitor.registration);

      const presenceMatch =
        presenceFilter === "all" ||
        (presenceFilter === "present" && competitor.ticketRedeemed) ||
        (presenceFilter === "absent" && !competitor.ticketRedeemed);

      return nameMatch && studentMatch && presenceMatch;
    });
  }, [competitors, nameFilter, studentFilter, presenceFilter]);

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap items-end gap-4">

        <div className="grid items-center gap-1.5">
          <label htmlFor="name-filter">Nome do Competidor</label>
          <Input
            variantSize="sm"
            id="name-filter"
            placeholder="Filtrar por nome..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>

        <div className="grid items-center gap-1.5">
          <label htmlFor="student-filter">Tipo de Inscrição</label>
          <Select
            value={studentFilter}
            onValueChange={(value) => setStudentFilter(value as any)}
          >
            <SelectTrigger id="student-filter" className="w-full">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="student">Apenas Alunos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid items-center gap-1.5">
          <label htmlFor="presence-filter">Status de Presença</label>
          <Select
            value={presenceFilter}
            onValueChange={(value) => setPresenceFilter(value as any)}
          >
            <SelectTrigger id="presence-filter" className="w-full">
              <SelectValue placeholder="Filtrar por presença" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="present">Presentes</SelectItem>
              <SelectItem value="absent">Ausentes</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary-foreground/70">
            <TableHead>Nome</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Presente</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompetitors.length > 0 ? (
            filteredCompetitors.map((competitor) => (
              <TableRow key={competitor.id}>
                <TableCell className="font-medium">{competitor.name}</TableCell>
                <TableCell>{competitor.registration ?? "-"}</TableCell>
                <TableCell>
                  {competitor.ticketRedeemed ? "Sim" : "Não"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Nenhum competidor encontrado com os filtros selecionados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
