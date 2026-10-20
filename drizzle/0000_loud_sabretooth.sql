CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`audience` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organization` text NOT NULL,
	`role` text,
	`portfolio` text,
	`message` text,
	`consent_version` text NOT NULL,
	`created_at` text NOT NULL
);
