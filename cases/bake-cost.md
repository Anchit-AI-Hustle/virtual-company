# Bake Cost business case

Author: Meera, Head of Research. Date: 2026-11-14. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, 2026-11-14). I did not propose this idea and gain nothing if it passes.

## Summary

- The question "what should I charge for this cake" is real and comes back with every custom order. Bakers ask it on forums and Google autocompletes it in the US and India [7][8][20].
- The free answer is already good and plentiful: Craftybase, Omni Calculator, BatterSuite, cakepricingcalculator.pages.dev and a crowd of clones price a cake for nothing, many with no account [1][2][3][4][21]. Free Android and iOS apps (BakeCost, Bake Margin, Recipe Costing BakeCost) already save recipes and send quotes, some by WhatsApp or PDF [5][6][9].
- Paid standalone costing tools show very weak sales signals: 1 rating on a USD 59.99 app, 15 ratings on a USD 4.99 app last updated in 2019, 1 sale on an Etsy sheet [10][11][12]. The one large paid signal, Bakesy (7.3K ratings), sells order management and a shop page, not costing [13].
- There is no payment rail (approval ap-2 deferred it; it needs the owner's KYC), and the company may not advertise or post in communities, so 90 day revenue is likely INR 0 to a few thousand.
- Score 15 of 35. Recommendation: no-go.

## Market

**Who pays.** Home bakers and cottage food sellers who take custom orders (birthday cakes, cupcakes, cookies) and set a price per order. Customers are the bakers, not their buyers.

**Where and how many (sourced):**

| Market | Count | Source |
|---|---|---|
| US, Minnesota only | 14,116 cottage food registrations in 2025, up from 10,853 in 2024 and 464 in 2015 | Minnesota Department of Agriculture [14] |
| US, 25 states | A survey sampling frame of "over 25,000 producers across 25 states"; "Most cottage food producers make baked goods" | Institute for Justice [15] |
| US national | No national count found. Unknown | [15] |
| India | Many press stories on Instagram home bakeries [16], but no count of home bakers found. Unknown | [16] |

**How much they earn.** The Institute for Justice survey of 775 producers found median 2016 sales of USD 2,000 and median profit of USD 500 a year [15]. This is a hobby-scale buyer. A tool that costs a meaningful share of USD 500 profit is a hard sell.

**Currency.** The need exists in both the US and India: Google autocomplete returns "cake pricing calculator india" and "recipe cost calculator free india" [20]. But every paid price I found is in USD or AUD [10][11][12][17][18]. I found no evidence that an Indian home baker pays for a costing tool, at any INR price. An INR product aims at the buyers with the least proof of paying; a USD product puts us in the crowded US search results.

## Problem

- **Pain:** Moderate. Underpricing is a common complaint. A Cake Central poster asks whether to charge USD 2.50 or 4 a serving, and replies tell her to work out real costs and charge at least USD 10 an hour [7]. Another asks whether to count ingredients, labour and delivery in a cheesecake price [8]. Both threads are old (the second is from 2018), so this is a long-known problem with long-available answers.
- **Frequency:** Repeats per order, but the hard part is done once. After a baker has costed her base recipes, a new quote is mostly arithmetic she can do in a spreadsheet or a free calculator. The repeat use is real; the repeat need to pay is weak.
- **Current workaround:** Free web calculators [1][2][3][4], free apps [5][6][9], spreadsheets sold for USD 4.79 to 55.55 or given away [12][17][18], and pricing guides from bakers' blogs [19].

## Competition

Prices are from each vendor's own page or app store listing.

| Alternative | Price (own page) | What it does | Gap we would fill |
|---|---|---|---|
| Craftybase cake pricing calculator | Free [1] | Ingredient costs, labour time and margin to a selling price, per unit and per batch. Saving recipes is in the paid Craftybase product (14 day trial) [1] | Saving recipes for free on a phone. Small |
| cakepricingcalculator.pages.dev | "100% Free forever", "No account, no paywall, no email" [3] | Six step guided calculator: ingredients as a total, labour, overhead, profit, per serving price | Itemised recipes and saved quotes. Small |
| Omni Calculator, cake pricing | No price or paywall shown [2] | Itemised ingredients, boxes, electricity, labour, delivery, servings; share result. No margin input, no saving | Margin and saving. Small |
| BatterSuite | Calculator free; recipes, quotes and orders are an upgrade, price not shown on Product Hunt [4] | Labour, overhead, margin | None on the free part; its site could not be fetched to price the upgrade |
| BakeCost: bakery orders (Android) | Free core, offline, no account; Pro price not listed; 100+ downloads [5] | Recipe costing, target margin price, orders, deposits, and "sends quotes via WhatsApp or PDF" in the free tier | Almost none. It already does the WhatsApp quote that an India pitch would rely on |
| Bake Margin (iOS) | Free; Pro USD 3.99 a month, 24.99 a year or 59.99 lifetime; no rating shown [6] | Recipe costing with waste, labour, overhead, margin pricing, branded PDF quotes and invoices, offline | Android and web. Feature gap none |
| Recipe Costing - BakeCost (iOS) | Free for 3 recipes; Pro USD 19.99 one-time; no rating shown [9] | Ingredient masters, sub-recipes, labour, packaging, fees, suggested prices | Android and web |
| CakeCost (iOS, Android) | Free; Premium USD 8.99 a month on iOS; iOS 3.2 from 29 ratings [22]; Android 4.17 from 121 reviews [23] | Recipe costing with labour, overhead, margin | Reviewers complain about sync and slow entry [23]. A narrow quality gap |
| Cost A Cake Pro (iOS) | USD 4.99; 2.3 from 15 ratings; last updated 2019 [11] | Pantry, extras, saved recipes, customer quotes | Shows the job was built years ago and sold weakly |
| Bakers Pricing Calculator (iOS) | USD 59.99; 1 rating [10] | Pricing calculator | Shows high one-time prices do not sell |
| Bake That Batter | From USD 8.99 a month, no free version; 5 reviews [24] | Orders, customers, recipes, invoicing | Order suite, not a quick quote |
| CakeBoss | Subscription (CakeBoss Cloud) [25]; Capterra lists USD 149 one-time per user [26] | Recipe costing, orders, reports | Phone and simplicity |
| Bakesy (iOS) | Free; Membership USD 9.99, Premium USD 17.99 a month; 4.9 from 7.3K ratings [13] | Order inquiries, shop page, invoicing, payments; costing not mentioned | Costing. But a baker who pays Bakesy is buying orders, not a calculator |
| Spreadsheets | Etsy USD 4.79 (shop: 1 sale, no reviews) [12]; Payhip USD 55.55 (no sales shown) [17]; Teachable USD 7 or AUD 10 with a course [18] | Ingredient, labour, overhead and margin sheets | A phone UI instead of a sheet |

**The gap.** A web app, on Android and iPhone, that saves itemised recipes and makes a shareable quote, with no install. Every part of that exists for free somewhere; the only thing missing is the exact combination in a browser. Free tools already do the core job well. I do not see a gap a buyer would pay to close.

## Willingness to pay

- **For:** Paid products exist at USD 4.79 to 149 [6][9][10][11][12][17][18][26]. Bakesy has 7.3K ratings at up to USD 17.99 a month [13], which proves home bakers pay for software that brings in or manages orders.
- **Against, and stronger:** The paid tools that are mainly about costing show almost no buyers: Bakers Pricing Calculator 1 rating at USD 59.99 [10], Cost A Cake Pro 15 ratings and no update since 2019 [11], CakeCost iOS 29 ratings [22], Bake Margin and Recipe Costing BakeCost with too few ratings to show [6][9], the Etsy sheet 1 shop sale [12], and the Payhip sheet no sales shown [17]. Ratings are not sales, but a consistent near-zero across seven products is a signal.
- **Autocomplete leans free:** "cake pricing calculator free", "cake pricing calculator app free", "excel free download", "recipe cost calculator free india" [20].
- **INR:** No evidence of any Indian baker paying for a costing tool. Unknown.
- **Payment rail:** The company cannot take money today. Approval ap-2 deferred opening one; it needs the owner's KYC (company/approvals/ap-2.json).

## Distribution

Allowed channels: organic search, marketplaces and communities that welcome it. Not allowed: ads, posting as the owner, contacting strangers.

- **Organic search.** Demand is visible: "cake pricing calculator", "how to price a cake", "how to price a cake calculator", "recipe cost calculator for baking" all autocomplete in the US and India [20]. But the first page is crowded with free calculators from established sites (Craftybase, Omni Calculator, calculate.co.nz, calculators.sg, Newtum) and many new .pages.dev clones (cakepricingcalculator, cake-pricing, pastrycal, calcbee, joteo1, sb-cloudflare) [1][2][3][21]. A new subdomain with no links starts behind all of them. Search volumes are unknown: I have no keyword tool, only autocomplete.
- **Marketplaces.** Google Play and the App Store are where costing apps live [5][6][9], but we are a web app; a store listing needs a developer account in the owner's name. Etsy and Payhip sell sheets [12][17], but listing needs an account in the owner's name and they show almost no sales.
- **Communities.** Cake Central forums and baking subreddits are where bakers ask [7][8]. Posting there means posting as someone, which the rules forbid, and I could not fetch the r/cakedecorating rules to check whether they allow tool links (blocked URL, reported). Treat as unavailable.
- **Verdict:** One honest channel (organic search), and it is crowded with free answers. First 100 paying buyers: no credible path in 90 days.

## Unit economics

Price is not set (priceINR is null). For the arithmetic I assume a one-time unlock of USD 9.99 (INR 941.81), between Cost A Cake Pro USD 4.99 [11] and Recipe Costing BakeCost Pro USD 19.99 [9]. Visitors and conversion are assumptions, not data, and are labelled.

| Case | Assumptions | 90 day revenue |
|---|---|---|
| Worst | No payment rail in the window (current state, ap-2) | INR 0 |
| Likely | Rail opens; 300 organic visitors in 90 days to a new subdomain (assumption); 1% buy (assumption): 3 x INR 941.81 | INR 2,825 |
| Best | 3,000 visitors (assumption); 2% buy (assumption): 60 x INR 941.81 | INR 56,509 |

Costs: hosting on the existing Vercel team, INR 0 extra per the spend cap (config autoDecide). Payment processing fees: unknown until a rail is chosen. Build time: small (a calculator plus local storage). The cost is low; the problem is that revenue is near zero in all but an optimistic case.

## Sizing

To be added by the sizing agent (Farhan).

## Risks

What would prove this case wrong (in favour of the idea), checked by 2027-02-14 if it were built:
- The live page gets 1,000 or more organic visits in 90 days (Vercel analytics), showing we can rank against the free calculators.
- 10 or more paid unlocks in 90 days at USD 9.99 or INR equivalent.
- An Indian baker community or marketplace that welcomes tool listings is found, with a source.

What would confirm it (against the idea):
- Fewer than 300 visits and 0 sales by 2027-02-14.
- Payment rail still not open by 2026-12-31.
- Other risks: a free competitor adds a saved recipe web app (BatterSuite already sells this as its upgrade [4]); the many clone sites suggest more will follow [21].

## Options

- Proceed: build the web calculator with a paid unlock. Low cost, but cannot earn until a rail exists and has no proven path to buyers. Not recommended.
- Pivot: a free, no-signup web costing tool as a labelled demand test only, with no paid tier until it shows 1,000 visits in 90 days; or pivot to what Bakesy proves people pay for (order intake and a shop page for home bakers), which is a bigger build and a crowded paid market. Neither is clearly better than stopping.
- Stop: record the evidence and move on to the next scored idea. Recommended.

## Scorecard

| Key | Score | Reason |
|---|---|---|
| pain | 3 | Real and repeats per order, but solved well enough by free calculators and sheets [1][3][7] |
| willingnessToPay | 2 | Paid costing tools exist but show near-zero ratings or sales; autocomplete leans to "free" [10][11][12][20] |
| marketSize | 3 | Many home bakers (Minnesota alone 14,116 registrations [14]) but hobby-scale median profit USD 500 a year [15]; India count unknown |
| distribution | 2 | Organic search only, crowded with free calculators and clones [21]; communities and stores need the owner |
| competitionGap | 2 | Free apps already save recipes and send WhatsApp or PDF quotes [5][6]; only the browser combination is missing |
| speedToRevenue | 1 | No payment rail; needs owner KYC (ap-2) |
| recurringRevenue | 2 | Repeat use, but the model is a one-time unlock and paid recurring costing apps show few buyers [22] |

Total: 15 of 35. Below the bar (needs 24, with at least 3 for willingnessToPay and distribution).

## Recommendation

no-go. The need is real but free tools meet it, paid costing tools barely sell, and our only allowed channel is crowded with free answers.

## Sources

1. Craftybase free cake pricing calculator: https://craftybase.com/cake-pricing-calculator
2. Omni Calculator cake pricing: https://www.omnicalculator.com/food/cake-pricing
3. cakepricingcalculator.pages.dev: https://cakepricingcalculator.pages.dev/
4. BatterSuite on Product Hunt: https://www.producthunt.com/products/battersuite (battersuite.com could not be fetched; blocked URL)
5. BakeCost: bakery orders, Google Play: https://play.google.com/store/apps/details?id=com.bakecost.app
6. Bake Margin, App Store: https://apps.apple.com/us/app/bake-margin/id6781448292
7. Cake Central, how much should I charge: https://www.cakecentral.com/forum/t/757030/help-me-out-guys-how-much-should-i-charge-for-this-cake/
8. Cake Central, pricing a cheesecake: https://www.cakecentral.com/forum/t/847411/i-know-its-been-asked-about-a-million-times/
9. Recipe Costing - BakeCost, App Store: https://apps.apple.com/us/app/id6770001554
10. Bakers Pricing Calculator, App Store: https://apps.apple.com/us/app/id1588565115
11. Cost A Cake Pro, App Store: https://apps.apple.com/us/app/cost-a-cake-pro/id615555385?l=en
12. Etsy cake pricing spreadsheet: https://www.etsy.com/listing/4598876375
13. Bakesy, App Store: https://apps.apple.com/app/id1515139393
14. Minnesota Department of Agriculture, cottage food data: https://mda.state.mn.us/food-feed/cottage-food-data
15. Institute for Justice, cottage foods survey: https://ij.org/report/cottage-foods-survey/
16. YourStory, home bakers in India: https://yourstory.com/2015/02/baking-entrepreneurship
17. Payhip custom order pricing spreadsheet: https://payhip.com/b/Ka0oW
18. Profitable Cake Business 101, cake pricing calculator: https://pcb-101.teachable.com/p/cake-pricing-calculator1
19. Better Baker Club pricing guide: https://betterbakerclub.com/pricing-baked-goods-how-to-do-it-the-right-way/
20. Google autocomplete, fetched 2026-11-14 for gl=us and gl=in: https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=in&q=cake+pricing+calculator
21. Web search results for "cake pricing calculator india rupees home baker", showing calculate.co.nz, calculators.sg, newtum.com and several .pages.dev calculators, e.g. https://calcbee.pages.dev/calculators/food/baking/cake-pricing and https://www.calculate.co.nz/cake-pricing-calculator.php
22. CakeCost, App Store: https://apps.apple.com/us/app/cakecost/id1555897547
23. CakeCost Android stats: https://android-stats.com/d/net.cakecost.app
24. Bake That Batter on Capterra: https://www.capterra.com/p/10038252/Bake-That-Batter/
25. CakeBoss, why buy: https://cakeboss.com/why
26. CakeBoss on Capterra: https://www.capterra.com/p/127935/CakeBoss/
