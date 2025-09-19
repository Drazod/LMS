import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

const Overview = ({ course }) => {
	return (
		<div className="scroll-smooth w-60">
			<h4 className="mt-10 mb-5 text-xl md:text-2xl font-semibold">Overview</h4>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead className="text-right">Duration</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{
						course.courseOverview.map((level: { title: string; duration: string }, index: number) => (
							<TableRow key={index}>
								<TableCell className="font-medium">{level.title}</TableCell>
								<TableCell className="text-right">{level.duration}</TableCell>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</div>
	);
};

export default Overview;