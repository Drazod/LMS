import {
	Card,
	CardContent,
} from "@/components/ui/card";
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
	FacebookLogoIcon,
	LinkedinLogoIcon,
	XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

const Instructor = ({ course }) => {
	return (
		<>
			<h4 className="mt-10 mb-5 text-xl md:text-2xl font-semibold ">Instructor</h4>
			<Card className="flex flex-row gap-6">
				<CardContent>
					<div className="flex flex-row justify-between items-start gap-6 mb-4">
						<div className="flex flex-row items-center gap-4">
							<Avatar className="w-20 h-20">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div>
								<h6 className="text-2xl font-black">John Doe</h6>
								<p>Professor</p>
							</div>
						</div>
						<div>
							<Button variant="ghost" size="icon" className="size-8" asChild>
								<a href="https://www.facebook.com">
									<FacebookLogoIcon weight="duotone" className="!size-7" />
								</a>
							</Button>
							<Button variant="ghost" size="icon" className="size-8" asChild>
								<a href="https://www.google.com">
									<XLogoIcon weight="duotone" className="!size-7" />
								</a>
							</Button>
							<Button variant="ghost" size="icon" className="size-8" asChild>
								<a href="https://www.linkedin.com">
									<LinkedinLogoIcon weight="duotone" className="!size-7" />
								</a>
							</Button>
						</div>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet
						risus lacus. Donec urna felis, placerat eu turpis et, lacinia pellentesque
						quam. Pellentesque et libero condimentum, porta metus eleifend, luctus
						velit. Nam tempor enim velit, faucibus pellentesque purus imperdiet vel.
						Sed id posuere dolor, a vehicula ligula. In mattis fermentum pulvinar.
						Suspendisse ut nibh sapien. Sed sit amet pulvinar velit, eget feugiat eros.
						Nunc vel massa lorem. Vivamus tellus elit, posuere eu dui ac, accumsan.
					</p>
				</CardContent>
			</Card>
		</>
	);
};

export default Instructor;