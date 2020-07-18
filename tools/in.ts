import { Agent } from "../server/config";
import { AgentConfig } from "../server/mongoose/config";

Agent.forEach(el => {
    AgentConfig.updateOne({ name: el.name }, { $set: el },{upsert:true}).exec()
})