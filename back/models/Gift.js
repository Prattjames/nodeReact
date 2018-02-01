const mongoose = require('mongoose')

const { mongodbUrl } = require('../config')
const ObjectID = mongoose.Types.ObjectId
const Schema = mongoose.Schema

mongoose.connect(mongodbUrl)
mongoose.Promise = global.Promise;

const GiftSchema = new Schema({
	_id: {  type: Schema.Types.ObjectId, default: ObjectID },
	giftName: { type: String, required: true }
})

const GiftModel = mongoose.model('gifts', GiftSchema)

module.exports = GiftModel