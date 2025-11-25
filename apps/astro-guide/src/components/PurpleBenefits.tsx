import {
	AlertTriangle,
	Calendar,
	Car,
	CheckCircle2,
	Coffee,
	CreditCard,
	Dumbbell,
	Laptop,
	Plane,
	Shield,
	ShoppingBag,
	Sparkles,
	Star,
	Users,
} from "lucide-react";

interface BenefitCardProps {
	title: string;
	icon: React.ElementType;
	requirement?: string;
	benefit: string;
	warning?: string;
	tip?: string;
	value?: string;
}

function BenefitCard({
	title,
	icon: Icon,
	requirement,
	benefit,
	warning,
	tip,
	value,
}: BenefitCardProps) {
	return (
		<div className="card flex h-full flex-col p-5">
			<div className="mb-3 flex items-start justify-between">
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
					<Icon className="h-5 w-5 text-purple-600" />
				</div>
				{value && (
					<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 font-semibold text-green-700 text-xs">
						<Star className="h-3 w-3" />
						{value}
					</span>
				)}
			</div>
			<h4 className="mb-2 font-semibold text-slate-900">{title}</h4>

			{requirement && (
				<div className="mb-2 text-slate-500 text-xs">
					<span className="font-medium text-slate-700">Requirement:</span>{" "}
					{requirement}
				</div>
			)}

			<p className="flex-1 text-slate-600 text-sm">{benefit}</p>

			{warning && (
				<div className="mt-3 flex items-start gap-2 text-red-600 text-xs">
					<AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
					{warning}
				</div>
			)}

			{tip && (
				<div className="mt-3 flex items-start gap-2 text-green-600 text-xs">
					<CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
					{tip}
				</div>
			)}
		</div>
	);
}

