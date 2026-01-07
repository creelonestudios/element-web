// Copyright 2024 The Matrix.org Foundation C.I.C.
//
// SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
// Please see LICENSE files in the repository root for full details.

import type { ImageInfo } from "matrix-js-sdk/src/types";

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