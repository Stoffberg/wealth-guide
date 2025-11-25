import type { RewardBreakdown, RewardInputs } from "../types";

// Constants
const MONTHLY_ACCOUNT_FEE = 684;
const ANNUAL_CARD_FEE = 4000;
const VIRGIN_ACTIVE_COLLECTION_MONTHLY = 1300;
const LOUNGE_ACCESS_VALUE_PER_VISIT = 500; // Approximate value
const PRIORITY_FAST_TRACK_VALUE = 200; // Annual value
const RELATIONSHIP_BANKER_VALUE = 500; // Monthly value
const CONCIERGE_VALUE = 300; // Monthly value
const VIRTUAL_CARDS_VALUE = 200; // Annual value (security & convenience)

export function calculateRewards(inputs: RewardInputs): RewardBreakdown {
	const monthlyFees = MONTHLY_ACCOUNT_FEE;
	const annualFees = ANNUAL_CARD_FEE;

	// HealthyFood: Up to 75% back (25% Vitality Health + 50% Vitality Money at max)
	const healthyFoodSavings = calculateHealthyFoodSavings(
		inputs.monthlyHealthyFoodSpend,
		inputs.vitalityHealthStatus,
		inputs.vitalityMoneyStatus,
	);

	// HealthyCare: Up to 50% back (25% Health + 25% Money)
	const healthyCareSavings = calculateHealthyCareSavings(
		inputs.monthlyHealthyCareSpend,
		inputs.vitalityHealthStatus,
		inputs.vitalityMoneyStatus,
	);

	// Fuel: Up to 20% back
	const fuelSavings = calculateFuelSavings(
		inputs.monthlyFuelSpend,
		inputs.vitalityMoneyStatus,
		inputs.monthlyCardSpend,
	);

	// Home Partner: Up to 15% back
	const homePartnerSavings = calculateHomePartnerSavings(
		inputs.monthlyHomePartnerSpend,
		inputs.vitalityMoneyStatus,
		inputs.monthlyCardSpend,
	);

	// Gym: 75% off Virgin Active Collection
	const gymSavings = inputs.hasGymMembership
		? VIRGIN_ACTIVE_COLLECTION_MONTHLY * 0.75
		: 0;

	// Local Flights: Capped at R7,500 discount per policy per year
	const localFlightSavings = inputs.hasLocalFlights
		? Math.min(
				calculateLocalFlightSavings(
					inputs.monthlyCardSpend,
					inputs.vitalityHealthStatus,
					inputs.vitalityMoneyStatus,
				),
				7500,
			) / 12
		: 0;

	// International Business Class: Up to 75% off, typically R40k-R50k value
	const internationalFlightSavings = inputs.hasInternationalBusinessTrip
		? calculateInternationalFlightSavings(
				inputs.monthlyCardSpend,
				inputs.vitalityHealthStatus,
				inputs.vitalityMoneyStatus,
			) / 12
		: 0;

	// Accommodation & Car Hire: Up to 25% off
	const accommodationSavings =
		inputs.monthlyTravelSpend > 0
			? calculateAccommodationSavings(
					inputs.monthlyTravelSpend,
					inputs.vitalityHealthStatus,
					inputs.vitalityMoneyStatus,
				)
			: 0;

	// Tech: Apple up to R25k (50% off = R12.5k max), Technogym up to R50k (50% off = R25k max)
	const techSavings =
		inputs.hasTechPurchase && inputs.techPurchaseType !== "None"
			? calculateTechSavings(
					inputs.techPurchaseType,
					inputs.techPurchaseAmount,
				) / 12
			: 0;

	// Lounge Access
	const loungeValue =
		(inputs.loungeVisitsPerYear * LOUNGE_ACCESS_VALUE_PER_VISIT) / 12;

	// Miles D-Day: 30% boost on 15th of month (double discount from 15% to 30%)
	const milesDDayValue =
		inputs.usesMilesDDay && inputs.monthlyMilesEarned > 0
			? inputs.monthlyMilesEarned * 0.15 // Additional 15% value from the boost
			: 0;

	// Dynamic Interest: Up to 1.6% on savings, 7% lower on borrowing
	// Simplified: Assume R100k savings balance gets 1.6% vs 0% = R133/month
	// And R50k debt at 7% lower = R292/month savings
	const dynamicInterestSavings = calculateDynamicInterestSavings(
		inputs.emergencySavings,
		inputs.monthlyUnsecuredDebtRepayment,
		inputs.vitalityMoneyStatus,
	);

	// Sports Gear: Up to 25% off (Garmin, Nike, etc.)
	const sportsGearSavings =
		inputs.monthlyCardSpend > 0
			? Math.min(inputs.monthlyCardSpend * 0.01, 250) // Assume 1% of spend, capped at R250/month
			: 0;

	// Service benefits (annual values amortized monthly)
	const priorityFastTrackValue = PRIORITY_FAST_TRACK_VALUE / 12;
	const relationshipBankerValue = RELATIONSHIP_BANKER_VALUE;
	const conciergeValue = CONCIERGE_VALUE;
	const virtualCardsValue = VIRTUAL_CARDS_VALUE / 12;

	const totalMonthlyValue =
		healthyFoodSavings +
		healthyCareSavings +
		fuelSavings +
		homePartnerSavings +
		gymSavings +
		localFlightSavings +
		internationalFlightSavings +
		accommodationSavings +
		techSavings +
		loungeValue +
		milesDDayValue +
		dynamicInterestSavings +
		sportsGearSavings +
		priorityFastTrackValue +
		relationshipBankerValue +
		conciergeValue +
		virtualCardsValue;

	const totalAnnualValue = totalMonthlyValue * 12;
	const netMonthlyProfit = totalMonthlyValue - monthlyFees;
	const netAnnualProfit = totalAnnualValue - monthlyFees * 12 - annualFees;

	return {
		monthlyFees,
		annualFees,
		healthyFoodSavings,
		healthyCareSavings,
		fuelSavings,
		homePartnerSavings,
		gymSavings,
		localFlightSavingsMonthly: localFlightSavings,
		internationalFlightSavingsMonthly: internationalFlightSavings,
		accommodationSavings,
		techSavingsMonthly: techSavings,
		loungeValue,
		milesDDayValue,
		dynamicInterestSavings,
		virtualCardsValue,
		relationshipBankerValue,
		priorityFastTrackValue,
		conciergeValue,
		sportsGearSavings,
		totalMonthlyValue,
		totalAnnualValue,
		netMonthlyProfit,
		netAnnualProfit,
	};
}

