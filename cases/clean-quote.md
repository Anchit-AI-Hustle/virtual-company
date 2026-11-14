# Clean Quote business case

Author: Meera, Head of Research. Date: 2026-11-14. FX used: USD 1 = INR 94.2754 (company/config.json, source xflowpay, 2026-11-14). I did not propose this idea and gain nothing if it passes.

## Summary

- The pain is real and repeats with every new client: solo cleaners underquote, and a podcast for cleaning owners describes a cleaner who earned under USD 10 an hour on a 21 hour first clean after a vague quote [10].
- The market is large and mostly US: 836,230 maids and housekeeping cleaners employed (BLS, May 2023) [1] and 1,095,927 janitorial nonemployer firms (Census 2023, via a secondary source) [2]. Most are not software buyers.
- The core job, "type in beds, baths, square feet and add-ons, get a price", is given away free by at least seven vendors, several with no signup [11][12][13][14][15][16][17]. Branded quotes sent by link come bundled in paid tools from USD 15 to 75 a month [4][5][6][7].
- Distribution is the weak point: search results are owned by Jobber, Housecall Pro, Tofu, ZenMaid and others, the dedicated subreddit has about 3K members with strict self-promotion norms [19], and Etsy, where paid calculators actually sell, needs the owner's identity [20]. There is also no payment rail yet (ap-2).
- Score 16 of 35. Recommendation: no-go. It fails the bar on distribution and on the minimum per-score rule (recurringRevenue 1).

## Market

**Who pays.** Owner-operators of house cleaning businesses, mainly solo or with one or two helpers, who quote new clients before a first clean. The evidence is almost entirely US: the paid tools price in USD [4][5][6][7], Etsy keyword data for "cleaning estimate" puts 82% of searches in the USA and 6% in Canada [21], and the free calculators default to US square feet and US dollar rates [11][13]. This is a USD product. An INR price would aim it at a market where I found no evidence of demand.

**How many (sourced):**

| Measure | Number | Source |
|---|---|---|
| US maids and housekeeping cleaners employed (wage and salary, excludes self-employed) | 836,230, mean wage USD 16.66 an hour | BLS OES, May 2023 [1] |
| Of those, employed by "services to buildings and dwellings" (cleaning companies) | 83,040 | BLS OES, May 2023 [1] |
| US janitorial services nonemployer firms (one-person businesses, residential and commercial mixed) | 1,095,927 | Census Nonemployer Statistics 2023, as reported by startbusinessbystate.com [2] |
| US janitorial services employer establishments | 67,799 | Census County Business Patterns 2023, same secondary source [2] |

**What is not known:** how many of the 1.1M nonemployer firms do residential house cleaning rather than office or commercial work, how many are active full time, and how many quote in writing at all. I found no primary source for any of these, so they are unknown. The nonemployer count is a ceiling, not a buyer count. The number is drawn from a secondary site, not census.gov directly; the Census API exists [3] but I did not query it.

**Who is not the buyer.** Cleaners employed by agencies (most of the BLS 836K) do not set prices. Larger maid services already pay for ZenMaid, Launch27 or Jobber [5][6][7] and would not switch to a one-time quote tool.

## Problem

- **Pain:** Moderate to high per incident. In Cleaning Business Life episode 123, a cleaner quoted a biweekly clean at USD 250 to 300, was vague about the first clean, worked about 21 hours and was paid USD 250, under USD 10 an hour. The hosts say a first clean is often "three to four times higher than the initial quoted price" and that renegotiating after the job "rarely works" [10]. Their fix is time-limited written quotes, deposits and signed agreements [10], which is exactly what a quote-by-link tool would deliver.
- **Frequency:** Repeats, but only per new client. A solo cleaner with a full book of recurring clients quotes rarely; one who is building a book quotes often. How many quotes a typical solo cleaner sends a month is unknown. Jobber's decision to cap its free plan at five quotes a month [12] suggests many small operators need about that many or fewer, which is a guess from a vendor's packaging, not data.
- **How people solve it today:** free online calculators [11][13][14][15][16][17], Excel templates bought on Etsy for USD 5 to 24 [8][9], free PDF estimate templates [12][13], or a paid field-service app [4][5][6][7].
- **Sceptic's note:** The pain is "I quoted wrong", which is a pricing-knowledge problem. A calculator helps only if its rates are right for the cleaner's area. The free tools already let cleaners enter their own hourly rate and add-on prices [11][14][16].

