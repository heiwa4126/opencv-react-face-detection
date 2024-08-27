/**
 * こんなものが必要なのはMS-Windowsのせい
 */

import fs from "node:fs";

// `rm -rf .terraform/ .terraform.lock.hcl` を実行する。
for (const elem of [".terraform/", ".terraform.lock.hcl", "main_override.tf"]) {
	fs.rmSync(elem, { recursive: true, force: true });
}

// copy template
// fs.copyFileSync("terraform.tfvars-", "terraform.tfvars");
