import { mongooses as mongoose, Schema } from "./momgoose";

const SchemaAgentConfig = new Schema({
    name: String,
    url: String,
    share: {
        type: Boolean,
        default: true
    },
    port: Number,
    hm: String,
    logoType: String,
    logoValue: {
        type: String,
        default: "/logo.png"
    },
    beian: String,
    //
    title: String,
    metaKeywords: String,
    metaDescription: String,
    //
    contactQQ: String,
    contactTel: [String],
    contact400: String,
    tml: [String]
}, { timestamps: true })

const SchemaLink = new Schema({
    name: String,
    link: String
})

export const LinkFrend = mongoose.model('LinkFrend', SchemaLink)

export const AgentConfig = mongoose.model("AgentConfig", SchemaAgentConfig)