## Competition

All prices are from each vendor's own page, except QuotePro (noted).

| Alternative | Price (own page) | What it does | Gap Clean Quote fills? |
|---|---|---|---|
| Jobber free tools and free plan | Free cleaning cost calculator and free estimate template (PDF, Excel); free plan allows "up to five free estimates per month" [12][22] | Visit type, sq ft, beds, baths, add-ons to a price range [22] | Only for cleaners who send more than five quotes a month and refuse to pay |
| Jobber paid | Core USD 49 a month (USD 29 billed annually), 1 user, includes sending quotes and online booking; 14 day trial [7] | Full field-service suite | Price. Clean Quote would be a one-time fee |
| Housecall Pro free tools | Free price, bid, labor, margin and markup calculators and free estimate template [13]; free estimates generator, download and print, form asks for name, email and phone [23] | Calculators plus downloadable estimate | No-signup, link instead of PDF. Small gap |
| ShiftFlow | Free house cleaning calculator, "Free, no sign-up" [14]; free business quote generator with PDF download, logo, terms and acceptance lines, "without an account" [24] | Price range plus a full branded quote PDF | Very small: only the link instead of a PDF |
| Tofu | Free house cleaning cost calculator [11]; paid Solo plan USD 29 a month or USD 15 a month billed annually, estimates sent "via text, email or link" on every plan, no free plan [4] | Calculator that hands off to a branded estimate sent by link | This is the closest match to the idea, and its link-sharing is paid. The gap is a one-time price instead of USD 180 a year |
| Connecteam | Free house cleaning calculator with rooms, frequency, supplies, add-ons; outputs cost and time range [15] | Price and time estimate | Sharing not described. Small gap |
| ZenMaid | Free cleaning pricing calculator, "Yes, completely free!" [16]; software USD 19, 39 and 49 a month [5] | Price from rate and production speed | Same |
| Invoicer.ai | Free cleaning cost calculator, "completely free with no signup required", with Copy Results and Share buttons [17] | Price, saved in browser | Very small |
| QuoteIQ | Essentials USD 29.99 a month, 1 user, no free plan, 14 day trial with card [6] | Quoting and estimates | Price |
| Launch27 | Base USD 75, Pro USD 150, Plus USD 299 a month, 14 day trial [25] | Online booking forms that price jobs for clients | Not the same buyer: bigger maid services |
| QuotePro AI (iOS) | Freemium; paid plan cited at USD 19.99 a month for unlimited quotes. Source is AlternativeTo, not the vendor page, which I could not fetch [26] | Cleaning quotes, branded PDF proposals, CRM | Price, and it is iPhone only per the listing |
| QuoteitClean | 14 day free trial, no plans listed; 1 upvote on Product Hunt [27] | AI estimates to invoices, English and Spanish | Shows new entrants keep arriving with little traction |
| Etsy pricing spreadsheets | USD 5.00 to 24.00; one at USD 8.12 has 35 reviews; SimplyPMA listing USD 8.20, shop 940 sales [8][9] | Excel calculator with a quote tab | Phone use and a link the client can open. Real gap for phone-only cleaners |
| Plain spreadsheet, notes app or text message | Free | Anything | Speed and looking professional |

**Gap verdict.** The narrow gap is: no account, works on a phone, produces a branded quote page the client opens from a link, paid once. Every part of that exists somewhere: no-signup calculators [14][17], no-signup branded quote PDFs [24], quote links (paid, Tofu from USD 15 a month [4]). The combination at a one-time price is not something I found, but it is a thin wedge against free tools from companies with large content budgets.

