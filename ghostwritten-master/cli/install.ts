let cmd = [] as string[];
cmd = cmd.concat(["deno",
    "compile",
    "--unstable",
    "--allow-all",
    "--import-map",
    "import-map.json"
]);

switch (Deno.build.os) {
    case "darwin":
        cmd = cmd.concat(["--target", "x86_64-apple-darwin"]);
        break;
    case "linux":
        cmd = cmd.concat(["--target", "x86_64-unknown-linux-gnu"]);
        break;
    case "windows":
        cmd = cmd.concat(["--target", "x86_64-pc-windows-msvc"]);
        break;
}
cmd = cmd.concat(["--output", "/usr/local/bin/turtle", "cli/cli.ts"]);

const runOptions: Deno.RunOptions = {
    cmd: cmd,
    env: { DENO_DIR: ".cache/" }
};
const process = Deno.run(runOptions);
await process.status();
process.close();
