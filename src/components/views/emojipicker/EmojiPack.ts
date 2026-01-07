// Copyright 2024 The Matrix.org Foundation C.I.C.
//
// SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
// Please see LICENSE files in the repository root for full details.

import { EventTimeline, type Room } from "matrix-js-sdk/src/matrix";

import type { ImageInfo } from "matrix-js-sdk/src/types";
import SpaceStore from "../../../stores/spaces/SpaceStore";

// MSC2545 Image Pack
export interface MSC2545Pack {
	display_name?: string;
	avatar_url?: string;
	usage?: ("emoticon" | "sticker")[];
	attribution?: string;
}

export interface MSC2545Image {
	// MXC Url
	url: string;
	body?: string;
	info?: ImageInfo;
	usage?: ("emoticon" | "sticker")[];
}

export interface MSC2545ImagePack {
	images: Record<string, MSC2545Image>;
	pack: MSC2545Pack;
}

export function getImagePacksForRoom(room: Room): MSC2545ImagePack[] {
	const packs: MSC2545ImagePack[] = [];
	const events = room.getLiveTimeline().getState(EventTimeline.FORWARDS)
		?.getStateEvents("im.ponies.room_emotes");

	for (const event of events ?? []) {
		const content = event.getContent();
		if (content) {
			packs.push(content as MSC2545ImagePack);
		}
	}

	// This room may be part of a space which has custom emojis too
	const parents = SpaceStore.instance.getParents(room.roomId);
	for (const parent of parents) {
		packs.push(...getImagePacksForRoom(parent));
	}

	return packs;
}
