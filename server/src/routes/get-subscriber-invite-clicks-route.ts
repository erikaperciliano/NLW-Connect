import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitedClicks } from '../functions/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/subscribers/:subscriberId/ranking/clicks', {
        schema: {
            summary: 'Get subscriber invite clicks count',
            tags: ['referral'],
            params: z.object({
                subscriberId: z.string(),
            }),
            response: {
                201: z.object({
                    count: z.number(),
                })
            },
        },
    }, async request => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitedClicks({ subscriberId })

        return { count }
    })
}
