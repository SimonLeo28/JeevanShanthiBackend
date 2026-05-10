const Plan = require('../models/Plan');

const SEED_PLANS = [
  { planId: 'jeevan-anand', category: 'endowment', icon: '🛡️', name: 'LIC Jeevan Anand (Plan 915)', tag: 'Most Popular', description: 'A participating non-linked savings cum insurance plan offering both savings and life cover throughout lifetime.', benefits: ['Death benefit = Sum Assured + Bonuses', 'Maturity benefit paid at end of term', 'Life cover continues after maturity', 'Participate in LIC profits (bonus)', 'Loan facility available'], eligibility: '18–50 years, min SA ₹1 Lakh', term: '15–35 years', premiumModes: 'Annual/Half-yearly/Quarterly/Monthly', minAge: 18, maxAge: 50, minSumAssured: '₹1 Lakh', isPopular: true },
  { planId: 'new-endowment', category: 'endowment', icon: '💼', name: 'LIC New Endowment Plan (Plan 914)', tag: 'Savings + Cover', description: 'Classic savings plan combining insurance coverage with guaranteed savings over the policy term.', benefits: ['Death or maturity sum assured + bonuses', 'Simple reversionary bonuses', 'Final additional bonus on maturity', 'Loan facility after 2 years', 'Tax benefits under 80C & 10(10D)'], eligibility: '8–55 years, min SA ₹1 Lakh', term: '12–35 years', premiumModes: 'Annual/Half-yearly/Quarterly/Monthly', minAge: 8, maxAge: 55, minSumAssured: '₹1 Lakh', isPopular: false },
  { planId: 'jeevan-labh', category: 'endowment', icon: '📈', name: 'LIC Jeevan Labh (Plan 936)', tag: 'High Returns', description: 'Limited premium paying endowment plan with attractive bonuses and comprehensive life protection.', benefits: ['Limited premium payment term', 'Death benefit = Sum Assured + bonuses', 'Maturity = Sum Assured + bonuses', 'Loyalty addition at maturity', 'Loan facility after 2 years'], eligibility: '8–59 years, min SA ₹2 Lakh', term: '16, 21, or 25 years', premiumModes: '10, 15, or 16 year PPT', minAge: 8, maxAge: 59, minSumAssured: '₹2 Lakh', isPopular: false },
  { planId: 'jeevan-amar', category: 'term', icon: '🔒', name: 'LIC Jeevan Amar (Plan 855)', tag: 'Pure Term', description: 'A pure protection term plan offering high life cover at affordable premiums with flexible options.', benefits: ['Death sum assured paid to nominee', 'Choose level or increasing cover', 'Special rates for non-smokers & women', 'Return of premium (extra) option', 'No maturity benefit — pure protection'], eligibility: '18–65 years, min SA ₹25 Lakh', term: '10–40 years', premiumModes: 'Annual/Half-yearly/Quarterly/Monthly', minAge: 18, maxAge: 65, minSumAssured: '₹25 Lakh', isPopular: true },
  { planId: 'tech-term', category: 'term', icon: '📱', name: 'LIC Tech Term (Plan 854)', tag: 'Online Term', description: 'Online pure term plan with competitive premiums, available exclusively through LIC website.', benefits: ['High sum assured at low premium', 'Accidental death benefit option', 'Joint life option available', 'Special discount for higher sum assured', 'No medical for lower sums'], eligibility: '18–65 years, min SA ₹50 Lakh', term: '10–40 years', premiumModes: 'Annual/Half-yearly', minAge: 18, maxAge: 65, minSumAssured: '₹50 Lakh', isPopular: false },
  { planId: 'jeevan-tarun', category: 'money-back', icon: '👶', name: 'LIC Jeevan Tarun (Plan 934)', tag: 'For Children', description: "Specially designed children's plan providing life cover and periodic payouts for education/marriage.", benefits: ['20% SA paid every 5 years (ages 20–25)', 'Balance + bonuses at maturity age 25', "Proposer's life covered during PPT", 'Accidental benefit rider option', 'Waiver of premium on death of proposer'], eligibility: 'Child: 90 days–12 years', term: 'Matures at age 25', premiumModes: 'Single / Regular till age 20', minAge: 0, maxAge: 12, minSumAssured: '₹75,000', isPopular: false },
  { planId: 'money-back-25', category: 'money-back', icon: '💰', name: 'LIC New Money Back 25 (Plan 920)', tag: 'Periodic Returns', description: 'Non-linked participating plan with periodic money back payments and comprehensive life cover.', benefits: ['15% SA at end of 5th & 10th year', '20% SA at end of 15th year', '50% SA + bonuses on maturity (25 yrs)', 'Death benefit = Full SA + bonuses', 'Tax benefits 80C & 10(10D)'], eligibility: '13–50 years, min SA ₹1 Lakh', term: '25 years', premiumModes: 'Annual/Half-yearly/Quarterly/Monthly', minAge: 13, maxAge: 50, minSumAssured: '₹1 Lakh', isPopular: false },
  { planId: 'jeevan-umang', category: 'whole', icon: '🌅', name: 'LIC Jeevan Umang (Plan 945)', tag: 'Whole Life', description: 'Unique plan providing survival benefits every year from the end of PPT till maturity, plus risk cover for lifetime.', benefits: ['8% of Basic Sum Assured per year after PPT', 'Lump sum maturity/death benefit', 'Lifetime risk cover continues', 'Bonuses accrued throughout', 'Excellent for long-term wealth creation'], eligibility: '90 days–55 years, min SA ₹2 Lakh', term: 'Whole life (maturity at 100 years)', premiumModes: '15/20/25/30 year PPT', minAge: 0, maxAge: 55, minSumAssured: '₹2 Lakh', isPopular: true },
  { planId: 'jeevan-shanti', category: 'pension', icon: '🏡', name: 'LIC Jeevan Shanti (Plan 858)', tag: 'Annuity', description: 'Immediate/deferred annuity plan for retirement income. Pay once, receive guaranteed pension for life.', benefits: ['Immediate or Deferred annuity options', 'Guaranteed pension for entire life', 'Joint life annuity with spouse', 'Return of purchase price to nominee', 'Multiple annuity options to choose from'], eligibility: '30–79 years (immediate), 30–65 (deferred)', term: 'Whole life annuity', premiumModes: 'Single premium only', minAge: 30, maxAge: 79, minSumAssured: '₹1 Lakh (purchase price)', isPopular: false },
  { planId: 'jeevan-akshay', category: 'pension', icon: '☀️', name: 'LIC Jeevan Akshay VII (Plan 857)', tag: 'Guaranteed Pension', description: 'Single premium immediate annuity plan with guaranteed income for life — 12 different annuity options.', benefits: ['12 flexible annuity payout options', 'Lifelong guaranteed pension', 'Joint life option with last survivor', 'Loan against policy available', 'Tax benefits on premium paid'], eligibility: '30–85 years', term: 'Lifelong annuity', premiumModes: 'Single premium lump sum', minAge: 30, maxAge: 85, minSumAssured: '₹1 Lakh (purchase price)', isPopular: false },
];

// GET /api/plans
const getPlans = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category && category !== 'all') filter.category = category;

    const plans = await Plan.find(filter).sort({ isPopular: -1, createdAt: 1 });
    res.json({ success: true, count: plans.length, data: plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/plans/:planId
const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findOne({ planId: req.params.planId, isActive: true });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/plans/seed (one-time setup)
const seedPlans = async (req, res) => {
  try {
    await Plan.deleteMany({});
    const plans = await Plan.insertMany(SEED_PLANS);
    res.json({ success: true, message: `${plans.length} plans seeded successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPlans, getPlanById, seedPlans };
