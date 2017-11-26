// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class FeatureDisabledMessage implements MessageBase
{
    name = 'FeatureDisabled';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.FeatureDisabled;

    FailureInfo: {
        ErrorMessage: string;
        AgentID: UUID;
        TransactionID: UUID;
    };

    getSize(): number
    {
        return (this.FailureInfo['ErrorMessage'].length + 1) + 32;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        buf.writeUInt8(this.FailureInfo['ErrorMessage'].length, pos++);
        buf.write(this.FailureInfo['ErrorMessage'], pos);
        pos += this.FailureInfo['ErrorMessage'].length;
        this.FailureInfo['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.FailureInfo['TransactionID'].writeToBuffer(buf, pos);
        pos += 16;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjFailureInfo: {
            ErrorMessage: string,
            AgentID: UUID,
            TransactionID: UUID
        } = {
            ErrorMessage: '',
            AgentID: UUID.zero(),
            TransactionID: UUID.zero()
        };
        varLength = buf.readUInt8(pos++);
        newObjFailureInfo['ErrorMessage'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjFailureInfo['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjFailureInfo['TransactionID'] = new UUID(buf, pos);
        pos += 16;
        this.FailureInfo = newObjFailureInfo;
        return pos - startPos;
    }
}