## Willingness to pay

**Evidence that people pay:**
- One-time: Etsy cleaning pricing calculators sell at USD 5 to 24 [9]. The SimplyPMA calculator at USD 8.20 has 2 reviews and 31 favorites; the shop has 940 sales across all its products [8]. A USD 8.12 calculator has 35 reviews [9]. Total units sold per listing are not public, so volume is unknown.
- Recurring: Tofu Solo USD 15 to 29 a month [4], ZenMaid USD 19 to 49 [5], QuoteIQ from USD 29.99 [6], Jobber Core from USD 29 [7], Launch27 from USD 75 [25]. Customer counts for these vendors are not on their pricing pages, so unknown.

**Evidence that the wedge does not get paid for:**
- Free tools do the calculation [11][12][13][14][15][16][17]. The buyers on Etsy are paying for a spreadsheet they own inside Etsy's marketplace, not for a web calculator.
- New quote tools show weak traction: QuoteitClean has 1 Product Hunt upvote [27].

**Price.** A one-time USD 9 (INR 848) sits inside the Etsy range [9]. This is my assumption for modelling; no buyer has been asked. Any INR pricing aimed at Indian cleaners has no evidence behind it.

## Distribution

The company may not run paid ads, post as the owner or contact strangers. That leaves organic search, marketplaces and communities that welcome tools.

**Search demand exists but is small at the quote-tool end and crowded at the head:**
- On Etsy, "cleaning estimate" averages 170 searches a month (90 to 260), 82% USA, with 489 competing listings (RankHero) [21].
- I could not find a sourced Google monthly volume for "house cleaning price calculator" or "cleaning quote template". Unknown.
- A live search for house cleaning price calculator returns pages from Jobber, Tofu, ContractorPlus, ZenMaid, Connecteam, Housecall Pro, ShiftFlow and small independent tools [28]. A search for free cleaning quote generators returns Uplup, Invoicer.ai, Skynova, Housecall Pro, Jobber, Paperform, Bookipi, Arrivy, Tofu and ShiftFlow [29]. These are established domains that publish free tools as lead magnets. A new subdomain of a personal domain should not expect page one for these terms within 90 days. That is my judgement, not a measured figure.

**Communities:** r/CleaningBusiness has about 3K members and r/professionalcleaners about 2K; the listing notes most such communities "have strict rules against self-promotion" [19]. Posting there is also posting as the company or owner, which needs owner approval. These are not a route to 100 buyers.

**Marketplaces:** Etsy is where paid cleaning calculators visibly sell [8][9], but selling there requires verifying seller information for Etsy Payments [20], which is the owner's identity and is off limits without his hands.

**First 100 buyers, honestly:** I cannot name a no-ads, no-outreach path to 100 paid buyers in 90 days. Organic long-tail pages (for example "cleaning quote link", "send cleaning estimate from phone") may bring a trickle of free users after several months.

## Unit economics

**Price and fees.** Assumed USD 9 one-time (INR 848.48 at 94.2754). There is no payment rail: ap-2 was decided as "do nothing for now", and Razorpay needs the owner's KYC (company/approvals/ap-2.json). Fees depend on the rail, so they are unknown; for the arithmetic I assume 10% total fees, labelled as an assumption.

**Costs.** Build: small (venture score buildEffort 5). Hosting: INR 0 at this traffic on the current Vercel team, if the plan permits commercial use; the team's plan is not recorded in the brain, so unknown. Monthly budget: INR 0 (config.json).

**90 day scenarios (all estimates):**

| Case | Visitors (90 d) | Visitor to paid | Sales | Gross USD | Gross INR | Net INR (after assumed 10%) |
|---|---|---|---|---|---|---|
| Worst | any | 0% (no payment rail, or nobody buys) | 0 | 0 | 0 | 0 |
| Likely | 600 | 0.5% | 3 | 3 × 9 = 27 | 27 × 94.2754 = 2,545 | 2,291 |
| Best | 5,000 | 2% | 100 | 100 × 9 = 900 | 900 × 94.2754 = 84,848 | 76,363 |

