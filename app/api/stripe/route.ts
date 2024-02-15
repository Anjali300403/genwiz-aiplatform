import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { error } from "console";

const settingsUrl= absoluteUrl("/settings"); //this generates .env.NEXT.PULIC_APP_URL/settings

export async function GET(){
    try{
        const{userId}=auth();
        const user= await currentUser();
        if(!userId || !user){
            return new NextResponse("Unauthorized",{status:401})
        }
        const userSubscription=await prismadb.userSubscription.findUnique({
            where:{
                userId
            }
        })
        if(userSubscription && userSubscription.stripeCustomerId){
            const StripeSession= await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })
            return new NextResponse(JSON.stringify({url: StripeSession.url}))
        }
        const StripeSesh= await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types:["card"],
            mode: "subscription",
            billing_address_collection:"required",
            customer_email: user.emailAddresses[0].emailAddress, //user is from clerk.js
            line_items:[
                {
                    price_data:{
                        currency:"INR",
                        product_data:{
                            name: "GenWiz Ultra",
                            description: "For unlimited AI generation"
                        },
                        unit_amount: 299*100,
                        recurring:{
                            interval:"month"
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata:{ //very important 
                userId  
            }
        })
        return new NextResponse(JSON.stringify({url:StripeSesh.url}))
    }
    catch(error){
        console.log("STRIPE_ERROR",error)
        return new NextResponse("Internal error",{status:500})
    }
}