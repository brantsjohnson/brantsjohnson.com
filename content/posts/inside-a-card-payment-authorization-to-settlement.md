---
title: "Inside a Card Payment: Authorization to Settlement"
summary: "Every time a card terminal says APPROVED, a surprisingly large number of companies have just managed to agree with each other in a couple of seconds."
releaseDate: 2026-10-29
written: 2026-10-29
tags: [crew, product, payments]
about: [work/crew]
draft: false
---

I learned how much work was packed into that little moment while we were building Crew's debit-card program. We had to understand the issuing bank, the card network, the processor, the account ledger, the authorization controls and what happens after the customer walks away.

There's a good reason payment engineers are so obsessed with edge cases.

## Start at the coffee shop

You tap a Mastercard at a merchant's terminal. The terminal communicates with the merchant's acquirer, usually through the merchant's payment processor. The request travels over Mastercard's network toward the issuer processor responsible for the card.

The authorization request carries information the system needs to make a decision: merchant category, amount, currency, card and transaction data, and indicators describing how the card was used. With a contactless EMV card, the chip produces transaction-specific cryptographic data. That makes cloning a static magnetic-stripe number a very different proposition from producing a valid chip transaction.

The issuer processor applies the relevant controls. Is the card active? Has it been frozen? Is that amount allowed? Is the account in good standing? Does the available balance support the purchase? A bank or its designated providers may handle additional risk and compliance decisions. Then an approval or decline travels back along the network to the terminal.

It feels instantaneous because the whole system is engineered to make it feel instantaneous.

When we were mapping Crew's product, the interesting part was figuring out which provider owned each decision. A button in your app that says 'Freeze card' is only useful if its instruction reaches the system making authorization decisions. An interface can promise anything. The processor still has to enforce it.

## Approval and settlement are separate events

Suppose you buy $40 of groceries. The issuer can authorize $40 and reduce your available balance immediately, even though the merchant hasn't received final settlement of those funds.

Later, the merchant submits the transaction for clearing. The network and the participating financial institutions reconcile the finalized amount and settle the obligations through their respective accounts and arrangements.

That's why pending transactions exist. It's also why a restaurant tip can change the final amount, a hotel can place a hold much larger than a room charge, and a refund doesn't always appear the moment the cashier presses a button.

If you're designing a banking app, you need to represent that difference accurately in the ledger and available balance. Otherwise the customer sees numbers that contradict what happened at the terminal.

## The PIN isn't sitting in your startup's database

Debit cards introduce another part of the system: personal identification numbers.

A PIN is sensitive authentication information. Payment programs use secure cryptographic systems and specialized hardware security modules, or HSMs, so that clear PINs and encryption keys aren't handled like ordinary application data. The issuer processor and its partners typically provide the secure PIN services and verification flows.

We had to account for PIN creation, PIN changes, resets and what would happen when a customer used an ATM. That doesn't mean I was personally handling PIN encryption. It means the product team had to know who provided it, what our integration could support and how the customer would experience it.

That distinction matters on a regulated product. Your team can own the experience without taking custody of every dangerous secret underneath it.

## A card has two very different kinds of plumbing

One of the easiest mistakes to make in fintech is to use 'payment processing' as though it describes a single system.

A debit-card purchase follows card-network authorization, clearing and settlement rules. Moving someone's paycheck or funding an account from another bank commonly uses ACH, with a different set of banking relationships and settlement windows.

I spent a lot of time reading about those systems. *The Anatomy of the Swipe* was one of the books I used to understand the mechanics. Brett King's *Bank 4.0* helped me think about where banking was going as a product.

At Crew, we were stitching together a customer experience over those existing rails. The difficult questions weren't visible to customers: which provider sees a balance change first, who owns a failed transaction, when a hold expires, and how an account recovers when one of the systems is late.

I still think it's remarkable that a $4 coffee can involve this much infrastructure. And that, most of the time, we get the coffee and never think about any of it.
