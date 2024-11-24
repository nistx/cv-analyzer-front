"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Rating, Star } from "@smastrom/react-rating"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CV } from "@/types/jobTypes"

const customStyles = {
	itemShapes: Star,
	activeFillColor: "white",
	activeBoxColor: "black",
	inactiveFillColor: "white",
	inactiveBoxColor: "#cdcdcd",
}

export const columns: ColumnDef<CV>[] = [
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
		accessorFn: row => row.personal_data?.name || "N/A",
		cell: ({ row }) => row.original.personal_data?.name || "N/A",
	},
	{
		accessorKey: "personal_data.role",
		header: "Rol",
		accessorFn: row => row.personal_data?.role || "N/A",
		cell: ({ row }) => (
			<Badge variant="secondary">{row.original.personal_data?.role}</Badge>
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
		accessorFn: row => row.ranking || 0,
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