Reasoning: the likely case assumes a few long-tail pages rank by month two against the crowded results [28][29]; 0.5% assumes most visitors are cleaners who want the free price, which free tools already give. The best case would need a viral mention the company cannot create itself. Against the company kill rule (3 paid orders or 20 signups within 14 live days, config.json), the likely case is at best borderline and is 0 until a rail exists.

## Sizing

To be added by the sizing agent (Farhan).

## Risks

1. **Free incumbents.** At least seven free calculators and free quote templates exist, several with no signup [11][12][13][14][15][16][17][24].
2. **Paid link-sharing is cheap.** Tofu Solo at USD 15 a month billed annually already sends estimates by link [4]; Jobber's free plan sends five quotes a month [12].
3. **Distribution.** Search results are owned by vendors with big content programs [28][29]; communities are small and hostile to promotion [19]; Etsy needs owner identity [20].
4. **No payment rail.** ap-2 decided to wait; nothing can be sold until the owner opens one.
5. **One-time revenue.** Each buyer pays once; there is no recurring income.
6. **Market and currency.** Demand is US [21]; an INR-priced product would miss it.
7. **Bad pricing advice.** If the tool's default rates are wrong for a cleaner's area, it causes the underquoting it claims to prevent [10].

**What would prove it wrong (dated).** If built anyway, measure from the live date, or from 2026-12-01 if not live by then. Review on 2027-03-01. The idea is wrong if any hold: fewer than 300 organic visitors in the first 60 days; fewer than 20 quotes created by distinct devices in the first 14 days; fewer than 3 paid unlocks in the first 14 days after payment goes live (config kill rule).

## Options

- **Proceed as is (one-time unlock, free calculator plus shareable quote link).** Not advised: the free tier is a commodity, the paid tier is a thin wedge, and there is no channel or payment rail.
- **Pivot to a cleaner's own client-facing instant quote page (a "price my home" link the cleaner puts on Instagram or Google Business, that clients fill in), priced in USD monthly.** This is what Launch27 sells from USD 75 a month [25], and Jobber Core includes online booking at USD 29 to 49 [7]. It adds recurring revenue but enters a paid, crowded category, and still has no distribution. Not enough to clear the bar on today's evidence.
- **Stop (do nothing for now).** Advised. Keep the evidence in the brain and spend the slot on an idea with recurring revenue and an uncrowded channel.

## Scorecard

| Criterion | Score (1 to 5) | Reason |
|---|---|---|
| pain | 3 | Underquoting costs real money and repeats per new client [10], but free calculators already address the price part [11][14][16] |
| willingnessToPay | 3 | People pay USD 5 to 24 one-time for Etsy calculators and USD 15 to 75 a month for suites [4][5][6][7][9]; no evidence anyone pays for a web quote link alone |
| marketSize | 3 | About 1.1M US janitorial nonemployer firms [2] and 836K maids [1], but the residential, quoting, paying share is unknown |
| distribution | 2 | Search crowded by funded vendors [28][29], subreddits about 3K members and anti-promotion [19], Etsy needs owner identity [20] |
| competitionGap | 2 | Every piece exists free or cheap: no-signup calculators and quote PDFs [14][17][24], quote links from USD 15 a month [4] |
| speedToRevenue | 2 | Small build, but no payment rail exists (ap-2) and organic search takes months |
| recurringRevenue | 1 | One-time unlock by design |
| **Total** | **16 / 35** | Below the bar of 24; distribution under 3; recurringRevenue under 2 |

## Recommendation

**No-go.** The need is real, but the free market already covers the calculation, the cheap paid market covers the link, and the company has no way to reach buyers without ads, outreach or the owner's Etsy identity. Revisit only if a sourced channel to solo cleaners appears that the company may use, and with a recurring price.

