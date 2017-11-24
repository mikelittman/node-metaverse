// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class PickGodDeletePacket implements Packet
{
    name = 'PickGodDelete';
    flags = MessageFlags.FrequencyLow;
    id = 4294901947;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    Data: {
        PickID: UUID;
        QueryID: UUID;
    };

    getSize(): number
    {
        return 64;
    }

}