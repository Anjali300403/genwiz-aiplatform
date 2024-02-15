import { Heading } from "@/components/heading"
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription"
import { Music, Settings, UserCog } from "lucide-react"

const SettingsPage=async ()=>{
  const isUltra= await checkSubscription();
  return(
    <div>
       <Heading
        title="Settings"
        description="Manage account details.View current plan."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isUltra? "you are currently on the ultra plan":"You are currently on the free plan"}
        </div>
        <SubscriptionButton isUltra={isUltra}/>
      </div>
    </div>
  )
}

export default SettingsPage;