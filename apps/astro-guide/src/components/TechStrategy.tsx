import {
	Activity,
	AlertTriangle,
	CheckCircle2,
	Cpu,
	Heart,
	Moon,
	Watch,
	Zap,
} from "lucide-react";

export default function TechStrategy() {
	return (
		<div className="container-mobile">
			{/* Header */}
			<div className="mb-10">
				<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-purple-700 text-sm">
					<Cpu className="h-4 w-4" />
					Tech Guide
				</div>
				<h1 className="section-header mb-4 text-4xl">
					Tech Strategy: Apple Watch & Oura Ring
				</h1>
				<p className="text-lg text-slate-600">
					Maximize your Vitality points with the right wearables
				</p>
			</div>

			<div className="space-y-10">
				{/* Apple Watch Section */}
				<section className="card overflow-hidden">
					<div className="bg-slate-900 p-6 text-white">
						<div className="flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
								<Watch className="h-7 w-7" />
							</div>
							<div>
								<h2 className="font-bold text-2xl">Apple Watch</h2>
								<p className="text-slate-300">The "Fully Funded" Strategy</p>
							</div>
						</div>
					</div>

					<div className="space-y-6 p-6">
						<p className="text-slate-600">
							<strong>What it is:</strong> Discovery's Active Rewards program
							lets you get an Apple Watch for R0 if you meet your fitness goals.
						</p>

						{/* Steps */}
						<div className="space-y-4">
							<div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 font-bold text-sm text-white">
									1
								</div>
								<div>
									<h4 className="mb-1 font-semibold text-slate-900">
										Enroll in Active Rewards
									</h4>
									<p className="text-slate-600 text-sm">
										Go to the Discovery app → Vitality Health → Active Rewards.
										Select the Apple Watch model you want (Series 9, Ultra,
										etc.).
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 font-bold text-sm text-white">
									2
								</div>
								<div>
									<h4 className="mb-1 font-semibold text-slate-900">
										Meet Your Goals
									</h4>
									<p className="mb-2 text-slate-600 text-sm">
										You must complete:
									</p>
									<ul className="space-y-1 text-slate-600 text-sm">
										<li className="flex items-center gap-2">
											<CheckCircle2 className="h-4 w-4 text-green-500" />
											150 workouts per year (minimum 30 minutes each)
										</li>
										<li className="flex items-center gap-2">
											<span className="text-slate-400">OR</span>
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle2 className="h-4 w-4 text-green-500" />
											10,000 steps per day for 150 days per year
										</li>
										<li className="flex items-center gap-2">
											<CheckCircle2 className="h-4 w-4 text-green-500" />
											Maintain your Vitality Health status (Bronze minimum)
										</li>
									</ul>
								</div>
							</div>

							<div className="flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-4">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-sm text-white">
									3
								</div>
								<div>
									<h4 className="mb-1 font-semibold text-green-800">Pay R0</h4>
									<p className="text-green-700 text-sm">
										If you meet the goals, Discovery refunds the full cost. You
										pay upfront (typically R6,000-R12,000 depending on model),
										but if you complete the program, you get it all back.
									</p>
									<div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700 text-sm">
										<Zap className="h-4 w-4" />
										Value: R6,000-R12,000 per year
									</div>
								</div>
							</div>
						</div>

						{/* Warning */}
						<div className="alert alert-warning">
							<div className="flex items-start gap-3">
								<AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
								<div>
									<h4 className="font-semibold">The Rule</h4>
									<p className="mt-1 text-sm">
										<strong>Do not enroll unless you will complete it.</strong>{" "}
										If you don't meet goals, you keep the watch but pay full
										price. Only enroll if you're committed to 150 workouts or
										150 days of 10k steps.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Oura Ring Section */}
				<section className="card overflow-hidden">
					<div className="bg-purple-900 p-6 text-white">
						<div className="flex items-center gap-4">
							<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
								<Moon className="h-7 w-7" />
							</div>
							<div>
								<h2 className="font-bold text-2xl">Oura Ring</h2>
								<p className="text-purple-200">The Sleep Points Strategy</p>
							</div>
						</div>
					</div>

					<div className="space-y-6 p-6">
						<p className="text-slate-600">
							<strong>What it is:</strong> Oura Ring tracks your sleep, heart
							rate, and activity. It's the best device for maximizing "Sleep
							Well" points (up to 6,000/year) and heart-rate-based workout
							points (up to 30,000/year).
						</p>

						{/* Steps */}
						<div className="space-y-4">
							<div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 font-bold text-sm text-white">
									1
								</div>
								<div>
									<h4 className="mb-1 font-semibold text-slate-900">
										Get the Ring
									</h4>
									<p className="mb-2 text-slate-600 text-sm">Two options:</p>
									<ul className="space-y-1 text-slate-600 text-sm">
										<li className="flex items-start gap-2">
											<span className="shrink-0 font-semibold">Option A:</span>
											Use Purple Home Tech Benefit (50% off up to R25k). Oura
											Ring is typically R4,000-R6,000. You save R2,000-R3,000.
										</li>
										<li className="flex items-start gap-2">
											<span className="shrink-0 font-semibold">Option B:</span>
											Pay with Discovery Miles. If you have enough Miles, use
											them instead of cash.
										</li>
									</ul>
								</div>
							</div>

							<div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 font-bold text-sm text-white">
									2
								</div>
								<div>
									<h4 className="mb-1 font-semibold text-slate-900">
										Connect to Vitality
									</h4>
									<p className="text-slate-600 text-sm">
										In the Discovery app, go to Vitality Health → Devices → Add
										Device → Oura. Follow the pairing instructions. This syncs
										automatically.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4 rounded-xl border border-purple-200 bg-purple-50 p-4">
								<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 font-bold text-sm text-white">
									3
								</div>
								<div>
									<h4 className="mb-2 font-semibold text-purple-800">
										Maximize Points
									</h4>
									<p className="mb-3 text-purple-700 text-sm">
										Oura Ring automatically tracks:
									</p>
									<div className="grid gap-2">
										{[
											{
												icon: Moon,
												label: "Sleep",
												value: "6,000 pts/year",
											},
											{
												icon: Heart,
												label: "HR Workouts",
												value: "300 pts/session",
											},
											{
												icon: Activity,
												label: "Steps",
												value: "100 pts/day",
											},
										].map((item) => (
											<div
												key={item.label}
												className="flex items-center justify-between rounded-lg bg-white p-2"
											>
												<div className="flex items-center gap-2">
													<item.icon className="h-4 w-4 text-purple-500" />
													<span className="font-medium text-slate-700 text-sm">
														{item.label}
													</span>
												</div>
												<span className="font-semibold text-purple-600 text-sm">
													{item.value}
												</span>
											</div>
										))}
									</div>
									<div className="mt-3 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 font-semibold text-purple-700 text-sm">
										<Zap className="h-4 w-4" />
										Potential: 16,000+ points/year
									</div>
								</div>
							</div>
						</div>

						{/* Warning */}
						<div className="alert alert-warning">
							<div className="flex items-start gap-3">
								<AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
								<div>
									<h4 className="font-semibold">The Rule</h4>
									<p className="mt-1 text-sm">
										<strong>Wear it every night.</strong> Oura only tracks sleep
										if you wear it. Charge it during the day (takes 20 minutes).
										Do not forget to wear it. This is passive income in points.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Comparison Section */}
				<section className="card p-8">
					<h3 className="section-subheader mb-6 text-center">
						Apple Watch vs Oura Ring: Which One?
					</h3>

					<div className="grid-mobile grid-mobile-cols-2">
						{/* Apple Watch Card */}
						<div className="overflow-hidden rounded-xl border-2 border-slate-200">
							<div className="flex items-center gap-3 bg-slate-900 p-4 text-white">
								<Watch className="h-6 w-6" />
								<span className="font-bold text-lg">Apple Watch</span>
							</div>
							<div className="p-5">
								<ul className="space-y-3">
									{[
										{
											check: true,
											text: "Free if you complete Active Rewards",
										},
										{ check: true, text: "Tracks workouts automatically" },
										{ check: true, text: "Heart rate during exercise" },
										{ check: false, text: "Limited sleep tracking" },
										{ check: false, text: "Must charge daily" },
									].map((item) => (
										<li
											key={item.text}
											className="flex items-center gap-2 text-sm"
										>
											{item.check ? (
												<CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
											) : (
												<span className="flex h-4 w-4 shrink-0 items-center justify-center text-slate-400">
													✗
												</span>
											)}
											<span
												className={
													item.check ? "text-slate-700" : "text-slate-500"
												}
											>
												{item.text}
											</span>
										</li>
									))}
								</ul>
								<div className="mt-4 rounded-lg bg-green-50 p-3">
									<p className="font-medium text-green-700 text-sm">
										Best for: People who work out regularly and want a free
										watch.
									</p>
								</div>
							</div>
						</div>

						{/* Oura Ring Card */}
						<div className="overflow-hidden rounded-xl border-2 border-purple-200">
							<div className="flex items-center gap-3 bg-purple-900 p-4 text-white">
								<Moon className="h-6 w-6" />
								<span className="font-bold text-lg">Oura Ring</span>
							</div>
							<div className="p-5">
								<ul className="space-y-3">
									{[
										{ check: true, text: "Best sleep tracking" },
										{ check: true, text: "7-day battery life" },
										{ check: true, text: "Heart rate 24/7" },
										{
											check: true,
											text: "Passive tracking (just wear it)",
										},
										{
											check: false,
											text: "Costs R4k-R6k (but 50% off with Purple)",
										},
									].map((item) => (
										<li
											key={item.text}
											className="flex items-center gap-2 text-sm"
										>
											{item.check ? (
												<CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
											) : (
												<span className="flex h-4 w-4 shrink-0 items-center justify-center text-slate-400">
													✗
												</span>
											)}
											<span
												className={
													item.check ? "text-slate-700" : "text-slate-500"
												}
											>
												{item.text}
											</span>
										</li>
									))}
								</ul>
								<div className="mt-4 rounded-lg bg-purple-50 p-3">
									<p className="font-medium text-purple-700 text-sm">
										Best for: People who want maximum sleep points with zero
										effort.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* The Answer */}
					<div className="mt-6 rounded-xl bg-purple-600 p-5 text-center text-white">
						<p className="font-semibold text-lg">
							The Answer: Get both if you can. Apple Watch for workouts, Oura
							Ring for sleep. They complement each other perfectly.
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
