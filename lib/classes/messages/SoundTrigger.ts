// This file has been automatically generated by writeMessageClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {MessageBase} from '../MessageBase';
import {Message} from '../../enums/Message';

export class SoundTriggerMessage implements MessageBase
{
    name = 'SoundTrigger';
    messageFlags = MessageFlags.FrequencyHigh;
    id = Message.SoundTrigger;

    SoundData: {
        SoundID: UUID;
        OwnerID: UUID;
        ObjectID: UUID;
        ParentID: UUID;
        Handle: Long;
        Position: Vector3;
        Gain: number;
    };

    getSize(): number
    {
        return 88;
    }

    writeToBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        this.SoundData['SoundID'].writeToBuffer(buf, pos);
        pos += 16;
        this.SoundData['OwnerID'].writeToBuffer(buf, pos);
        pos += 16;
        this.SoundData['ObjectID'].writeToBuffer(buf, pos);
        pos += 16;
        this.SoundData['ParentID'].writeToBuffer(buf, pos);
        pos += 16;
        buf.writeInt32LE(this.SoundData['Handle'].low, pos);
        pos += 4;
        buf.writeInt32LE(this.SoundData['Handle'].high, pos);
        pos += 4;
        this.SoundData['Position'].writeToBuffer(buf, pos, false);
        pos += 12;
        buf.writeFloatLE(this.SoundData['Gain'], pos);
        pos += 4;
        return pos - startPos;
    }

    readFromBuffer(buf: Buffer, pos: number): number
    {
        const startPos = pos;
        let varLength = 0;
        const newObjSoundData: {
            SoundID: UUID,
            OwnerID: UUID,
            ObjectID: UUID,
            ParentID: UUID,
            Handle: Long,
            Position: Vector3,
            Gain: number
        } = {
            SoundID: UUID.zero(),
            OwnerID: UUID.zero(),
            ObjectID: UUID.zero(),
            ParentID: UUID.zero(),
            Handle: Long.ZERO,
            Position: Vector3.getZero(),
            Gain: 0
        };
        newObjSoundData['SoundID'] = new UUID(buf, pos);
        pos += 16;
        newObjSoundData['OwnerID'] = new UUID(buf, pos);
        pos += 16;
        newObjSoundData['ObjectID'] = new UUID(buf, pos);
        pos += 16;
        newObjSoundData['ParentID'] = new UUID(buf, pos);
        pos += 16;
        newObjSoundData['Handle'] = new Long(buf.readInt32LE(pos), buf.readInt32LE(pos+4));
        pos += 8;
        newObjSoundData['Position'] = new Vector3(buf, pos, false);
        pos += 12;
        newObjSoundData['Gain'] = buf.readFloatLE(pos);
        pos += 4;
        this.SoundData = newObjSoundData;
        return pos - startPos;
    }
}
