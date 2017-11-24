// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class ObjectMaterialPacket implements Packet
{
    name = 'ObjectMaterial';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901857;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ObjectLocalID: number;
        Material: number;
    }[];

    getSize(): number
    {
        return ((5) * this.ObjectData.length) + 33;
    }

}