## Sources

1. BLS, Occupational Employment and Wages, Maids and Housekeeping Cleaners (37-2012), May 2023: https://www.bls.gov/OES/CURRENT/oes372012.htm
2. startbusinessbystate.com, Cleaning industry statistics (Census NES and CBP 2023): https://startbusinessbystate.com/cleaning-industry-statistics/
3. Census Bureau, Nonemployer Statistics API: https://census.gov/programs-surveys/nonemployer-statistics/data/api.html
4. Tofu pricing: https://tofu.com/pricing
5. ZenMaid, How much does ZenMaid cost: https://zenmaid.com/answers/en/articles/2423512-how-much-does-zenmaid-cost
6. QuoteIQ pricing: https://myquoteiq.com/pricing/
7. Jobber pricing: https://www.getjobber.com/pricing/
8. Etsy listing, SimplyPMA cleaning business pricing calculator: https://www.etsy.com/listing/4388244254/cleaning-business-pricing-calculator
9. Etsy search, cleaning price calculator: https://www.etsy.com/market/cleaning_price_calculator
10. Cleaning Business Life, episode 123, renegotiation after the fact: https://www.buzzsprout.com/2155653/episodes/16974604-cbl-episode-123-r-e-n-g-o-t-i-a-t-i-o-n-after-the-fact
11. Tofu free house cleaning cost calculator: https://tofu.com/calculators/house-cleaning-cost-calculator
12. Jobber free cleaning estimate template and free plan: https://getjobber.com/free-tools/estimate-template/cleaning/
13. Housecall Pro home cleaning templates and calculators: https://www.housecallpro.com/home-cleaning/templates-calculators/
14. ShiftFlow free house cleaning cost calculator: https://www.shiftflow.app/free-tools/free-house-cleaning-cost-calculator
15. Connecteam free house cleaning calculator: https://connecteam.com/free-tools/free-house-cleaning-calculator/
16. ZenMaid free cleaning pricing calculator: https://get.zenmaid.com/tools/cleaning-pricing-calculator
17. Invoicer.ai cleaning cost calculator: https://invoicer.ai/tools/cleaning-cost-calculator
18. ContractorPlus house cleaning calculator (seen in search results only, not opened): https://contractorplus.app/calculators/house-cleaning
19. PainOnSocial, subreddits for cleaning service owners: https://painonsocial.com/subreddits/cleaning-service-owners
20. Etsy Help, How to verify your seller information for Etsy Payments: https://help.etsy.com/hc/en-us/articles/360001980067-How-to-Verify-Your-Seller-Information-for-Etsy-Payments
21. RankHero, "cleaning estimate" Etsy keyword data: https://www.rankhero.com/keywords/cleaning-estimate
22. Jobber free house cleaning cost calculator: https://www.getjobber.com/free-tools/house-cleaning-cost-calculator/
23. Housecall Pro free estimates generator: https://www.housecallpro.com/tools/estimates-generator/
24. ShiftFlow free business quote generator: https://www.shiftflow.app/free-tools/free-business-quote-generator
25. Launch27 pricing: https://launch27.com/pricing
26. AlternativeTo, QuotePro AI (vendor site getquotepro.ai could not be fetched this session): https://alternativeto.net/software/quotepro-ai-cleaning-quote/about
27. Product Hunt, QuoteitClean: https://www.producthunt.com/products/cleanquote-ai-2
28. Web search results for house cleaning price calculator, 2026-11-14, including the pages in sources 11, 13, 14, 15, 16, 18 and 22
29. Web search results for free cleaning quote generators, 2026-11-14, including https://uplup.com/templates/form/cleaning-service-quote, https://www.skynova.com/template/estimate/cleaning, https://paperform.co/templates/cleaning-quote-form/, https://www.arrivy.com/free-templates/estimate/cleaning/ and sources 17, 23 and 24
