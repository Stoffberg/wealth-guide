import {
	BookOpen,
	Calculator,
	Compass,
	Cpu,
	CreditCard,
	Heart,
	LineChart,
	Menu,
	ShoppingCart,
	Sparkles,
	Target,
	X,
} from "lucide-react";
import { useState } from "react";
import FoodGuide from "./FoodGuide";
import MoneyCalculator from "./MoneyCalculator";
import PurpleBenefits from "./PurpleBenefits";
import RewardsEstimator from "./RewardsEstimator";
import TechStrategy from "./TechStrategy";

type Module =
	| "intro"
	| "philosophy"
	| "money"
	| "health"
	| "tactical"
	| "toolkit"
	| "bottomline";

interface ModuleInfo {
	id: Module;
	title: string;
	description: string;
	icon: React.ElementType;
}

export default function App() {
	const [currentModule, setCurrentModule] = useState<Module>("intro");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const modules: ModuleInfo[] = [
		{
			id: "intro",
			title: "Introduction",
			description: "Why This Guide Exists",
			icon: BookOpen,
		},
		{
			id: "philosophy",
			title: "The Philosophy",
			description: "Why Discovery Purple Exists",
			icon: Compass,
		},
		{
			id: "money",
			title: "Vitality Money",
			description: "The Six Behaviours",
			icon: CreditCard,
		},
		{
			id: "health",
			title: "Vitality Health",
			description: "How Health Boosts Money",
			icon: Heart,
		},
		{
			id: "tactical",
			title: "Tactical Health",
			description: "Food & Tech Strategy",
			icon: Target,
		},
		{
			id: "toolkit",
			title: "The Toolkit",
			description: "All Purple Benefits",
			icon: Sparkles,
		},
		{
			id: "bottomline",
			title: "The Bottom Line",
			description: "Your ROI Calculator",
			icon: Calculator,
		},
	];

	const currentIndex = modules.findIndex((m) => m.id === currentModule);

	return (
		<div className="flex min-h-screen">
			{/* Mobile Header */}
			<header className="fixed top-0 right-0 left-0 z-50 border-slate-200/50 border-b bg-white/80 backdrop-blur-xl lg:hidden">
				<div className="flex h-16 items-center justify-between px-4">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-gradient">
							<LineChart className="h-4 w-4 text-white" />
						</div>
						<h1 className="font-bold text-slate-900">Purple Guide</h1>
					</div>
					<button
						type="button"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
					>
						{mobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</header>

			{/* Mobile Menu Overlay */}
			{mobileMenuOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={() => setMobileMenuOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`glass fixed top-16 left-0 z-40 h-screen w-72 transform border-slate-200/50 border-r transition-transform duration-200 ease-in-out lg:top-0 ${
					mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
				} lg:translate-x-0`}
			>
				<div className="flex h-full flex-col">
					{/* Logo */}
					<div className="hidden px-6 py-6 lg:block">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-gradient">
								<LineChart className="h-5 w-5 text-white" />
							</div>
							<div>
								<h1 className="font-bold text-lg text-slate-900">
									Purple Guide
								</h1>
								<p className="text-slate-500 text-xs">Discovery Suite</p>
							</div>
						</div>
					</div>

					{/* Progress indicator */}
					<div className="px-6 pt-6 pb-4 lg:pt-0">
						<div className="mb-2 flex items-center justify-between">
							<span className="font-medium text-slate-500 text-xs">
								Progress
							</span>
							<span className="font-semibold text-purple-600 text-xs">
								{currentIndex + 1} / {modules.length}
							</span>
						</div>
						<div className="progress">
							<div
								className="progress-bar"
								style={{
									width: `${((currentIndex + 1) / modules.length) * 100}%`,
								}}
							/>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 overflow-y-auto px-4 pb-6">
						<div className="stagger-children space-y-1.5">
							{modules.map((module, index) => {
								const Icon = module.icon;
								const isActive = currentModule === module.id;
								const isPast = index < currentIndex;

								return (
									<button
										type="button"
										key={module.id}
										onClick={() => {
											setCurrentModule(module.id);
											setMobileMenuOpen(false);
										}}
										className={`nav-item w-full text-left ${
											isActive ? "nav-item-active" : ""
										}`}
									>
										<div className="flex items-center gap-3">
											<div
												className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
													isActive
														? "bg-white/20"
														: isPast
															? "bg-purple-100"
															: "bg-slate-100"
												}`}
											>
												<Icon
													className={`h-4 w-4 ${
														isActive
															? "text-white"
															: isPast
																? "text-purple-600"
																: "text-slate-500"
													}`}
												/>
											</div>
											<div className="min-w-0 flex-1">
												<div
													className={`truncate font-medium text-sm ${
														isActive ? "text-white" : "text-slate-700"
													}`}
												>
													{module.title}
												</div>
												<div
													className={`truncate text-xs ${
														isActive ? "text-white/70" : "text-slate-500"
													}`}
												>
													{module.description}
												</div>
											</div>
											{isPast && !isActive && (
												<div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600">
													<svg
														className="h-3 w-3 text-white"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														aria-hidden="true"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2.5}
															d="M5 13l4 4L19 7"
														/>
													</svg>
												</div>
											)}
										</div>
									</button>
								);
							})}
						</div>
					</nav>

					{/* Footer */}
					<div className="border-slate-200/50 border-t px-6 py-4">
						<div className="rounded-xl bg-purple-100 p-4">
							<p className="font-medium text-purple-800 text-xs">
								💡 Pro tip: Complete each section in order for best results.
							</p>
						</div>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="ml-0 flex-1 pt-16 lg:ml-72 lg:pt-0">
				<div className="animate-fade-in">
					{currentModule === "intro" && <IntroSection />}
					{currentModule === "philosophy" && <PhilosophySection />}
					{currentModule === "money" && <MoneyCalculator />}
					{currentModule === "health" && <HealthSection />}
					{currentModule === "tactical" && <TacticalSection />}
					{currentModule === "toolkit" && <PurpleBenefits />}
					{currentModule === "bottomline" && <RewardsEstimator />}
				</div>
			</main>
		</div>
	);
}

function IntroSection() {
	return (
		<div className="container-mobile">
			{/* Hero */}
			<div className="mb-12">
				<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-purple-700 text-sm">
					<Sparkles className="h-4 w-4" />
					Complete Guide
				</div>
				<h1 className="section-header mb-4 text-4xl md:text-5xl">
					The Complete Discovery
					<span className="block text-purple-600">Purple Guide</span>
				</h1>
				<p className="max-w-2xl text-slate-600 text-xl">
					Learn exactly how to maximize Discovery Purple Suite. No marketing
					fluff. No "up to" vagueness. Just clear, actionable rules.
				</p>
			</div>

			{/* Value prop cards */}
			<div className="grid-mobile grid-mobile-cols-3 mb-12">
				{[
					{
						icon: Target,
						title: "Actionable",
						desc: "Step-by-step rules you can follow today",
					},
					{
						icon: Calculator,
						title: "Quantified",
						desc: "Exact calculations and thresholds",
					},
					{
						icon: LineChart,
						title: "ROI Focused",
						desc: "See your real returns in rands",
					},
				].map((item) => (
					<div key={item.title} className="card p-5">
						<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
							<item.icon className="h-5 w-5 text-purple-600" />
						</div>
						<h3 className="mb-1 font-semibold text-slate-900">{item.title}</h3>
						<p className="text-slate-600 text-sm">{item.desc}</p>
					</div>
				))}
			</div>

			{/* How to use */}
			<div className="card-purple mb-8 p-8">
				<h2 className="section-subheader mb-6 flex items-center gap-2">
					<BookOpen className="h-5 w-5 text-purple-600" />
					How to Use This Guide
				</h2>
				<div className="space-y-4">
					{[
						'Start with "The Philosophy" to understand why Purple exists',
						'Go through "Vitality Money" to learn the six behaviours',
						'Read "Vitality Health" to see how health multiplies your rewards',
						'Study "Tactical Health" for specific shopping lists and tech strategies',
						'Review "The Toolkit" for all benefits and their requirements',
						'Use "The Bottom Line" calculator to see your exact ROI',
					].map((step, index) => (
						<div key={step} className="flex items-start gap-4">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 font-semibold text-sm text-white">
								{index + 1}
							</div>
							<p className="pt-0.5 text-slate-700">{step}</p>
						</div>
					))}
				</div>
			</div>

			{/* Warning */}
			<div className="alert alert-warning">
				<div className="flex items-start gap-3">
					<div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<div>
						<h3 className="font-semibold text-amber-800">The Rule</h3>
						<p className="mt-1 text-amber-700">
							<strong>Do not skip sections.</strong> Each module builds on the
							previous one. If you jump to the calculator without understanding
							the behaviours, you'll make mistakes.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function PhilosophySection() {
	return (
		<div className="container-mobile">
			<div className="mb-10">
				<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-purple-700 text-sm">
					<Compass className="h-4 w-4" />
					Module 1
				</div>
				<h1 className="section-header mb-4 text-4xl">
					The Philosophy: Why Discovery Purple Exists
				</h1>
			</div>

			<div className="stagger-children space-y-8">
				{/* Problem */}
				<div className="card p-8">
					<h2 className="section-subheader mb-4">
						The Problem Discovery Solved
					</h2>
					<p className="mb-6 text-slate-600">
						South Africans have a financial health crisis:
					</p>
					<div className="grid-mobile grid-mobile-cols-2">
						{[
							{ stat: "53%", label: "of people borrowed in 2017" },
							{ stat: "24.3M", label: "credit-active consumers" },
							{ stat: "40%", label: "are impaired (can't pay debts)" },
							{ stat: "0.3%", label: "net household savings rate" },
						].map((item) => (
							<div key={item.label} className="rounded-lg bg-slate-50 p-4">
								<div className="font-bold text-2xl text-purple-600">
									{item.stat}
								</div>
								<div className="text-slate-600 text-sm">{item.label}</div>
							</div>
						))}
					</div>
				</div>

				{/* Five behaviours */}
				<div className="card p-8">
					<h2 className="section-subheader mb-6">
						The Five Controllable Behaviours
					</h2>
					<p className="mb-6 text-slate-600">
						Discovery identified that 5 behaviours drive financial health:
					</p>
					<div className="space-y-4">
						{[
							{
								num: 1,
								title: "Spend less than you earn",
								desc: "Basic math, but most people don't do it",
							},
							{
								num: 2,
								title: "Save regularly",
								desc: "Emergency fund first, then long-term",
							},
							{
								num: 3,
								title: "Insure for adverse events",
								desc: "Life, disability, medical, short-term",
							},
							{
								num: 4,
								title: "Pay off your property",
								desc: "Own your home by retirement",
							},
							{
								num: 5,
								title: "Invest for the long term",
								desc: "Retirement planning is non-negotiable",
							},
						].map((item) => (
							<div
								key={item.num}
								className="flex items-start gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
							>
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-gradient font-bold text-sm text-white">
									{item.num}
								</div>
								<div>
									<h3 className="font-semibold text-slate-900">{item.title}</h3>
									<p className="text-slate-600 text-sm">{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* How Vitality Money Works */}
				<div className="card-purple p-8">
					<h2 className="section-subheader mb-4 flex items-center gap-2">
						<CreditCard className="h-5 w-5 text-purple-600" />
						How Vitality Money Works
					</h2>
					<p className="mb-6 text-slate-700">
						Vitality Money is the behaviour-change layer over banking:
					</p>
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
							<p className="text-slate-700">
								<strong>Measures</strong> your financial health via structured
								behaviours and ratios
							</p>
						</div>
						<div className="flex items-start gap-3">
							<div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
							<p className="text-slate-700">
								<strong>Gives you a status</strong> (Blue → Bronze → Silver →
								Gold → Diamond)
							</p>
						</div>
						<div className="flex items-start gap-3">
							<div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-500" />
							<div className="text-slate-700">
								<strong>Rewards better behaviour</strong> with:
								<ul className="mt-2 ml-4 space-y-1 text-sm">
									<li>• Higher rewards (HealthyFood, flights, fuel, etc.)</li>
									<li>
										• Better Dynamic Interest Rates (higher on savings, lower on
										debt)
									</li>
									<li>• Discovery Miles and product integrations</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Shared Value Model */}
				<div className="alert alert-info">
					<h3 className="mb-2 flex items-center gap-2 font-semibold">
						<Sparkles className="h-4 w-4" />
						The Shared-Value Model
					</h3>
					<p className="mb-3">
						Discovery makes money when you're healthy and financially stable.
						You make money when you're healthy and financially stable. This
						alignment means the rewards are real, not marketing gimmicks.
					</p>
					<p className="font-semibold">
						The Rule: If Discovery is incentivizing you to do something, it's
						because it makes financial sense for both of you. Trust the system.
					</p>
				</div>
			</div>
		</div>
	);
}

function HealthSection() {
	return (
		<div className="container-mobile">
			<div className="mb-10">
				<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-purple-700 text-sm">
					<Heart className="h-4 w-4" />
					Module 3
				</div>
				<h1 className="section-header mb-4 text-4xl">
					Vitality Health: The Multiplier
				</h1>
			</div>

			<div className="stagger-children space-y-8">
				{/* Health Boosts Money */}
				<div className="card-purple p-8">
					<h2 className="section-subheader mb-4">How Health Boosts Money</h2>
					<p className="mb-6 text-slate-700">
						Vitality Health status multiplies your Vitality Money rewards:
					</p>
					<div className="grid-mobile grid-mobile-cols-2">
						{[
							{
								label: "HealthyFood",
								formula: "25% Health + 50% Money",
								max: "75%",
							},
							{
								label: "HealthyCare",
								formula: "25% Health + 25% Money",
								max: "50%",
							},
							{
								label: "Flights",
								formula: "25% Health + 50% Money",
								max: "75%",
							},
							{ label: "Gym", formula: "Based on status", max: "75%" },
						].map((item) => (
							<div
								key={item.label}
								className="rounded-lg border border-purple-200 bg-white p-4"
							>
								<div className="font-semibold text-slate-900">{item.label}</div>
								<div className="mt-1 text-slate-600 text-sm">
									{item.formula}
								</div>
								<div className="mt-2 font-bold text-2xl text-purple-600">
									= {item.max}
								</div>
							</div>
						))}
					</div>
					<div className="mt-6 rounded-lg bg-purple-100 p-4">
						<p className="font-semibold text-purple-800">
							The Rule: You cannot maximize Purple without Vitality Health. They
							are designed to work together.
						</p>
					</div>
				</div>

				{/* Status Thresholds */}
				<div className="card p-8">
					<h2 className="section-subheader mb-4">
						Status Thresholds (Per Calendar Year)
					</h2>
					<div className="table-mobile">
						<table className="table">
							<thead>
								<tr>
									<th>Status</th>
									<th>Single</th>
									<th>Main + 1</th>
									<th>Main + 2</th>
								</tr>
							</thead>
							<tbody>
								{[
									{
										status: "Bronze",
										badge: "badge-bronze",
										single: "7,500",
										plus1: "15,000",
										plus2: "18,750",
									},
									{
										status: "Silver",
										badge: "badge-silver",
										single: "25,000",
										plus1: "50,000",
										plus2: "62,500",
									},
									{
										status: "Gold",
										badge: "badge-gold",
										single: "40,000",
										plus1: "80,000",
										plus2: "100,000",
									},
									{
										status: "Diamond",
										badge: "badge-diamond",
										single: "50,000",
										plus1: "100,000",
										plus2: "125,000",
									},
								].map((row) => (
									<tr key={row.status}>
										<td>
											<span className={`badge ${row.badge}`}>{row.status}</span>
										</td>
										<td className="font-medium">{row.single}</td>
										<td className="font-medium">{row.plus1}</td>
										<td className="font-medium">{row.plus2}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="mt-4 text-slate-500 text-sm">
						Points reset every year. Status rolls over for 1 year if you don't
						requalify.
					</p>
				</div>

				{/* How to Earn Points */}
				<div className="card p-8">
					<h2 className="section-subheader mb-6">How to Earn Points</h2>
					<div className="grid gap-6">
						{[
							{
								title: "Know Your Health",
								max: "25,000",
								icon: Heart,
								items: [
									"Vitality Health Check: Up to 22,500 points (5 measures in range = max)",
									"Vitality Age assessment: 1,500 points (once per year)",
									"Mental Wellbeing: 1,000 points (twice per year)",
									"Additional screenings: Age/gender based (colon, bone density, dental, etc.)",
								],
							},
							{
								title: "Get Active",
								max: "35,000",
								icon: Target,
								items: [
									"Workouts: Up to 30,000 points (30+ min sessions, heart rate based)",
									"Steps: 5,000-9,999 = 50 pts, 10,000+ = 100 pts per day",
									"VO₂ max: Up to 10,000 points",
									"Races: Up to 3,000 points per event (marathon = 3,000)",
								],
							},
							{
								title: "Eat Well",
								max: "12,000",
								icon: ShoppingCart,
								items: [
									"HealthyFood Score: 20 points per healthy item, -20 per unhealthy",
									"Dietitian consultation: 1,000 points",
								],
							},
							{
								title: "Sleep Well",
								max: "6,000",
								icon: Cpu,
								items: [
									"Track sleep with Oura Ring, Apple Watch, or compatible device",
									"Points based on sleep quality scores",
								],
							},
						].map((section) => (
							<div
								key={section.title}
								className="rounded-lg border border-slate-200 bg-slate-50 p-5"
							>
								<div className="mb-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100">
											<section.icon className="h-5 w-5 text-purple-600" />
										</div>
										<h3 className="font-semibold text-slate-900">
											{section.title}
										</h3>
									</div>
									<div className="font-semibold text-purple-600 text-sm">
										Up to {section.max} pts
									</div>
								</div>
								<ul className="space-y-2 text-slate-600 text-sm">
									{section.items.map((item) => (
										<li key={item} className="flex items-start gap-2">
											<span className="mt-1 text-purple-500">•</span>
											{item}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* The Rule */}
				<div className="alert alert-warning">
					<h3 className="mb-2 font-semibold">The Rule</h3>
					<p>
						<strong>Do the Vitality Health Check every year.</strong> It's
						22,500 points. That's almost half of what you need for Gold status.
						Do not skip it. Book it in January.
					</p>
				</div>
			</div>
		</div>
	);
}

function TacticalSection() {
	return (
		<div className="space-y-0">
			<FoodGuide />
			<TechStrategy />
		</div>
	);
}
