// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class DirFindQueryPacket implements Packet
{
    name = 'DirFindQuery';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294901791;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    QueryData: {
        QueryID: UUID;
        QueryText: string;
        QueryFlags: number;
        QueryStart: number;
    };

    getSize(): number
    {
        return (this.QueryData['QueryText'].length + 1) + 56;
    }

}