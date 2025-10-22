import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

interface OverviewProps {
	course: {
		sections: Array<{
			title: string;
			contents: any[];
		}>;
	};
}

const Overview: React.FC<OverviewProps> = ({ course }) => {
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
						course.sections && course.sections.length > 0 ? (
							course.sections.map((section: any, index: number) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{section.title || 'Untitled Section'}</TableCell>
									<TableCell className="text-right">
										{section.contents ? `${section.contents.length} items` : 'No content'}
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={2} className="text-center text-gray-500">
									No course overview available
								</TableCell>
							</TableRow>
						)
					}
				</TableBody>
			</Table>
		</div>
	);
};

export default Overview;