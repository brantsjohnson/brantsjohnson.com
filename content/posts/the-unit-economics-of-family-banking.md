---
title: "The Unit Economics of Family Banking"
summary: "The first time I saw a processing quote for a few cents per transaction, I thought, okay. That's manageable."
releaseDate: 2026-10-31
written: 2026-10-31
tags: [crew, product, economics]
about: [work/crew]
draft: false
---

Then I put it in a spreadsheet.

This was early in Willow, before we became Crew. We were building banking products for families, which meant multiple cards, multiple account holders, recurring payments, savings balances, and a pretty ambitious rewards proposition. A small fee on one purchase seems trivial. Put it across thousands of households, and that fee starts appearing everywhere.

I got very interested in the part of banking most customers never see: what it costs to serve an account before you've made a dollar from it.

## First, how many cards does a family use?

In January 2023, we were working through an i2c processing model that assumed about 3.5 cards per household.

One early model used 36 transactions a month for the entire family. Thirty-four were adult transactions and two came from children. That worked out to about 10 transactions per card.

At the same time, Gentry said his own household was making roughly 150 to 170 transactions a month. You can see the problem immediately. Our expected card activity and a real-world example were nowhere near one another.

The processing pricing we were discussing was about 2.5 to 4 cents a transaction. At 36 transactions, that adds up to roughly 90 cents to $1.44 a month for a family, before all the other costs. At 160 transactions, it's $4 to $6.40.

That's still not a huge number. Until you acquire 100,000 families.

At that scale, the second scenario would be $400,000 to $640,000 a month in processing fees using those illustrative rates. You need to know which behavior you're actually buying infrastructure for.

## Then there was interchange

When a customer pays a merchant with a card, the merchant's cost includes multiple pieces. One is interchange, which generally flows toward the card issuer under the network's rules. The acquiring side, payment processor and card network all have their economics too.

People hear "interchange" and assume that every swipe is a free little revenue stream for the company whose logo is on the card.

I wish.

Your share depends on the issuing arrangement, the card type, the merchant category, network rules and your contracts. Then you have processing expenses, fraud losses, disputes, customer support, fulfillment and whatever rewards you've promised.

We were exploring generous cashback. One early credit-card concept had a 1% base reward and another 1% when balances were paid early. I researched competitors, including X1, Chase and Venture X, to understand how other card programs structured earnings, caps, redemptions and annual fees.

You can't judge a rewards program by the number printed on the advertisement. You have to know the denominator, what actions qualify, how points convert and what the program costs when customers use it exactly as intended.

## Savings accounts were a separate financial model

Our earliest discussions also involved paying customers an attractive rate on their deposits.

We were comparing interest-rate benchmarks such as SOFR with possible customer APYs and what the banking partner and platform provider would retain. That's where basis points become your second language.

A basis point is one-hundredth of a percentage point. Fifty basis points is half a percentage point. On $100 million, 50 basis points is $500,000 a year. If the share falls to 10 basis points, it's $100,000.

That difference can pay for a lot of card manufacturing.

A bank's economics involve the yield it earns on assets, what it pays depositors, funding costs, risk and operating expenses. A fintech sharing in deposit economics may have a separate negotiated revenue split. So when somebody asks, "Why can't banks pay everyone more interest?" the answer depends on which institution we're talking about, what it earns and what the contracts permit.

Those were things I had to learn to ask.

## And there were all the annoying little fees

ACH transfers, same-day ACH, checks, wires, replacement cards, disputes, returns, account maintenance. They all carry different costs and different operational implications.

One early banking-platform negotiation had ACH prices falling at higher volumes, with same-day transfers carrying an additional fee. Even the price of receiving a returned ACH mattered.

I liked working on these models because the spreadsheet exposed what a product idea was asking the company to subsidize.

Free accounts are not necessarily free to operate. A rewards program is a recurring liability. A family with six cards may earn you less than a family with two. And a feature can look harmless until you multiply it by how often people actually use it.

We were trying to build a product that gave more value back to customers. That only works if someone does the math with enough care to keep the company alive.
