const { transporter } = require('../config')
const GiftModel = require('../models/Gift')

const Gifts = {
    create: async (req, res, next) => {
        const { giftName } = req.body
        if (!giftName) return res.status(400).json({ message: "giftName is required" })
        const newGift = new GiftModel({ giftName: giftName })
        await newGift.save()
        res.status(201).json(newGift)
    },
    read: async (req, res, next) => {
        const gifts = await GiftModel.find({})
        res.json(gifts)
    },
    delete: async (req, res, next) => {
        const { id } = req.params
        if (!id) return res.status(400).json({ message: "id in params is required" })
        const removedGift = await GiftModel.findOneAndRemove({ _id: id })
        res.status(202).json(removedGift)
    },
    notify: async (req, res, next) => {
        const allGifts = await GiftModel.find({})
        const giftsNames = String(allGifts.map(g => g.giftName))
        const mailOptions = {
            from: process.env.GMAIL_USER_EMAIL,
            to: 'florian@wildcodeschool.fr',
            subject: 'Santa Gimme my Gifts !', 
            text: `Hello Santa,
There are the gifts that I need you to give me !
gifts: ${giftsNames}

Don't forget it or I'll screw you !
`
        }
        await transporter.sendMail(mailOptions)
        res.json({
            message: "Email sent to Santa !"
        })
    }
}

module.exports = Gifts