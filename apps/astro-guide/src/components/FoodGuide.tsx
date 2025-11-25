import {
	AlertCircle,
	Check,
	Search,
	ShoppingCart,
	Sparkles,
	Tag,
} from "lucide-react";
import { useMemo, useState } from "react";

interface FoodItem {
	name: string;
	size: string;
	price: number;
	notes: string;
	category: "protein" | "dairy" | "pantry" | "grains";
}

const healthyFoods: FoodItem[] = [
	{
		name: "Free Range Skinless Chicken Breast",
		size: "435 g",
		price: 90.99,
		notes: "Staple protein. Must be skinless.",
		category: "protein",
	},
	{
		name: "Free Range Skinless Chicken Thigh Fillets",
		size: "Avg 700 g",
		price: 162.79,
		notes: "Buy this for points.",
		category: "protein",
	},
	{
		name: "Free Range Skinless Drumsticks & Thighs",
		size: "Avg 800 g",
		price: 136.49,
		notes: "Do not buy if it has skin.",
		category: "protein",
	},
	{
		name: "Ostrich Steaks",
		size: "500 g",
		price: 119.99,
		notes: "Excellent protein source.",
		category: "protein",
	},
	{
		name: "Ostrich Cubes",
		size: "500 g",
		price: 65.99,
		notes: "In-store deal. Buy this.",
		category: "protein",
	},
	{
		name: "Ostrich Fillets",
		size: "500 g",
		price: 165.99,
		notes: "Premium protein.",
		category: "protein",
	},
	{
		name: "Extra Lean Ostrich Mince",
		size: "500 g",
		price: 79.99,
		notes: "Buy Any 2 Save 20%. Do this.",
		category: "protein",
	},
	{
		name: "Free Range Extra Lean Venison Mince",
		size: "500 g",
		price: 83.99,
		notes: "Buy Any 2 Save 20%. Do this.",
		category: "protein",
	},
	{
		name: "Fresh Never Frozen Salmon Portion",
		size: "150 g",
		price: 144.99,
		notes: "Must be fresh, not frozen.",
		category: "protein",
	},
	{
		name: "Norwegian Salmon Portions",
		size: "500 g",
		price: 389.99,
		notes: "Premium option.",
		category: "protein",
	},
	{
		name: "Hake Fillet",
		size: "Avg 350 g",
		price: 112.0,
		notes: "Good fish option.",
		category: "protein",
	},
	{
		name: "Rainbow Trout Portions",
		size: "750 g",
		price: 439.99,
		notes: "Premium fish.",
		category: "protein",
	},
	{
		name: "Organic Fat Free Smooth Plain Cottage Cheese",
		size: "250 g",
		price: 50.99,
		notes: "Must be organic and fat-free.",
		category: "dairy",
	},
	{
		name: "Organic Crunchy Peanut Butter",
		size: "500 g",
		price: 99.99,
		notes: "In-store deal. Buy this.",
		category: "pantry",
	},
	{
		name: "No Added Sugar and Salt Crunchy Peanut Butter",
		size: "770 g",
		price: 95.99,
		notes: "No sugar added. Buy this.",
		category: "pantry",
	},
	{
		name: "No Added Salt and Sugar Smooth Peanut Butter",
		size: "770 g",
		price: 95.99,
		notes: "No sugar added. Buy this.",
		category: "pantry",
	},
	{
		name: "Cashew Nut Butter",
		size: "250 g",
		price: 114.99,
		notes: "Premium option.",
		category: "pantry",
	},
	{
		name: "Macadamia Nut Butter",
		size: "250 g",
		price: 99.99,
		notes: "Premium option.",
		category: "pantry",
	},
	{
		name: "Organic Red Kidney Beans",
		size: "400 g",
		price: 32.99,
		notes: "Must be organic.",
		category: "pantry",
	},
	{
		name: "Organic Chickpeas in Water",
		size: "400 g",
		price: 32.99,
		notes: "Must be organic.",
		category: "pantry",
	},
	{
		name: "Organic Lentils in Tomato Brine",
		size: "400 g",
		price: 32.99,
		notes: "Must be organic.",
		category: "pantry",
	},
	{
		name: "Oat and Sesame Rice Cakes",
		size: "100 g",
		price: 37.99,
		notes: "Buy any 2 for R60. Do this.",
		category: "grains",
	},
	{
		name: "Multigrain Rice Cakes",
		size: "100 g",
		price: 37.99,
		notes: "Buy any 2 for R60. Do this.",
		category: "grains",
	},
	{
		name: "Organic Spelt Fusilli",
		size: "500 g",
		price: 134.99,
		notes: "Must be organic.",
		category: "grains",
	},
	{
		name: "Gluten Free Dinosaur Shaped Pasta",
		size: "250 g",
		price: 77.99,
		notes: "Buy any 2 Save 20%. Kids option.",
		category: "grains",
	},
];

