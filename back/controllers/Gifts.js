const { transporter } = require('../config')
const GiftModel = require('../models/Gift')

const Gifts = {
    create: async (req, res, next) => {
        try {
            const { giftName } = req.body
            if (!giftName) res.status(400).json({
                message: "giftName is required"
            })
            const newGift = new GiftModel({ giftName: giftName })
            await newGift.save()
            res.status(201).json(newGift)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    read: async (req, res, next) => {
        try {
            const gifts = await GiftModel.find({})
            res.json(gifts)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!id) res.status(400).json({
                message: "id in params is required"
            })
            const removedGift = await GiftModel.findOneAndRemove({ _id: id })
            res.status(202).json(removedGift)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    notify: async (req, res, next) => {
        try {
            const allGifts = await GiftModel.find({})
            const giftsNames = String(allGifts.map(g => g.giftName))
            const mailOptions = {
                from: process.env.GMAIL_USER_EMAIL,
                to: 'prattjames4@gmail.com', // change this to florian's email
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
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = Gifts