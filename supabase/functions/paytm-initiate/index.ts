import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import PaytmChecksum from "npm:paytmchecksum"

const PAYTM_MID = Deno.env.get('PAYTM_MID')
const PAYTM_MERCHANT_KEY = Deno.env.get('PAYTM_MERCHANT_KEY')
const PAYTM_WEBSITE = Deno.env.get('PAYTM_WEBSITE') || 'WEBSTAGING'
const PAYTM_ENV = Deno.env.get('PAYTM_ENV') || 'STAGING'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderId, amount, customerId, callbackUrl } = await req.json()

    if (!PAYTM_MID || !PAYTM_MERCHANT_KEY) {
      throw new Error('Paytm credentials not configured')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paytmParams: any = {
      body: {
        requestType: "Payment",
        mid: PAYTM_MID,
        websiteName: PAYTM_WEBSITE,
        orderId: orderId,
        callbackUrl: callbackUrl,
        txnAmount: {
          value: amount.toFixed(2),
          currency: "INR",
        },
        userInfo: {
          custId: customerId,
        },
      },
    }

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      PAYTM_MERCHANT_KEY
    )

    paytmParams.head = {
      signature: checksum,
    }

    const host = PAYTM_ENV === 'PRODUCTION' 
      ? 'securegw.paytm.in' 
      : 'securegw-stage.paytm.in'
      
    const response = await fetch(
      `https://${host}/theia/api/v1/initiateTransaction?mid=${PAYTM_MID}&orderId=${orderId}`,
      {
        method: 'POST',
        body: JSON.stringify(paytmParams),
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const result = await response.json()
    
    return new Response(JSON.stringify({ ...result, mid: PAYTM_MID }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
