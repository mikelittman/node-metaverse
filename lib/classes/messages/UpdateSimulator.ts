// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class UpdateSimulatorMessage implements MessageBase
{
    name = 'UpdateSimulator';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.UpdateSimulator;

    SimulatorInfo: {
        RegionID: UUID;
        SimName: Buffer;
        EstateID: number;
        SimAccess: number;
    };

    getSize(): number
    {
        return (this.SimulatorInfo['SimName'].length + 1) + 21;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.SimulatorInfo['RegionID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.SimulatorInfo['SimName'].length, pos++);
        this.SimulatorInfo['SimName'].copy(buf, pos);
        pos += this.SimulatorInfo['SimName'].length;
        buf.writeUInt32LE(this.SimulatorInfo['EstateID'], pos);
        pos += 4;
        buf.writeUInt8(this.SimulatorInfo['SimAccess'], pos++);
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjSimulatorInfo: {
            RegionID: UUID,
            SimName: Buffer,
            EstateID: number,
            SimAccess: number
        } = {
            RegionID: UUID.zero(),
            SimName: Buffer.allocUnsafe(0),
            EstateID: 0,
            SimAccess: 0
        };
        newObjSimulatorInfo['RegionID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjSimulatorInfo['SimName'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjSimulatorInfo['EstateID'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjSimulatorInfo['SimAccess'] = buf.readUInt8(pos++);
        this.SimulatorInfo = newObjSimulatorInfo;
        return pos - startPos;
    }
}

