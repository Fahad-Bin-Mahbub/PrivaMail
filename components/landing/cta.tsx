"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";

export function CTA() {
	return (
		<section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 py-16 sm:py-20 overflow-hidden">
			<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
			<div className="absolute right-0 top-0 -mr-40 -mt-40 w-80 h-80 rounded-full bg-purple-400 filter blur-3xl opacity-30"></div>
			<div className="absolute left-0 bottom-0 -ml-40 -mb-40 w-80 h-80 rounded-full bg-indigo-400 filter blur-3xl opacity-30"></div>

			<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
				<div>
					<h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
						<span className="block">Ready to secure your emails?</span>
						<span className="block text-indigo-200">
							Start encrypting your communications today.
						</span>
					</h2>
				</div>
				<div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 lg:ml-8 space-x-4">
					<div className="inline-flex rounded-md shadow">
						<Link
							href="/register"
							className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors duration-200"
						>
							<LucideIcons.UserPlus className="mr-2 h-5 w-5" />
							Get started
						</Link>
					</div>
					<div className="inline-flex rounded-md shadow">
						<a
							href="#how-it-works"
							className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70 transition-colors duration-200"
						>
							<LucideIcons.Info className="mr-2 h-5 w-5" />
							Learn more
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