function calculateHealthyFoodSavings(
	spend: number,
	healthStatus: string,
	moneyStatus: string,
): number {
	// Cap: R5,000/month family, R2,500/month single
	const cap = 5000;
	const cappedSpend = Math.min(spend, cap);

	// Vitality Health: up to 25%
	const healthDiscount = getHealthDiscount(healthStatus);

	// Vitality Money: up to 50% at Diamond
	const moneyDiscount = getMoneyDiscount(moneyStatus, "food");

	// Combined: up to 75%
	const totalDiscount = Math.min(healthDiscount + moneyDiscount, 75);

	return (cappedSpend * totalDiscount) / 100;
}

function calculateHealthyCareSavings(
	spend: number,
	healthStatus: string,
	moneyStatus: string,
): number {
	const cap = 4000; // Family cap
	const cappedSpend = Math.min(spend, cap);

	const healthDiscount = getHealthDiscount(healthStatus);
	const moneyDiscount = getMoneyDiscount(moneyStatus, "care");

	const totalDiscount = Math.min(healthDiscount + moneyDiscount, 50);

	return (cappedSpend * totalDiscount) / 100;
}

function calculateFuelSavings(
	spend: number,
	moneyStatus: string,
	monthlyCardSpend: number,
): number {
	if (spend < 3000) return 0;

	// Table from docs
	const discount = getFuelDiscount(moneyStatus, monthlyCardSpend);
	return (spend * discount) / 100;
}

function calculateHomePartnerSavings(
	spend: number,
	moneyStatus: string,
	monthlyCardSpend: number,
): number {
	if (spend < 3000) return 0;

	const discount = getHomePartnerDiscount(moneyStatus, monthlyCardSpend);
	return (spend * discount) / 100;
}

function calculateLocalFlightSavings(
	monthlyCardSpend: number,
	healthStatus: string,
	moneyStatus: string,
): number {
	if (monthlyCardSpend < 3000) return 0;

	const moneyDiscount = getLocalFlightDiscount(moneyStatus, monthlyCardSpend);
	const healthDiscount = getHealthDiscount(healthStatus);

	const totalDiscount = Math.min(moneyDiscount + healthDiscount, 75);

	// Assume average local flight is R2,000, 6 one-way = 3 return = R6,000
	// 75% off = R4,500, but capped at R7,500 per policy
	const averageFlightCost = 2000;
	const annualFlights = 3; // return flights
	const annualSpend = averageFlightCost * annualFlights;

	return (annualSpend * totalDiscount) / 100;
}

function calculateInternationalFlightSavings(
	monthlyCardSpend: number,
	healthStatus: string,
	moneyStatus: string,
): number {
	// Requires R1,080,000 annual spend (R90k/month)
	if (monthlyCardSpend < 90000) return 0;

	const moneyDiscount = getInternationalFlightDiscount(
		moneyStatus,
		monthlyCardSpend,
	);
	const healthDiscount = getHealthDiscount(healthStatus);

	const totalDiscount = Math.min(moneyDiscount + healthDiscount, 75);

	// Business class return: typically R60k-R80k
	// 75% off = R45k-R60k savings
	const averageBusinessClassReturn = 70000;

	return (averageBusinessClassReturn * totalDiscount) / 100;
}

