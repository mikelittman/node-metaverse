// This file has been automatically generated by writePacketClasses.js

import {UUID} from '../UUID';
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class RezSingleAttachmentFromInvPacket implements Packet
{
    name = 'RezSingleAttachmentFromInv';
    flags = MessageFlags.Zerocoded | MessageFlags.FrequencyLow;
    id = 4294902155;

    AgentData: {
        AgentID: UUID;
        SessionID: UUID;
    };
    ObjectData: {
        ItemID: UUID;
        OwnerID: UUID;
        AttachmentPt: number;
        ItemFlags: number;
        GroupMask: number;
        EveryoneMask: number;
        NextOwnerMask: number;
        Name: string;
        Description: string;
    };

    getSize(): number
    {
        return (this.ObjectData['Name'].length + 1 + this.ObjectData['Description'].length + 1) + 81;
    }

}