import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req:Request){
  try {
    const {userId}=auth();
    const body=await req.json();
    const {messages}=body;

    if(!userId){
        return new NextResponse("Unauthorized",{status:401})
    }
    if(!configuration.apiKey){
        return new NextResponse("openAI API key not configured",{status:500})
    }
    if(!messages){
        return new NextResponse("Messages are required",{status:400})
    }
    const freeTrial = await checkApiLimit();
    const isUltra=await checkSubscription();

    if(!freeTrial && !isUltra){
      return new NextResponse("Free trial has expired",{status: 403}) //403 triggers pro subscription model 
    }

    const response= await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages
    })
    if(!isUltra){
      await increaseApiLimit();
    }
    return NextResponse.json(response.data.choices[0].message)
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error",{status:500})
  }
}
