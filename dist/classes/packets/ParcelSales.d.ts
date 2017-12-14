/// <reference types="node" />
import { UUID } from '../UUID';
import { Packet } from '../Packet';
export declare class ParcelSalesPacket implements Packet {
    name: string;
    flags: number;
    id: number;
    ParcelData: {
        ParcelID: UUID;
        BuyerID: UUID;
    }[];
    getSize(): number;
    writeToBuffer(buf: Buffer, pos: number): number;
    readFromBuffer(buf: Buffer, pos: number): number;
}