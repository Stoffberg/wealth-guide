export interface RewardInputs {
	// Personal info
	monthlyIncome: number;
	vitalityHealthStatus: "Blue" | "Bronze" | "Silver" | "Gold" | "Diamond";
	vitalityMoneyStatus: "Blue" | "Bronze" | "Silver" | "Gold" | "Diamond";

	// Spending
	monthlyCardSpend: number;
	monthlyHealthyFoodSpend: number;
	monthlyHealthyCareSpend: number;
	monthlyFuelSpend: number;
	monthlyHomePartnerSpend: number;

	// Lifestyle
	hasGymMembership: boolean;
	hasInternationalBusinessTrip: boolean;
	hasLocalFlights: boolean;
	hasTechPurchase: boolean;
	techPurchaseType: "Apple" | "Technogym" | "None";
	techPurchaseAmount: number;

	// Savings & Debt
	emergencySavings: number;
	monthlyUnsecuredDebtRepayment: number;
	hasLifeInsurance: boolean;
	hasShortTermInsurance: boolean;
	hasMedicalAid: boolean;

	// Travel
	monthlyTravelSpend: number;
	loungeVisitsPerYear: number;

	// Miles
	monthlyMilesEarned: number;
	usesMilesDDay: boolean;
	usesVirtualCard: boolean;
}

export interface RewardBreakdown {
	monthlyFees: number;
	annualFees: number;

	// Rewards (monthly)
	healthyFoodSavings: number;
	healthyCareSavings: number;
	fuelSavings: number;
	homePartnerSavings: number;
	gymSavings: number;
	localFlightSavingsMonthly: number;
	internationalFlightSavingsMonthly: number;
	accommodationSavings: number;
	techSavingsMonthly: number;
	loungeValue: number;
	milesDDayValue: number;
	dynamicInterestSavings: number;
	virtualCardsValue: number;
	relationshipBankerValue: number;
	priorityFastTrackValue: number;
	conciergeValue: number;
	sportsGearSavings: number;
	baseMilesValue: number;

	// Total
	totalMonthlyValue: number;
	totalAnnualValue: number;
	netMonthlyProfit: number;
	netAnnualProfit: number;
}
