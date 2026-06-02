import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import PaytmChecksum from "npm:paytmchecksum"

const PAYTM_MERCHANT_KEY = Deno.env.get('PAYTM_MERCHANT_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const FRONTEND_URL = Deno.env.get('FRONTEND_URL') || 'https://alessio.github.io'

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

serve(async (req) => {
  try {
    const formData = await req.formData()
    const paytmParams: Record<string, string> = {}
    let paytmChecksum = ""

    for (const [key, value] of formData.entries()) {
      if (key === 'CHECKSUMHASH') {
        paytmChecksum = value as string
      } else {
        paytmParams[key] = value
      }
    }

    if (!PAYTM_MERCHANT_KEY) {
      throw new Error('Paytm Merchant Key not configured')
    }

    const isVerifySignature = await PaytmChecksum.verifySignature(
      paytmParams,
      PAYTM_MERCHANT_KEY,
      paytmChecksum
    )

    if (isVerifySignature) {
      const orderId = paytmParams.ORDERID
      const status = paytmParams.STATUS === 'TXN_SUCCESS' ? 'paid' : 'cancelled'
      
      const { error } = await supabase
        .from('orders')
        .update({ 
          status,
          payment_id: paytmParams.TXNID,
        })
        .eq('id', orderId)

      if (error) throw error
      
      // Redirect back to frontend success page
      return Response.redirect(`${FRONTEND_URL}/order-success?id=${orderId}`, 302)

    } else {
      return new Response("Checksum Mismatch", { status: 400 })
    }
  } catch (error) {
    console.error('Callback error:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