export default function PurpleBenefits() {
	return (
		<div className="container-mobile max-w-6xl">
			{/* Header */}
			<div className="mb-10">
				<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-purple-700 text-sm">
					<Sparkles className="h-4 w-4" />
					Benefits Guide
				</div>
				<h1 className="section-header mb-4 text-4xl">
					Purple Suite: The Complete Toolkit
				</h1>
				<p className="text-lg text-slate-600">
					Every benefit available to Purple Suite members
				</p>
			</div>

			{/* Premium Travel Section */}
			<section className="mb-12">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-gradient text-white">
						<Plane className="h-5 w-5" />
					</div>
					<h2 className="section-subheader">Premium Travel</h2>
				</div>

				<div className="grid-mobile grid-mobile-cols-2">
					<BenefitCard
						title="International Business Class Flights"
						icon={Plane}
						requirement="Annual card spend ≥ R1,080,000 (R90k/month). Average positive balance ≥ R250,000 over 12 months."
						benefit="Up to 75% off 1 return business class flight per year (British Airways, Emirates, etc.). Typically saves R40,000-R50,000."
						warning="Do not book unless you meet both requirements. The system will reject it."
						value="R50k/year"
					/>
					<BenefitCard
						title="Local Flights"
						icon={Plane}
						requirement="Average monthly card spend ≥ R3,000."
						benefit="Up to 75% off 3 return economy flights per year (6 one-way). Maximum discount: R7,500 per policy per year."
						warning="Do not book more than 3 return flights. After that, you get 10% off unlimited."
						value="R7.5k/year"
					/>
					<BenefitCard
						title="Lounge Access"
						icon={Coffee}
						benefit="The Lounge (SA): Unlimited domestic & international if monthly spend ≥ R22,500. Otherwise: 2 domestic + 1 international free per year. DragonPass (Global): Unlimited at 1,200+ lounges worldwide. No spend requirement."
						tip="Value: R500 per visit. If you travel 12x/year = R6,000 value."
						value="R6k/year"
					/>
					<BenefitCard
						title="Priority Fast Track"
						icon={Users}
						benefit="Show your Purple card at OR Tambo & Cape Town domestic departures, and OR Tambo International arrivals. You + up to 5 guests get fast-track security/immigration."
						tip="Saves 15-30 minutes per trip. Priceless during peak travel."
					/>
					<BenefitCard
						title="Accommodation & Car Hire"
						icon={Car}
						requirement="Average monthly spend ≥ R3,000 for 25% discount."
						benefit="Up to 25% off unlimited bookings via Vitality Travel. Does not stack above 25% even with Vitality Health."
					/>
				</div>
			</section>

			{/* Technology & Home Section */}
			<section className="mb-12">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-gradient text-white">
						<Laptop className="h-5 w-5" />
					</div>
					<h2 className="section-subheader">Technology & Home</h2>
				</div>

				<div className="grid-mobile grid-mobile-cols-2">
					<BenefitCard
						title="Apple Products (MacBook, iPad, iPhone)"
						icon={Laptop}
						requirement="Rolling 12-month card spend ≥ R750,000. Average positive balance ≥ R250,000 over 12 months. Vitality Health member."
						benefit="50% off up to R25,000 value. Maximum saving: R12,500 per year."
						warning="Critical: Your first purchase locks in the cap. If you buy Apple first, you're capped at R25k."
						value="R12.5k/year"
					/>
					<BenefitCard
						title="Technogym Equipment"
						icon={Dumbbell}
						requirement="Same as Apple (R750k spend, R250k balance, Vitality Health)."
						benefit="50% off up to R50,000 value. Maximum saving: R25,000 per year."
						tip="Strategy: If you want both, buy Technogym first to lock in the R50k cap."
						value="R25k/year"
					/>
					<BenefitCard
						title="Purple Concierge"
						icon={Sparkles}
						benefit="Dedicated service for sourcing gifts, tech, exclusive items, travel bookings, restaurant reservations."
						tip="Saves hours of research. Use it for high-value purchases or hard-to-find items."
					/>
				</div>
			</section>

			{/* Daily Essentials Section */}
			<section className="mb-12">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-gradient text-white">
						<ShoppingBag className="h-5 w-5" />
					</div>
					<h2 className="section-subheader">Daily Essentials</h2>
				</div>

				<div className="grid-mobile grid-mobile-cols-2">
					<BenefitCard
						title="HealthyFood (Checkers & Woolworths)"
						icon={ShoppingBag}
						requirement="Buy items with Vitality logo. Must be organic, free range, no added sugar, or skinless."
						benefit="Up to 75% back (25% Health + 50% Money at Diamond/Diamond). Cap: R5,000/month (family) or R2,500/month (single)."
						warning="Do not spend more than the cap. You get zero rewards after R5,000."
						value="R3.75k/mo"
					/>
					<BenefitCard
						title="HealthyCare (Clicks & Dis-Chem)"
						icon={ShoppingBag}
						benefit="Up to 50% back (25% Health + 25% Money). Cap: R4,000/month (family) or R2,000/month (single)."
						value="R2k/mo"
					/>
					<BenefitCard
						title="Fuel & Uber (bp, Shell, Uber)"
						icon={Car}
						requirement="Monthly spend ≥ R3,000 to qualify."
						benefit="Up to 20% back at Diamond status with R39k+ monthly spend. Scales down based on status and spend."
						warning="Do not expect 20% if you're Blue status or spending less than R3,000/month."
						value="Up to 20%"
					/>
				</div>
			</section>

			{/* Fitness Section */}
			<section className="mb-12">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-gradient text-white">
						<Dumbbell className="h-5 w-5" />
					</div>
					<h2 className="section-subheader">Fitness & Vitality</h2>
				</div>

				<div className="grid-mobile grid-mobile-cols-2">
					<BenefitCard
						title="Gym Memberships (Virgin Active, Planet Fitness)"
						icon={Dumbbell}
						benefit="Up to 75% off single-club membership. Virgin Active Collection typically R1,300/month → R325/month after discount."
						tip="Value: R975/month = R11,700/year savings."
						value="R11.7k/year"
					/>
					<BenefitCard
						title="Sports Gear (Garmin, Nike, etc.)"
						icon={Dumbbell}
						benefit="Up to 25% off qualifying sports gear. Caps: R1,000/month (general), R4,000/year (Nike), R8,000 (Garmin devices)."
					/>
				</div>
			</section>

			{/* Banking Section */}
			<section className="mb-12">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-gradient text-white">
						<CreditCard className="h-5 w-5" />
					</div>
					<h2 className="section-subheader">Banking Power</h2>
				</div>

				<div className="grid-mobile grid-mobile-cols-2">
					<BenefitCard
						title="Dedicated Relationship Banker"
						icon={Users}
						benefit="Personal banker on call for all banking needs, credit applications, investment advice."
						tip="Saves hours of phone queues. Use them for everything banking-related."
					/>
					<BenefitCard
						title="Virtual Cards (50 Free)"
						icon={CreditCard}
						benefit="Create up to 50 virtual cards for safer online shopping. Set spending limits, freeze/unfreeze instantly."
						tip="Prevents fraud. Use one card per online merchant. If one gets compromised, freeze it and create a new one."
					/>
					<BenefitCard
						title="Dynamic Interest"
						icon={Shield}
						benefit="Higher interest on savings (up to 1.6% transactional, 5.75% savings), lower rates on borrowing (up to 7% below base rate)."
						tip="On R100k savings + R50k debt, typically R400-R500/month extra value at Diamond status."
						value="R500/mo"
					/>
				</div>
			</section>

			{/* Miles D-Day */}
			<section>
				<div className="card-purple p-8">
					<div className="flex items-start gap-4">
						<div className="pulse-purple flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
							<Calendar className="h-7 w-7" />
						</div>
						<div className="flex-1">
							<h3 className="mb-2 font-bold text-slate-900 text-xl">
								Miles D-Day: The 15th Bonus
							</h3>
							<p className="mb-4 text-slate-600">
								<strong>What it is:</strong> On the 15th of every month,
								Discovery Miles discounts double. Instead of 15% off at retail
								partners, you get 30% off.
							</p>

							<div className="mb-6 grid gap-4 sm:grid-cols-2">
								<div className="rounded-lg border border-purple-200 bg-white p-4">
									<div className="mb-1 text-slate-500 text-sm">Regular Day</div>
									<div className="font-bold text-2xl text-slate-900">
										15% off
									</div>
								</div>
								<div className="rounded-lg bg-amber-500 p-4 text-white">
									<div className="mb-1 text-sm opacity-90">15th of Month</div>
									<div className="font-bold text-2xl">30% off</div>
									<div className="text-xs opacity-75">2x value!</div>
								</div>
							</div>

							<div className="alert alert-warning mb-4">
								<p className="text-sm">
									<strong>The Rule:</strong> Do not spend Miles on the 14th or
									16th. Wait until the 15th. This is a 100% value boost.
								</p>
							</div>

							<div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
								<CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
								<p className="text-green-800 text-sm">
									<strong>Value:</strong> If you spend 10,000 Miles on the 15th
									at 30% off vs 15% off, you get R1,500 more value. That's
									R18,000/year if you do it monthly.
								</p>
							</div>

							<div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
								<p className="font-semibold text-red-700 text-sm">
									⚠️ CRITICAL: Set a calendar reminder for the 15th of every
									month. Do not forget. This is free money.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
