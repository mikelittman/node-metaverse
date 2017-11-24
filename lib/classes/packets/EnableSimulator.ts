// This file has been automatically generated by writePacketClasses.js

import {IPAddress} from '../IPAddress';
import Long = require('long');
import {MessageFlags} from '../../enums/MessageFlags';
import {Packet} from '../Packet';

export class EnableSimulatorPacket implements Packet
{
    name = 'EnableSimulator';
    flags = MessageFlags.Trusted | MessageFlags.Blacklisted | MessageFlags.FrequencyLow;
    id = 4294901911;

    SimulatorInfo: {
        Handle: Long;
        IP: IPAddress;
        Port: number;
    };

    getSize(): number
    {
        return 14;
    }

}