import {
	Banknote,
	Calculator,
	Calendar,
	Car,
	Coffee,
	CreditCard,
	Dumbbell,
	Laptop,
	Plane,
	ShoppingBag,
	Smartphone,
	Sparkles,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { calculateRewards } from "../lib/calculations";
import type { RewardInputs } from "../types";

type VitalityStatus = "Blue" | "Bronze" | "Silver" | "Gold" | "Diamond";

const statusConfig: Record<VitalityStatus, { badge: string; color: string }> = {
	Blue: { badge: "badge-blue", color: "text-blue-600" },
	Bronze: { badge: "badge-bronze", color: "text-amber-600" },
	Silver: { badge: "badge-silver", color: "text-slate-500" },
	Gold: { badge: "badge-gold", color: "text-amber-500" },
	Diamond: { badge: "badge-diamond", color: "text-cyan-500" },
};

export default function RewardsEstimator() {
	const [inputs, setInputs] = useState<RewardInputs>({
		monthlyIncome: 250000,
		vitalityHealthStatus: "Gold",
		vitalityMoneyStatus: "Gold",
		monthlyCardSpend: 50000,
		monthlyHealthyFoodSpend: 5000,
		monthlyHealthyCareSpend: 2000,
		monthlyFuelSpend: 5000,
		monthlyHomePartnerSpend: 3000,
		hasGymMembership: true,
		hasInternationalBusinessTrip: true,
		hasLocalFlights: true,
		hasTechPurchase: true,
		techPurchaseType: "Apple",
		techPurchaseAmount: 25000,
		emergencySavings: 750000,
		monthlyUnsecuredDebtRepayment: 5000,
		hasLifeInsurance: true,
		hasShortTermInsurance: true,
		hasMedicalAid: true,
		monthlyTravelSpend: 2000,
		loungeVisitsPerYear: 12,
		monthlyMilesEarned: 5000,
		usesMilesDDay: true,
		usesVirtualCard: true,
	});

	const breakdown = calculateRewards(inputs);

	const formatCurrency = (value: number) =>
		`R${Math.round(value).toLocaleString()}`;

	return (
		<div className="container-mobile max-w-6xl">
			{/* Header */}
			<div className="mb-10">
				<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-purple-700 text-sm">
					<Calculator className="h-4 w-4" />
					ROI Calculator
				</div>
				<h1 className="section-header mb-4 text-4xl">
					The Bottom Line: Your Financial Statement
				</h1>
				<p className="text-lg text-slate-600">
					Calculate your exact Purple Suite ROI based on your lifestyle
				</p>
			</div>

			<div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-2">
				{/* Input Form */}
				<div className="space-y-6">
					{/* Status Selection */}
					<div className="card p-6">
						<h3 className="section-subheader mb-4 flex items-center gap-2">
							<Sparkles className="h-5 w-5 text-purple-600" />
							Your Status
						</h3>
						<div className="grid-mobile grid-mobile-cols-2">
							<div>
								<label
									className="mb-2 block font-medium text-slate-700 text-sm"
									htmlFor="vitalityHealthStatus"
								>
									Vitality Health Status
								</label>
								<select
									value={inputs.vitalityHealthStatus}
									onChange={(e) =>
										setInputs({
											...inputs,
											vitalityHealthStatus: e.target.value as VitalityStatus,
										})
									}
									className="select"
								>
									{(
										["Blue", "Bronze", "Silver", "Gold", "Diamond"] as const
									).map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									className="mb-2 block font-medium text-slate-700 text-sm"
									htmlFor="vitalityMoneyStatus"
								>
									Vitality Money Status
								</label>
								<select
									value={inputs.vitalityMoneyStatus}
									onChange={(e) =>
										setInputs({
											...inputs,
											vitalityMoneyStatus: e.target.value as VitalityStatus,
										})
									}
									className="select"
								>
									{(
										["Blue", "Bronze", "Silver", "Gold", "Diamond"] as const
									).map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="mt-4 flex items-center gap-4">
							<span
								className={`badge ${statusConfig[inputs.vitalityHealthStatus].badge}`}
							>
								Health: {inputs.vitalityHealthStatus}
							</span>
							<span
								className={`badge ${statusConfig[inputs.vitalityMoneyStatus].badge}`}
							>
								Money: {inputs.vitalityMoneyStatus}
							</span>
						</div>
					</div>

					{/* Income & Spending */}
					<div className="card p-6">
						<h3 className="section-subheader mb-4 flex items-center gap-2">
							<Banknote className="h-5 w-5 text-purple-600" />
							Income & Spending
						</h3>
						<div className="space-y-4">
							<InputField
								label="Monthly Income"
								value={inputs.monthlyIncome}
								onChange={(value) =>
									setInputs({ ...inputs, monthlyIncome: value })
								}
								prefix="R"
							/>
							<InputField
								label="Monthly Card Spend"
								value={inputs.monthlyCardSpend}
								onChange={(value) =>
									setInputs({ ...inputs, monthlyCardSpend: value })
								}
								prefix="R"
								hint="Must spend ≥ R90k/month for international business class"
							/>
							<div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
								<CheckboxField
									label="Use virtual card for all purchases"
									icon={Smartphone}
									checked={inputs.usesVirtualCard}
									onChange={(checked) =>
										setInputs({ ...inputs, usesVirtualCard: checked })
									}
								/>
								<p className="mt-2 ml-7 text-purple-700 text-xs">
									<strong>Critical:</strong> Virtual card earns up to 1 Mile per
									R15 spent. Physical card only earns 1 Mile per R100.
								</p>
							</div>
						</div>
					</div>

					{/* Rewards Spending */}
					<div className="card p-6">
						<h3 className="section-subheader mb-4 flex items-center gap-2">
							<ShoppingBag className="h-5 w-5 text-purple-600" />
							Rewards Spending
						</h3>
						<div className="space-y-4">
							<InputField
								label="Monthly HealthyFood Spend"
								value={inputs.monthlyHealthyFoodSpend}
								onChange={(value) =>
									setInputs({ ...inputs, monthlyHealthyFoodSpend: value })
								}
								prefix="R"
								hint="Cap: R5,000/month (family) or R2,500 (single)"
							/>
							<InputField
								label="Monthly HealthyCare Spend"
								value={inputs.monthlyHealthyCareSpend}
								onChange={(value) =>
									setInputs({ ...inputs, monthlyHealthyCareSpend: value })
								}
								prefix="R"
							/>
							<InputField
								label="Monthly Fuel Spend"
								value={inputs.monthlyFuelSpend}
								onChange={(value) =>
									setInputs({ ...inputs, monthlyFuelSpend: value })
								}
								prefix="R"
								hint="Must spend ≥ R3,000/month to qualify"
							/>
							<InputField
								label="Monthly Home Partner Spend"
								value={inputs.monthlyHomePartnerSpend}
								onChange={(value) =>
									setInputs({ ...inputs, monthlyHomePartnerSpend: value })
								}
								prefix="R"
							/>
						</div>
					</div>

					{/* Lifestyle Benefits */}
					<div className="card p-6">
						<h3 className="section-subheader mb-4 flex items-center gap-2">
							<Plane className="h-5 w-5 text-purple-600" />
							Lifestyle Benefits
						</h3>
						<div className="space-y-4">
							<CheckboxField
								label="Have Virgin Active/Planet Fitness membership"
								icon={Dumbbell}
								checked={inputs.hasGymMembership}
								onChange={(checked) =>
									setInputs({ ...inputs, hasGymMembership: checked })
								}
							/>
							<CheckboxField
								label="Fly international business class once per year"
								icon={Plane}
								checked={inputs.hasInternationalBusinessTrip}
								onChange={(checked) =>
									setInputs({
										...inputs,
										hasInternationalBusinessTrip: checked,
									})
								}
							/>
							<CheckboxField
								label="Take local flights (3 return per year)"
								icon={Plane}
								checked={inputs.hasLocalFlights}
								onChange={(checked) =>
									setInputs({ ...inputs, hasLocalFlights: checked })
								}
							/>
							<CheckboxField
								label="Buy Apple/Technogym tech this year"
								icon={Laptop}
								checked={inputs.hasTechPurchase}
								onChange={(checked) =>
									setInputs({ ...inputs, hasTechPurchase: checked })
								}
							/>

							{inputs.hasTechPurchase && (
								<div className="ml-9 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
									<div>
										<label
											className="mb-2 block font-medium text-slate-700 text-sm"
											htmlFor="techPurchaseType"
										>
											Tech Type
										</label>
										<select
											value={inputs.techPurchaseType}
											onChange={(e) =>
												setInputs({
													...inputs,
													techPurchaseType: e.target.value as
														| "None"
														| "Apple"
														| "Technogym",
												})
											}
											className="select"
										>
											<option value="None">None</option>
											<option value="Apple">Apple</option>
											<option value="Technogym">Technogym</option>
										</select>
									</div>
									<InputField
										label="Tech Purchase Amount"
										value={inputs.techPurchaseAmount}
										onChange={(value) =>
											setInputs({ ...inputs, techPurchaseAmount: value })
										}
										prefix="R"
										hint="Apple max: R25k, Technogym max: R50k"
									/>
								</div>
							)}

							<InputField
								label="Lounge Visits Per Year"
								value={inputs.loungeVisitsPerYear}
								onChange={(value) =>
									setInputs({ ...inputs, loungeVisitsPerYear: value })
								}
								icon={Coffee}
							/>

							<CheckboxField
								label="Use Miles D-Day (15th of month for 30% boost)"
								icon={Calendar}
								checked={inputs.usesMilesDDay}
								onChange={(checked) =>
									setInputs({ ...inputs, usesMilesDDay: checked })
								}
							/>
						</div>
					</div>
				</div>

				{/* Results Panel */}
				<div className="h-fit space-y-6 lg:sticky lg:top-8">
					{/* Summary Card */}
					<div className="card-purple p-6">
						<h3 className="mb-6 font-semibold text-lg text-slate-900">
							Monthly Financial Statement
						</h3>

						{/* Monthly Fees */}
						<div className="mb-4 flex items-center justify-between rounded-lg bg-red-50 p-3">
							<span className="font-medium text-slate-700 text-sm">
								Monthly Fees
							</span>
							<span className="value-negative text-lg">
								-{formatCurrency(breakdown.monthlyFees)}
							</span>
						</div>

						{/* Rewards Section */}
						<div className="mb-6 space-y-1">
							<div className="mb-2 font-semibold text-slate-500 text-xs uppercase tracking-wide">
								Rewards & Savings
							</div>

							{[
								{
									label: inputs.usesVirtualCard
										? "Base Miles (virtual card)"
										: "Base Miles (physical card)",
									value: breakdown.baseMilesValue,
									icon: inputs.usesVirtualCard ? Smartphone : CreditCard,
								},
								{
									label: "HealthyFood (75% back)",
									value: breakdown.healthyFoodSavings,
									icon: ShoppingBag,
								},
								{
									label: "HealthyCare (50% back)",
									value: breakdown.healthyCareSavings,
									icon: ShoppingBag,
								},
								{
									label: "Fuel & Uber (20% back)",
									value: breakdown.fuelSavings,
									icon: Car,
								},
								{
									label: "Home Partners (15% back)",
									value: breakdown.homePartnerSavings,
									icon: ShoppingBag,
								},
								{
									label: "Gym Membership (75% off)",
									value: breakdown.gymSavings,
									icon: Dumbbell,
								},
								{
									label: "Local Flights (75% off)",
									value: breakdown.localFlightSavingsMonthly,
									icon: Plane,
								},
								{
									label: "International Business (75% off)",
									value: breakdown.internationalFlightSavingsMonthly,
									icon: Plane,
								},
								{
									label: "Accommodation & Car (25% off)",
									value: breakdown.accommodationSavings,
									icon: Car,
								},
								{
									label: "Tech Purchase (50% off)",
									value: breakdown.techSavingsMonthly,
									icon: Laptop,
								},
								{
									label: "Lounge Access",
									value: breakdown.loungeValue,
									icon: Coffee,
								},
								{
									label: "Miles D-Day Boost",
									value: breakdown.milesDDayValue,
									icon: Calendar,
								},
								{
									label: "Dynamic Interest",
									value: breakdown.dynamicInterestSavings,
									icon: TrendingUp,
								},
								{
									label: "Sports Gear (25% off)",
									value: breakdown.sportsGearSavings,
									icon: Dumbbell,
								},
								{
									label: "Priority Fast Track",
									value: breakdown.priorityFastTrackValue,
									icon: Plane,
								},
								{
									label: "Relationship Banker",
									value: breakdown.relationshipBankerValue,
									icon: CreditCard,
								},
								{
									label: "Purple Concierge",
									value: breakdown.conciergeValue,
									icon: Sparkles,
								},
								{
									label: "Virtual Cards (50 free)",
									value: breakdown.virtualCardsValue,
									icon: CreditCard,
								},
							]
								.filter((item) => item.value > 0)
								.map((item) => (
									<div
										key={item.label}
										className="flex items-center justify-between py-1.5 text-sm"
									>
										<div className="flex items-center gap-2 text-slate-600">
											<item.icon className="h-3.5 w-3.5" />
											{item.label}
										</div>
										<span className="value-positive">
											+{formatCurrency(item.value)}
										</span>
									</div>
								))}
						</div>

						{/* Totals */}
						<div className="space-y-3 border-slate-200 border-t pt-4">
							<div className="flex items-center justify-between">
								<span className="font-medium text-slate-700">
									Total Monthly Value
								</span>
								<span className="value-positive text-lg">
									{formatCurrency(breakdown.totalMonthlyValue)}
								</span>
							</div>

							<div className="flex items-center justify-between rounded-xl bg-purple-600 p-4 text-white">
								<div className="flex items-center gap-2">
									{breakdown.netMonthlyProfit >= 0 ? (
										<TrendingUp className="h-5 w-5" />
									) : (
										<TrendingDown className="h-5 w-5" />
									)}
									<span className="font-semibold">Net Monthly Profit</span>
								</div>
								<span className="font-bold text-xl">
									{formatCurrency(breakdown.netMonthlyProfit)}
								</span>
							</div>
						</div>

						{/* Annual Summary */}
						<div className="mt-6 border-slate-200 border-t pt-4">
							<div className="mb-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">
								Annual Summary
							</div>
							<div className="space-y-2 text-sm">
								<div className="flex justify-between">
									<span className="text-slate-600">Annual Value</span>
									<span className="value-positive">
										{formatCurrency(breakdown.totalAnnualValue)}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-600">Annual Fees</span>
									<span className="value-negative">
										-
										{formatCurrency(
											breakdown.monthlyFees * 12 + breakdown.annualFees,
										)}
									</span>
								</div>
								<div className="flex justify-between border-slate-100 border-t pt-2 font-semibold">
									<span className="text-slate-700">Net Annual Profit</span>
									<span
										className={
											breakdown.netAnnualProfit >= 0
												? "value-positive"
												: "value-negative"
										}
									>
										{formatCurrency(breakdown.netAnnualProfit)}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Advice Card */}
					<div className="alert alert-info">
						<h4 className="mb-2 font-semibold">The Rule</h4>
						<p className="text-sm">
							If your Net Monthly Profit is positive, Purple Suite pays for
							itself. If it's negative, you're either not using the benefits
							enough, or your status is too low.
						</p>
						<p className="mt-2 font-semibold text-sm">
							Target: R10,000+ monthly profit at Diamond status.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

interface InputFieldProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
	prefix?: string;
	hint?: string;
	icon?: React.ElementType;
}

function InputField({
	label,
	value,
	onChange,
	prefix,
	hint,
	icon: Icon,
}: InputFieldProps) {
	const [localValue, setLocalValue] = useState(value.toString());
	const [isFocused, setIsFocused] = useState(false);

	const displayValue = isFocused ? localValue : value.toString();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value);
		onChange(e.target.value === "" ? 0 : Number(e.target.value));
	};

	const handleFocus = () => {
		setLocalValue(value === 0 ? "" : value.toString());
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<div>
			<label
				className="mb-2 block font-medium text-slate-700 text-sm"
				htmlFor={label}
			>
				{label}
			</label>
			<div className="relative">
				{prefix && (
					<span className="-translate-y-1/2 absolute top-1/2 left-3 font-medium text-slate-500 text-sm">
						{prefix}
					</span>
				)}
				{Icon && (
					<Icon className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-slate-400" />
				)}
				<input
					type="number"
					value={displayValue}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className={`input ${prefix ? "pl-8" : Icon ? "pl-10" : ""}`}
				/>
			</div>
			{hint && <p className="mt-1.5 text-slate-500 text-xs">{hint}</p>}
		</div>
	);
}

interface CheckboxFieldProps {
	label: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	icon: React.ElementType;
}

function CheckboxField({
	label,
	checked,
	onChange,
	icon: Icon,
}: CheckboxFieldProps) {
	return (
		<label className="group flex cursor-pointer items-center gap-3">
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className="checkbox"
			/>
			<Icon className="h-4 w-4 text-slate-400 transition-colors group-hover:text-purple-500" />
			<span className="text-slate-700 text-sm transition-colors group-hover:text-slate-900">
				{label}
			</span>
		</label>
	);
}
