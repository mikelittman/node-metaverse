// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {Vector3} from '../Vector3';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectScalePacket implements Packet
{
    name = 'ObjectScale';
    flags = MessageFlags.Zerocoded | MessageFlags.Deprecated | MessageFlags.FrequencyLow;
    id = 4294901852;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
        Scale: Vector3;
    }[];

    getSize(): number
    {
        return ((16) * this.ObjectData.length) + 33;
    }

}