type VitalityStatus = "Blue" | "Bronze" | "Silver" | "Gold" | "Diamond";
type Category = "all" | "protein" | "dairy" | "pantry" | "grains";

const categoryLabels: Record<Category, string> = {
	all: "All Items",
	protein: "Protein",
	dairy: "Dairy",
	pantry: "Pantry",
	grains: "Grains",
};

export default function FoodGuide() {
	const [healthStatus, setHealthStatus] = useState<VitalityStatus>("Gold");
	const [moneyStatus, setMoneyStatus] = useState<VitalityStatus>("Gold");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<Category>("all");

	const getDiscount = () => {
		const healthDiscount =
			healthStatus === "Diamond"
				? 25
				: healthStatus === "Gold"
					? 20
					: healthStatus === "Silver"
						? 15
						: healthStatus === "Bronze"
							? 10
							: 0;
		const moneyDiscount =
			moneyStatus === "Diamond"
				? 50
				: moneyStatus === "Gold"
					? 35
					: moneyStatus === "Silver"
						? 20
						: moneyStatus === "Bronze"
							? 10
							: 0;
		return Math.min(healthDiscount + moneyDiscount, 75);
	};

	const discount = getDiscount();

	const filteredFoods = useMemo(() => {
		return healthyFoods.filter((item) => {
			const matchesSearch = item.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesCategory =
				selectedCategory === "all" || item.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [searchTerm, selectedCategory]);

	const totalOriginal = filteredFoods.reduce(
		(sum, item) => sum + item.price,
		0,
	);
	const totalSavings = totalOriginal * (discount / 100);

	return (
		<div className="container-mobile">
			{/* Header */}
			<div className="mb-8">
				<div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-purple-700 text-sm">
					<ShoppingCart className="h-4 w-4" />
					Shopping Guide
				</div>
				<h1 className="section-header mb-4 text-4xl">
					HealthyFood Master Shopping List
				</h1>
				<p className="text-lg text-slate-600">
					Every item that qualifies for Vitality rewards
				</p>
			</div>

			{/* Cap Warning */}
			<div className="alert alert-warning mb-8">
				<div className="flex items-start gap-3">
					<AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
					<div>
						<h3 className="font-semibold text-amber-800">The Hard Cap Rule</h3>
						<p className="mt-1">
							<strong>Family: R5,000/month maximum.</strong> Single:
							R2,500/month maximum. Do not spend more than this on HealthyFood.
							The system stops giving rewards after the cap.
						</p>
					</div>
				</div>
			</div>

			{/* Status Selectors & Discount Display */}
			<div className="card mb-8 p-6">
				<div className="grid-mobile grid-mobile-cols-3">
					<div>
						<label
							className="mb-2 block font-medium text-slate-700 text-sm"
							htmlFor="vitalityHealthStatus"
						>
							Vitality Health Status
						</label>
						<select
							value={healthStatus}
							onChange={(e) =>
								setHealthStatus(e.target.value as VitalityStatus)
							}
							className="select"
						>
							{(["Blue", "Bronze", "Silver", "Gold", "Diamond"] as const).map(
								(status) => (
									<option key={status} value={status}>
										{status}
									</option>
								),
							)}
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
							value={moneyStatus}
							onChange={(e) => setMoneyStatus(e.target.value as VitalityStatus)}
							className="select"
						>
							{(["Blue", "Bronze", "Silver", "Gold", "Diamond"] as const).map(
								(status) => (
									<option key={status} value={status}>
										{status}
									</option>
								),
							)}
						</select>
					</div>
					<div className="flex items-end sm:col-span-2 lg:col-span-1">
						<div className="w-full rounded-xl bg-purple-600 p-4 text-white">
							<div className="text-sm opacity-90">Your Total Discount</div>
							<div className="font-bold text-3xl">{discount}%</div>
						</div>
					</div>
				</div>

				<div className="mt-4 rounded-lg bg-slate-50 p-3 text-slate-600 text-sm">
					At Diamond/Diamond: 75% back • Gold/Gold: 55% back • Silver/Silver:
					35% back
				</div>
			</div>

			{/* Search & Filters */}
			<div className="mb-6 flex flex-col gap-4 sm:flex-row">
				<div className="relative flex-1">
					<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-slate-400" />
					<input
						type="text"
						placeholder="Search items..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="input pl-10"
					/>
				</div>
				<div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
					{(Object.keys(categoryLabels) as Category[]).map((category) => (
						<button
							key={category}
							type="button"
							onClick={() => setSelectedCategory(category)}
							className={`whitespace-nowrap rounded-lg px-4 py-2 font-medium text-sm transition-all ${
								selectedCategory === category
									? "bg-purple-600 text-white shadow-md"
									: "bg-slate-100 text-slate-600 hover:bg-slate-200"
							}`}
						>
							{categoryLabels[category]}
						</button>
					))}
				</div>
			</div>

			{/* Results Count */}
			<div className="mb-4 flex items-center justify-between">
				<span className="text-slate-500 text-sm">
					{filteredFoods.length} items found
				</span>
				<span className="text-slate-500 text-sm">
					Potential savings:{" "}
					<span className="font-semibold text-green-600">
						R{totalSavings.toFixed(0)}
					</span>
				</span>
			</div>

			{/* Food List */}
			<div className="stagger-children space-y-3">
				{filteredFoods.map((item) => {
					const yourPrice = item.price * (1 - discount / 100);
					const savings = item.price - yourPrice;
					const isGoodDeal = item.notes.toLowerCase().includes("buy this");

					return (
						<div
							key={item.name}
							className={`card p-4 transition-all hover:shadow-lg ${
								isGoodDeal ? "border-l-4 border-l-green-500" : ""
							}`}
						>
							<div className="flex items-start justify-between gap-4">
								<div className="min-w-0 flex-1">
									<div className="mb-1 flex items-center gap-2">
										<h3 className="truncate font-semibold text-slate-900">
											{item.name}
										</h3>
										{isGoodDeal && (
											<span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-700 text-xs">
												<Sparkles className="h-3 w-3" />
												Best Buy
											</span>
										)}
									</div>
									<p className="text-slate-500 text-sm">{item.size}</p>
									<p className="mt-2 text-slate-600 text-sm italic">
										{item.notes}
									</p>
								</div>
								<div className="shrink-0 text-right">
									<div className="text-slate-400 text-sm line-through">
										R{item.price.toFixed(2)}
									</div>
									<div className="font-bold text-green-600 text-xl">
										R{yourPrice.toFixed(2)}
									</div>
									<div className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 font-medium text-green-700 text-xs">
										<Tag className="h-3 w-3" />
										Save R{savings.toFixed(0)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Shopping Rules */}
			<div className="card-purple mt-10 p-8">
				<h3 className="section-subheader mb-6 flex items-center gap-2">
					<Check className="h-5 w-5 text-purple-600" />
					The Golden Rules for Shopping
				</h3>
				<div className="grid gap-4 sm:grid-cols-2">
					{[
						{
							title: "Look for the Vitality logo",
							desc: "On products at Checkers and Woolworths",
						},
						{
							title: "Organic = Always qualifies",
							desc: "If it's food, not just organic packaging",
						},
						{ title: "Free Range = Qualifies", desc: "For meat and poultry" },
						{
							title: "No Added Sugar = Qualifies",
							desc: "For processed foods",
						},
						{
							title: "Skinless chicken = Qualifies",
							desc: "Chicken with skin = Does not qualify",
						},
						{
							title: "Fresh fish = Qualifies",
							desc: "Frozen fish = Check the label",
						},
						{
							title: "Do not buy",
							desc: "Added sugar, processed meats, frozen meals",
						},
						{
							title: "When in doubt",
							desc: "Check the Discovery app, scan the barcode",
						},
					].map((rule) => (
						<div
							key={rule.title}
							className="flex items-start gap-3 rounded-lg bg-white/50 p-3"
						>
							<div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
								<Check className="h-3 w-3" />
							</div>
							<div>
								<p className="font-medium text-slate-900 text-sm">
									{rule.title}
								</p>
								<p className="text-slate-600 text-xs">{rule.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
