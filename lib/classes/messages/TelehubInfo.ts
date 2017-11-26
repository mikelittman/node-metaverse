// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {Quaternion} from '../Quaternion';
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class TelehubInfoMessage implements MessageBase
{
    name = 'TelehubInfo';
    messageFlags = MessageFlags.Trusted | MessageFlags.FrequencyLow;
    id = Message.TelehubInfo;

    TelehubBlock: {
        ObjectID: UUID;
        ObjectName: string;
        TelehubPos: Vector3;
        TelehubRot: Quaternion;
    };
    SpawnPointBlock: {
        SpawnPointPos: Vector3;
    }[];

    getSize(): number
    {
        return (this.TelehubBlock['ObjectName'].length + 1) + ((12) * this.SpawnPointBlock.length) + 41;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.TelehubBlock['ObjectID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeUInt8(this.TelehubBlock['ObjectName'].length, pos++);
        buf.write(this.TelehubBlock['ObjectName'], pos);
        pos += this.TelehubBlock['ObjectName'].length;
        this.TelehubBlock['TelehubPos'].writeToBuffer(buf, pos, false);
        pos += 12;
        this.TelehubBlock['TelehubRot'].writeToBuffer(buf, pos);
        pos += 12;
        const count = this.SpawnPointBlock.length;
        buf.writeUInt8(this.SpawnPointBlock.length, pos++);
        for (let i = 0; i < count; i++)
        {
            this.SpawnPointBlock[i]['SpawnPointPos'].writeToBuffer(buf, pos, false);
            pos += 12;
        }
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjTelehubBlock: {
            ObjectID: UUID,
            ObjectName: string,
            TelehubPos: Vector3,
            TelehubRot: Quaternion
        } = {
            ObjectID: UUID.zero(),
            ObjectName: '',
            TelehubPos: Vector3.getZero(),
            TelehubRot: Quaternion.getIdentity()
        };
        newObjTelehubBlock['ObjectID'] = new UUID(buf, pos);
        pos += 16;
        varLength = buf.readUInt8(pos++);
        newObjTelehubBlock['ObjectName'] = buf.toString('utf8', pos, pos + (varLength - 1));
        pos += varLength;
        newObjTelehubBlock['TelehubPos'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjTelehubBlock['TelehubRot'] = new Quaternion(buf, pos);
        pos += 12;
        this.TelehubBlock = newObjTelehubBlock;
        const count = buf.readUInt8(pos++);
        this.SpawnPointBlock = [];
        for (let i = 0; i < count; i++)
        {
            const newObjSpawnPointBlock: {
                SpawnPointPos: Vector3
            } = {
                SpawnPointPos: Vector3.getZero()
            };
            newObjSpawnPointBlock['SpawnPointPos'] = new Vector3(buf, pos, false);
            pos += 12;
            this.SpawnPointBlock.push(newObjSpawnPointBlock);
        }
        return pos - startPos;
    }
}
