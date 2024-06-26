INSERT INTO `devices` (`id`, `userEmail`, `device_id`, `status`, `created_at`, `connected_at`, `disconnected_at`, `disconnected_reason`) VALUES
(1, 'a@a.a', 'Hardware_1', 'disconnected', '2024-06-25 09:43:25.412', NULL, NULL, ''),
(2, 'b@b.b', 'Hardware_2', 'disconnected', '2024-06-25 09:43:25.412', NULL, NULL, ''),
(3, 'c@c.c', 'Hardware_3', 'disconnected', '2024-06-25 09:43:25.412', NULL, NULL, '');

INSERT INTO `users` (`id`, `email`, `quota`, `level`, `token`, `created_at`, `last_request`) VALUES
(1, 'a@a.a', 100, 'user', '1121', '2024-06-25 09:43:25.364', '2024-06-25 09:43:25.364'),
(2, 'b@b.b', 100, 'member', '1122', '2024-06-25 09:43:25.364', '2024-06-25 09:43:25.364'),
(3, 'c@c.c', 100, 'premium', '1123', '2024-06-25 09:43:25.364', '2024-06-25 09:43:25.364'),
(4, 'n@o.t', 100, 'premium', '404', '2024-06-25 09:43:25.364', '2024-06-25 09:43:25.364');

ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `devices_userEmail_fkey` (`userEmail`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD UNIQUE KEY `users_token_key` (`token`);

ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

ALTER TABLE `devices`
  ADD CONSTRAINT `devices_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `users` (`email`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;
