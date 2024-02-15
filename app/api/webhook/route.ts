import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

//webhook can't use clerk, we need to add it to public routes, clerk.js can't be used

export async function POST(req: Request){
    const body= await req.text();
    const signature= headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try{
        event= stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }catch(error: any){
        return new NextResponse("Webhook Error: ${error.message}",{status:400})
    } //we are looking for only two events: billing or checkout

    const session= event.data.object as Stripe.Checkout.Session;

    if(event.type==="checkout.session.completed"){
        const subscription= await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        if (!session?.metadata?.userId){
            return new NextResponse("Your UserId is required",{status: 400})
        }
        await prismadb.userSubscription.create({
            data:{
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end*1000 //this converts the UNIX timestamp to javascript date object to convert seconds to milliseconds 
                )
            }
        })
    }
    if(event.type==="invoice.payment_succeeded"){
        const subscription= await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        await prismadb.userSubscription.update({
            where:{
                stripeSubscriptionId: subscription.id,
            },
            data:{
                stripePriceId:subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end*1000
                )
            }
        })
    }
    return new NextResponse(null,{status: 200}) //not mentioning status can mess up with web hook functionality. 
}