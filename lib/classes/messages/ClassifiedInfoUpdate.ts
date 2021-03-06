// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class ClassifiedInfoUpdateMessage implements MessageBase
{
    name = 'ClassifiedInfoUpdate';
    messageFlags = MessageFlags.FrequencyLow;
    id = Message.ClassifiedInfoUpdate;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        ClassifiedID: UUID;
        Category: number;
        Name: Buffer;
        Desc: Buffer;
        ParcelID: UUID;
        ParentEstate: number;
        SnapshotID: UUID;
        PosGlobal: Vector3;
        ClassifiedFlags: number;
        PriceForListing: number;
    };

    getSize(): number
    {
        return (this.Data['Name'].length + 1 + this.Data['Desc'].length + 2) + 117;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.AgentData['AgentID'].writeToBuffer(buf, pos);
        pos += 16;
        this.AgentData['SessionID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['ClassifiedID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.Data['Category'], pos);
        pos += 4;
        buf.writeUInt8(this.Data['Name'].length, pos++);
        this.Data['Name'].copy(buf, pos);
        pos += this.Data['Name'].length;
        buf.writeUInt16LE(this.Data['Desc'].length, pos);
        pos += 2;
        this.Data['Desc'].copy(buf, pos);
        pos += this.Data['Desc'].length;
        this.Data['ParcelID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt32LE(this.Data['ParentEstate'], pos);
        pos += 4;
        this.Data['SnapshotID'].writeToBuffer(buf, pos);
        pos += 16;
        this.Data['PosGlobal'].writeToBuffer(buf, pos, true);
        pos += 24;
        buf.writeUInt8(this.Data['ClassifiedFlags'], pos++);
        buf.writeInt32LE(this.Data['PriceForListing'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjAgentData: {
            AgentID: UUID,
            SessionID: UUID
        } = {
            AgentID: UUID.zero(),
            SessionID: UUID.zero()
        };
        newObjAgentData['AgentID'] = new UUID(buf, pos);
        pos += 16;
        newObjAgentData['SessionID'] = new UUID(buf, pos);
        pos += 16;
        this.AgentData = newObjAgentData;
        const newObjData: {
            ClassifiedID: UUID,
            Category: number,
            Name: Buffer,
            Desc: Buffer,
            ParcelID: UUID,
            ParentEstate: number,
            SnapshotID: UUID,
            PosGlobal: Vector3,
            ClassifiedFlags: number,
            PriceForListing: number
        } = {
            ClassifiedID: UUID.zero(),
            Category: 0,
            Name: Buffer.allocUnsafe(0),
            Desc: Buffer.allocUnsafe(0),
            ParcelID: UUID.zero(),
            ParentEstate: 0,
            SnapshotID: UUID.zero(),
            PosGlobal: Vector3.getZero(),
            ClassifiedFlags: 0,
            PriceForListing: 0
        };
        newObjData['ClassifiedID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['Category'] = buf.readUInt32LE(pos);
        pos += 4;
        varLength = buf.readUInt8(pos++);
        newObjData['Name'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        varLength = buf.readUInt16LE(pos);
        pos += 2;
        newObjData['Desc'] = buf.slice(pos, pos + varLength);
        pos += varLength;
        newObjData['ParcelID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['ParentEstate'] = buf.readUInt32LE(pos);
        pos += 4;
        newObjData['SnapshotID'] = new UUID(buf, pos);
        pos += 16;
        newObjData['PosGlobal'] = new Vector3(buf, pos, true);
        pos += 24;
        newObjData['ClassifiedFlags'] = buf.readUInt8(pos++);
        newObjData['PriceForListing'] = buf.readInt32LE(pos);
        pos += 4;
        this.Data = newObjData;
        return pos - startPos;
    }
}

