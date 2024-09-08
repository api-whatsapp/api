-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `quota` INTEGER NOT NULL DEFAULT 100,
    `level` ENUM('user', 'member', 'premium') NOT NULL DEFAULT 'user',
    `token` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_request` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qr_code` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qr` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_update` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `devices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(191) NULL,
    `device_id` VARCHAR(100) NOT NULL,
    `status` ENUM('connected', 'disconnected') NOT NULL DEFAULT 'disconnected',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `connected_at` TIMESTAMP NULL,
    `disconnected_at` TIMESTAMP NULL,
    `disconnected_reason` VARCHAR(100) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `pkId` BIGINT NOT NULL AUTO_INCREMENT,
    `sessionId` VARCHAR(191) NOT NULL,
    `archived` BOOLEAN NULL,
    `contactPrimaryIdentityKey` LONGBLOB NULL,
    `conversationTimestamp` BIGINT NULL,
    `createdAt` BIGINT NULL,
    `createdBy` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `disappearingMode` JSON NULL,
    `displayName` VARCHAR(191) NULL,
    `endOfHistoryTransfer` BOOLEAN NULL,
    `endOfHistoryTransferType` INTEGER NULL,
    `ephemeralExpiration` INTEGER NULL,
    `ephemeralSettingTimestamp` BIGINT NULL,
    `id` VARCHAR(191) NOT NULL,
    `isDefaultSubgroup` BOOLEAN NULL,
    `isParentGroup` BOOLEAN NULL,
    `lastMsgTimestamp` BIGINT NULL,
    `lidJid` VARCHAR(191) NULL,
    `markedAsUnread` BOOLEAN NULL,
    `mediaVisibility` INTEGER NULL,
    `messages` JSON NULL,
    `muteEndTime` BIGINT NULL,
    `name` VARCHAR(191) NULL,
    `newJid` VARCHAR(191) NULL,
    `notSpam` BOOLEAN NULL,
    `oldJid` VARCHAR(191) NULL,
    `pHash` VARCHAR(191) NULL,
    `parentGroupId` VARCHAR(191) NULL,
    `participant` JSON NULL,
    `pinned` INTEGER NULL,
    `pnJid` VARCHAR(191) NULL,
    `pnhDuplicateLidThread` BOOLEAN NULL,
    `readOnly` BOOLEAN NULL,
    `shareOwnPn` BOOLEAN NULL,
    `support` BOOLEAN NULL,
    `suspended` BOOLEAN NULL,
    `tcToken` LONGBLOB NULL,
    `tcTokenSenderTimestamp` BIGINT NULL,
    `tcTokenTimestamp` BIGINT NULL,
    `terminated` BOOLEAN NULL,
    `unreadCount` INTEGER NULL,
    `unreadMentionCount` INTEGER NULL,
    `wallpaper` JSON NULL,
    `lastMessageRecvTimestamp` INTEGER NULL,

    INDEX `Chat_sessionId_idx`(`sessionId`),
    UNIQUE INDEX `unique_id_per_session_id_chat`(`sessionId`, `id`),
    PRIMARY KEY (`pkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `pkId` BIGINT NOT NULL AUTO_INCREMENT,
    `sessionId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `notify` VARCHAR(191) NULL,
    `verifiedName` VARCHAR(191) NULL,
    `imgUrl` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,

    INDEX `Contact_sessionId_idx`(`sessionId`),
    UNIQUE INDEX `unique_id_per_session_id_contact`(`sessionId`, `id`),
    PRIMARY KEY (`pkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `pkId` BIGINT NOT NULL AUTO_INCREMENT,
    `sessionId` VARCHAR(191) NOT NULL,
    `remoteJid` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `agentId` VARCHAR(191) NULL,
    `bizPrivacyStatus` INTEGER NULL,
    `broadcast` BOOLEAN NULL,
    `clearMedia` BOOLEAN NULL,
    `duration` INTEGER NULL,
    `ephemeralDuration` INTEGER NULL,
    `ephemeralOffToOn` BOOLEAN NULL,
    `ephemeralOutOfSync` BOOLEAN NULL,
    `ephemeralStartTimestamp` BIGINT NULL,
    `finalLiveLocation` JSON NULL,
    `futureproofData` LONGBLOB NULL,
    `ignore` BOOLEAN NULL,
    `keepInChat` JSON NULL,
    `key` JSON NOT NULL,
    `labels` JSON NULL,
    `mediaCiphertextSha256` LONGBLOB NULL,
    `mediaData` JSON NULL,
    `message` JSON NULL,
    `messageC2STimestamp` BIGINT NULL,
    `messageSecret` LONGBLOB NULL,
    `messageStubParameters` JSON NULL,
    `messageStubType` INTEGER NULL,
    `messageTimestamp` BIGINT NULL,
    `multicast` BOOLEAN NULL,
    `originalSelfAuthorUserJidString` VARCHAR(191) NULL,
    `participant` VARCHAR(191) NULL,
    `paymentInfo` JSON NULL,
    `photoChange` JSON NULL,
    `pollAdditionalMetadata` JSON NULL,
    `pollUpdates` JSON NULL,
    `pushName` VARCHAR(191) NULL,
    `quotedPaymentInfo` JSON NULL,
    `quotedStickerData` JSON NULL,
    `reactions` JSON NULL,
    `revokeMessageTimestamp` BIGINT NULL,
    `starred` BOOLEAN NULL,
    `status` INTEGER NULL,
    `statusAlreadyViewed` BOOLEAN NULL,
    `statusPsa` JSON NULL,
    `urlNumber` BOOLEAN NULL,
    `urlText` BOOLEAN NULL,
    `userReceipt` JSON NULL,
    `verifiedBizName` VARCHAR(191) NULL,

    INDEX `Message_sessionId_idx`(`sessionId`),
    UNIQUE INDEX `unique_message_key_per_session_id`(`sessionId`, `remoteJid`, `id`),
    PRIMARY KEY (`pkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `pkId` BIGINT NOT NULL AUTO_INCREMENT,
    `sessionId` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,
    `data` TEXT NOT NULL,

    INDEX `Session_sessionId_idx`(`sessionId`),
    UNIQUE INDEX `unique_id_per_session_id_session`(`sessionId`, `id`),
    PRIMARY KEY (`pkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `devices` ADD CONSTRAINT `devices_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `users`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
