import { CommandsBase } from './CommandsBase';
import { InventoryItem } from '../InventoryItem';
import { AttachmentPoint } from '../../enums/AttachmentPoint';
import { UUID, InventoryItemFlags, Utils, PacketFlags } from '../..';
import { PermissionMask } from '../../enums/PermissionMask';
import { RezSingleAttachmentFromInvMessage } from '../messages/RezSingleAttachmentFromInv';

export class AppearanceCommands extends CommandsBase {
	async attach(
		itemID: UUID,
		ownerID: UUID,
		name: string,
		description: string,
		perms: { [key: string]: PermissionMask },
		itemFlags: InventoryItemFlags,
		point: AttachmentPoint,
		replace: boolean
	) {
		const packet = new RezSingleAttachmentFromInvMessage();
		packet.AgentData = {
			AgentID: this.agent.agentID,
			SessionID: this.circuit.sessionID
		};
		packet.ObjectData = {
			ItemID: itemID,
			OwnerID: this.agent.agentID,
			AttachmentPt: replace ? point : 0x80 | point,
			Name: Utils.StringToBuffer(name),
			Description: Utils.StringToBuffer(description),
			EveryoneMask: perms.everyoneMask,
			GroupMask: perms.groupMask,
			NextOwnerMask: perms.nextOwnerMask,
			ItemFlags: itemFlags
		};
		this.circuit.sendMessage(packet, PacketFlags.Reliable);

		this.agent.sendAgentUpdate();
	}
	async attachInventory(
		item: InventoryItem,
		point: AttachmentPoint,
		replace: boolean = false
	) {
		const perms: { [key: string]: PermissionMask } = {};
		perms.everyoneMask = item.permissions.everyoneMask;
		perms.groupMask = item.permissions.groupMask;
		perms.nextOwnerMask = item.permissions.nextOwnerMask;
		await this.attach(
			item.itemID,
			this.bot.agentID(),
			item.name,
			item.description,
			perms,
			item.flags,
			point,
			replace
		);
	}

	shutdown() {}
}