function calculateAccommodationSavings(
	spend: number,
	healthStatus: string,
	_moneyStatus: "Blue" | "Bronze" | "Silver" | "Gold" | "Diamond",
): number {
	const healthDiscount = getHealthDiscount(healthStatus);
	const moneyDiscount = spend >= 3000 ? 25 : 10;

	// You get the higher of the two discounts, capped at 25%
	const totalDiscount = Math.min(Math.max(healthDiscount, moneyDiscount), 25);

	return (spend * totalDiscount) / 100;
}

function calculateTechSavings(
	type: "Apple" | "Technogym",
	amount: number,
): number {
	if (type === "Apple") {
		const maxDiscountable = 25000;
		const discountableAmount = Math.min(amount, maxDiscountable);
		return discountableAmount * 0.5; // 50% off
	}
	if (type === "Technogym") {
		const maxDiscountable = 50000;
		const discountableAmount = Math.min(amount, maxDiscountable);
		return discountableAmount * 0.5; // 50% off
	}
	return 0;
}

function calculateDynamicInterestSavings(
	savingsBalance: number,
	monthlyDebtRepayment: number,
	moneyStatus: string,
): number {
	// Savings: up to 1.6% on transactional, 5.75% on savings
	// Assume 50% in transactional (1.6%) and 50% in savings (5.75%)
	const savingsRate = moneyStatus === "Diamond" ? 0.03675 : 0.02; // Average
	const savingsValue = (savingsBalance * savingsRate) / 12;

	// Borrowing: up to 7% lower
	// Assume R50k average debt balance, prime = 11.75%, 7% lower = 4.75%
	const debtBalance = monthlyDebtRepayment * 12; // Rough estimate
	const interestSavings =
		moneyStatus === "Diamond"
			? (debtBalance * 0.07) / 12
			: (debtBalance * 0.035) / 12;

	return savingsValue + interestSavings;
}

function getHealthDiscount(status: string): number {
	const discounts: Record<string, number> = {
		Blue: 0,
		Bronze: 10,
		Silver: 15,
		Gold: 20,
		Diamond: 25,
	};
	return discounts[status] || 0;
}

function getMoneyDiscount(status: string, category: "food" | "care"): number {
	if (category === "food") {
		const discounts: Record<string, number> = {
			Blue: 0,
			Bronze: 10,
			Silver: 20,
			Gold: 35,
			Diamond: 50,
		};
		return discounts[status] || 0;
	}
	const discounts: Record<string, number> = {
		Blue: 0,
		Bronze: 5,
		Silver: 10,
		Gold: 20,
		Diamond: 25,
	};
	return discounts[status] || 0;
}

function getFuelDiscount(status: string, monthlySpend: number): number {
	// Simplified: Diamond at R39k+ spend = 20%
	if (monthlySpend >= 39000 && status === "Diamond") return 20;
	if (monthlySpend >= 39000 && status === "Gold") return 15;
	if (monthlySpend >= 39000 && status === "Silver") return 12;
	if (monthlySpend >= 28000 && status === "Diamond") return 15;
	if (monthlySpend >= 28000 && status === "Gold") return 11;
	// Default for lower tiers
	return status === "Diamond"
		? 11
		: status === "Gold"
			? 8
			: status === "Silver"
				? 6.5
				: 4;
}

function getHomePartnerDiscount(status: string, monthlySpend: number): number {
	if (monthlySpend >= 56000 && status === "Diamond") return 15;
	if (monthlySpend >= 56000 && status === "Gold") return 11;
	if (monthlySpend >= 45000 && status === "Diamond") return 11;
	if (monthlySpend >= 45000 && status === "Gold") return 7.5;
	// Base 5% if spend >= R3k
	return monthlySpend >= 3000 ? 5 : 0;
}

function getLocalFlightDiscount(status: string, monthlySpend: number): number {
	if (monthlySpend >= 45000 && status === "Diamond") return 50;
	if (monthlySpend >= 45000 && status === "Gold") return 35;
	if (monthlySpend >= 39000 && status === "Diamond") return 45;
	if (monthlySpend >= 39000 && status === "Gold") return 35;
	if (monthlySpend >= 28000 && status === "Diamond") return 35;
	if (monthlySpend >= 28000 && status === "Gold") return 26;
	return status === "Diamond"
		? 27.5
		: status === "Gold"
			? 20
			: status === "Silver"
				? 17.5
				: 7;
}

function getInternationalFlightDiscount(
	status: string,
	monthlySpend: number,
): number {
	if (monthlySpend >= 90000 && status === "Diamond") return 50;
	if (monthlySpend >= 90000 && status === "Gold") return 30;
	if (monthlySpend >= 79000 && status === "Diamond") return 45;
	if (monthlySpend >= 79000 && status === "Gold") return 30;
	if (monthlySpend >= 56000 && status === "Diamond") return 27.5;
	if (monthlySpend >= 56000 && status === "Gold") return 20;
	return status === "Diamond"
		? 12.5
		: status === "Gold"
			? 9
			: status === "Silver"
				? 7.5
				: 5;
}
