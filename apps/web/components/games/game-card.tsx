"use client";

import { cn } from "@/lib/utils";
import type { Game } from "@/types/game";
import Image from "next/image";
import * as React from "react";

interface GameCardProps {
	game: Game;
	className?: string;
	onClick?: () => void;
}

function GameCard({ game, className, onClick }: GameCardProps) {
	const [imageError, setImageError] = React.useState(false);

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 cursor-pointer",
				"before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
				className
			)}
			onClick={onClick}>
			{/* Glow effect */}
			<div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-sm rounded-lg transition-opacity duration-300" />

			{/* Card content */}
			<div className="relative flex flex-col bg-card p-6 rounded-lg h-full">
				{/* Game logo/image */}
				<div className="flex justify-center items-center bg-muted/50 mx-auto mb-4 border group-hover:border-primary/30 border-border/50 rounded-lg w-20 h-20 transition-colors duration-300">
					{game.logo && !imageError ? (
						<Image
							src={game.logo}
							alt={`${game.name} logo`}
							className="rounded-md object-contain"
							onError={() => setImageError(true)}
							width={64}
							height={64}
						/>
					) : (
						// Fallback placeholder
						<div className="flex justify-center items-center bg-gradient-to-br from-primary/20 to-accent/20 rounded-md w-16 h-16 font-bold text-primary text-xl">
							{game.name.charAt(0).toUpperCase()}
						</div>
					)}
				</div>

				{/* Game name */}
				<h3 className="mb-2 font-semibold text-foreground group-hover:text-primary text-lg text-center line-clamp-2 transition-colors duration-300">
					{game.name}
				</h3>

				{/* Game description */}
				{game.description && (
					<p className="flex-1 text-muted-foreground text-sm text-center line-clamp-3">
						{game.description}
					</p>
				)}

				{/* Hover indicator */}
				<div className="top-2 right-2 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<div className="bg-primary rounded-full w-2 h-2 animate-pulse" />
				</div>
			</div>
		</div>
	);
}

GameCard.displayName = "GameCard";

export { GameCard };
