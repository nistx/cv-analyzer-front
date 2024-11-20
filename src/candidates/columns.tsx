"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Rating, Star } from "@smastrom/react-rating"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const customStyles = {
	itemShapes: Star,
	activeFillColor: "white",
	activeBoxColor: "black",
	inactiveFillColor: "white",
	inactiveBoxColor: "#cdcdcd",
}

export type Candidate = {
	id: string
	personal_data: {
		name: string
		role: string
	}
	ranking: number
}

export const columns: ColumnDef<Candidate>[] = [
	{
		accessorKey: "personal_data.name",
		id: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Nombre
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => row.original.personal_data?.name || "N/A",
	},
	{
		accessorKey: "personal_data.role",
		header: "Rol",
		cell: ({ row }) => (
			<Badge variant="secondary">{row.original.personal_data.role}</Badge>
		),
	},
	{
		accessorKey: "ranking",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Puntaje
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<Rating
				value={row.original.ranking}
				readOnly
				style={{ maxWidth: 100 }}
				itemStyles={customStyles}
				radius="medium"
				spaceInside="large"
				spaceBetween="small"
			/>
		),
	},
]
