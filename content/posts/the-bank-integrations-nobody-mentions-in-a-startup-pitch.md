---
title: "The Bank Integrations Nobody Mentions in a Startup Pitch"
summary: "The behind-the-scenes bank, processor, and data connections a new banking product has to line up before anyone can sign up."
releaseDate: 2026-11-04
written: 2026-11-04
tags: [crew, product, integrations]
about: [work/crew]
draft: false
---

Let’s talk about fintech integrations: banking platforms, issuer processors, account verification, payments and all the systems customers never see.

The first time I saw the infrastructure behind a consumer fintech product, I had a very optimistic idea of what an integration meant.

You find the right provider. You connect their API. The app works.

Then you discover that the bank, the processor, the network, the compliance system, and the customer's old bank all have their own requirements. Sometimes they have different ideas about when a transaction exists.

I spent a lot of my time at Willow and Crew learning to navigate those dependencies.

## Our first technology choices

My January 3, 2023 journal describes meeting with the team behind i2c, a processor and technology platform we were evaluating to help us move quickly.

I liked the prospect of building on infrastructure that already existed. The harder work was figuring out whether it fit the product we wanted, whether our issuing partner supported it, and what it would cost when customers used their accounts.

We also considered other banking-as-a-service arrangements in the early stages. Vendor research isn't the same as a signed contract. Some old notes list i2c, Unit, and bank candidates, while later Crew materials confirm Bangor Savings Bank and Treasury Prime in the operating stack.

I still have a few gaps in the original provider timeline. I'd rather leave them visible than combine every vendor into one imaginary architecture.

## Connecting to another bank isn't one feature

In August 2023, we created two MX compatibility sheets covering 41 financial institutions.

We were investigating account owner verification, balance checks, and account aggregation. Those sound related, but a bank connection can support one and struggle with another. Some institutions require reauthentication. Some have gaps in coverage.

That spreadsheet was a reminder that "Connect your existing bank" isn't a single universally reliable operation.

And because we were trying to help customers switch banks, we couldn't treat it as a tiny edge case.

## What happens if it's Saturday?

Traditional ACH settlement runs on banking days. Funds availability, risk, and posting conventions can be different from what the customer expects when they hit Transfer.

If the app displays money as available before an incoming transfer has settled, somebody is making a risk and liquidity decision. Same-day ACH has different windows and pricing; instant rails exist, but participating institutions and use cases matter.

Our early provider conversations explicitly priced standard and same-day ACH differently.

It wasn't enough for us to build a transfer button. We had to understand what we were promising.

## The weird little questions are real

What happens when an ACH transfer is returned?

Who handles a debit-card dispute?

How does a customer securely set or change a card PIN?

Who pays when they use an ATM outside the preferred network?

If a child has a card, which account controls can the processor enforce, and which controls are just a visual setting in the app?

I was constantly trying to answer questions like these. The details varied by vendor. Some responsibilities belonged to our banking partners and processors, and that was fine. We needed to design the customer experience around what those partners could do.

## I liked this work more than I should've

I also worked on illustrations, card finishes, customer discovery, and marketing. It might sound like I changed jobs every week.

I didn't see it that way. All of those decisions shaped whether someone would trust a new financial product and whether the product could keep its promises.

There were days when I was comparing metal card weights and days when I was learning why a banking connector couldn't verify an account holder.

I was learning an entire industry while trying to help build something real inside it.

I still find that fascinating. The next time a bank app tells me a transfer will take three business days, I can practically see the meeting that produced that sentence.
