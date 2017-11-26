// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class AvatarInterestsReplyMessage implements MessageBase
{
    name = 'AvatarInterestsReply';
    messageFlags = MessageFlags.Trusted | MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = Message.AvatarInterestsReply;

    AgentData: {
        AgentID: UUID;
        AvatarID: UUID;
    };
    PropertiesData: {
        WantToMask: number;
        WantToText: string;
        SkillsMask: number;
        SkillsText: string;
        LanguagesText: string;
    };

    getSize(): number
    {
        return (this.PropertiesData['WantToText'].length + 1 + this.PropertiesData['SkillsText'].length + 1 + this.PropertiesData['LanguagesText'].length + 1) + 40;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['AvatarID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.PropertiesData['WantToMask'], pos);
        pos += 4;
        buf.writeUInt8(this.PropertiesData['WantToText'].length, pos++);
        buf.write(this.PropertiesData['WantToText'], pos);
        pos += this.PropertiesData['WantToText'].length;
        buf.writeUInt32LE(this.PropertiesData['SkillsMask'], pos);
        pos += 4;
        buf.writeUInt8(this.PropertiesData['SkillsText'].length, pos++);
        buf.write(this.PropertiesData['SkillsText'], pos);
        pos += this.PropertiesData['SkillsText'].length;
        buf.writeUInt8(this.PropertiesData['LanguagesText'].length, pos++);
        buf.write(this.PropertiesData['LanguagesText'], pos);
        pos += this.PropertiesData['LanguagesText'].length;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            AvatarID: UUID
        } = {
            AgentID: UUID.zero(),
            AvatarID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['AvatarID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjPropertiesData: {
            WantToMask: number,
            WantToText: string,
            SkillsMask: number,
            SkillsText: string,
            LanguagesText: string
        } = {
            WantToMask: 0,
            WantToText: '',
            SkillsMask: 0,
            SkillsText: '',
            LanguagesText: ''
        };
        newObjPropertiesData['WantToMask'] = buf.readUInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjPropertiesData['WantToText'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjPropertiesData['SkillsMask'] = buf.readUInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjPropertiesData['SkillsText'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        varLength = buf.readUInt8(pos++);
        newObjPropertiesData['LanguagesText'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        this.PropertiesData = newObjPropertiesData;
        return pos - startPos;
    }
}
