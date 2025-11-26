import {
	AlertTriangle,
	CheckCircle2,
	CreditCard,
	FileText,
	Home,
	PiggyBank,
	Shield,
	Target,
	TrendingUp,
} from "lucide-react";
import { type ChangeEvent, useState } from "react";

function useNumericInput(initial: number) {
	const [numValue, setNumValue] = useState(initial);
	const [localValue, setLocalValue] = useState(initial.toString());
	const [isFocused, setIsFocused] = useState(false);

	const displayValue = isFocused ? localValue : numValue.toString();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value);
		setNumValue(e.target.value === "" ? 0 : Number(e.target.value));
	};

	const handleFocus = () => {
		setLocalValue(numValue === 0 ? "" : numValue.toString());
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return {
		value: numValue,
		displayValue,
		inputProps: {
			value: displayValue,
			onChange: handleChange,
			onFocus: handleFocus,
			onBlur: handleBlur,
		},
	};
}

export default function MoneyCalculator() {
	const monthlyIncomeInput = useNumericInput(250000);
	const emergencySavingsInput = useNumericInput(750000);
	const monthlyDebtRepaymentInput = useNumericInput(5000);

	const monthlyIncome = monthlyIncomeInput.value;
	const emergencySavings = emergencySavingsInput.value;
	const monthlyDebtRepayment = monthlyDebtRepaymentInput.value;

	const targetSavings = monthlyIncome * 3;
	const savingsRatio = emergencySavings / targetSavings;
	const savingsProgress = Math.min(savingsRatio * 100, 100);
	const savingsPoints =
		savingsRatio >= 1 ? 30000 : Math.floor(30000 * savingsRatio);

	const debtRatio = (monthlyDebtRepayment / monthlyIncome) * 100;
	const debtTarget = 5;
	const debtPoints =
		debtRatio <= debtTarget
			? 30000
			: Math.max(0, 30000 - (debtRatio - debtTarget) * 3000);

	const formatCurrency = (value: number) =>
		`R${Math.round(value).toLocaleString()}`;

	return (
		<div className="container-mobile">
			{/* Header */}
			<div className="mb-10">
				<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-purple-700 text-sm">
					<CreditCard className="h-4 w-4" />
					Module 2
				</div>
				<h1 className="section-header mb-4 text-4xl">
					Vitality Money: The Six Behaviours
				</h1>
				<p className="text-lg text-slate-600">
					Master these behaviours to maximize your Vitality Money status
				</p>
			</div>

			<div className="stagger-children space-y-8">
				{/* Behaviour 1: Emergency Savings */}
				<div className="card p-6">
					<div className="mb-6 flex items-start gap-4">
						<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-gradient text-white">
							<PiggyBank className="h-6 w-6" />
						</div>
						<div>
							<div className="mb-1 flex items-center gap-2">
								<span className="font-semibold text-purple-600 text-xs">
									BEHAVIOUR 1
								</span>
								<span className="text-slate-400 text-xs">
									• Up to 30,000 pts
								</span>
							</div>
							<h2 className="section-subheader">Having Enough Savings</h2>
						</div>
					</div>

					<div className="alert alert-info mb-6">
						<p className="text-sm">
							<strong>The Rule:</strong> Keep 3× your gross monthly income in
							emergency savings. This is cash, call accounts, unit trusts,
							stocks, forex, endowments.{" "}
							<strong>NOT retirement funds or home loans.</strong>
						</p>
					</div>

					<div className="grid-mobile grid-mobile-cols-2 mb-6">
						<div>
							<label
								className="mb-2 block font-medium text-slate-700 text-sm"
								htmlFor="monthlyIncome"
							>
								Monthly Income
							</label>
							<div className="relative">
								<span className="-translate-y-1/2 absolute top-1/2 left-3 text-slate-500 text-sm">
									R
								</span>
								<input
									type="number"
									{...monthlyIncomeInput.inputProps}
									className="input pl-8"
								/>
							</div>
						</div>
						<div>
							<label
								className="mb-2 block font-medium text-slate-700 text-sm"
								htmlFor="emergencySavings"
							>
								Current Emergency Savings
							</label>
							<div className="relative">
								<span className="-translate-y-1/2 absolute top-1/2 left-3 text-slate-500 text-sm">
									R
								</span>
								<input
									type="number"
									{...emergencySavingsInput.inputProps}
									className="input pl-8"
								/>
							</div>
						</div>
					</div>

					{/* Progress Display */}
					<div className="space-y-4 rounded-xl bg-slate-50 p-5">
						<div className="flex items-center justify-between">
							<span className="text-slate-600 text-sm">
								Target Savings (3× income)
							</span>
							<span className="font-semibold text-slate-900">
								{formatCurrency(targetSavings)}
							</span>
						</div>

						<div>
							<div className="mb-2 flex items-center justify-between">
								<span className="text-slate-600 text-sm">Progress</span>
								<span className="font-medium text-sm">
									{savingsProgress.toFixed(0)}%
								</span>
							</div>
							<div className="progress h-3">
								<div
									className={`progress-bar ${
										savingsProgress >= 100 ? "progress-bar-success" : ""
									}`}
									style={{ width: `${savingsProgress}%` }}
								/>
							</div>
						</div>

						<div className="flex items-center justify-between border-slate-200 border-t pt-2">
							<div className="flex items-center gap-2">
								{emergencySavings >= targetSavings ? (
									<CheckCircle2 className="h-5 w-5 text-green-500" />
								) : (
									<AlertTriangle className="h-5 w-5 text-amber-500" />
								)}
								<span
									className={`font-semibold ${
										emergencySavings >= targetSavings
											? "text-green-600"
											: "text-amber-600"
									}`}
								>
									{formatCurrency(emergencySavings)}
								</span>
							</div>
							<div className="text-right">
								<div className="text-slate-500 text-xs">Points Earned</div>
								<div className="font-bold text-purple-600">
									{savingsPoints.toLocaleString()} / 30,000
								</div>
							</div>
						</div>

						{emergencySavings < targetSavings && (
							<div className="alert alert-danger mt-4">
								<p className="text-sm">
									<strong>ACTION REQUIRED:</strong> You need{" "}
									{formatCurrency(targetSavings - emergencySavings)} more in
									emergency savings. Do not spend this money. Keep it liquid.
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Behaviour 2: Managing Debt */}
				<div className="card p-6">
					<div className="mb-6 flex items-start gap-4">
						<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-gradient text-white">
							<Target className="h-6 w-6" />
						</div>
						<div>
							<div className="mb-1 flex items-center gap-2">
								<span className="font-semibold text-purple-600 text-xs">
									BEHAVIOUR 2
								</span>
								<span className="text-slate-400 text-xs">
									• Up to 30,000 pts
								</span>
							</div>
							<h2 className="section-subheader">Managing Short-Term Debt</h2>
						</div>
					</div>

					<div className="alert alert-info mb-6">
						<p className="text-sm">
							<strong>The Rule:</strong> Keep monthly repayments on unsecured
							debt (credit cards, store cards, personal loans) below 5% of your
							gross monthly income.{" "}
							<strong>Home loans and vehicle finance don't count.</strong>
						</p>
					</div>

					<div className="mb-6">
						<label
							className="mb-2 block font-medium text-slate-700 text-sm"
							htmlFor="monthlyDebtRepayment"
						>
							Monthly Unsecured Debt Repayment
						</label>
						<div className="relative max-w-sm">
							<span className="-translate-y-1/2 absolute top-1/2 left-3 text-slate-500 text-sm">
								R
							</span>
							<input
								type="number"
								{...monthlyDebtRepaymentInput.inputProps}
								className="input pl-8"
							/>
						</div>
					</div>

					{/* Progress Display */}
					<div className="space-y-4 rounded-xl bg-slate-50 p-5">
						<div className="flex items-center justify-between">
							<span className="text-slate-600 text-sm">
								Target (≤5% of income)
							</span>
							<span className="font-semibold text-slate-900">
								≤ {formatCurrency(monthlyIncome * 0.05)}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-slate-600 text-sm">Your Repayment</span>
							<span
								className={`font-semibold ${
									debtRatio <= debtTarget ? "text-green-600" : "text-red-600"
								}`}
							>
								{formatCurrency(monthlyDebtRepayment)} ({debtRatio.toFixed(1)}%
								of income)
							</span>
						</div>

						<div className="flex items-center justify-between border-slate-200 border-t pt-2">
							<div className="flex items-center gap-2">
								{debtRatio <= debtTarget ? (
									<CheckCircle2 className="h-5 w-5 text-green-500" />
								) : (
									<AlertTriangle className="h-5 w-5 text-red-500" />
								)}
								<span
									className={
										debtRatio <= debtTarget ? "text-green-600" : "text-red-600"
									}
								>
									{debtRatio <= debtTarget ? "On Track" : "Over Limit"}
								</span>
							</div>
							<div className="text-right">
								<div className="text-slate-500 text-xs">Points Earned</div>
								<div className="font-bold text-purple-600">
									{debtPoints.toLocaleString()} / 30,000
								</div>
							</div>
						</div>

						{debtRatio > debtTarget && (
							<div className="alert alert-danger mt-4">
								<p className="text-sm">
									<strong>STOP. You are losing points.</strong> Your debt
									repayment is {debtRatio.toFixed(1)}% of income. You must get
									it below 5%. Pay off credit cards first. Do not take new
									unsecured debt.
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Remaining Behaviours */}
				{[
					{
						num: 3,
						title: "Planning Your Finances",
						icon: FileText,
						points: "40,000",
						items: [
							"Complete a Financial Needs Analysis with a Discovery advisor",
							"Do Money Coaching™ courses in the app",
							"Use the Vitality Money Financial Analyser regularly",
							"Set up Wills & Estates planning (when available)",
						],
					},
					{
						num: 4,
						title: "Having the Right Insurance",
						icon: Shield,
						points: "25,000",
						items: [
							"Life Insurance (death, disability, severe illness)",
							"Short-Term Insurance (home contents, possessions)",
							"Medical Aid (appropriate cover)",
						],
						note: "The system checks if you have cover, not if the amount is perfect. Make sure all three are active.",
					},
					{
						num: 5,
						title: "Being on Track for Retirement",
						icon: TrendingUp,
						points: "10,000",
						description:
							"Discovery models whether you're on track to retire at 65 with 75% income replacement. This is calculated automatically based on your age, current retirement savings, and ongoing contributions. You can see your status in the app.",
					},
					{
						num: 6,
						title: "Managing Property Investments",
						icon: Home,
						points: "5,000 - 15,000",
						description:
							"This measures your net long-term assets (property value + excess savings above emergency target, minus home loans and vehicle finance). The goal is to ensure you can cover living arrangements in retirement.",
						note: "Points vary based on income: 5,000 (income < R350k) or 15,000 (income ≥ R350k)",
					},
				].map((behaviour) => (
					<div key={behaviour.num} className="card p-6">
						<div className="mb-4 flex items-start gap-4">
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-gradient text-white">
								<behaviour.icon className="h-6 w-6" />
							</div>
							<div>
								<div className="mb-1 flex items-center gap-2">
									<span className="font-semibold text-purple-600 text-xs">
										BEHAVIOUR {behaviour.num}
									</span>
									<span className="text-slate-400 text-xs">
										• Up to {behaviour.points} pts
									</span>
								</div>
								<h2 className="section-subheader">{behaviour.title}</h2>
							</div>
						</div>

						{behaviour.items && (
							<ul className="space-y-2 text-slate-600">
								{behaviour.items.map((item) => (
									<li key={item} className="flex items-start gap-2 text-sm">
										<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
										{item}
									</li>
								))}
							</ul>
						)}

						{behaviour.description && (
							<p className="text-slate-600 text-sm">{behaviour.description}</p>
						)}

						{behaviour.note && (
							<p className="mt-4 text-slate-500 text-xs italic">
								{behaviour.note}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
